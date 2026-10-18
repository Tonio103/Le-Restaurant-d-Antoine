/**
 * LE RESTAURANT D'ANTOINE — ASSISTANT DU CHEF
 * Un assistant conversationnel qui fonctionne entièrement dans le navigateur,
 * à partir des données de recettes-data.js (aucune IA externe, aucune donnée
 * envoyée). Il comprend :
 *  - les envies et contraintes (léger, rapide, sans viande, moins de 30 min…)
 *  - les ingrédients disponibles (« j'ai des œufs et du lait »)
 *  - les questions sur une recette (ingrédients pour 6, temps, étapes, astuces…)
 *  - les remplacements d'ingrédients, les conversions et les minuteurs.
 */
(function () {
  "use strict";

  const A = window.Antoine;
  if (!A) return;

  const { recettes: RECETTES, parCle: BY_KEY, meta: META, esc, icon, normalize: baseNormalize } = A;
  const CHAT_KEY = "antoine-chat-v2";

  /* ==========================================================================
     NORMALISATION & OUTILS DE LANGAGE
     ========================================================================== */
  function norm(text) {
    const cleaned = baseNormalize(text)
      .replace(/-/g, " ")
      .replace(/[^a-z0-9°.,\s]/g, " ")
      // garde « 1,5 » ou « 2.5 » mais retire la ponctuation collée aux mots
      .replace(/[.,](?=\D|$)/g, " ")
      .replace(/(^|\D)[.,]/g, "$1 ")
      .replace(/\s+/g, " ")
      .trim();
    return ` ${cleaned} `;
  }

  function has(text, words) {
    return words.some((w) => {
      const ww = w.replace(/-/g, " ");
      return text.includes(` ${ww} `) || text.includes(` ${ww}s `);
    });
  }

  const NOMBRES = {
    un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, sept: 7, huit: 8, neuf: 9, dix: 10,
    onze: 11, douze: 12, treize: 13, quatorze: 14, quinze: 15, seize: 16, vingt: 20, trente: 30,
    quarante: 40, cinquante: 50, soixante: 60
  };

  function toNumber(token) {
    if (token === undefined || token === null) return NaN;
    const t = String(token).replace(",", ".");
    if (/^\d+(\.\d+)?$/.test(t)) return Number(t);
    return NOMBRES[t] ?? NaN;
  }

  const NUM = "(\\d+(?:[.,]\\d+)?|un|une|deux|trois|quatre|cinq|six|sept|huit|neuf|dix|onze|douze|treize|quatorze|quinze|seize|vingt|trente|quarante|cinquante|soixante)";

  function levenshtein(a, b) {
    if (a === b) return 0;
    const m = a.length;
    const n = b.length;
    if (Math.abs(m - n) > 2) return 3;
    const dp = Array.from({ length: n + 1 }, (_, j) => j);
    for (let i = 1; i <= m; i++) {
      let prev = dp[0];
      dp[0] = i;
      for (let j = 1; j <= n; j++) {
        const tmp = dp[j];
        dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
        prev = tmp;
      }
    }
    return dp[n];
  }

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function listeFr(items) {
    if (items.length <= 1) return items.join("");
    return `${items.slice(0, -1).join(", ")} et ${items[items.length - 1]}`;
  }

  /* ==========================================================================
     CONNAISSANCES
     ========================================================================== */
  const ALIASES = {
    cailles: ["caille", "cailles", "petits pois", "petit pois", "cailles aux petits pois"],
    crepes: ["crepe", "crepes", "chandeleur", "pate a crepes"],
    burgers: ["burger", "burgers", "hamburger", "hamburgers", "cheeseburger"],
    fondants: ["fondant", "fondants", "coulant", "coulants", "fondant au chocolat", "moelleux au chocolat", "lava cake"],
    marbre: ["marbre", "gateau marbre", "cake marbre", "marbres"],
    pokebowl: ["poke", "poke bowl", "pokebowl", "poke bowls", "bowl"],
    saladecesar: ["cesar", "salade cesar", "caesar", "salade"],
    avocadotoast: ["avocado", "avocado toast", "toast", "toasts", "tartine avocat", "toast avocat", "toast a l avocat"],
    ramen: ["ramen", "ramens", "soupe japonaise", "soupe de nouilles"],
    jusorange: ["jus d orange", "jus orange", "jus", "orange pressee", "oranges pressees", "jus presse"]
  };

  // Les autres recettes (et les nouvelles) : titre court + champ « alias » des données.
  RECETTES.forEach((r) => {
    const extra = [r.titreCourt, ...(r.alias || [])].map((a) => norm(a).trim()).filter(Boolean);
    ALIASES[r.key] = [...new Set([...(ALIASES[r.key] || []), ...extra])];
  });

  // Mots « simples » pour la correction des fautes de frappe.
  const FUZZY_WORDS = Object.entries(ALIASES).flatMap(([key, list]) =>
    list.filter((a) => !a.includes(" ") && a.length >= 5).map((a) => ({ key, word: a }))
  );

  const CONCEPTS = {
    leger: { mots: ["leger", "legere", "light", "digeste", "pas lourd", "pas trop lourd", "pas trop copieux", "petit appetit"], label: "léger" },
    copieux: { mots: ["copieux", "copieuse", "consistant", "qui cale", "gros appetit", "tres faim", "genereux", "nourrissant"], label: "copieux" },
    rapide: { mots: ["rapide", "rapidement", "vite", "express", "presse", "pas le temps", "pas beaucoup de temps", "en vitesse"], label: "rapide" },
    facile: { mots: ["facile", "simple", "debutant", "debutante", "sans difficulte", "pas complique"], label: "facile" },
    dessert: { mots: ["dessert", "desserts", "sucre", "sucree", "gouter", "gateau", "douceur", "patisserie"], label: "sucré" },
    plat: { mots: ["plat", "sale", "salee", "repas", "diner", "dejeuner", "midi", "manger"], label: "plat salé" },
    boisson: { mots: ["boisson", "boire", "soif", "a boire", "rafraichir"], label: "boisson" },
    brunch: { mots: ["brunch", "petit dej", "petit-dej", "petit dejeuner", "petit-dejeuner", "matin"], label: "brunch" },
    chaud: { mots: ["chaud", "chaude", "rechauffer", "rechauffant", "bien chaud"], label: "chaud" },
    froid: { mots: ["frais", "fraiche", "froid", "froide", "rafraichissant", "fraicheur"], label: "frais" },
    hiver: { mots: ["hiver", "il fait froid", "pluie", "cocooning", "reconfort", "reconfortant", "doudou", "triste", "deprime", "moral", "cafard", "blues"], label: "réconfortant" },
    ete: { mots: ["ete", "chaleur", "canicule", "soleil", "il fait chaud", "plage", "estival"], label: "estival" },
    fete: { mots: ["fete", "anniversaire", "invites", "recevoir", "occasion", "noel", "reveillon", "impressionner", "dimanche"], label: "pour recevoir" },
    romantique: { mots: ["romantique", "amoureux", "en amoureux", "a deux", "saint valentin", "rendez-vous", "date"], label: "en amoureux" },
    enfant: { mots: ["enfant", "enfants", "kids", "petits", "gamins", "fils", "fille", "ado", "ados"], label: "pour les enfants" },
    familial: { mots: ["famille", "familial", "convivial", "partager", "entre amis", "amis", "copains", "soiree"], label: "convivial" },
    healthy: { mots: ["healthy", "sain", "saine", "equilibre", "equilibree", "dietetique", "vitamine", "vitamines", "detox"], label: "équilibré" },
    chocolat: { mots: ["chocolat", "choco", "cacao", "chocolate"], label: "chocolat" },
    gastro: { mots: ["gastronomique", "gastro", "gourmet", "gourmette", "gourmettes", "chic", "raffine", "raffinee", "etoile", "haut de gamme", "comme au restaurant", "elegant", "elegante", "grand chef"], label: "gastronomique" },
    poisson: { mots: ["poisson", "saumon", "poissons", "sole", "cabillaud", "fruits de mer", "crevettes", "saint-jacques", "saint jacques"], label: "poisson" },
    viande: { mots: ["viande", "boeuf", "poulet", "volaille", "bacon", "lardons", "carnivore", "steak", "agneau", "canard", "veau", "magret"], label: "viande" },
    asiatique: { mots: ["japonais", "japonaise", "asiatique", "asie", "japon", "hawai", "hawaien", "exotique", "thai", "thailandais", "indien", "indienne", "inde", "oriental", "orientale"], label: "voyage" },
    francais: { mots: ["francais", "francaise", "traditionnel", "terroir", "classique", "grand-mere", "grand mere", "mamie", "mamoune", "bistrot"], label: "tradition" },
    americain: { mots: ["americain", "americaine", "usa", "fast food", "street food"], label: "américain" },
    fatigue: { mots: ["fatigue", "fatiguee", "creve", "crevee", "epuise", "epuisee", "flemme", "la flemme", "pas envie de cuisiner"], label: "sans effort" },
    faim: { mots: ["faim", "affame", "affamee", "j ai faim", "la dalle"], label: "pour la faim" }
  };

  const CONCEPT_TAGS = {
    leger: ["leger", "healthy", "frais", "equilibre"],
    copieux: ["copieux", "lourd", "gourmand"],
    chaud: ["chaud"],
    froid: ["froid", "frais"],
    hiver: ["hiver", "reconfort"],
    ete: ["ete", "frais"],
    fete: ["fete", "invite", "raffine", "dimanche"],
    romantique: ["romantique", "raffine"],
    gastro: ["gastronomique", "raffine"],
    enfant: ["enfant"],
    familial: ["familial", "convivial"],
    healthy: ["healthy", "equilibre", "leger", "sain"],
    chocolat: ["chocolat"],
    poisson: ["poisson"],
    viande: ["viande"],
    asiatique: ["japonais", "asiatique", "hawaien", "thai", "indien", "oriental"],
    francais: ["francais", "traditionnel"],
    americain: ["americain"],
    faim: ["plat", "copieux", "gourmand"]
  };

  const EXCLUSIONS = [
    { id: "viande", mots: ["sans viande", "vegetarien", "vegetarienne", "vege", "veggie", "pas de viande", "je mange pas de viande", "je ne mange pas de viande"], label: "sans viande", test: (r) => r.regime?.sansViande || r.regime?.adaptableSansViande },
    { id: "vegan", mots: ["vegan", "vegane", "vegetalien", "vegetalienne"], label: "végétalien", test: (r) => r.regime?.vegan },
    { id: "poisson", mots: ["sans poisson", "pas de poisson", "pas poisson"], label: "sans poisson", test: (r) => r.regime?.sansPoisson },
    { id: "gluten", mots: ["sans gluten", "intolerant au gluten", "intolerante au gluten", "coeliaque", "celiaque", "pas de gluten"], label: "sans gluten", test: (r) => !r.allergenes.includes("gluten") },
    { id: "lait", mots: ["sans lactose", "sans lait", "sans produits laitiers", "intolerant au lactose", "intolerante au lactose", "pas de lait", "pas de lactose"], label: "sans lait", test: (r) => !r.allergenes.includes("lait") },
    { id: "oeufs", mots: ["sans oeuf", "sans oeufs", "pas d oeuf", "pas d oeufs", "allergique aux oeufs"], label: "sans œufs", test: (r) => !r.allergenes.includes("oeufs") },
    { id: "chocolat", mots: ["sans chocolat", "pas de chocolat", "pas chocolat"], label: "sans chocolat", test: (r) => !r.tags.includes("chocolat") },
    { id: "sucre", mots: ["pas sucre", "pas de dessert", "pas un dessert", "pas de sucre", "sans sucre"], label: "salé", test: (r) => r.categorie !== "dessert" && r.categorie !== "boisson" },
    { id: "cuisson", mots: ["sans cuisson", "sans cuire", "pas de cuisson", "sans four", "sans plaque"], label: "sans cuisson", test: (r) => !r.temps.cuisson }
  ];

  // Ingrédients reconnus quand on dit « j'ai… »
  const INGREDIENTS = {
    oeufs: ["oeuf", "oeufs", "jaune d oeuf", "jaunes d oeufs"],
    lait: ["lait"],
    farine: ["farine"],
    beurre: ["beurre"],
    sucre: ["sucre"],
    chocolat: ["chocolat", "cacao"],
    oranges: ["orange", "oranges"],
    citron: ["citron", "citrons"],
    avocat: ["avocat", "avocats"],
    pain: ["pain", "baguette", "pain de mie", "pain de campagne"],
    tomates: ["tomate", "tomates", "tomates cerises"],
    feta: ["feta"],
    saumon: ["saumon"],
    riz: ["riz"],
    mangue: ["mangue"],
    concombre: ["concombre"],
    carotte: ["carotte", "carottes"],
    edamame: ["edamame", "feves"],
    soja: ["sauce soja", "soja"],
    poulet: ["poulet", "blanc de poulet", "filet de poulet"],
    tofu: ["tofu"],
    champignons: ["champignon", "champignons"],
    nouilles: ["nouilles", "nouille"],
    bouillon: ["bouillon"],
    gingembre: ["gingembre"],
    ail: ["ail"],
    oignon: ["oignon", "oignons"],
    petitspois: ["petits pois", "petit pois"],
    lardons: ["lardons", "lardon"],
    caille: ["caille", "cailles"],
    steak: ["steak", "steaks", "steak hache", "steaks haches", "viande hachee", "boeuf hache"],
    cheddar: ["cheddar"],
    salade: ["salade", "laitue", "romaine", "iceberg"],
    bacon: ["bacon"],
    parmesan: ["parmesan"],
    anchois: ["anchois"],
    capres: ["capres"],
    cornichons: ["cornichon", "cornichons", "pickles"],
    painburger: ["buns", "pain burger", "pains burger", "pain a burger", "pains a burger"],
    levure: ["levure"],
    vanille: ["vanille"],
    menthe: ["menthe"],
    miel: ["miel"],
    sesame: ["sesame"],
    mayonnaise: ["mayonnaise", "mayo"],
    ketchup: ["ketchup"],
    moutarde: ["moutarde"],
    ciboule: ["ciboule", "oignon vert", "cebette"],
    miso: ["miso"],
    boeuf: ["boeuf", "paleron", "joue de boeuf", "bourguignon"],
    veau: ["veau", "tendron", "epaule de veau"],
    pommesdeterre: ["pomme de terre", "pommes de terre", "patate", "patates"],
    creme: ["creme", "creme fraiche", "creme liquide", "creme epaisse"],
    vin: ["vin", "vin rouge", "vin blanc"],
    pates: ["pates", "spaghetti", "spaghettis", "lasagne", "lasagnes", "tagliatelles", "penne"],
    poischiches: ["pois chiche", "pois chiches"],
    laitdecoco: ["lait de coco", "creme de coco"],
    courgette: ["courgette", "courgettes"],
    aubergine: ["aubergine", "aubergines"],
    poivron: ["poivron", "poivrons"],
    fromagerape: ["gruyere", "comte", "emmental", "fromage rape", "pecorino"],
    mascarpone: ["mascarpone"],
    cafe: ["cafe", "expresso"],
    cerises: ["cerise", "cerises"],
    pommes: ["pomme", "pommes"],
    cannelle: ["cannelle"],
    curry: ["curry", "garam masala", "curcuma"],
    epinards: ["epinard", "epinards"],
    guanciale: ["guanciale", "pancetta"],
    biscuits: ["biscuits cuillere", "boudoirs", "biscuit"],
    poires: ["poire", "poires"],
    fraises: ["fraise", "fraises"],
    fruitsrouges: ["fruits rouges", "framboise", "framboises", "myrtilles"],
    canard: ["canard", "magret", "cuisses de canard"],
    agneau: ["agneau", "gigot", "souris d agneau"],
    crevettes: ["crevette", "crevettes"],
    reblochon: ["reblochon"],
    morilles: ["morille", "morilles"],
    peches: ["peche", "peches"],
    amandes: ["amande", "amandes", "poudre d amande"],
    rhum: ["rhum"],
    pain2: ["pate brisee", "pate feuilletee", "pate sablee"]
  };
  const PANTRY = ["sel", "poivre", "huile", "eau", "fleur de sel", "piment", "herbes"];

  // « pommes de terre » ne veut pas dire « pommes », « lait de coco » pas « lait », « tomates cerises » pas « cerises »…
  const MASQUES = { pommesdeterre: ["pommes"], laitdecoco: ["lait"], pain2: ["pain"], tomates: ["cerises"] };
  function cleanKeys(keys) {
    const hidden = new Set(keys.flatMap((k) => MASQUES[k] || []));
    return keys.filter((k) => !hidden.has(k));
  }

  function ingredientKeysOf(name) {
    const n = norm(name);
    return cleanKeys(
      Object.entries(INGREDIENTS)
        .filter(([, syn]) => has(n, syn))
        .map(([k]) => k)
    );
  }

  const RECIPE_INGS = Object.fromEntries(
    RECETTES.map((r) => {
      const items = A.tousIngredients(r).filter((i) => !i.optionnel && !PANTRY.some((p) => norm(i.nom).includes(` ${p} `)));
      return [r.key, items.map((i) => ({ nom: i.nom, keys: ingredientKeysOf(i.nom) })).filter((i) => i.keys.length)];
    })
  );

  const SUBSTITUTIONS = {
    oeufs: {
      label: "les œufs",
      deconseille: ["fondants"],
      texte:
        "En pâtisserie (gâteaux, crêpes), un œuf peut être remplacé par 1 c. à soupe de graines de lin moulues mélangée à 3 c. à soupe d'eau (laisse gonfler 5 minutes), ou par environ 60 g de compote de pommes (plus moelleux, un peu sucré). Dans un fondant au chocolat, l'œuf est difficile à remplacer : le résultat sera différent."
    },
    beurre: {
      label: "le beurre",
      texte:
        "En pâtisserie, une huile neutre fonctionne : mets environ 20 % de moins que le poids de beurre (le beurre contient environ 80 % de matière grasse), soit 80 g d'huile pour 100 g de beurre. La margarine se remplace à poids égal. Pour la poêle, une huile suffit."
    },
    lait: {
      label: "le lait",
      texte: "Une boisson végétale (avoine, soja, amande) se remplace à volume égal. Pour les crêpes, la boisson d'avoine donne un résultat très proche."
    },
    farine: {
      label: "la farine de blé",
      texte:
        "Pour des crêpes sans blé, la farine de sarrasin donne des crêpes au goût plus rustique (elle est naturellement sans gluten, mais vérifie les traces sur l'étiquette). Pour épaissir une sauce, la fécule de maïs remplace la farine en mettant environ moitié moins."
    },
    sucre: {
      label: "le sucre",
      texte: "Le sucre de canne ou la cassonade se remplacent à poids égal. Avec du miel ou du sirop d'érable, mets environ les trois quarts de la quantité et réduis un peu les liquides."
    },
    chocolat: {
      label: "le chocolat",
      deconseille: ["fondants"],
      texte:
        "Dans les fondants, le chocolat est la base : difficile de le remplacer. Dans le gâteau marbré, du cacao en poudre non sucré peut le remplacer dans la pâte chocolat (ajoute un peu de lait si la pâte devient trop épaisse)."
    },
    lardons: {
      label: "les lardons",
      texte: "Du bacon coupé en morceaux ou du jambon cru en dés font très bien l'affaire. Version sans viande : des champignons bien poêlés avec une pincée de paprika fumé."
    },
    saumon: {
      label: "le saumon",
      texte: "Du thon très frais, des crevettes cuites, du saumon fumé ou du tofu mariné. Les crevettes et le tofu sont aussi la bonne option pour les personnes qui doivent éviter le poisson cru."
    },
    bouillon: {
      label: "le bouillon",
      texte: "De l'eau chaude avec un cube de bouillon dissous. Pour le ramen, tu peux aussi parfumer de l'eau avec sauce soja, miso, ail et gingembre."
    },
    parmesan: { label: "le parmesan", texte: "Du grana padano ou du pecorino, qui ont un goût proche." },
    anchois: { label: "les anchois", texte: "Sans anchois, mets un peu plus de câpres et de parmesan pour garder le côté salé et puissant de la sauce César." },
    riz: { label: "le riz japonais", texte: "Un autre riz rond fait l'affaire. En dépannage, un riz long fonctionne mais il colle moins." },
    nouilles: { label: "les nouilles ramen", texte: "Des nouilles chinoises aux œufs, des udon, ou en dépannage des spaghetti." },
    cheddar: { label: "le cheddar", texte: "Un fromage qui fond bien : emmental, comté, gouda ou raclette." },
    painburger: { label: "le pain burger", texte: "Un pain de mie épais toasté, ou un petit pain rond coupé en deux." },
    mayonnaise: { label: "la mayonnaise", texte: "Du yaourt grec avec une pointe de moutarde, pour une sauce plus légère." },
    levure: {
      label: "la levure chimique",
      texte: "En dépannage, un peu de bicarbonate de soude associé à un ingrédient acide (yaourt ou jus de citron) fait lever la pâte, mais le résultat sera un peu différent."
    },
    feta: { label: "la feta", texte: "Du fromage de chèvre frais, de la ricotta salée ou quelques copeaux de parmesan." },
    caille: { label: "les cailles", texte: "Des cuisses de poulet ou des pilons, en allongeant un peu la cuisson jusqu'à ce que la viande soit bien cuite à cœur." },
    steak: { label: "le steak haché", texte: "Un steak végétal pour une version sans viande, ou un filet de poulet aplati et grillé." },
    creme: {
      label: "la crème",
      texte: "Pour une sauce, une crème végétale (avoine, soja) se remplace à volume égal. En cuisine salée, du yaourt grec ou du fromage blanc peuvent dépanner, mais ajoute-les hors du feu : ils peuvent trancher s'ils bouillent."
    },
    vin: {
      label: "le vin",
      texte: "Remplace-le par du bouillon (de bœuf pour une sauce au vin rouge, de volaille pour le vin blanc). Le goût sera différent, moins acide et moins profond."
    },
    mascarpone: { label: "le mascarpone", texte: "De la ricotta bien égouttée ou un fromage frais épais : la crème sera moins riche et un peu plus acidulée." },
    poischiches: { label: "les pois chiches", texte: "Des haricots blancs ou des lentilles cuites gardent l'esprit du plat." },
    laitdecoco: { label: "le lait de coco", texte: "De la crème liquide ou un yaourt nature (ajouté hors du feu) : le plat sera moins parfumé mais tout aussi onctueux." },
    cerises: {
      label: "les cerises",
      texte: "D'autres fruits fonctionnent très bien : abricots, prunes, poires ou pommes. Avec d'autres fruits que les cerises, on parle souvent de « flognarde »."
    }
  };

  const BLAGUES = [
    "Pourquoi les crêpes ne se fâchent jamais longtemps ? Parce qu'elles finissent toujours par se retourner ! 🥞",
    "Quel est le comble pour un cuisinier ? Se faire rouler dans la farine. 🍞",
    "Pourquoi le fondant est toujours de bonne humeur ? Parce qu'il a le cœur sur la main… et coulant ! 🍫",
    "Que dit un oignon à celui qui le coupe ? Rien, mais tout le monde pleure quand même. 🧅",
    "Pourquoi le burger est-il si populaire ? Parce qu'il a toujours un bon fond… et du fromage. 🍔"
  ];

  /* ==========================================================================
     DÉTECTION
     ========================================================================== */
  function findRecipes(text) {
    const found = [];
    Object.entries(ALIASES).forEach(([key, list]) => {
      if (has(text, list)) found.push(key);
    });
    // « salade » seul ne doit pas l'emporter s'il y a une autre recette
    if (found.length > 1 && found.includes("saladecesar") && !has(text, ["cesar", "caesar", "salade cesar"])) {
      found.splice(found.indexOf("saladecesar"), 1);
    }
    if (found.length > 1 && found.includes("jusorange") && !has(text, ["jus d orange", "jus orange", "orange pressee"])) {
      found.splice(found.indexOf("jusorange"), 1);
    }
    return found;
  }

  function fuzzyRecipe(text) {
    const words = text.trim().split(" ").filter((w) => w.length >= 5);
    for (const w of words) {
      for (const f of FUZZY_WORDS) {
        const d = levenshtein(w, f.word);
        if (d === 1 || (d === 2 && f.word.length >= 7)) return f.key;
      }
    }
    return null;
  }

  function findConcepts(text) {
    // « sans viande », « pas de chocolat » ne doivent pas compter comme des envies.
    const positive = text.replace(/\b(?:sans|pas de|pas d|pas)\s+(?!trop\b|lourd\b|lourde\b)\S+/g, " ");
    return Object.entries(CONCEPTS)
      .filter(([, c]) => has(positive, c.mots))
      .map(([k]) => k);
  }

  function findExclusions(text) {
    const ex = EXCLUSIONS.filter((e) => has(text, e.mots));
    // « sans burger », « pas de crêpes »…
    const recipeEx = [];
    const re = /(?:sans|pas de|pas d|pas)\s+([a-z' -]+)/g;
    let m;
    while ((m = re.exec(text)) !== null) {
      const chunk = ` ${m[1].split(" ").slice(0, 3).join(" ")} `;
      Object.entries(ALIASES).forEach(([key, list]) => {
        if (key !== "saladecesar" && has(chunk, list)) recipeEx.push(key);
        if (key === "saladecesar" && has(chunk, ["cesar", "salade"])) recipeEx.push(key);
      });
    }
    return { ex, recipeEx };
  }

  function findMaxMinutes(text) {
    const re = new RegExp(`(?:moins de|en|maximum|max|pas plus de|sous|en moins de|dans)\\s+${NUM}\\s*(min|minutes|mn|h|heure|heures)\\b`);
    const m = text.match(re);
    if (m) {
      const n = toNumber(m[1]);
      if (!Number.isNaN(n)) return /^h/.test(m[2]) ? n * 60 : n;
    }
    if (has(text, ["demi heure", "demi-heure"])) return 30;
    if (has(text, ["quart d heure"])) return 15;
    return null;
  }

  const UNITES_PORTIONS = "(?:personnes?|pers|gens|parts?|bols?|verres?|burgers?|fondants?|convives|invites|enfants|adultes|crepes?)";

  function findPortions(text, r) {
    // « pour 6 » (chiffres) ou « pour six personnes » (en lettres, avec une unité)
    const m =
      text.match(/pour\s+(\d{1,2})\b/) ||
      text.match(new RegExp(`pour\\s+${NUM}\\s+${UNITES_PORTIONS}\\b`)) ||
      text.match(new RegExp(`\\b(\\d{1,2})\\s+${UNITES_PORTIONS}\\b`));
    if (m) {
      const n = toNumber(m[1]);
      if (!Number.isNaN(n) && n > 0 && n <= 60) return Math.round(n);
    }
    if (r && has(text, ["double", "doubler", "le double", "deux fois plus"])) return r.portions.base * 2;
    if (r && has(text, ["moitie", "la moitie", "diviser par deux"])) return Math.max(1, Math.round(r.portions.base / 2));
    return null;
  }

  function findSeconds(text) {
    let total = 0;
    let found = false;
    const h = text.match(new RegExp(`${NUM}\\s*(?:heures?|h)(?![a-z])(?:\\s*(\\d{1,2})(?!\\s*(?:s|sec)))?`));
    if (h) {
      total += toNumber(h[1]) * 3600;
      if (h[2]) total += Number(h[2]) * 60;
      found = true;
    }
    const mn = text.match(new RegExp(`${NUM}\\s*(?:min|mn|minute|minutes)\\b`));
    if (mn && !(h && h[2])) {
      total += toNumber(mn[1]) * 60;
      found = true;
    }
    const s = text.match(new RegExp(`${NUM}\\s*(?:s|sec|seconde|secondes)\\b`));
    if (s) {
      total += toNumber(s[1]);
      found = true;
    }
    if (!found) {
      if (has(text, ["demi heure", "demi-heure"])) return 1800;
      if (has(text, ["trois quarts d heure"])) return 2700;
      if (has(text, ["quart d heure"])) return 900;
      return null;
    }
    return Number.isFinite(total) && total > 0 ? Math.round(total) : null;
  }

  /* ==========================================================================
     CONTEXTE DE CONVERSATION
     ========================================================================== */
  const ctx = {
    recette: A.page === "recipe" ? document.body.dataset.recipe : null,
    portions: null,
    portionsKey: null
  };

  /* ==========================================================================
     RÉPONSES
     ========================================================================== */
  function card(key, why = "") {
    return { key, why };
  }

  function recipeLink(r) {
    return `<a href="${r.url}">${esc(r.titreCourt)}</a>`;
  }

  const QUICK_RECIPE = ["Les ingrédients", "Combien de temps ?", "Les étapes", "Une astuce", "Le mode cuisine"];

  function answerIngredients(r, text) {
    const n = findPortions(text, r) || (ctx.portionsKey === r.key ? ctx.portions : null) || r.portions.base;
    ctx.portions = n;
    ctx.portionsKey = r.key;
    const lignes = A.tousIngredients(r)
      .map((i) => {
        const q = A.quantiteIngredient(i, r, n);
        return `<li>${esc(i.nom)}${q ? ` : <strong>${esc(q)}</strong>` : ""}${i.optionnel ? " <em>(option)</em>" : ""}</li>`;
      })
      .join("");
    return {
      html: `<p>Pour <strong>${esc(r.titreCourt.toLowerCase())}</strong> (${esc(A.portionsLabel(r, n))}) :</p><ul>${lignes}</ul>`,
      actions: [{ label: "Ajouter à ma liste", icon: "basket", type: "list", key: r.key, portions: n }],
      quick: [`Pour ${n + 2} ${r.portions.pluriel}`, "Combien de temps ?", "Les étapes"]
    };
  }

  function answerTime(r) {
    const t = r.temps;
    const parts = [`préparation ${A.duree(t.preparation)}`];
    if (t.cuisson) parts.push(`cuisson ${A.duree(t.cuisson)}`);
    if (t.repos) parts.push(`repos ${A.duree(t.repos)}`);
    return {
      html: `<p>Compte environ <strong>${A.duree(META.tempsTotal(r))}</strong> au total pour ${recipeLink(r)} : ${parts.join(", ")}.</p><p>Niveau : ${esc(r.difficulte.toLowerCase())}.</p>`,
      quick: ["Les étapes", "Les ingrédients", "Le mode cuisine"]
    };
  }

  function answerSteps(r) {
    return {
      html: `<p>Les ${r.etapes.length} étapes de ${recipeLink(r)} :</p><ol>${r.etapes.map((e) => `<li>${esc(e.titre)}</li>`).join("")}</ol><p>Le mode cuisine te guide étape par étape en grand, avec les minuteurs.</p>`,
      actions: [{ label: "Lancer le mode cuisine", icon: "book", type: "link", href: `${r.url}#cuisine` }],
      quick: ["Une astuce", "Les ingrédients"]
    };
  }

  function answerTips(r) {
    return {
      html: `<p>Les astuces du chef pour ${recipeLink(r)} :</p><ul>${r.astuces.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>`,
      quick: ["Comment la conserver ?", "Les ingrédients"]
    };
  }

  function answerStorage(r) {
    return { html: `<p><strong>Conservation</strong> — ${esc(r.conservation)}</p>`, quick: ["Une astuce", "Autre idée"] };
  }

  function answerAllergens(r) {
    const list = r.allergenes.map((a) => META.ALLERGENES[a] || a);
    return {
      html: list.length
        ? `<p>D'après les ingrédients listés, ${recipeLink(r)} contient : <strong>${esc(listeFr(list))}</strong>.</p>${r.noteAllergenes ? `<p>${esc(r.noteAllergenes)}</p>` : ""}<p>Vérifie toujours les étiquettes de tes produits.</p>`
        : `<p>Aucun des 14 allergènes majeurs dans les ingrédients listés de ${recipeLink(r)}. Vérifie quand même les étiquettes de tes produits.</p>`,
      quick: ["Des recettes sans gluten", "Des recettes sans lactose"]
    };
  }

  function answerOven(r) {
    const mentions = r.etapes.filter((e) => /°\s?C/.test(e.texte));
    if (!mentions.length) {
      return { html: `<p>${recipeLink(r)} ne passe pas au four : tout se fait ${r.temps.cuisson ? "à la poêle ou à la casserole" : "sans cuisson"}.</p>` };
    }
    return {
      html: `<p>Pour ${recipeLink(r)} :</p><ul>${mentions.map((e) => `<li><strong>${esc(e.titre)}</strong> — ${esc(e.texte)}</li>`).join("")}</ul>`
    };
  }

  function answerOrigin(r) {
    const o = r.origine;
    if (!o) return { html: `<p>Je n'ai pas d'informations fiables sur l'origine de ce plat.</p>` };
    return {
      html: `<p>${o.drapeau} <strong>${esc(o.pays)}</strong> — ${esc(o.resume)}</p><ul>${o.faits.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>`,
      actions: [{ label: "Voir les sources", icon: "globe", type: "link", href: `infos.html#${r.key}` }]
    };
  }

  function answerRecipe(r) {
    return {
      html: `<p>${r.emoji} ${pick(["Excellent choix !", "Ah, très bonne idée !", "Une valeur sûre de la maison !"])} ${esc(r.accroche)}</p><p>${A.duree(META.tempsTotal(r))} au total, niveau ${esc(r.difficulte.toLowerCase())}, pour ${esc(A.portionsLabel(r, r.portions.base))}.</p>`,
      cards: [card(r.key)],
      quick: QUICK_RECIPE
    };
  }

  function recommend(text, concepts, excl, maxMin) {
    const why = [];
    const labels = concepts.map((c) => CONCEPTS[c].label);
    let pool = RECETTES.slice();
    excl.ex.forEach((e) => {
      pool = pool.filter(e.test);
      why.push(e.label);
    });
    if (excl.recipeEx.length) pool = pool.filter((r) => !excl.recipeEx.includes(r.key));
    if (maxMin) {
      pool = pool.filter((r) => META.tempsTotal(r) <= maxMin);
      why.push(`${maxMin} min max`);
    }

    if (!pool.length) {
      return {
        html: `<p>Aucune recette de la maison ne coche toutes ces cases (${esc(listeFr(why))}) 😕</p><p>Tu veux que j'assouplisse un critère ?</p>`,
        quick: ["Une idée rapide", "Un dessert", "Un plat sans viande"]
      };
    }

    const scored = pool.map((r) => {
      let s = Math.random() * 0.5;
      const total = META.tempsTotal(r);
      concepts.forEach((c) => {
        const tags = CONCEPT_TAGS[c] || [];
        s += 3 * Math.min(2, tags.filter((t) => r.tags.includes(t)).length);
      });
      if (concepts.includes("dessert")) s += r.categorie === "dessert" ? 7 : -4;
      if (concepts.includes("plat") || concepts.includes("faim")) s += r.categorie === "plat" ? 5 : r.categorie === "brunch" ? 2 : -3;
      if (concepts.includes("boisson")) s += r.categorie === "boisson" ? 10 : -5;
      if (concepts.includes("brunch")) s += r.categorie === "brunch" || r.tags.includes("brunch") ? 6 : -1;
      if (concepts.includes("rapide") || concepts.includes("fatigue")) s += total <= 30 ? 4 : total <= 45 ? 0 : -4;
      if (concepts.includes("facile") || concepts.includes("fatigue")) s += /facile/i.test(r.difficulte) ? 2 : -2;
      if (concepts.includes("leger")) s += r.tags.includes("lourd") || r.tags.includes("copieux") ? -5 : 0;
      if (concepts.includes("copieux")) s += r.tags.includes("leger") ? -4 : 0;
      if (concepts.includes("chocolat")) s += r.tags.includes("chocolat") ? 6 : -2;
      if (!concepts.includes("boisson") && r.categorie === "boisson") s -= 3;
      if (has(text, ["ce soir", "soir"])) s += r.categorie === "plat" ? 2 : 0;
      return { r, s };
    });
    scored.sort((a, b) => b.s - a.s);
    const best = scored.filter((o) => o.s > 0.6).slice(0, 3);
    const final = best.length ? best : scored.slice(0, 3);

    const whyAll = [...labels, ...why];
    ctx.recette = final[0].r.key;
    ctx.portions = null;

    const intro = whyAll.length
      ? `<p>${pick(["Voilà ce que je te propose", "J'ai ce qu'il te faut", "Regarde ce que j'ai trouvé"])} (${esc(listeFr(whyAll))}) :</p>`
      : `<p>${pick(["Voilà quelques idées de la maison", "Je te propose ceci"])} :</p>`;

    return {
      html: intro,
      cards: final.map((o) => {
        const r = o.r;
        const reasons = [];
        if (maxMin || concepts.includes("rapide")) reasons.push(`⏱ ${A.duree(META.tempsTotal(r))}`);
        concepts.forEach((c) => {
          if ((CONCEPT_TAGS[c] || []).some((t) => r.tags.includes(t)) && reasons.length < 3) reasons.push(CONCEPTS[c].label);
        });
        return card(r.key, reasons.join(" · "));
      }),
      quick: ["Les ingrédients", "Combien de temps ?", "Autre idée"]
    };
  }

  function fromFridge(text) {
    const have = cleanKeys(
      Object.entries(INGREDIENTS)
        .filter(([, syn]) => has(text, syn))
        .map(([k]) => k)
    );
    if (!have.length) return null;
    const results = RECETTES.map((r) => {
      const ings = RECIPE_INGS[r.key];
      const matched = ings.filter((i) => i.keys.some((k) => have.includes(k)));
      const missing = ings.filter((i) => !i.keys.some((k) => have.includes(k)));
      // couverts : combien des ingrédients cités par la personne la recette utilise
      const couverts = have.filter((k) => ings.some((i) => i.keys.includes(k))).length;
      return { r, matched, missing, couverts, ratio: ings.length ? matched.length / ings.length : 0 };
    })
      .filter((o) => o.matched.length)
      .sort((a, b) => b.couverts - a.couverts || a.missing.length - b.missing.length)
      .slice(0, 3);
    if (!results.length) {
      return {
        html: `<p>Hmm, avec ça je n'ai pas de recette de la maison… mais tu peux me dire ce que tu as d'autre dans le frigo !</p>`,
        quick: ["J'ai des œufs, du lait et de la farine", "Une idée rapide"]
      };
    }
    ctx.recette = results[0].r.key;
    const lines = results
      .map((o) => {
        const miss = o.missing.slice(0, 4).map((i) => i.nom.toLowerCase());
        return `<li><strong>${esc(o.r.titreCourt)}</strong> — tu as ${o.matched.length} ingrédient${o.matched.length > 1 ? "s" : ""} sur ${o.matched.length + o.missing.length}${
          miss.length ? `. Il te manque : ${esc(listeFr(miss))}${o.missing.length > 4 ? "…" : ""}` : ". Tu as tout ! 🎉"
        }</li>`;
      })
      .join("");
    return {
      html: `<p>Avec ce que tu as, voici les recettes les plus proches :</p><ul>${lines}</ul>`,
      cards: results.map((o) => card(o.r.key, `${o.matched.length}/${o.matched.length + o.missing.length} ingrédients`)),
      quick: ["Les ingrédients", "Une autre idée"]
    };
  }

  function substitution(text, r) {
    const key = Object.keys(SUBSTITUTIONS).find((k) => has(text, INGREDIENTS[k] || [k]));
    if (!key) {
      return {
        html: `<p>Dis-moi quel ingrédient tu veux remplacer (œufs, beurre, lait, farine, sucre, lardons, saumon…) et je te donne une solution.</p>`,
        quick: ["Remplacer les œufs", "Remplacer le beurre", "Remplacer le lait"]
      };
    }
    const sub = SUBSTITUTIONS[key];
    const usedIn = RECETTES.filter((x) => RECIPE_INGS[x.key].some((i) => i.keys.includes(key))).map((x) => x.titreCourt.toLowerCase());
    const concerne = r && RECIPE_INGS[r.key].some((i) => i.keys.includes(key));
    const contexte = !concerne
      ? ""
      : (sub.deconseille || []).includes(r.key)
        ? `<p>Pour ${recipeLink(r)}, je te déconseille de le remplacer : c'est un ingrédient clé de la recette.</p>`
        : `<p>Pour ${recipeLink(r)}, tu peux essayer cette solution.</p>`;
    return {
      html: `<p><strong>Pour remplacer ${esc(sub.label)} :</strong> ${esc(sub.texte)}</p>${contexte}${
        usedIn.length && !contexte ? `<p class="muted">On en trouve dans : ${esc(listeFr(usedIn))}.</p>` : ""
      }`,
      quick: [{ oeufs: "Des recettes sans œufs", lait: "Des recettes sans lactose", chocolat: "Des recettes sans chocolat", farine: "Des recettes sans gluten" }[key], "Remplacer le beurre", "Une idée de recette"].filter(Boolean)
    };
  }

  function conversion(text) {
    const n = (s) => Number(String(s).replace(",", "."));
    const fmt = (v, d = 0) => String(Math.round(v * 10 ** d) / 10 ** d).replace(".", ",");

    let m = text.match(/(?:thermostat|th)\s*(\d{1,2}(?:[.,]5)?)/);
    if (m) {
      const th = n(m[1]);
      return { html: `<p>Thermostat ${fmt(th, 1)} ≈ <strong>${fmt(th * 30)} °C</strong>.</p><p class="muted">Repère courant en France : on multiplie le thermostat par 30 (th. 6 = 180 °C). Les fours varient, surveille la cuisson.</p>` };
    }
    m = text.match(/(-?\d+(?:[.,]\d+)?)\s*(?:°|degres?|deg)?\s*f(?:ahrenheit)?\b/);
    if (m) {
      const f = n(m[1]);
      const c = ((f - 32) * 5) / 9;
      return { html: `<p>${fmt(f)} °F = <strong>${fmt(c)} °C</strong>${c >= 30 && c <= 300 ? ` (≈ thermostat ${fmt(c / 30, 1)})` : ""}.</p><p class="muted">Formule : (°F − 32) × 5/9.</p>` };
    }
    m = text.match(/(-?\d+(?:[.,]\d+)?)\s*(?:°|degres?|deg)?\s*c(?:elsius)?\b.*(?:en|vers)\s*(?:°\s*)?(f|fahrenheit|thermostat|th)\b/);
    if (m) {
      const c = n(m[1]);
      if (/^f/.test(m[2])) return { html: `<p>${fmt(c)} °C = <strong>${fmt((c * 9) / 5 + 32)} °F</strong>.</p><p class="muted">Formule : °C × 9/5 + 32.</p>` };
      return { html: `<p>${fmt(c)} °C ≈ <strong>thermostat ${fmt(c / 30, 1)}</strong>.</p><p class="muted">Repère courant : °C ÷ 30.</p>` };
    }
    m = text.match(/(\d+(?:[.,]\d+)?)?\s*\b(?:cuilleres?|c)\s+a\s+(soupe|cafe)\b/);
    if (m && has(text, ["ml", "combien", "convertir", "en", "equivaut", "c est"])) {
      const q = m[1] ? n(m[1]) : 1;
      const ml = m[2] === "soupe" ? 15 : 5;
      return { html: `<p>${fmt(q, 1)} cuillère${q > 1 ? "s" : ""} à ${m[2] === "soupe" ? "soupe" : "café"} ≈ <strong>${fmt(q * ml, 1)} ml</strong>.</p><p class="muted">En poids, ça dépend de l'ingrédient : le plus fiable reste la balance.</p>` };
    }
    m = text.match(/(\d+(?:[.,]\d+)?)?\s*(?:cups?|tasses?)\b/);
    if (m) {
      const q = m[1] ? n(m[1]) : 1;
      return { html: `<p>${fmt(q, 2)} ${q > 1 ? "cups américaines" : "cup américaine"} ≈ <strong>${fmt(q * 240)} ml</strong> (exactement 236,6 ml par cup).</p><p class="muted">En poids, cela dépend de l'ingrédient (une cup de farine pèse bien moins qu'une cup de sucre).</p>` };
    }
    m = text.match(/(\d+(?:[.,]\d+)?)\s*(?:oz|onces?|ounces?)\b/);
    if (m) {
      const q = n(m[1]);
      return { html: `<p>${fmt(q, 2)} oz = <strong>${fmt(q * 28.35)} g</strong> (1 once = 28,35 g).</p>` };
    }
    m = text.match(/(\d+(?:[.,]\d+)?)\s*(lbs?|pounds?|livres?)\b/);
    if (m) {
      const q = n(m[1]);
      const isLivre = /^livre/.test(m[2]);
      return {
        html: `<p>${fmt(q, 2)} lb = <strong>${fmt(q * 453.6)} g</strong> (1 lb = 453,6 g).</p>${isLivre ? `<p class="muted">Attention : dans les recettes françaises anciennes, « une livre » désigne souvent 500 g.</p>` : ""}`
      };
    }
    m = text.match(/(\d+(?:[.,]\d+)?)\s*(kg|g|l|cl|ml|dl)\s+(?:en|=|vers)\s+(kg|g|l|cl|ml|dl)\b/);
    if (m) {
      const factor = { kg: 1000, g: 1, l: 1000, dl: 100, cl: 10, ml: 1 };
      const masses = ["kg", "g"];
      if (masses.includes(m[2]) !== masses.includes(m[3])) {
        return { html: `<p>On ne peut pas convertir directement une masse en volume : ça dépend de l'ingrédient (pour l'eau et le lait, 1 ml ≈ 1 g).</p>` };
      }
      const v = (n(m[1]) * factor[m[2]]) / factor[m[3]];
      return { html: `<p>${fmt(n(m[1]), 2)} ${m[2]} = <strong>${fmt(v, 2)} ${m[3]}</strong>.</p>` };
    }
    return null;
  }

  function respond(raw) {
    const text = norm(raw);
    const words = text.trim().split(" ").filter(Boolean);
    const mentions = findRecipes(text);
    let r = mentions.length === 1 ? BY_KEY[mentions[0]] : null;
    if (!mentions.length && words.length <= 4) {
      const fz = fuzzyRecipe(text);
      if (fz) r = BY_KEY[fz];
    }
    const current = r || (ctx.recette ? BY_KEY[ctx.recette] : null);

    // --- Minuteur ---
    if (has(text, ["minuteur", "timer", "chrono", "chronometre", "minuterie", "compte a rebours", "reveille-moi", "previens-moi", "rappelle-moi"]) || /\b(lance|mets|met|regle|demarre)\b.*\b(min|minutes?|secondes?|heures?)\b/.test(text)) {
      const secs = findSeconds(text);
      if (secs) {
        const label = current && has(text, ["pour", "cuisson", "repos"]) ? `Minuteur · ${current.titreCourt}` : "Minuteur";
        A.startTimer(secs, label, current && label !== "Minuteur" ? current.key : "");
        return { html: `<p>⏱ C'est parti pour <strong>${esc(A.dureeSecondes(secs))}</strong> ! Le minuteur est en bas à gauche de l'écran, et il sonnera même si tu changes de page sur le site.</p>`, quick: ["Lance un minuteur de 5 min", "Merci !"] };
      }
      return { html: `<p>Combien de temps ? Par exemple : « minuteur 12 minutes » ou « lance un chrono de 1 h 30 ».</p>`, quick: ["Minuteur 5 min", "Minuteur 10 min", "Minuteur 30 min"] };
    }

    // --- Conversions ---
    if (has(text, ["convertir", "conversion", "thermostat", "fahrenheit", "°f", "cup", "cups", "tasse", "once", "oz", "lb", "livre", "livres", "combien de ml", "en ml", "en grammes", "en g", "en cl"]) || /\d\s*°?\s*f\b/.test(text) || /\bth\s*\d/.test(text)) {
      const c = conversion(text);
      if (c) return c;
    }

    // --- Remplacements ---
    if (has(text, ["remplacer", "remplace", "substituer", "substitut", "a la place", "alternative", "equivalent", "je n ai pas de", "j ai pas de", "je n ai plus de", "j ai plus de", "je n ai pas d", "j ai pas d", "je n ai plus d", "j ai plus d", "il me manque", "manque de"])) {
      return substitution(text, current);
    }

    // --- Petits mots ---
    const short = words.length <= 4;
    if (has(text, ["merci", "merci beaucoup", "super merci", "top merci", "thanks"]) && short) {
      return { html: `<p>${pick(["Avec plaisir ! 😊", "De rien, régale-toi bien !", "Toujours là pour aider en cuisine 👨‍🍳"])}</p>`, quick: ["Une autre idée", "Une blague"] };
    }
    if (has(text, ["au revoir", "bye", "a plus", "a bientot", "bonne nuit", "ciao"])) {
      return { html: `<p>À bientôt dans la cuisine d'Antoine ! 👋 Bon appétit.</p>` };
    }
    if (has(text, ["blague", "rigoler", "fais moi rire", "drole", "humour"])) {
      return { html: `<p>${esc(pick(BLAGUES))}</p>`, quick: ["Une autre blague", "Une idée de recette"] };
    }
    if (has(text, ["qui es tu", "tu es qui", "t es qui", "es tu une ia", "es-tu une ia", "tu es une ia", "t es un robot", "es tu un robot", "comment tu marches", "comment tu fonctionnes", "chatgpt", "intelligence artificielle"])) {
      return {
        html: `<p>Je suis l'assistant du site du restaurant d'Antoine 👨‍🍳. Je ne suis pas une intelligence artificielle : je fonctionne avec des règles simples et les données des ${RECETTES.length} recettes du site, directement dans ton navigateur. Rien de ce que tu écris n'est envoyé ailleurs.</p><p>Du coup, je suis bon pour parler des recettes de la maison, mais je ne sais pas tout !</p>`,
        quick: ["Que sais-tu faire ?", "Une idée pour ce soir"]
      };
    }
    if (has(text, ["aide", "help", "que sais tu faire", "tu sais faire quoi", "tu peux faire quoi", "comment ca marche", "fonctionnalites"])) {
      return {
        html: `<p>Voici ce que je sais faire :</p><ul>
          <li>🍽️ Te proposer une recette selon tes envies : « un dessert facile », « sans viande en moins de 30 min »</li>
          <li>🧺 Trouver quoi cuisiner avec ce que tu as : « j'ai des œufs, du lait et de la farine »</li>
          <li>📋 Te donner les ingrédients pour le bon nombre : « ingrédients des crêpes pour 8 »</li>
          <li>🔄 Remplacer un ingrédient : « par quoi remplacer le beurre ? »</li>
          <li>🌡️ Convertir : « 350 °F en °C », « thermostat 7 », « 2 cups »</li>
          <li>⏱ Lancer un minuteur : « minuteur 12 minutes »</li>
          <li>🌍 Raconter l'origine d'un plat : « d'où vient la salade César ? »</li>
        </ul>`,
        quick: ["Une idée pour ce soir", "J'ai des œufs et du chocolat", "350 °F en °C"]
      };
    }
    if (has(text, ["ca va", "comment vas tu", "comment tu vas", "la forme"]) && short) {
      return { html: `<p>Ça mijote très bien, merci ! 🍲 Et toi, tu as faim de quoi aujourd'hui ?</p>`, quick: ["Une idée pour ce soir", "Un dessert"] };
    }

    // --- Navigation ---
    if (has(text, ["jeu", "jeux", "jouer", "memory", "quiz", "s ennuie", "je m ennuie"])) {
      return { html: `<p>🎮 Il y a 4 mini-jeux au restaurant : la course du chef, le memory, le quiz et le coup de feu en cuisine.</p>`, actions: [{ label: "Voir les jeux", type: "link", href: "jeux.html" }] };
    }
    if (has(text, ["liste de courses", "ma liste", "courses"])) {
      return { html: `<p>Ta liste de courses s'ouvre sur le côté. Sur chaque recette, le bouton « Ajouter à ma liste » y met les ingrédients avec les bonnes quantités.</p>`, actions: [{ label: "Ouvrir ma liste", icon: "basket", type: "openlist" }] };
    }
    if (has(text, ["livre d or", "laisser un avis", "donner mon avis", "noter"])) {
      return { html: `<p>⭐ Le livre d'or t'attend : tu peux y laisser une note et un petit mot.</p>`, actions: [{ label: "Aller au livre d'or", type: "link", href: "avis.html" }] };
    }
    if (has(text, ["contacter", "contact", "poser une question", "ecrire au chef", "envoyer un message"])) {
      return { html: `<p>✉️ Pour écrire directement au restaurant, utilise le formulaire de la page Questions.</p>`, actions: [{ label: "Poser une question", type: "link", href: "questions.html" }] };
    }

    // --- Hasard ---
    if (has(text, ["hasard", "au hasard", "surprends moi", "surprise", "random", "n importe", "choisis pour moi", "je sais pas", "je ne sais pas", "aucune idee", "autre idee", "une autre idee"])) {
      const pool = RECETTES.filter((x) => x.key !== ctx.recette);
      const x = pick(pool);
      ctx.recette = x.key;
      ctx.portions = null;
      return { html: `<p>🎲 ${pick(["Le destin a choisi", "La roulette du chef s'arrête sur", "Et pourquoi pas"])} : <strong>${esc(x.titreCourt)}</strong> !</p>`, cards: [card(x.key)], quick: ["Les ingrédients", "Autre idée", "Combien de temps ?"] };
    }

    // --- Superlatifs ---
    if (has(text, ["plus rapide", "le plus vite", "la plus rapide"])) {
      const x = RECETTES.slice().sort((a, b) => META.tempsTotal(a) - META.tempsTotal(b))[0];
      ctx.recette = x.key;
      return { html: `<p>La plus rapide de la maison : <strong>${esc(x.titreCourt)}</strong>, en ${A.duree(META.tempsTotal(x))}.</p>`, cards: [card(x.key)] };
    }
    if (has(text, ["preferee", "prefere", "la plus aimee", "le plus aime", "populaire", "la meilleure recette", "les plus aimees"])) {
      const counts = A.likeCounts;
      const ranked = RECETTES.filter((x) => counts[x.key] > 0).sort((a, b) => counts[b.key] - counts[a.key]);
      if (!ranked.length) return { html: `<p>Je n'ai pas encore de likes à comparer (ou le compteur n'est pas joignable). Donne ton cœur à ta recette préférée pour lancer le classement ❤️</p>` };
      ctx.recette = ranked[0].key;
      return { html: `<p>La préférée des visiteurs en ce moment : <strong>${esc(ranked[0].titreCourt)}</strong> avec ${counts[ranked[0].key]} ❤️.</p>`, cards: ranked.slice(0, 3).map((x) => card(x.key, `❤️ ${counts[x.key]}`)) };
    }

    // --- « J'ai… » / frigo ---
    if (has(text, ["j ai", "il me reste", "dans mon frigo", "dans le frigo", "frigo", "placard", "avec quoi", "faire avec", "j avais"]) && !has(text, ["j ai faim", "j ai soif"])) {
      const fridge = fromFridge(text);
      if (fridge) return fridge;
    }

    // --- Questions sur une recette ---
    const concepts = findConcepts(text);
    const excl = findExclusions(text);
    const maxMin = findMaxMinutes(text);
    const wantsNew = !r && (concepts.length > 0 || excl.ex.length > 0 || maxMin || has(text, ["idee", "envie", "propose", "suggestion", "autre chose", "quoi manger", "quoi cuisiner"]));
    if (current && !wantsNew) {
      if (has(text, ["calorie", "kcal", "nutrition", "nutritionnel", "nutritionnelle", "proteine", "glucide", "lipide"])) {
        return { html: `<p>Je n'ai pas d'informations nutritionnelles fiables pour ${recipeLink(current)}, donc je préfère ne pas te donner de chiffre inventé. Une application de nutrition, avec les quantités de la liste d'ingrédients, te donnera une estimation.</p>` };
      }
      if (has(text, ["prix", "cout", "combien ca coute", "budget"])) {
        return { html: `<p>Je n'ai pas de données de prix : ils varient trop selon les magasins et les saisons pour que je te donne un chiffre fiable.</p>` };
      }
      if (has(text, ["origine", "d ou vient", "d ou viennent", "histoire", "qui a invente", "invente", "pays"])) return answerOrigin(current);
      if (has(text, ["combien de temps", "temps", "duree", "long", "rapide a faire", "ca prend"])) return answerTime(current);
      const asksIngredients = has(text, ["ingredient", "il faut quoi", "faut quoi", "qu est ce qu il faut", "quantite", "combien de", "liste", "pour combien"]);
      const portionsAsked = findPortions(text, current);
      if (asksIngredients || (portionsAsked && words.length <= 6)) return answerIngredients(current, text);
      if (has(text, ["mode cuisine", "lance la recette", "guide moi", "pas a pas", "on commence", "c est parti"])) {
        return { html: `<p>👩‍🍳 Le mode cuisine affiche une étape à la fois en grand, avec les minuteurs et l'écran qui reste allumé.</p>`, actions: [{ label: "Lancer le mode cuisine", type: "link", href: `${current.url}#cuisine` }] };
      }
      if (has(text, ["etape", "comment faire", "comment on fait", "comment je fais", "comment le faire", "comment la faire", "comment les faire", "preparation", "deroulement"])) return answerSteps(current);
      if (has(text, ["astuce", "conseil", "secret", "reussir", "rater"])) return answerTips(current);
      if (has(text, ["conserver", "conservation", "garder", "frigo", "congeler", "congelation", "le lendemain", "reste"])) return answerStorage(current);
      if (has(text, ["allergene", "allergie", "gluten", "lactose", "intolerance", "arachide"]) && !has(text, ["sans", "recette", "recettes"])) return answerAllergens(current);
      if (has(text, ["four", "temperature", "degres", "thermostat", "°c"])) return answerOven(current);
      if (has(text, ["difficile", "complique", "niveau", "difficulte"])) return { html: `<p>${recipeLink(current)} : niveau <strong>${esc(current.difficulte.toLowerCase())}</strong>, ${current.etapes.length} étapes.</p>` };
      if (has(text, ["vin", "boire avec", "accompagner", "accompagnement", "accord", "avec quoi servir", "servir avec"])) {
        return { html: `<p>Idées pour accompagner ${recipeLink(current)} :</p><ul>${current.accords.map((a) => `<li><strong>${esc(a.titre)}</strong> : ${esc(a.texte)}</li>`).join("")}</ul>` };
      }
    }

    // --- Une recette citée seule ---
    if (r) {
      ctx.recette = r.key;
      ctx.portions = null;
      return answerRecipe(r);
    }

    // --- Recommandation ---
    if (concepts.length || excl.ex.length || excl.recipeEx.length || maxMin || has(text, ["idee", "envie", "propose", "suggestion", "conseille", "cuisiner", "manger", "quoi faire", "recette", "ce soir", "menu"])) {
      if (has(text, ["soif"]) && !concepts.includes("boisson")) concepts.push("boisson");
      return recommend(text, concepts, excl, maxMin);
    }

    // --- Salutations ---
    if (has(text, ["bonjour", "salut", "coucou", "hello", "hey", "bonsoir", "yo", "hi", "wesh"])) {
      const page = A.page === "recipe" && BY_KEY[ctx.recette] ? `<p>Je vois que tu regardes ${recipeLink(BY_KEY[ctx.recette])} : demande-moi les ingrédients pour ton nombre de convives, un minuteur ou une astuce !</p>` : "";
      return { html: `<p>${pick(["Bonjour", "Salut", "Coucou"])} ! 👋 Je suis l'assistant du chef Antoine.</p>${page}<p>Dis-moi ce qui te ferait plaisir et je te trouve la bonne recette.</p>`, quick: defaultQuick() };
    }

    // --- Pas compris ---
    return {
      html: `<p>${pick(["Je n'ai pas bien compris 🤔", "Hmm, là je sèche un peu 🤔", "Pardon, je n'ai pas saisi 🤔"])}</p><p>Essaie par exemple : « une idée de dessert facile », « j'ai des œufs et du lait », ou le nom d'une recette.</p>`,
      quick: ["Que sais-tu faire ?", "Une idée pour ce soir", "Surprends-moi"]
    };
  }

  function defaultQuick() {
    if (A.page === "recipe" && BY_KEY[ctx.recette]) {
      const r = BY_KEY[ctx.recette];
      return [`Ingrédients pour ${r.portions.base + 2}`, "Une astuce", "Combien de temps ?", "D'où vient ce plat ?", "Remplacer un ingrédient"];
    }
    return ["Une idée pour ce soir", "Un dessert au chocolat", "J'ai des œufs, du lait et de la farine", "Sans viande en moins de 30 min", "350 °F en °C", "Minuteur 10 min"];
  }

  /* ==========================================================================
     INTERFACE
     ========================================================================== */
  let panel = null;
  let fab = null;
  let history = [];

  function loadHistory() {
    try {
      const raw = sessionStorage.getItem(CHAT_KEY);
      const data = raw ? JSON.parse(raw) : null;
      if (data && Array.isArray(data.history)) {
        history = data.history.slice(-40);
        if (data.recette && !ctx.recette) ctx.recette = data.recette;
      }
    } catch {
      history = [];
    }
  }

  function saveHistory() {
    try {
      sessionStorage.setItem(CHAT_KEY, JSON.stringify({ history: history.slice(-40), recette: ctx.recette }));
    } catch {
      /* stockage indisponible */
    }
  }

  function renderCards(cards) {
    return `<div class="msg-cards">${cards
      .map(({ key, why }) => {
        const r = BY_KEY[key];
        if (!r) return "";
        const img = A.imageDe(r);
        return `<a class="chat-card" href="${r.url}">
            <img src="${img.thumb}" alt="" loading="lazy">
            <div><strong>${esc(r.titreCourt)}</strong><small>${A.duree(META.tempsTotal(r))} · ${esc(r.difficulte)}</small>${why ? `<span class="why">${esc(why)}</span>` : ""}</div>
          </a>`;
      })
      .join("")}</div>`;
  }

  function renderActions(actions) {
    return `<div class="quick-replies" style="padding:0 0 0 38px">${actions
      .map((a, i) => {
        const label = `${a.icon ? icon(a.icon) : ""}${esc(a.label)}`;
        if (a.type === "link") return `<button type="button" style="--i:${i}" data-chat-href="${esc(a.href)}">${label}</button>`;
        if (a.type === "list") return `<button type="button" style="--i:${i}" data-chat-list="${esc(a.key)}" data-portions="${a.portions}">${label}</button>`;
        if (a.type === "openlist") return `<button type="button" style="--i:${i}" data-open-list>${label}</button>`;
        return "";
      })
      .join("")}</div>`;
  }

  const AVATAR = `<span class="avatar avatar-chef" aria-hidden="true">${A.logo || "👨‍🍳"}</span>`;
  const TOUCH = window.matchMedia("(pointer: coarse)").matches;

  function appendMessage(msg, animate = true) {
    const bodyEl = panel.querySelector(".chat-body");
    const wrap = document.createElement("div");
    wrap.className = "msg-group";
    if (msg.from === "user") {
      wrap.innerHTML = `<div class="msg user"><div class="msg-bubble">${esc(msg.text)}</div></div>`;
    } else {
      wrap.innerHTML = `<div class="msg bot">${AVATAR}<div class="msg-bubble">${msg.html}</div></div>${
        msg.cards?.length ? renderCards(msg.cards) : ""
      }${msg.actions?.length ? renderActions(msg.actions) : ""}`;
    }
    if (!animate) wrap.querySelectorAll(".msg, .msg-cards, .quick-replies button").forEach((n) => (n.style.animation = "none"));
    bodyEl.appendChild(wrap);
    // Une réponse longue doit se lire depuis son début : on cale le début du
    // message en haut de la zone visible plutôt que d'aller tout en bas.
    const top = wrap.offsetTop - 12;
    const bottom = bodyEl.scrollHeight - bodyEl.clientHeight;
    bodyEl.scrollTop = msg.from === "bot" && wrap.offsetHeight > bodyEl.clientHeight * 0.6 ? Math.min(top, bottom) : bottom;
  }

  function setQuick(list) {
    const q = panel.querySelector(".chat-quick");
    q.innerHTML = (list || []).map((label, i) => `<button type="button" style="--i:${i}" data-quick="${esc(label)}">${esc(label)}</button>`).join("");
  }

  let busy = false;

  function send(text) {
    const clean = String(text || "").trim().slice(0, 400);
    if (!clean || busy) return;
    busy = true;
    const userMsg = { from: "user", text: clean };
    history.push(userMsg);
    appendMessage(userMsg);
    setQuick([]);

    const bodyEl = panel.querySelector(".chat-body");
    const typing = document.createElement("div");
    typing.className = "msg bot";
    typing.innerHTML = `${AVATAR}<div class="msg-bubble typing" aria-label="L'assistant écrit"><i></i><i></i><i></i></div>`;
    bodyEl.appendChild(typing);
    bodyEl.scrollTop = bodyEl.scrollHeight;

    let reply;
    try {
      reply = respond(clean);
    } catch (error) {
      console.error(error);
      reply = { html: "<p>Oups, j'ai renversé la casserole 😅 Peux-tu reformuler ?</p>" };
    }
    const delay = Math.min(1100, 380 + reply.html.length * 0.8);
    setTimeout(() => {
      try {
        typing.remove();
        const botMsg = { from: "bot", html: reply.html, cards: reply.cards || [], actions: reply.actions || [], quick: reply.quick || [] };
        history.push(botMsg);
        appendMessage(botMsg);
        setQuick(reply.quick?.length ? reply.quick : defaultQuick());
        saveHistory();
      } finally {
        busy = false;
      }
    }, delay);
  }

  function welcome() {
    const r = A.page === "recipe" ? BY_KEY[ctx.recette] : null;
    return {
      from: "bot",
      html: r
        ? `<p>Bonjour ! 👋 Je suis l'assistant du chef.</p><p>Tu regardes ${recipeLink(r)} : je peux te donner les ingrédients pour ton nombre de convives, lancer un minuteur, proposer un remplacement ou une astuce.</p>`
        : `<p>Bonjour ! 👋 Je suis l'assistant du chef Antoine.</p><p>Dis-moi ce qui te ferait envie, ce qu'il te reste dans le frigo, ou pose-moi une question sur une recette.</p>`,
      cards: [],
      actions: []
    };
  }

  function build() {
    fab = document.createElement("button");
    fab.className = "chat-fab";
    fab.type = "button";
    fab.setAttribute("aria-label", "Ouvrir l'assistant du chef");
    fab.innerHTML = `${AVATAR}<span class="fab-label">Demande au chef</span>${
      A.store.get("antoine-chat-vu") ? "" : '<span class="ping" aria-hidden="true"></span>'
    }`;
    document.body.appendChild(fab);

    panel = document.createElement("section");
    panel.className = "chat";
    panel.hidden = true;
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Assistant du chef");
    panel.innerHTML = `
      <div class="chat-head">
        ${AVATAR}
        <div class="who"><strong>L'assistant du chef</strong><small>Répond instantanément</small></div>
        <button class="icon-btn" type="button" data-chat-clear aria-label="Effacer la conversation" title="Nouvelle conversation">${icon("trash")}</button>
        <button class="icon-btn chat-expand" type="button" data-chat-expand aria-label="Agrandir">${icon("expand")}</button>
        <button class="icon-btn" type="button" data-chat-close aria-label="Fermer l'assistant">${icon("x")}</button>
      </div>
      <div class="chat-body" role="log" aria-live="polite"></div>
      <div class="chat-foot">
        <div class="quick-replies chat-quick" style="padding-top:10px"></div>
        <form class="chat-form" autocomplete="off">
          <input type="text" name="q" placeholder="Écris ta question…" aria-label="Ta question" maxlength="400">
          <button class="send" type="submit" aria-label="Envoyer">${icon("send")}</button>
        </form>
        <p class="chat-note">Assistant à règles simples, sans IA : vérifie toujours les informations importantes.</p>
      </div>`;
    document.body.appendChild(panel);

    loadHistory();
    if (!history.length) history.push(welcome());
    history.forEach((m) => appendMessage(m, false));
    const lastBot = [...history].reverse().find((m) => m.from === "bot");
    setQuick(lastBot?.quick?.length ? lastBot.quick : defaultQuick());

    fab.addEventListener("click", () => open());
    panel.querySelector("[data-chat-close]").addEventListener("click", close);
    panel.querySelector("[data-chat-expand]").addEventListener("click", (e) => {
      const expanded = panel.classList.toggle("is-expanded");
      e.currentTarget.innerHTML = icon(expanded ? "shrink" : "expand");
      e.currentTarget.setAttribute("aria-label", expanded ? "Réduire" : "Agrandir");
    });
    panel.querySelector("[data-chat-clear]").addEventListener("click", () => {
      history = [welcome()];
      ctx.portions = null;
      ctx.recette = A.page === "recipe" ? document.body.dataset.recipe : null;
      panel.querySelector(".chat-body").innerHTML = "";
      appendMessage(history[0]);
      setQuick(defaultQuick());
      saveHistory();
    });
    panel.querySelector(".chat-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const input = e.currentTarget.q;
      send(input.value);
      input.value = "";
      if (TOUCH) input.blur();
    });
    // iPhone/Android : le clavier réduit la zone visible sans réduire 100vh.
    // On cale le panneau sur la zone réellement visible.
    const vv = window.visualViewport;
    if (vv) {
      let lastHeight = vv.height;
      const fit = () => {
        if (panel.hidden || window.innerWidth > 560) {
          panel.style.removeProperty("top");
          panel.style.removeProperty("height");
          lastHeight = vv.height;
          return;
        }
        panel.style.top = `${vv.offsetTop}px`;
        panel.style.height = `${vv.height}px`;
        // Seulement quand le clavier s'ouvre : le dernier message reste visible au-dessus du champ.
        // (Sinon on ne touche pas au défilement, pour pouvoir lire le début d'une longue réponse.)
        const typing = document.activeElement?.closest?.(".chat-form");
        if (typing && vv.height < lastHeight - 80) {
          const bodyEl = panel.querySelector(".chat-body");
          bodyEl.scrollTop = bodyEl.scrollHeight;
        }
        lastHeight = vv.height;
      };
      vv.addEventListener("resize", fit);
      vv.addEventListener("scroll", fit);
      panel.fit = fit;
    }
    panel.addEventListener("click", (e) => {
      const q = e.target.closest("[data-quick]");
      if (q) send(q.dataset.quick);
      const href = e.target.closest("[data-chat-href]");
      if (href) location.href = href.dataset.chatHref;
      const list = e.target.closest("[data-chat-list]");
      if (list) {
        const r = BY_KEY[list.dataset.chatList];
        if (r) A.addRecipeToList(r, Number(list.dataset.portions) || r.portions.base);
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !panel.hidden && !document.querySelector(".palette:not([hidden]), .drawer:not([hidden]), .lightbox:not([hidden]), .cook")) close();
    });
  }

  function open(prompt) {
    if (!panel) build();
    panel.hidden = false;
    document.body.classList.add("chat-open");
    panel.fit?.();
    fab.classList.add("is-hidden");
    fab.querySelector(".ping")?.remove();
    A.store.set("antoine-chat-vu", "1");
    const bodyEl = panel.querySelector(".chat-body");
    bodyEl.scrollTop = bodyEl.scrollHeight;
    if (prompt) send(prompt);
    // Pas de focus automatique sur mobile : le clavier cacherait la conversation.
    else if (!TOUCH) setTimeout(() => panel.querySelector(".chat-form input").focus(), 50);
  }

  function close() {
    panel.hidden = true;
    document.body.classList.remove("chat-open");
    fab.classList.remove("is-hidden");
    fab.focus();
  }

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-open-chat], [data-chat-prompt]");
    if (!trigger) return;
    e.preventDefault();
    open(trigger.dataset.chatPrompt || "");
  });

  build();
  window.AntoineChat = { open, send, respond };
})();
