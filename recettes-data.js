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
    }
  ];

  function tempsTotal(recette) {
    const t = recette.temps || {};
    return (t.preparation || 0) + (t.cuisson || 0) + (t.repos || 0);
  }

  window.RECETTES = RECETTES;
  window.RECETTES_META = { CATEGORIES, ALLERGENES, tempsTotal };
})();
