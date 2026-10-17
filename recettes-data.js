/**
 * LE RESTAURANT D'ANTOINE — DONNÉES DES RECETTES
 * ------------------------------------------------
 * Ce fichier est la source unique de toutes les recettes du site.
 * Les pages recettes, l'accueil, la recherche, l'assistant (chatbot)
 * et les jeux lisent tous ces données.
 *
 * Pour modifier une recette : change le texte ici, enregistre, c'est tout.
 * Pour ajouter une recette : copie un bloc { ... }, change la "key"
 * (sans accent ni espace), crée la page HTML correspondante en copiant
 * par exemple crepes.html et en changeant data-recipe="...".
 *
 * Unités reconnues pour les pluriels automatiques : pièce, tranche,
 * feuille, gousse, pincée, bouquet, sachet, portion, tige, brin.
 * Les autres unités (g, ml, c. à soupe…) restent invariables.
 */
(function () {
  "use strict";

  const CATEGORIES = {
    plat: { label: "Plats", singulier: "Plat", emoji: "🍲" },
    dessert: { label: "Desserts", singulier: "Dessert", emoji: "🍰" },
    brunch: { label: "Brunch", singulier: "Brunch", emoji: "🥑" },
    boisson: { label: "Boissons", singulier: "Boisson", emoji: "🍊" }
  };

  // Les 14 allergènes à déclaration obligatoire dans l'UE (règlement INCO 1169/2011).
  const ALLERGENES = {
    gluten: "Gluten",
    oeufs: "Œufs",
    lait: "Lait",
    poisson: "Poisson",
    soja: "Soja",
    sesame: "Sésame",
    moutarde: "Moutarde",
    celeri: "Céleri",
    fruitsacoque: "Fruits à coque",
    arachides: "Arachides",
    crustaces: "Crustacés",
    mollusques: "Mollusques",
    sulfites: "Sulfites",
    lupin: "Lupin"
  };

  const NOTE_JAUNE_COULANT =
    "Jaune coulant : les œufs crus ou peu cuits sont déconseillés aux personnes fragiles " +
    "(femmes enceintes, jeunes enfants, personnes âgées ou immunodéprimées). " +
    "Pour elles, prolonge la cuisson jusqu'à ce que le jaune soit pris (œuf dur, 9 à 10 min).";

  const RECETTES = [
    /* ===================================================================== */
    {
      key: "cailles",
      url: "cailles.html",
      titre: "Cuisses de caille aux petits pois",
      titreCourt: "Cailles & petits pois",
      emoji: "🥘",
      categorie: "plat",
      badge: "Recette de Mamoune",
      accroche:
        "Le plat du dimanche : petits pois mijotés aux lardons et cuisses de caille bien dorées.",
      intro:
        "Un plat de tradition française, à la fois élégant et réconfortant. Les petits pois mijotent " +
        "doucement avec les lardons, les herbes et le bouillon, pendant que les cailles dorent à part " +
        "pour rester tendres. Merci Mamoune !",
      images: [
        { src: "img/cailles.webp", thumb: "img/cailles-640.webp", alt: "Cuisses de caille dorées sur un lit de petits pois" },
        { src: "img/cailles-petits-pois.webp", thumb: "img/cailles-petits-pois-640.webp", alt: "Bol de petits pois frais" },
        { src: "img/cailles-dorees.webp", thumb: "img/cailles-dorees-640.webp", alt: "Cuisses de caille rôties au romarin" }
      ],
      temps: { preparation: 10, cuisson: 25, repos: 0 },
      difficulte: "Facile",
      portions: { base: 4, unite: "personne", pluriel: "personnes", min: 1, max: 16 },
      tags: ["viande", "traditionnel", "francais", "sale", "plat", "familial", "dimanche", "chaud", "raffine", "fete", "invite", "romantique", "hiver", "reconfort"],
      ingredients: [
        {
          groupe: "Pour les petits pois",
          items: [
            { nom: "Petits pois (frais écossés ou surgelés)", qte: 500, unite: "g" },
            { nom: "Lardons fumés", qte: 150, unite: "g" },
            { nom: "Oignon jaune", qte: 1, unite: "pièce" },
            { nom: "Petits oignons grelots", qte: 15, unite: "pièce" },
            { nom: "Carottes fanes", qte: 2, unite: "pièce", optionnel: true },
            { nom: "Bouillon de volaille chaud", qte: 200, unite: "ml" },
            { nom: "Bouquet garni (thym, laurier)", qte: 1, unite: "bouquet", fixe: true }
          ]
        },
        {
          groupe: "Pour les cailles",
          items: [
            { nom: "Cuisses de caille", qte: 8, unite: "pièce" },
            { nom: "Beurre doux", qte: 30, unite: "g" },
            { nom: "Huile d'olive", qte: 1, unite: "c. à soupe" },
            { nom: "Sel et poivre", qte: null, unite: "", note: "selon le goût" }
          ]
        }
      ],
      etapes: [
        {
          titre: "La mise en place",
          texte: "Émince l'oignon, épluche les petits oignons grelots et coupe les carottes en rondelles. Garde le bouillon chaud à portée de main : tout ira vite ensuite."
        },
        {
          titre: "Les lardons",
          texte: "Fais chauffer une cocotte à feu moyen et ajoute les lardons sans matière grasse. Laisse-les dorer quelques minutes, jusqu'à ce qu'ils rendent leur gras parfumé.",
          minuteurs: [{ secondes: 240, label: "Lardons" }]
        },
        {
          titre: "Faire suer l'oignon",
          texte: "Ajoute l'oignon émincé et fais-le suer 2 à 3 minutes à feu doux, sans coloration, jusqu'à ce qu'il devienne translucide."
        },
        {
          titre: "Les légumes",
          texte: "Incorpore les petits pois, les grelots et les carottes. Mélange bien pour enrober les légumes du gras des lardons."
        },
        {
          titre: "Le bouillon",
          texte: "Verse le bouillon chaud, ajoute le bouquet garni et poivre. Goûte avant de saler : les lardons apportent déjà beaucoup de sel."
        },
        {
          titre: "Le mijotage",
          texte: "Couvre et laisse mijoter à feu doux environ 15 minutes. Les petits pois doivent être tendres sans se défaire, et le jus doit légèrement réduire.",
          minuteurs: [{ secondes: 900, label: "Mijotage des petits pois" }]
        },
        {
          titre: "Dorer les cailles",
          texte: "Pendant ce temps, fais chauffer le beurre avec l'huile dans une poêle (l'huile évite que le beurre ne brûle). Fais dorer les cuisses de caille à feu moyen environ 15 minutes en les retournant régulièrement. Sale et poivre.",
          minuteurs: [{ secondes: 900, label: "Cuisson des cailles" }]
        },
        {
          titre: "L'assemblage",
          texte: "Retire le bouquet garni. Dépose les cailles sur les petits pois, couvre 2 à 3 minutes pour que les saveurs se mêlent, puis sers bien chaud en nappant de jus."
        }
      ],
      astuces: [
        "Avec des petits pois surgelés, inutile de les décongeler : ajoute-les directement dans la cocotte.",
        "Déglace la poêle des cailles avec un trait de vin blanc ou d'eau pour récupérer les sucs, puis verse ce jus sur le plat.",
        "Une petite noisette de beurre ajoutée hors du feu dans les petits pois rend le jus plus brillant et plus onctueux."
      ],
      choix: {
        titre: "Accompagnements & herbes",
        mode: "single",
        label: "Ta sélection",
        options: ["Thym frais", "Laurier", "Pommes de terre grenailles", "Vin blanc sec", "Champignons", "Persil plat"]
      },
      accords: [
        { titre: "Version classique", texte: "quelques pommes de terre grenailles rôties au four." },
        { titre: "Version raffinée", texte: "un filet de vin blanc pour déglacer la cocotte." },
        { titre: "Version gourmande", texte: "des champignons poêlés ajoutés en fin de cuisson." },
        { titre: "Finition fraîche", texte: "un peu de persil plat ciselé juste avant de servir." }
      ],
      conservation: "Jusqu'à 2 jours au réfrigérateur dans une boîte hermétique. Réchauffe doucement à couvert avec un fond d'eau ou de bouillon.",
      allergenes: ["lait"],
      noteAllergenes: "Vérifie aussi la composition de ton bouillon (il contient parfois du céleri).",
      regime: { sansViande: false, sansPoisson: true },
      origine: {
        pays: "France",
        drapeau: "🇫🇷",
        resume: "Un plat bourgeois de la cuisine française, souvent servi pour les repas de fête ou du dimanche.",
        faits: [
          "En France, les cailles vendues en boucherie sont des cailles d'élevage : il s'agit de la caille du Japon (Coturnix japonica), une espèce domestique.",
          "La caille des blés (Coturnix coturnix), elle, est l'espèce sauvage et migratrice naturellement présente en France."
        ],
        sources: [
          { titre: "Assemblée nationale — réponse ministérielle sur la caille du Japon", url: "https://questions.assemblee-nationale.fr/dyn/12/questions/QANR5L12QE23496.pdf" },
          { titre: "INRAE — La caille japonaise, un modèle d'étude", url: "https://hal.inrae.fr/hal-04179448/document" }
        ]
      }
    },

    /* ===================================================================== */
    {
      key: "crepes",
      url: "crepes.html",
      titre: "Crêpes gourmandes",
      titreCourt: "Crêpes",
      emoji: "🥞",
      categorie: "dessert",
      badge: "Incontournable",
      accroche: "Fines, souples, parfumées à la vanille ou au rhum : la recette qui fait l'unanimité.",
      intro:
        "Une recette simple et conviviale, parfaite de la Chandeleur aux goûters d'hiver. " +
        "Les crêpes sont fines, souples et faciles à garnir selon les envies de chacun. " +
        "Compte environ 12 à 15 crêpes selon la taille de ta poêle.",
      images: [
        { src: "img/crepes-pile.webp", thumb: "img/crepes-pile-640.webp", alt: "Pile de crêpes dorées sur une table" },
        { src: "img/crepes-sucre.webp", thumb: "img/crepes-sucre-640.webp", alt: "Crêpes pliées au sucre glace" },
        { src: "img/crepes-chocolat.webp", thumb: "img/crepes-chocolat-640.webp", alt: "Crêpes garnies de chocolat fondant" },
        { src: "img/crepes-confiture.webp", thumb: "img/crepes-confiture-640.webp", alt: "Crêpes à la confiture et au sucre glace" }
      ],
      temps: { preparation: 10, cuisson: 25, repos: 60 },
      difficulte: "Facile",
      portions: { base: 4, unite: "personne", pluriel: "personnes", min: 1, max: 20 },
      tags: ["dessert", "gouter", "sucre", "familial", "convivial", "enfant", "reconfort", "chandeleur", "plaisir", "brunch", "hiver", "simple", "facile"],
      ingredients: [
        {
          groupe: "Pour la pâte",
          items: [
            { nom: "Farine de blé (type 45)", qte: 250, unite: "g" },
            { nom: "Œufs", qte: 4, unite: "pièce" },
            { nom: "Lait demi-écrémé", qte: 500, unite: "ml" },
            { nom: "Beurre fondu", qte: 50, unite: "g" },
            { nom: "Sucre en poudre", qte: 30, unite: "g" },
            { nom: "Huile de tournesol", qte: 1, unite: "c. à soupe" },
            { nom: "Sel fin", qte: 1, unite: "pincée", fixe: true },
            { nom: "Rhum ambré, fleur d'oranger ou vanille", qte: 1, unite: "c. à soupe", optionnel: true }
          ]
        },
        {
          groupe: "Pour la cuisson",
          items: [{ nom: "Beurre ou huile pour la poêle", qte: null, unite: "", note: "un peu" }]
        }
      ],
      etapes: [
        { titre: "Le puits", texte: "Verse la farine dans un grand saladier et creuse un puits au centre : les liquides s'incorporeront plus facilement, sans grumeaux." },
        { titre: "Les œufs", texte: "Casse les œufs dans le puits, ajoute le sucre, le sel, l'huile et le beurre fondu. Mélange doucement au centre avec un fouet." },
        { titre: "Incorporer la farine", texte: "Ramène petit à petit la farine des bords vers le centre en fouettant. Ne va pas trop vite : c'est le secret d'une pâte lisse." },
        { titre: "Le lait", texte: "Verse le lait en filet sans cesser de fouetter. La pâte doit devenir fluide, lisse et homogène." },
        { titre: "Le parfum", texte: "Parfume avec le rhum, la fleur d'oranger ou la vanille, selon tes goûts. Cette petite touche change tout." },
        {
          titre: "Le repos",
          texte: "Couvre le saladier et laisse reposer la pâte au moins 30 minutes, idéalement 1 heure. Les crêpes seront plus souples et plus régulières.",
          minuteurs: [{ secondes: 1800, label: "Repos minimum" }, { secondes: 3600, label: "Repos idéal" }]
        },
        { titre: "La poêle", texte: "Fais chauffer une crêpière ou une poêle antiadhésive à feu moyen-vif. Graisse-la légèrement avec un papier absorbant huilé ou une noisette de beurre." },
        { titre: "La cuisson", texte: "Verse une petite louche de pâte et fais tourner la poêle pour l'étaler finement. Laisse cuire 1 à 2 minutes, retourne dès que les bords se décollent et dorent, puis cuis l'autre face." }
      ],
      astuces: [
        "La première crêpe sert souvent de test : elle permet de régler la chaleur et la quantité de pâte.",
        "Si la pâte a des grumeaux, un coup de mixeur plongeant ou un passage au tamis la rattrape.",
        "Si la pâte a épaissi pendant le repos, détends-la avec un peu de lait.",
        "Empile les crêpes sur une assiette couverte d'un torchon ou d'aluminium pour les garder chaudes et souples."
      ],
      choix: {
        titre: "Garnitures au choix",
        mode: "single",
        label: "Ta garniture phare",
        options: ["Sucre & citron", "Pâte à tartiner", "Miel de fleurs", "Banane", "Fraises fraîches", "Confiture maison", "Caramel beurre salé", "Crème de marrons"]
      },
      accords: [
        { titre: "La classique", texte: "sucre en poudre et une noisette de beurre demi-sel fondu." },
        { titre: "La gourmande", texte: "chocolat fondu, rondelles de banane et amandes grillées." },
        { titre: "La fruitée", texte: "confiture de fruits rouges et fraises fraîches." },
        { titre: "La bretonne", texte: "caramel au beurre salé et une boule de glace vanille." }
      ],
      conservation: "La pâte se garde 24 h au réfrigérateur, filmée. Les crêpes cuites se conservent 2 jours au frais, bien emballées : réchauffe-les à la poêle.",
      allergenes: ["gluten", "oeufs", "lait"],
      regime: { sansViande: true, sansPoisson: true },
      origine: {
        pays: "France (Bretagne)",
        drapeau: "🇫🇷",
        resume: "Fine pâte cuite à la poêle, sucrée ou salée, emblématique de la Bretagne et de la Chandeleur.",
        faits: [
          "La Chandeleur a lieu le 2 février, 40 jours après Noël. Son nom vient de la « fête des chandelles ».",
          "Selon une explication populaire très répandue, la forme ronde et la couleur dorée des crêpes évoqueraient le soleil qui revient après l'hiver. L'origine exacte de cette tradition n'est pas documentée."
        ],
        sources: [
          { titre: "Sortiraparis — Pourquoi mange-t-on des crêpes à la Chandeleur ?", url: "https://www.sortiraparis.com/hotel-restaurant/tendances-food/articles/240200-pourquoi-mange-t-on-des-crepes-pour-la-chandeleur-2026-le-2-fevrier-histoire-et-origine" },
          { titre: "Institut catholique de Paris — La Chandeleur, origines et traditions", url: "https://www.icp.fr/a-propos-de-licp/actualites/la-chandeleur-origines-traditions-et-crepes" }
        ]
      }
    },

    /* ===================================================================== */
    {
      key: "burgers",
      url: "burger.html",
      titre: "Burgers maison bien garnis",
      titreCourt: "Burgers",
      emoji: "🍔",
      categorie: "plat",
      badge: "Soirée entre amis",
      accroche: "Pain brioché toasté, cheddar fondant, sauce maison : le burger des grands soirs.",
      intro:
        "La recette ultime pour les soirées conviviales : un burger chaud et généreux, " +
        "avec un cheddar bien fondu, des légumes croquants et une sauce maison en deux minutes.",
      images: [
        { src: "img/burger.webp", thumb: "img/burger-640.webp", alt: "Burger garni avec des frites" },
        { src: "img/burger-grill.webp", thumb: "img/burger-grill-640.webp", alt: "Steak haché saisi sur le gril" },
        { src: "img/burger-legumes.webp", thumb: "img/burger-legumes-640.webp", alt: "Salade, tomates, oignons rouges et cornichons sur une planche" }
      ],
      temps: { preparation: 15, cuisson: 10, repos: 0 },
      difficulte: "Facile",
      portions: { base: 4, unite: "burger", pluriel: "burgers", min: 1, max: 16 },
      tags: ["viande", "copieux", "gourmand", "convivial", "familial", "enfant", "plat", "chaud", "sale", "lourd", "invite", "plaisir", "americain"],
      ingredients: [
        {
          groupe: "Pour les burgers",
          items: [
            { nom: "Pains burger briochés", qte: 4, unite: "pièce" },
            { nom: "Steaks hachés de bœuf (15 % MG)", qte: 4, unite: "pièce" },
            { nom: "Tranches de cheddar", qte: 4, unite: "tranche" },
            { nom: "Tomates", qte: 2, unite: "pièce" },
            { nom: "Feuilles de salade iceberg", qte: 4, unite: "feuille" },
            { nom: "Oignon rouge", qte: 1, unite: "pièce" },
            { nom: "Beurre pour toaster", qte: 20, unite: "g" },
            { nom: "Huile neutre", qte: 1, unite: "c. à soupe" },
            { nom: "Sel et poivre", qte: null, unite: "", note: "selon le goût" }
          ]
        },
        {
          groupe: "Pour la sauce maison",
          items: [
            { nom: "Mayonnaise", qte: 3, unite: "c. à soupe" },
            { nom: "Ketchup", qte: 1, unite: "c. à soupe" },
            { nom: "Moutarde", qte: 1, unite: "c. à café" },
            { nom: "Cornichons hachés", qte: 1, unite: "c. à soupe" }
          ]
        }
      ],
      etapes: [
        { titre: "La sauce", texte: "Mélange la mayonnaise, le ketchup, la moutarde et les cornichons hachés. Réserve au frais." },
        { titre: "Les légumes", texte: "Lave et coupe les tomates en rondelles régulières, détache les feuilles de salade et émince finement l'oignon rouge." },
        { titre: "Les steaks", texte: "Sors les steaks du réfrigérateur 10 minutes avant la cuisson. Sale et poivre les deux faces juste avant de les cuire." },
        { titre: "La poêle", texte: "Fais chauffer une poêle en fonte ou une plancha à feu vif avec l'huile." },
        {
          titre: "La cuisson",
          texte: "Saisis les steaks pour former une belle croûte, en les retournant à mi-cuisson. Compte environ 3 minutes au total pour saignant, 4 minutes à point et 6 minutes bien cuit, selon l'épaisseur. Ne les écrase pas avec la spatule : ils garderaient moins leur jus.",
          minuteurs: [{ secondes: 180, label: "Saignant" }, { secondes: 240, label: "À point" }, { secondes: 360, label: "Bien cuit" }]
        },
        {
          titre: "Le cheddar fondu",
          texte: "Une minute avant la fin, pose une tranche de cheddar sur chaque steak, verse une cuillère d'eau dans la poêle et couvre : la vapeur fait fondre le fromage.",
          minuteurs: [{ secondes: 60, label: "Fonte du cheddar" }]
        },
        { titre: "Les pains", texte: "Coupe les pains en deux et toaste la face coupée dans une poêle beurrée environ 1 minute : ils resteront croustillants sous la sauce." },
        { titre: "Le montage", texte: "Pain du bas, sauce, salade, tomate, steak au cheddar, oignon rouge, encore un peu de sauce, puis le chapeau. Sers immédiatement." }
      ],
      astuces: [
        "Toaster le pain crée une barrière qui l'empêche de se détremper sous la sauce.",
        "Pour des oignons plus doux, laisse les rondelles d'oignon rouge 10 minutes dans de l'eau froide avant de les égoutter.",
        "Prépare tous les éléments avant de lancer la cuisson : le montage doit se faire en un instant pour servir bien chaud."
      ],
      securite:
        "Pour les jeunes enfants et les personnes âgées ou fragiles, les autorités sanitaires recommandent de cuire la viande hachée à cœur, jusqu'à ce qu'il n'y ait plus aucune trace rosée (risque lié à la bactérie E. coli).",
      sourcesSecurite: [
        { titre: "Ministère de l'Agriculture — avis de rappel de viande hachée (recommandations de cuisson)", url: "https://agriculture.gouv.fr/telecharger/87123" }
      ],
      choix: {
        titre: "Compose ton burger",
        mode: "multi",
        label: "Ta composition",
        options: ["Cheddar affiné", "Bacon grillé", "Salade iceberg", "Tomate cœur de bœuf", "Oignons caramélisés", "Sauce maison", "Pickles", "Sauce barbecue"]
      },
      accords: [
        { titre: "Le bacon cheeseburger", texte: "double cheddar, deux tranches de bacon grillé et sauce barbecue." },
        { titre: "Le frais & croquant", texte: "tomate, iceberg, oignon rouge cru et sauce aux herbes." },
        { titre: "Le sucré-salé", texte: "oignons caramélisés et fromage bien fondant." },
        { titre: "Le minimaliste", texte: "pain brioché, steak et cheddar affiné, rien de plus." }
      ],
      conservation: "Le burger se déguste tout de suite : monté à l'avance, le pain détrempe. La sauce se garde 2 jours au réfrigérateur dans un bocal fermé.",
      allergenes: ["gluten", "lait", "oeufs", "moutarde"],
      noteAllergenes: "Certains pains burger contiennent aussi du sésame : vérifie l'étiquette.",
      regime: { sansViande: false, sansPoisson: true },
      origine: {
        pays: "États-Unis (nom venu de Hambourg)",
        drapeau: "🇺🇸",
        resume: "Un steak haché dans un pain rond. Son nom rappelle le « steak de Hambourg » des immigrés allemands, mais son inventeur reste disputé.",
        faits: [
          "Plusieurs Américains revendiquent l'invention à la fin du XIXe siècle, notamment Charlie Nagreen à Seymour (Wisconsin) en 1885 et Louis Lassen à New Haven (Connecticut).",
          "Aucune preuve ne permet de trancher : l'origine exacte du hamburger reste débattue."
        ],
        sources: [
          { titre: "Wikipédia (en) — Hamburger", url: "https://en.wikipedia.org/wiki/Hamburger" },
          { titre: "Tasting Table — The birthplace of the hamburger is a heated debate", url: "https://www.tastingtable.com/1641330/hamburger-origin-debate-explained" }
        ]
      }
    },

    /* ===================================================================== */
    {
      key: "fondants",
      url: "fondant.html",
      titre: "Fondants au chocolat",
      titreCourt: "Fondants au chocolat",
      emoji: "🍫",
      categorie: "dessert",
      badge: "Cœur coulant",
      accroche: "Une fine croûte, un cœur plus ou moins coulant : tu choisis au minuteur près.",
      intro:
        "Le dessert ultime des amoureux du chocolat : une fine croûte à l'extérieur et un centre " +
        "plus ou moins coulant selon le temps de cuisson. Quelques minutes changent tout.",
      images: [
        { src: "img/fondant-glace.webp", thumb: "img/fondant-glace-640.webp", alt: "Fondant au chocolat coulant avec une boule de glace" },
        { src: "img/fondant-coulant.webp", thumb: "img/fondant-coulant-640.webp", alt: "Fondant au chocolat au cœur coulant" },
        { src: "img/fondant-coupe.webp", thumb: "img/fondant-coupe-640.webp", alt: "Fondant au chocolat coupé en deux" },
        { src: "img/fondant-ramequin.webp", thumb: "img/fondant-ramequin-640.webp", alt: "Ramequins de chocolat sur une nappe à carreaux" }
      ],
      temps: { preparation: 15, cuisson: 11, repos: 0 },
      difficulte: "Facile",
      portions: { base: 4, unite: "fondant", pluriel: "fondants", min: 1, max: 16 },
      tags: ["dessert", "chocolat", "gourmand", "sucre", "reconfort", "romantique", "fete", "plaisir", "lourd", "hiver", "invite"],
      ingredients: [
        {
          groupe: "Pour la pâte",
          items: [
            { nom: "Chocolat noir (70 % de cacao)", qte: 200, unite: "g" },
            { nom: "Beurre doux", qte: 100, unite: "g" },
            { nom: "Œufs", qte: 3, unite: "pièce" },
            { nom: "Sucre en poudre", qte: 100, unite: "g" },
            { nom: "Farine", qte: 50, unite: "g" }
          ]
        },
        {
          groupe: "Pour les moules",
          items: [
            { nom: "Beurre", qte: 10, unite: "g" },
            { nom: "Farine ou cacao en poudre", qte: 1, unite: "c. à soupe" }
          ]
        }
      ],
      etapes: [
        { titre: "Four et moules", texte: "Préchauffe le four à 200 °C. Beurre soigneusement les moules, puis farine-les (ou poudre-les de cacao) pour faciliter le démoulage." },
        { titre: "Fondre le chocolat", texte: "Fais fondre le chocolat avec le beurre au bain-marie, ou au micro-ondes par séquences de 30 secondes en mélangeant entre chaque. Le mélange doit être lisse et brillant." },
        { titre: "Œufs et sucre", texte: "Dans un autre saladier, fouette les œufs avec le sucre jusqu'à ce que le mélange soit homogène et légèrement mousseux." },
        { titre: "Le mélange", texte: "Verse le chocolat fondu tiédi sur les œufs battus et mélange délicatement." },
        { titre: "La farine", texte: "Ajoute la farine tamisée et incorpore-la sans trop travailler la pâte, juste assez pour qu'elle soit lisse." },
        { titre: "Le remplissage", texte: "Répartis la pâte dans les moules en les remplissant aux trois quarts : les fondants gonflent un peu à la cuisson." },
        {
          titre: "La cuisson",
          texte: "Enfourne et choisis ta texture : environ 9 minutes pour un cœur très coulant, 11 minutes pour un cœur moelleux, 13 minutes pour un fondant cuit à cœur. Chaque four est différent : surveille les premières fois.",
          minuteurs: [{ secondes: 540, label: "Très coulant" }, { secondes: 660, label: "Moelleux" }, { secondes: 780, label: "Cuit à cœur" }]
        },
        { titre: "Le service", texte: "Laisse reposer 1 minute, puis démoule d'un geste franc sur l'assiette. Sers aussitôt, avec une glace, des fruits rouges ou un filet de caramel." }
      ],
      astuces: [
        "Prépare la pâte à l'avance et garde les moules remplis au réfrigérateur : enfournés bien froids, les fondants gardent plus facilement un cœur coulant (ajoute alors 1 à 2 minutes de cuisson).",
        "Le chocolat brûle vite : fais-le fondre doucement et ne le laisse jamais sans surveillance.",
        "Teste ton four avec un seul fondant la première fois : tu sauras exactement quel temps te convient."
      ],
      choix: {
        titre: "Accompagnements",
        mode: "single",
        label: "Ton choix",
        options: ["Glace vanille", "Fruits rouges", "Crème fouettée", "Caramel", "Noisettes grillées", "Coulis de framboise"]
      },
      accords: [
        { titre: "Le classique", texte: "fondant chaud et glace vanille." },
        { titre: "Le fruité", texte: "fruits rouges et coulis de framboise." },
        { titre: "Le croquant", texte: "noisettes grillées et caramel." },
        { titre: "Le plus léger", texte: "une crème fouettée peu sucrée." }
      ],
      conservation: "Pâte crue : 24 h au réfrigérateur dans les moules filmés. Fondants cuits : 2 jours au frais ; quelques secondes au micro-ondes leur rendent du fondant.",
      allergenes: ["gluten", "oeufs", "lait"],
      noteAllergenes: "Certains chocolats contiennent du lait ou de la lécithine de soja : vérifie l'étiquette.",
      regime: { sansViande: true, sansPoisson: true },
      origine: {
        pays: "France",
        drapeau: "🇫🇷",
        resume: "Le gâteau au chocolat à cœur coulant est un dessert de la cuisine française moderne.",
        faits: [
          "Le chef Michel Bras est généralement crédité de l'invention du « biscuit de chocolat coulant », qu'il date de 1981.",
          "Le chef Jean-Georges Vongerichten revendique un dessert proche créé à New York en 1987 (le « molten chocolate cake »)."
        ],
        sources: [
          { titre: "Wikipédia (en) — Molten chocolate cake", url: "https://en.wikipedia.org/wiki/Molten_chocolate_cake" },
          { titre: "So Good Magazine — Michel Bras", url: "https://www.sogoodmagazine.com/pastry-chefs/michel-bras/" }
        ]
      }
    },

    /* ===================================================================== */
    {
      key: "marbre",
      url: "gateau-marbre.html",
      titre: "Gâteau marbré d'enfance",
      titreCourt: "Gâteau marbré",
      emoji: "🍰",
      categorie: "dessert",
      badge: "Goûter",
      accroche: "Moelleux, généreux, avec ses jolies marbrures vanille-chocolat.",
      intro:
        "Un grand classique du goûter, moelleux et généreux, avec ses marbrures vanille-chocolat. " +
        "Le gâteau simple et rassurant qu'on adore retrouver au petit-déjeuner comme au goûter.",
      images: [
        { src: "img/marbre.webp", thumb: "img/marbre-640.webp", alt: "Gâteau marbré coupé montrant ses marbrures" },
        { src: "img/marbre-cake.webp", thumb: "img/marbre-cake-640.webp", alt: "Cake marbré entier sur une assiette" },
        { src: "img/marbre-part.webp", thumb: "img/marbre-part-640.webp", alt: "Part de gâteau marbré" }
      ],
      temps: { preparation: 20, cuisson: 55, repos: 0 },
      difficulte: "Facile",
      portions: { base: 8, unite: "part", pluriel: "parts", min: 4, max: 24, pas: 2 },
      tags: ["dessert", "gouter", "familial", "enfant", "sucre", "chocolat", "simple", "plaisir", "brunch", "reconfort"],
      ingredients: [
        {
          groupe: "Pour la pâte",
          items: [
            { nom: "Farine", qte: 250, unite: "g" },
            { nom: "Œufs", qte: 3, unite: "pièce" },
            { nom: "Beurre mou (pommade)", qte: 125, unite: "g" },
            { nom: "Sucre", qte: 125, unite: "g" },
            { nom: "Lait entier", qte: 80, unite: "ml" },
            { nom: "Levure chimique", qte: 1, unite: "sachet" },
            { nom: "Sel", qte: 1, unite: "pincée", fixe: true }
          ]
        },
        {
          groupe: "Pour les deux parfums",
          items: [
            { nom: "Chocolat noir", qte: 100, unite: "g" },
            { nom: "Extrait de vanille", qte: 1, unite: "c. à café" }
          ]
        },
        {
          groupe: "Pour le moule",
          items: [{ nom: "Beurre et farine", qte: null, unite: "", note: "un peu" }]
        }
      ],
      etapes: [
        { titre: "Four et moule", texte: "Préchauffe le four à 160 °C. Beurre un moule à cake, puis farine-le légèrement pour un démoulage sans accroc." },
        { titre: "Le chocolat", texte: "Fais fondre le chocolat au bain-marie ou au micro-ondes par séquences de 30 secondes, puis laisse-le tiédir." },
        { titre: "Beurre et sucre", texte: "Travaille le beurre pommade avec le sucre jusqu'à obtenir une texture claire et crémeuse. C'est cette étape qui donne du moelleux." },
        { titre: "Les œufs", texte: "Ajoute les œufs un par un en mélangeant bien entre chaque ajout, pour une pâte homogène." },
        { titre: "Lait, farine et levure", texte: "Verse le lait, puis incorpore la farine tamisée avec la levure et le sel. Mélange juste assez pour obtenir une pâte lisse." },
        { titre: "Deux pâtes", texte: "Sépare la pâte en deux parts égales. Parfume l'une avec la vanille et incorpore le chocolat fondu tiédi dans l'autre." },
        { titre: "Le marbrage", texte: "Verse les deux pâtes en alternant les couches dans le moule. Passe une lame de couteau en zigzag, une seule fois, pour dessiner les marbrures." },
        {
          titre: "La cuisson",
          texte: "Enfourne 50 à 55 minutes. Vérifie la cuisson avec une lame : elle doit ressortir sèche. Laisse tiédir avant de démouler, puis refroidir complètement avant tout glaçage.",
          minuteurs: [{ secondes: 3000, label: "Vérifier la cuisson" }, { secondes: 3300, label: "Cuisson complète" }]
        }
      ],
      astuces: [
        "Sors le beurre et les œufs 30 minutes à l'avance : à température ambiante, ils se mélangent bien mieux.",
        "Ne mélange pas trop les deux pâtes dans le moule, sinon les marbrures disparaissent.",
        "Badigeonner le gâteau encore tiède d'un léger sirop de sucre le garde plus moelleux.",
        "Bien emballé, ce gâteau est souvent encore meilleur le lendemain."
      ],
      choix: {
        titre: "Finitions & glaçages",
        mode: "single",
        label: "Ta finition idéale",
        options: ["Voile de sucre glace", "Glaçage rocher", "Sirop d'imbibage", "Pépites de chocolat", "Nappage ganache", "Crème anglaise"]
      },
      accords: [
        { titre: "Au goûter", texte: "une tranche avec un verre de lait ou un jus d'orange pressé." },
        { titre: "En dessert", texte: "tiède, avec une crème anglaise." },
        { titre: "Version fête", texte: "un nappage ganache et quelques noisettes concassées." },
        { titre: "Au brunch", texte: "à côté des crêpes et des fruits frais." }
      ],
      conservation: "3 à 4 jours à température ambiante, emballé dans du film alimentaire ou dans une boîte hermétique.",
      allergenes: ["gluten", "oeufs", "lait"],
      regime: { sansViande: true, sansPoisson: true },
      origine: {
        pays: "Allemagne",
        drapeau: "🇩🇪",
        resume: "Le gâteau marbré (Marmorkuchen) serait apparu en Allemagne au XIXe siècle.",
        faits: [
          "Les premières versions étaient colorées avec de la mélasse et des épices ; la version au chocolat ne s'est généralisée que plus tard.",
          "Le terme anglais « marble cake » est attesté dès 1859, quand la recette a gagné les États-Unis avec les immigrés allemands."
        ],
        sources: [
          { titre: "Wikipédia (en) — Marble cake", url: "https://en.wikipedia.org/wiki/Marble_cake" },
          { titre: "What's Cooking America — German Marble Cake History", url: "https://whatscookingamerica.net/history/cakes/germanmarble-cake.htm" }
        ]
      }
    },

    /* ===================================================================== */
    {
      key: "pokebowl",
      url: "poke-bowl.html",
      titre: "Poké bowl frais & coloré",
      titreCourt: "Poké bowl",
      emoji: "🍣",
      categorie: "plat",
      badge: "Frais",
      accroche: "Riz vinaigré, saumon mariné, mangue, avocat, edamame : la fraîcheur en bol.",
      intro:
        "Une recette venue d'Hawaï, légère et pleine de fraîcheur : un lit de riz, du poisson mariné " +
        "et une ribambelle de légumes et de fruits colorés.",
      images: [
        { src: "img/poke-bol.webp", thumb: "img/poke-bol-640.webp", alt: "Poké bowl au saumon, avocat, edamame et chou rouge" },
        { src: "img/poke-saumon.webp", thumb: "img/poke-saumon-640.webp", alt: "Tranches de saumon frais sur une planche" },
        { src: "img/poke-riz.webp", thumb: "img/poke-riz-640.webp", alt: "Riz en train de cuire dans une casserole" }
      ],
      temps: { preparation: 25, cuisson: 20, repos: 25 },
      difficulte: "Facile",
      portions: { base: 2, unite: "bol", pluriel: "bols", min: 1, max: 12 },
      tags: ["leger", "frais", "healthy", "equilibre", "poisson", "plat", "froid", "ete", "sain", "sale", "colore", "hawaien"],
      ingredients: [
        {
          groupe: "Pour le riz",
          items: [
            { nom: "Riz japonais rond", qte: 200, unite: "g" },
            { nom: "Vinaigre de riz", qte: 1, unite: "c. à soupe", optionnel: true }
          ]
        },
        {
          groupe: "Pour la marinade",
          items: [
            { nom: "Sauce soja", qte: 3, unite: "c. à soupe" },
            { nom: "Huile de sésame", qte: 1, unite: "c. à soupe" },
            { nom: "Jus de citron", qte: 1, unite: "c. à soupe" },
            { nom: "Miel", qte: 1, unite: "c. à café" }
          ]
        },
        {
          groupe: "Pour la garniture",
          items: [
            { nom: "Dos de saumon très frais", qte: 250, unite: "g" },
            { nom: "Avocat mûr", qte: 1, unite: "pièce" },
            { nom: "Concombre", qte: 0.5, unite: "pièce" },
            { nom: "Mangue", qte: 0.5, unite: "pièce" },
            { nom: "Carotte", qte: 1, unite: "pièce" },
            { nom: "Edamame écossés", qte: 100, unite: "g" },
            { nom: "Graines de sésame", qte: 1, unite: "c. à soupe" },
            { nom: "Oignons frits", qte: 1, unite: "c. à soupe", optionnel: true }
          ]
        }
      ],
      etapes: [
        {
          titre: "Le riz",
          texte: "Rince le riz plusieurs fois jusqu'à ce que l'eau soit claire, puis cuis-le selon les indications du paquet. Étale-le dans un plat, assaisonne-le de vinaigre de riz et laisse-le refroidir complètement.",
          minuteurs: [{ secondes: 1200, label: "Cuisson du riz" }]
        },
        { titre: "Le saumon", texte: "Retire la peau si besoin et coupe le saumon en dés réguliers d'environ 1,5 cm. Réserve au frais." },
        {
          titre: "La marinade",
          texte: "Mélange la sauce soja, l'huile de sésame, le jus de citron et le miel. Ajoute le saumon et laisse mariner 10 à 15 minutes au réfrigérateur, pas plus : le citron commencerait à « cuire » le poisson.",
          minuteurs: [{ secondes: 900, label: "Marinade" }]
        },
        { titre: "Les légumes et fruits", texte: "Râpe la carotte, tranche finement le concombre et coupe la mangue en cubes." },
        { titre: "L'avocat", texte: "Coupe l'avocat en lamelles ou en dés et arrose-le d'un peu de citron pour qu'il ne noircisse pas." },
        {
          titre: "Les edamame",
          texte: "Plonge les edamame 3 à 5 minutes dans l'eau bouillante salée, égoutte-les et laisse-les refroidir.",
          minuteurs: [{ secondes: 300, label: "Edamame" }]
        },
        { titre: "L'assemblage", texte: "Dépose le riz froid au fond des bols, ajoute le saumon mariné au centre et dispose les légumes et fruits tout autour, par couleur." },
        { titre: "La finition", texte: "Parsème de graines de sésame et d'oignons frits, ajoute un filet de marinade et sers bien frais." }
      ],
      astuces: [
        "Dispose les ingrédients par blocs de couleur autour du bol : c'est ce qui rend le poké si appétissant.",
        "Le riz doit être froid ou tiède au moment du montage, sinon il « cuit » le poisson et ramollit les légumes.",
        "Pour une version cuite, remplace le saumon cru par des crevettes cuites, du saumon snacké ou du tofu mariné."
      ],
      securite:
        "Poisson cru : achète-le très frais en précisant au poissonnier qu'il sera mangé cru. S'il n'a pas déjà été congelé, congèle-le 7 jours au congélateur avant de le préparer, pour éliminer d'éventuels parasites (anisakis). Le poisson cru est déconseillé aux personnes fragiles : femmes enceintes, jeunes enfants, personnes âgées ou immunodéprimées.",
      sourcesSecurite: [
        { titre: "Allodocteurs — recommandation de l'InVS (7 jours au congélateur)", url: "https://www.allodocteurs.fr/alimentation-il-decouvre-un-ver-parasite-dans-son-poisson-26448.html" },
        { titre: "Manuel MSD — Anisakiase (prévention)", url: "https://www.msdmanuals.com/fr/professional/maladies-infectieuses/n%C3%A9matodes-vers-ronds/anisakiase" }
      ],
      choix: {
        titre: "Accompagnements",
        mode: "single",
        label: "Ton choix",
        options: ["Soupe miso", "Salade de wakamé", "Gyozas", "Thé glacé maison", "Citronnade", "Chips de crevette"]
      },
      accords: [
        { titre: "Le plus frais", texte: "poké bowl et citronnade maison." },
        { titre: "Le plus léger", texte: "poké bowl et salade de wakamé." },
        { titre: "Le plus complet", texte: "poké bowl et soupe miso." },
        { titre: "Le plus gourmand", texte: "poké bowl et quelques gyozas." }
      ],
      conservation: "À déguster tout de suite. Le poisson cru mariné ne se conserve pas : prépare seulement la quantité nécessaire.",
      allergenes: ["poisson", "soja", "gluten", "sesame"],
      noteAllergenes: "La plupart des sauces soja contiennent du blé (gluten) ; il existe des versions sans gluten (tamari).",
      regime: { sansViande: true, sansPoisson: false },
      origine: {
        pays: "Hawaï (États-Unis)",
        drapeau: "🌺",
        resume: "Plat hawaïen de poisson cru coupé en dés et assaisonné.",
        faits: [
          "En hawaïen, « poke » signifie couper, trancher en morceaux.",
          "Le poké moderne mêle la tradition hawaïenne (poisson, sel, algues) et l'influence japonaise, comme la sauce soja."
        ],
        sources: [
          { titre: "Hawaii News Now — Hawaiian word of the day: Poke", url: "https://www.hawaiinewsnow.com/story/29789161/hawaiian-word-of-the-day-poke/" },
          { titre: "Wikipédia (en) — Poke (dish)", url: "https://en.wikipedia.org/wiki/Poke_(dish)" }
        ]
      }
    },

    /* ===================================================================== */
    {
      key: "saladecesar",
      url: "salade-cesar.html",
      titre: "Salade César gourmande",
      titreCourt: "Salade César",
      emoji: "🥗",
      categorie: "plat",
      badge: "Croquante",
      accroche: "Romaine croquante, croûtons dorés, bacon, parmesan et vraie sauce César.",
      intro:
        "Une salade fraîche et généreuse : romaine bien croquante, croûtons dorés au beurre, " +
        "bacon croustillant, copeaux de parmesan et une sauce César crémeuse aux anchois.",
      images: [
        { src: "img/salade-cesar.webp", thumb: "img/salade-cesar-640.webp", alt: "Salade César avec croûtons et parmesan" },
        { src: "img/salade-laitue.webp", thumb: "img/salade-laitue-640.webp", alt: "Salade fraîche sur une planche en bois" }
      ],
      temps: { preparation: 20, cuisson: 15, repos: 0 },
      difficulte: "Intermédiaire",
      portions: { base: 4, unite: "personne", pluriel: "personnes", min: 1, max: 12 },
      tags: ["frais", "gourmand", "sale", "plat", "froid", "ete", "salade", "viande", "poisson", "invite"],
      ingredients: [
        {
          groupe: "Pour les croûtons",
          items: [
            { nom: "Pain de campagne", qte: 140, unite: "g" },
            { nom: "Beurre fondu", qte: 30, unite: "g" }
          ]
        },
        {
          groupe: "Pour la sauce César",
          items: [
            { nom: "Jaunes d'œufs très frais", qte: 2, unite: "pièce" },
            { nom: "Jus de citron", qte: 30, unite: "ml" },
            { nom: "Filets d'anchois", qte: 4, unite: "pièce" },
            { nom: "Gousse d'ail", qte: 1, unite: "gousse" },
            { nom: "Câpres", qte: 15, unite: "g" },
            { nom: "Huile végétale", qte: 125, unite: "ml" },
            { nom: "Huile d'olive", qte: 30, unite: "ml" },
            { nom: "Parmesan râpé", qte: 40, unite: "g" },
            { nom: "Poivre noir", qte: null, unite: "", note: "selon le goût" }
          ]
        },
        {
          groupe: "Pour la salade",
          items: [
            { nom: "Laitues romaines", qte: 2, unite: "pièce" },
            { nom: "Tranches de bacon", qte: 8, unite: "tranche" },
            { nom: "Parmesan en copeaux", qte: 40, unite: "g" },
            { nom: "Câpres (à frire)", qte: 15, unite: "g", optionnel: true }
          ]
        }
      ],
      etapes: [
        {
          titre: "Les croûtons",
          texte: "Préchauffe le four à 165 °C. Coupe le pain en dés, mélange-les avec le beurre fondu et enfourne jusqu'à ce qu'ils soient dorés (environ 10 minutes, en remuant à mi-cuisson).",
          minuteurs: [{ secondes: 600, label: "Croûtons" }]
        },
        { titre: "Les câpres croustillantes", texte: "Sèche les câpres à frire dans du papier absorbant, puis fais-les revenir 1 à 2 minutes dans un peu d'huile chaude, jusqu'à ce qu'elles s'ouvrent et croustillent." },
        { titre: "La base de la sauce", texte: "Hache finement les anchois, l'ail et les câpres de la sauce. Fouette-les avec les jaunes d'œufs et le jus de citron." },
        { titre: "Monter la sauce", texte: "Verse l'huile végétale en mince filet en fouettant sans arrêt, comme une mayonnaise, puis l'huile d'olive. Ajoute le parmesan râpé et poivre." },
        { titre: "La romaine", texte: "Lave la romaine, essore-la très soigneusement (une salade mouillée dilue la sauce) et coupe-la en larges morceaux." },
        {
          titre: "Le bacon",
          texte: "Fais cuire le bacon à la poêle jusqu'à ce qu'il soit bien croustillant, égoutte-le sur du papier absorbant puis coupe-le en morceaux.",
          minuteurs: [{ secondes: 420, label: "Bacon" }]
        },
        { titre: "Le mélange", texte: "Juste avant de servir, mélange la romaine avec la sauce, puis ajoute les croûtons, le bacon, les câpres croustillantes et les copeaux de parmesan." }
      ],
      astuces: [
        "Garde la romaine au réfrigérateur jusqu'au dernier moment : elle n'en sera que plus croquante.",
        "Si la sauce tranche (elle devient liquide et granuleuse), repars d'un nouveau jaune d'œuf et incorpore-y la sauce ratée petit à petit.",
        "Ajoute les croûtons au tout dernier moment pour qu'ils restent croustillants."
      ],
      securite:
        "La sauce contient des jaunes d'œufs crus : utilise des œufs très frais, garde la sauce au réfrigérateur et consomme-la le jour même. Les œufs crus sont déconseillés aux personnes fragiles (femmes enceintes, jeunes enfants, personnes âgées ou immunodéprimées) : pour elles, remplace les jaunes par 3 cuillères à soupe de mayonnaise du commerce faite avec des œufs pasteurisés (vérifie l'étiquette).",
      sourcesSecurite: [
        { titre: "Institut Pasteur — Salmonellose (prévention)", url: "https://www.pasteur.fr/fr/centre-medical/fiches-maladies/salmonellose" }
      ],
      choix: {
        titre: "Compose ta salade",
        mode: "multi",
        label: "Ta composition",
        options: ["Parmesan en copeaux", "Bacon croustillant", "Croûtons maison", "Sauce très citronnée", "Plus d'anchois", "Câpres croustillantes", "Poulet grillé", "Œuf mollet"]
      },
      accords: [
        { titre: "La classique", texte: "parmesan, croûtons maison et bacon croustillant." },
        { titre: "La fraîche", texte: "sauce plus citronnée, romaine bien froide, copeaux de parmesan." },
        { titre: "La gourmande", texte: "poulet grillé, bacon et sauce bien crémeuse." },
        { titre: "La plus chic", texte: "œuf mollet, parmesan et câpres croustillantes." }
      ],
      conservation: "Assaisonne au dernier moment : la romaine flétrit vite. La sauce aux œufs crus se garde au réfrigérateur et se consomme le jour même.",
      allergenes: ["gluten", "oeufs", "poisson", "lait"],
      regime: { sansViande: false, sansPoisson: false },
      origine: {
        pays: "Mexique (Tijuana)",
        drapeau: "🇲🇽",
        resume: "Malgré son nom, la salade César n'a rien de romain : elle vient d'un restaurant de Tijuana.",
        faits: [
          "Elle est attribuée au restaurateur italo-américain Caesar Cardini. Selon sa fille, il l'aurait improvisée dans son restaurant de Tijuana le 4 juillet 1924, un jour d'affluence où la cuisine manquait de provisions.",
          "D'autres récits l'attribuent à son frère Alex Cardini ou à un membre de son équipe : l'histoire n'est pas tranchée.",
          "Son nom vient de Caesar Cardini, pas de Jules César."
        ],
        sources: [
          { titre: "Wikipédia (en) — Caesar salad", url: "https://en.wikipedia.org/wiki/Caesar_salad" },
          { titre: "FOX 6 — Caesar salad origins: invented in Mexico, turns 100", url: "https://fox6now.com/news/caesar-salad-origins-100th-birthday" }
        ]
      }
    },

    /* ===================================================================== */
    {
      key: "avocadotoast",
      url: "avocado-toast.html",
      titre: "Avocado toast gourmand",
      titreCourt: "Avocado toast",
      emoji: "🥑",
      categorie: "brunch",
      badge: "Brunch",
      accroche: "Pain grillé, avocat citronné, tomates rôties, feta et œuf mollet.",
      intro:
        "Une recette fraîche et généreuse : pain grillé croustillant, avocat citronné bien assaisonné, " +
        "tomates cerises rôties, feta et un œuf mollet au jaune coulant.",
      images: [
        { src: "img/avocado-toast.webp", thumb: "img/avocado-toast-640.webp", alt: "Avocado toast avec un œuf au jaune coulant" }
      ],
      temps: { preparation: 10, cuisson: 10, repos: 0 },
      difficulte: "Facile",
      portions: { base: 2, unite: "personne", pluriel: "personnes", min: 1, max: 12 },
      tags: ["brunch", "leger", "frais", "healthy", "rapide", "gourmand", "sale", "equilibre", "matin", "facile"],
      ingredients: [
        {
          groupe: "Pour les toasts",
          items: [
            { nom: "Grandes tranches de pain de campagne", qte: 2, unite: "tranche" },
            { nom: "Avocats mûrs", qte: 2, unite: "pièce" },
            { nom: "Œufs", qte: 2, unite: "pièce" },
            { nom: "Citron jaune", qte: 1, unite: "pièce" },
            { nom: "Huile d'olive", qte: 2, unite: "c. à soupe" },
            { nom: "Tomates cerises", qte: 120, unite: "g" },
            { nom: "Feta", qte: 60, unite: "g" }
          ]
        },
        {
          groupe: "Pour la finition",
          items: [
            { nom: "Graines de sésame", qte: 1, unite: "c. à soupe" },
            { nom: "Herbes fraîches (coriandre, ciboulette)", qte: null, unite: "", note: "quelques brins", optionnel: true },
            { nom: "Piment en flocons", qte: 1, unite: "pincée", optionnel: true },
            { nom: "Fleur de sel et poivre noir", qte: null, unite: "", note: "selon le goût" }
          ]
        }
      ],
      etapes: [
        {
          titre: "Les œufs mollets",
          texte: "Plonge délicatement les œufs dans une casserole d'eau bouillante et compte 6 minutes, puis transfère-les dans de l'eau glacée avant de les écaler.",
          minuteurs: [{ secondes: 360, label: "Œufs mollets" }]
        },
        { titre: "L'écrasé d'avocat", texte: "Récupère la chair des avocats et écrase-la grossièrement à la fourchette avec le jus d'un demi-citron, un filet d'huile d'olive, du sel et du poivre." },
        {
          titre: "Les tomates",
          texte: "Fais revenir les tomates cerises coupées en deux 2 à 3 minutes dans un peu d'huile d'olive, juste pour les rendre fondantes.",
          minuteurs: [{ secondes: 180, label: "Tomates rôties" }]
        },
        { titre: "Le pain", texte: "Fais griller les tranches de pain : dorées dehors, encore moelleuses au centre." },
        { titre: "Le montage", texte: "Tartine généreusement l'avocat sans trop lisser, ajoute les tomates et la feta émiettée, puis dépose l'œuf ouvert en deux." },
        { titre: "La finition", texte: "Termine avec les graines de sésame, les herbes, une pincée de piment, un trait d'huile d'olive et un peu de fleur de sel. Sers immédiatement." }
      ],
      astuces: [
        "Un avocat est mûr quand il cède légèrement sous une pression du pouce, près du pédoncule.",
        "Le citron ralentit le noircissement de l'avocat : n'hésite pas à en mettre dès que tu l'écrases.",
        "Choisis un pain bien dense (campagne, levain) : il supporte mieux la garniture sans se ramollir."
      ],
      securite: NOTE_JAUNE_COULANT,
      sourcesSecurite: [
        { titre: "Institut Pasteur — Salmonellose (prévention)", url: "https://www.pasteur.fr/fr/centre-medical/fiches-maladies/salmonellose" }
      ],
      choix: {
        titre: "Compose ton toast",
        mode: "multi",
        label: "Ta composition",
        options: ["Œuf mollet", "Tomates cerises rôties", "Feta émiettée", "Graines de sésame", "Piment doux", "Herbes fraîches", "Saumon fumé", "Zeste de citron"]
      },
      accords: [
        { titre: "Le très frais", texte: "tomates cerises, herbes fraîches et zeste de citron." },
        { titre: "Le gourmand", texte: "œuf mollet, feta et graines de sésame." },
        { titre: "Le brunch chic", texte: "saumon fumé, citron et poivre noir." },
        { titre: "Le minimaliste", texte: "avocat citronné, fleur de sel et huile d'olive." }
      ],
      conservation: "À préparer au dernier moment : l'avocat brunit et le pain ramollit vite.",
      allergenes: ["gluten", "oeufs", "lait", "sesame"],
      regime: { sansViande: true, sansPoisson: true },
      origine: {
        pays: "Australie (popularisé à Sydney)",
        drapeau: "🇦🇺",
        resume: "L'avocat sur du pain existait avant, mais c'est un café de Sydney qui en a fait un classique du brunch.",
        faits: [
          "Le chef australien Bill Granger est crédité d'avoir mis l'avocado toast à la carte de son café « bills », à Sydney, en 1993.",
          "Ce n'est pas l'invention de l'avocat sur du pain, qui est plus ancienne, mais sa popularisation sur les cartes de cafés modernes."
        ],
        sources: [
          { titre: "Wikipédia (en) — Bill Granger", url: "https://en.wikipedia.org/wiki/Bill_Granger" },
          { titre: "Tasting Table — Bill Granger, the chef credited for popularizing avocado toast", url: "https://www.tastingtable.com/1479563/bill-granger-avocado-toast-chef-died" }
        ]
      }
    },

    /* ===================================================================== */
    {
      key: "ramen",
      url: "ramen.html",
      titre: "Ramen maison généreux",
      titreCourt: "Ramen",
      emoji: "🍜",
      categorie: "plat",
      badge: "Réconfort",
      accroche: "Bouillon parfumé, nouilles, œuf mollet et garnitures dorées : un grand bol de réconfort.",
      intro:
        "Une version maison et express du ramen : un bouillon parfumé à l'ail, au gingembre et au miso, " +
        "des nouilles juste cuites, un œuf mollet et des garnitures bien dorées.",
      images: [
        { src: "img/ramen.webp", thumb: "img/ramen-640.webp", alt: "Bol de ramen avec œufs mollets, champignons et viande" }
      ],
      temps: { preparation: 15, cuisson: 30, repos: 0 },
      difficulte: "Intermédiaire",
      portions: { base: 2, unite: "bol", pluriel: "bols", min: 1, max: 10 },
      tags: ["chaud", "reconfort", "gourmand", "sale", "plat", "japonais", "nouilles", "bouillon", "hiver", "soir", "asiatique"],
      ingredients: [
        {
          groupe: "Pour le bouillon",
          items: [
            { nom: "Bouillon de volaille ou de légumes", qte: 1000, unite: "ml" },
            { nom: "Oignon", qte: 0.5, unite: "pièce" },
            { nom: "Ail", qte: 2, unite: "gousse" },
            { nom: "Gingembre frais", qte: 20, unite: "g" },
            { nom: "Sauce soja", qte: 3, unite: "c. à soupe" },
            { nom: "Huile de sésame", qte: 1, unite: "c. à soupe" },
            { nom: "Miso", qte: 1, unite: "c. à soupe", optionnel: true },
            { nom: "Vinaigre de riz", qte: 1, unite: "c. à café", optionnel: true }
          ]
        },
        {
          groupe: "Pour les bols",
          items: [
            { nom: "Nouilles ramen", qte: 2, unite: "portion" },
            { nom: "Œufs", qte: 2, unite: "pièce" },
            { nom: "Filets de poulet ou tofu ferme", qte: 200, unite: "g" },
            { nom: "Champignons", qte: 150, unite: "g" },
            { nom: "Carotte", qte: 1, unite: "pièce" },
            { nom: "Ciboule", qte: 2, unite: "tige" },
            { nom: "Huile neutre", qte: 1, unite: "c. à soupe" },
            { nom: "Graines de sésame", qte: 1, unite: "c. à café", optionnel: true }
          ]
        }
      ],
      etapes: [
        { titre: "Les aromates", texte: "Émince l'oignon, écrase l'ail et râpe le gingembre. Fais-les revenir 2 minutes dans l'huile de sésame pour libérer leurs arômes." },
        {
          titre: "Le bouillon",
          texte: "Verse le bouillon, ajoute la sauce soja et le vinaigre de riz, puis laisse frémir doucement 15 minutes : plus il infuse, plus il a de goût.",
          minuteurs: [{ secondes: 900, label: "Bouillon" }]
        },
        {
          titre: "Les œufs",
          texte: "Plonge les œufs dans l'eau bouillante 6 à 7 minutes pour un jaune crémeux, puis refroidis-les dans l'eau glacée et écale-les délicatement.",
          minuteurs: [{ secondes: 390, label: "Œufs mollets" }]
        },
        { titre: "Les garnitures", texte: "Émince les champignons, coupe la carotte en fins bâtonnets, tranche le poulet ou le tofu et cisèle la ciboule." },
        { titre: "À la poêle", texte: "Fais dorer le poulet ou le tofu dans l'huile neutre, puis fais revenir les champignons pour concentrer leur saveur." },
        {
          titre: "Les nouilles",
          texte: "Cuis les nouilles à part dans de l'eau frémissante selon le temps indiqué sur le paquet, puis égoutte-les sans attendre pour qu'elles ne collent pas.",
          minuteurs: [{ secondes: 240, label: "Nouilles" }]
        },
        { titre: "Le miso", texte: "Hors du feu, délaie le miso dans une louche de bouillon chaud et reverse-le dans la casserole : il vaut mieux ne pas le faire bouillir." },
        { titre: "Le dressage", texte: "Nouilles au fond du bol, bouillon brûlant par-dessus, puis dispose les garnitures, l'œuf coupé en deux, la ciboule et les graines de sésame." }
      ],
      astuces: [
        "Chauffe les bols à l'eau chaude avant le dressage : le ramen reste brûlant plus longtemps.",
        "Pour des œufs marinés, laisse les œufs mollets écalés plusieurs heures au réfrigérateur dans un mélange de sauce soja et d'eau.",
        "Version sans viande : bouillon de légumes et tofu, le reste de la recette ne change pas."
      ],
      securite: NOTE_JAUNE_COULANT,
      sourcesSecurite: [
        { titre: "Institut Pasteur — Salmonellose (prévention)", url: "https://www.pasteur.fr/fr/centre-medical/fiches-maladies/salmonellose" }
      ],
      choix: {
        titre: "Compose ton bol",
        mode: "multi",
        label: "Ta composition",
        options: ["Œuf mollet mariné", "Poulet doré", "Tofu grillé", "Champignons sautés", "Maïs doux", "Ciboule fraîche", "Graines de sésame", "Huile pimentée"]
      },
      accords: [
        { titre: "Le classique", texte: "poulet doré, œuf mollet et ciboule." },
        { titre: "Le végétarien", texte: "miso, tofu grillé, champignons, maïs et sésame." },
        { titre: "L'intense", texte: "poulet, œuf, huile pimentée, ail et gingembre." },
        { titre: "L'équilibré", texte: "légumes croquants, champignons et herbes fraîches." }
      ],
      conservation: "Garde le bouillon et les garnitures séparément : 2 jours au réfrigérateur. Cuis les nouilles au dernier moment, elles gonflent dans le bouillon.",
      allergenes: ["gluten", "soja", "oeufs", "sesame"],
      noteAllergenes: "Vérifie aussi ton bouillon (céleri possible) et tes nouilles.",
      regime: { sansViande: false, sansPoisson: true, adaptableSansViande: true },
      origine: {
        pays: "Japon (racines chinoises)",
        drapeau: "🇯🇵",
        resume: "Plat emblématique du Japon, le ramen est né de soupes de nouilles chinoises.",
        faits: [
          "Le mot « ramen » viendrait du chinois « lamian », qui désigne des nouilles étirées à la main.",
          "Le restaurant Rairaiken, ouvert en 1910 dans le quartier d'Asakusa à Tokyo avec des cuisiniers cantonais, est souvent cité comme la première boutique de ramen."
        ],
        sources: [
          { titre: "Google Arts & Culture — histoire du ramen", url: "https://artsandculture.google.com/exhibit/pgJyS5QL1jNFKw" },
          { titre: "Wikipédia (en) — Ramen", url: "https://en.wikipedia.org/wiki/Ramen" }
        ]
      }
    },

    /* ===================================================================== */
    {
      key: "jusorange",
      url: "jusorange.html",
      titre: "Jus d'orange bio pressé maison",
      titreCourt: "Jus d'orange pressé",
      emoji: "🍊",
      categorie: "boisson",
      badge: "Vitaminé",
      accroche: "Des oranges bio, un presse-agrumes, et le soleil dans un verre en 10 minutes.",
      intro:
        "Une boisson fraîche et ultra simple, parfaite pour le petit-déjeuner, le brunch ou une pause " +
        "ensoleillée. Compte environ deux oranges par verre, selon leur taille et leur jutosité.",
      images: [
        { src: "img/jus-orange.webp", thumb: "img/jus-orange-640.webp", alt: "Verre de jus d'orange sur une plage" },
        { src: "img/jus-orange-oranges.webp", thumb: "img/jus-orange-oranges-640.webp", alt: "Oranges coupées sur une planche" },
        { src: "img/jus-orange-verre.webp", thumb: "img/jus-orange-verre-640.webp", alt: "Jus d'orange avec glaçons et menthe" }
      ],
      temps: { preparation: 10, cuisson: 0, repos: 0 },
      difficulte: "Très facile",
      portions: { base: 4, unite: "verre", pluriel: "verres", min: 1, max: 16 },
      tags: ["boisson", "frais", "orange", "rapide", "facile", "ete", "froid", "brunch", "enfant", "matin", "vitamine"],
      ingredients: [
        {
          groupe: "Pour le jus",
          items: [
            { nom: "Oranges bio", qte: 8, unite: "pièce" },
            { nom: "Citron", qte: 1, unite: "pièce", optionnel: true },
            { nom: "Glaçons", qte: 8, unite: "pièce", optionnel: true },
            { nom: "Feuilles de menthe", qte: 4, unite: "feuille", optionnel: true }
          ]
        }
      ],
      etapes: [
        { titre: "Laver", texte: "Lave soigneusement les oranges à l'eau claire, surtout si tu gardes des rondelles pour la décoration." },
        { titre: "Rouler", texte: "Roule chaque orange sous ta paume sur le plan de travail : elle sera plus facile à presser." },
        { titre: "Couper", texte: "Coupe les oranges en deux dans le sens de la largeur." },
        { titre: "Presser", texte: "Presse chaque moitié au presse-agrumes, manuel ou électrique, pour extraire un maximum de jus." },
        { titre: "Filtrer… ou pas", texte: "Filtre le jus pour une texture lisse, ou garde la pulpe pour un résultat plus naturel. Ajoute un trait de citron si tu aimes le côté tonique." },
        { titre: "Servir", texte: "Verse sur quelques glaçons, décore d'une feuille de menthe ou d'une rondelle d'orange, et sers aussitôt." }
      ],
      astuces: [
        "Le jus pressé se boit de préférence tout de suite : son goût évolue vite.",
        "Mélange plusieurs variétés d'oranges pour équilibrer la douceur et l'acidité.",
        "Pour un jus bien frais sans le diluer, garde les oranges au réfrigérateur plutôt que d'ajouter beaucoup de glaçons."
      ],
      choix: {
        titre: "Compose ton verre",
        mode: "multi",
        label: "Ta composition",
        options: ["Glaçons", "Pulpe naturelle", "Feuilles de menthe", "Rondelle d'orange", "Zeste fin", "Paille", "Trait de citron", "Très frais"]
      },
      accords: [
        { titre: "Le classique", texte: "jus pressé, glaçons et une paille." },
        { titre: "Le tropical", texte: "menthe et rondelle d'orange." },
        { titre: "Le naturel", texte: "avec sa pulpe, oranges bien mûres." },
        { titre: "Le réveil tonique", texte: "un léger trait de citron." }
      ],
      conservation: "Idéalement à boire tout de suite. Sinon, au réfrigérateur dans une bouteille bien fermée, et à boire dans la journée.",
      allergenes: [],
      regime: { sansViande: true, sansPoisson: true, vegan: true },
      origine: {
        pays: "Partout dans le monde",
        drapeau: "🌍",
        resume: "La boisson star du petit-déjeuner, encadrée par une réglementation européenne précise.",
        faits: [
          "Dans l'Union européenne, il est interdit d'ajouter du sucre aux jus de fruits depuis le 28 octobre 2013 (directive 2012/12/UE).",
          "La réglementation distingue le « jus de fruits » (pur jus) du « jus de fruits à base de concentré »."
        ],
        sources: [
          { titre: "Parlement européen — résumé de la directive 2012/12/UE", url: "https://oeil.europarl.europa.eu/oeil/fr/document-summary?id=1204333" },
          { titre: "EUR-Lex — directive 2012/12/UE (rectificatif)", url: "https://eur-lex.europa.eu/eli/dir/2012/12/corrigendum/2013-01-31/oj" }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "boeufbourguignon",
      "url": "boeuf-bourguignon.html",
      "titre": "Bœuf bourguignon mijoté au vin rouge",
      "titreCourt": "Bœuf bourguignon",
      "alias": [
        "bourguignon",
        "boeuf bourguignon"
      ],
      "emoji": "🍷",
      "categorie": "plat",
      "badge": "Grand classique",
      "accroche": "Bœuf fondant mijoté longuement au vin rouge, avec lardons, champignons et petits oignons dorés.",
      "intro": "Le plat mijoté par excellence : des morceaux de bœuf qui cuisent doucement dans le vin rouge jusqu'à devenir fondants à la cuillère. Les lardons parfument la sauce dès le départ, puis les petits oignons et les champignons dorés rejoignent la cocotte en fin de cuisson.",
      "images": [],
      "cover": {
        "motif": "cocotte",
        "fond": "#4a1424",
        "encre": "#f6efe4",
        "accent": "#e2793b"
      },
      "temps": {
        "preparation": 30,
        "cuisson": 195,
        "repos": 0
      },
      "difficulte": "Intermédiaire",
      "portions": {
        "base": 6,
        "unite": "personne",
        "pluriel": "personnes",
        "min": 2,
        "max": 16
      },
      "tags": [
        "viande",
        "traditionnel",
        "francais",
        "sale",
        "plat",
        "mijote",
        "hiver",
        "reconfort",
        "dimanche",
        "familial",
        "convivial",
        "copieux",
        "chaud",
        "invite"
      ],
      "ingredients": [
        {
          "groupe": "Pour le bœuf",
          "items": [
            {
              "nom": "Bœuf à braiser (paleron, macreuse ou joue) en cubes de 5 cm",
              "qte": 1500,
              "unite": "g"
            },
            {
              "nom": "Lardons fumés",
              "qte": 200,
              "unite": "g"
            },
            {
              "nom": "Carottes",
              "qte": 2,
              "unite": "pièce"
            },
            {
              "nom": "Oignon jaune",
              "qte": 1,
              "unite": "pièce"
            },
            {
              "nom": "Ail",
              "qte": 2,
              "unite": "gousse"
            },
            {
              "nom": "Farine de blé",
              "qte": 2,
              "unite": "c. à soupe"
            },
            {
              "nom": "Vin rouge (idéalement un bourgogne)",
              "qte": 750,
              "unite": "ml"
            },
            {
              "nom": "Bouillon de bœuf",
              "qte": 300,
              "unite": "ml"
            },
            {
              "nom": "Concentré de tomate",
              "qte": 1,
              "unite": "c. à soupe",
              "optionnel": true
            },
            {
              "nom": "Bouquet garni (thym, laurier, persil)",
              "qte": 1,
              "unite": "bouquet",
              "fixe": true
            },
            {
              "nom": "Huile neutre",
              "qte": 2,
              "unite": "c. à soupe"
            },
            {
              "nom": "Sel et poivre",
              "qte": null,
              "unite": "",
              "note": "selon le goût"
            }
          ]
        },
        {
          "groupe": "Pour la garniture",
          "items": [
            {
              "nom": "Petits oignons grelots",
              "qte": 18,
              "unite": "pièce"
            },
            {
              "nom": "Champignons de Paris",
              "qte": 300,
              "unite": "g"
            },
            {
              "nom": "Beurre doux",
              "qte": 30,
              "unite": "g"
            },
            {
              "nom": "Persil plat",
              "qte": 3,
              "unite": "brin",
              "optionnel": true
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "La mise en place",
          "texte": "Sèche les morceaux de bœuf avec du papier absorbant : une viande humide ne dore pas. Épluche les carottes et coupe-les en rondelles épaisses, émince l'oignon et écrase les gousses d'ail."
        },
        {
          "titre": "Les lardons",
          "texte": "Fais chauffer 1 cuillère à soupe d'huile dans une grande cocotte en fonte et fais dorer les lardons à feu moyen. Retire-les avec une écumoire et garde leur gras dans la cocotte.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Lardons"
            }
          ]
        },
        {
          "titre": "Saisir le bœuf",
          "texte": "Monte le feu et fais dorer la viande en trois ou quatre fournées, avec le reste de l'huile, sans surcharger la cocotte. Chaque face doit être bien brune : ce sont ces sucs qui donneront du goût à la sauce. Réserve la viande avec les lardons.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Une fournée de viande"
            }
          ]
        },
        {
          "titre": "Aromates et farine",
          "texte": "Baisse le feu et fais revenir l'oignon et les carottes 5 minutes dans la cocotte. Remets la viande et les lardons, saupoudre de farine et remue 2 minutes pour la cuire légèrement.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Oignon et carottes"
            },
            {
              "secondes": 120,
              "label": "Cuire la farine"
            }
          ]
        },
        {
          "titre": "Le vin",
          "texte": "Verse le vin rouge en grattant le fond avec une cuillère en bois pour décoller les sucs. Ajoute le bouillon, l'ail, le concentré de tomate et le bouquet garni : la viande doit être presque couverte. Poivre et sale modérément, car les lardons sont déjà salés."
        },
        {
          "titre": "Le mijotage",
          "texte": "Porte à frémissement, couvre et laisse mijoter à tout petit feu 2 h 30 à 3 h, en remuant de temps en temps. La viande est prête quand elle se défait facilement à la fourchette.",
          "minuteurs": [
            {
              "secondes": 9000,
              "label": "Vérifier la viande"
            },
            {
              "secondes": 10800,
              "label": "Mijotage long"
            }
          ]
        },
        {
          "titre": "La garniture",
          "texte": "Pendant le mijotage, épluche les petits oignons et coupe les champignons en quartiers. Une vingtaine de minutes avant la fin, fais dorer les oignons dans une poêle avec le beurre environ 10 minutes, puis ajoute les champignons et laisse-les colorer 5 minutes.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Petits oignons"
            },
            {
              "secondes": 300,
              "label": "Champignons"
            }
          ]
        },
        {
          "titre": "La finition",
          "texte": "Retire le bouquet garni et ajoute les oignons et les champignons dans la cocotte. Laisse mijoter encore 10 minutes à découvert pour que la sauce nappe la cuillère, rectifie l'assaisonnement et parsème de persil ciselé.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Finition à découvert"
            }
          ]
        }
      ],
      "astuces": [
        "Choisis des morceaux à braiser riches en collagène (paleron, macreuse, joue) : ils deviennent fondants en mijotant, là où un morceau à griller deviendrait sec.",
        "Tu peux aussi faire mijoter la cocotte couverte au four à 150 °C pendant le même temps : la chaleur est plus régulière et rien n'attache au fond.",
        "Comme beaucoup de plats mijotés, le bourguignon est souvent encore meilleur réchauffé le lendemain : prépare-le la veille quand tu reçois."
      ],
      "choix": {
        "titre": "Accompagnements",
        "mode": "single",
        "label": "Ton accompagnement",
        "options": [
          "Pommes vapeur",
          "Purée maison",
          "Tagliatelles fraîches",
          "Pommes de terre grenailles",
          "Coquillettes",
          "Polenta crémeuse",
          "Pain de campagne"
        ]
      },
      "accords": [
        {
          "titre": "Le traditionnel",
          "texte": "des pommes de terre vapeur pour profiter de la sauce."
        },
        {
          "titre": "Le réconfort",
          "texte": "une purée maison bien beurrée."
        },
        {
          "titre": "Le bistrot",
          "texte": "des tagliatelles fraîches et un peu de persil."
        },
        {
          "titre": "Le partage",
          "texte": "une miche de pain de campagne pour saucer."
        }
      ],
      "conservation": "Une fois refroidi rapidement, il se garde 2 à 3 jours au réfrigérateur dans une boîte hermétique. Réchauffe-le doucement à couvert, avec un peu d'eau si la sauce a trop épaissi.",
      "allergenes": [
        "gluten",
        "lait",
        "sulfites"
      ],
      "noteAllergenes": "Vérifie aussi la composition de ton bouillon (il contient parfois du céleri).",
      "regime": {
        "sansViande": false,
        "sansPoisson": true
      },
      "origine": {
        "pays": "France",
        "drapeau": "🇫🇷",
        "resume": "Un ragoût de bœuf au vin rouge devenu un symbole de la cuisine française, mais dont le lien avec la Bourgogne est plus récent qu'on ne le croit.",
        "faits": [
          "Le Grand Dictionnaire universel de Pierre Larousse (1867) emploie « bourguignon » pour désigner une cuisson au vin et cite le bœuf comme seul exemple : c'est souvent présenté comme la première mention écrite du plat.",
          "Au XIXe siècle, le plat n'avait pas grande réputation, peut-être parce qu'il était souvent préparé avec des restes de viande cuite ; il n'a été considéré comme une spécialité bourguignonne qu'au XXe siècle.",
          "Aux États-Unis, Julia Child, coautrice de « Mastering the Art of French Cooking » (1961), a ouvert le tout premier épisode de son émission « The French Chef », diffusé le 11 février 1963, avec un bœuf bourguignon."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Beef bourguignon",
            "url": "https://en.wikipedia.org/wiki/Beef_bourguignon"
          },
          {
            "titre": "National Geographic — The story behind boeuf bourguignon",
            "url": "https://www.nationalgeographic.com/travel/article/story-behind-classic-french-dish-boeuf-bourguignon"
          },
          {
            "titre": "Génération Voyage — Le bœuf bourguignon est-il vraiment bourguignon ?",
            "url": "https://generationvoyage.fr/boeuf-bourgogne/"
          },
          {
            "titre": "History.com — Julia Child's The French Chef debuts",
            "url": "https://www.history.com/this-day-in-history/february-11/julia-child-french-chef-debuts"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "blanquette",
      "url": "blanquette-de-veau.html",
      "titre": "Blanquette de veau à l'ancienne",
      "titreCourt": "Blanquette de veau",
      "alias": [
        "blanquette",
        "blanquette de veau"
      ],
      "emoji": "🍲",
      "categorie": "plat",
      "badge": "À l'ancienne",
      "accroche": "Veau poché tout en douceur, champignons, petits oignons et sauce blanche liée à la crème et au jaune d'œuf.",
      "intro": "Un grand plat bourgeois tout en douceur : le veau cuit sans coloration dans un bouillon aromatique, puis se retrouve nappé d'une sauce blanche veloutée. La liaison à la crème et au jaune d'œuf, faite à feu très doux, lui donne l'onctuosité de la version à l'ancienne.",
      "images": [],
      "cover": {
        "motif": "assiette",
        "fond": "#2e3d33",
        "encre": "#f6efe4",
        "accent": "#f4c95d"
      },
      "temps": {
        "preparation": 25,
        "cuisson": 130,
        "repos": 0
      },
      "difficulte": "Intermédiaire",
      "portions": {
        "base": 6,
        "unite": "personne",
        "pluriel": "personnes",
        "min": 2,
        "max": 16
      },
      "tags": [
        "viande",
        "traditionnel",
        "francais",
        "sale",
        "plat",
        "mijote",
        "familial",
        "dimanche",
        "hiver",
        "reconfort",
        "chaud",
        "invite",
        "raffine"
      ],
      "ingredients": [
        {
          "groupe": "Pour le veau et son bouillon",
          "items": [
            {
              "nom": "Veau à blanquette (épaule, tendron, flanchet) en morceaux",
              "qte": 1500,
              "unite": "g"
            },
            {
              "nom": "Carottes",
              "qte": 3,
              "unite": "pièce"
            },
            {
              "nom": "Oignon jaune",
              "qte": 1,
              "unite": "pièce"
            },
            {
              "nom": "Clous de girofle",
              "qte": 2,
              "unite": "pièce",
              "fixe": true
            },
            {
              "nom": "Poireau (le blanc)",
              "qte": 1,
              "unite": "pièce"
            },
            {
              "nom": "Branche de céleri",
              "qte": 1,
              "unite": "pièce"
            },
            {
              "nom": "Bouquet garni (thym, laurier, persil)",
              "qte": 1,
              "unite": "bouquet",
              "fixe": true
            },
            {
              "nom": "Eau froide",
              "qte": null,
              "unite": "",
              "note": "de quoi couvrir la viande"
            },
            {
              "nom": "Sel et poivre",
              "qte": null,
              "unite": "",
              "note": "selon le goût"
            }
          ]
        },
        {
          "groupe": "Pour la garniture",
          "items": [
            {
              "nom": "Petits oignons grelots",
              "qte": 18,
              "unite": "pièce"
            },
            {
              "nom": "Champignons de Paris",
              "qte": 250,
              "unite": "g"
            },
            {
              "nom": "Beurre doux",
              "qte": 20,
              "unite": "g"
            }
          ]
        },
        {
          "groupe": "Pour la sauce",
          "items": [
            {
              "nom": "Beurre doux",
              "qte": 50,
              "unite": "g"
            },
            {
              "nom": "Farine de blé",
              "qte": 50,
              "unite": "g"
            },
            {
              "nom": "Crème fraîche épaisse",
              "qte": 200,
              "unite": "ml"
            },
            {
              "nom": "Jaunes d'œufs",
              "qte": 2,
              "unite": "pièce"
            },
            {
              "nom": "Jus de citron",
              "qte": 1,
              "unite": "c. à soupe"
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Démarrer à froid",
          "texte": "Mets les morceaux de veau dans une grande cocotte et couvre-les largement d'eau froide. Porte doucement à ébullition, puis écume soigneusement la mousse grise qui remonte : c'est le secret d'une sauce bien blanche."
        },
        {
          "titre": "Les aromates",
          "texte": "Épluche les carottes et coupe-les en gros tronçons, pique l'oignon avec les clous de girofle, lave le poireau et la branche de céleri. Ajoute-les dans la cocotte avec le bouquet garni, sale légèrement et poivre."
        },
        {
          "titre": "Le pochage",
          "texte": "Laisse cuire à petits frémissements, couvercle entrouvert, pendant 1 h 30 à 1 h 45, jusqu'à ce que la viande soit tendre. Le bouillon ne doit jamais bouillir fort, sinon le veau durcit et le bouillon se trouble.",
          "minuteurs": [
            {
              "secondes": 5400,
              "label": "Vérifier le veau"
            },
            {
              "secondes": 6300,
              "label": "Pochage long"
            }
          ]
        },
        {
          "titre": "Oignons et champignons",
          "texte": "Pendant le pochage, épluche les petits oignons et coupe les champignons en quartiers. Une vingtaine de minutes avant la fin, fais-les cuire 15 minutes dans une sauteuse, à couvert, avec le beurre de la garniture et une louche de bouillon de cuisson, sans les laisser colorer.",
          "minuteurs": [
            {
              "secondes": 900,
              "label": "Oignons et champignons"
            }
          ]
        },
        {
          "titre": "Égoutter le veau",
          "texte": "Retire la viande et les carottes avec une écumoire et garde-les au chaud à couvert. Jette l'oignon, le poireau, le céleri et le bouquet garni, puis filtre le bouillon et mesures-en environ 800 ml."
        },
        {
          "titre": "Le roux blanc",
          "texte": "Fais fondre le beurre dans une casserole, ajoute la farine et remue 2 minutes à feu doux sans laisser colorer. Verse le bouillon chaud petit à petit en fouettant, puis laisse épaissir 10 minutes à feu doux en remuant souvent.",
          "minuteurs": [
            {
              "secondes": 120,
              "label": "Roux blanc"
            },
            {
              "secondes": 600,
              "label": "Épaissir la sauce"
            }
          ]
        },
        {
          "titre": "La liaison",
          "texte": "Dans un bol, mélange la crème et les jaunes d'œufs, puis ajoute une louche de sauce chaude en fouettant. Verse le tout dans la casserole et chauffe à feu très doux en remuant, sans jamais faire bouillir, jusqu'à ce que la sauce nappe la cuillère."
        },
        {
          "titre": "L'assemblage",
          "texte": "Ajoute le jus de citron et rectifie l'assaisonnement. Remets la viande, les carottes, les oignons et les champignons dans la sauce, réchauffe doucement 5 minutes et sers aussitôt.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Réchauffer doucement"
            }
          ]
        }
      ],
      "astuces": [
        "Une fois les jaunes d'œufs ajoutés, ne laisse jamais bouillir la sauce : ils coaguleraient en petits grains.",
        "Mélange plusieurs morceaux : l'épaule apporte du moelleux, le tendron et le flanchet du fondant.",
        "Garde le reste du bouillon de cuisson au réfrigérateur : il fait une excellente base de soupe ou de risotto."
      ],
      "choix": {
        "titre": "Accompagnements",
        "mode": "single",
        "label": "Ton accompagnement",
        "options": [
          "Riz blanc",
          "Riz pilaf",
          "Pommes vapeur",
          "Tagliatelles fraîches",
          "Purée maison",
          "Pain de campagne"
        ]
      },
      "accords": [
        {
          "titre": "Le classique",
          "texte": "un riz blanc nature pour profiter de la sauce."
        },
        {
          "titre": "Le réconfort",
          "texte": "des pommes de terre vapeur et un peu de persil ciselé."
        },
        {
          "titre": "Le bistrot",
          "texte": "des tagliatelles fraîches nappées de sauce."
        },
        {
          "titre": "Version fraîche",
          "texte": "un trait de citron en plus juste avant de servir."
        }
      ],
      "conservation": "Une fois refroidie rapidement, jusqu'à 2 jours au réfrigérateur dans une boîte hermétique. Réchauffe à feu très doux, sans faire bouillir, pour que la sauce ne tranche pas.",
      "allergenes": [
        "gluten",
        "lait",
        "oeufs",
        "celeri"
      ],
      "regime": {
        "sansViande": false,
        "sansPoisson": true
      },
      "origine": {
        "pays": "France",
        "drapeau": "🇫🇷",
        "resume": "Un ragoût de veau en sauce blanche, grand classique de la cuisine bourgeoise française dont plusieurs régions se disputent la paternité.",
        "faits": [
          "Le cuisinier Vincent La Chapelle est crédité de la première recette écrite de blanquette, dans son « Cuisinier moderne » de 1735.",
          "Selon l'hypothèse jugée la plus plausible par l'historien Jean-Louis Flandrin, c'était à l'origine une façon d'accommoder des restes de rôti de veau avec une sauce blanche ; la version au veau cru ne s'est imposée qu'au XIXe siècle.",
          "Son nom vient du mot « blanc ». Son origine régionale reste inconnue : la Normandie, le Lyonnais et le Poitou, entre autres, la revendiquent."
        ],
        "sources": [
          {
            "titre": "iDealwine — Un plat, une histoire : la blanquette de veau",
            "url": "https://www.idealwine.net/un-plat-une-histoire-un-vin-2-la-blanquette-de-veau-et-la-cuvee-ageno-de-la-stoppa-emilia"
          },
          {
            "titre": "Wikipédia (en) — Blanquette de veau",
            "url": "https://en.wikipedia.org/wiki/Blanquette_de_veau"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "pouletroti",
      "url": "poulet-roti.html",
      "titre": "Poulet rôti du dimanche",
      "titreCourt": "Poulet rôti",
      "alias": [
        "poulet roti",
        "poulet du dimanche"
      ],
      "emoji": "🍗",
      "categorie": "plat",
      "badge": "Repas du dimanche",
      "accroche": "Peau dorée et croustillante, chair juteuse, pommes de terre rôties dans le jus : le grand classique du dimanche.",
      "intro": "Le plat qui embaume toute la maison : un poulet entier rôti au four et arrosé de son jus jusqu'à ce que sa peau soit dorée et croustillante. Les pommes de terre cuisent dans le même plat et s'imprègnent de tous les sucs.",
      "images": [],
      "cover": {
        "motif": "plat-four",
        "fond": "#5c2410",
        "encre": "#f6efe4",
        "accent": "#f2a93b"
      },
      "temps": {
        "preparation": 15,
        "cuisson": 75,
        "repos": 10
      },
      "difficulte": "Facile",
      "portions": {
        "base": 4,
        "unite": "personne",
        "pluriel": "personnes",
        "min": 4,
        "max": 12,
        "pas": 4
      },
      "tags": [
        "viande",
        "traditionnel",
        "francais",
        "sale",
        "plat",
        "four",
        "familial",
        "dimanche",
        "convivial",
        "facile",
        "chaud",
        "reconfort",
        "simple",
        "enfant"
      ],
      "ingredients": [
        {
          "groupe": "Pour le poulet",
          "items": [
            {
              "nom": "Poulet fermier entier (environ 1,6 kg)",
              "qte": 1,
              "unite": "pièce"
            },
            {
              "nom": "Beurre mou",
              "qte": 40,
              "unite": "g"
            },
            {
              "nom": "Thym frais",
              "qte": 4,
              "unite": "brin"
            },
            {
              "nom": "Laurier",
              "qte": 2,
              "unite": "feuille"
            },
            {
              "nom": "Ail",
              "qte": 6,
              "unite": "gousse"
            },
            {
              "nom": "Citron jaune",
              "qte": 1,
              "unite": "pièce",
              "optionnel": true
            },
            {
              "nom": "Eau",
              "qte": 200,
              "unite": "ml"
            },
            {
              "nom": "Sel et poivre",
              "qte": null,
              "unite": "",
              "note": "selon le goût"
            }
          ]
        },
        {
          "groupe": "Pour les pommes de terre",
          "items": [
            {
              "nom": "Pommes de terre grenailles",
              "qte": 800,
              "unite": "g"
            },
            {
              "nom": "Huile d'olive",
              "qte": 2,
              "unite": "c. à soupe"
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Four et poulet",
          "texte": "Préchauffe le four à 210 °C. Sèche bien la peau du poulet avec du papier absorbant : une peau sèche dore et croustille mieux."
        },
        {
          "titre": "Garnir et beurrer",
          "texte": "Sale et poivre l'intérieur, puis glisse-y le citron coupé en deux (si tu en mets), 2 brins de thym et une feuille de laurier. Masse tout le poulet avec le beurre mou, sale et poivre généreusement, puis pose-le sur le dos dans un grand plat allant au four."
        },
        {
          "titre": "Premier rôtissage",
          "texte": "Verse la moitié de l'eau au fond du plat et ajoute les gousses d'ail entières, sans les éplucher. Enfourne pour 20 minutes : la peau commence à dorer.",
          "minuteurs": [
            {
              "secondes": 1200,
              "label": "Premier rôtissage"
            }
          ]
        },
        {
          "titre": "Les pommes de terre",
          "texte": "Pendant ce temps, lave les pommes de terre et coupe les plus grosses en deux. Mélange-les avec l'huile d'olive, le reste du thym et du laurier, du sel et du poivre. Sors le plat du four et dispose-les autour du poulet."
        },
        {
          "titre": "Arroser souvent",
          "texte": "Poursuis la cuisson environ 55 minutes en arrosant le poulet de son jus toutes les 15 à 20 minutes et en remuant les pommes de terre. Si la peau colore trop vite, couvre-la d'une feuille de papier aluminium.",
          "minuteurs": [
            {
              "secondes": 900,
              "label": "Arroser le poulet"
            },
            {
              "secondes": 3300,
              "label": "Fin de cuisson"
            }
          ]
        },
        {
          "titre": "Vérifier la cuisson",
          "texte": "Pique la cuisse au plus épais : le jus qui s'écoule doit être clair et la jointure entre la cuisse et le haut de cuisse ne doit plus être rosée. Avec un thermomètre planté au plus épais de la cuisse, sans toucher l'os, vise au moins 74 °C ; sinon, prolonge de 10 minutes et vérifie à nouveau.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Prolongation"
            }
          ]
        },
        {
          "titre": "Le repos",
          "texte": "Sors le plat du four, pose le poulet sur une planche, couvre-le de papier aluminium et laisse-le reposer 10 minutes : les jus se répartissent dans la chair. Pendant ce temps, mets les pommes de terre dans un plat de service et garde-les au chaud dans le four éteint.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Repos du poulet"
            }
          ]
        },
        {
          "titre": "Jus et service",
          "texte": "Verse le reste de l'eau, bien chaude, dans le plat de cuisson et gratte les sucs avec une cuillère en bois en écrasant les gousses d'ail confites, puis filtre ce jus. Découpe le poulet et sers-le avec les pommes de terre et le jus."
        }
      ],
      "astuces": [
        "Pour une peau encore plus croustillante, sale le poulet la veille et garde-le à découvert dans une assiette, en bas du réfrigérateur : la peau sèche et dore mieux.",
        "Sors le poulet du réfrigérateur environ 30 minutes avant de l'enfourner : il cuira de façon plus régulière.",
        "Garde la carcasse : avec une carotte, un oignon et un bouquet garni, elle donne un bouillon maison savoureux."
      ],
      "securite": "La volaille doit être cuite à cœur, sans trace rosée près de l'os : selon l'Anses, une cuisson à cœur au-delà de 65 °C détruit les bactéries comme Campylobacter, et le repère de 74 °C indiqué dans la recette te laisse une marge. Ne rince pas le poulet cru sous le robinet, car les éclaboussures dispersent les bactéries dans la cuisine, et lave-toi les mains, la planche et les ustensiles après l'avoir manipulé.",
      "sourcesSecurite": [
        {
          "titre": "Anses — Campylobactériose",
          "url": "https://www.anses.fr/fr/content/campylobacteriose"
        },
        {
          "titre": "UFC-Que Choisir — Volaille, porc, bœuf : 7 points clés pour réduire les risques de contamination",
          "url": "https://www.quechoisir.org/conseils-volaille-porc-boeuf-7-points-cles-pour-reduire-les-risques-de-contamination-n5063/"
        },
        {
          "titre": "Test-Achats — Faut-il laver le poulet avant de le cuire ?",
          "url": "https://www.test-achats.be/sante/alimentation-et-nutrition/securite-alimentaire-et-additifs/news/laver-poulet"
        }
      ],
      "choix": {
        "titre": "Accompagnements",
        "mode": "single",
        "label": "Ton accompagnement",
        "options": [
          "Pommes de terre rôties",
          "Frites maison",
          "Gratin dauphinois",
          "Haricots verts",
          "Salade verte",
          "Purée maison",
          "Petits pois carottes",
          "Ratatouille"
        ]
      },
      "accords": [
        {
          "titre": "Le classique",
          "texte": "des pommes de terre rôties dans le jus du poulet."
        },
        {
          "titre": "Le gourmand",
          "texte": "un gratin dauphinois bien crémeux."
        },
        {
          "titre": "Le plus léger",
          "texte": "des haricots verts et une salade verte."
        },
        {
          "titre": "Le bistrot",
          "texte": "des frites maison et un peu de moutarde."
        }
      ],
      "conservation": "Jusqu'à 2 jours au réfrigérateur, découpé, dans une boîte hermétique, après un refroidissement rapide. Réchauffe-le jusqu'à ce qu'il soit bien chaud à cœur, ou déguste-le froid en salade ou en sandwich.",
      "allergenes": [
        "lait"
      ],
      "regime": {
        "sansViande": false,
        "sansPoisson": true
      },
      "origine": {
        "pays": "France",
        "drapeau": "🇫🇷",
        "resume": "Un grand classique des tables familiales françaises, dans un pays attaché à ses volailles fermières, protégées par des appellations et des labels.",
        "faits": [
          "Avec l'industrialisation de l'aviculture à partir des années 1950, de nombreuses races locales et rustiques, comme la poule gasconne, ont été concurrencées par des races hybrides plus productives.",
          "La volaille de Bresse est protégée par une appellation d'origine contrôlée (AOC) depuis 1957.",
          "Le tout premier Label Rouge a été attribué le 13 janvier 1965 au poulet des Landes."
        ],
        "sources": [
          {
            "titre": "INA — La poule-au-pot (Regards sur le Gers)",
            "url": "https://fresques.ina.fr/regards-gers/fiche-media/GERS0000061/la-poule-au-pot.html"
          },
          {
            "titre": "Wikipédia (en) — Bresse chicken",
            "url": "https://en.wikipedia.org/wiki/Bresse_chicken"
          },
          {
            "titre": "INAO — Fiche signe Label Rouge",
            "url": "https://inao.gouv.fr/sites/default/files/2025-01/2016INAO%20-%20fiche%20signe%20-%20Label%20Rouge%20-%20BD.pdf"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "gratindauphinois",
      "url": "gratin-dauphinois.html",
      "titre": "Gratin dauphinois crémeux",
      "titreCourt": "Gratin dauphinois",
      "alias": [
        "gratin dauphinois",
        "dauphinois",
        "gratin de pommes de terre"
      ],
      "emoji": "🥔",
      "categorie": "plat",
      "badge": "Tradition dauphinoise",
      "accroche": "Fines rondelles de pommes de terre cuites lentement dans le lait et la crème à l'ail, sans une once de fromage.",
      "intro": "Le roi des accompagnements : des pommes de terre fondantes, une crème parfumée à l'ail et une surface joliment dorée. Fidèle à la tradition dauphinoise, il se prépare sans fromage : c'est l'amidon des pommes de terre qui lie la crème.",
      "images": [],
      "cover": {
        "motif": "plat-four",
        "fond": "#3d3016",
        "encre": "#f6efe4",
        "accent": "#f5cf5a"
      },
      "temps": {
        "preparation": 20,
        "cuisson": 75,
        "repos": 10
      },
      "difficulte": "Facile",
      "portions": {
        "base": 6,
        "unite": "personne",
        "pluriel": "personnes",
        "min": 2,
        "max": 16
      },
      "tags": [
        "traditionnel",
        "francais",
        "sale",
        "plat",
        "four",
        "vegetarien",
        "familial",
        "dimanche",
        "hiver",
        "reconfort",
        "gourmand",
        "chaud",
        "convivial",
        "simple"
      ],
      "ingredients": [
        {
          "groupe": "Pour le gratin",
          "items": [
            {
              "nom": "Pommes de terre (Charlotte, Monalisa…)",
              "qte": 1200,
              "unite": "g"
            },
            {
              "nom": "Lait entier",
              "qte": 500,
              "unite": "ml"
            },
            {
              "nom": "Crème liquide entière",
              "qte": 300,
              "unite": "ml"
            },
            {
              "nom": "Ail",
              "qte": 2,
              "unite": "gousse"
            },
            {
              "nom": "Beurre doux",
              "qte": 30,
              "unite": "g"
            },
            {
              "nom": "Noix de muscade râpée",
              "qte": 1,
              "unite": "pincée",
              "fixe": true
            },
            {
              "nom": "Sel et poivre",
              "qte": null,
              "unite": "",
              "note": "selon le goût"
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Four et plat",
          "texte": "Préchauffe le four à 160 °C. Frotte le plat à gratin avec une gousse d'ail coupée en deux, puis beurre-le avec une partie du beurre."
        },
        {
          "titre": "Les pommes de terre",
          "texte": "Épluche les pommes de terre et coupe-les en rondelles fines et régulières d'environ 3 mm, à la mandoline ou au couteau. Ne les rince pas : leur amidon va lier la crème."
        },
        {
          "titre": "Le lait parfumé",
          "texte": "Verse le lait et la crème dans une grande casserole, puis ajoute la seconde gousse d'ail hachée, la muscade, du sel et du poivre. Porte doucement à frémissement."
        },
        {
          "titre": "La précuisson",
          "texte": "Plonge les rondelles dans le lait frémissant et laisse cuire 10 minutes à feu doux, en remuant délicatement avec une spatule pour qu'elles n'attachent pas. Le liquide épaissit légèrement grâce à l'amidon.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Précuisson"
            }
          ]
        },
        {
          "titre": "Le montage",
          "texte": "Verse les pommes de terre et leur crème dans le plat et égalise la surface : le liquide doit arriver juste au niveau des pommes de terre. Parsème du reste de beurre en petites noisettes."
        },
        {
          "titre": "La cuisson",
          "texte": "Enfourne pour 1 heure environ, jusqu'à ce que le dessus soit bien doré et que la pointe d'un couteau s'enfonce sans résistance. Si le dessus colore trop vite, couvre-le de papier aluminium.",
          "minuteurs": [
            {
              "secondes": 3600,
              "label": "Vérifier la cuisson"
            },
            {
              "secondes": 4500,
              "label": "Cuisson prolongée"
            }
          ]
        },
        {
          "titre": "Le repos",
          "texte": "Sors le gratin du four et laisse-le reposer 10 minutes avant de servir. La crème se raffermit et les parts se tiennent mieux.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Repos du gratin"
            }
          ]
        }
      ],
      "astuces": [
        "Des rondelles d'épaisseur régulière cuisent toutes en même temps : une mandoline aide beaucoup, mais utilise toujours son poussoir pour protéger tes doigts.",
        "Pour la variété, les avis divergent : une chair ferme comme la Charlotte donne des tranches qui se tiennent, une chair plus fondante comme la Monalisa un gratin plus lié.",
        "Pour une version un peu plus légère, remplace une partie de la crème par du lait : le gratin sera moins onctueux mais toujours fondant."
      ],
      "choix": {
        "titre": "Pour l'accompagner",
        "mode": "single",
        "label": "Ton accord",
        "options": [
          "Poulet rôti",
          "Gigot d'agneau",
          "Côte de bœuf",
          "Rôti de porc",
          "Jambon blanc",
          "Magret de canard",
          "Salade verte"
        ]
      },
      "accords": [
        {
          "titre": "Le repas du dimanche",
          "texte": "avec un poulet rôti et son jus."
        },
        {
          "titre": "Le festif",
          "texte": "aux côtés d'un gigot d'agneau rosé."
        },
        {
          "titre": "Le plus simple",
          "texte": "avec une salade verte bien vinaigrée."
        },
        {
          "titre": "Le gourmand",
          "texte": "avec une côte de bœuf grillée."
        }
      ],
      "conservation": "Une fois refroidi, jusqu'à 2 jours au réfrigérateur, couvert. Réchauffe au four à 150 °C, sous papier aluminium, jusqu'à ce qu'il soit bien chaud à cœur.",
      "allergenes": [
        "lait"
      ],
      "regime": {
        "sansViande": true,
        "sansPoisson": true
      },
      "origine": {
        "pays": "France (Dauphiné)",
        "drapeau": "🇫🇷",
        "resume": "Spécialité de l'ancienne province du Dauphiné : des pommes de terre cuites lentement dans le lait et la crème.",
        "faits": [
          "La plus ancienne mention souvent citée remonte au 12 juillet 1788 : un gratin servi lors d'un dîner offert par le duc de Clermont-Tonnerre, lieutenant général du Dauphiné, aux officiers municipaux de Gap.",
          "Un article du Dauphiné libéré, repris par Mon séjour en montagne, indique que la copie du menu mentionne « un gratin » sans préciser « dauphinois » : l'anecdote reste donc discutée.",
          "La recette dauphinoise traditionnelle se prépare sans fromage ni œufs."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Gratin dauphinois",
            "url": "https://en.wikipedia.org/wiki/Gratin_dauphinois"
          },
          {
            "titre": "Mon séjour en montagne — Le gratin dauphinois, le plat emblématique du Dauphiné",
            "url": "https://www.mon-sejour-en-montagne.com/histoires-et-anecdotes/le-gratin-dauphinois-le-plat-emblematique-du-dauphine/"
          },
          {
            "titre": "24matins — Le vrai gratin dauphinois, sans fromage",
            "url": "https://www.24matins.fr/le-vrai-gratin-dauphinois-sans-fromage-et-les-gestes-qui-changent-tout-1408793"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "ratatouille",
      "url": "ratatouille.html",
      "titre": "Ratatouille provençale mijotée",
      "titreCourt": "Ratatouille provençale",
      "alias": [
        "ratatouille"
      ],
      "emoji": "🍆",
      "categorie": "plat",
      "badge": "Soleil du Sud",
      "accroche": "Aubergines et courgettes dorées à part, puis mijotées avec poivrons, oignons et tomates à l'huile d'olive.",
      "intro": "Un grand classique de l'été provençal, où aubergines et courgettes dorent à part avant de mijoter avec les poivrons, les oignons et les tomates, dans l'huile d'olive et les herbes. Chaude, tiède ou froide, elle accompagne tout et se savoure souvent encore mieux le lendemain.",
      "images": [],
      "cover": {
        "motif": "cocotte",
        "fond": "#4a1f3d",
        "encre": "#f6efe4",
        "accent": "#e8452c"
      },
      "temps": {
        "preparation": 25,
        "cuisson": 70,
        "repos": 0
      },
      "difficulte": "Facile",
      "portions": {
        "base": 6,
        "unite": "personne",
        "pluriel": "personnes",
        "min": 2,
        "max": 16
      },
      "tags": [
        "vegetarien",
        "traditionnel",
        "francais",
        "sale",
        "plat",
        "ete",
        "healthy",
        "equilibre",
        "leger",
        "mijote",
        "familial",
        "chaud",
        "froid"
      ],
      "ingredients": [
        {
          "groupe": "Pour les légumes",
          "items": [
            {
              "nom": "Aubergines",
              "qte": 2,
              "unite": "pièce"
            },
            {
              "nom": "Courgettes",
              "qte": 3,
              "unite": "pièce"
            },
            {
              "nom": "Poivron rouge",
              "qte": 1,
              "unite": "pièce"
            },
            {
              "nom": "Poivron jaune",
              "qte": 1,
              "unite": "pièce"
            },
            {
              "nom": "Oignons jaunes",
              "qte": 2,
              "unite": "pièce"
            },
            {
              "nom": "Tomates bien mûres",
              "qte": 800,
              "unite": "g"
            },
            {
              "nom": "Ail",
              "qte": 3,
              "unite": "gousse"
            }
          ]
        },
        {
          "groupe": "Pour la cuisson et les aromates",
          "items": [
            {
              "nom": "Huile d'olive",
              "qte": 8,
              "unite": "c. à soupe"
            },
            {
              "nom": "Bouquet garni (thym, laurier)",
              "qte": 1,
              "unite": "bouquet",
              "fixe": true
            },
            {
              "nom": "Feuilles de basilic frais",
              "qte": 10,
              "unite": "feuille"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 1,
              "unite": "pincée",
              "fixe": true,
              "optionnel": true
            },
            {
              "nom": "Sel et poivre",
              "qte": null,
              "unite": "",
              "note": "selon le goût"
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "La découpe",
          "texte": "Lave tous les légumes. Coupe les aubergines et les courgettes en cubes d'environ 2 cm, épépine les poivrons et taille-les en lanières, émince les oignons et hache l'ail. Pèle les tomates si tu préfères une sauce plus fine, puis coupe-les en morceaux."
        },
        {
          "titre": "Les aubergines",
          "texte": "Fais chauffer 3 cuillères à soupe d'huile d'olive dans une grande cocotte à feu moyen-vif. Fais dorer les aubergines environ 8 minutes en remuant (en deux fois si ta cocotte est petite), sale légèrement, puis réserve-les dans un saladier.",
          "minuteurs": [
            {
              "secondes": 480,
              "label": "Aubergines"
            }
          ]
        },
        {
          "titre": "Les courgettes",
          "texte": "Ajoute 2 cuillères à soupe d'huile et fais revenir les courgettes 5 à 6 minutes : elles doivent dorer sans devenir molles. Réserve-les avec les aubergines.",
          "minuteurs": [
            {
              "secondes": 360,
              "label": "Courgettes"
            }
          ]
        },
        {
          "titre": "Oignons et poivrons",
          "texte": "Verse encore 2 cuillères à soupe d'huile, puis fais revenir les oignons et les poivrons à feu moyen environ 10 minutes. Ils doivent être tendres et légèrement colorés.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Oignons et poivrons"
            }
          ]
        },
        {
          "titre": "La tomate",
          "texte": "Ajoute l'ail et remue 1 minute, puis incorpore les tomates, le bouquet garni et, si les tomates sont acides, la pincée de sucre. Laisse compoter environ 10 minutes à découvert pour que les tomates rendent leur jus.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Tomates"
            }
          ]
        },
        {
          "titre": "Le mijotage",
          "texte": "Remets les aubergines et les courgettes dans la cocotte, sale, poivre et mélange délicatement. Couvre et laisse mijoter à feu doux environ 35 minutes, en remuant de temps en temps sans écraser les légumes.",
          "minuteurs": [
            {
              "secondes": 2100,
              "label": "Mijotage"
            }
          ]
        },
        {
          "titre": "La finition",
          "texte": "Retire le bouquet garni, goûte et rectifie l'assaisonnement ; si le jus est trop abondant, laisse réduire quelques minutes à découvert. Hors du feu, ajoute le basilic ciselé et la dernière cuillère d'huile d'olive."
        }
      ],
      "astuces": [
        "Cuire les légumes séparément prend un peu plus de temps, mais chacun garde sa texture et son goût au lieu de se transformer en purée.",
        "Coupe tous les légumes à peu près à la même taille : ils cuiront de façon plus régulière.",
        "Hors saison, une boîte de tomates pelées de bonne qualité remplace avantageusement des tomates fades."
      ],
      "choix": {
        "titre": "Accompagnements",
        "mode": "single",
        "label": "Ton choix",
        "options": [
          "Riz blanc",
          "Semoule",
          "Pâtes fraîches",
          "Œuf au plat",
          "Pain de campagne",
          "Gigot d'agneau",
          "Poisson grillé",
          "Pommes de terre vapeur"
        ]
      },
      "accords": [
        {
          "titre": "La provençale",
          "texte": "avec un gigot d'agneau rôti aux herbes."
        },
        {
          "titre": "La végétarienne",
          "texte": "un œuf au plat posé sur la ratatouille chaude."
        },
        {
          "titre": "La simple",
          "texte": "du riz blanc ou de la semoule pour profiter du jus."
        },
        {
          "titre": "L'estivale",
          "texte": "froide, avec du pain de campagne grillé."
        }
      ],
      "conservation": "2 à 3 jours au réfrigérateur dans une boîte hermétique. Réchauffe-la doucement à la casserole, ou déguste-la froide.",
      "allergenes": [],
      "regime": {
        "sansViande": true,
        "sansPoisson": true,
        "vegan": true
      },
      "origine": {
        "pays": "France (Provence, Nice)",
        "drapeau": "🇫🇷",
        "resume": "Un mijoté de légumes d'été à l'huile d'olive, né dans la cuisine paysanne de Provence et étroitement associé à Nice.",
        "faits": [
          "Son nom vient de l'occitan « ratatolha », de la même famille que le verbe « touiller », qui veut dire remuer.",
          "Au début du XIXe siècle, le mot désignait un ragoût grossier ou un mélange quelconque, pas encore ce plat de légumes ; la date de la première recette imprimée proche de la ratatouille actuelle reste discutée selon les sources."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Ratatouille",
            "url": "https://en.wikipedia.org/wiki/Ratatouille"
          },
          {
            "titre": "Vikidia — Ratatouille",
            "url": "https://fr.vikidia.org/wiki/Ratatouille"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "quichelorraine",
      "url": "quiche-lorraine.html",
      "titre": "Quiche lorraine traditionnelle",
      "titreCourt": "Quiche lorraine",
      "alias": [
        "quiche",
        "quiche lorraine"
      ],
      "emoji": "🥧",
      "categorie": "plat",
      "badge": "Grand classique",
      "accroche": "Pâte brisée maison, lardons fumés et appareil onctueux aux œufs et à la crème : la grande tarte salée de Lorraine.",
      "intro": "La quiche lorraine dans sa version traditionnelle : une pâte brisée croustillante, des lardons fumés et une crème aux œufs juste prise. Simple et généreuse, elle se partage chaude avec une salade verte, ou tiède pour un pique-nique.",
      "images": [],
      "cover": {
        "motif": "tarte",
        "fond": "#4b2e14",
        "encre": "#f6efe4",
        "accent": "#f2c14e"
      },
      "temps": {
        "preparation": 25,
        "cuisson": 50,
        "repos": 35
      },
      "difficulte": "Intermédiaire",
      "portions": {
        "base": 8,
        "unite": "part",
        "pluriel": "parts",
        "min": 4,
        "max": 16,
        "pas": 2
      },
      "tags": [
        "viande",
        "traditionnel",
        "francais",
        "sale",
        "plat",
        "four",
        "familial",
        "convivial",
        "chaud",
        "froid",
        "gourmand",
        "copieux",
        "simple"
      ],
      "ingredients": [
        {
          "groupe": "Pour la pâte brisée",
          "items": [
            {
              "nom": "Farine de blé",
              "qte": 250,
              "unite": "g"
            },
            {
              "nom": "Beurre froid",
              "qte": 125,
              "unite": "g"
            },
            {
              "nom": "Eau froide",
              "qte": 60,
              "unite": "ml"
            },
            {
              "nom": "Sel fin",
              "qte": 1,
              "unite": "pincée",
              "fixe": true
            },
            {
              "nom": "Beurre et farine pour le moule et le plan de travail",
              "qte": null,
              "unite": "",
              "note": "un peu"
            }
          ]
        },
        {
          "groupe": "Pour la garniture",
          "items": [
            {
              "nom": "Lardons fumés",
              "qte": 200,
              "unite": "g"
            },
            {
              "nom": "Gruyère ou comté râpé",
              "qte": 50,
              "unite": "g",
              "optionnel": true
            }
          ]
        },
        {
          "groupe": "Pour l'appareil",
          "items": [
            {
              "nom": "Œufs",
              "qte": 4,
              "unite": "pièce"
            },
            {
              "nom": "Crème fraîche épaisse",
              "qte": 200,
              "unite": "ml"
            },
            {
              "nom": "Lait entier",
              "qte": 200,
              "unite": "ml"
            },
            {
              "nom": "Noix de muscade râpée",
              "qte": 1,
              "unite": "pincée",
              "fixe": true
            },
            {
              "nom": "Sel et poivre",
              "qte": null,
              "unite": "",
              "note": "selon le goût"
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "La pâte brisée",
          "texte": "Dans un saladier, mélange la farine et le sel, puis ajoute le beurre froid coupé en dés. Sable du bout des doigts jusqu'à obtenir une texture de chapelure, verse l'eau froide et rassemble rapidement la pâte en boule, sans la pétrir."
        },
        {
          "titre": "Le repos",
          "texte": "Aplatis la boule en disque, filme-la et laisse-la reposer 30 minutes au réfrigérateur. Elle sera plus facile à étaler et se rétractera moins à la cuisson.",
          "minuteurs": [
            {
              "secondes": 1800,
              "label": "Repos de la pâte"
            }
          ]
        },
        {
          "titre": "Foncer le moule",
          "texte": "Préchauffe le four à 180 °C. Étale la pâte sur le plan de travail fariné et garnis-en un moule à tarte beurré de 26 à 28 cm. Pique le fond à la fourchette."
        },
        {
          "titre": "Cuire à blanc",
          "texte": "Couvre la pâte d'une feuille de papier cuisson garnie de billes de cuisson ou de légumes secs, puis enfourne 15 minutes. Retire le papier et les billes : la pâte doit être prise et à peine blondie.",
          "minuteurs": [
            {
              "secondes": 900,
              "label": "Cuisson à blanc"
            }
          ]
        },
        {
          "titre": "Les lardons",
          "texte": "Pendant ce temps, fais revenir les lardons à sec dans une poêle 4 à 5 minutes. Égoutte-les sur du papier absorbant pour retirer l'excès de gras.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Lardons"
            }
          ]
        },
        {
          "titre": "L'appareil",
          "texte": "Fouette les œufs avec la crème fraîche et le lait, puis ajoute la muscade et poivre. Sale très peu, voire pas du tout : les lardons le sont déjà."
        },
        {
          "titre": "Le garnissage",
          "texte": "Répartis les lardons sur le fond de tarte précuit, ainsi que le fromage râpé si tu en mets. Verse l'appareil par-dessus sans dépasser le bord de la pâte."
        },
        {
          "titre": "La cuisson",
          "texte": "Enfourne 30 à 35 minutes à 180 °C, jusqu'à ce que la quiche soit gonflée et dorée, avec un centre pris qui tremblote à peine. Laisse-la reposer 5 minutes avant de la découper.",
          "minuteurs": [
            {
              "secondes": 1800,
              "label": "Vérifier la cuisson"
            },
            {
              "secondes": 2100,
              "label": "Cuisson complète"
            },
            {
              "secondes": 300,
              "label": "Repos avant découpe"
            }
          ]
        }
      ],
      "astuces": [
        "Utilise un beurre bien froid et travaille la pâte le moins possible : c'est ce qui la rend friable et croustillante.",
        "La cuisson à blanc évite un fond de tarte détrempé par l'appareil liquide.",
        "Pour éviter les débordements, pose le moule sur la grille du four avant de verser la fin de l'appareil."
      ],
      "choix": {
        "titre": "Variantes & accompagnements",
        "mode": "single",
        "label": "Ton choix",
        "options": [
          "Salade verte",
          "Salade de mâche",
          "Gruyère râpé",
          "Oignons fondus",
          "Poireaux fondus",
          "Ciboulette ciselée",
          "Crudités"
        ]
      },
      "accords": [
        {
          "titre": "La traditionnelle",
          "texte": "sans fromage, avec une salade verte bien assaisonnée."
        },
        {
          "titre": "La gratinée",
          "texte": "un peu de gruyère ou de comté râpé sur les lardons."
        },
        {
          "titre": "La fondante",
          "texte": "des oignons doucement fondus au beurre ajoutés aux lardons."
        },
        {
          "titre": "Le pique-nique",
          "texte": "tiède ou froide, coupée en parts, avec des crudités."
        }
      ],
      "conservation": "Jusqu'à 2 jours au réfrigérateur, bien couverte. Réchauffe-la au four plutôt qu'au micro-ondes pour que la pâte reste croustillante.",
      "allergenes": [
        "gluten",
        "oeufs",
        "lait"
      ],
      "regime": {
        "sansViande": false,
        "sansPoisson": true
      },
      "origine": {
        "pays": "France (Lorraine)",
        "drapeau": "🇫🇷",
        "resume": "Une tarte salée aux œufs, à la crème et au lard, emblème de la Lorraine, région longtemps disputée entre la France et le monde germanique.",
        "faits": [
          "La plus ancienne trace écrite souvent citée remonte à 1586 : la mention manuscrite d'une tarte préparée à la cour du duc Charles III de Lorraine.",
          "Le mot « quiche » est souvent rapproché de l'allemand « Kuchen » (gâteau), mais son étymologie exacte reste incertaine.",
          "Selon le chef Olivier Poels, interrogé par Europe 1, la version d'origine se faisait sur des restes de pâte à pain garnis d'œufs et de crème ; le lard fumé est venu plus tard, et la recette d'origine ne contient pas de fromage."
        ],
        "sources": [
          {
            "titre": "Europe 1 — l'histoire de la quiche lorraine",
            "url": "https://www.europe1.fr/node/114684"
          },
          {
            "titre": "Wikipédia (en) — Quiche",
            "url": "https://en.wikipedia.org/wiki/Quiche"
          },
          {
            "titre": "Tasting Table — How Quiche Lorraine Got Its Iconic Name",
            "url": "https://www.tastingtable.com/1492696/quiche-lorraine-name-origin/"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "lasagnes",
      "url": "lasagnes-bolognaise.html",
      "titre": "Lasagnes à la bolognaise",
      "titreCourt": "Lasagnes bolognaise",
      "alias": [
        "lasagne",
        "lasagnes",
        "lasagnes bolognaise",
        "lasagnes a la bolognaise"
      ],
      "emoji": "🍝",
      "categorie": "plat",
      "badge": "Plat du dimanche",
      "accroche": "Un ragù mijoté longuement, une béchamel onctueuse et du parmesan, en couches généreuses gratinées au four.",
      "intro": "Le plat familial par excellence : des couches de pâte, une bolognaise longuement mijotée et une béchamel crémeuse, gratinées au parmesan. Il demande un peu de temps, mais se prépare volontiers la veille pour un repas sans stress.",
      "images": [],
      "cover": {
        "motif": "plat-four",
        "fond": "#5c1a12",
        "encre": "#f6efe4",
        "accent": "#f0b429"
      },
      "temps": {
        "preparation": 30,
        "cuisson": 150,
        "repos": 10
      },
      "difficulte": "Intermédiaire",
      "portions": {
        "base": 6,
        "unite": "personne",
        "pluriel": "personnes",
        "min": 2,
        "max": 12
      },
      "tags": [
        "viande",
        "italien",
        "traditionnel",
        "sale",
        "plat",
        "four",
        "mijote",
        "familial",
        "convivial",
        "copieux",
        "gourmand",
        "reconfort",
        "hiver",
        "dimanche"
      ],
      "ingredients": [
        {
          "groupe": "Pour le ragù",
          "items": [
            {
              "nom": "Huile d'olive",
              "qte": 2,
              "unite": "c. à soupe"
            },
            {
              "nom": "Oignon jaune",
              "qte": 1,
              "unite": "pièce"
            },
            {
              "nom": "Carotte",
              "qte": 1,
              "unite": "pièce"
            },
            {
              "nom": "Branche de céleri",
              "qte": 1,
              "unite": "pièce"
            },
            {
              "nom": "Bœuf haché (ou moitié bœuf, moitié porc)",
              "qte": 500,
              "unite": "g"
            },
            {
              "nom": "Vin rouge ou blanc sec",
              "qte": 150,
              "unite": "ml"
            },
            {
              "nom": "Concentré de tomate",
              "qte": 2,
              "unite": "c. à soupe"
            },
            {
              "nom": "Coulis de tomate (passata)",
              "qte": 700,
              "unite": "ml"
            },
            {
              "nom": "Feuille de laurier",
              "qte": 1,
              "unite": "feuille",
              "fixe": true
            },
            {
              "nom": "Eau",
              "qte": null,
              "unite": "",
              "note": "si besoin"
            },
            {
              "nom": "Sel et poivre",
              "qte": null,
              "unite": "",
              "note": "selon le goût"
            }
          ]
        },
        {
          "groupe": "Pour la béchamel",
          "items": [
            {
              "nom": "Beurre",
              "qte": 60,
              "unite": "g"
            },
            {
              "nom": "Farine de blé",
              "qte": 60,
              "unite": "g"
            },
            {
              "nom": "Lait entier froid",
              "qte": 800,
              "unite": "ml"
            },
            {
              "nom": "Noix de muscade râpée",
              "qte": 1,
              "unite": "pincée",
              "fixe": true
            },
            {
              "nom": "Sel",
              "qte": 1,
              "unite": "pincée",
              "fixe": true
            }
          ]
        },
        {
          "groupe": "Pour le montage",
          "items": [
            {
              "nom": "Feuilles de lasagnes sèches (sans précuisson)",
              "qte": 250,
              "unite": "g"
            },
            {
              "nom": "Parmesan râpé",
              "qte": 100,
              "unite": "g"
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Le soffritto",
          "texte": "Hache finement l'oignon, la carotte et le céleri. Fais-les revenir doucement dans l'huile d'olive 8 à 10 minutes, jusqu'à ce qu'ils soient tendres et légèrement dorés.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Légumes"
            }
          ]
        },
        {
          "titre": "La viande",
          "texte": "Monte le feu, ajoute la viande hachée et fais-la revenir 6 à 8 minutes en l'émiettant à la cuillère en bois, jusqu'à ce qu'elle ne soit plus rosée. Verse le vin et laisse-le s'évaporer 2 à 3 minutes.",
          "minuteurs": [
            {
              "secondes": 480,
              "label": "Viande"
            },
            {
              "secondes": 180,
              "label": "Évaporation du vin"
            }
          ]
        },
        {
          "titre": "Le mijotage",
          "texte": "Ajoute le concentré, le coulis de tomate et la feuille de laurier, puis sale et poivre. Laisse mijoter à feu très doux environ 1 h 30, couvercle entrouvert, en remuant de temps en temps. Si la sauce attache ou épaissit trop, ajoute un peu d'eau.",
          "minuteurs": [
            {
              "secondes": 5400,
              "label": "Mijotage du ragù"
            }
          ]
        },
        {
          "titre": "La béchamel",
          "texte": "Fais fondre le beurre dans une casserole, ajoute la farine et remue 1 à 2 minutes sans laisser colorer. Verse le lait froid petit à petit en fouettant, puis laisse épaissir environ 5 minutes à feu doux sans cesser de remuer. Assaisonne avec la muscade et le sel.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Béchamel"
            }
          ]
        },
        {
          "titre": "Le four",
          "texte": "Préchauffe le four à 180 °C. Retire la feuille de laurier du ragù, goûte et rectifie l'assaisonnement : il doit être bien relevé, car les pâtes et la béchamel l'adoucissent."
        },
        {
          "titre": "Le montage",
          "texte": "Dans un plat d'environ 20 × 30 cm, étale une fine couche de béchamel, puis alterne feuilles de lasagnes, ragù, béchamel et parmesan. Répète sur 3 ou 4 étages en finissant par la béchamel et une bonne couche de parmesan. Les feuilles doivent être entièrement recouvertes de sauce pour bien cuire."
        },
        {
          "titre": "La cuisson",
          "texte": "Enfourne 35 à 40 minutes, jusqu'à ce que le dessus soit bien doré et que la pointe d'un couteau traverse les pâtes sans résistance. Si le dessus colore trop vite, couvre d'une feuille d'aluminium.",
          "minuteurs": [
            {
              "secondes": 2100,
              "label": "Vérifier la cuisson"
            },
            {
              "secondes": 2400,
              "label": "Cuisson complète"
            }
          ]
        },
        {
          "titre": "Le repos",
          "texte": "Laisse reposer les lasagnes 10 minutes hors du four avant de servir. Les couches se tiennent mieux et la découpe est plus nette.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Repos"
            }
          ]
        }
      ],
      "astuces": [
        "Le ragù peut se préparer la veille : les saveurs ont le temps de se mêler et le montage du jour J est bien plus rapide.",
        "Pour une béchamel sans grumeaux, verse le lait froid sur le roux chaud petit à petit, en fouettant sans arrêt.",
        "Avec des feuilles sèches sans précuisson, c'est la sauce qui cuit les pâtes : ne sois pas avare de ragù et de béchamel, et vérifie le temps indiqué sur le paquet."
      ],
      "choix": {
        "titre": "Accompagnements",
        "mode": "single",
        "label": "Ton choix",
        "options": [
          "Salade verte",
          "Roquette & parmesan",
          "Tomates mozzarella",
          "Salade de fenouil",
          "Pain à l'ail",
          "Copeaux de parmesan"
        ]
      },
      "accords": [
        {
          "titre": "La classique",
          "texte": "une salade verte bien vinaigrée pour équilibrer la richesse du plat."
        },
        {
          "titre": "La bolognaise",
          "texte": "des feuilles de pâte verte aux épinards, comme à Bologne."
        },
        {
          "titre": "L'italienne",
          "texte": "une salade de roquette aux copeaux de parmesan."
        },
        {
          "titre": "La gratinée",
          "texte": "un peu de mozzarella sur le dessus en fin de cuisson."
        }
      ],
      "conservation": "2 à 3 jours au réfrigérateur, bien couvertes. Réchauffe-les au four, couvertes d'aluminium ; elles se congèlent aussi en portions.",
      "allergenes": [
        "gluten",
        "lait",
        "celeri",
        "sulfites"
      ],
      "noteAllergenes": "Beaucoup de feuilles de lasagnes sont fabriquées avec des œufs : vérifie l'étiquette.",
      "regime": {
        "sansViande": false,
        "sansPoisson": true
      },
      "origine": {
        "pays": "Italie (Bologne, Émilie-Romagne)",
        "drapeau": "🇮🇹",
        "resume": "Les lasagnes sont étroitement liées à Bologne ; la version au ragù et à la béchamel est un classique de l'Émilie-Romagne.",
        "faits": [
          "La plus ancienne mention écrite connue des lasagnes se trouve dans une ballade de 1282, transcrite par un notaire bolonais.",
          "L'origine du mot est discutée : il viendrait soit du grec « laganon », une feuille de pâte, soit du latin « lasanum », une marmite.",
          "En 2003, la délégation Bologna-San Luca de l'Accademia Italiana della Cucina a déposé à la Chambre de commerce de Bologne une recette de référence des « lasagne verdi alla bolognese », à la pâte aux épinards."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Lasagna",
            "url": "https://en.wikipedia.org/wiki/Lasagna"
          },
          {
            "titre": "Britannica — Lasagna",
            "url": "https://www.britannica.com/topic/lasagna"
          },
          {
            "titre": "Bologna Welcome — Lasagne verdi alla bolognese",
            "url": "https://www.bolognawelcome.com/en/other/recipes-and-typical-products/lasagne-verdi-alla-bolognese-2"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "risottochampignons",
      "url": "risotto-champignons.html",
      "titre": "Risotto crémeux aux champignons",
      "titreCourt": "Risotto aux champignons",
      "alias": [
        "risotto",
        "risotto aux champignons"
      ],
      "emoji": "🍄",
      "categorie": "plat",
      "badge": "Crémeux",
      "accroche": "Riz nacré, bouillon versé louche après louche, champignons dorés et parmesan : un risotto bien crémeux.",
      "intro": "Le risotto demande surtout de la patience : un riz nacré, nourri de bouillon chaud louche après louche, jusqu'à devenir onctueux. Les champignons dorés à part lui apportent tout leur goût de sous-bois.",
      "images": [],
      "cover": {
        "motif": "assiette",
        "fond": "#3b2a1e",
        "encre": "#f6efe4",
        "accent": "#d9a441"
      },
      "temps": {
        "preparation": 15,
        "cuisson": 35,
        "repos": 2
      },
      "difficulte": "Intermédiaire",
      "portions": {
        "base": 4,
        "unite": "personne",
        "pluriel": "personnes",
        "min": 1,
        "max": 12
      },
      "tags": [
        "italien",
        "traditionnel",
        "sale",
        "plat",
        "chaud",
        "reconfort",
        "hiver",
        "gourmand",
        "raffine",
        "invite",
        "romantique"
      ],
      "ingredients": [
        {
          "groupe": "Pour les champignons",
          "items": [
            {
              "nom": "Champignons (de Paris, pleurotes, cèpes…)",
              "qte": 400,
              "unite": "g"
            },
            {
              "nom": "Ail",
              "qte": 1,
              "unite": "gousse"
            },
            {
              "nom": "Beurre",
              "qte": 20,
              "unite": "g"
            },
            {
              "nom": "Huile d'olive",
              "qte": 1,
              "unite": "c. à soupe"
            },
            {
              "nom": "Persil plat",
              "qte": 4,
              "unite": "brin"
            }
          ]
        },
        {
          "groupe": "Pour le risotto",
          "items": [
            {
              "nom": "Riz à risotto (arborio ou carnaroli)",
              "qte": 320,
              "unite": "g"
            },
            {
              "nom": "Bouillon de légumes",
              "qte": 1200,
              "unite": "ml"
            },
            {
              "nom": "Échalotes",
              "qte": 2,
              "unite": "pièce"
            },
            {
              "nom": "Huile d'olive",
              "qte": 1,
              "unite": "c. à soupe"
            },
            {
              "nom": "Vin blanc sec",
              "qte": 100,
              "unite": "ml"
            },
            {
              "nom": "Beurre froid",
              "qte": 30,
              "unite": "g"
            },
            {
              "nom": "Parmesan râpé",
              "qte": 60,
              "unite": "g"
            },
            {
              "nom": "Sel et poivre",
              "qte": null,
              "unite": "",
              "note": "selon le goût"
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "La mise en place",
          "texte": "Fais chauffer le bouillon et garde-le frémissant à feu très doux pendant toute la recette. Nettoie les champignons avec un papier humide et coupe-les en lamelles, cisèle les échalotes, hache l'ail et le persil."
        },
        {
          "titre": "Les champignons",
          "texte": "Dans une grande poêle, fais chauffer le beurre et l'huile à feu vif, puis fais dorer les champignons 6 à 8 minutes sans trop les remuer. Ajoute l'ail en fin de cuisson, sale, poivre et réserve.",
          "minuteurs": [
            {
              "secondes": 420,
              "label": "Champignons"
            }
          ]
        },
        {
          "titre": "Nacrer le riz",
          "texte": "Dans une sauteuse, fais suer les échalotes 2 à 3 minutes dans l'huile d'olive, sans coloration. Ajoute le riz, sans le rincer, et remue 1 à 2 minutes : quand les grains deviennent translucides sur les bords, le riz est nacré.",
          "minuteurs": [
            {
              "secondes": 180,
              "label": "Échalotes"
            },
            {
              "secondes": 120,
              "label": "Nacrage"
            }
          ]
        },
        {
          "titre": "Le vin blanc",
          "texte": "Verse le vin blanc et remue jusqu'à ce qu'il soit presque entièrement absorbé. L'alcool s'évapore et il ne reste que son parfum."
        },
        {
          "titre": "Le bouillon",
          "texte": "Ajoute une louche de bouillon chaud et remue régulièrement jusqu'à ce qu'elle soit presque absorbée, puis recommence louche après louche. Compte 16 à 18 minutes selon le riz (vérifie le paquet) : il doit être tendre mais garder un léger croquant à cœur.",
          "minuteurs": [
            {
              "secondes": 960,
              "label": "Premier test"
            },
            {
              "secondes": 1080,
              "label": "Cuisson du riz"
            }
          ]
        },
        {
          "titre": "Retour des champignons",
          "texte": "Environ 3 minutes avant la fin, incorpore les champignons dorés en remuant délicatement. Garde-en quelques lamelles pour la décoration."
        },
        {
          "titre": "La mantecatura",
          "texte": "Hors du feu, ajoute le beurre froid en dés et le parmesan, puis mélange vivement 1 minute : le risotto devient crémeux et brillant. Couvre et laisse reposer 2 minutes.",
          "minuteurs": [
            {
              "secondes": 120,
              "label": "Repos"
            }
          ]
        },
        {
          "titre": "Le service",
          "texte": "Goûte et rectifie l'assaisonnement. Sers aussitôt dans des assiettes chaudes, parsemé de persil et des lamelles de champignons réservées : le risotto doit s'étaler doucement dans l'assiette."
        }
      ],
      "astuces": [
        "Garde le bouillon frémissant : un bouillon froid casserait la cuisson et rendrait le riz inégal.",
        "Fais dorer les champignons à feu vif et sans trop les serrer dans la poêle : entassés, ils rendent leur eau et bouillent au lieu de dorer.",
        "Pour une version strictement végétarienne, choisis un fromage à pâte dure fabriqué avec une présure non animale : le parmesan AOP est fait avec de la présure animale."
      ],
      "choix": {
        "titre": "Champignons & finitions",
        "mode": "multi",
        "label": "Ta composition",
        "options": [
          "Champignons de Paris",
          "Cèpes",
          "Pleurotes",
          "Girolles",
          "Persil plat",
          "Huile de truffe",
          "Copeaux de parmesan",
          "Poivre du moulin"
        ]
      },
      "accords": [
        {
          "titre": "Le classique",
          "texte": "champignons de Paris, persil plat et parmesan."
        },
        {
          "titre": "Le forestier",
          "texte": "un mélange de cèpes et de girolles bien dorés."
        },
        {
          "titre": "Le raffiné",
          "texte": "quelques gouttes d'huile de truffe au moment de servir."
        },
        {
          "titre": "Le plus complet",
          "texte": "une salade de roquette en accompagnement."
        }
      ],
      "conservation": "Le risotto est meilleur servi tout de suite. Les restes, mis au réfrigérateur rapidement après refroidissement, se consomment au plus tard le lendemain, bien réchauffés avec un peu de bouillon.",
      "allergenes": [
        "lait",
        "sulfites"
      ],
      "noteAllergenes": "Vérifie la composition de ton bouillon (il contient souvent du céleri).",
      "regime": {
        "sansViande": true,
        "sansPoisson": true
      },
      "origine": {
        "pays": "Italie (Lombardie)",
        "drapeau": "🇮🇹",
        "resume": "Le risotto, riz nacré puis cuit peu à peu dans le bouillon, est l'une des façons les plus courantes de cuisiner le riz en Italie.",
        "faits": [
          "On pense qu'il est né dans l'actuelle Lombardie, dans le nord de l'Italie, où les terres humides de la plaine du Pô se prêtaient à la culture du riz.",
          "La plus ancienne recette généralement identifiée comme un risotto date de 1809.",
          "Pour le risotto à la milanaise, au safran, circule la légende d'un apprenti verrier du chantier de la cathédrale de Milan ; on ne sait pas avec certitude qui l'a inventé."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Risotto",
            "url": "https://en.wikipedia.org/wiki/Risotto"
          },
          {
            "titre": "Google Arts & Culture — The Legend of Risotto alla Milanese",
            "url": "https://artsandculture.google.com/story/vAUxhRe9GVJFKA"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "currypoischiches",
      "url": "curry-pois-chiches.html",
      "titre": "Curry de pois chiches au lait de coco",
      "titreCourt": "Curry de pois chiches",
      "alias": [
        "curry",
        "curry de pois chiches",
        "curry vegetarien"
      ],
      "emoji": "🍛",
      "categorie": "plat",
      "badge": "Végétarien",
      "accroche": "Pois chiches fondants, épices dorées et lait de coco : un curry végétarien doux, parfumé et réconfortant.",
      "intro": "Un curry végétarien généreux, où les pois chiches mijotent dans une sauce tomate onctueuse au lait de coco. Le gingembre, les épices dorées et un trait de citron vert lui donnent du caractère, et tu règles le piquant comme tu l'aimes.",
      "images": [],
      "cover": {
        "motif": "cocotte",
        "fond": "#5a300c",
        "encre": "#f6efe4",
        "accent": "#f0a818"
      },
      "temps": {
        "preparation": 15,
        "cuisson": 35,
        "repos": 0
      },
      "difficulte": "Facile",
      "portions": {
        "base": 4,
        "unite": "personne",
        "pluriel": "personnes",
        "min": 1,
        "max": 12
      },
      "tags": [
        "vegetarien",
        "indien",
        "epice",
        "plat",
        "sale",
        "chaud",
        "mijote",
        "reconfort",
        "hiver",
        "equilibre",
        "healthy",
        "familial",
        "facile"
      ],
      "ingredients": [
        {
          "groupe": "Pour le curry",
          "items": [
            {
              "nom": "Huile neutre (tournesol, colza)",
              "qte": 2,
              "unite": "c. à soupe"
            },
            {
              "nom": "Oignon jaune",
              "qte": 1,
              "unite": "pièce"
            },
            {
              "nom": "Ail",
              "qte": 3,
              "unite": "gousse"
            },
            {
              "nom": "Gingembre frais",
              "qte": 20,
              "unite": "g"
            },
            {
              "nom": "Tomates concassées (en conserve)",
              "qte": 400,
              "unite": "g"
            },
            {
              "nom": "Lait de coco",
              "qte": 400,
              "unite": "ml"
            },
            {
              "nom": "Pois chiches cuits en conserve (poids égoutté)",
              "qte": 500,
              "unite": "g",
              "note": "environ 2 boîtes de 400 g"
            },
            {
              "nom": "Jeunes pousses d'épinards",
              "qte": 100,
              "unite": "g",
              "optionnel": true
            },
            {
              "nom": "Sel",
              "qte": null,
              "unite": "",
              "note": "selon le goût"
            }
          ]
        },
        {
          "groupe": "Pour les épices",
          "items": [
            {
              "nom": "Cumin en poudre",
              "qte": 1,
              "unite": "c. à café"
            },
            {
              "nom": "Coriandre en poudre",
              "qte": 2,
              "unite": "c. à café"
            },
            {
              "nom": "Curcuma en poudre",
              "qte": 1,
              "unite": "c. à café"
            },
            {
              "nom": "Piment de Cayenne",
              "qte": 2,
              "unite": "pincée",
              "optionnel": true
            },
            {
              "nom": "Garam masala",
              "qte": 1,
              "unite": "c. à café"
            }
          ]
        },
        {
          "groupe": "Pour servir",
          "items": [
            {
              "nom": "Riz basmati",
              "qte": 300,
              "unite": "g"
            },
            {
              "nom": "Citron vert",
              "qte": 1,
              "unite": "pièce"
            },
            {
              "nom": "Coriandre fraîche",
              "qte": 6,
              "unite": "brin",
              "optionnel": true
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "La mise en place",
          "texte": "Émince finement l'oignon, hache l'ail et râpe le gingembre pelé. Égoutte et rince les pois chiches, puis garde les épices à portée de main : elles cuisent très vite."
        },
        {
          "titre": "Dorer l'oignon",
          "texte": "Fais chauffer l'huile dans une cocotte ou une sauteuse à feu moyen. Fais revenir l'oignon environ 8 minutes en remuant, jusqu'à ce qu'il soit tendre et bien doré.",
          "minuteurs": [
            {
              "secondes": 480,
              "label": "Oignon doré"
            }
          ]
        },
        {
          "titre": "Ail, gingembre et épices",
          "texte": "Ajoute l'ail et le gingembre et remue 1 minute. Saupoudre le cumin, la coriandre en poudre, le curcuma et le piment de Cayenne si tu en mets, puis remue encore 1 minute : les épices doivent embaumer sans brûler.",
          "minuteurs": [
            {
              "secondes": 120,
              "label": "Ail, gingembre et épices"
            }
          ]
        },
        {
          "titre": "Les tomates",
          "texte": "Verse les tomates concassées, sale légèrement et laisse cuire 5 minutes à feu moyen en remuant, jusqu'à ce que la sauce épaississe un peu.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Sauce tomate"
            }
          ]
        },
        {
          "titre": "Coco et pois chiches",
          "texte": "Ajoute le lait de coco et les pois chiches, mélange et porte à frémissement. Laisse mijoter 15 minutes à feu doux en remuant de temps en temps pour que rien n'attache : la sauce doit devenir onctueuse et nappante.",
          "minuteurs": [
            {
              "secondes": 900,
              "label": "Mijotage"
            }
          ]
        },
        {
          "titre": "Le riz",
          "texte": "Pendant ce temps, rince le riz basmati jusqu'à ce que l'eau soit claire, puis cuis-le selon les indications du paquet. Égrène-le à la fourchette au moment de servir.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Riz basmati"
            }
          ]
        },
        {
          "titre": "Garam masala et épinards",
          "texte": "En fin de cuisson, ajoute le garam masala et les pousses d'épinards. Remue 1 à 2 minutes, juste le temps que les épinards tombent.",
          "minuteurs": [
            {
              "secondes": 120,
              "label": "Épinards"
            }
          ]
        },
        {
          "titre": "La finition",
          "texte": "Hors du feu, presse le citron vert sur le curry, goûte et rectifie le sel. Sers avec le riz et parsème de coriandre fraîche ciselée."
        }
      ],
      "astuces": [
        "Prends ton temps pour dorer l'oignon : c'est lui qui donne à la sauce sa profondeur et sa douceur.",
        "Pour une sauce plus épaisse, écrase une louche de pois chiches contre la paroi de la cocotte en fin de cuisson.",
        "Choisis un lait de coco entier plutôt qu'allégé : la sauce sera nettement plus onctueuse."
      ],
      "choix": {
        "titre": "Accompagnements",
        "mode": "single",
        "label": "Ton accompagnement",
        "options": [
          "Riz basmati",
          "Pain naan",
          "Chapati",
          "Raïta au concombre",
          "Chutney de mangue",
          "Coriandre fraîche",
          "Quartiers de citron vert",
          "Oignon rouge ciselé"
        ]
      },
      "accords": [
        {
          "titre": "Le classique",
          "texte": "riz basmati, coriandre fraîche et un quartier de citron vert."
        },
        {
          "titre": "Le gourmand",
          "texte": "un pain naan bien chaud pour saucer."
        },
        {
          "titre": "Le frais",
          "texte": "une raïta au concombre pour adoucir les épices."
        },
        {
          "titre": "Le relevé",
          "texte": "une pincée de piment en plus et un chutney de mangue."
        }
      ],
      "conservation": "Le curry se garde 2 à 3 jours au réfrigérateur dans une boîte hermétique ; réchauffe-le doucement avec un fond d'eau, car la sauce épaissit au froid. Mets le riz restant au frais rapidement et consomme-le dans les 24 h.",
      "allergenes": [],
      "noteAllergenes": "Certains mélanges d'épices (garam masala, curry) peuvent contenir de la moutarde ou du céleri : vérifie l'étiquette.",
      "regime": {
        "sansViande": true,
        "sansPoisson": true,
        "vegan": true
      },
      "origine": {
        "pays": "Inde (recette d'inspiration)",
        "drapeau": "🇮🇳",
        "resume": "Ce curry au lait de coco n'est pas un plat traditionnel précis : il s'inspire des currys de pois chiches très répandus dans le sous-continent indien.",
        "faits": [
          "Le chana masala, un curry de pois chiches à la sauce tomate, est un plat de base de la cuisine indienne, surtout dans le nord du pays, et de la cuisine pakistanaise.",
          "Au Kerala, dans le sud de l'Inde, le kadala curry associe des pois chiches noirs à une sauce à la noix de coco ; on le mange souvent au petit-déjeuner, avec du puttu ou des appams.",
          "L'Inde est de loin le premier producteur mondial de pois chiches."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Chana masala",
            "url": "https://en.wikipedia.org/wiki/Chana_masala"
          },
          {
            "titre": "Kerala Tourism — Puttu and Kadala Curry",
            "url": "https://www.keralatourism.org/kerala-food/puttu-kadala/43/"
          },
          {
            "titre": "Indian Healthy Recipes — Kadala Curry Recipe",
            "url": "https://www.indianhealthyrecipes.com/wprm_print/kadala-curry-recipe"
          },
          {
            "titre": "IUCN NL — Factsheet Chickpeas (2022)",
            "url": "https://www.iucn.nl/app/uploads/2022/10/Factsheet-Chickpeas_IUCN-NL-2022_Guide-for-value-chain-management-in-the-protein-transition.pdf"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "carbonara",
      "url": "carbonara.html",
      "titre": "Spaghetti alla carbonara",
      "titreCourt": "Spaghetti carbonara",
      "alias": [
        "carbonara",
        "spaghetti carbonara",
        "pates carbonara",
        "spaghetti alla carbonara"
      ],
      "emoji": "🍝",
      "categorie": "plat",
      "badge": "Sans crème",
      "accroche": "Guanciale croustillant, jaunes d'œufs, pecorino et poivre noir : la carbonara à l'italienne, sans crème.",
      "intro": "La carbonara telle qu'on la prépare en Italie : pas une goutte de crème, sa sauce soyeuse naît seulement des œufs, du pecorino et de l'eau de cuisson des pâtes. Peu d'ingrédients, mais un geste précis, hors du feu, pour obtenir une texture parfaite.",
      "images": [],
      "cover": {
        "motif": "assiette",
        "fond": "#26221f",
        "encre": "#f6efe4",
        "accent": "#f2c230"
      },
      "temps": {
        "preparation": 10,
        "cuisson": 20,
        "repos": 0
      },
      "difficulte": "Intermédiaire",
      "portions": {
        "base": 4,
        "unite": "personne",
        "pluriel": "personnes",
        "min": 1,
        "max": 12
      },
      "tags": [
        "italien",
        "viande",
        "plat",
        "sale",
        "chaud",
        "traditionnel",
        "rapide",
        "gourmand",
        "reconfort",
        "convivial",
        "familial",
        "simple",
        "hiver"
      ],
      "ingredients": [
        {
          "groupe": "Pour les pâtes",
          "items": [
            {
              "nom": "Spaghetti",
              "qte": 400,
              "unite": "g"
            },
            {
              "nom": "Gros sel (pour l'eau de cuisson)",
              "qte": null,
              "unite": "",
              "note": "modérément"
            }
          ]
        },
        {
          "groupe": "Pour la sauce",
          "items": [
            {
              "nom": "Guanciale (joue de porc séchée)",
              "qte": 150,
              "unite": "g"
            },
            {
              "nom": "Jaunes d'œufs très frais",
              "qte": 4,
              "unite": "pièce"
            },
            {
              "nom": "Œuf entier très frais",
              "qte": 1,
              "unite": "pièce"
            },
            {
              "nom": "Pecorino romano finement râpé",
              "qte": 80,
              "unite": "g"
            },
            {
              "nom": "Poivre noir du moulin",
              "qte": null,
              "unite": "",
              "note": "généreusement"
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "L'eau des pâtes",
          "texte": "Porte à ébullition une grande casserole d'eau et sale-la modérément au gros sel : le guanciale et le pecorino sont déjà bien salés."
        },
        {
          "titre": "Le guanciale",
          "texte": "Retire la couenne du guanciale et coupe-le en petits lardons. Fais-le revenir sans matière grasse dans une grande poêle à feu moyen, 8 à 10 minutes, jusqu'à ce qu'il soit doré et que son gras ait fondu, puis coupe le feu.",
          "minuteurs": [
            {
              "secondes": 540,
              "label": "Guanciale"
            }
          ]
        },
        {
          "titre": "La crème d'œufs",
          "texte": "Dans un saladier, fouette les jaunes et l'œuf entier avec les trois quarts du pecorino et beaucoup de poivre fraîchement moulu. Tu dois obtenir une crème épaisse, presque une pâte."
        },
        {
          "titre": "Les spaghetti",
          "texte": "Plonge les spaghetti dans l'eau bouillante et cuis-les 1 minute de moins que le temps indiqué sur le paquet. Avant de les égoutter, mets de côté une grande tasse d'eau de cuisson.",
          "minuteurs": [
            {
              "secondes": 540,
              "label": "Spaghetti"
            }
          ]
        },
        {
          "titre": "Dans la poêle",
          "texte": "Remets la poêle du guanciale à feu doux, ajoute les spaghetti égouttés et une petite louche d'eau de cuisson. Mélange 1 minute pour bien les enrober de gras, puis retire la poêle du feu.",
          "minuteurs": [
            {
              "secondes": 60,
              "label": "Enrobage"
            }
          ]
        },
        {
          "titre": "La liaison",
          "texte": "Délaie la crème d'œufs avec 2 cuillères à soupe d'eau de cuisson chaude, puis verse-la sur les pâtes, toujours hors du feu. Mélange vivement : la chaleur des pâtes épaissit les œufs en une sauce crémeuse, sans les transformer en omelette."
        },
        {
          "titre": "Ajuster la texture",
          "texte": "Si la sauce est trop épaisse, ajoute un peu d'eau de cuisson. Si elle reste trop liquide, remets la poêle quelques secondes sur feu très doux en remuant sans arrêt, et retire-la dès que la sauce nappe les pâtes."
        },
        {
          "titre": "Le service",
          "texte": "Sers aussitôt dans des assiettes chaudes, parsème du reste de pecorino et donne un dernier tour de moulin à poivre."
        }
      ],
      "astuces": [
        "Ne mets jamais les œufs sur un feu vif : c'est la chaleur des pâtes, hors du feu, qui doit les épaissir. Trop chauffés, ils coagulent en grumeaux.",
        "Garde plus d'eau de cuisson que nécessaire : chargée d'amidon, elle aide à lier la sauce et à la rendre crémeuse.",
        "Sans guanciale, la pancetta est le remplaçant le plus proche. Pour un goût plus doux, mélange moitié pecorino, moitié parmesan."
      ],
      "securite": "Les œufs de la carbonara ne sont pas cuits à cœur : ils épaississent seulement à la chaleur des pâtes. Utilise des œufs très frais, gardés au réfrigérateur, et sers le plat aussitôt. Les œufs crus ou peu cuits sont déconseillés aux personnes fragiles (femmes enceintes, jeunes enfants, personnes âgées ou immunodéprimées) : pour elles, utilise des œufs pasteurisés (vérifie l'étiquette) ou choisis une autre recette de pâtes.",
      "sourcesSecurite": [
        {
          "titre": "Institut Pasteur — Salmonellose (prévention)",
          "url": "https://www.pasteur.fr/fr/centre-medical/fiches-maladies/salmonellose"
        },
        {
          "titre": "Institut Pasteur, CNR des salmonelles — la maladie et les recommandations",
          "url": "https://www.pasteur.fr/fr/sante-publique/CNR/les-cnr/escherichia-coli-shigella-salmonella/la-maladie-recommandations"
        }
      ],
      "choix": {
        "titre": "Variantes & accompagnements",
        "mode": "single",
        "label": "Ta variante",
        "options": [
          "Guanciale",
          "Pancetta",
          "Pecorino romano",
          "Pecorino et parmesan",
          "Rigatoni",
          "Mezze maniche",
          "Poivre concassé",
          "Salade verte"
        ]
      },
      "accords": [
        {
          "titre": "La romaine",
          "texte": "guanciale, pecorino romano et poivre noir en abondance."
        },
        {
          "titre": "La plus douce",
          "texte": "moitié pecorino, moitié parmesan."
        },
        {
          "titre": "En pâtes courtes",
          "texte": "des rigatoni, qui retiennent bien la sauce."
        },
        {
          "titre": "Le repas complet",
          "texte": "une salade verte bien croquante à côté."
        }
      ],
      "conservation": "À déguster tout de suite : la sauce aux œufs peu cuits ne se conserve pas et devient granuleuse au réchauffage. Prépare seulement la quantité nécessaire.",
      "allergenes": [
        "gluten",
        "oeufs",
        "lait"
      ],
      "regime": {
        "sansViande": false,
        "sansPoisson": true
      },
      "origine": {
        "pays": "Italie (Rome)",
        "drapeau": "🇮🇹",
        "resume": "Un grand classique de la cuisine romaine, dont l'origine exacte reste débattue.",
        "faits": [
          "Le nom « carbonara » apparaît pour la première fois dans la presse en 1950 : le quotidien italien La Stampa le cite comme un plat romain recherché par des officiers américains.",
          "La plus ancienne recette publiée connue date de 1952, dans un guide des restaurants d'un quartier de Chicago ; la première recette italienne paraît en 1954 dans la revue La Cucina Italiana, avec de la pancetta, du gruyère et de l'ail.",
          "L'historien de la cuisine Luca Cesari situe sa naissance à Rome vers 1944, peut-être grâce au bacon apporté par les troupes américaines ; d'autres hypothèses existent et aucune n'est prouvée."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Carbonara",
            "url": "https://en.wikipedia.org/wiki/Carbonara"
          },
          {
            "titre": "Ricette Storiche — Carbonara: history, origins and anecdotes of a legendary recipe",
            "url": "https://www.ricettestoriche.it/2019/04/07/carbonara-history-origins-and-anecdotes-of-a-legendary-recipe/"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "shakshuka",
      "url": "shakshuka.html",
      "titre": "Shakshuka, œufs pochés à la sauce tomate épicée",
      "titreCourt": "Shakshuka épicée",
      "alias": [
        "shakshuka",
        "chakchouka",
        "oeufs a la tomate"
      ],
      "emoji": "🍳",
      "categorie": "brunch",
      "badge": "À partager",
      "accroche": "Des œufs pochés dans une sauce tomate aux poivrons, au cumin et au paprika, servis dans la poêle avec du pain.",
      "intro": "Un plat du Maghreb à partager : une sauce tomate aux poivrons, parfumée au cumin et au paprika, dans laquelle les œufs pochent doucement. On pose la poêle au milieu de la table et chacun sauce avec son pain.",
      "images": [],
      "cover": {
        "motif": "poele",
        "fond": "#5c1a12",
        "encre": "#f6efe4",
        "accent": "#e85a3c"
      },
      "temps": {
        "preparation": 10,
        "cuisson": 30,
        "repos": 0
      },
      "difficulte": "Facile",
      "portions": {
        "base": 4,
        "unite": "personne",
        "pluriel": "personnes",
        "min": 1,
        "max": 12
      },
      "tags": [
        "brunch",
        "vegetarien",
        "epice",
        "sale",
        "chaud",
        "convivial",
        "matin",
        "invite",
        "simple",
        "facile",
        "equilibre"
      ],
      "ingredients": [
        {
          "groupe": "Pour la sauce",
          "items": [
            {
              "nom": "Huile d'olive",
              "qte": 3,
              "unite": "c. à soupe"
            },
            {
              "nom": "Oignon jaune",
              "qte": 1,
              "unite": "pièce"
            },
            {
              "nom": "Poivrons rouges",
              "qte": 2,
              "unite": "pièce"
            },
            {
              "nom": "Ail",
              "qte": 3,
              "unite": "gousse"
            },
            {
              "nom": "Cumin en poudre",
              "qte": 1,
              "unite": "c. à café"
            },
            {
              "nom": "Paprika doux",
              "qte": 2,
              "unite": "c. à café"
            },
            {
              "nom": "Harissa",
              "qte": 1,
              "unite": "c. à café"
            },
            {
              "nom": "Tomates pelées concassées (en conserve)",
              "qte": 800,
              "unite": "g"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 1,
              "unite": "pincée",
              "fixe": true,
              "optionnel": true
            },
            {
              "nom": "Sel et poivre",
              "qte": null,
              "unite": "",
              "note": "selon le goût"
            }
          ]
        },
        {
          "groupe": "Pour les œufs et la finition",
          "items": [
            {
              "nom": "Œufs",
              "qte": 8,
              "unite": "pièce"
            },
            {
              "nom": "Feta",
              "qte": 100,
              "unite": "g",
              "optionnel": true
            },
            {
              "nom": "Coriandre ou persil plat frais",
              "qte": 6,
              "unite": "brin",
              "optionnel": true
            },
            {
              "nom": "Pain pita ou pain de campagne",
              "qte": 4,
              "unite": "portion"
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "La mise en place",
          "texte": "Émince l'oignon, épépine les poivrons et coupe-les en fines lanières, puis hache l'ail."
        },
        {
          "titre": "Oignon et poivrons",
          "texte": "Fais chauffer l'huile d'olive à feu moyen dans une grande poêle à bords hauts (28 à 30 cm). Fais revenir l'oignon et les poivrons environ 10 minutes en remuant, jusqu'à ce qu'ils soient tendres et légèrement dorés.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Oignon et poivrons"
            }
          ]
        },
        {
          "titre": "Ail et épices",
          "texte": "Ajoute l'ail, le cumin, le paprika et la harissa (moins si tu crains le piquant). Remue 1 minute pour réveiller les épices, sans les laisser brûler.",
          "minuteurs": [
            {
              "secondes": 60,
              "label": "Épices"
            }
          ]
        },
        {
          "titre": "La sauce tomate",
          "texte": "Verse les tomates concassées, ajoute la pincée de sucre si tu le souhaites (elle adoucit l'acidité), sale et poivre. Laisse mijoter 10 à 15 minutes à feu moyen-doux en remuant de temps en temps, jusqu'à ce que la sauce soit bien épaisse.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Sauce épaissie"
            },
            {
              "secondes": 900,
              "label": "Sauce bien réduite"
            }
          ]
        },
        {
          "titre": "Les puits",
          "texte": "Goûte la sauce et rectifie l'assaisonnement. Creuse un petit puits par œuf avec le dos d'une cuillère, casse un œuf dans chacun et sale légèrement les blancs."
        },
        {
          "titre": "Pocher les œufs",
          "texte": "Couvre et laisse cuire à feu doux 5 à 8 minutes, jusqu'à ce que les blancs soient pris et les jaunes encore coulants. Pour des jaunes bien pris, prolonge la cuisson jusqu'à ce qu'ils soient fermes au toucher.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Vérifier les blancs"
            },
            {
              "secondes": 480,
              "label": "Blancs bien pris"
            }
          ]
        },
        {
          "titre": "La finition",
          "texte": "Hors du feu, parsème de feta émiettée et de coriandre ou de persil ciselés, puis donne un tour de moulin à poivre."
        },
        {
          "titre": "Le service",
          "texte": "Pose la poêle au centre de la table et sers aussitôt, avec le pain pour saucer."
        }
      ],
      "astuces": [
        "Attends que la sauce ait bien épaissi avant d'ajouter les œufs : trop liquide, elle ne les retient pas et ils s'étalent.",
        "Casse chaque œuf dans un petit bol avant de le faire glisser dans son puits : c'est plus précis et tu évites les éclats de coquille.",
        "Retire la poêle du feu un peu avant la cuisson voulue : la chaleur de la sauce continue de cuire les jaunes."
      ],
      "securite": NOTE_JAUNE_COULANT,
      "sourcesSecurite": [
        {
          "titre": "Institut Pasteur — Salmonellose (prévention)",
          "url": "https://www.pasteur.fr/fr/centre-medical/fiches-maladies/salmonellose"
        },
        {
          "titre": "Institut Pasteur, CNR des salmonelles — la maladie et les recommandations",
          "url": "https://www.pasteur.fr/fr/sante-publique/CNR/les-cnr/escherichia-coli-shigella-salmonella/la-maladie-recommandations"
        }
      ],
      "choix": {
        "titre": "Garnitures au choix",
        "mode": "multi",
        "label": "Ta shakshuka",
        "options": [
          "Feta émiettée",
          "Coriandre fraîche",
          "Persil plat",
          "Harissa en plus",
          "Épinards",
          "Merguez grillées",
          "Yaourt à l'ail",
          "Pain pita"
        ]
      },
      "accords": [
        {
          "titre": "La classique",
          "texte": "œufs coulants, coriandre et pain pour saucer."
        },
        {
          "titre": "La gourmande",
          "texte": "feta émiettée et un filet d'huile d'olive."
        },
        {
          "titre": "La relevée",
          "texte": "une cuillère de harissa en plus dans la sauce."
        },
        {
          "titre": "La verte",
          "texte": "une poignée d'épinards ajoutée à la sauce avant les œufs."
        }
      ],
      "conservation": "À déguster tout de suite : les œufs pochés se réchauffent mal. La sauce tomate seule se prépare à l'avance et se garde 2 à 3 jours au réfrigérateur ; réchauffe-la bien avant d'y cuire les œufs.",
      "allergenes": [
        "oeufs",
        "lait",
        "gluten"
      ],
      "noteAllergenes": "La feta (lait) est facultative et le gluten vient du pain : choisis un pain sans gluten si besoin.",
      "regime": {
        "sansViande": true,
        "sansPoisson": true
      },
      "origine": {
        "pays": "Maghreb (origine disputée)",
        "drapeau": "🌍",
        "resume": "Un plat d'œufs pochés dans une sauce tomate aux poivrons, typique du Maghreb, dont le pays d'origine exact reste débattu.",
        "faits": [
          "Son nom vient de l'arabe maghrébin et signifie « mélange ».",
          "La tomate et le poivron, venus des Amériques, ne sont arrivés dans la région qu'au XVIe siècle : le plat tel qu'on le connaît est donc plus récent. Son pays d'origine reste disputé, entre la Tunisie, la Libye, le Maroc, l'Égypte, la Turquie et le Yémen.",
          "Des juifs originaires du Maghreb l'ont apporté en Israël à partir des années 1950, où il est devenu très populaire."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Shakshouka",
            "url": "https://en.wikipedia.org/wiki/Shakshouka"
          },
          {
            "titre": "Encyclopædia Britannica — Shakshouka",
            "url": "https://www.britannica.com/topic/shakshouka"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "pancakes",
      "url": "pancakes.html",
      "titre": "Pancakes moelleux à l'américaine",
      "titreCourt": "Pancakes moelleux",
      "alias": [
        "pancake",
        "pancakes"
      ],
      "emoji": "🥞",
      "categorie": "brunch",
      "badge": "Brunch gourmand",
      "accroche": "Épais, dorés et tout moelleux : la pile de pancakes du dimanche matin, nappée de sirop d'érable.",
      "intro": "Des pancakes épais et aériens, comme on les sert en Amérique du Nord au petit-déjeuner, grâce à la levure chimique qui les fait gonfler dans la poêle. Compte 12 à 14 pancakes, à empiler et à garnir selon les envies de chacun.",
      "images": [],
      "cover": {
        "motif": "assiette",
        "fond": "#4a2a18",
        "encre": "#f6efe4",
        "accent": "#e9a93b"
      },
      "temps": {
        "preparation": 10,
        "cuisson": 20,
        "repos": 10
      },
      "difficulte": "Facile",
      "portions": {
        "base": 4,
        "unite": "personne",
        "pluriel": "personnes",
        "min": 1,
        "max": 16
      },
      "tags": [
        "brunch",
        "matin",
        "sucre",
        "gouter",
        "americain",
        "familial",
        "enfant",
        "gourmand",
        "convivial",
        "dimanche",
        "facile",
        "simple",
        "chaud"
      ],
      "ingredients": [
        {
          "groupe": "Pour la pâte",
          "items": [
            {
              "nom": "Farine de blé (type 45 ou 55)",
              "qte": 250,
              "unite": "g"
            },
            {
              "nom": "Levure chimique",
              "qte": 1,
              "unite": "sachet"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 30,
              "unite": "g"
            },
            {
              "nom": "Sel fin",
              "qte": 1,
              "unite": "pincée",
              "fixe": true
            },
            {
              "nom": "Œufs",
              "qte": 2,
              "unite": "pièce"
            },
            {
              "nom": "Lait demi-écrémé",
              "qte": 300,
              "unite": "ml"
            },
            {
              "nom": "Beurre doux",
              "qte": 50,
              "unite": "g"
            },
            {
              "nom": "Extrait de vanille",
              "qte": 1,
              "unite": "c. à café",
              "optionnel": true
            }
          ]
        },
        {
          "groupe": "Pour la cuisson",
          "items": [
            {
              "nom": "Beurre ou huile pour la poêle",
              "qte": null,
              "unite": "",
              "note": "un peu"
            }
          ]
        },
        {
          "groupe": "Pour servir",
          "items": [
            {
              "nom": "Sirop d'érable",
              "qte": 4,
              "unite": "c. à soupe"
            },
            {
              "nom": "Fruits rouges",
              "qte": 150,
              "unite": "g",
              "optionnel": true
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Le beurre",
          "texte": "Fais fondre le beurre doucement, à la casserole ou au micro-ondes, puis laisse-le tiédir quelques minutes."
        },
        {
          "titre": "Les ingrédients secs",
          "texte": "Dans un grand saladier, mélange la farine, la levure chimique, le sucre et le sel."
        },
        {
          "titre": "Les ingrédients liquides",
          "texte": "Dans un autre récipient, fouette les œufs avec le lait, la vanille et le beurre fondu tiédi."
        },
        {
          "titre": "Le mélange",
          "texte": "Verse les liquides sur les ingrédients secs et mélange au fouet, juste assez pour qu'il ne reste plus de farine sèche. Quelques petits grumeaux sont normaux : une pâte trop travaillée donne des pancakes plus denses."
        },
        {
          "titre": "Le repos",
          "texte": "Laisse reposer la pâte 10 minutes à température ambiante pendant que tu prépares la poêle. Elle va légèrement épaissir.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Repos de la pâte"
            }
          ]
        },
        {
          "titre": "La poêle",
          "texte": "Fais chauffer une poêle antiadhésive à feu moyen et graisse-la très légèrement avec un papier absorbant beurré ou huilé. Trop chaude, elle brûlerait l'extérieur avant que le centre ne cuise."
        },
        {
          "titre": "Première face",
          "texte": "Verse une petite louche de pâte par pancake, sans l'étaler. Laisse cuire environ 2 minutes, jusqu'à ce que des bulles apparaissent en surface et que les bords paraissent secs.",
          "minuteurs": [
            {
              "secondes": 120,
              "label": "Première face"
            }
          ]
        },
        {
          "titre": "Seconde face",
          "texte": "Retourne le pancake d'un coup de spatule et laisse dorer encore 1 minute environ. Garde les pancakes au chaud sous un torchon pendant que tu cuis le reste de la pâte.",
          "minuteurs": [
            {
              "secondes": 60,
              "label": "Seconde face"
            }
          ]
        },
        {
          "titre": "Le service",
          "texte": "Empile les pancakes et sers-les chauds, nappés de sirop d'érable et parsemés de fruits rouges si tu en as."
        }
      ],
      "astuces": [
        "Pour des pancakes encore plus aériens, sépare les blancs des jaunes et incorpore délicatement les blancs montés en neige juste avant la cuisson.",
        "Retourne le pancake quand les bulles éclatent en surface sans se refermer : la première face est alors bien prise.",
        "La première fournée sert de test : elle permet de régler le feu pour que les pancakes dorent sans brûler."
      ],
      "choix": {
        "titre": "Garnitures au choix",
        "mode": "multi",
        "label": "Ta pile de pancakes",
        "options": [
          "Sirop d'érable",
          "Fruits rouges",
          "Myrtilles",
          "Banane en rondelles",
          "Noisette de beurre",
          "Pâte à tartiner",
          "Crème fouettée",
          "Bacon grillé"
        ]
      },
      "accords": [
        {
          "titre": "La classique",
          "texte": "une noisette de beurre et un filet de sirop d'érable."
        },
        {
          "titre": "La fruitée",
          "texte": "myrtilles, fraises et une cuillère de yaourt."
        },
        {
          "titre": "La gourmande",
          "texte": "rondelles de banane et pâte à tartiner."
        },
        {
          "titre": "La sucrée-salée",
          "texte": "bacon grillé et un filet de sirop d'érable."
        }
      ],
      "conservation": "Les pancakes se gardent 2 jours au réfrigérateur, bien emballés : réchauffe-les quelques secondes au grille-pain ou à la poêle. Ils se congèlent aussi, séparés par du papier cuisson.",
      "allergenes": [
        "gluten",
        "oeufs",
        "lait"
      ],
      "regime": {
        "sansViande": true,
        "sansPoisson": true
      },
      "origine": {
        "pays": "Amérique du Nord (racines antiques)",
        "drapeau": "🌎",
        "resume": "Le pancake épais et moelleux est la version nord-américaine d'une galette cuite sur une surface chaude, connue depuis l'Antiquité.",
        "faits": [
          "Parmi les plus anciennes mentions écrites connues figurent celles des poètes comiques grecs Cratinos et Magnès, au Ve siècle av. J.-C. : ils évoquent des galettes cuites à la poêle.",
          "En Angleterre, les pancakes sont souvent sans levure et fins, proches de la crêpe ; en Amérique du Nord, on ajoute un agent levant, le plus souvent de la levure chimique, qui les rend épais et moelleux.",
          "Aux États-Unis et au Canada, on les appelle aussi « flapjacks » ; au Royaume-Uni, ce mot désigne tout autre chose : une barre aux flocons d'avoine cuite au four."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Ancient Greek cuisine",
            "url": "https://en.wikipedia.org/wiki/Ancient_Greek_cuisine"
          },
          {
            "titre": "Smithsonian Magazine — A Brief History of Pancakes",
            "url": "https://www.smithsonianmag.com/history/a-brief-history-of-pancakes-180981667/"
          },
          {
            "titre": "Wikipédia (en) — Pancake",
            "url": "https://en.wikipedia.org/wiki/Pancake"
          },
          {
            "titre": "Wikipédia (en) — Flapjack (oat bar)",
            "url": "https://en.wikipedia.org/wiki/Flapjack_(oat_bar)"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "tartetatin",
      "url": "tarte-tatin.html",
      "titre": "Tarte Tatin aux pommes caramélisées",
      "titreCourt": "Tarte Tatin",
      "alias": [
        "tatin",
        "tarte tatin",
        "tarte aux pommes"
      ],
      "emoji": "🍎",
      "categorie": "dessert",
      "badge": "Grand classique",
      "accroche": "Pommes confites dans un caramel au beurre, pâte croustillante : la tarte qu'on cuit à l'envers.",
      "intro": "Une tarte renversée où les pommes cuisent longuement dans un caramel au beurre avant d'être recouvertes de pâte. Une fois retournée, elle dévoile des fruits dorés et brillants, à savourer tiède avec une cuillerée de crème fraîche.",
      "images": [],
      "cover": {
        "motif": "tarte",
        "fond": "#5a1e10",
        "encre": "#f6efe4",
        "accent": "#e8892c"
      },
      "temps": {
        "preparation": 30,
        "cuisson": 50,
        "repos": 40
      },
      "difficulte": "Intermédiaire",
      "portions": {
        "base": 8,
        "unite": "part",
        "pluriel": "parts",
        "min": 4,
        "max": 16,
        "pas": 2
      },
      "tags": [
        "dessert",
        "francais",
        "traditionnel",
        "sucre",
        "gourmand",
        "four",
        "familial",
        "dimanche",
        "invite",
        "fete",
        "hiver",
        "reconfort"
      ],
      "ingredients": [
        {
          "groupe": "Pour la pâte brisée",
          "items": [
            {
              "nom": "Farine de blé",
              "qte": 200,
              "unite": "g"
            },
            {
              "nom": "Beurre doux bien froid",
              "qte": 100,
              "unite": "g"
            },
            {
              "nom": "Eau très froide",
              "qte": 50,
              "unite": "ml"
            },
            {
              "nom": "Sel fin",
              "qte": 1,
              "unite": "pincée",
              "fixe": true
            }
          ]
        },
        {
          "groupe": "Pour les pommes caramélisées",
          "items": [
            {
              "nom": "Pommes qui se tiennent à la cuisson (reine des reinettes, golden)",
              "qte": 1500,
              "unite": "g"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 120,
              "unite": "g"
            },
            {
              "nom": "Beurre demi-sel",
              "qte": 80,
              "unite": "g"
            }
          ]
        },
        {
          "groupe": "Pour servir",
          "items": [
            {
              "nom": "Crème fraîche épaisse",
              "qte": 200,
              "unite": "g",
              "optionnel": true
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "La pâte brisée",
          "texte": "Mélange la farine et le sel, ajoute le beurre froid coupé en dés et sable du bout des doigts jusqu'à obtenir une texture de chapelure. Verse l'eau froide petit à petit et rassemble la pâte en boule sans la pétrir. Filme-la et laisse-la reposer 30 minutes au réfrigérateur.",
          "minuteurs": [
            {
              "secondes": 1800,
              "label": "Repos de la pâte"
            }
          ]
        },
        {
          "titre": "Les pommes",
          "texte": "Épluche les pommes, retire le cœur et coupe-les en quartiers. Préchauffe le four à 200 °C."
        },
        {
          "titre": "Le caramel",
          "texte": "Dans un moule à tatin en métal ou une poêle allant au four d'environ 24 cm (pour 8 parts), fais fondre le sucre à sec à feu moyen, sans remuer, en inclinant doucement le moule. Dès que le caramel est blond ambré, retire du feu et ajoute le beurre demi-sel en morceaux en mélangeant : attention aux projections brûlantes."
        },
        {
          "titre": "Ranger les pommes",
          "texte": "Dispose les quartiers de pommes debout, bien serrés les uns contre les autres, en rosace sur le caramel, en faisant attention à ne pas te brûler. Serre-les au maximum : ils perdent beaucoup de volume à la cuisson."
        },
        {
          "titre": "La précuisson",
          "texte": "Remets le moule sur feu doux à moyen et laisse cuire environ 15 minutes, sans remuer. Les pommes commencent à fondre et s'imprègnent du caramel.",
          "minuteurs": [
            {
              "secondes": 900,
              "label": "Précuisson des pommes"
            }
          ]
        },
        {
          "titre": "Couvrir de pâte",
          "texte": "Étale la pâte sur le plan de travail légèrement fariné, en un disque un peu plus grand que le moule. Pose-la sur les pommes, rentre les bords à l'intérieur du moule contre les fruits et pique-la quelques fois pour laisser s'échapper la vapeur."
        },
        {
          "titre": "La cuisson au four",
          "texte": "Enfourne pour environ 30 minutes, jusqu'à ce que la pâte soit bien dorée et que le caramel bouillonne sur les bords. Pique une pomme à travers la pâte avec la pointe d'un couteau : elle doit être tendre.",
          "minuteurs": [
            {
              "secondes": 1800,
              "label": "Cuisson au four"
            }
          ]
        },
        {
          "titre": "Le démoulage",
          "texte": "Laisse reposer 10 minutes, pas beaucoup plus, sinon le caramel durcit et colle. Pose un plat de service sur le moule et retourne le tout d'un geste franc, avec des gants : le caramel est brûlant. Remets en place les morceaux de pomme restés dans le moule.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Avant démoulage"
            }
          ]
        },
        {
          "titre": "Le service",
          "texte": "Sers la tarte tiède, accompagnée d'une cuillerée de crème fraîche épaisse. Le contraste du chaud et du froid fait tout son charme."
        }
      ],
      "astuces": [
        "Choisis des pommes qui se tiennent à la cuisson, comme la reine des reinettes ou la golden : les variétés trop fondantes tournent en compote.",
        "Si la tarte a trop refroidi et que le caramel colle, remets le moule une minute ou deux sur feu doux avant de la retourner.",
        "Une pâte feuilletée du commerce remplace très bien la pâte brisée : surveille simplement la coloration au four."
      ],
      "choix": {
        "titre": "Accompagnements et variantes",
        "mode": "single",
        "label": "Ton choix",
        "options": [
          "Crème fraîche épaisse",
          "Glace vanille",
          "Crème fouettée",
          "Pointe de cannelle",
          "Gousse de vanille",
          "Fleur de sel",
          "Version aux poires"
        ]
      },
      "accords": [
        {
          "titre": "La traditionnelle",
          "texte": "tiède, avec une cuillerée de crème fraîche épaisse."
        },
        {
          "titre": "La gourmande",
          "texte": "une boule de glace vanille qui fond sur le caramel."
        },
        {
          "titre": "L'épicée",
          "texte": "une pointe de cannelle sur les pommes avant de poser la pâte."
        },
        {
          "titre": "La salée-sucrée",
          "texte": "quelques grains de fleur de sel sur le caramel."
        }
      ],
      "conservation": "Elle est meilleure le jour même. Elle se garde jusqu'à 2 jours au réfrigérateur, couverte : réchauffe-la quelques minutes au four doux pour assouplir le caramel.",
      "allergenes": [
        "gluten",
        "lait"
      ],
      "regime": {
        "sansViande": true,
        "sansPoisson": true
      },
      "origine": {
        "pays": "France (Sologne)",
        "drapeau": "🇫🇷",
        "resume": "Une tarte aux pommes caramélisées cuite à l'envers, liée aux sœurs Tatin et à leur hôtel de Lamotte-Beuvron.",
        "faits": [
          "Elle porte le nom de Stéphanie et Caroline Tatin, deux sœurs qui tenaient un hôtel à Lamotte-Beuvron, en Sologne, où elle était servie.",
          "Le récit de la tarte ratée puis retournée par accident relève en grande partie de la légende : historiens et gastronomes débattent encore pour savoir s'il s'agit d'une vraie création des sœurs ou d'une version améliorée de la tarte solognote, une recette traditionnelle de la région.",
          "Le gastronome Curnonsky a largement contribué à sa célébrité : il l'a présentée en 1926 dans « La France gastronomique »."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Tarte Tatin",
            "url": "https://en.wikipedia.org/wiki/Tarte_Tatin"
          },
          {
            "titre": "Slate — La vraie recette de la tarte Tatin",
            "url": "https://www.slate.fr/story/93575/vraie-recette-tarte-tatin"
          },
          {
            "titre": "Académie de Versailles (hôtellerie-restauration) — fiche tarte Tatin",
            "url": "https://www.hotellerie-restauration.ac-versailles.fr/IMG/pdf/tarte_tatin.pdf"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "mousseauchocolat",
      "url": "mousse-au-chocolat.html",
      "titre": "Mousse au chocolat aérienne",
      "titreCourt": "Mousse au chocolat",
      "alias": [
        "mousse",
        "mousse au chocolat"
      ],
      "emoji": "🍫",
      "categorie": "dessert",
      "badge": "Indémodable",
      "accroche": "Du bon chocolat noir, des œufs et une pincée de sel : la mousse légère et intense des grands classiques.",
      "intro": "Le dessert au chocolat par excellence, léger comme un nuage et pourtant intense en goût. Peu d'ingrédients, mais un geste à soigner : incorporer les blancs en neige sans les casser.",
      "images": [],
      "cover": {
        "motif": "ramequin",
        "fond": "#2b1711",
        "encre": "#f6efe4",
        "accent": "#c27a45"
      },
      "temps": {
        "preparation": 20,
        "cuisson": 5,
        "repos": 240
      },
      "difficulte": "Facile",
      "portions": {
        "base": 6,
        "unite": "personne",
        "pluriel": "personnes",
        "min": 2,
        "max": 12
      },
      "tags": [
        "dessert",
        "chocolat",
        "francais",
        "traditionnel",
        "gourmand",
        "sucre",
        "froid",
        "familial",
        "fete",
        "invite",
        "simple",
        "facile"
      ],
      "ingredients": [
        {
          "groupe": "Pour la mousse",
          "items": [
            {
              "nom": "Chocolat noir pâtissier (60 à 70 % de cacao)",
              "qte": 200,
              "unite": "g"
            },
            {
              "nom": "Œufs extra-frais",
              "qte": 6,
              "unite": "pièce"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 30,
              "unite": "g"
            },
            {
              "nom": "Beurre doux",
              "qte": 30,
              "unite": "g",
              "optionnel": true
            },
            {
              "nom": "Sel fin",
              "qte": 1,
              "unite": "pincée",
              "fixe": true
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Fondre le chocolat",
          "texte": "Casse le chocolat en morceaux et fais-le fondre doucement au bain-marie, avec le beurre si tu en mets, en remuant. Retire du feu dès qu'il est lisse et laisse-le tiédir quelques minutes : il ne doit pas être brûlant."
        },
        {
          "titre": "Séparer les œufs",
          "texte": "Sépare les blancs des jaunes avec soin : la moindre trace de jaune empêche les blancs de monter. Mets les blancs dans un grand saladier bien propre et sec."
        },
        {
          "titre": "Les jaunes",
          "texte": "Incorpore les jaunes un à un au chocolat tiède en fouettant vivement. Le mélange doit rester lisse et brillant."
        },
        {
          "titre": "Les blancs en neige",
          "texte": "Ajoute la pincée de sel aux blancs et commence à les fouetter. Quand ils deviennent mousseux, verse le sucre en pluie et continue jusqu'à obtenir des blancs fermes et brillants."
        },
        {
          "titre": "Détendre le chocolat",
          "texte": "Incorpore d'abord environ un tiers des blancs au chocolat en mélangeant franchement. Cela assouplit le mélange et facilite la suite."
        },
        {
          "titre": "Incorporer délicatement",
          "texte": "Ajoute le reste des blancs et incorpore-les à la maryse, en soulevant la masse du fond vers le haut tout en tournant le saladier. Arrête dès qu'il ne reste plus de traces blanches."
        },
        {
          "titre": "La prise au frais",
          "texte": "Répartis la mousse dans des verrines ou un grand saladier, filme et place au réfrigérateur au moins 4 heures. Elle est encore meilleure après une nuit au frais.",
          "minuteurs": [
            {
              "secondes": 14400,
              "label": "Prise au réfrigérateur"
            }
          ]
        }
      ],
      "astuces": [
        "Le chocolat doit être tiède au moment d'ajouter les blancs : trop chaud, il les fait retomber ; trop froid, il fige en petits grains.",
        "Fouette les blancs dans un saladier parfaitement propre et sec : une trace de gras ou de jaune les empêche de monter.",
        "Incorpore les blancs à la maryse, jamais au fouet électrique : c'est l'air qu'ils contiennent qui donne toute sa légèreté à la mousse."
      ],
      "securite": "La mousse contient des œufs crus : utilise des œufs extra-frais, garde-la au réfrigérateur et consomme-la dans les 24 heures. Les œufs crus sont déconseillés aux personnes fragiles (femmes enceintes, jeunes enfants, personnes âgées ou immunodéprimées) : pour elles, choisis plutôt un dessert sans œufs crus, ou des œufs pasteurisés (vérifie l'étiquette).",
      "sourcesSecurite": [
        {
          "titre": "Anses — Qu'est-ce que la salmonellose et comment s'en prémunir ?",
          "url": "https://www.anses.fr/fr/content/quest-ce-que-la-salmonellose-et-comment-sen-premunir"
        },
        {
          "titre": "Institut Pasteur — Salmonellose (prévention)",
          "url": "https://www.pasteur.fr/fr/centre-medical/fiches-maladies/salmonellose"
        }
      ],
      "choix": {
        "titre": "Pour la finition",
        "mode": "single",
        "label": "Ta finition",
        "options": [
          "Copeaux de chocolat",
          "Zeste d'orange",
          "Fleur de sel",
          "Crème fouettée",
          "Framboises fraîches",
          "Noisettes grillées",
          "Tuile aux amandes",
          "Piment d'Espelette"
        ]
      },
      "accords": [
        {
          "titre": "La classique",
          "texte": "nature, avec quelques copeaux de chocolat noir."
        },
        {
          "titre": "La fruitée",
          "texte": "quelques framboises fraîches pour une touche acidulée."
        },
        {
          "titre": "L'orangée",
          "texte": "un zeste d'orange râpé juste avant de servir."
        },
        {
          "titre": "La croquante",
          "texte": "des éclats de noisettes grillées et une tuile aux amandes."
        }
      ],
      "conservation": "À cause des œufs crus, garde-la au réfrigérateur, filmée, et consomme-la dans les 24 heures. Ne la laisse pas à température ambiante.",
      "allergenes": [
        "oeufs",
        "lait"
      ],
      "noteAllergenes": "Le lait ne vient que du beurre, qui est facultatif. Certains chocolats noirs contiennent aussi du lait ou de la lécithine de soja : vérifie l'étiquette.",
      "regime": {
        "sansViande": true,
        "sansPoisson": true
      },
      "origine": {
        "pays": "France",
        "drapeau": "🇫🇷",
        "resume": "Un grand classique de la cuisine française, dont les premières recettes au chocolat remontent au XVIIIe siècle.",
        "faits": [
          "Le cuisinier français Menon décrit des mousses au café, au chocolat et au safran dans « Les Soupers de la cour », publié en 1755, souvent cité comme la première trace écrite d'une mousse au chocolat (certaines sources avancent un autre ouvrage de Menon, daté de 1750).",
          "Ces premières mousses étaient faites de crème fouettée, à laquelle on pouvait ajouter des blancs d'œufs battus.",
          "Le peintre Henri de Toulouse-Lautrec est souvent associé à la recette, qu'il aurait appelée « mayonnaise de chocolat », mais la mousse au chocolat existait bien avant lui : cette attribution relève sans doute de la légende."
        ],
        "sources": [
          {
            "titre": "ABC Color — El origen de la mousse",
            "url": "https://www.abc.com.py/edicion-impresa/suplementos/gastronomia/el-origen-de-la-mousse-1412552.html"
          },
          {
            "titre": "Daily Maverick — Throwback Thursday: Chocolate mousse",
            "url": "https://www.dailymaverick.co.za/article/2022-02-10-throwback-thursday-chocolate-mousse/"
          },
          {
            "titre": "Food Republic — Why Chocolate Mousse Was Once Called Mayonnaise",
            "url": "https://www.foodrepublic.com/1526666/chocolate-mousse-origin-mayonnaise/"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "cremebrulee",
      "url": "creme-brulee.html",
      "titre": "Crème brûlée à la vanille",
      "titreCourt": "Crème brûlée",
      "alias": [
        "creme brulee",
        "cremes brulees"
      ],
      "emoji": "🍮",
      "categorie": "dessert",
      "badge": "Caramel craquant",
      "accroche": "Une crème onctueuse à la vanille sous une fine croûte de caramel qui craque sous la cuillère.",
      "intro": "Un dessert de bistrot élégant et gourmand : une crème vanillée cuite tout doucement au four, puis bien refroidie. Le plaisir commence au moment de briser la fine couche de caramel avec le dos de la cuillère.",
      "images": [],
      "cover": {
        "motif": "ramequin",
        "fond": "#4a2c0c",
        "encre": "#f6efe4",
        "accent": "#f2c14e"
      },
      "temps": {
        "preparation": 30,
        "cuisson": 65,
        "repos": 210
      },
      "difficulte": "Intermédiaire",
      "portions": {
        "base": 6,
        "unite": "ramequin",
        "pluriel": "ramequins",
        "min": 2,
        "max": 12
      },
      "tags": [
        "dessert",
        "francais",
        "traditionnel",
        "raffine",
        "sucre",
        "gourmand",
        "four",
        "froid",
        "invite",
        "fete",
        "romantique",
        "dimanche"
      ],
      "ingredients": [
        {
          "groupe": "Pour la crème",
          "items": [
            {
              "nom": "Crème liquide entière (30 % de matière grasse minimum)",
              "qte": 500,
              "unite": "ml"
            },
            {
              "nom": "Jaunes d'œufs",
              "qte": 6,
              "unite": "pièce"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 100,
              "unite": "g"
            },
            {
              "nom": "Gousse de vanille",
              "qte": 1,
              "unite": "gousse"
            }
          ]
        },
        {
          "groupe": "Pour le caramel",
          "items": [
            {
              "nom": "Cassonade (sucre roux)",
              "qte": 6,
              "unite": "c. à soupe"
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Infuser la vanille",
          "texte": "Fends la gousse de vanille en deux et gratte les graines avec la pointe d'un couteau. Mets graines et gousse dans la crème, porte à frémissement, puis couvre hors du feu et laisse infuser 15 minutes.",
          "minuteurs": [
            {
              "secondes": 900,
              "label": "Infusion de la vanille"
            }
          ]
        },
        {
          "titre": "Le four",
          "texte": "Préchauffe le four à 100 °C. Dispose les ramequins sur une plaque : choisis-les larges et peu profonds, la crème cuira plus régulièrement."
        },
        {
          "titre": "Jaunes et sucre",
          "texte": "Mélange les jaunes d'œufs et le sucre au fouet, juste assez pour les lier. Ne cherche pas à les faire mousser : l'air ferait des bulles à la surface des crèmes."
        },
        {
          "titre": "Verser la crème",
          "texte": "Retire la gousse, puis verse la crème encore chaude sur les jaunes, en filet, sans cesser de remuer doucement. Passe le mélange au tamis et retire la mousse en surface avec une cuillère."
        },
        {
          "titre": "Remplir les ramequins",
          "texte": "Répartis la crème dans les ramequins, à hauteur égale pour que tous cuisent au même rythme. Enfourne délicatement, sans faire de vagues."
        },
        {
          "titre": "La cuisson",
          "texte": "Laisse cuire environ 1 heure. Les crèmes sont prêtes quand elles sont prises sur les bords et tremblent encore légèrement au centre quand tu bouges le ramequin. Avec des ramequins plus profonds, compte un peu plus longtemps.",
          "minuteurs": [
            {
              "secondes": 3000,
              "label": "Vérifier la prise"
            },
            {
              "secondes": 3600,
              "label": "Cuisson complète"
            }
          ]
        },
        {
          "titre": "Le repos au frais",
          "texte": "Laisse tiédir les crèmes 15 minutes, puis filme-les et place-les au réfrigérateur au moins 3 heures. Elles doivent être bien froides avant d'être caramélisées.",
          "minuteurs": [
            {
              "secondes": 900,
              "label": "Tiédir"
            },
            {
              "secondes": 10800,
              "label": "Repos au frais"
            }
          ]
        },
        {
          "titre": "Caraméliser le dessus",
          "texte": "Juste avant de servir, saupoudre chaque crème d'une cuillerée de cassonade en couche fine et régulière. Caramélise au chalumeau de cuisine, ou quelques instants sous le gril du four très chaud en surveillant sans arrêt. Laisse le caramel durcir une minute, puis sers aussitôt."
        }
      ],
      "astuces": [
        "Retire bien la mousse avant la cuisson : la surface des crèmes sera lisse et le caramel régulier.",
        "Caramélise au tout dernier moment : au réfrigérateur, le caramel ramollit et perd son craquant.",
        "Ne jette pas les blancs d'œufs : ils se congèlent très bien et serviront pour des meringues ou des financiers."
      ],
      "choix": {
        "titre": "Parfums au choix",
        "mode": "single",
        "label": "Ton parfum",
        "options": [
          "Vanille",
          "Café",
          "Fève tonka",
          "Zeste d'orange",
          "Lavande",
          "Pistache",
          "Chocolat",
          "Cannelle"
        ]
      },
      "accords": [
        {
          "titre": "La classique",
          "texte": "vanille et caramel bien craquant."
        },
        {
          "titre": "La fruitée",
          "texte": "quelques framboises fraîches servies à côté."
        },
        {
          "titre": "La parfumée",
          "texte": "un zeste d'orange infusé dans la crème avec la vanille."
        },
        {
          "titre": "Façon catalane",
          "texte": "une pointe de cannelle et un zeste de citron dans la crème."
        }
      ],
      "conservation": "Sans caramel, les crèmes cuites se gardent 2 jours au réfrigérateur, filmées. Caramélise-les seulement au moment de servir.",
      "allergenes": [
        "oeufs",
        "lait"
      ],
      "regime": {
        "sansViande": true,
        "sansPoisson": true
      },
      "origine": {
        "pays": "France (origine disputée)",
        "drapeau": "🇫🇷",
        "resume": "Une crème cuite sous une croûte de sucre caramélisé, dont l'origine est disputée entre la France, l'Angleterre et l'Espagne (Catalogne).",
        "faits": [
          "La plus ancienne recette connue d'un dessert appelé « crème brûlée » figure dans le « Cuisinier royal et bourgeois » de François Massialot, publié en 1691, mais ses origines exactes restent floues.",
          "En Catalogne, la crema catalana est une cousine très proche : elle se prépare en général avec du lait plutôt qu'avec de la crème, et se parfume au zeste d'agrumes et à la cannelle plutôt qu'à la vanille."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Crème brûlée",
            "url": "https://en.wikipedia.org/wiki/Cr%C3%A8me_br%C3%BBl%C3%A9e"
          },
          {
            "titre": "Tasting Table — Crème brûlée vs. crema catalana",
            "url": "https://tastingtable.com/1150922/creme-brulee-vs-crema-catalana-whats-the-difference"
          },
          {
            "titre": "Coquinaria — Crème brûlée, an all-time favourite from the seventeenth century",
            "url": "https://coquinaria.nl/en/creme-brulee/"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "tiramisu",
      "url": "tiramisu.html",
      "titre": "Tiramisu au café",
      "titreCourt": "Tiramisu",
      "alias": [
        "tiramisu",
        "tiramisus"
      ],
      "emoji": "☕",
      "categorie": "dessert",
      "badge": "Sans cuisson",
      "accroche": "Biscuits imbibés de café, crème légère au mascarpone, voile de cacao : le dessert italien qui remonte le moral.",
      "intro": "Le grand dessert italien sans cuisson, en couches de biscuits imbibés de café et de crème au mascarpone. Préparé la veille, il gagne en fondant et en saveur : parfait pour recevoir sans stress.",
      "images": [],
      "cover": {
        "motif": "assiette",
        "fond": "#2f2018",
        "encre": "#f6efe4",
        "accent": "#c9925a"
      },
      "temps": {
        "preparation": 30,
        "cuisson": 0,
        "repos": 360
      },
      "difficulte": "Facile",
      "portions": {
        "base": 8,
        "unite": "part",
        "pluriel": "parts",
        "min": 4,
        "max": 16,
        "pas": 2
      },
      "tags": [
        "dessert",
        "italien",
        "traditionnel",
        "gourmand",
        "sucre",
        "froid",
        "familial",
        "convivial",
        "fete",
        "invite",
        "dimanche",
        "simple"
      ],
      "ingredients": [
        {
          "groupe": "Pour la crème au mascarpone",
          "items": [
            {
              "nom": "Mascarpone",
              "qte": 500,
              "unite": "g"
            },
            {
              "nom": "Œufs extra-frais",
              "qte": 4,
              "unite": "pièce"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 100,
              "unite": "g"
            }
          ]
        },
        {
          "groupe": "Pour le montage",
          "items": [
            {
              "nom": "Biscuits à la cuillère",
              "qte": 300,
              "unite": "g"
            },
            {
              "nom": "Café fort (espresso)",
              "qte": 300,
              "unite": "ml"
            },
            {
              "nom": "Marsala",
              "qte": 3,
              "unite": "c. à soupe",
              "optionnel": true
            },
            {
              "nom": "Cacao amer en poudre",
              "qte": 2,
              "unite": "c. à soupe"
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Le café",
          "texte": "Prépare le café, ajoute le marsala si tu en mets, et verse le tout dans une assiette creuse. Laisse-le refroidir complètement : un café chaud détremperait les biscuits."
        },
        {
          "titre": "Séparer les œufs",
          "texte": "Sépare les blancs des jaunes avec soin. Mets les blancs dans un saladier bien propre et sec."
        },
        {
          "titre": "La crème",
          "texte": "Fouette les jaunes avec le sucre jusqu'à ce que le mélange blanchisse et devienne mousseux. Ajoute le mascarpone et fouette juste assez pour obtenir une crème lisse."
        },
        {
          "titre": "Les blancs en neige",
          "texte": "Monte les blancs en neige ferme. Incorpore-les délicatement à la crème au mascarpone avec une maryse, en soulevant la masse pour ne pas les casser."
        },
        {
          "titre": "Tremper les biscuits",
          "texte": "Trempe rapidement chaque biscuit dans le café, environ une seconde de chaque côté. Aligne-les au fond d'un plat d'environ 20 x 30 cm (pour 8 parts)."
        },
        {
          "titre": "Le montage",
          "texte": "Recouvre de la moitié de la crème, puis d'une deuxième couche de biscuits imbibés. Termine par le reste de crème et lisse la surface à la spatule."
        },
        {
          "titre": "Le repos au frais",
          "texte": "Filme le plat et laisse-le prendre au réfrigérateur au moins 6 heures, idéalement une nuit. La crème se raffermit et les saveurs se mêlent.",
          "minuteurs": [
            {
              "secondes": 21600,
              "label": "Repos au frais"
            }
          ]
        },
        {
          "titre": "Le cacao",
          "texte": "Juste avant de servir, saupoudre généreusement de cacao amer à travers une petite passoire. Posé trop tôt, il prend l'humidité et forme une pâte."
        }
      ],
      "astuces": [
        "Ne laisse pas tremper les biscuits : une seconde de chaque côté suffit, ils continuent de s'imbiber au contact de la crème.",
        "Fouette le mascarpone juste ce qu'il faut : trop travaillé, il peut devenir granuleux.",
        "Prépare-le la veille : après une nuit au réfrigérateur, il se tient mieux et se découpe plus facilement."
      ],
      "securite": "Le tiramisu contient des œufs crus : utilise des œufs extra-frais, garde-le au réfrigérateur et consomme-le dans les 24 heures. Les œufs crus sont déconseillés aux personnes fragiles (femmes enceintes, jeunes enfants, personnes âgées ou immunodéprimées) : pour elles, choisis plutôt un dessert sans œufs crus, ou des œufs pasteurisés (vérifie l'étiquette).",
      "sourcesSecurite": [
        {
          "titre": "Anses — Qu'est-ce que la salmonellose et comment s'en prémunir ?",
          "url": "https://www.anses.fr/fr/content/quest-ce-que-la-salmonellose-et-comment-sen-premunir"
        },
        {
          "titre": "Institut Pasteur — Salmonellose (prévention)",
          "url": "https://www.pasteur.fr/fr/centre-medical/fiches-maladies/salmonellose"
        }
      ],
      "choix": {
        "titre": "Variantes",
        "mode": "single",
        "label": "Ta version",
        "options": [
          "Classique au café",
          "Café décaféiné",
          "Trait de marsala",
          "Amaretto",
          "Fruits rouges",
          "Spéculoos",
          "Copeaux de chocolat",
          "En verrines"
        ]
      },
      "accords": [
        {
          "titre": "La classique",
          "texte": "café serré, mascarpone et cacao amer, sans alcool."
        },
        {
          "titre": "À l'italienne",
          "texte": "un trait de marsala dans le café."
        },
        {
          "titre": "La fruitée",
          "texte": "des framboises ou des fraises glissées entre les couches."
        },
        {
          "titre": "La gourmande",
          "texte": "des copeaux de chocolat noir sur la crème."
        }
      ],
      "conservation": "À cause des œufs crus, garde-le au réfrigérateur, bien filmé, et consomme-le dans les 24 heures. Ne le laisse pas à température ambiante.",
      "allergenes": [
        "gluten",
        "oeufs",
        "lait",
        "sulfites"
      ],
      "noteAllergenes": "Les sulfites ne concernent que la version au marsala. Vérifie aussi l'étiquette des biscuits à la cuillère.",
      "regime": {
        "sansViande": true,
        "sansPoisson": true
      },
      "origine": {
        "pays": "Italie (Vénétie ou Frioul)",
        "drapeau": "🇮🇹",
        "resume": "Un dessert du nord-est de l'Italie, popularisé dans les restaurants à partir de la fin des années 1960, dont le lieu de naissance reste disputé entre la Vénétie et le Frioul-Vénétie Julienne.",
        "faits": [
          "Son nom vient de « tira mi sù » (« tireme sù » en dialecte vénitien), qui signifie littéralement « tire-moi vers le haut », autrement dit « remonte-moi ».",
          "La plupart des sources y voient une variante du sbatudin, un dessert du nord-est de l'Italie fait de jaunes d'œufs battus avec du sucre et servi avec des biscuits à la cuillère.",
          "Son invention est disputée : certaines sources l'attribuent au chef Roberto « Loly » Linguanotto, du restaurant Le Beccherie à Trévise (Vénétie), tandis qu'une recette de 1959 le rattache à Tolmezzo, dans le Frioul-Vénétie Julienne. Le ministère italien de l'Agriculture l'a reconnu comme produit traditionnel du Frioul-Vénétie Julienne, ce que contestent les responsables de Trévise et de la Vénétie."
        ],
        "sources": [
          {
            "titre": "Encyclopædia Britannica — Tiramisu",
            "url": "https://www.britannica.com/topic/tiramisu"
          },
          {
            "titre": "Wikipédia (en) — Tiramisu",
            "url": "https://en.wikipedia.org/wiki/Tiramisu"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "cookies",
      "url": "cookies.html",
      "titre": "Cookies aux pépites de chocolat",
      "titreCourt": "Cookies",
      "alias": [
        "cookie",
        "cookies"
      ],
      "emoji": "🍪",
      "categorie": "dessert",
      "badge": "Goûter gourmand",
      "accroche": "Bords dorés, cœur moelleux et généreuses pépites de chocolat : les cookies qu'on s'arrache au goûter.",
      "intro": "Des cookies comme on les aime : croustillants sur les bords, tendres au centre et truffés de pépites de chocolat. La pâte se prépare en quelques minutes, et un passage au réfrigérateur les rend encore plus épais.",
      "images": [],
      "cover": {
        "motif": "biscuit",
        "fond": "#4a2a17",
        "encre": "#f6efe4",
        "accent": "#e8a33d"
      },
      "temps": {
        "preparation": 20,
        "cuisson": 24,
        "repos": 30
      },
      "difficulte": "Facile",
      "portions": {
        "base": 20,
        "unite": "cookie",
        "pluriel": "cookies",
        "min": 10,
        "max": 60,
        "pas": 10
      },
      "tags": [
        "dessert",
        "gouter",
        "sucre",
        "chocolat",
        "americain",
        "enfant",
        "familial",
        "gourmand",
        "convivial",
        "four",
        "facile"
      ],
      "ingredients": [
        {
          "groupe": "Pour la pâte",
          "items": [
            {
              "nom": "Beurre doux mou",
              "qte": 125,
              "unite": "g"
            },
            {
              "nom": "Vergeoise brune ou sucre roux",
              "qte": 100,
              "unite": "g"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 75,
              "unite": "g"
            },
            {
              "nom": "Œuf",
              "qte": 1,
              "unite": "pièce"
            },
            {
              "nom": "Extrait de vanille",
              "qte": 1,
              "unite": "c. à café"
            },
            {
              "nom": "Farine de blé (type 55)",
              "qte": 200,
              "unite": "g"
            },
            {
              "nom": "Bicarbonate de soude alimentaire",
              "qte": 0.5,
              "unite": "c. à café"
            },
            {
              "nom": "Sel fin",
              "qte": 0.5,
              "unite": "c. à café"
            },
            {
              "nom": "Pépites de chocolat noir",
              "qte": 200,
              "unite": "g"
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Beurre et sucres",
          "texte": "Dans un saladier, travaille le beurre mou avec la vergeoise et le sucre en poudre, à la spatule ou au batteur. Continue 2 à 3 minutes, jusqu'à obtenir un mélange crémeux et un peu plus clair."
        },
        {
          "titre": "L'œuf et la vanille",
          "texte": "Ajoute l'œuf et l'extrait de vanille, puis mélange jusqu'à ce que la préparation soit bien homogène. Si elle paraît un peu granuleuse, pas d'inquiétude : la farine va tout rattraper."
        },
        {
          "titre": "Les ingrédients secs",
          "texte": "Dans un autre bol, mélange la farine, le bicarbonate et le sel. Incorpore-les à la préparation sans trop travailler la pâte : arrête dès qu'il n'y a plus de traces de farine."
        },
        {
          "titre": "Les pépites",
          "texte": "Ajoute les pépites de chocolat et répartis-les dans toute la pâte à la spatule. Elle doit être épaisse et un peu collante."
        },
        {
          "titre": "Le repos au froid",
          "texte": "Couvre le saladier et place la pâte au moins 30 minutes au réfrigérateur : plus ferme, elle s'étalera moins à la cuisson. Un quart d'heure avant la fin, préchauffe le four à 180 °C.",
          "minuteurs": [
            {
              "secondes": 1800,
              "label": "Repos de la pâte"
            }
          ]
        },
        {
          "titre": "Le façonnage",
          "texte": "Couvre deux plaques de papier cuisson. Forme des boules d'environ 40 g, à peu près la taille d'une balle de ping-pong, et espace-les d'au moins 5 cm : elles vont s'étaler. S'il n'y a pas assez de place, fais une fournée de plus."
        },
        {
          "titre": "La cuisson",
          "texte": "Enfourne une plaque à la fois pour 10 à 12 minutes. Les bords doivent être dorés et le centre encore pâle et tendre : les cookies finissent de cuire en refroidissant.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Cœur moelleux"
            },
            {
              "secondes": 720,
              "label": "Plus croustillant"
            }
          ]
        },
        {
          "titre": "Le refroidissement",
          "texte": "Laisse les cookies 5 minutes sur la plaque pour qu'ils se raffermissent, puis fais-les glisser sur une grille. Pendant ce temps, enfourne la seconde plaque.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Raffermir sur la plaque"
            }
          ]
        }
      ],
      "astuces": [
        "Pour des cookies plus épais et plus parfumés, tu peux laisser reposer la pâte jusqu'à 24 h au réfrigérateur, bien filmée.",
        "Sors les cookies quand le centre paraît encore un peu cru : ils durcissent en refroidissant, et trop cuits ils deviennent secs.",
        "La vergeoise brune, plus humide que le sucre blanc, rend les cookies plus moelleux ; une plus grande part de sucre blanc les rend plus croustillants."
      ],
      "choix": {
        "titre": "Pépites & extras",
        "mode": "multi",
        "label": "Ta fournée",
        "options": [
          "Chocolat noir",
          "Chocolat au lait",
          "Chocolat blanc",
          "Noix de pécan",
          "Noisettes concassées",
          "Noix de macadamia",
          "Fleur de sel",
          "Cranberries séchées"
        ]
      },
      "accords": [
        {
          "titre": "Le goûter",
          "texte": "un cookie tiède et un grand verre de lait froid."
        },
        {
          "titre": "À l'américaine",
          "texte": "chocolat noir et noix de pécan concassées dans la pâte."
        },
        {
          "titre": "Le gourmand",
          "texte": "un cookie tiède avec une boule de glace vanille."
        },
        {
          "titre": "Le sucré-salé",
          "texte": "quelques grains de fleur de sel sur chaque boule avant la cuisson."
        }
      ],
      "conservation": "Environ 4 jours dans une boîte hermétique, à température ambiante. La pâte crue se garde 48 h au réfrigérateur, bien filmée ; façonnée en boules, elle se congèle et se cuit sans décongélation en ajoutant 1 à 2 minutes.",
      "allergenes": [
        "gluten",
        "oeufs",
        "lait"
      ],
      "noteAllergenes": "Certaines pépites de chocolat contiennent de la lécithine de soja, du lait ou des traces de fruits à coque : vérifie l'étiquette.",
      "regime": {
        "sansViande": true,
        "sansPoisson": true
      },
      "origine": {
        "pays": "États-Unis (Massachusetts)",
        "drapeau": "🇺🇸",
        "resume": "Né dans une auberge du Massachusetts dans les années 1930, le cookie aux pépites de chocolat est devenu un emblème de la pâtisserie américaine.",
        "faits": [
          "Il est attribué à Ruth Graves Wakefield qui, avec son mari Kenneth, avait acheté en 1930 une ancienne maison de péage à Whitman (Massachusetts) pour en faire une auberge, la Toll House Inn.",
          "Les récits divergent sur la date exacte, dans les années 1930, et sur la façon dont l'idée lui est venue : la version la plus répandue veut qu'elle ait ajouté des morceaux d'une tablette de chocolat Nestlé à une pâte à biscuits, mais d'autres sources affirment qu'elle l'a fait volontairement et non par accident.",
          "Le cookie aux pépites de chocolat est le biscuit officiel de l'État du Massachusetts depuis 1997."
        ],
        "sources": [
          {
            "titre": "Lemelson-MIT — Ruth Wakefield",
            "url": "https://lemelson.mit.edu/resources/ruth-wakefield"
          },
          {
            "titre": "Wikipédia (en) — Ruth Graves Wakefield",
            "url": "https://en.wikipedia.org/wiki/Ruth_Graves_Wakefield"
          },
          {
            "titre": "History.com — 8 Defining Moments in the History of the Chocolate Chip Cookie",
            "url": "https://www.history.com/articles/history-chocolate-chip-cookie-toll-house"
          },
          {
            "titre": "Tasting Table — Why chocolate chip was chosen as Massachusetts' official cookie",
            "url": "https://www.tastingtable.com/1850193/chocolate-chip-official-state-cookie-massachusetts"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "clafoutis",
      "url": "clafoutis.html",
      "titre": "Clafoutis aux cerises",
      "titreCourt": "Clafoutis",
      "alias": [
        "clafoutis",
        "clafoutis aux cerises"
      ],
      "emoji": "🍒",
      "categorie": "dessert",
      "badge": "Dessert d'été",
      "accroche": "Des cerises bien mûres noyées dans une pâte fondante, dorée au four et servie tiède : l'été en dessert.",
      "intro": "Un dessert tout simple, à mi-chemin entre le flan et le gâteau, où les cerises cuisent dans une pâte fondante. Il se prépare en un tour de main et se savoure tiède, saupoudré de sucre glace.",
      "images": [],
      "cover": {
        "motif": "plat-four",
        "fond": "#4a1020",
        "encre": "#f6efe4",
        "accent": "#ef3b55"
      },
      "temps": {
        "preparation": 20,
        "cuisson": 40,
        "repos": 15
      },
      "difficulte": "Facile",
      "portions": {
        "base": 6,
        "unite": "part",
        "pluriel": "parts",
        "min": 2,
        "max": 12,
        "pas": 2
      },
      "tags": [
        "dessert",
        "francais",
        "traditionnel",
        "ete",
        "familial",
        "gouter",
        "sucre",
        "four",
        "simple",
        "facile",
        "convivial",
        "dimanche"
      ],
      "ingredients": [
        {
          "groupe": "Pour le plat",
          "items": [
            {
              "nom": "Beurre pour le plat",
              "qte": 15,
              "unite": "g"
            },
            {
              "nom": "Sucre en poudre pour le plat",
              "qte": 1,
              "unite": "c. à soupe"
            }
          ]
        },
        {
          "groupe": "Pour le clafoutis",
          "items": [
            {
              "nom": "Cerises noires bien mûres",
              "qte": 600,
              "unite": "g"
            },
            {
              "nom": "Œufs",
              "qte": 3,
              "unite": "pièce"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 80,
              "unite": "g"
            },
            {
              "nom": "Sucre vanillé",
              "qte": 1,
              "unite": "sachet",
              "optionnel": true
            },
            {
              "nom": "Sel fin",
              "qte": 1,
              "unite": "pincée",
              "fixe": true
            },
            {
              "nom": "Farine de blé",
              "qte": 80,
              "unite": "g"
            },
            {
              "nom": "Lait entier",
              "qte": 300,
              "unite": "ml"
            },
            {
              "nom": "Beurre fondu",
              "qte": 30,
              "unite": "g"
            }
          ]
        },
        {
          "groupe": "Pour la finition",
          "items": [
            {
              "nom": "Sucre glace",
              "qte": 1,
              "unite": "c. à soupe"
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Four et plat",
          "texte": "Préchauffe le four à 180 °C. Beurre généreusement un plat à gratin d'environ 24 cm, puis verse la cuillère de sucre et fais tourner le plat pour en couvrir le fond et les parois."
        },
        {
          "titre": "Les cerises",
          "texte": "Lave les cerises, équeute-les et sèche-les dans un torchon. La tradition limousine les garde entières avec leur noyau, qui apporte une note d'amande ; si des enfants partagent le dessert, dénoyaute-les ou préviens bien tout le monde."
        },
        {
          "titre": "Œufs et sucre",
          "texte": "Dans un saladier, fouette les œufs avec le sucre, le sucre vanillé et le sel. Continue jusqu'à ce que le mélange soit homogène et légèrement mousseux."
        },
        {
          "titre": "La farine",
          "texte": "Ajoute la farine tamisée et fouette juste assez pour obtenir une pâte lisse, sans grumeaux. Inutile de la travailler davantage."
        },
        {
          "titre": "Lait et beurre",
          "texte": "Verse le lait petit à petit sans cesser de fouetter, puis ajoute le beurre fondu tiédi. La pâte doit être fluide, comme une pâte à crêpes."
        },
        {
          "titre": "Le remplissage",
          "texte": "Répartis les cerises en une seule couche dans le plat. Verse doucement la pâte par-dessus pour ne pas les déplacer."
        },
        {
          "titre": "La cuisson",
          "texte": "Enfourne pour 35 à 40 minutes : le clafoutis doit être bien gonflé, doré et pris au centre. Une lame plantée au milieu doit ressortir sans pâte liquide.",
          "minuteurs": [
            {
              "secondes": 2100,
              "label": "Vérifier la cuisson"
            },
            {
              "secondes": 2400,
              "label": "Cuisson complète"
            }
          ]
        },
        {
          "titre": "Le service",
          "texte": "Laisse tiédir au moins 15 minutes : le clafoutis retombe un peu, c'est normal. Saupoudre de sucre glace juste avant de servir.",
          "minuteurs": [
            {
              "secondes": 900,
              "label": "Tiédir"
            }
          ]
        }
      ],
      "astuces": [
        "Sèche soigneusement les cerises après les avoir lavées : l'eau qui reste à leur surface détrempe la pâte.",
        "Pour une texture encore plus fondante, remplace 100 ml de lait par de la crème liquide entière.",
        "Un plat en céramique ou en porcelaine, bien beurré et sucré, donne des bords joliment caramélisés et passe directement du four à la table."
      ],
      "choix": {
        "titre": "Variantes & service",
        "mode": "single",
        "label": "Ta version",
        "options": [
          "Cerises entières",
          "Cerises dénoyautées",
          "Griottes",
          "Parfum amande",
          "Trait de kirsch",
          "Crème fraîche",
          "Glace vanille",
          "Bien froid"
        ]
      },
      "accords": [
        {
          "titre": "Le traditionnel",
          "texte": "cerises entières, servi tiède avec un voile de sucre glace."
        },
        {
          "titre": "Le gourmand",
          "texte": "une cuillerée de crème fraîche épaisse à côté."
        },
        {
          "titre": "Le parfumé",
          "texte": "un trait de kirsch ou quelques gouttes d'extrait d'amande dans la pâte."
        },
        {
          "titre": "L'estival",
          "texte": "bien froid, avec une boule de glace vanille."
        }
      ],
      "conservation": "Jusqu'à 2 jours au réfrigérateur, couvert d'un film. Sers-le froid, ou réchauffe-le quelques minutes au four doux.",
      "allergenes": [
        "gluten",
        "oeufs",
        "lait"
      ],
      "regime": {
        "sansViande": true,
        "sansPoisson": true
      },
      "origine": {
        "pays": "France (Limousin)",
        "drapeau": "🇫🇷",
        "resume": "Dessert traditionnel du Limousin, où les cerises cuisent au four dans une pâte qui rappelle un flan.",
        "faits": [
          "Dans la version traditionnelle limousine, les cerises sont mises entières, sans être dénoyautées : leurs noyaux libèrent à la cuisson un léger arôme d'amande amère.",
          "Préparé avec d'autres fruits que les cerises (pommes, poires, prunes…), le même dessert prend le nom de flaugnarde.",
          "L'origine du mot est discutée : on le rattache souvent à l'occitan « clafir » (remplir), mais une autre hypothèse le relie à l'ancien français « claufir » (fixer avec des clous), les cerises rappelant des têtes de clous."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Clafoutis",
            "url": "https://en.wikipedia.org/wiki/Clafoutis"
          },
          {
            "titre": "Wiktionnaire — clafoutis (étymologie)",
            "url": "https://fr.wiktionary.org/wiki/clafoutis"
          },
          {
            "titre": "Connexion France — The time is ripe for making a cherry clafoutis",
            "url": "https://www.connexionfrance.com/magazine/the-time-is-ripe-for-making-a-cherry-clafoutis/791731"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "citronnade",
      "url": "citronnade.html",
      "titre": "Citronnade maison",
      "titreCourt": "Citronnade",
      "alias": [
        "citronnade",
        "limonade maison",
        "citronnade maison"
      ],
      "emoji": "🍋",
      "categorie": "boisson",
      "badge": "Rafraîchissant",
      "accroche": "Jus de citron frais, sirop parfumé aux zestes et eau bien fraîche : la boisson désaltérante des beaux jours.",
      "intro": "Une boisson désaltérante et pleine de peps, faite simplement de citrons pressés, de sucre et d'eau fraîche. Le petit secret : un sirop infusé aux zestes, qui apporte plus de parfum.",
      "images": [],
      "cover": {
        "motif": "verre",
        "fond": "#1d3b2c",
        "encre": "#f6efe4",
        "accent": "#f5d130"
      },
      "temps": {
        "preparation": 15,
        "cuisson": 3,
        "repos": 10
      },
      "difficulte": "Très facile",
      "portions": {
        "base": 6,
        "unite": "verre",
        "pluriel": "verres",
        "min": 2,
        "max": 24,
        "pas": 2
      },
      "tags": [
        "boisson",
        "frais",
        "froid",
        "ete",
        "facile",
        "simple",
        "enfant",
        "familial",
        "convivial",
        "brunch",
        "gouter"
      ],
      "ingredients": [
        {
          "groupe": "Pour le sirop",
          "items": [
            {
              "nom": "Sucre en poudre",
              "qte": 120,
              "unite": "g"
            },
            {
              "nom": "Eau",
              "qte": 200,
              "unite": "ml"
            }
          ]
        },
        {
          "groupe": "Pour la citronnade",
          "items": [
            {
              "nom": "Citrons jaunes bio",
              "qte": 5,
              "unite": "pièce"
            },
            {
              "nom": "Eau bien fraîche",
              "qte": 1000,
              "unite": "ml"
            },
            {
              "nom": "Glaçons",
              "qte": 12,
              "unite": "pièce",
              "optionnel": true
            },
            {
              "nom": "Feuilles de menthe",
              "qte": 8,
              "unite": "feuille",
              "optionnel": true
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Laver les citrons",
          "texte": "Lave et brosse les citrons sous l'eau chaude, puis sèche-les. Tu vas utiliser leur zeste : c'est pour cela qu'il vaut mieux les choisir bio."
        },
        {
          "titre": "Les zestes",
          "texte": "Prélève le zeste de deux citrons à l'économe, en fines bandes. Évite la partie blanche juste en dessous, qui est amère."
        },
        {
          "titre": "Le sirop",
          "texte": "Verse l'eau du sirop et le sucre dans une petite casserole, ajoute les zestes et chauffe à feu moyen en remuant. Arrête dès que le sucre est complètement dissous, au bout de 3 minutes environ.",
          "minuteurs": [
            {
              "secondes": 180,
              "label": "Sirop"
            }
          ]
        },
        {
          "titre": "L'infusion",
          "texte": "Retire la casserole du feu et laisse infuser 10 minutes : les zestes parfument le sirop. Filtre-le ensuite pour retirer les zestes ; plus il aura refroidi, plus ta citronnade sera fraîche.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Infusion des zestes"
            }
          ]
        },
        {
          "titre": "Presser les citrons",
          "texte": "Roule chaque citron sur le plan de travail en appuyant avec la paume, coupe-le en deux et presse-le. Filtre le jus pour retenir les pépins."
        },
        {
          "titre": "Le mélange",
          "texte": "Dans une grande carafe, mélange le jus de citron, le sirop et l'eau bien fraîche. Goûte et ajuste : un peu plus d'eau si c'est trop fort, un trait de jus de citron si c'est trop sucré."
        },
        {
          "titre": "Le service",
          "texte": "Ajoute les glaçons et les feuilles de menthe légèrement froissées entre tes doigts. Sers aussitôt, bien frais."
        }
      ],
      "astuces": [
        "Un citron à température ambiante, roulé sous la paume avant d'être pressé, rend plus facilement son jus qu'un citron qui sort du réfrigérateur.",
        "Le sirop permet au sucre de bien se dissoudre : versé directement dans l'eau froide, il a tendance à rester au fond de la carafe.",
        "Pour une version pétillante, remplace l'eau plate par de l'eau gazeuse bien froide, ajoutée juste avant de servir."
      ],
      "choix": {
        "titre": "Compose ta carafe",
        "mode": "multi",
        "label": "Ta composition",
        "options": [
          "Menthe fraîche",
          "Eau pétillante",
          "Gingembre frais",
          "Basilic",
          "Rondelles de citron",
          "Fraises écrasées",
          "Citron vert",
          "Beaucoup de glaçons"
        ]
      },
      "accords": [
        {
          "titre": "La classique",
          "texte": "citron jaune, menthe fraîche et beaucoup de glaçons."
        },
        {
          "titre": "La pétillante",
          "texte": "eau gazeuse bien froide ajoutée au moment de servir."
        },
        {
          "titre": "La tonique",
          "texte": "quelques lamelles de gingembre frais infusées dans le sirop."
        },
        {
          "titre": "La fruitée",
          "texte": "quelques fraises écrasées au fond de la carafe."
        }
      ],
      "conservation": "Idéalement à boire dans la journée. Sinon, jusqu'à 2 jours au réfrigérateur dans une carafe ou une bouteille fermée : ajoute les glaçons et la menthe seulement au moment de servir.",
      "allergenes": [],
      "regime": {
        "sansViande": true,
        "sansPoisson": true,
        "vegan": true
      },
      "origine": {
        "pays": "Égypte médiévale, puis France",
        "drapeau": "🇪🇬",
        "resume": "Les boissons au jus de citron sucré remontent au moins à l'Égypte médiévale, bien avant d'être vendues dans les rues de Paris au XVIIe siècle.",
        "faits": [
          "L'une des premières recettes connues de boisson au citron figure dans un traité égyptien du XIIe siècle, écrit par le médecin Ibn Jumayʿ ; une boisson de jus de citron sucré, le qatarmizat, était aussi consommée dans l'Égypte médiévale.",
          "À Paris, les marchands qui vendaient de la limonade dans la rue ont été réunis en corporation, la Compagnie des limonadiers, en 1676.",
          "En France, le mot « limonade » désigne aujourd'hui surtout une boisson gazeuse : la boisson maison non gazeuse au citron, au sucre et à l'eau s'appelle plutôt « citronnade »."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Lemonade",
            "url": "https://en.wikipedia.org/wiki/Lemonade"
          },
          {
            "titre": "Tasting Table — Where did lemonade originate?",
            "url": "https://www.tastingtable.com/1552559/where-did-lemonade-originate/"
          },
          {
            "titre": "Office québécois de la langue française — limonade (eau non gazeuse) et citronnade",
            "url": "https://vitrinelinguistique.oqlf.gouv.qc.ca/redirection/ficheuid/8872491"
          },
          {
            "titre": "La langue française — définition de « limonade »",
            "url": "https://www.lalanguefrancaise.com/dictionnaire/definition/limonade"
          },
          {
            "titre": "La langue française — définition de « citronnade »",
            "url": "https://www.lalanguefrancaise.com/dictionnaire/definition/citronnade"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "chocolatchaud",
      "url": "chocolat-chaud.html",
      "titre": "Chocolat chaud à l'ancienne",
      "titreCourt": "Chocolat chaud",
      "alias": [
        "chocolat chaud",
        "chocolat a l ancienne"
      ],
      "emoji": "☕",
      "categorie": "boisson",
      "badge": "Douceur d'hiver",
      "accroche": "Du vrai chocolat noir fondu dans du lait entier, puis fouetté jusqu'à devenir épais, onctueux et mousseux.",
      "intro": "Rien à voir avec une poudre instantanée : ici, on fait fondre du vrai chocolat noir dans du lait entier, que tu peux parfumer à la vanille. Le résultat est épais, onctueux et intensément chocolaté, parfait pour les après-midi d'hiver.",
      "images": [],
      "cover": {
        "motif": "tasse",
        "fond": "#2f1b14",
        "encre": "#f6efe4",
        "accent": "#e0913f"
      },
      "temps": {
        "preparation": 10,
        "cuisson": 10,
        "repos": 10
      },
      "difficulte": "Facile",
      "portions": {
        "base": 4,
        "unite": "tasse",
        "pluriel": "tasses",
        "min": 1,
        "max": 12
      },
      "tags": [
        "boisson",
        "chocolat",
        "chaud",
        "hiver",
        "reconfort",
        "gourmand",
        "sucre",
        "gouter",
        "enfant",
        "familial",
        "traditionnel",
        "facile"
      ],
      "ingredients": [
        {
          "groupe": "Pour le chocolat",
          "items": [
            {
              "nom": "Lait entier",
              "qte": 700,
              "unite": "ml"
            },
            {
              "nom": "Crème liquide entière",
              "qte": 100,
              "unite": "ml"
            },
            {
              "nom": "Chocolat noir (60 à 70 % de cacao)",
              "qte": 160,
              "unite": "g"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 20,
              "unite": "g"
            },
            {
              "nom": "Cacao en poudre non sucré",
              "qte": 1,
              "unite": "c. à soupe",
              "optionnel": true
            },
            {
              "nom": "Gousse de vanille",
              "qte": 1,
              "unite": "gousse",
              "optionnel": true,
              "fixe": true
            },
            {
              "nom": "Bâton de cannelle",
              "qte": 1,
              "unite": "pièce",
              "optionnel": true,
              "fixe": true
            },
            {
              "nom": "Sel fin",
              "qte": 1,
              "unite": "pincée",
              "fixe": true
            }
          ]
        },
        {
          "groupe": "Pour servir",
          "items": [
            {
              "nom": "Crème fouettée",
              "qte": null,
              "unite": "",
              "note": "selon les envies",
              "optionnel": true
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Hacher le chocolat",
          "texte": "Hache finement le chocolat au couteau et place-le dans un grand bol. Plus les morceaux sont petits, plus il fondra vite et sans grumeaux."
        },
        {
          "titre": "Chauffer le lait",
          "texte": "Verse le lait et la crème dans une casserole. Si tu en utilises, fends la gousse de vanille, gratte les graines dans le lait, puis ajoute la gousse et le bâton de cannelle. Chauffe à feu moyen jusqu'aux premiers frémissements, sans laisser bouillir."
        },
        {
          "titre": "L'infusion",
          "texte": "Retire la casserole du feu, couvre et laisse infuser 10 minutes. Si tu n'utilises ni vanille ni cannelle, passe directement à l'étape suivante.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Infusion"
            }
          ]
        },
        {
          "titre": "Fondre le chocolat",
          "texte": "Retire la gousse et le bâton de cannelle, puis réchauffe le lait s'il a tiédi. Verse-en environ un tiers sur le chocolat haché, attends 1 minute, puis mélange au fouet du centre vers les bords jusqu'à obtenir une crème lisse et brillante.",
          "minuteurs": [
            {
              "secondes": 60,
              "label": "Laisser fondre"
            }
          ]
        },
        {
          "titre": "Le reste du lait",
          "texte": "Ajoute le reste du lait en deux fois, en fouettant bien entre chaque ajout. Reverse ensuite le tout dans la casserole."
        },
        {
          "titre": "Sucre et cacao",
          "texte": "Dans un bol, mélange le sucre, le sel et le cacao si tu en mets : ainsi, le cacao ne fera pas de grumeaux. Verse-les en pluie dans la casserole en fouettant, jusqu'à ce qu'ils soient bien dissous."
        },
        {
          "titre": "La cuisson douce",
          "texte": "Chauffe 5 minutes à feu doux en fouettant sans arrêt, juste à frémissement : le chocolat épaissit légèrement et devient nappant. Ne le laisse pas bouillir, il pourrait accrocher au fond.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Cuisson douce"
            }
          ]
        },
        {
          "titre": "Le service",
          "texte": "Hors du feu, fouette vivement quelques secondes pour le rendre mousseux, puis goûte et ajuste le sucre. Verse dans des tasses chaudes et sers aussitôt, nature ou avec une cuillerée de crème fouettée."
        }
      ],
      "astuces": [
        "Choisis un bon chocolat noir à pâtisser, à 60 ou 70 % de cacao : c'est lui qui donne tout son goût à la boisson.",
        "Verser le lait chaud en plusieurs fois sur le chocolat, comme pour une ganache, évite les grumeaux et donne une texture bien lisse.",
        "Pour un chocolat encore plus épais, laisse-le frémir quelques minutes de plus en fouettant : il réduit et devient plus nappant."
      ],
      "choix": {
        "titre": "Garnitures & parfums",
        "mode": "multi",
        "label": "Ta tasse",
        "options": [
          "Crème fouettée",
          "Guimauves",
          "Cannelle",
          "Vanille",
          "Zeste d'orange",
          "Copeaux de chocolat",
          "Cacao en poudre",
          "Pointe de piment"
        ]
      },
      "accords": [
        {
          "titre": "Le classique",
          "texte": "nature, bien chaud, avec une tartine beurrée ou une part de brioche."
        },
        {
          "titre": "Le viennois",
          "texte": "surmonté d'une généreuse cuillerée de crème fouettée."
        },
        {
          "titre": "L'épicé",
          "texte": "un bâton de cannelle et une pointe de piment, comme les boissons de cacao d'autrefois."
        },
        {
          "titre": "L'orangé",
          "texte": "un zeste d'orange infusé dans le lait avec la vanille."
        }
      ],
      "conservation": "Jusqu'à 2 jours au réfrigérateur dans un récipient fermé ; il épaissit en refroidissant. Réchauffe-le doucement à la casserole en fouettant, avec un peu de lait si besoin.",
      "allergenes": [
        "lait"
      ],
      "noteAllergenes": "Certains chocolats contiennent de la lécithine de soja ou des traces de fruits à coque : vérifie l'étiquette.",
      "regime": {
        "sansViande": true,
        "sansPoisson": true
      },
      "origine": {
        "pays": "Mésoamérique, puis Europe",
        "drapeau": "🇲🇽",
        "resume": "Avant d'être une douceur au lait, le chocolat chaud était une boisson de cacao amère, née en Mésoamérique.",
        "faits": [
          "Chez les Mayas puis les Aztèques, le cacao se buvait sous forme d'une boisson amère et non sucrée, à laquelle on ajoutait parfois du piment ou de la farine de maïs.",
          "Arrivé en Europe par l'Espagne au XVIe siècle, il a été adapté au goût européen avec du sucre de canne, de la cannelle et d'autres épices.",
          "En France, son arrivée est traditionnellement associée au mariage de l'infante espagnole Anne d'Autriche avec Louis XIII, en 1615 ; la boisson devient ensuite à la mode à la cour."
        ],
        "sources": [
          {
            "titre": "Hérodote — La saga du chocolat",
            "url": "https://www.herodote.net/La_saga_du_chocolat-synthese-657.php"
          },
          {
            "titre": "History.com — History of Chocolate",
            "url": "https://www.history.com/articles/history-of-chocolate"
          },
          {
            "titre": "Cooper Hewitt (Smithsonian) — Hot chocolate, I love you so",
            "url": "https://www.cooperhewitt.org/2015/03/03/hot-chocolate-i-love-you-so/"
          }
        ]
      }
    }
  ];

  function tempsTotal(recette) {
    const t = recette.temps || {};
    return (t.preparation || 0) + (t.cuisson || 0) + (t.repos || 0);
  }

  window.RECETTES = RECETTES;
  window.RECETTES_META = { CATEGORIES, ALLERGENES, tempsTotal };
})();
