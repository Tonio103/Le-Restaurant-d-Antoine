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
    },

    /* ===================================================================== */
    {
      "key": "boeufwellington",
      "url": "boeuf-wellington.html",
      "titre": "Bœuf Wellington, duxelles et jambon cru",
      "titreCourt": "Bœuf Wellington",
      "alias": [
        "wellington",
        "beef wellington",
        "boeuf en croute",
        "filet de boeuf en croute"
      ],
      "emoji": "🥩",
      "categorie": "plat",
      "badge": "Plat de fête",
      "accroche": "Un filet de bœuf rosé, une duxelles de champignons et une pâte feuilletée dorée : le grand plat de fête.",
      "intro": "Le Wellington, c'est le plat qui impressionne la tablée dès qu'il sort du four : une croûte feuilletée bien dorée, puis, à la découpe, un cœur de filet rosé entouré de champignons et de jambon cru. Il demande de la méthode et un peu de patience, mais chaque étape est simple quand on respecte le froid et les temps.",
      "images": [],
      "cover": {
        "motif": "cloche",
        "fond": "#3a1d12",
        "encre": "#f6efe4",
        "accent": "#e0a83e"
      },
      "temps": {
        "preparation": 45,
        "cuisson": 55,
        "repos": 60
      },
      "difficulte": "Avancé",
      "portions": {
        "base": 6,
        "unite": "personne",
        "pluriel": "personnes",
        "min": 4,
        "max": 12,
        "pas": 2
      },
      "tags": [
        "viande",
        "sale",
        "plat",
        "four",
        "fete",
        "invite",
        "raffine",
        "gastronomique",
        "chaud",
        "hiver",
        "gourmand",
        "dimanche"
      ],
      "ingredients": [
        {
          "groupe": "Pour le filet",
          "items": [
            {
              "nom": "Cœur de filet de bœuf paré (une pièce régulière)",
              "qte": 1000,
              "unite": "g"
            },
            {
              "nom": "Huile neutre",
              "qte": 2,
              "unite": "c. à soupe"
            },
            {
              "nom": "Moutarde de Dijon",
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
          "groupe": "Pour la duxelles",
          "items": [
            {
              "nom": "Champignons de Paris",
              "qte": 500,
              "unite": "g"
            },
            {
              "nom": "Échalotes",
              "qte": 2,
              "unite": "pièce"
            },
            {
              "nom": "Beurre doux",
              "qte": 20,
              "unite": "g"
            },
            {
              "nom": "Thym frais",
              "qte": 2,
              "unite": "brin"
            }
          ]
        },
        {
          "groupe": "Pour le montage",
          "items": [
            {
              "nom": "Jambon cru (Parme ou Bayonne)",
              "qte": 8,
              "unite": "tranche"
            },
            {
              "nom": "Pâte feuilletée pur beurre",
              "qte": 500,
              "unite": "g"
            },
            {
              "nom": "Farine pour le plan de travail",
              "qte": 1,
              "unite": "c. à soupe"
            },
            {
              "nom": "Jaunes d'œufs",
              "qte": 2,
              "unite": "pièce"
            },
            {
              "nom": "Lait",
              "qte": 1,
              "unite": "c. à soupe"
            },
            {
              "nom": "Fleur de sel",
              "qte": null,
              "unite": "",
              "note": "une pincée",
              "optionnel": true
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Saisir le filet",
          "texte": "Sale et poivre le filet sur toutes ses faces. Saisis-le dans une poêle très chaude avec l'huile, environ 1 minute par face (4 à 5 minutes en tout), juste pour le colorer sans le cuire. Hors du feu, badigeonne-le de moutarde et laisse-le refroidir complètement.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Saisie du filet"
            }
          ]
        },
        {
          "titre": "La duxelles",
          "texte": "Hache très finement les champignons et les échalotes (au couteau ou par impulsions au mixeur). Fais-les cuire dans le beurre avec le thym effeuillé, à feu moyen, jusqu'à ce que toute l'eau soit évaporée et que la duxelles forme une pâte sèche qui se détache de la poêle. Sale, poivre et laisse refroidir.",
          "minuteurs": [
            {
              "secondes": 900,
              "label": "Duxelles"
            }
          ]
        },
        {
          "titre": "Le roulé de jambon",
          "texte": "Étale une grande feuille de film alimentaire et dispose le jambon en rectangle, les tranches se chevauchant légèrement. Étale la duxelles froide en couche fine et régulière, pose le filet au bord et roule-le bien serré à l'aide du film. Tourne les extrémités comme une papillote et laisse raffermir au réfrigérateur.",
          "minuteurs": [
            {
              "secondes": 1800,
              "label": "Raffermir au froid"
            }
          ]
        },
        {
          "titre": "L'enveloppe de pâte",
          "texte": "Fouette les jaunes d'œufs avec le lait pour la dorure. Sur le plan fariné, étale la pâte en un rectangle de 3 à 4 mm d'épaisseur, assez grand pour envelopper le filet. Retire le film, pose le filet au centre, badigeonne les bords de dorure et referme la pâte, soudure en dessous ; coupe l'excédent aux extrémités et soude-les bien."
        },
        {
          "titre": "Dorure et froid",
          "texte": "Dépose le Wellington sur une plaque couverte de papier cuisson, badigeonne-le de dorure et remets-le au réfrigérateur. Préchauffe pendant ce temps le four à 200 °C avec une plaque à l'intérieur.",
          "minuteurs": [
            {
              "secondes": 1200,
              "label": "Repos au froid"
            }
          ]
        },
        {
          "titre": "Le décor",
          "texte": "Passe une seconde couche de dorure. Trace un quadrillage léger avec le dos d'un couteau, sans percer la pâte, et parsème d'un peu de fleur de sel."
        },
        {
          "titre": "La cuisson",
          "texte": "Fais glisser le papier et le Wellington sur la plaque chaude et enfourne à 200 °C pour 30 à 35 minutes, jusqu'à ce que la pâte soit bien dorée. Avec un thermomètre piqué au centre, sors-le vers 50 °C à cœur pour un résultat saignant : la température monte encore de quelques degrés pendant le repos, et 5 à 10 minutes de plus au four donnent une viande plus cuite.",
          "minuteurs": [
            {
              "secondes": 1800,
              "label": "Vérifier la cuisson"
            },
            {
              "secondes": 2100,
              "label": "Cuisson complète"
            }
          ]
        },
        {
          "titre": "Repos et découpe",
          "texte": "Laisse reposer le Wellington 10 minutes sur une grille, pour que les jus se répartissent et que la pâte reste croustillante dessous. Tranche-le en parts de 2 cm avec un couteau-scie bien aiguisé, d'un mouvement de va-et-vient sans écraser.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Repos avant découpe"
            }
          ]
        }
      ],
      "astuces": [
        "Une duxelles bien sèche est la clé : si elle contient encore de l'eau, elle détrempe la pâte pendant la cuisson.",
        "Le froid est ton allié : un filet et une pâte bien froids au moment d'enfourner donnent un feuilletage qui gonfle et une viande qui reste rosée.",
        "Enfourner sur une plaque déjà chaude aide le dessous de la pâte à cuire et à croustiller."
      ],
      "choix": {
        "titre": "Accompagnements",
        "mode": "single",
        "label": "Ton accompagnement",
        "options": [
          "Purée au beurre",
          "Haricots verts",
          "Carottes glacées",
          "Pommes fondantes",
          "Épinards au beurre",
          "Jus corsé",
          "Sauce au vin rouge"
        ]
      },
      "accords": [
        {
          "titre": "Le classique",
          "texte": "une purée de pommes de terre au beurre et des haricots verts croquants."
        },
        {
          "titre": "Côté sauce",
          "texte": "un jus de viande corsé ou une sauce réduite au vin rouge, servis à part."
        },
        {
          "titre": "Côté légumes",
          "texte": "des carottes glacées et quelques champignons rôtis."
        },
        {
          "titre": "Côté vin",
          "texte": "un vin rouge structuré, à servir avec modération."
        }
      ],
      "conservation": "Il est meilleur à la sortie du four. Les restes se gardent 2 jours au réfrigérateur, bien emballés ; réchauffe-les au four plutôt qu'au micro-ondes (la viande sera alors plus cuite).",
      "allergenes": [
        "gluten",
        "oeufs",
        "lait",
        "moutarde"
      ],
      "noteAllergenes": "Certaines moutardes de Dijon contiennent un conservateur à base de sulfites : vérifie l'étiquette, comme celle de ta pâte feuilletée et de ton jambon cru.",
      "regime": {
        "sansViande": false,
        "sansPoisson": true
      },
      "origine": {
        "pays": "Royaume-Uni (origine disputée)",
        "drapeau": "🇬🇧",
        "resume": "Grand classique des repas de fête associé à la cuisine britannique, dont l'origine du nom reste incertaine.",
        "faits": [
          "Le nom est souvent rattaché au duc de Wellington, vainqueur de Waterloo, mais aucun lien direct avec lui n'est établi.",
          "Selon Wikipédia, un livre de cuisine autrichien de 1891 décrit déjà un « Filet à la Wellington » enveloppé de pâte, sans champignons, et le nom apparaît sur un menu de la compagnie Hamburg-America daté du 10 novembre 1899.",
          "Les dates divergent selon les sources : l'encyclopédie Britannica fait remonter la première mention connue du bœuf « à la Wellington » à 1903 seulement."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Beef Wellington",
            "url": "https://en.wikipedia.org/wiki/Beef_Wellington"
          },
          {
            "titre": "National Geographic — How beef wellington became a British classic",
            "url": "https://www.nationalgeographic.com/travel/article/how-beef-wellington-became-a-british-classic"
          },
          {
            "titre": "Britannica — Beef Wellington",
            "url": "https://www.britannica.com/topic/beef-Wellington"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "magretmielepices",
      "url": "magret-miel-epices.html",
      "titre": "Magret de canard au miel et aux épices",
      "titreCourt": "Magret au miel",
      "alias": [
        "magret de canard",
        "magret au miel",
        "canard au miel",
        "magret laque"
      ],
      "emoji": "🦆",
      "categorie": "plat",
      "badge": "Bistrot chic",
      "accroche": "Une peau croustillante, une chair rosée et une sauce laquée au miel et aux épices : le chic du Sud-Ouest.",
      "intro": "Le magret, c'est le chic du Sud-Ouest à portée de poêle : une peau bien croustillante, une chair rosée et fondante. Ici, une sauce au miel, aux épices et au vinaigre de Xérès vient le laquer pour un sucré-salé tout en équilibre.",
      "images": [],
      "cover": {
        "motif": "poele",
        "fond": "#4a1426",
        "encre": "#f6efe4",
        "accent": "#f2a93b"
      },
      "temps": {
        "preparation": 15,
        "cuisson": 15,
        "repos": 25
      },
      "difficulte": "Facile",
      "portions": {
        "base": 4,
        "unite": "personne",
        "pluriel": "personnes",
        "min": 2,
        "max": 12,
        "pas": 2
      },
      "tags": [
        "viande",
        "francais",
        "traditionnel",
        "sale",
        "plat",
        "raffine",
        "gastronomique",
        "romantique",
        "invite",
        "chaud",
        "gourmand"
      ],
      "ingredients": [
        {
          "groupe": "Pour les magrets",
          "items": [
            {
              "nom": "Magrets de canard (environ 350 g chacun)",
              "qte": 2,
              "unite": "pièce"
            },
            {
              "nom": "Sel et poivre",
              "qte": null,
              "unite": "",
              "note": "selon le goût"
            },
            {
              "nom": "Fleur de sel",
              "qte": null,
              "unite": "",
              "note": "une pincée",
              "optionnel": true
            }
          ]
        },
        {
          "groupe": "Pour la sauce au miel",
          "items": [
            {
              "nom": "Miel liquide",
              "qte": 3,
              "unite": "c. à soupe"
            },
            {
              "nom": "Vinaigre de Xérès",
              "qte": 2,
              "unite": "c. à soupe"
            },
            {
              "nom": "Mélange cinq-épices",
              "qte": 1,
              "unite": "c. à café"
            },
            {
              "nom": "Bouillon de volaille",
              "qte": 100,
              "unite": "ml"
            },
            {
              "nom": "Beurre froid",
              "qte": 15,
              "unite": "g"
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Tempérer les magrets",
          "texte": "Sors les magrets du réfrigérateur 20 minutes avant la cuisson : une viande moins froide cuit plus régulièrement. Retire au couteau le petit nerf et le gras qui dépasse sur les bords.",
          "minuteurs": [
            {
              "secondes": 1200,
              "label": "Tempérer"
            }
          ]
        },
        {
          "titre": "Quadriller la peau",
          "texte": "Incise la peau en croisillons tous les centimètres environ, avec un couteau bien aiguisé, en entaillant le gras sans jamais atteindre la chair. Sale le côté peau juste avant la cuisson."
        },
        {
          "titre": "Préparer la sauce",
          "texte": "Dans un bol, mélange le miel, le vinaigre de Xérès et le cinq-épices. Garde le bouillon et le beurre froid à portée de main : la sauce se fait en quelques minutes à la fin."
        },
        {
          "titre": "Côté peau",
          "texte": "Pose les magrets côté peau dans une poêle froide, puis chauffe à feu moyen : le gras fond doucement et la peau devient croustillante sans brûler. Compte environ 8 minutes et retire le gras fondu à la cuillère au fur et à mesure.",
          "minuteurs": [
            {
              "secondes": 480,
              "label": "Côté peau"
            }
          ]
        },
        {
          "titre": "Côté chair",
          "texte": "Retourne les magrets et poursuis 3 à 4 minutes côté chair. Poivre ; pour un résultat rosé, sors-les vers 55 °C à cœur avec un thermomètre, la température montant encore un peu pendant le repos.",
          "minuteurs": [
            {
              "secondes": 240,
              "label": "Côté chair"
            }
          ]
        },
        {
          "titre": "Le repos",
          "texte": "Dépose les magrets sur une grille, peau vers le haut, et couvre-les sans serrer d'une feuille d'aluminium. Le repos détend la viande et laisse les jus se répartir.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Repos"
            }
          ]
        },
        {
          "titre": "La sauce laquée",
          "texte": "Vide le gras de la poêle sans retirer les sucs. Verse le mélange miel-vinaigre-épices et le bouillon, gratte le fond avec une spatule et laisse réduire 2 à 3 minutes, jusqu'à une sauce sirupeuse qui nappe la cuillère. Hors du feu, ajoute le beurre froid en remuant pour la rendre brillante.",
          "minuteurs": [
            {
              "secondes": 180,
              "label": "Réduction de la sauce"
            }
          ]
        },
        {
          "titre": "Trancher et servir",
          "texte": "Badigeonne la peau d'un peu de sauce, puis tranche les magrets en biais en tranches d'1 cm. Nappe du reste de sauce, ajoute une pincée de fleur de sel et sers aussitôt."
        }
      ],
      "astuces": [
        "Démarrer côté peau dans une poêle froide laisse le gras fondre progressivement : la peau devient fine et croustillante au lieu de rester épaisse et caoutchouteuse.",
        "Garde la graisse de canard fondue dans un bocal au réfrigérateur : elle est parfaite pour faire rissoler des pommes de terre.",
        "Ajoute le miel seulement pour la sauce, en fin de cuisson : dans une poêle très chaude, il brûle en quelques secondes et devient amer."
      ],
      "choix": {
        "titre": "Accompagnements",
        "mode": "single",
        "label": "Ton accompagnement",
        "options": [
          "Pommes sarladaises",
          "Purée de patate douce",
          "Navets glacés",
          "Haricots verts",
          "Poêlée de figues",
          "Mesclun aux noix",
          "Gratin dauphinois"
        ]
      },
      "accords": [
        {
          "titre": "Le Sud-Ouest",
          "texte": "des pommes de terre sautées dans la graisse de canard, à l'ail et au persil."
        },
        {
          "titre": "Le fruité",
          "texte": "quelques figues ou quartiers de pêche poêlés dans la sauce au miel."
        },
        {
          "titre": "Le plus léger",
          "texte": "une salade verte aux noix et des haricots verts croquants."
        },
        {
          "titre": "Côté vin",
          "texte": "un vin rouge du Sud-Ouest, à servir avec modération."
        }
      ],
      "conservation": "Le magret se déguste juste cuit. Les restes se gardent 2 jours au réfrigérateur, bien emballés : sers-les plutôt froids, en fines tranches sur une salade.",
      "allergenes": [
        "lait",
        "sulfites"
      ],
      "noteAllergenes": "Vérifie aussi la composition de ton bouillon (il contient parfois du céleri) et de ton mélange d'épices.",
      "regime": {
        "sansViande": false,
        "sansPoisson": true
      },
      "origine": {
        "pays": "France (Gascogne)",
        "drapeau": "🇫🇷",
        "resume": "Selon le récit le plus répandu, le magret grillé et servi rosé est né à Auch, dans le Gers.",
        "faits": [
          "L'office de tourisme d'Auch attribue l'invention du magret au chef André Daguin, à l'Hôtel de France d'Auch, en 1959.",
          "D'après l'AFP, la maison était réputée pour ses cuisses de canard confites : le chef aurait eu l'idée de griller les filets et de les servir saignants, comme des steaks.",
          "André Daguin est mort à Auch le 3 décembre 2019, à 84 ans ; la presse l'a alors salué comme le chef qui avait « inventé » le magret de canard."
        ],
        "sources": [
          {
            "titre": "Office de tourisme d'Auch — The duck breast is born",
            "url": "https://en.auch-tourisme.com/the-duck-breast-is-born/"
          },
          {
            "titre": "Gulf News (AFP) — French chef who 'invented' magret de canard dies aged 84",
            "url": "https://gulfnews.com/world/europe/french-chef-who-invented-magret-de-canard-dies-aged-84-1.1575464497945"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "coqauvin",
      "url": "coq-au-vin.html",
      "titre": "Coq au vin, garniture bourguignonne",
      "titreCourt": "Coq au vin",
      "alias": [
        "coq au vin rouge",
        "poulet au vin",
        "coq au vin bourguignon"
      ],
      "emoji": "🐓",
      "categorie": "plat",
      "badge": "Grand classique",
      "accroche": "Volaille marinée une nuit puis mijotée au vin rouge, avec lardons, champignons et petits oignons glacés.",
      "intro": "Le coq au vin, c'est la patience récompensée : une nuit de marinade, une longue cuisson douce, et une sauce sombre, brillante et profonde. Les lardons, les champignons et les petits oignons glacés ajoutés à la fin lui donnent tout son caractère de grand plat du dimanche.",
      "images": [],
      "cover": {
        "motif": "cocotte",
        "fond": "#2c0d1c",
        "encre": "#f6efe4",
        "accent": "#d2334f"
      },
      "temps": {
        "preparation": 40,
        "cuisson": 220,
        "repos": 720
      },
      "difficulte": "Intermédiaire",
      "portions": {
        "base": 6,
        "unite": "personne",
        "pluriel": "personnes",
        "min": 4,
        "max": 12,
        "pas": 2
      },
      "tags": [
        "viande",
        "traditionnel",
        "francais",
        "sale",
        "plat",
        "mijote",
        "chaud",
        "hiver",
        "reconfort",
        "dimanche",
        "convivial",
        "invite",
        "gastronomique",
        "copieux"
      ],
      "ingredients": [
        {
          "groupe": "Pour la marinade",
          "items": [
            {
              "nom": "Coq (ou gros poulet fermier) découpé en 8 à 10 morceaux",
              "qte": 2500,
              "unite": "g"
            },
            {
              "nom": "Vin rouge corsé (type bourgogne)",
              "qte": 750,
              "unite": "ml"
            },
            {
              "nom": "Carotte",
              "qte": 1,
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
              "nom": "Bouquet garni (thym, laurier, persil)",
              "qte": 1,
              "unite": "bouquet",
              "fixe": true
            }
          ]
        },
        {
          "groupe": "Pour la cuisson",
          "items": [
            {
              "nom": "Lardons fumés",
              "qte": 200,
              "unite": "g"
            },
            {
              "nom": "Huile neutre",
              "qte": 2,
              "unite": "c. à soupe"
            },
            {
              "nom": "Farine de blé",
              "qte": 2,
              "unite": "c. à soupe"
            },
            {
              "nom": "Bouillon de volaille",
              "qte": 250,
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
              "qte": 40,
              "unite": "g"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 1,
              "unite": "pincée",
              "fixe": true
            },
            {
              "nom": "Persil plat",
              "qte": 4,
              "unite": "brin",
              "optionnel": true
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "La marinade",
          "texte": "La veille, coupe la carotte en rondelles, émince l'oignon et écrase l'ail. Mets les morceaux de volaille dans un grand saladier avec ces légumes et le bouquet garni, poivre et couvre de vin rouge. Filme et laisse mariner au réfrigérateur.",
          "minuteurs": [
            {
              "secondes": 43200,
              "label": "Marinade (12 h)"
            }
          ]
        },
        {
          "titre": "Égoutter et sécher",
          "texte": "Égoutte la volaille dans une passoire posée sur un saladier : garde le vin d'un côté, les légumes et le bouquet garni de l'autre. Sèche soigneusement chaque morceau avec du papier absorbant, sinon il bouillira au lieu de dorer. Porte le vin à ébullition dans une casserole et écume la mousse grise qui remonte."
        },
        {
          "titre": "Les lardons",
          "texte": "Dans une grande cocotte, fais dorer les lardons à sec à feu moyen jusqu'à ce qu'ils rendent leur gras et deviennent croustillants. Retire-les avec une écumoire et réserve-les pour la garniture.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Lardons"
            }
          ]
        },
        {
          "titre": "Dorer la volaille",
          "texte": "Ajoute l'huile au gras des lardons et fais dorer les morceaux de volaille sur toutes les faces, en commençant côté peau, en deux ou trois fois pour ne pas surcharger la cocotte. Sale légèrement et réserve.",
          "minuteurs": [
            {
              "secondes": 900,
              "label": "Dorage de la volaille"
            }
          ]
        },
        {
          "titre": "Singer",
          "texte": "Fais revenir les légumes de la marinade 5 minutes dans la cocotte. Remets la volaille, saupoudre de farine et remue 1 à 2 minutes à feu moyen pour cuire la farine : c'est elle qui liera la sauce.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Légumes et farine"
            }
          ]
        },
        {
          "titre": "Mouiller et mijoter",
          "texte": "Verse le vin chaud écumé et le bouillon, ajoute le bouquet garni : le liquide doit presque couvrir la viande. Porte à frémissement, couvre et laisse cuire à feu très doux, environ 2 h 30 à 3 h pour un coq ou 1 h 15 pour un poulet fermier, jusqu'à ce que la chair se détache facilement de l'os.",
          "minuteurs": [
            {
              "secondes": 4500,
              "label": "Poulet fermier"
            },
            {
              "secondes": 9000,
              "label": "Coq : vérifier"
            },
            {
              "secondes": 10800,
              "label": "Coq"
            }
          ]
        },
        {
          "titre": "La garniture",
          "texte": "Pendant ce temps, mets les oignons grelots épluchés dans une poêle avec la moitié du beurre, le sucre et de l'eau à mi-hauteur ; cuis jusqu'à évaporation complète, puis roule-les dans le beurre pour les glacer. Dans une autre poêle, fais sauter les champignons coupés en quartiers dans le reste du beurre à feu vif, puis ajoute les lardons.",
          "minuteurs": [
            {
              "secondes": 900,
              "label": "Oignons glacés"
            },
            {
              "secondes": 300,
              "label": "Champignons"
            }
          ]
        },
        {
          "titre": "Réduire la sauce",
          "texte": "Sors les morceaux de volaille. Filtre la sauce dans une passoire pour retirer les légumes et le bouquet garni, puis fais-la réduire à feu vif jusqu'à ce qu'elle nappe le dos d'une cuillère. Goûte et rectifie l'assaisonnement.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Réduction"
            }
          ]
        },
        {
          "titre": "L'assemblage",
          "texte": "Remets la volaille dans la sauce avec les oignons glacés, les champignons et les lardons, puis laisse réchauffer doucement quelques minutes. Parsème de persil ciselé et sers bien chaud.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Réchauffer ensemble"
            }
          ]
        }
      ],
      "astuces": [
        "Fais bouillir et écume le vin de la marinade avant de l'utiliser : la sauce sera plus nette et plus brillante.",
        "Un vrai coq est plus ferme qu'un poulet et demande une cuisson bien plus longue : vérifie la tendreté avec la pointe d'un couteau plutôt qu'à la montre.",
        "Comme beaucoup de plats mijotés, le coq au vin gagne à être préparé la veille : dégraisse alors facilement la surface figée au froid avant de le réchauffer."
      ],
      "securite": "Fais mariner la volaille crue au réfrigérateur, jamais à température ambiante, et lave-toi les mains, la planche et les ustensiles après l'avoir manipulée. Le vin de la marinade a été en contact avec la viande crue : utilise-le seulement porté à ébullition puis cuit longuement avec la volaille, jamais cru dans une sauce. La volaille doit être cuite à cœur, sans trace rosée près de l'os : selon l'Anses, une cuisson à cœur au-delà de 65 °C détruit les bactéries comme Campylobacter.",
      "sourcesSecurite": [
        {
          "titre": "Anses — Campylobactériose",
          "url": "https://www.anses.fr/fr/content/campylobacteriose"
        },
        {
          "titre": "Santé Canada — Conseils sur la salubrité de la volaille",
          "url": "https://www.canada.ca/fr/sante-canada/services/salubrite-viandes-volailles-poissons-et-fruits-mer/conseils-salubrite-volaille.html"
        }
      ],
      "choix": {
        "titre": "Accompagnements",
        "mode": "single",
        "label": "Ton accompagnement",
        "options": [
          "Pommes vapeur",
          "Purée maison",
          "Tagliatelles fraîches",
          "Croûtons aillés",
          "Pain de campagne",
          "Carottes fondantes"
        ]
      },
      "accords": [
        {
          "titre": "Le traditionnel",
          "texte": "des pommes de terre vapeur pour profiter de la sauce."
        },
        {
          "titre": "Le gourmand",
          "texte": "une purée maison au beurre."
        },
        {
          "titre": "À la bourguignonne",
          "texte": "quelques croûtons frits à l'ail posés sur le plat au moment de servir."
        },
        {
          "titre": "Côté vin",
          "texte": "un vin rouge de la même région que celui de la sauce, à servir avec modération."
        }
      ],
      "conservation": "Jusqu'à 2 jours au réfrigérateur dans une boîte hermétique. Réchauffe doucement à couvert, à feu doux, en remuant de temps en temps.",
      "allergenes": [
        "gluten",
        "lait",
        "sulfites"
      ],
      "noteAllergenes": "La sauce est à base de vin : même après une longue cuisson, une partie de l'alcool peut subsister. Pour une version sans alcool, remplace le vin par du bouillon de volaille corsé additionné d'un peu de jus de raisin rouge et d'une cuillère de vinaigre. Vérifie aussi ton bouillon (céleri possible).",
      "regime": {
        "sansViande": false,
        "sansPoisson": true
      },
      "origine": {
        "pays": "France",
        "drapeau": "🇫🇷",
        "resume": "Volaille mijotée au vin, devenue l'un des plats emblématiques de la cuisine française.",
        "faits": [
          "Des légendes rattachent le coq au vin à la Gaule et à Jules César, mais elles ne reposent sur aucune preuve : la recette n'est documentée par écrit qu'au début du XXe siècle.",
          "Une recette assez proche, le poulet au vin blanc, figure déjà dans un livre de cuisine de 1864.",
          "Julia Child l'a fait connaître aux États-Unis : elle l'a inclus dans « Mastering the Art of French Cooking » (1961), coécrit avec Simone Beck et Louisette Bertholle, et l'a cuisiné dans son émission « The French Chef »."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Coq au vin",
            "url": "https://en.wikipedia.org/wiki/Coq_au_vin"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "navarinagneau",
      "url": "navarin-agneau.html",
      "titre": "Navarin d'agneau printanier",
      "titreCourt": "Navarin d'agneau",
      "alias": [
        "navarin",
        "navarin printanier",
        "ragout d'agneau",
        "agneau aux petits legumes"
      ],
      "emoji": "🥕",
      "categorie": "plat",
      "badge": "Printanier",
      "accroche": "Un ragoût d'agneau fondant, mijoté doucement avec carottes, navets, grelots et petits pois nouveaux.",
      "intro": "Le navarin, c'est le ragoût qui annonce le printemps : un agneau doré puis mijoté jusqu'à devenir fondant, dans une sauce légèrement tomatée. Les légumes nouveaux arrivent en fin de cuisson pour garder leurs couleurs et leur croquant.",
      "images": [],
      "cover": {
        "motif": "bol",
        "fond": "#1f3a28",
        "encre": "#f6efe4",
        "accent": "#f08a24"
      },
      "temps": {
        "preparation": 30,
        "cuisson": 115,
        "repos": 0
      },
      "difficulte": "Facile",
      "portions": {
        "base": 6,
        "unite": "personne",
        "pluriel": "personnes",
        "min": 2,
        "max": 12,
        "pas": 2
      },
      "tags": [
        "viande",
        "traditionnel",
        "francais",
        "sale",
        "plat",
        "mijote",
        "chaud",
        "dimanche",
        "familial",
        "convivial",
        "invite",
        "gastronomique",
        "frais"
      ],
      "ingredients": [
        {
          "groupe": "Pour la viande",
          "items": [
            {
              "nom": "Épaule d'agneau désossée (ou mélange épaule et collier)",
              "qte": 1200,
              "unite": "g"
            },
            {
              "nom": "Huile d'olive",
              "qte": 2,
              "unite": "c. à soupe"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 1,
              "unite": "pincée",
              "fixe": true
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
              "nom": "Concentré de tomate",
              "qte": 1,
              "unite": "c. à soupe"
            },
            {
              "nom": "Vin blanc sec",
              "qte": 150,
              "unite": "ml",
              "optionnel": true
            },
            {
              "nom": "Bouillon de volaille (ou eau)",
              "qte": 750,
              "unite": "ml"
            },
            {
              "nom": "Bouquet garni (thym, laurier, persil)",
              "qte": 1,
              "unite": "bouquet",
              "fixe": true
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
          "groupe": "Pour les légumes printaniers",
          "items": [
            {
              "nom": "Carottes nouvelles",
              "qte": 6,
              "unite": "pièce"
            },
            {
              "nom": "Navets nouveaux",
              "qte": 6,
              "unite": "pièce"
            },
            {
              "nom": "Petits oignons grelots",
              "qte": 12,
              "unite": "pièce"
            },
            {
              "nom": "Pommes de terre nouvelles (grenailles)",
              "qte": 500,
              "unite": "g"
            },
            {
              "nom": "Petits pois écossés (frais ou surgelés)",
              "qte": 200,
              "unite": "g"
            },
            {
              "nom": "Persil plat ou cerfeuil",
              "qte": 4,
              "unite": "brin",
              "optionnel": true
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "La mise en place",
          "texte": "Coupe l'agneau en cubes d'environ 5 cm en retirant l'excès de gras, puis sèche-les avec du papier absorbant. Émince l'oignon, écrase l'ail. Épluche les carottes et les navets en gardant un petit bout de fane, coupe les plus gros en deux, épluche les grelots et lave les pommes de terre."
        },
        {
          "titre": "Dorer l'agneau",
          "texte": "Fais chauffer l'huile dans une cocotte à feu vif et dore la viande en plusieurs fois, sans surcharger, pour qu'elle colore au lieu de bouillir. Sale, poivre et réserve chaque fournée au fur et à mesure.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Dorage de l'agneau"
            }
          ]
        },
        {
          "titre": "Singer",
          "texte": "Retire l'excès de gras de la cocotte, ajoute l'oignon et l'ail et fais-les revenir 2 à 3 minutes. Remets toute la viande, saupoudre-la de la pincée de sucre pour la caraméliser légèrement, puis de farine, et remue 1 à 2 minutes pour cuire la farine. Incorpore enfin le concentré de tomate.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Aromates et farine"
            }
          ]
        },
        {
          "titre": "Mouiller",
          "texte": "Déglace au vin blanc (ou avec une louche de bouillon) en grattant les sucs du fond, puis verse le bouillon jusqu'à couvrir juste la viande. Ajoute le bouquet garni, porte à frémissement et écume la surface."
        },
        {
          "titre": "Le mijotage",
          "texte": "Couvre et laisse mijoter à tout petits frémissements, à feu très doux, pendant 1 heure. La viande doit commencer à devenir tendre sous la pointe d'un couteau.",
          "minuteurs": [
            {
              "secondes": 3600,
              "label": "Mijotage de l'agneau"
            }
          ]
        },
        {
          "titre": "Les légumes nouveaux",
          "texte": "Ajoute les carottes, les navets, les grelots et les pommes de terre en les enfonçant dans la sauce. Couvre et poursuis la cuisson jusqu'à ce que les légumes soient tendres et la viande fondante.",
          "minuteurs": [
            {
              "secondes": 1800,
              "label": "Cuisson des légumes"
            }
          ]
        },
        {
          "titre": "Les petits pois",
          "texte": "Ajoute les petits pois et laisse cuire à découvert pour qu'ils restent bien verts et que la sauce réduise un peu. Avec des petits pois surgelés, 5 à 8 minutes suffisent.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Petits pois"
            }
          ]
        },
        {
          "titre": "La finition",
          "texte": "Retire le bouquet garni et enlève à la cuillère le gras qui flotte en surface. Goûte, rectifie l'assaisonnement et parsème de persil ou de cerfeuil ciselé au moment de servir."
        }
      ],
      "astuces": [
        "Préfère l'épaule ou le collier au gigot : ces morceaux plus gras et plus gélatineux restent moelleux après une longue cuisson.",
        "Sèche bien la viande et dore-la en petites quantités : c'est cette coloration qui donne son goût et sa couleur à la sauce.",
        "Ajoute les légumes selon leur temps de cuisson : les racines d'abord, les petits pois à la toute fin, pour qu'aucun ne se transforme en purée."
      ],
      "choix": {
        "titre": "Légumes & variantes",
        "mode": "multi",
        "label": "Ta composition",
        "options": [
          "Carottes fanes",
          "Navets nouveaux",
          "Petits pois",
          "Fèves",
          "Haricots verts",
          "Pommes grenailles",
          "Cerfeuil frais",
          "Pointe de romarin"
        ]
      },
      "accords": [
        {
          "titre": "Le printanier",
          "texte": "carottes fanes, navets, petits pois et cerfeuil."
        },
        {
          "titre": "Le plus vert",
          "texte": "des fèves et des haricots verts ajoutés avec les petits pois."
        },
        {
          "titre": "Le parfumé",
          "texte": "une petite branche de romarin glissée dans le bouquet garni."
        },
        {
          "titre": "Côté vin",
          "texte": "un vin rouge léger et fruité, à servir avec modération."
        }
      ],
      "conservation": "Jusqu'à 2 jours au réfrigérateur dans une boîte hermétique. Réchauffe doucement à couvert, avec un peu de bouillon si la sauce a épaissi.",
      "allergenes": [
        "gluten",
        "sulfites"
      ],
      "noteAllergenes": "Les sulfites ne concernent que la version au vin blanc. Si tu le supprimes, déglace simplement avec un peu de bouillon. Vérifie aussi ton bouillon (céleri possible).",
      "regime": {
        "sansViande": false,
        "sansPoisson": true
      },
      "origine": {
        "pays": "France",
        "drapeau": "🇫🇷",
        "resume": "Ragoût de la cuisine française, d'agneau ou de mouton, dont la version printanière associe l'agneau aux légumes nouveaux.",
        "faits": [
          "Le plat existait avant son nom actuel : on parlait de « haricot de mouton », un terme sans rapport avec le haricot, venu de l'ancien français « hericoq » qui désignait un ragoût.",
          "L'origine du mot « navarin » est discutée : le Dictionnaire de l'Académie française le rattache au navet, tandis qu'une explication populaire y voit un clin d'œil à la bataille navale de Navarin, en 1827.",
          "Dès 1693, « Le Cuisinier royal et bourgeois » de François Massialot décrit un haricot de côtelettes de mouton aux navets."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Navarin (food)",
            "url": "https://en.wikipedia.org/wiki/Navarin_(food)"
          },
          {
            "titre": "La langue française — définition de « navarin »",
            "url": "https://www.lalanguefrancaise.com/dictionnaire/definition/navarin"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "solemeuniere",
      "url": "sole-meuniere.html",
      "titre": "Sole meunière au beurre noisette",
      "titreCourt": "Sole meunière",
      "alias": [
        "sole meuniere",
        "sole a la meuniere",
        "sole au beurre noisette"
      ],
      "emoji": "🐟",
      "categorie": "plat",
      "badge": "Grand classique",
      "accroche": "Une sole farinée, dorée au beurre puis nappée de beurre noisette, citron et persil : le chic français.",
      "intro": "Le grand classique des brasseries françaises, d'une simplicité désarmante : une sole légèrement farinée, dorée au beurre, puis arrosée d'un beurre noisette citronné. Tout se joue sur la chaleur de la poêle et sur la couleur du beurre.",
      "images": [],
      "cover": {
        "motif": "poisson",
        "fond": "#16324a",
        "encre": "#f6efe4",
        "accent": "#f2c230"
      },
      "temps": {
        "preparation": 10,
        "cuisson": 12,
        "repos": 0
      },
      "difficulte": "Intermédiaire",
      "portions": {
        "base": 2,
        "unite": "personne",
        "pluriel": "personnes",
        "min": 1,
        "max": 6
      },
      "tags": [
        "poisson",
        "francais",
        "traditionnel",
        "sale",
        "plat",
        "chaud",
        "raffine",
        "gastronomique",
        "romantique",
        "invite",
        "rapide",
        "fete"
      ],
      "ingredients": [
        {
          "groupe": "Pour les soles",
          "items": [
            {
              "nom": "Soles entières de 350 à 400 g (vidées, peau noire retirée)",
              "qte": 2,
              "unite": "pièce"
            },
            {
              "nom": "Farine de blé",
              "qte": 40,
              "unite": "g"
            },
            {
              "nom": "Huile neutre",
              "qte": 2,
              "unite": "c. à soupe"
            },
            {
              "nom": "Beurre doux (pour la cuisson)",
              "qte": 20,
              "unite": "g"
            },
            {
              "nom": "Sel fin et poivre blanc",
              "qte": null,
              "unite": "",
              "note": "selon le goût"
            }
          ]
        },
        {
          "groupe": "Pour le beurre meunière",
          "items": [
            {
              "nom": "Beurre doux",
              "qte": 60,
              "unite": "g"
            },
            {
              "nom": "Citron jaune",
              "qte": 1,
              "unite": "pièce"
            },
            {
              "nom": "Persil plat ciselé",
              "qte": 2,
              "unite": "c. à soupe"
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "La mise en place",
          "texte": "Coupe les nageoires des soles aux ciseaux, rince-les et sèche-les soigneusement avec du papier absorbant : un poisson humide ne dore pas. Cisèle le persil, presse le jus d'un demi-citron et coupe l'autre moitié en quartiers."
        },
        {
          "titre": "Fariner",
          "texte": "Sale et poivre les deux faces, puis passe les soles dans la farine. Tapote-les pour ne garder qu'un voile très fin : trop de farine formerait une croûte pâteuse."
        },
        {
          "titre": "Première face",
          "texte": "Fais chauffer l'huile dans une grande poêle à feu moyen-vif, puis ajoute le beurre de cuisson. Quand il mousse, dépose les soles côté où la peau noire a été retirée (celui qui sera présenté sur l'assiette) et laisse dorer environ 4 minutes sans les bouger, en les arrosant de beurre mousseux.",
          "minuteurs": [
            {
              "secondes": 240,
              "label": "Première face"
            }
          ]
        },
        {
          "titre": "Seconde face",
          "texte": "Retourne délicatement les soles avec une large spatule et cuis encore 3 à 4 minutes. Elles sont cuites quand la chair se détache de l'arête centrale près de la tête : vérifie avec la pointe d'un couteau.",
          "minuteurs": [
            {
              "secondes": 210,
              "label": "Seconde face"
            }
          ]
        },
        {
          "titre": "Au chaud",
          "texte": "Dépose les soles sur des assiettes chaudes, face dorée dessus. Jette le gras de cuisson et essuie la poêle avec du papier absorbant."
        },
        {
          "titre": "Le beurre noisette",
          "texte": "Fais fondre le beurre dans la poêle à feu moyen. Laisse-le mousser puis prendre une couleur noisette et une odeur de biscuit, en 2 à 3 minutes : arrête-toi avant qu'il ne fonce.",
          "minuteurs": [
            {
              "secondes": 150,
              "label": "Beurre noisette"
            }
          ]
        },
        {
          "titre": "La finition",
          "texte": "Hors du feu, verse le jus de citron (attention aux projections) et le persil, puis nappe aussitôt les soles de ce beurre mousseux. Sers avec les quartiers de citron."
        },
        {
          "titre": "Lever les filets",
          "texte": "À table, écarte d'abord les petites arêtes des bords avec le dos d'une cuillère, puis glisse la cuillère le long de la ligne centrale pour détacher les deux filets du dessus. Soulève ensuite l'arête d'un seul tenant pour dégager les filets du dessous."
        }
      ],
      "astuces": [
        "Demande au poissonnier de vider les soles, d'ôter la peau noire et d'écailler la peau blanche : c'est la préparation classique pour la meunière, et il le fait en un instant.",
        "Farine les soles au tout dernier moment : si elles attendent, la farine absorbe l'humidité du poisson et devient collante.",
        "Si ta poêle ne peut pas accueillir deux soles sans qu'elles se chevauchent, cuis-les l'une après l'autre et garde la première au chaud dans le four tiède, porte entrouverte."
      ],
      "choix": {
        "titre": "Accompagnements",
        "mode": "single",
        "label": "Ton choix",
        "options": [
          "Pommes vapeur",
          "Grenailles rôties",
          "Épinards au beurre",
          "Haricots verts",
          "Riz pilaf",
          "Purée maison",
          "Poireaux fondants"
        ]
      },
      "accords": [
        {
          "titre": "La tradition",
          "texte": "des pommes de terre vapeur persillées, qui boivent le beurre noisette."
        },
        {
          "titre": "Le vert",
          "texte": "des épinards tombés au beurre ou des haricots verts fins."
        },
        {
          "titre": "À la grenobloise",
          "texte": "des câpres, des petits dés de citron et des croûtons ajoutés au beurre noisette."
        },
        {
          "titre": "Côté vin",
          "texte": "un vin blanc sec et minéral, servi bien frais."
        }
      ],
      "conservation": "À déguster dès la sortie de la poêle : en attendant, la sole perd son croustillant et sèche. Les restes se gardent 1 jour au réfrigérateur dans une boîte hermétique.",
      "allergenes": [
        "poisson",
        "gluten",
        "lait"
      ],
      "regime": {
        "sansViande": true,
        "sansPoisson": false
      },
      "origine": {
        "pays": "France",
        "drapeau": "🇫🇷",
        "resume": "Une préparation emblématique de la cuisine classique française, dont le nom évoque la farine du moulin.",
        "faits": [
          "« À la meunière » signifie « à la manière de la meunière », la femme du meunier : le nom renvoie à la farine dans laquelle on passe le poisson avant de le cuire au beurre.",
          "Auguste Escoffier en donne une recette au début du XXe siècle : Gault&Millau la situe dans son Guide culinaire de 1903, tandis que Wikipédia renvoie à un texte de 1907.",
          "Julia Child racontait que la sole meunière dégustée en 1948 au restaurant La Couronne, à Rouen, lors de son premier repas en France, lui avait fait découvrir la cuisine française."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Sole meunière",
            "url": "https://en.wikipedia.org/wiki/Sole_meuni%C3%A8re"
          },
          {
            "titre": "Gault&Millau — La sole meunière, nouveau luxe",
            "url": "https://fr.gaultmillau.com/fr/news/la-sole-meuniere-nouveau-luxe"
          },
          {
            "titre": "Tasting Table — The classic fish dish that sparked Julia Child's love for French cuisine",
            "url": "https://www.tastingtable.com/1938429/julia-child-fish-dish-love-for-french-cuisine-sole-meuniere"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "saintjacquesbeurreblanc",
      "url": "saint-jacques-beurre-blanc.html",
      "titre": "Noix de Saint-Jacques poêlées, beurre blanc",
      "titreCourt": "Saint-Jacques beurre blanc",
      "alias": [
        "saint jacques poelees",
        "coquilles saint jacques",
        "noix de saint jacques",
        "beurre blanc nantais"
      ],
      "emoji": "🐚",
      "categorie": "plat",
      "badge": "Gastronomique",
      "accroche": "Des noix saisies au cœur nacré et un beurre blanc soyeux monté au fouet : le grand jeu en moins de 30 minutes.",
      "intro": "Un duo de fête d'une grande élégance : des Saint-Jacques bien dorées dehors, fondantes dedans, et la sauce emblématique des bords de Loire. Le beurre blanc ne demande qu'un fouet, du beurre bien froid et un feu tout doux.",
      "images": [],
      "cover": {
        "motif": "coquille",
        "fond": "#26324f",
        "encre": "#f6efe4",
        "accent": "#f4a259"
      },
      "temps": {
        "preparation": 15,
        "cuisson": 15,
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
        "fruits de mer",
        "francais",
        "traditionnel",
        "sale",
        "plat",
        "chaud",
        "raffine",
        "gastronomique",
        "fete",
        "invite",
        "romantique",
        "hiver"
      ],
      "ingredients": [
        {
          "groupe": "Pour le beurre blanc",
          "items": [
            {
              "nom": "Échalotes grises",
              "qte": 2,
              "unite": "pièce"
            },
            {
              "nom": "Vin blanc sec (type muscadet)",
              "qte": 100,
              "unite": "ml"
            },
            {
              "nom": "Vinaigre de vin blanc",
              "qte": 50,
              "unite": "ml"
            },
            {
              "nom": "Beurre doux très froid, en cubes",
              "qte": 200,
              "unite": "g"
            },
            {
              "nom": "Crème liquide entière",
              "qte": 1,
              "unite": "c. à soupe",
              "optionnel": true
            },
            {
              "nom": "Sel fin et poivre blanc",
              "qte": null,
              "unite": "",
              "note": "selon le goût"
            }
          ]
        },
        {
          "groupe": "Pour les Saint-Jacques",
          "items": [
            {
              "nom": "Noix de Saint-Jacques sans corail",
              "qte": 16,
              "unite": "pièce"
            },
            {
              "nom": "Huile neutre",
              "qte": 1,
              "unite": "c. à soupe"
            },
            {
              "nom": "Beurre doux",
              "qte": 15,
              "unite": "g"
            },
            {
              "nom": "Ciboulette",
              "qte": 6,
              "unite": "brin",
              "optionnel": true
            },
            {
              "nom": "Fleur de sel et poivre",
              "qte": null,
              "unite": "",
              "note": "selon le goût"
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Préparer les noix",
          "texte": "Retire le petit muscle dur collé sur le côté des noix, rince-les rapidement à l'eau froide, puis sèche-les à fond sur du papier absorbant. Garde-les au réfrigérateur sur un papier sec jusqu'à la cuisson."
        },
        {
          "titre": "La réduction",
          "texte": "Cisèle les échalotes très finement et mets-les dans une petite casserole avec le vin blanc et le vinaigre. Fais réduire à feu moyen jusqu'à ce qu'il ne reste qu'environ 2 cuillères à soupe de liquide, sans laisser attacher les échalotes.",
          "minuteurs": [
            {
              "secondes": 420,
              "label": "Réduction"
            }
          ]
        },
        {
          "titre": "La crème, en option",
          "texte": "Pour un beurre blanc plus stable, à l'angevine, ajoute la crème et laisse bouillir 30 secondes. La version nantaise s'en passe : à toi de choisir."
        },
        {
          "titre": "Monter le beurre",
          "texte": "Baisse le feu au minimum. Incorpore le beurre froid quelques cubes à la fois en fouettant sans arrêt, en attendant que chaque ajout soit presque fondu avant le suivant. La sauce doit devenir pâle, crémeuse et nappante, sans jamais bouillir.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Montage du beurre"
            }
          ]
        },
        {
          "titre": "Assaisonner et garder",
          "texte": "Sale, poivre, puis passe la sauce au chinois si tu la veux lisse, ou garde les échalotes pour une version plus rustique. Réserve-la dans un bain-marie à peine tiède, hors du feu : trop chaude, elle tranche."
        },
        {
          "titre": "Saisir les noix",
          "texte": "Fais chauffer l'huile dans une grande poêle à feu vif jusqu'à ce qu'elle soit très chaude, presque fumante. Dépose les noix sans qu'elles se touchent (en deux fois si la poêle est petite) et laisse-les 1 min 30 à 2 minutes sans y toucher, jusqu'à une belle croûte dorée.",
          "minuteurs": [
            {
              "secondes": 90,
              "label": "Première face"
            }
          ]
        },
        {
          "titre": "Arroser au beurre",
          "texte": "Retourne les noix, ajoute le beurre et arrose-les 1 minute avec le beurre mousseux. Le cœur doit rester nacré, légèrement translucide : elles finissent de cuire hors du feu.",
          "minuteurs": [
            {
              "secondes": 60,
              "label": "Seconde face"
            }
          ]
        },
        {
          "titre": "Le dressage",
          "texte": "Verse un cordon de beurre blanc dans des assiettes chaudes et pose 4 noix par personne. Termine par une pointe de fleur de sel, un tour de poivre et la ciboulette ciselée, puis sers aussitôt."
        }
      ],
      "astuces": [
        "Choisis des noix fraîches non trempées : des noix gorgées d'eau rendent du liquide dans la poêle et bouillent au lieu de dorer.",
        "Si le beurre blanc tranche parce qu'il a trop chauffé, retire-le du feu et ajoute un cube de beurre très froid en fouettant vivement : il se rattrape souvent.",
        "Dépose les noix dans la poêle dans le sens des aiguilles d'une montre et retourne-les dans le même ordre : elles auront toutes exactement le même temps de cuisson."
      ],
      "choix": {
        "titre": "Accompagnements",
        "mode": "single",
        "label": "Ton choix",
        "options": [
          "Fondue de poireaux",
          "Riz basmati",
          "Purée maison",
          "Épinards au beurre",
          "Mâche fraîche",
          "Tagliatelles fraîches",
          "Endives braisées"
        ]
      },
      "accords": [
        {
          "titre": "La nantaise",
          "texte": "une fondue de poireaux, compagne classique du beurre blanc."
        },
        {
          "titre": "La légère",
          "texte": "quelques pousses de mâche et des épinards tombés."
        },
        {
          "titre": "La gourmande",
          "texte": "des tagliatelles fraîches nappées d'un peu de beurre blanc."
        },
        {
          "titre": "Côté vin",
          "texte": "un vin blanc sec de la Loire, servi frais."
        }
      ],
      "conservation": "Les Saint-Jacques se cuisent au dernier moment et se dégustent aussitôt. Le beurre blanc supporte mal le réchauffage : prépare-le juste avant de servir.",
      "allergenes": [
        "mollusques",
        "lait",
        "sulfites"
      ],
      "regime": {
        "sansViande": true,
        "sansPoisson": false
      },
      "origine": {
        "pays": "France (Nantes et bords de Loire)",
        "drapeau": "🇫🇷",
        "resume": "Le beurre blanc est la sauce emblématique de la région nantaise, réputée pour accompagner les poissons et les coquillages.",
        "faits": [
          "La tradition attribue le beurre blanc à Clémence Lefeuvre, cuisinière à Saint-Julien-de-Concelles, sur les bords de Loire près de Nantes, vers la fin du XIXe siècle (les sources citent 1885 ou 1890). Selon une légende, elle aurait raté une béarnaise en oubliant les jaunes d'œufs : ce récit n'est pas prouvé et ses versions varient.",
          "Le beurre blanc nantais se fait traditionnellement sans crème, alors que la version angevine en contient ; Nantes et Angers revendiquent d'ailleurs toutes deux la recette.",
          "La coquille Saint-Jacques doit son nom à l'apôtre saint Jacques : les pèlerins de Compostelle ramassaient ces coquilles sur les plages de Galice et les rapportaient comme preuve de leur voyage."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Beurre blanc",
            "url": "https://en.wikipedia.org/wiki/Beurre_blanc"
          },
          {
            "titre": "Wikipédia (en) — Clémence Lefeuvre",
            "url": "https://en.wikipedia.org/wiki/Cl%C3%A9mence_Lefeuvre"
          },
          {
            "titre": "Generation Voyage — Le beurre blanc est-il nantais ou angevin ?",
            "url": "https://generationvoyage.fr/?p=379323"
          },
          {
            "titre": "France.fr — 5 minutes pour tout savoir sur la coquille Saint-Jacques",
            "url": "https://www.france.fr/fr/article/bretagne-normandie-coquille-saint-jacques/"
          },
          {
            "titre": "Vikidia — Coquille Saint-Jacques",
            "url": "https://fr.vikidia.org/wiki/Coquille_Saint-Jacques"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "cabillaudcrouteherbes",
      "url": "cabillaud-croute-herbes.html",
      "titre": "Dos de cabillaud en croûte d'herbes",
      "titreCourt": "Cabillaud croûte d'herbes",
      "alias": [
        "cabillaud en croute d herbes",
        "dos de cabillaud",
        "cabillaud au four",
        "poisson en croute d herbes"
      ],
      "emoji": "🌿",
      "categorie": "plat",
      "badge": "Bistrot chic",
      "accroche": "Un dos de cabillaud nacré sous une fine croûte verte au beurre, persil et parmesan, dorée au four.",
      "intro": "Une assiette de restaurant étonnamment simple à réussir chez soi : un dos de cabillaud épais, juste cuit, coiffé d'une croûte d'herbes fine et parfumée. Le secret des chefs, c'est d'étaler la croûte à l'avance et de la découper bien froide.",
      "images": [],
      "cover": {
        "motif": "plat-four",
        "fond": "#1f3b2c",
        "encre": "#f6efe4",
        "accent": "#7cc35b"
      },
      "temps": {
        "preparation": 20,
        "cuisson": 16,
        "repos": 20
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
        "poisson",
        "francais",
        "sale",
        "plat",
        "chaud",
        "four",
        "raffine",
        "gastronomique",
        "invite",
        "dimanche",
        "equilibre",
        "frais"
      ],
      "ingredients": [
        {
          "groupe": "Pour la croûte d'herbes",
          "items": [
            {
              "nom": "Beurre doux mou",
              "qte": 60,
              "unite": "g"
            },
            {
              "nom": "Chapelure panko",
              "qte": 50,
              "unite": "g"
            },
            {
              "nom": "Parmesan râpé",
              "qte": 30,
              "unite": "g"
            },
            {
              "nom": "Persil plat (feuilles)",
              "qte": 20,
              "unite": "g"
            },
            {
              "nom": "Ciboulette",
              "qte": 10,
              "unite": "g"
            },
            {
              "nom": "Ail",
              "qte": 1,
              "unite": "gousse"
            }
          ]
        },
        {
          "groupe": "Pour le poisson",
          "items": [
            {
              "nom": "Dos de cabillaud sans peau (environ 150 g, 3 cm d'épaisseur)",
              "qte": 4,
              "unite": "pièce"
            },
            {
              "nom": "Moutarde de Dijon",
              "qte": 2,
              "unite": "c. à café"
            },
            {
              "nom": "Huile d'olive",
              "qte": 1,
              "unite": "c. à soupe"
            },
            {
              "nom": "Citron jaune non traité",
              "qte": 1,
              "unite": "pièce"
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
          "titre": "La pâte verte",
          "texte": "Mixe le persil, la ciboulette et l'ail pelé, puis ajoute le beurre mou, la chapelure, le parmesan et le zeste du citron. Mixe par à-coups jusqu'à obtenir une pâte verte homogène, et poivre légèrement : le parmesan est déjà salé."
        },
        {
          "titre": "Étaler la croûte",
          "texte": "Étale la pâte entre deux feuilles de papier cuisson au rouleau, sur 3 à 4 mm d'épaisseur. Pose-la bien à plat au congélateur 20 minutes pour qu'elle durcisse.",
          "minuteurs": [
            {
              "secondes": 1200,
              "label": "Raffermir la croûte"
            }
          ]
        },
        {
          "titre": "Four et plat",
          "texte": "Pendant ce temps, préchauffe le four à 200 °C. Huile légèrement un plat allant au four avec l'huile d'olive."
        },
        {
          "titre": "Le poisson",
          "texte": "Sèche les dos de cabillaud avec du papier absorbant, sale-les légèrement et dépose-les dans le plat. Badigeonne le dessus d'une fine couche de moutarde : elle parfume et fait adhérer la croûte."
        },
        {
          "titre": "Poser la croûte",
          "texte": "Sors la plaque de croûte durcie, retire la feuille du dessus et découpe des rectangles de la taille de chaque dos. Pose-les sur le poisson en appuyant légèrement."
        },
        {
          "titre": "La cuisson",
          "texte": "Enfourne 12 à 14 minutes selon l'épaisseur. Le poisson est prêt quand sa chair est devenue opaque et se détache en lamelles nacrées sous la pointe d'un couteau.",
          "minuteurs": [
            {
              "secondes": 720,
              "label": "Dos fin"
            },
            {
              "secondes": 840,
              "label": "Dos épais"
            }
          ]
        },
        {
          "titre": "Dorer la croûte",
          "texte": "Si la croûte est encore pâle, passe le plat 1 à 2 minutes sous le gril en surveillant sans cesse. Elle doit blondir légèrement sans que les herbes ne brunissent.",
          "minuteurs": [
            {
              "secondes": 90,
              "label": "Passage sous le gril"
            }
          ]
        },
        {
          "titre": "Le service",
          "texte": "Dresse les dos avec une large spatule sur des assiettes chaudes. Ajoute un trait de jus de citron et sers aussitôt."
        }
      ],
      "astuces": [
        "Le passage au froid est le secret des chefs : la croûte étalée puis durcie se découpe net, reste d'une épaisseur régulière et ne glisse pas à la cuisson.",
        "Sèche parfaitement les herbes après les avoir lavées et ne mixe pas trop longtemps : le beurre chaufferait et la pâte deviendrait grasse et terne.",
        "Les chutes de croûte se congèlent très bien : elles feront merveille sur un filet de saumon ou un carré d'agneau."
      ],
      "choix": {
        "titre": "Accompagnements",
        "mode": "single",
        "label": "Ton choix",
        "options": [
          "Écrasé de pommes de terre",
          "Purée au beurre",
          "Risotto crémeux",
          "Petits légumes vapeur",
          "Fenouil braisé",
          "Tomates rôties",
          "Beurre blanc"
        ]
      },
      "accords": [
        {
          "titre": "La classique",
          "texte": "un écrasé de pommes de terre à l'huile d'olive."
        },
        {
          "titre": "La printanière",
          "texte": "des petits pois, des asperges et des fèves au beurre."
        },
        {
          "titre": "La méditerranéenne",
          "texte": "des tomates cerises rôties et un fenouil braisé."
        },
        {
          "titre": "Côté vin",
          "texte": "un vin blanc sec et frais, aux notes d'agrumes."
        }
      ],
      "conservation": "Le cabillaud cuit se garde 1 jour au réfrigérateur, mais la croûte y ramollit. La pâte d'herbes crue se conserve 2 jours au réfrigérateur ou environ 1 mois au congélateur, bien emballée.",
      "allergenes": [
        "poisson",
        "gluten",
        "lait",
        "moutarde"
      ],
      "noteAllergenes": "La moutarde de Dijon contient souvent des sulfites (conservateur) : vérifie l'étiquette.",
      "regime": {
        "sansViande": true,
        "sansPoisson": false
      },
      "origine": {
        "pays": "Atlantique Nord",
        "drapeau": "🌊",
        "resume": "Le cabillaud, poisson des eaux froides de l'Atlantique Nord, porte en France deux noms selon la façon dont on le prépare.",
        "faits": [
          "Cabillaud et morue désignent le même poisson, Gadus morhua, de la famille des gadidés, qui vit dans l'Atlantique Nord.",
          "En France, on parle généralement de cabillaud pour le poisson frais ou congelé, et de morue pour le poisson salé et séché."
        ],
        "sources": [
          {
            "titre": "Futura Sciences — Morue, cabillaud : quelle différence ?",
            "url": "https://www.futura-sciences.com/planete/questions-reponses/morue-cabillaud-morue-difference-11167/"
          },
          {
            "titre": "Peche.com — Morue ou cabillaud, le poisson des eaux froides",
            "url": "https://www.peche.com/article/32025/morue-ou-cabillaud-poisson-d-eau-froide"
          },
          {
            "titre": "Office québécois de la langue française — morue",
            "url": "https://vitrinelinguistique.oqlf.gouv.qc.ca/fiche-gdt/fiche/1198846/morue"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "gravlax",
      "url": "saumon-gravlax.html",
      "titre": "Saumon gravlax à l'aneth",
      "titreCourt": "Saumon gravlax",
      "alias": [
        "gravlax",
        "gravad lax",
        "gravlaks",
        "saumon marine a l aneth"
      ],
      "emoji": "🧂",
      "categorie": "plat",
      "badge": "Cuisine nordique",
      "accroche": "Un saumon mariné 48 heures au sel, au sucre et à l'aneth, servi en tranches fines avec sa sauce moutarde.",
      "intro": "Une entrée de fête classique des pays nordiques : un saumon cru simplement transformé par le sel et le sucre, et parfumé à l'aneth. Il ne demande presque aucun savoir-faire, juste un peu d'organisation et de patience.",
      "images": [],
      "cover": {
        "motif": "assiette",
        "fond": "#123c3a",
        "encre": "#f6efe4",
        "accent": "#ff8a5c"
      },
      "temps": {
        "preparation": 25,
        "cuisson": 0,
        "repos": 2880
      },
      "difficulte": "Facile",
      "portions": {
        "base": 8,
        "unite": "personne",
        "pluriel": "personnes",
        "min": 4,
        "max": 16,
        "pas": 2
      },
      "tags": [
        "poisson",
        "sale",
        "plat",
        "froid",
        "frais",
        "fete",
        "invite",
        "raffine",
        "gastronomique",
        "hiver",
        "convivial",
        "simple"
      ],
      "ingredients": [
        {
          "groupe": "Pour le saumon",
          "items": [
            {
              "nom": "Filet de saumon avec la peau (partie centrale, préalablement congelé)",
              "qte": 1000,
              "unite": "g"
            },
            {
              "nom": "Gros sel",
              "qte": 100,
              "unite": "g"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 100,
              "unite": "g"
            },
            {
              "nom": "Poivre blanc en grains concassé",
              "qte": 1,
              "unite": "c. à soupe"
            },
            {
              "nom": "Aneth frais (pour la marinade)",
              "qte": 1,
              "unite": "bouquet"
            },
            {
              "nom": "Baies de genièvre concassées",
              "qte": 1,
              "unite": "c. à café",
              "optionnel": true
            },
            {
              "nom": "Aquavit ou vodka",
              "qte": 2,
              "unite": "c. à soupe",
              "optionnel": true
            }
          ]
        },
        {
          "groupe": "Pour la sauce moutarde-aneth",
          "items": [
            {
              "nom": "Moutarde de Dijon",
              "qte": 3,
              "unite": "c. à soupe"
            },
            {
              "nom": "Miel",
              "qte": 2,
              "unite": "c. à soupe"
            },
            {
              "nom": "Vinaigre de vin blanc",
              "qte": 1,
              "unite": "c. à soupe"
            },
            {
              "nom": "Huile de colza",
              "qte": 100,
              "unite": "ml"
            },
            {
              "nom": "Aneth frais haché (sauce et finition)",
              "qte": 6,
              "unite": "c. à soupe"
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
          "titre": "Congeler d'abord",
          "texte": "Si ton saumon n'a jamais été congelé, congèle-le 7 jours au congélateur (-18 °C) avant de commencer, puis décongèle-le une nuit au réfrigérateur. C'est indispensable : le sel et le sucre ne détruisent pas les parasites."
        },
        {
          "titre": "Préparer le filet",
          "texte": "Passe le doigt sur la chair à rebrousse-poil pour repérer les arêtes et retire-les une à une avec une pince. Sèche le filet avec du papier absorbant, sans retirer la peau."
        },
        {
          "titre": "Le mélange",
          "texte": "Mélange le gros sel, le sucre, le poivre concassé et les baies de genièvre. Hache grossièrement l'aneth de la marinade, tiges comprises."
        },
        {
          "titre": "Le montage",
          "texte": "Pose le filet côté peau dans un plat juste à sa taille et arrose-le d'aquavit si tu en mets. Recouvre la chair d'aneth puis d'une couche uniforme du mélange sel-sucre, plus épaisse sur la partie la plus charnue, et filme au contact."
        },
        {
          "titre": "Presser et mariner",
          "texte": "Pose une planche et un poids d'environ 1 kg (des briques de lait, par exemple) sur le saumon et laisse-le 48 heures au réfrigérateur. Toutes les 12 heures, arrose la chair avec la saumure qui s'est formée au fond du plat.",
          "minuteurs": [
            {
              "secondes": 43200,
              "label": "Arroser de saumure"
            },
            {
              "secondes": 172800,
              "label": "Fin de la marinade"
            }
          ]
        },
        {
          "titre": "Rincer et sécher",
          "texte": "Retire l'aneth et le mélange, rince rapidement le filet sous l'eau froide et sèche-le très soigneusement. La chair est devenue ferme, brillante et d'un orange plus profond."
        },
        {
          "titre": "La sauce",
          "texte": "Fouette la moutarde, le miel et le vinaigre, puis verse l'huile en filet sans cesser de fouetter pour obtenir une sauce émulsionnée. Ajoute les deux tiers de l'aneth haché, sale légèrement et poivre."
        },
        {
          "titre": "Trancher et servir",
          "texte": "Parsème la chair du reste d'aneth haché. Avec un long couteau bien aiguisé, taille des tranches très fines en biais en partant de la queue, en laissant la peau, et sers bien frais avec la sauce."
        }
      ],
      "astuces": [
        "Adapte la marinade à l'épaisseur : un filet fin est prêt en 24 à 36 heures, un filet très épais peut aller jusqu'à 72 heures. Goûte un petit morceau rincé pour juger.",
        "Pour des tranches nettes et très fines, place le gravlax rincé environ 30 minutes au congélateur avant de le trancher : la chair raffermie se coupe bien mieux.",
        "L'aquavit ou la vodka ne sont pas cuits et restent dans le poisson : pour une version sans alcool, il suffit de les supprimer, la recette fonctionne tout aussi bien."
      ],
      "securite": "Poisson cru mariné : le salage et le sucre ne détruisent pas les parasites (anisakis). Si le saumon n'a pas déjà été congelé, congèle-le 7 jours au congélateur domestique avant de le préparer, ou achète-le déjà congelé en précisant au poissonnier qu'il sera mangé cru. Garde-le toujours au réfrigérateur pendant la marinade. Le poisson cru ou mariné est déconseillé aux personnes fragiles : femmes enceintes (risque de listériose), jeunes enfants, personnes âgées ou immunodéprimées.",
      "sourcesSecurite": [
        {
          "titre": "Allodocteurs — recommandation de l'InVS (7 jours au congélateur)",
          "url": "https://www.allodocteurs.fr/alimentation-il-decouvre-un-ver-parasite-dans-son-poisson-26448.html"
        },
        {
          "titre": "Manuel MSD — Anisakiase (le salage et le fumage ne suffisent pas)",
          "url": "https://www.msdmanuals.com/fr/professional/maladies-infectieuses/n%C3%A9matodes-vers-ronds/anisakiase"
        },
        {
          "titre": "Canton de Genève — anisakis : congeler 7 jours, poisson cru ou mariné déconseillé aux personnes sensibles",
          "url": "https://www.ge.ch/document/43819/telecharger"
        },
        {
          "titre": "Anses — avis sur Listeria et femmes enceintes (poisson cru et fumé déconseillé)",
          "url": "https://www.anses.fr/fr/system/files/BIORISK2012sa0102.pdf?download=1"
        },
        {
          "titre": "Institut Pasteur — Listériose : la maladie et recommandations",
          "url": "https://www.pasteur.fr/fr/sante-publique/CNR/les-cnr/listeria/la-maladie-recommandations"
        }
      ],
      "choix": {
        "titre": "Pour accompagner",
        "mode": "single",
        "label": "Ton choix",
        "options": [
          "Pain de seigle",
          "Pommes de terre tièdes",
          "Blinis",
          "Concombre à l'aneth",
          "Toasts beurrés",
          "Crème citronnée",
          "Salade de fenouil"
        ]
      },
      "accords": [
        {
          "titre": "La suédoise",
          "texte": "sur du pain de seigle, avec la sauce moutarde-aneth."
        },
        {
          "titre": "La tiède",
          "texte": "avec des pommes de terre à l'eau encore tièdes."
        },
        {
          "titre": "La festive",
          "texte": "sur des blinis, avec une crème fraîche citronnée."
        },
        {
          "titre": "Côté vin",
          "texte": "un vin blanc sec et vif, servi bien frais."
        }
      ],
      "conservation": "Rincé, séché et bien filmé, le gravlax se garde environ 3 jours au réfrigérateur. La sauce se conserve 2 jours au frais dans un bocal fermé.",
      "allergenes": [
        "poisson",
        "moutarde",
        "sulfites"
      ],
      "noteAllergenes": "La version à l'aquavit ou à la vodka contient de l'alcool non cuit : supprime-le pour les enfants et pour les personnes qui ne boivent pas d'alcool.",
      "regime": {
        "sansViande": true,
        "sansPoisson": false
      },
      "origine": {
        "pays": "Suède et pays nordiques",
        "drapeau": "🇸🇪",
        "resume": "Spécialité nordique de saumon cru mariné au sel, au sucre et à l'aneth, dont le nom rappelle une ancienne technique d'enfouissement.",
        "faits": [
          "« Gravlax » vient du suédois « gravad lax », littéralement « saumon enterré » : au Moyen Âge, des pêcheurs salaient le saumon et le laissaient légèrement fermenter, enfoui dans le sable au-dessus de la ligne des hautes eaux.",
          "La version moderne n'est plus fermentée : le saumon est recouvert d'un mélange sec de sel, de sucre et d'aneth, puis mariné de douze heures à quelques jours.",
          "On le sert traditionnellement en entrée, en tranches fines, avec la hovmästarsås, une sauce à la moutarde et à l'aneth."
        ],
        "sources": [
          {
            "titre": "Office québécois de la langue française — gravlax",
            "url": "https://vitrinelinguistique.oqlf.gouv.qc.ca/fiche-gdt/fiche/26502314/gravlax"
          },
          {
            "titre": "Wikipédia (en) — Gravlax",
            "url": "https://en.wikipedia.org/wiki/Gravlax"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "supremesmorilles",
      "url": "supremes-volaille-morilles.html",
      "titre": "Suprêmes de volaille aux morilles",
      "titreCourt": "Volaille aux morilles",
      "alias": [
        "supremes aux morilles",
        "poulet aux morilles",
        "volaille aux morilles",
        "supreme de volaille sauce morilles"
      ],
      "emoji": "🍄",
      "categorie": "plat",
      "badge": "Gastronomique",
      "accroche": "Des suprêmes à la peau dorée, nappés d'une sauce crémeuse aux morilles longuement mijotées.",
      "intro": "Un grand classique des tables de fête : une volaille juteuse, une sauce à la crème parfumée par le jus de trempage des morilles et une pointe de vin blanc. La sauce se prépare tranquillement pendant que les suprêmes finissent de cuire au four.",
      "images": [],
      "cover": {
        "motif": "assiette",
        "fond": "#3f2d1f",
        "encre": "#f6efe4",
        "accent": "#e6c06a"
      },
      "temps": {
        "preparation": 20,
        "cuisson": 40,
        "repos": 35
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
        "viande",
        "francais",
        "traditionnel",
        "sale",
        "plat",
        "chaud",
        "four",
        "raffine",
        "gastronomique",
        "fete",
        "invite",
        "romantique",
        "dimanche"
      ],
      "ingredients": [
        {
          "groupe": "Pour les morilles et la sauce",
          "items": [
            {
              "nom": "Morilles séchées",
              "qte": 40,
              "unite": "g"
            },
            {
              "nom": "Eau tiède (pour le trempage)",
              "qte": 400,
              "unite": "ml"
            },
            {
              "nom": "Échalotes",
              "qte": 2,
              "unite": "pièce"
            },
            {
              "nom": "Beurre doux",
              "qte": 20,
              "unite": "g"
            },
            {
              "nom": "Vin blanc sec (idéalement du Jura) ou vin jaune",
              "qte": 100,
              "unite": "ml"
            },
            {
              "nom": "Crème liquide entière",
              "qte": 250,
              "unite": "ml"
            }
          ]
        },
        {
          "groupe": "Pour les suprêmes",
          "items": [
            {
              "nom": "Suprêmes de volaille avec la peau",
              "qte": 4,
              "unite": "pièce"
            },
            {
              "nom": "Huile neutre",
              "qte": 1,
              "unite": "c. à soupe"
            },
            {
              "nom": "Beurre doux",
              "qte": 20,
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
          "titre": "Réhydrater les morilles",
          "texte": "Mets les morilles séchées dans un bol et couvre-les d'eau tiède. Laisse-les gonfler 20 à 30 minutes : elles doivent redevenir souples sous les doigts.",
          "minuteurs": [
            {
              "secondes": 1800,
              "label": "Trempage des morilles"
            }
          ]
        },
        {
          "titre": "Nettoyer et filtrer",
          "texte": "Sors les morilles à la main sans remuer le fond du bol, puis rince-les une à une sous un mince filet d'eau pour chasser le sable caché dans les alvéoles. Filtre l'eau de trempage à travers un filtre à café et garde-la : c'est la base de ta sauce. Coupe les plus grosses morilles en deux."
        },
        {
          "titre": "Échalotes et morilles",
          "texte": "Préchauffe le four à 180 °C. Cisèle finement les échalotes et fais-les suer 2 à 3 minutes dans le beurre de la sauce, à feu doux et sans coloration, puis ajoute les morilles bien égouttées et fais-les revenir 5 minutes en remuant.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Morilles revenues"
            }
          ]
        },
        {
          "titre": "Déglacer et réduire",
          "texte": "Verse le vin blanc et laisse-le réduire de moitié en grattant le fond de la casserole. Ajoute l'eau de trempage filtrée et laisse frémir à découvert environ 10 minutes, jusqu'à ce qu'elle ait réduit de moitié.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Réduction du jus"
            }
          ]
        },
        {
          "titre": "La crème",
          "texte": "Ajoute la crème et laisse mijoter doucement 15 minutes à petit feu, jusqu'à ce que la sauce nappe le dos d'une cuillère. Les morilles auront ainsi cuit une trentaine de minutes au total, bien au-delà des 20 minutes minimum.",
          "minuteurs": [
            {
              "secondes": 900,
              "label": "Sauce à la crème"
            }
          ]
        },
        {
          "titre": "Saisir les suprêmes",
          "texte": "Pendant que la sauce mijote, sèche les suprêmes avec du papier absorbant, sale et poivre-les. Dans une poêle allant au four, fais chauffer l'huile puis le beurre et pose les suprêmes côté peau : laisse-les dorer 5 à 6 minutes sans les bouger, jusqu'à ce que la peau soit croustillante, puis retourne-les.",
          "minuteurs": [
            {
              "secondes": 330,
              "label": "Côté peau"
            }
          ]
        },
        {
          "titre": "Finir au four",
          "texte": "Glisse la poêle au four pour 12 à 15 minutes selon l'épaisseur. La chair doit être blanche à cœur et le jus qui perle bien clair ; avec une sonde, vise au moins 70 °C au centre.",
          "minuteurs": [
            {
              "secondes": 720,
              "label": "Suprêmes fins"
            },
            {
              "secondes": 900,
              "label": "Suprêmes épais"
            }
          ]
        },
        {
          "titre": "Repos et finition",
          "texte": "Laisse reposer les suprêmes 5 minutes sous une feuille d'aluminium posée sans serrer, pendant que tu réchauffes doucement la sauce. Verse dans la sauce le jus rendu pendant le repos, puis rectifie le sel et le poivre.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Repos des suprêmes"
            }
          ]
        },
        {
          "titre": "Le dressage",
          "texte": "Sers les suprêmes entiers ou tranchés en biais dans des assiettes chaudes. Nappe-les généreusement de sauce et répartis les morilles par-dessus, sans couvrir toute la peau pour qu'elle reste croustillante."
        }
      ],
      "astuces": [
        "Ne jette jamais l'eau de trempage des morilles : une fois filtrée, c'est le fond de sauce le plus parfumé qui soit.",
        "Pour une peau bien croustillante, sèche soigneusement les suprêmes et ne les déplace pas tant qu'ils n'ont pas doré : ils se décollent seuls de la poêle.",
        "Si la sauce reste trop liquide, laisse-la réduire à découvert quelques minutes de plus ; si elle épaissit trop, détends-la avec une cuillère d'eau de trempage."
      ],
      "securite": "Morilles : crues ou pas assez cuites, elles peuvent provoquer des intoxications (troubles digestifs, parfois troubles neurologiques), et les morilles vendues séchées ou surgelées sont, elles aussi, crues. Ne les goûte jamais crues, fais-les cuire au moins 20 minutes et reste raisonnable sur les quantités (le centre antipoison suisse conseille de ne pas dépasser 10 g de morilles séchées par portion). La volaille, elle, se mange bien cuite : selon l'Anses, une cuisson à cœur au-delà de 65 °C détruit les bactéries comme Campylobacter, et le repère de 70 °C indiqué dans la recette te laisse une marge.",
      "sourcesSecurite": [
        {
          "titre": "Tox Info Suisse — fiche d'information sur les morilles",
          "url": "https://www.toxinfo.ch/customer/files/1193/Morcheln-Merkblatt_FR_2026-06-05.pdf"
        },
        {
          "titre": "Anses — Intoxications liées à la cueillette de champignons : restez vigilants",
          "url": "https://www.anses.fr/fr/content/intoxications-liees-la-cueillette-de-champignons-restez-vigilants"
        },
        {
          "titre": "E-santé — Les morilles, toujours bien cuites (rappel de la Direction générale de la santé)",
          "url": "https://www.e-sante.fr/morilles-toujours-bien-cuites/actualite/541"
        },
        {
          "titre": "Anses — Campylobactériose (cuisson de la volaille)",
          "url": "https://www.anses.fr/fr/content/campylobacteriose"
        }
      ],
      "choix": {
        "titre": "Accompagnements",
        "mode": "single",
        "label": "Ton accompagnement",
        "options": [
          "Riz blanc pilaf",
          "Tagliatelles fraîches",
          "Purée maison",
          "Pommes grenailles",
          "Asperges vertes",
          "Haricots verts",
          "Riz sauvage"
        ]
      },
      "accords": [
        {
          "titre": "Le classique",
          "texte": "un riz blanc pilaf pour profiter de toute la sauce."
        },
        {
          "titre": "Le printanier",
          "texte": "quelques asperges vertes juste croquantes."
        },
        {
          "titre": "Le gourmand",
          "texte": "des tagliatelles fraîches enrobées de sauce aux morilles."
        },
        {
          "titre": "Côté vin",
          "texte": "un vin blanc du Jura, de préférence celui qui a servi à la sauce."
        }
      ],
      "conservation": "Jusqu'à 2 jours au réfrigérateur dans une boîte hermétique. Réchauffe doucement à couvert, jusqu'à ce que la volaille soit bien chaude à cœur.",
      "allergenes": [
        "lait",
        "sulfites"
      ],
      "regime": {
        "sansViande": false,
        "sansPoisson": true
      },
      "origine": {
        "pays": "France (Jura)",
        "drapeau": "🇫🇷",
        "resume": "L'alliance de la volaille, de la crème et des morilles est une signature de la cuisine du Jura et de la Franche-Comté.",
        "faits": [
          "En cuisine, le mot « suprême » désigne la partie la plus noble d'un aliment : pour la volaille, c'est le blanc prélevé avec sa peau ; selon les usages, on lui laisse ou non le premier segment de l'aile.",
          "La poularde au vin jaune et aux morilles est présentée comme une recette régionale par excellence de Franche-Comté.",
          "L'association de la volaille, des morilles et du vin jaune est décrite comme un grand classique des accords avec les vins du Jura."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Supreme (cooking)",
            "url": "https://en.wikipedia.org/wiki/Supreme_(cooking)"
          },
          {
            "titre": "Wikipédia (en) — Airline chicken",
            "url": "https://en.wikipedia.org/wiki/Airline_chicken"
          },
          {
            "titre": "macommune.info — Poularde au vin jaune et aux morilles",
            "url": "https://www.macommune.info/poularde-au-vin-jaune-et-aux-morilles-107721/"
          },
          {
            "titre": "iDealwine — Les vins du Jura à table",
            "url": "https://www.idealwine.net/accords-mets-et-vins-les-vins-du-jura-a-table/"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "gigotagneau",
      "url": "gigot-agneau-roti.html",
      "titre": "Gigot d'agneau rôti à l'ail et au romarin",
      "titreCourt": "Gigot d'agneau rôti",
      "alias": [
        "gigot",
        "gigot d'agneau",
        "gigot roti",
        "agneau roti"
      ],
      "emoji": "🍖",
      "categorie": "plat",
      "badge": "Grand classique",
      "accroche": "Piqué d'ail, parfumé au romarin, rosé à cœur et servi avec son jus : le rôti des grandes tablées.",
      "intro": "Le gigot rôti est le plat généreux par excellence, celui qu'on pose au centre de la table et qu'on découpe devant tout le monde. Avec une sonde et un vrai temps de repos, il ressort rosé, tendre et juteux à tous les coups.",
      "images": [],
      "cover": {
        "motif": "cloche",
        "fond": "#2e3a28",
        "encre": "#f6efe4",
        "accent": "#d97a62"
      },
      "temps": {
        "preparation": 20,
        "cuisson": 65,
        "repos": 75
      },
      "difficulte": "Facile",
      "portions": {
        "base": 6,
        "unite": "personne",
        "pluriel": "personnes",
        "min": 4,
        "max": 12,
        "pas": 2
      },
      "tags": [
        "viande",
        "francais",
        "traditionnel",
        "sale",
        "plat",
        "chaud",
        "four",
        "fete",
        "dimanche",
        "invite",
        "convivial",
        "familial",
        "gastronomique"
      ],
      "ingredients": [
        {
          "groupe": "Pour le gigot",
          "items": [
            {
              "nom": "Gigot d'agneau avec l'os (environ 2 kg)",
              "qte": 2000,
              "unite": "g"
            },
            {
              "nom": "Ail (à piquer dans la viande)",
              "qte": 4,
              "unite": "gousse"
            },
            {
              "nom": "Ail en chemise (gousses non épluchées)",
              "qte": 8,
              "unite": "gousse"
            },
            {
              "nom": "Romarin frais",
              "qte": 4,
              "unite": "brin"
            },
            {
              "nom": "Huile d'olive",
              "qte": 2,
              "unite": "c. à soupe"
            },
            {
              "nom": "Fleur de sel et poivre du moulin",
              "qte": null,
              "unite": "",
              "note": "selon le goût"
            }
          ]
        },
        {
          "groupe": "Pour le jus",
          "items": [
            {
              "nom": "Eau chaude",
              "qte": 200,
              "unite": "ml"
            },
            {
              "nom": "Beurre doux froid",
              "qte": 20,
              "unite": "g"
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Tempérer la viande",
          "texte": "Sors le gigot du réfrigérateur 1 heure avant la cuisson et laisse-le à température ambiante, à couvert. Une viande moins froide cuit de façon plus régulière, jusqu'au cœur.",
          "minuteurs": [
            {
              "secondes": 3600,
              "label": "Gigot à température"
            }
          ]
        },
        {
          "titre": "Piquer d'ail",
          "texte": "Épluche les 4 gousses d'ail à piquer et coupe-les en fins bâtonnets. Avec la pointe d'un petit couteau, pratique une douzaine d'incisions de 2 cm dans la viande et glisses-y l'ail et quelques aiguilles de romarin."
        },
        {
          "titre": "Préparer le plat",
          "texte": "Préchauffe le four à 220 °C. Pose le gigot dans un plat à rôtir, masse-le avec l'huile d'olive, sale et poivre. Dispose tout autour les gousses d'ail en chemise et le reste du romarin."
        },
        {
          "titre": "Saisir au four",
          "texte": "Enfourne pour 15 minutes à 220 °C. La surface doit commencer à dorer et à grésiller : c'est elle qui donnera sa belle croûte au gigot.",
          "minuteurs": [
            {
              "secondes": 900,
              "label": "Saisie à 220 °C"
            }
          ]
        },
        {
          "titre": "Poursuivre la cuisson",
          "texte": "Baisse le four à 200 °C et verse la moitié de l'eau chaude dans le plat pour que les sucs ne brûlent pas. Poursuis la cuisson environ 45 minutes en arrosant le gigot de son jus toutes les 15 minutes ; en tout, compte environ 15 minutes par 500 g pour un gigot rosé.",
          "minuteurs": [
            {
              "secondes": 900,
              "label": "Arroser le gigot"
            },
            {
              "secondes": 2700,
              "label": "Cuisson à 200 °C"
            }
          ]
        },
        {
          "titre": "Vérifier la cuisson",
          "texte": "Pique une sonde au plus épais de la viande, sans toucher l'os : sors le gigot vers 55 °C pour une viande rosée, 60 °C pour une viande à point. La température monte encore de quelques degrés pendant le repos ; s'il n'est pas assez cuit, prolonge de 5 minutes et vérifie à nouveau.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Prolongation"
            }
          ]
        },
        {
          "titre": "Le repos",
          "texte": "Pose le gigot sur une planche et couvre-le d'une feuille d'aluminium sans serrer. Laisse-le reposer 15 minutes : les jus se répartissent et la viande reste juteuse à la découpe.",
          "minuteurs": [
            {
              "secondes": 900,
              "label": "Repos du gigot"
            }
          ]
        },
        {
          "titre": "Le jus",
          "texte": "Pendant le repos, pose le plat sur feu moyen (ou verse ses sucs dans une petite casserole s'il ne va pas sur le feu), ajoute le reste de l'eau chaude et gratte les sucs avec une spatule. Écrase deux gousses d'ail confites dans le jus, laisse réduire 2 à 3 minutes, filtre, puis ajoute le beurre froid hors du feu en fouettant pour le lier.",
          "minuteurs": [
            {
              "secondes": 180,
              "label": "Réduction du jus"
            }
          ]
        },
        {
          "titre": "La découpe",
          "texte": "Tiens le gigot par le manche et découpe-le en tranches fines, perpendiculairement à l'os. Ajoute dans la saucière le jus rendu sur la planche et sers aussitôt avec les gousses d'ail confites."
        }
      ],
      "astuces": [
        "La sonde est la meilleure alliée du gigot : le temps par kilo n'est qu'un repère, car la forme du gigot et le four changent tout.",
        "Arrose le gigot toutes les 15 minutes avec le jus du plat : la surface dore de façon régulière et ne se dessèche pas.",
        "Les gousses d'ail en chemise confisent dans le plat : presse-les pour en extraire une purée douce, à tartiner sur du pain grillé ou à mélanger au jus. Tu peux aussi remplacer l'eau par un bouillon de volaille pour un jus plus corsé."
      ],
      "choix": {
        "titre": "Accompagnements",
        "mode": "single",
        "label": "Ton accompagnement",
        "options": [
          "Flageolets",
          "Haricots verts",
          "Gratin dauphinois",
          "Pommes grenailles rôties",
          "Tian de légumes",
          "Purée de pommes de terre",
          "Petits légumes nouveaux"
        ]
      },
      "accords": [
        {
          "titre": "Le traditionnel",
          "texte": "des flageolets mijotés, arrosés d'un peu de jus."
        },
        {
          "titre": "Le printanier",
          "texte": "des petits légumes nouveaux rôtis à côté du gigot."
        },
        {
          "titre": "Le gourmand",
          "texte": "un gratin dauphinois bien doré."
        },
        {
          "titre": "Côté vin",
          "texte": "un vin rouge souple et fruité, servi légèrement frais."
        }
      ],
      "conservation": "2 à 3 jours au réfrigérateur, bien emballé. Les restes se dégustent froids en fines tranches ou réchauffés doucement dans un peu de jus.",
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
        "resume": "Le gigot rôti est un pilier de la cuisine familiale française, très présent sur les tables de Pâques.",
        "faits": [
          "Le mot « gigot » est généralement présenté comme un diminutif de « gigue », ancien nom d'un instrument à cordes, par analogie de forme avec ce morceau ; l'origine du mot « gigue » elle-même reste incertaine.",
          "L'agneau, qui renvoie au symbole de l'agneau pascal, est un plat traditionnel de Pâques ; il est souvent servi en gigot rôti."
        ],
        "sources": [
          {
            "titre": "Dictionary.com — Gigot",
            "url": "https://dictionary.com/browse/gigot"
          },
          {
            "titre": "Merriam-Webster — Gigot (étymologie)",
            "url": "https://www.merriam-webster.com/dictionary/gigot"
          },
          {
            "titre": "Alimentarium — Pâques",
            "url": "https://www.alimentarium.org/fr/node/1260"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "ossobuco",
      "url": "osso-buco-milanaise.html",
      "titre": "Osso buco à la milanaise et sa gremolata",
      "titreCourt": "Osso buco",
      "alias": [
        "ossobuco",
        "osso bucco",
        "jarret de veau a la milanaise",
        "ossobuco alla milanese"
      ],
      "emoji": "🥘",
      "categorie": "plat",
      "badge": "Grand classique",
      "accroche": "Jarret de veau braisé au vin blanc jusqu'à fondre, relevé d'une gremolata citron, ail et persil.",
      "intro": "Un plat de Milan qui prend son temps : le jarret de veau mijote doucement au vin blanc et au bouillon, et la moelle fond dans la sauce. Au moment de servir, la gremolata apporte un éclat de fraîcheur qui réveille tout.",
      "images": [],
      "cover": {
        "motif": "cocotte",
        "fond": "#5a2a18",
        "encre": "#f6efe4",
        "accent": "#f2c94c"
      },
      "temps": {
        "preparation": 25,
        "cuisson": 140,
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
        "viande",
        "italien",
        "traditionnel",
        "sale",
        "plat",
        "chaud",
        "mijote",
        "hiver",
        "reconfort",
        "dimanche",
        "invite",
        "gastronomique"
      ],
      "ingredients": [
        {
          "groupe": "Pour l'osso buco",
          "items": [
            {
              "nom": "Tranches de jarret de veau (3 à 4 cm d'épaisseur)",
              "qte": 4,
              "unite": "pièce"
            },
            {
              "nom": "Farine de blé",
              "qte": 30,
              "unite": "g"
            },
            {
              "nom": "Beurre doux",
              "qte": 50,
              "unite": "g"
            },
            {
              "nom": "Huile d'olive",
              "qte": 1,
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
              "nom": "Céleri branche",
              "qte": 1,
              "unite": "tige"
            },
            {
              "nom": "Vin blanc sec",
              "qte": 150,
              "unite": "ml"
            },
            {
              "nom": "Bouillon de veau ou de volaille chaud",
              "qte": 600,
              "unite": "ml"
            },
            {
              "nom": "Feuille de laurier",
              "qte": 1,
              "unite": "feuille",
              "fixe": true
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
          "groupe": "Pour la gremolata",
          "items": [
            {
              "nom": "Citron jaune non traité (zeste)",
              "qte": 1,
              "unite": "pièce"
            },
            {
              "nom": "Persil plat",
              "qte": 0.5,
              "unite": "bouquet"
            },
            {
              "nom": "Ail",
              "qte": 1,
              "unite": "gousse"
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Préparer la viande",
          "texte": "Entaille la fine membrane qui entoure chaque tranche de jarret en 3 ou 4 endroits : ainsi, la viande ne se recroquevillera pas à la cuisson. Sale, poivre, puis farine légèrement les deux faces et tapote pour retirer l'excédent."
        },
        {
          "titre": "Dorer le jarret",
          "texte": "Dans une grande sauteuse ou une cocotte où les tranches tiennent à plat, fais chauffer l'huile avec 30 g de beurre. Fais dorer la viande 3 à 4 minutes par face à feu moyen-vif, en la manipulant délicatement pour garder la moelle dans l'os, puis réserve-la.",
          "minuteurs": [
            {
              "secondes": 210,
              "label": "Première face"
            },
            {
              "secondes": 210,
              "label": "Seconde face"
            }
          ]
        },
        {
          "titre": "Le soffritto",
          "texte": "Taille l'oignon, la carotte et le céleri en tout petits dés. Baisse le feu, ajoute le reste du beurre et fais-les suer 5 à 6 minutes en remuant, jusqu'à ce qu'ils soient tendres et à peine dorés.",
          "minuteurs": [
            {
              "secondes": 360,
              "label": "Légumes fondus"
            }
          ]
        },
        {
          "titre": "Déglacer au vin",
          "texte": "Remets les tranches de jarret à plat sur les légumes et verse le vin blanc. Laisse-le s'évaporer 2 à 3 minutes en grattant les sucs du fond avec une spatule.",
          "minuteurs": [
            {
              "secondes": 180,
              "label": "Évaporation du vin"
            }
          ]
        },
        {
          "titre": "Le mijotage",
          "texte": "Verse environ 400 ml de bouillon chaud, jusqu'à mi-hauteur de la viande, et ajoute le laurier. Couvre et laisse cuire à tout petit frémissement 1 h 30 à 2 h, en retournant délicatement les tranches à mi-cuisson et en ajoutant un peu du bouillon restant si la sauce attache. La viande est prête quand elle se détache de l'os à la fourchette.",
          "minuteurs": [
            {
              "secondes": 5400,
              "label": "Vérifier la tendreté"
            },
            {
              "secondes": 7200,
              "label": "Cuisson longue"
            }
          ]
        },
        {
          "titre": "La gremolata",
          "texte": "Prélève le zeste du citron en évitant la peau blanche, qui est amère. Hache-le très finement avec les feuilles de persil et la gousse d'ail épluchée : le mélange doit être fin et parfumé."
        },
        {
          "titre": "Ajuster la sauce",
          "texte": "Retire la viande avec une large spatule et garde-la au chaud. Retire le laurier ; si la sauce est trop liquide, fais-la réduire quelques minutes à découvert jusqu'à ce qu'elle soit nappante, puis rectifie l'assaisonnement.",
          "minuteurs": [
            {
              "secondes": 240,
              "label": "Réduction de la sauce"
            }
          ]
        },
        {
          "titre": "Le service",
          "texte": "Dépose chaque tranche dans une assiette chaude, nappe de sauce et parsème de gremolata au dernier moment, pour qu'elle garde toute sa fraîcheur. Sers aussitôt, avec une petite cuillère pour déguster la moelle."
        }
      ],
      "astuces": [
        "Le secret d'un jarret fondant, c'est un frémissement à peine visible : un bouillon qui bout à gros bouillons resserre et durcit la viande.",
        "Comme tous les plats braisés, l'osso buco est souvent encore meilleur réchauffé le lendemain ; prépare seulement la gremolata au moment de servir.",
        "La recette milanaise traditionnelle se fait « in bianco », sans tomate. Une version à la tomate existe aussi : ajoute alors un peu de tomates concassées avec le bouillon."
      ],
      "choix": {
        "titre": "Accompagnements",
        "mode": "single",
        "label": "Ton accompagnement",
        "options": [
          "Risotto au safran",
          "Polenta crémeuse",
          "Purée maison",
          "Tagliatelles au beurre",
          "Pain grillé pour la moelle",
          "Épinards au beurre"
        ]
      },
      "accords": [
        {
          "titre": "Le milanais",
          "texte": "un risotto au safran, comme à Milan."
        },
        {
          "titre": "Le rustique",
          "texte": "une polenta crémeuse pour recueillir la sauce."
        },
        {
          "titre": "Le gourmand",
          "texte": "la moelle tartinée sur du pain grillé, avec une pincée de fleur de sel."
        },
        {
          "titre": "Côté vin",
          "texte": "un vin rouge italien souple ou un vin blanc sec et frais."
        }
      ],
      "conservation": "2 à 3 jours au réfrigérateur dans sa sauce, en boîte hermétique. Réchauffe à couvert et à feu doux, et prépare la gremolata au dernier moment.",
      "allergenes": [
        "gluten",
        "lait",
        "celeri",
        "sulfites"
      ],
      "noteAllergenes": "Vérifie aussi la composition de ton bouillon. Pour une version sans gluten, remplace la farine de blé par de la fécule ou de la farine de riz.",
      "regime": {
        "sansViande": false,
        "sansPoisson": true
      },
      "origine": {
        "pays": "Italie (Milan)",
        "drapeau": "🇮🇹",
        "resume": "Spécialité de Milan et de la Lombardie, l'osso buco est un jarret de veau braisé, souvent servi avec un risotto à la milanaise ou de la polenta.",
        "faits": [
          "« Ossobuco » signifie « os troué » : le nom fait référence à l'os à moelle placé au centre de chaque tranche de jarret, et cette moelle est considérée comme un régal.",
          "Son origine exacte est mal documentée : on en trouve des traces dans des livres de cuisine milanais du XIXe siècle, et Pellegrino Artusi l'a repris en 1891 dans « La scienza in cucina e l'arte di mangiar bene ».",
          "On distingue une version ancienne « in bianco », sans tomate, parfumée notamment au laurier et à la gremolata, et une version moderne à la tomate, aujourd'hui la plus répandue."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Ossobuco",
            "url": "https://en.wikipedia.org/wiki/Ossobuco"
          },
          {
            "titre": "Scatti di Gusto — Ossobuco alla milanese, la ricetta scientifica",
            "url": "https://www.scattidigusto.it/2019/01/27/ossobuco-milanese-ricetta-scientifica/"
          },
          {
            "titre": "Dissapore — Ossobuco alla milanese, la ricetta tradizionale con la gremolada",
            "url": "https://www.dissapore.com/ricette/ossobuco-alla-milanese/"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "parmentiercanard",
      "url": "parmentier-canard-confit.html",
      "titre": "Parmentier de canard confit",
      "titreCourt": "Parmentier de canard",
      "alias": [
        "hachis parmentier de canard",
        "parmentier au confit de canard",
        "parmentier canard"
      ],
      "emoji": "🦆",
      "categorie": "plat",
      "badge": "Bistrot chic",
      "accroche": "Du confit de canard effiloché aux échalotes sous une purée maison au beurre, gratinée au four.",
      "intro": "Le hachis parmentier dans sa version la plus festive : le confit de canard apporte une chair fondante et parfumée, la purée maison l'enveloppe de douceur. Un plat généreux qui se prépare à l'avance et se gratine au dernier moment.",
      "images": [],
      "cover": {
        "motif": "plat-four",
        "fond": "#3a2216",
        "encre": "#f6efe4",
        "accent": "#e8a93c"
      },
      "temps": {
        "preparation": 30,
        "cuisson": 55,
        "repos": 5
      },
      "difficulte": "Facile",
      "portions": {
        "base": 4,
        "unite": "personne",
        "pluriel": "personnes",
        "min": 2,
        "max": 12,
        "pas": 2
      },
      "tags": [
        "viande",
        "francais",
        "traditionnel",
        "sale",
        "plat",
        "chaud",
        "four",
        "hiver",
        "reconfort",
        "copieux",
        "gourmand",
        "familial",
        "convivial",
        "invite"
      ],
      "ingredients": [
        {
          "groupe": "Pour la garniture",
          "items": [
            {
              "nom": "Cuisses de canard confites",
              "qte": 4,
              "unite": "pièce"
            },
            {
              "nom": "Échalotes",
              "qte": 3,
              "unite": "pièce"
            },
            {
              "nom": "Ail",
              "qte": 1,
              "unite": "gousse"
            },
            {
              "nom": "Persil plat",
              "qte": 6,
              "unite": "brin"
            },
            {
              "nom": "Poivre du moulin",
              "qte": null,
              "unite": "",
              "note": "selon le goût"
            }
          ]
        },
        {
          "groupe": "Pour la purée",
          "items": [
            {
              "nom": "Pommes de terre farineuses (type Bintje)",
              "qte": 1000,
              "unite": "g"
            },
            {
              "nom": "Lait entier",
              "qte": 200,
              "unite": "ml"
            },
            {
              "nom": "Beurre doux",
              "qte": 50,
              "unite": "g"
            },
            {
              "nom": "Noix de muscade râpée",
              "qte": 1,
              "unite": "pincée",
              "fixe": true,
              "optionnel": true
            },
            {
              "nom": "Gros sel (pour l'eau) et sel fin",
              "qte": null,
              "unite": "",
              "note": "selon le goût"
            }
          ]
        },
        {
          "groupe": "Pour gratiner",
          "items": [
            {
              "nom": "Chapelure",
              "qte": 2,
              "unite": "c. à soupe",
              "optionnel": true
            },
            {
              "nom": "Beurre doux",
              "qte": 10,
              "unite": "g"
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Faire fondre le confit",
          "texte": "Pose les cuisses de canard côté peau dans une grande poêle froide et chauffe à feu doux environ 10 minutes : la graisse fond et la chair se réchauffe. Retire les cuisses et garde la graisse dans la poêle.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Confit réchauffé"
            }
          ]
        },
        {
          "titre": "Cuire les pommes de terre",
          "texte": "Épluche les pommes de terre et coupe-les en morceaux de même taille. Mets-les dans une grande casserole d'eau froide salée au gros sel, porte à ébullition et laisse cuire 20 à 25 minutes, jusqu'à ce que la pointe d'un couteau s'y enfonce sans résistance.",
          "minuteurs": [
            {
              "secondes": 1200,
              "label": "Vérifier la cuisson"
            },
            {
              "secondes": 1500,
              "label": "Pommes de terre cuites"
            }
          ]
        },
        {
          "titre": "Effilocher le canard",
          "texte": "Retire la peau et les os des cuisses encore tièdes, puis effiloche la chair avec deux fourchettes. Passe les doigts dans la viande pour vérifier qu'il ne reste aucun petit os ni cartilage."
        },
        {
          "titre": "La garniture",
          "texte": "Garde 1 cuillère à soupe de graisse de canard dans la poêle (le reste se conserve pour d'autres cuissons). Fais-y suer les échalotes ciselées et l'ail haché 3 minutes à feu doux, ajoute la chair effilochée et laisse-la revenir 5 minutes. Hors du feu, ajoute le persil ciselé et poivre : goûte avant de saler, le confit l'est déjà.",
          "minuteurs": [
            {
              "secondes": 180,
              "label": "Échalotes"
            },
            {
              "secondes": 300,
              "label": "Canard revenu"
            }
          ]
        },
        {
          "titre": "La purée",
          "texte": "Préchauffe le four à 200 °C et fais chauffer le lait sans le laisser bouillir. Égoutte les pommes de terre, remets-les 1 minute dans la casserole sur le feu pour les sécher, puis passe-les au presse-purée (jamais au mixeur, la purée deviendrait élastique). Incorpore le beurre en morceaux, puis le lait chaud petit à petit, la muscade et du sel fin."
        },
        {
          "titre": "Le montage",
          "texte": "Étale la garniture au canard dans un plat à gratin et recouvre-la de purée sans tasser. Lisse la surface et trace des sillons à la fourchette : ils doreront joliment. Parsème de chapelure et de petits morceaux de beurre."
        },
        {
          "titre": "Gratiner au four",
          "texte": "Enfourne pour 20 à 25 minutes à 200 °C. Le parmentier est prêt quand la surface est bien dorée et que les bords bouillonnent légèrement.",
          "minuteurs": [
            {
              "secondes": 1200,
              "label": "Gratin doré"
            },
            {
              "secondes": 1500,
              "label": "Gratin bien doré"
            }
          ]
        },
        {
          "titre": "Repos et service",
          "texte": "Laisse reposer 5 minutes hors du four pour que les parts se tiennent mieux au service. Sers bien chaud, avec une salade verte bien assaisonnée.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Repos du parmentier"
            }
          ]
        }
      ],
      "astuces": [
        "Pour une purée légère et sans grumeaux, sèche bien les pommes de terre après égouttage et ajoute le lait chaud, jamais froid.",
        "Garde précieusement la graisse de canard restante au réfrigérateur dans un bocal : elle fait des pommes de terre sautées incomparables.",
        "Tu peux monter le parmentier la veille et le garder au réfrigérateur, filmé ; ajoute alors 10 minutes de cuisson pour qu'il soit bien chaud au centre."
      ],
      "choix": {
        "titre": "Variantes de purée",
        "mode": "single",
        "label": "Ta purée",
        "options": [
          "Pommes de terre classiques",
          "Moitié patate douce",
          "Moitié potimarron",
          "Moitié céleri-rave",
          "Moitié panais",
          "Topinambours",
          "Purée à l'huile de truffe"
        ]
      },
      "accords": [
        {
          "titre": "Le classique",
          "texte": "une salade verte à la vinaigrette moutardée."
        },
        {
          "titre": "L'automnal",
          "texte": "une purée moitié potimarron pour une touche douce."
        },
        {
          "titre": "Le croquant",
          "texte": "quelques cerneaux de noix concassés sur le gratin."
        },
        {
          "titre": "Côté vin",
          "texte": "un vin rouge du Sud-Ouest, structuré mais pas trop tannique."
        }
      ],
      "conservation": "Jusqu'à 2 jours au réfrigérateur, couvert. Réchauffe au four à 180 °C jusqu'à ce que le centre soit bien chaud.",
      "allergenes": [
        "lait",
        "gluten"
      ],
      "noteAllergenes": "Le gluten vient de la chapelure : sans elle, la recette n'en contient pas. Vérifie la composition du confit du commerce.",
      "regime": {
        "sansViande": false,
        "sansPoisson": true
      },
      "origine": {
        "pays": "France (Sud-Ouest)",
        "drapeau": "🇫🇷",
        "resume": "Le mariage d'un grand classique familial, le hachis parmentier, et du confit de canard, spécialité du Sud-Ouest.",
        "faits": [
          "Le hachis parmentier doit son nom au pharmacien Antoine-Augustin Parmentier (1737-1813), qui a consacré une grande partie de sa vie à promouvoir la pomme de terre ; les sources ne s'accordent pas pour dire qu'il ait lui-même inventé le plat.",
          "Le confit de canard est fabriqué partout en France, mais il est considéré comme une spécialité de la Gascogne.",
          "Le confit est un procédé de conservation ancien : la viande est d'abord salée, puis cuite lentement dans sa propre graisse."
        ],
        "sources": [
          {
            "titre": "France Today — Hot Potato: The History of Hachis Parmentier",
            "url": "https://www.francetoday.com/food-drink/hot-potato-the-history-of-hachis-parmentier/"
          },
          {
            "titre": "Wikipédia (en) — Duck confit",
            "url": "https://en.wikipedia.org/wiki/Duck_confit"
          },
          {
            "titre": "Wikipédia (en) — Confit",
            "url": "https://en.wikipedia.org/wiki/Confit"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "soupealoignon",
      "url": "soupe-a-l-oignon.html",
      "titre": "Soupe à l'oignon gratinée",
      "titreCourt": "Soupe à l'oignon",
      "alias": [
        "soupe a l'oignon",
        "gratinee a l'oignon",
        "soupe a l'oignon gratinee",
        "french onion soup"
      ],
      "emoji": "🧅",
      "categorie": "plat",
      "badge": "Bistrot parisien",
      "accroche": "Oignons longuement caramélisés, bouillon corsé et croûtons sous une croûte de comté gratiné.",
      "intro": "La grande soupe des bistrots parisiens : des oignons fondus jusqu'au brun caramel, un bouillon profond et un chapeau de fromage qui file à chaque cuillerée. Tout le secret tient dans la patience : laisse les oignons prendre leur temps, la soupe fera le reste.",
      "images": [],
      "cover": {
        "motif": "bol",
        "fond": "#4a2a12",
        "encre": "#f6efe4",
        "accent": "#e8a93c"
      },
      "temps": {
        "preparation": 20,
        "cuisson": 85,
        "repos": 0
      },
      "difficulte": "Facile",
      "portions": {
        "base": 4,
        "unite": "bol",
        "pluriel": "bols",
        "min": 2,
        "max": 12,
        "pas": 2
      },
      "tags": [
        "francais",
        "traditionnel",
        "sale",
        "plat",
        "chaud",
        "hiver",
        "reconfort",
        "mijote",
        "four",
        "convivial",
        "gourmand",
        "invite"
      ],
      "ingredients": [
        {
          "groupe": "Pour la soupe",
          "items": [
            {
              "nom": "Oignons jaunes",
              "qte": 800,
              "unite": "g"
            },
            {
              "nom": "Beurre doux",
              "qte": 50,
              "unite": "g"
            },
            {
              "nom": "Huile neutre",
              "qte": 1,
              "unite": "c. à soupe"
            },
            {
              "nom": "Farine de blé",
              "qte": 1,
              "unite": "c. à soupe"
            },
            {
              "nom": "Vin blanc sec",
              "qte": 150,
              "unite": "ml"
            },
            {
              "nom": "Bouillon de bœuf chaud",
              "qte": 1200,
              "unite": "ml"
            },
            {
              "nom": "Bouquet garni (thym, laurier)",
              "qte": 1,
              "unite": "bouquet",
              "fixe": true
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
          "groupe": "Pour la gratinée",
          "items": [
            {
              "nom": "Tranches de baguette (de la veille)",
              "qte": 8,
              "unite": "tranche"
            },
            {
              "nom": "Comté ou gruyère râpé",
              "qte": 160,
              "unite": "g"
            },
            {
              "nom": "Gousse d'ail",
              "qte": 1,
              "unite": "gousse",
              "optionnel": true,
              "fixe": true
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Émincer les oignons",
          "texte": "Pèle les oignons, coupe-les en deux puis émince-les en lamelles fines et régulières d'environ 3 mm. Des lamelles de même épaisseur colorent toutes au même rythme."
        },
        {
          "titre": "Faire fondre",
          "texte": "Fais chauffer le beurre et l'huile dans une cocotte à fond épais à feu moyen. Ajoute les oignons avec une pincée de sel et laisse-les fondre une dizaine de minutes en remuant, jusqu'à ce qu'ils soient souples et translucides.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Oignons fondus"
            }
          ]
        },
        {
          "titre": "Caraméliser lentement",
          "texte": "Baisse sur feu doux à moyen et laisse colorer 35 à 40 minutes en remuant régulièrement et en grattant le fond avec une spatule en bois. Si les sucs foncent trop vite, ajoute une cuillère d'eau : les oignons doivent devenir brun caramel, jamais noirs, sinon la soupe sera amère.",
          "minuteurs": [
            {
              "secondes": 2100,
              "label": "Vérifier la couleur"
            },
            {
              "secondes": 2400,
              "label": "Oignons caramélisés"
            }
          ]
        },
        {
          "titre": "Singer et déglacer",
          "texte": "Saupoudre la farine sur les oignons et remue 1 à 2 minutes pour la cuire. Verse le vin blanc et gratte bien le fond pour dissoudre tous les sucs, puis laisse réduire 2 minutes.",
          "minuteurs": [
            {
              "secondes": 120,
              "label": "Réduction du vin"
            }
          ]
        },
        {
          "titre": "Le mijotage",
          "texte": "Ajoute le bouillon chaud et le bouquet garni, porte à frémissement puis laisse mijoter 25 minutes, couvercle entrouvert. Retire le bouquet garni, goûte, sale et poivre.",
          "minuteurs": [
            {
              "secondes": 1500,
              "label": "Mijotage"
            }
          ]
        },
        {
          "titre": "Les croûtons",
          "texte": "Pendant ce temps, préchauffe le four à 200 °C et fais griller les tranches de baguette sur une plaque 5 à 6 minutes, jusqu'à ce qu'elles soient sèches et blondes. Frotte-les éventuellement avec la gousse d'ail coupée en deux.",
          "minuteurs": [
            {
              "secondes": 330,
              "label": "Croûtons"
            }
          ]
        },
        {
          "titre": "Le montage",
          "texte": "Allume le gril du four. Pose des bols allant au four sur une plaque, remplis-les de soupe brûlante aux trois quarts, dépose 2 croûtons par bol et couvre généreusement de fromage râpé jusqu'aux bords."
        },
        {
          "titre": "Gratiner",
          "texte": "Glisse la plaque sous le gril, en position haute, environ 5 minutes, jusqu'à ce que le fromage bouillonne et se tache de brun. Surveille sans t'éloigner, puis sers avec précaution : les bols sont brûlants.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Gratinée"
            }
          ]
        }
      ],
      "astuces": [
        "Ne monte pas le feu pour gagner du temps : des oignons caramélisés trop vite brûlent en surface et donnent de l'amertume au lieu de la douceur.",
        "Utilise du pain rassis et bien grillé : il absorbe le bouillon sans se transformer en bouillie et soutient la croûte de fromage.",
        "Le vin mijote longuement dans la soupe, mais pour une version sans alcool, remplace-le simplement par la même quantité de bouillon et ajoute un trait de vinaigre de cidre en fin de cuisson pour l'acidité."
      ],
      "choix": {
        "titre": "Fromage de la gratinée",
        "mode": "single",
        "label": "Ton fromage",
        "options": [
          "Comté fruité",
          "Gruyère",
          "Emmental",
          "Beaufort",
          "Cantal entre-deux",
          "Mélange comté-parmesan"
        ]
      },
      "accords": [
        {
          "titre": "Le bistrot",
          "texte": "une salade verte bien vinaigrée pour couper la richesse du fromage."
        },
        {
          "titre": "Côté vin",
          "texte": "un vin blanc sec et fruité, dans l'esprit de celui de la recette."
        },
        {
          "titre": "Le repas complet",
          "texte": "une assiette de charcuterie fine en entrée, puis la soupe en plat."
        },
        {
          "titre": "Le dessert",
          "texte": "un dessert léger aux fruits, comme une tarte fine aux pommes."
        }
      ],
      "conservation": "La soupe sans pain ni fromage se garde 2 à 3 jours au réfrigérateur dans une boîte fermée ; réchauffe-la bien chaude et gratine-la seulement au moment de servir.",
      "allergenes": [
        "gluten",
        "lait",
        "sulfites"
      ],
      "noteAllergenes": "Vérifie aussi la composition de ton bouillon (il contient parfois du céleri). Le vin blanc est mijoté, mais la soupe peut encore en contenir un peu : voir l'astuce pour une version sans alcool.",
      "regime": {
        "sansViande": false,
        "sansPoisson": true,
        "adaptableSansViande": true
      },
      "origine": {
        "pays": "France (Paris)",
        "drapeau": "🇫🇷",
        "resume": "La soupe à l'oignon est très ancienne, mais sa version gratinée est associée aux restaurants des anciennes Halles de Paris.",
        "faits": [
          "La version moderne, couverte de fromage râpé et passée sous le gril, est généralement datée du milieu du XIXe siècle, dans les restaurants qui entouraient les Halles de Paris.",
          "Avant de devenir la « gratinée des Halles », la soupe à l'oignon était un plat populaire et bon marché, souvent décrit comme une soupe de pauvres.",
          "Des légendes attribuent son invention au roi Louis XV ou à Stanislas Leszczynski, mais aucune ne repose sur des documents solides."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — French onion soup",
            "url": "https://en.wikipedia.org/wiki/French_onion_soup"
          },
          {
            "titre": "Vice — The curious history of French onion soup",
            "url": "https://vice.com/en/article/the-curious-history-of-french-onion-soup-pariss-timeless-hangover-cure"
          },
          {
            "titre": "Culture Trip — A brief history of French onion soup",
            "url": "https://theculturetrip.com/france/paris/articles/a-brief-history-of-french-onion-soup"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "oeufsenmeurette",
      "url": "oeufs-en-meurette.html",
      "titre": "Œufs en meurette à la bourguignonne",
      "titreCourt": "Œufs en meurette",
      "alias": [
        "oeufs meurette",
        "oeuf en meurette",
        "oeufs poches au vin rouge",
        "sauce meurette"
      ],
      "emoji": "🍳",
      "categorie": "plat",
      "badge": "Grand classique",
      "accroche": "Œufs pochés au jaune coulant, sauce au vin rouge, lardons, champignons et croûtons frottés à l'ail.",
      "intro": "Un monument de la cuisine bourguignonne : une sauce au vin rouge réduite et brillante, des lardons et des champignons dorés, et des œufs pochés qui s'ouvrent sur un jaune coulant. Servi en entrée ou en plat, c'est le bistrot de luxe à la maison.",
      "images": [],
      "cover": {
        "motif": "assiette",
        "fond": "#3d0f1f",
        "encre": "#f6efe4",
        "accent": "#f2b632"
      },
      "temps": {
        "preparation": 20,
        "cuisson": 45,
        "repos": 0
      },
      "difficulte": "Intermédiaire",
      "portions": {
        "base": 4,
        "unite": "personne",
        "pluriel": "personnes",
        "min": 2,
        "max": 8,
        "pas": 2
      },
      "tags": [
        "francais",
        "traditionnel",
        "viande",
        "sale",
        "plat",
        "chaud",
        "hiver",
        "reconfort",
        "raffine",
        "gastronomique",
        "invite",
        "dimanche"
      ],
      "ingredients": [
        {
          "groupe": "Pour la sauce meurette",
          "items": [
            {
              "nom": "Vin rouge de Bourgogne (pinot noir)",
              "qte": 750,
              "unite": "ml"
            },
            {
              "nom": "Échalotes",
              "qte": 3,
              "unite": "pièce"
            },
            {
              "nom": "Gousse d'ail",
              "qte": 1,
              "unite": "gousse"
            },
            {
              "nom": "Bouquet garni (thym, laurier)",
              "qte": 1,
              "unite": "bouquet",
              "fixe": true
            },
            {
              "nom": "Fond de veau ou bouillon de volaille",
              "qte": 200,
              "unite": "ml"
            },
            {
              "nom": "Beurre mou (pour le beurre manié)",
              "qte": 30,
              "unite": "g"
            },
            {
              "nom": "Farine de blé",
              "qte": 20,
              "unite": "g"
            },
            {
              "nom": "Sucre",
              "qte": 1,
              "unite": "pincée",
              "optionnel": true,
              "fixe": true
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
              "nom": "Lardons fumés",
              "qte": 150,
              "unite": "g"
            },
            {
              "nom": "Champignons de Paris",
              "qte": 200,
              "unite": "g"
            },
            {
              "nom": "Petits oignons grelots",
              "qte": 12,
              "unite": "pièce",
              "optionnel": true
            },
            {
              "nom": "Beurre doux",
              "qte": 15,
              "unite": "g"
            }
          ]
        },
        {
          "groupe": "Pour les œufs et les croûtons",
          "items": [
            {
              "nom": "Œufs extra-frais",
              "qte": 8,
              "unite": "pièce"
            },
            {
              "nom": "Vinaigre blanc (d'alcool)",
              "qte": 2,
              "unite": "c. à soupe",
              "fixe": true
            },
            {
              "nom": "Tranches de pain de campagne",
              "qte": 4,
              "unite": "tranche"
            },
            {
              "nom": "Beurre pour les croûtons",
              "qte": 20,
              "unite": "g"
            },
            {
              "nom": "Gousse d'ail (pour frotter)",
              "qte": 1,
              "unite": "gousse",
              "fixe": true
            },
            {
              "nom": "Persil plat",
              "qte": 2,
              "unite": "brin",
              "optionnel": true
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Réduire le vin",
          "texte": "Cisèle finement les échalotes et écrase la gousse d'ail. Mets-les dans une casserole avec le vin rouge et le bouquet garni, porte à ébullition puis laisse réduire de moitié à feu moyen, environ 20 minutes.",
          "minuteurs": [
            {
              "secondes": 1200,
              "label": "Réduction du vin"
            }
          ]
        },
        {
          "titre": "Mouiller et filtrer",
          "texte": "Ajoute le fond de veau ou le bouillon et laisse frémir encore 10 minutes. Passe la sauce au chinois ou dans une passoire fine en pressant bien les échalotes, puis remets-la dans la casserole.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Sauce"
            }
          ]
        },
        {
          "titre": "La garniture",
          "texte": "Fais dorer les lardons à sec dans une poêle 4 à 5 minutes, puis retire-les. Dans la même poêle, ajoute le beurre et fais dorer les grelots épluchés 5 minutes à feu moyen en les roulant, puis ajoute les champignons coupés en quartiers et fais sauter le tout 8 minutes à feu vif, jusqu'à ce que tout soit bien doré ; remets alors les lardons.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Lardons"
            },
            {
              "secondes": 300,
              "label": "Grelots"
            },
            {
              "secondes": 480,
              "label": "Champignons"
            }
          ]
        },
        {
          "titre": "Lier au beurre manié",
          "texte": "Malaxe à la fourchette le beurre mou avec la farine. Incorpore cette pâte en petits morceaux dans la sauce frémissante en fouettant, puis laisse cuire 2 à 3 minutes : elle doit napper le dos d'une cuillère. Goûte, sale, poivre, ajoute la pincée de sucre si le vin est trop acide, puis la garniture, et garde au chaud à feu très doux.",
          "minuteurs": [
            {
              "secondes": 180,
              "label": "Liaison de la sauce"
            }
          ]
        },
        {
          "titre": "Les croûtons",
          "texte": "Fais dorer les tranches de pain dans le beurre à la poêle, 1 à 2 minutes par face. Frotte-les aussitôt avec la gousse d'ail coupée en deux et réserve-les au chaud.",
          "minuteurs": [
            {
              "secondes": 120,
              "label": "Croûtons (par face)"
            }
          ]
        },
        {
          "titre": "Pocher les œufs",
          "texte": "Porte à frémissement une grande casserole d'eau non salée avec le vinaigre : de petites bulles, jamais de gros bouillons. Casse chaque œuf dans un ramequin, fais-le glisser au ras de l'eau et poche 3 minutes, en en faisant 3 ou 4 à la fois : le blanc doit être pris et le jaune souple au toucher.",
          "minuteurs": [
            {
              "secondes": 180,
              "label": "Œufs pochés"
            }
          ]
        },
        {
          "titre": "Égoutter et parer",
          "texte": "Sors les œufs à l'écumoire et pose-les sur du papier absorbant. Coupe aux ciseaux les filaments de blanc qui dépassent pour leur donner une jolie forme."
        },
        {
          "titre": "Le dressage",
          "texte": "Pose un croûton dans chaque assiette creuse chaude, dépose 2 œufs dessus et nappe généreusement de sauce et de garniture. Parsème de persil ciselé et sers immédiatement."
        }
      ],
      "astuces": [
        "Utilise les œufs les plus frais possible : leur blanc épais se resserre autour du jaune au lieu de s'effilocher dans l'eau.",
        "Pour recevoir, poche les œufs à l'avance, plonge-les dans un bol d'eau glacée et garde-les au frais ; au moment de servir, réchauffe-les 1 minute dans de l'eau frémissante.",
        "Ne sale pas l'eau de pochage (le sel fait se disperser le blanc), et sale la sauce seulement à la fin : la réduction et les lardons concentrent déjà le sel."
      ],
      "securite": NOTE_JAUNE_COULANT,
      "sourcesSecurite": [
        {
          "titre": "Institut Pasteur — Salmonellose (prévention)",
          "url": "https://www.pasteur.fr/fr/centre-medical/fiches-maladies/salmonellose"
        }
      ],
      "choix": {
        "titre": "Garniture & accompagnements",
        "mode": "multi",
        "label": "Ta composition",
        "options": [
          "Lardons fumés",
          "Champignons de Paris",
          "Petits oignons glacés",
          "Croûtons aillés",
          "Persil plat",
          "Salade de mâche",
          "Purée maison",
          "Pain de campagne grillé"
        ]
      },
      "accords": [
        {
          "titre": "En entrée",
          "texte": "un œuf par personne sur un petit croûton, avant une volaille rôtie."
        },
        {
          "titre": "En plat",
          "texte": "deux œufs par personne avec une purée de pommes de terre pour la sauce."
        },
        {
          "titre": "Côté vin",
          "texte": "un vin rouge léger de pinot noir, de la même région que celui de la sauce."
        },
        {
          "titre": "Pour la fraîcheur",
          "texte": "une salade de mâche ou de frisée à l'huile de noix servie à côté."
        }
      ],
      "conservation": "La sauce meurette se garde 2 jours au réfrigérateur dans une boîte fermée et se réchauffe doucement ; les œufs pochés se préparent au dernier moment et se consomment aussitôt.",
      "allergenes": [
        "oeufs",
        "gluten",
        "lait",
        "sulfites"
      ],
      "noteAllergenes": "Vérifie aussi la composition de ton fond ou de ton bouillon (céleri possible). La sauce repose sur du vin rouge longuement réduit mais peut encore contenir un peu d'alcool : pour un repas sans alcool, sers les œufs pochés, les lardons et les champignons avec un fond de veau réduit et lié au beurre manié, sans vin.",
      "regime": {
        "sansViande": false,
        "sansPoisson": true
      },
      "origine": {
        "pays": "France (Bourgogne)",
        "drapeau": "🇫🇷",
        "resume": "Plat traditionnel bourguignon d'œufs pochés nappés d'une sauce au vin rouge, servis sur du pain grillé aillé.",
        "faits": [
          "La sauce meurette, aussi appelée sauce bourguignonne, associe vin rouge de Bourgogne, lardons, oignons et échalotes.",
          "On raconte souvent que le plat serait né pour utiliser les restes de sauce du bœuf bourguignon, mais aucune source écrite ne l'atteste : ses origines restent mal documentées.",
          "Au château du Clos de Vougeot, en Bourgogne, les œufs en meurette sont servis lors de chaque repas organisé depuis 1953, et le château accueille depuis 2019 un championnat du monde consacré à ce plat."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Oeufs en meurette",
            "url": "https://en.wikipedia.org/wiki/Oeufs_en_meurette"
          },
          {
            "titre": "World of Fine Wine — Oeufs en meurette: best wine pairings",
            "url": "https://worldoffinewine.com/homepage-featured-articles/oeufs-en-meurette-best-wine-pairings"
          },
          {
            "titre": "Château du Clos de Vougeot — The world championship of oeufs en meurette",
            "url": "https://closdevougeot.fr/en/events/86/the-world-championship-of-oeufs-en-meurette"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "soufflefromage",
      "url": "souffle-au-fromage.html",
      "titre": "Soufflé au fromage",
      "titreCourt": "Soufflé au fromage",
      "alias": [
        "souffle au fromage",
        "souffle fromage",
        "souffle au comte",
        "cheese souffle"
      ],
      "emoji": "🧀",
      "categorie": "plat",
      "badge": "Gastronomique",
      "accroche": "Une béchamel au comté, des blancs montés avec soin, et un soufflé haut et doré qui tremblote à cœur.",
      "intro": "Le soufflé a la réputation d'être capricieux, mais il obéit surtout à quelques gestes précis : un moule bien chemisé, des blancs fermes et une incorporation tout en douceur. Le voilà qui monte au-dessus du moule, doré dehors et crémeux dedans : c'est toute la magie de la cuisine française.",
      "images": [],
      "cover": {
        "motif": "ramequin",
        "fond": "#5a3a0c",
        "encre": "#f6efe4",
        "accent": "#f4c542"
      },
      "temps": {
        "preparation": 25,
        "cuisson": 35,
        "repos": 0
      },
      "difficulte": "Intermédiaire",
      "portions": {
        "base": 4,
        "unite": "personne",
        "pluriel": "personnes",
        "min": 2,
        "max": 8,
        "pas": 2
      },
      "tags": [
        "francais",
        "traditionnel",
        "vegetarien",
        "sale",
        "plat",
        "chaud",
        "four",
        "raffine",
        "gastronomique",
        "invite",
        "romantique",
        "hiver"
      ],
      "ingredients": [
        {
          "groupe": "Pour le moule",
          "items": [
            {
              "nom": "Beurre mou",
              "qte": 15,
              "unite": "g"
            },
            {
              "nom": "Parmesan râpé finement",
              "qte": 2,
              "unite": "c. à soupe"
            }
          ]
        },
        {
          "groupe": "Pour la béchamel",
          "items": [
            {
              "nom": "Beurre doux",
              "qte": 40,
              "unite": "g"
            },
            {
              "nom": "Farine de blé",
              "qte": 40,
              "unite": "g"
            },
            {
              "nom": "Lait entier",
              "qte": 250,
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
        },
        {
          "groupe": "Pour l'appareil",
          "items": [
            {
              "nom": "Œufs (jaunes et blancs séparés)",
              "qte": 4,
              "unite": "pièce"
            },
            {
              "nom": "Blanc d'œuf supplémentaire",
              "qte": 1,
              "unite": "pièce",
              "optionnel": true
            },
            {
              "nom": "Comté râpé finement",
              "qte": 100,
              "unite": "g"
            },
            {
              "nom": "Sel fin (pour les blancs)",
              "qte": 1,
              "unite": "pincée",
              "fixe": true
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Chemiser le moule",
          "texte": "Préchauffe le four à 180 °C, grille placée dans le tiers inférieur. Beurre un moule à soufflé de 18 à 20 cm de diamètre en remontant le pinceau du fond vers le bord en traits verticaux, saupoudre de parmesan, retourne pour ôter l'excédent et réserve au frais."
        },
        {
          "titre": "La béchamel",
          "texte": "Fais fondre le beurre dans une casserole, ajoute la farine et remue 1 à 2 minutes sans laisser colorer. Verse le lait d'un coup en fouettant vivement et laisse épaissir 2 à 3 minutes sur feu doux : la béchamel doit être très épaisse. Hors du feu, assaisonne de sel, de poivre et de muscade.",
          "minuteurs": [
            {
              "secondes": 180,
              "label": "Béchamel"
            }
          ]
        },
        {
          "titre": "Jaunes et fromage",
          "texte": "Laisse tiédir la béchamel 5 minutes, puis incorpore les jaunes un à un en fouettant. Ajoute le comté râpé et mélange jusqu'à ce que la base soit lisse ; goûte, elle doit être bien relevée, car les blancs vont l'adoucir.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Tiédir la béchamel"
            }
          ]
        },
        {
          "titre": "Monter les blancs",
          "texte": "Dans un saladier bien propre et sec, fouette les blancs (avec le blanc supplémentaire si tu l'utilises) et la pincée de sel, d'abord doucement puis plus vite. Arrête-toi quand ils sont fermes, lisses et brillants et forment un bec d'oiseau : des blancs trop battus deviennent granuleux et se mélangent mal."
        },
        {
          "titre": "Incorporer",
          "texte": "Mélange vivement un quart des blancs dans la base pour la détendre. Ajoute le reste en deux fois et incorpore à la maryse en soulevant la masse du fond vers le dessus, en tournant le saladier, juste jusqu'à ce qu'il ne reste plus de traces blanches importantes."
        },
        {
          "titre": "Remplir le moule",
          "texte": "Verse l'appareil dans le moule jusqu'à 1 cm du bord et lisse la surface. Passe le pouce tout autour, contre la paroi, pour creuser une petite rigole : le soufflé montera droit, avec un joli chapeau."
        },
        {
          "titre": "La cuisson",
          "texte": "Enfourne aussitôt pour 25 à 30 minutes, sans ouvrir la porte pendant les 20 premières minutes. Le soufflé est prêt quand il a bien gonflé, que le dessus est doré et qu'il tremblote encore légèrement au centre quand tu bouges le plat.",
          "minuteurs": [
            {
              "secondes": 1500,
              "label": "Cœur crémeux"
            },
            {
              "secondes": 1800,
              "label": "Bien pris"
            }
          ]
        },
        {
          "titre": "Servir aussitôt",
          "texte": "Apporte le soufflé directement à table : il commence à retomber dès la sortie du four. Plonge deux cuillères au centre pour servir à chacun un peu de croûte et de cœur crémeux."
        }
      ],
      "astuces": [
        "Le moule chemisé n'est pas qu'un détail : les traits de beurre verticaux et le fromage donnent au soufflé une paroi où s'accrocher pour monter bien droit.",
        "Tu peux préparer la base (béchamel, jaunes et fromage) quelques heures à l'avance, filmée au contact ; réchauffe-la légèrement et monte les blancs seulement au moment d'enfourner.",
        "En ramequins individuels de 150 à 200 ml, beurrés et chemisés, compte environ 12 à 15 minutes à la même température, et surveille à travers la vitre."
      ],
      "choix": {
        "titre": "Fromage du soufflé",
        "mode": "single",
        "label": "Ton fromage",
        "options": [
          "Comté",
          "Gruyère",
          "Beaufort",
          "Emmental",
          "Roquefort émietté",
          "Comté et parmesan",
          "Chèvre frais"
        ]
      },
      "accords": [
        {
          "titre": "L'entrée chic",
          "texte": "en ramequins individuels, avant un poisson ou une volaille."
        },
        {
          "titre": "Le dîner léger",
          "texte": "en plat, avec une salade verte à la vinaigrette moutardée."
        },
        {
          "titre": "Côté vin",
          "texte": "un vin blanc sec du Jura ou de Bourgogne, qui répond bien au comté."
        },
        {
          "titre": "Version de saison",
          "texte": "quelques champignons poêlés ou des épinards servis à côté."
        }
      ],
      "conservation": "Le soufflé se sert immédiatement et ne se conserve pas : il retombe en quelques minutes. Seule la base au fromage peut attendre quelques heures au réfrigérateur, filmée au contact.",
      "allergenes": [
        "oeufs",
        "lait",
        "gluten"
      ],
      "noteAllergenes": "Le comté et le parmesan sont fabriqués avec de la présure animale : si tu cuisines strictement végétarien, choisis des fromages à présure végétale.",
      "regime": {
        "sansViande": true,
        "sansPoisson": true
      },
      "origine": {
        "pays": "France",
        "drapeau": "🇫🇷",
        "resume": "Le soufflé est une création de la cuisine française des XVIIIe et XIXe siècles.",
        "faits": [
          "La plus ancienne mention du soufflé est attribuée au cuisinier français Vincent La Chapelle, au début du XVIIIe siècle.",
          "Son développement et sa popularisation sont généralement attribués au chef Marie-Antoine Carême, au début du XIXe siècle.",
          "Le restaurateur parisien Antoine Beauvilliers est parfois présenté lui aussi comme son « inventeur » : la paternité du soufflé reste discutée."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Soufflé",
            "url": "https://www.Wikipedia.org/wiki/Souffle"
          },
          {
            "titre": "Cincinnati Magazine — Soufflé through the ages",
            "url": "https://www.cincinnatimagazine.com/best-restaurants-archive/souffle-through-the-ages/"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "gnocchibeurresauge",
      "url": "gnocchi-beurre-sauge.html",
      "titre": "Gnocchi de pommes de terre maison, beurre noisette et sauge",
      "titreCourt": "Gnocchi beurre-sauge",
      "alias": [
        "gnocchi maison",
        "gnocchis de pommes de terre",
        "gnocchi beurre sauge",
        "gnocchi di patate"
      ],
      "emoji": "🥔",
      "categorie": "plat",
      "badge": "Fait main",
      "accroche": "Des gnocchi légers comme des nuages, sautés dans un beurre noisette parfumé à la sauge croustillante.",
      "intro": "Rien à voir avec les gnocchi du commerce : faits main, ils sont tendres, légers et fondent presque sous la dent. Le beurre noisette et la sauge frite, avec un voile de parmesan, suffisent à en faire un plat de restaurant.",
      "images": [],
      "cover": {
        "motif": "poele",
        "fond": "#2f3a22",
        "encre": "#f6efe4",
        "accent": "#d9a441"
      },
      "temps": {
        "preparation": 40,
        "cuisson": 75,
        "repos": 0
      },
      "difficulte": "Intermédiaire",
      "portions": {
        "base": 4,
        "unite": "personne",
        "pluriel": "personnes",
        "min": 2,
        "max": 8,
        "pas": 2
      },
      "tags": [
        "italien",
        "vegetarien",
        "sale",
        "plat",
        "chaud",
        "reconfort",
        "gourmand",
        "raffine",
        "four",
        "hiver",
        "convivial",
        "invite"
      ],
      "ingredients": [
        {
          "groupe": "Pour les gnocchi",
          "items": [
            {
              "nom": "Pommes de terre farineuses (bintje)",
              "qte": 1000,
              "unite": "g"
            },
            {
              "nom": "Farine de blé (type 45), plus un peu pour le plan de travail",
              "qte": 250,
              "unite": "g"
            },
            {
              "nom": "Œuf",
              "qte": 1,
              "unite": "pièce"
            },
            {
              "nom": "Sel fin",
              "qte": 1,
              "unite": "c. à café"
            },
            {
              "nom": "Noix de muscade râpée",
              "qte": 1,
              "unite": "pincée",
              "optionnel": true,
              "fixe": true
            },
            {
              "nom": "Gros sel (pour l'eau de cuisson)",
              "qte": null,
              "unite": "",
              "note": "une poignée"
            }
          ]
        },
        {
          "groupe": "Pour le beurre noisette",
          "items": [
            {
              "nom": "Beurre doux",
              "qte": 80,
              "unite": "g"
            },
            {
              "nom": "Feuilles de sauge fraîche",
              "qte": 16,
              "unite": "feuille"
            },
            {
              "nom": "Parmesan râpé",
              "qte": 50,
              "unite": "g"
            },
            {
              "nom": "Poivre noir du moulin",
              "qte": null,
              "unite": "",
              "note": "selon le goût"
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Cuire les pommes de terre",
          "texte": "Préchauffe le four à 200 °C. Lave les pommes de terre, pique-les à la fourchette et fais-les cuire entières avec leur peau sur une plaque 50 minutes à 1 heure, jusqu'à ce qu'une lame les traverse sans résistance. Cuites au four, elles restent sèches et demanderont moins de farine.",
          "minuteurs": [
            {
              "secondes": 3000,
              "label": "Vérifier la cuisson"
            },
            {
              "secondes": 3600,
              "label": "Pommes de terre cuites"
            }
          ]
        },
        {
          "titre": "Écraser chaud",
          "texte": "Coupe-les en deux, récupère la chair encore très chaude et passe-la au presse-purée ou au moulin à légumes au-dessus du plan de travail. Étale-la en couche fine pour que la vapeur s'échappe et laisse tiédir 5 à 10 minutes.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Laisser tiédir"
            }
          ]
        },
        {
          "titre": "La pâte",
          "texte": "Creuse un puits dans la purée tiède, ajoute l'œuf battu, le sel fin et la muscade, puis saupoudre les deux tiers de la farine. Rassemble du bout des doigts et pétris très brièvement, en ajoutant le reste de farine petit à petit seulement si la pâte colle : elle doit être souple et à peine collante. Plus tu la travailles, plus les gnocchi seront élastiques."
        },
        {
          "titre": "Façonner",
          "texte": "Divise la pâte en 6 morceaux et roule chacun sur le plan de travail fariné en boudin de 2 cm de diamètre. Coupe des tronçons de 2 cm et, si tu veux, roule-les sur le dos d'une fourchette pour former des stries qui retiendront le beurre. Dépose-les au fur et à mesure sur une plaque farinée, sans qu'ils se touchent."
        },
        {
          "titre": "Le beurre noisette",
          "texte": "Fais fondre le beurre dans une grande poêle à feu moyen. Laisse-le mousser puis colorer 3 à 4 minutes, jusqu'à ce qu'il prenne une couleur noisette et une odeur de biscuit grillé ; ajoute aussitôt les feuilles de sauge, laisse-les crépiter 30 secondes, puis sors-les sur du papier absorbant et retire la poêle du feu.",
          "minuteurs": [
            {
              "secondes": 210,
              "label": "Beurre noisette"
            }
          ]
        },
        {
          "titre": "Pocher les gnocchi",
          "texte": "Porte à ébullition une grande casserole d'eau avec le gros sel. Plonge les gnocchi en deux ou trois fournées : dès qu'ils remontent à la surface, au bout de 2 à 3 minutes, compte encore 30 secondes et sors-les à l'écumoire.",
          "minuteurs": [
            {
              "secondes": 150,
              "label": "Fournée de gnocchi"
            }
          ]
        },
        {
          "titre": "Les faire sauter",
          "texte": "Dépose les gnocchi directement dans la poêle de beurre noisette remise sur feu moyen, avec une cuillère d'eau de cuisson. Fais-les sauter 1 à 2 minutes en remuant délicatement pour les enrober et les dorer légèrement.",
          "minuteurs": [
            {
              "secondes": 90,
              "label": "Gnocchi sautés"
            }
          ]
        },
        {
          "titre": "Servir",
          "texte": "Répartis les gnocchi dans des assiettes chaudes avec les feuilles de sauge croustillantes. Termine avec le parmesan râpé et un tour de moulin à poivre, et sers aussitôt."
        }
      ],
      "astuces": [
        "Choisis des pommes de terre farineuses (bintje, agata) et non des variétés à chair ferme : leur chair sèche absorbe moins de farine, ce qui donne des gnocchi plus légers.",
        "Fais un test avant de façonner toute la pâte : poche un seul gnocchi ; s'il se délite, ajoute un peu de farine, s'il est ferme et caoutchouteux, la pâte a été trop travaillée.",
        "Les gnocchi crus se congèlent très bien à plat sur une plaque farinée, puis en sac ; fais-les cuire directement surgelés, sans les décongeler, en prolongeant un peu la cuisson."
      ],
      "choix": {
        "titre": "Sauces & variantes",
        "mode": "single",
        "label": "Ta version",
        "options": [
          "Beurre noisette & sauge",
          "Sauce tomate basilic",
          "Pesto au basilic",
          "Gorgonzola crémeux",
          "Gratinés au four",
          "Champignons poêlés",
          "Zestes de citron"
        ]
      },
      "accords": [
        {
          "titre": "La classique",
          "texte": "beurre noisette, sauge croustillante et parmesan."
        },
        {
          "titre": "La gourmande",
          "texte": "une sauce au gorgonzola et quelques noix concassées."
        },
        {
          "titre": "Côté vin",
          "texte": "un vin blanc sec et aromatique, ou un rouge italien léger."
        },
        {
          "titre": "Pour la fraîcheur",
          "texte": "une salade de roquette au citron servie à côté."
        }
      ],
      "conservation": "Les gnocchi crus se gardent quelques heures au réfrigérateur sur une plaque farinée, couverts, ou environ 1 mois au congélateur ; une fois cuits, ils sont bien meilleurs tout de suite.",
      "allergenes": [
        "gluten",
        "oeufs",
        "lait"
      ],
      "noteAllergenes": "Le parmesan est fabriqué avec de la présure animale : si tu cuisines strictement végétarien, choisis un fromage à pâte dure à présure végétale.",
      "regime": {
        "sansViande": true,
        "sansPoisson": true
      },
      "origine": {
        "pays": "Italie",
        "drapeau": "🇮🇹",
        "resume": "Les gnocchi sont de petites boulettes de pâte italiennes, longtemps faites sans pomme de terre avant que la version aux pommes de terre ne s'impose.",
        "faits": [
          "En 1570, le cuisinier Bartolomeo Scappi décrivait des gnocchi de farine et de mie de pain passés sur une râpe, sans pomme de terre.",
          "La date d'apparition des premiers gnocchi aux pommes de terre reste discutée : selon les sources, entre la fin du XVIe et le XVIIIe siècle.",
          "En 1891, Pellegrino Artusi publie dans « La scienza in cucina e l'arte di mangiar bene » l'une des premières recettes faites simplement de pommes de terre et de farine, la version qui s'est ensuite imposée."
        ],
        "sources": [
          {
            "titre": "Saveur — Pasta's Predecessor: The History of Gnocchi",
            "url": "https://www.saveur.com/article/food/history-of-gnocchi"
          },
          {
            "titre": "Romagnoli — Potato gnocchi: how the time-honoured recipe was born",
            "url": "https://www.romagnolipatate.it/en/blog/news/potato-gnocchi-how-the-time-honoured-recipe-was-born"
          },
          {
            "titre": "Ristorante del Ponte — Gnocchi: origin, history and variants",
            "url": "https://ristorantedelponte.ch/gnocchi-origin-history-and-variants/?lang=en"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "tartiflette",
      "url": "tartiflette.html",
      "titre": "Tartiflette savoyarde au reblochon",
      "titreCourt": "Tartiflette",
      "alias": [
        "tartiflette savoyarde",
        "tartiflette au reblochon",
        "gratin au reblochon"
      ],
      "emoji": "🧀",
      "categorie": "plat",
      "badge": "Grand classique",
      "accroche": "Pommes de terre fondantes, lardons, oignons blondis au vin blanc et un reblochon entier qui coule.",
      "intro": "Le plat des soirées d'hiver par excellence : des pommes de terre fondantes, des lardons et des oignons doucement blondis, le tout couronné d'un reblochon entier qui fond et gratine au four. Une recette simple, mais chaque geste compte, de la cuisson des pommes de terre en robe des champs au choix d'un vrai reblochon.",
      "images": [],
      "cover": {
        "motif": "plat-four",
        "fond": "#3a2a12",
        "encre": "#f6efe4",
        "accent": "#f2c14e"
      },
      "temps": {
        "preparation": 20,
        "cuisson": 50,
        "repos": 0
      },
      "difficulte": "Facile",
      "portions": {
        "base": 4,
        "unite": "personne",
        "pluriel": "personnes",
        "min": 2,
        "max": 12
      },
      "tags": [
        "viande",
        "traditionnel",
        "francais",
        "sale",
        "plat",
        "four",
        "hiver",
        "reconfort",
        "convivial",
        "copieux",
        "gourmand",
        "chaud",
        "familial",
        "lourd"
      ],
      "ingredients": [
        {
          "groupe": "Pour la garniture",
          "items": [
            {
              "nom": "Pommes de terre à chair ferme (Charlotte, Amandine…)",
              "qte": 1000,
              "unite": "g"
            },
            {
              "nom": "Lardons fumés",
              "qte": 200,
              "unite": "g"
            },
            {
              "nom": "Oignons jaunes",
              "qte": 2,
              "unite": "pièce"
            },
            {
              "nom": "Beurre doux",
              "qte": 20,
              "unite": "g"
            },
            {
              "nom": "Vin blanc sec de Savoie",
              "qte": 100,
              "unite": "ml"
            },
            {
              "nom": "Crème fraîche épaisse",
              "qte": 3,
              "unite": "c. à soupe",
              "optionnel": true
            },
            {
              "nom": "Ail",
              "qte": 1,
              "unite": "gousse",
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
          "groupe": "Pour le gratin",
          "items": [
            {
              "nom": "Reblochon de Savoie (environ 450 g)",
              "qte": 1,
              "unite": "pièce"
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Les pommes de terre",
          "texte": "Lave les pommes de terre et mets-les entières, avec leur peau, dans une grande casserole d'eau froide salée. Porte à ébullition puis laisse cuire environ 20 minutes à petits bouillons : la pointe d'un couteau doit entrer avec une légère résistance, car elles finiront de cuire au four.",
          "minuteurs": [
            {
              "secondes": 1200,
              "label": "Pommes de terre"
            }
          ]
        },
        {
          "titre": "Lardons et oignons",
          "texte": "Pendant ce temps, émince finement les oignons. Fais dorer les lardons à sec dans une grande poêle à feu moyen, puis ajoute le beurre et les oignons et laisse-les fondre en remuant jusqu'à ce qu'ils soient tendres et blonds, sans brûler.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Lardons"
            },
            {
              "secondes": 600,
              "label": "Oignons blondis"
            }
          ]
        },
        {
          "titre": "Déglacer au vin",
          "texte": "Verse le vin blanc dans la poêle et gratte le fond à la cuillère en bois pour décoller les sucs. Laisse réduire de moitié à feu moyen, puis retire du feu.",
          "minuteurs": [
            {
              "secondes": 180,
              "label": "Réduction du vin"
            }
          ]
        },
        {
          "titre": "Éplucher et trancher",
          "texte": "Préchauffe le four à 200 °C. Égoutte les pommes de terre, laisse-les tiédir quelques minutes, puis pèle-les encore chaudes et coupe-les en rondelles d'environ 5 mm."
        },
        {
          "titre": "Le mélange",
          "texte": "Ajoute les rondelles dans la poêle et mélange délicatement pour les enrober de lardons, d'oignons et de jus, sans les écraser. Poivre généreusement mais sale très peu : les lardons et le reblochon le sont déjà."
        },
        {
          "titre": "Le montage",
          "texte": "Si tu en as, frotte un plat à gratin avec la gousse d'ail coupée en deux, puis verses-y la garniture. Si tu en mets, répartis la crème fraîche par petites cuillerées sur le dessus et égalise la surface."
        },
        {
          "titre": "Le reblochon",
          "texte": "Coupe le reblochon en deux dans l'épaisseur, comme un pain à hamburger, puis chaque disque en deux demi-lunes. Pose-les sur les pommes de terre, croûte vers le haut, en couvrant le plus de surface possible."
        },
        {
          "titre": "Au four",
          "texte": "Enfourne pour 20 à 25 minutes, jusqu'à ce que le reblochon ait coulé entre les pommes de terre et que la croûte soit dorée et bouillonnante. Sers aussitôt, directement dans le plat.",
          "minuteurs": [
            {
              "secondes": 1200,
              "label": "Vérifier le gratin"
            },
            {
              "secondes": 1500,
              "label": "Bien gratinée"
            }
          ]
        }
      ],
      "astuces": [
        "Choisis des pommes de terre à chair ferme et cuis-les dans leur peau : elles prennent moins d'eau et gardent leur tenue au lieu de se transformer en purée sous le fromage.",
        "Préfère un vrai reblochon de Savoie à un « fromage pour tartiflette » : son goût de noisette et sa texture coulante font toute la différence.",
        "Garde la croûte du reblochon : elle dore et apporte du goût. Si tu la trouves trop marquée, gratte-la simplement au couteau sans l'enlever."
      ],
      "choix": {
        "titre": "Accompagnements",
        "mode": "single",
        "label": "Ton accompagnement",
        "options": [
          "Salade verte",
          "Mâche aux noix",
          "Salade d'endives",
          "Charcuterie de Savoie",
          "Jambon cru",
          "Cornichons",
          "Pain de campagne"
        ]
      },
      "accords": [
        {
          "titre": "Le classique",
          "texte": "une grande salade verte bien vinaigrée pour équilibrer la richesse du fromage."
        },
        {
          "titre": "Le montagnard",
          "texte": "une assiette de charcuterie de Savoie et quelques cornichons."
        },
        {
          "titre": "Le croquant",
          "texte": "une salade d'endives et de noix en entrée."
        },
        {
          "titre": "Côté verre",
          "texte": "un vin blanc sec de Savoie, dans l'esprit de celui de la cuisson."
        }
      ],
      "conservation": "Une fois refroidie, elle se garde 2 jours au réfrigérateur, couverte. Réchauffe-la au four à 180 °C jusqu'à ce qu'elle soit bien chaude à cœur.",
      "allergenes": [
        "lait",
        "sulfites"
      ],
      "noteAllergenes": "Les sulfites viennent du vin blanc. Il n'est réduit que quelques minutes, donc une partie de l'alcool peut subsister : pour une version sans alcool, remplace-le par la même quantité d'eau ou de bouillon (vérifie sa composition, il contient parfois du céleri).",
      "regime": {
        "sansViande": false,
        "sansPoisson": true
      },
      "origine": {
        "pays": "France (Savoie)",
        "drapeau": "🇫🇷",
        "resume": "Un gratin savoyard au reblochon, inspiré d'un plat paysan des Aravis et devenu populaire dans les années 1980.",
        "faits": [
          "Elle s'inspire de la péla, un plat paysan de la vallée des Aravis (Thônes, Le Grand-Bornand) : des pommes de terre, des oignons et du reblochon cuits dans une grande poêle à long manche, sans lardons.",
          "Son succès moderne est souvent attribué au Syndicat interprofessionnel du reblochon, qui cherchait à relancer les ventes ; sa directrice, Lucile Marton, a toutefois contesté que la filière ait inventé la recette, tout en reconnaissant qu'elle en a profité.",
          "Selon le ministère de l'Agriculture, le reblochon doit son nom à la « rebloche », une seconde traite pratiquée pour réduire la redevance due aux propriétaires des alpages : une histoire transmise par la tradition, souvent présentée comme une légende."
        ],
        "sources": [
          {
            "titre": "Tourisme Haute-Savoie — Tartiflette ou péla",
            "url": "https://www.tourisme-haute-savoie.com/gastronomie/recettes-de-haute-savoie/tartiflette-ou-pela/"
          },
          {
            "titre": "Mon séjour en montagne — Tartiflette : l'histoire derrière la recette",
            "url": "https://www.mon-sejour-en-montagne.com/histoires-et-anecdotes/tartiflette-connaissez-vous-l-incroyable-histoire-derriere-la-recette/"
          },
          {
            "titre": "Wikipédia (en) — Tartiflette",
            "url": "https://en.wikipedia.org/wiki/Tartiflette"
          },
          {
            "titre": "Ministère de l'Agriculture — Un produit, un territoire : le Reblochon AOP",
            "url": "https://agriculture.gouv.fr/telecharger/129898"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "moussaka",
      "url": "moussaka.html",
      "titre": "Moussaka grecque à l'agneau",
      "titreCourt": "Moussaka",
      "alias": [
        "moussaka grecque",
        "moussaka agneau",
        "musaka"
      ],
      "emoji": "🍆",
      "categorie": "plat",
      "badge": "Grand classique",
      "accroche": "Aubergines rôties, agneau mijoté à la tomate et à la cannelle, béchamel dorée : la grande moussaka grecque.",
      "intro": "Un plat de fête aux couches bien nettes : des aubergines rôties, une sauce à l'agneau parfumée à la cannelle et une épaisse béchamel au fromage qui dore au four. Elle demande un peu d'organisation, mais chaque élément se prépare simplement et elle se découpe en belles parts après un vrai temps de repos.",
      "images": [],
      "cover": {
        "motif": "assiette",
        "fond": "#3a1d3c",
        "encre": "#f6efe4",
        "accent": "#e2583e"
      },
      "temps": {
        "preparation": 40,
        "cuisson": 90,
        "repos": 30
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
        "grec",
        "traditionnel",
        "sale",
        "plat",
        "four",
        "mijote",
        "copieux",
        "gourmand",
        "convivial",
        "invite",
        "dimanche",
        "chaud",
        "reconfort"
      ],
      "ingredients": [
        {
          "groupe": "Pour les légumes",
          "items": [
            {
              "nom": "Aubergines",
              "qte": 1200,
              "unite": "g"
            },
            {
              "nom": "Pommes de terre à chair ferme",
              "qte": 500,
              "unite": "g",
              "optionnel": true
            },
            {
              "nom": "Huile d'olive",
              "qte": 6,
              "unite": "c. à soupe"
            }
          ]
        },
        {
          "groupe": "Pour la sauce à la viande",
          "items": [
            {
              "nom": "Agneau haché (ou bœuf haché)",
              "qte": 700,
              "unite": "g"
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
              "nom": "Huile d'olive",
              "qte": 2,
              "unite": "c. à soupe"
            },
            {
              "nom": "Vin rouge sec",
              "qte": 120,
              "unite": "ml"
            },
            {
              "nom": "Tomates concassées (pulpe)",
              "qte": 400,
              "unite": "g"
            },
            {
              "nom": "Concentré de tomate",
              "qte": 1,
              "unite": "c. à soupe"
            },
            {
              "nom": "Bâton de cannelle",
              "qte": 1,
              "unite": "pièce",
              "fixe": true
            },
            {
              "nom": "Feuille de laurier",
              "qte": 1,
              "unite": "feuille",
              "fixe": true
            },
            {
              "nom": "Origan séché",
              "qte": 1,
              "unite": "c. à café"
            },
            {
              "nom": "Persil plat",
              "qte": 4,
              "unite": "brin"
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
              "nom": "Beurre doux",
              "qte": 80,
              "unite": "g"
            },
            {
              "nom": "Farine de blé",
              "qte": 80,
              "unite": "g"
            },
            {
              "nom": "Lait entier",
              "qte": 800,
              "unite": "ml"
            },
            {
              "nom": "Jaunes d'œufs",
              "qte": 2,
              "unite": "pièce"
            },
            {
              "nom": "Kefalotyri ou parmesan râpé",
              "qte": 100,
              "unite": "g"
            },
            {
              "nom": "Noix de muscade râpée",
              "qte": 1,
              "unite": "pincée",
              "fixe": true
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Rôtir les aubergines",
          "texte": "Préchauffe le four à 220 °C. Coupe les aubergines en tranches de 1 cm dans la longueur et, si tu en mets, les pommes de terre pelées en rondelles de 5 mm. Badigeonne-les d'huile d'olive des deux côtés, sale légèrement, étale-les sur des plaques couvertes de papier cuisson et fais-les rôtir 20 à 25 minutes en les retournant à mi-cuisson : elles doivent être dorées et tendres.",
          "minuteurs": [
            {
              "secondes": 1200,
              "label": "Vérifier les légumes"
            },
            {
              "secondes": 1500,
              "label": "Légumes rôtis"
            }
          ]
        },
        {
          "titre": "La viande",
          "texte": "Hache finement l'oignon et l'ail. Fais suer l'oignon 5 minutes dans l'huile d'olive à feu moyen, ajoute l'ail 1 minute, puis la viande : fais-la revenir à feu vif en l'émiettant jusqu'à ce qu'elle ne soit plus rosée et commence à dorer.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Oignon"
            },
            {
              "secondes": 480,
              "label": "Viande"
            }
          ]
        },
        {
          "titre": "Le mijotage",
          "texte": "Verse le vin rouge et laisse-le s'évaporer 2 à 3 minutes. Ajoute les tomates, le concentré, le bâton de cannelle, le laurier et l'origan, sale et poivre, puis laisse mijoter à découvert environ 30 minutes : la sauce doit être épaisse, presque sans jus. Retire la cannelle et le laurier et ajoute le persil ciselé.",
          "minuteurs": [
            {
              "secondes": 180,
              "label": "Évaporation du vin"
            },
            {
              "secondes": 1800,
              "label": "Mijotage"
            }
          ]
        },
        {
          "titre": "La béchamel",
          "texte": "Fais fondre le beurre dans une casserole, ajoute la farine et remue 2 minutes sans coloration. Verse le lait petit à petit en fouettant, puis laisse épaissir 5 à 8 minutes à feu doux sans cesser de remuer : elle doit être épaisse et napper généreusement la cuillère.",
          "minuteurs": [
            {
              "secondes": 120,
              "label": "Cuire le roux"
            },
            {
              "secondes": 420,
              "label": "Épaissir la béchamel"
            }
          ]
        },
        {
          "titre": "Fromage et jaunes",
          "texte": "Hors du feu, ajoute la muscade, un peu de sel et les trois quarts du fromage râpé. Laisse tiédir 5 minutes, puis incorpore les jaunes d'œufs un à un en fouettant vivement pour qu'ils ne coagulent pas.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Tiédir la béchamel"
            }
          ]
        },
        {
          "titre": "Le montage",
          "texte": "Baisse le four à 180 °C. Dans un plat d'environ 25 × 32 cm, dispose d'abord les pommes de terre si tu en mets, puis la moitié des aubergines, toute la sauce à la viande et le reste des aubergines. Recouvre de béchamel en lissant jusqu'aux bords et parsème du reste de fromage."
        },
        {
          "titre": "La cuisson",
          "texte": "Enfourne pour 40 à 45 minutes, jusqu'à ce que le dessus soit doré et que les bords bouillonnent. Si la surface colore trop vite, couvre-la d'une feuille d'aluminium.",
          "minuteurs": [
            {
              "secondes": 2400,
              "label": "Vérifier la cuisson"
            },
            {
              "secondes": 2700,
              "label": "Cuisson complète"
            }
          ]
        },
        {
          "titre": "Le repos",
          "texte": "Laisse reposer la moussaka 20 à 30 minutes hors du four avant de la couper. Les couches se raffermissent et les parts se tiennent au lieu de s'effondrer.",
          "minuteurs": [
            {
              "secondes": 1200,
              "label": "Repos minimum"
            },
            {
              "secondes": 1800,
              "label": "Repos idéal"
            }
          ]
        }
      ],
      "astuces": [
        "Rôtis les aubergines au four plutôt que de les frire : elles absorbent beaucoup moins d'huile et la moussaka est moins lourde.",
        "Fais bien réduire la sauce à la viande : trop liquide, elle détremperait les aubergines et la moussaka rendrait de l'eau à la découpe.",
        "Laisse tiédir la béchamel avant d'y ajouter les jaunes d'œufs : trop chaude, elle les ferait cuire en grumeaux."
      ],
      "choix": {
        "titre": "Accompagnements",
        "mode": "single",
        "label": "Ton accompagnement",
        "options": [
          "Salade grecque",
          "Tzatziki",
          "Pain pita",
          "Concombre à la menthe",
          "Olives de Kalamata",
          "Salade verte",
          "Yaourt grec"
        ]
      },
      "accords": [
        {
          "titre": "La grecque",
          "texte": "une salade de tomates, concombre, oignon rouge et feta."
        },
        {
          "titre": "La fraîche",
          "texte": "un tzatziki bien froid servi à côté."
        },
        {
          "titre": "La végétarienne",
          "texte": "des lentilles cuites ou des champignons hachés à la place de la viande."
        },
        {
          "titre": "Côté verre",
          "texte": "un vin rouge méditerranéen souple et fruité."
        }
      ],
      "conservation": "Une fois refroidie, elle se garde 2 à 3 jours au réfrigérateur, couverte. Réchauffe-la au four à 160 °C sous une feuille d'aluminium, jusqu'à ce qu'elle soit bien chaude à cœur.",
      "allergenes": [
        "gluten",
        "lait",
        "oeufs",
        "sulfites"
      ],
      "noteAllergenes": "Les sulfites viennent du vin rouge : tu peux le remplacer par la même quantité d'eau pour une version sans alcool.",
      "regime": {
        "sansViande": false,
        "sansPoisson": true,
        "adaptableSansViande": true
      },
      "origine": {
        "pays": "Grèce",
        "drapeau": "🇬🇷",
        "resume": "Des plats de légumes et de viande hachée appelés moussaka existent dans tout l'est de la Méditerranée ; la version grecque à la béchamel est la plus connue.",
        "faits": [
          "La moussaka grecque moderne, en couches cuites séparément puis gratinées sous une béchamel, est attribuée au chef Nikolaos Tselementes, formé en France, dans les années 1920.",
          "Tselementes en proposait aussi une variante végétalienne pour les jours de jeûne orthodoxes.",
          "Dans les Balkans (Bulgarie, Serbie, Bosnie), on remplace souvent les aubergines par des pommes de terre, et le dessus est plutôt un mélange d'œufs et de lait ou de yaourt qu'une béchamel."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Moussaka",
            "url": "https://en.wikipedia.org/wiki/Moussaka"
          },
          {
            "titre": "Vikidia — Moussaka",
            "url": "https://fr.vikidia.org/wiki/Moussaka"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "tajineagneau",
      "url": "tajine-agneau-pruneaux.html",
      "titre": "Tajine d'agneau aux pruneaux et aux amandes",
      "titreCourt": "Tajine aux pruneaux",
      "alias": [
        "tajine agneau pruneaux",
        "tajine aux pruneaux",
        "tagine agneau",
        "agneau aux pruneaux"
      ],
      "emoji": "🍯",
      "categorie": "plat",
      "badge": "Saveurs du Maroc",
      "accroche": "Agneau fondant au safran et au gingembre, pruneaux laqués au miel et amandes dorées : le sucré-salé marocain.",
      "intro": "Un grand plat sucré-salé : l'agneau mijote longuement avec les oignons, le safran et le gingembre jusqu'à devenir fondant, puis se couvre de pruneaux laqués au miel et à la cannelle. Les amandes dorées apportent le croquant final, et le pain marocain se charge de la sauce.",
      "images": [],
      "cover": {
        "motif": "cocotte",
        "fond": "#4a1e14",
        "encre": "#f6efe4",
        "accent": "#e0a43c"
      },
      "temps": {
        "preparation": 25,
        "cuisson": 120,
        "repos": 0
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
        "viande",
        "oriental",
        "traditionnel",
        "sale",
        "plat",
        "mijote",
        "epice",
        "fete",
        "invite",
        "convivial",
        "hiver",
        "chaud",
        "gourmand",
        "raffine"
      ],
      "ingredients": [
        {
          "groupe": "Pour la viande",
          "items": [
            {
              "nom": "Épaule d'agneau désossée, en morceaux de 5 cm",
              "qte": 1200,
              "unite": "g"
            },
            {
              "nom": "Oignons jaunes",
              "qte": 2,
              "unite": "pièce"
            },
            {
              "nom": "Ail",
              "qte": 2,
              "unite": "gousse"
            },
            {
              "nom": "Huile d'olive",
              "qte": 3,
              "unite": "c. à soupe"
            },
            {
              "nom": "Beurre doux",
              "qte": 30,
              "unite": "g"
            },
            {
              "nom": "Gingembre moulu",
              "qte": 1,
              "unite": "c. à café"
            },
            {
              "nom": "Curcuma",
              "qte": 0.5,
              "unite": "c. à café"
            },
            {
              "nom": "Safran en pistils",
              "qte": 1,
              "unite": "pincée",
              "fixe": true
            },
            {
              "nom": "Bâton de cannelle",
              "qte": 1,
              "unite": "pièce",
              "fixe": true
            },
            {
              "nom": "Bouquet de coriandre et de persil ficelé",
              "qte": 1,
              "unite": "bouquet",
              "fixe": true
            },
            {
              "nom": "Eau",
              "qte": 500,
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
          "groupe": "Pour les pruneaux",
          "items": [
            {
              "nom": "Pruneaux",
              "qte": 400,
              "unite": "g"
            },
            {
              "nom": "Miel",
              "qte": 3,
              "unite": "c. à soupe"
            },
            {
              "nom": "Cannelle en poudre",
              "qte": 1,
              "unite": "c. à café"
            },
            {
              "nom": "Eau de fleur d'oranger",
              "qte": 1,
              "unite": "c. à café",
              "optionnel": true
            }
          ]
        },
        {
          "groupe": "Pour la finition",
          "items": [
            {
              "nom": "Amandes entières mondées",
              "qte": 100,
              "unite": "g"
            },
            {
              "nom": "Graines de sésame",
              "qte": 1,
              "unite": "c. à soupe",
              "optionnel": true
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "La mise en place",
          "texte": "Sèche les morceaux d'agneau avec du papier absorbant. Râpe ou hache très finement les oignons, hache l'ail et émiette les pistils de safran entre tes doigts."
        },
        {
          "titre": "Enrober d'épices",
          "texte": "Dans une cocotte en fonte (ou un tajine posé sur un diffuseur), fais chauffer l'huile et le beurre à feu moyen. Ajoute la viande, les oignons, le gingembre, le curcuma, le safran, du sel et du poivre, puis remue régulièrement jusqu'à ce que la viande soit bien enrobée et légèrement colorée et que les oignons commencent à fondre.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Viande et épices"
            }
          ]
        },
        {
          "titre": "Le mijotage",
          "texte": "Ajoute l'ail, le bâton de cannelle, le bouquet d'herbes et l'eau : la viande doit être à moitié immergée, pas noyée. Porte à frémissement, couvre et laisse mijoter à feu doux 1 h 30 à 1 h 45, en retournant les morceaux de temps en temps et en ajoutant un peu d'eau si la sauce attache. L'agneau est prêt quand il se détache à la fourchette.",
          "minuteurs": [
            {
              "secondes": 5400,
              "label": "Vérifier la viande"
            },
            {
              "secondes": 6300,
              "label": "Mijotage long"
            }
          ]
        },
        {
          "titre": "Les pruneaux",
          "texte": "Une demi-heure avant la fin, mets les pruneaux dans une petite casserole avec une louche de sauce du tajine, le miel et la cannelle en poudre, et complète avec un peu d'eau pour les couvrir à peine. Laisse frémir doucement jusqu'à ce qu'ils soient gonflés et que le jus devienne sirupeux, puis ajoute l'eau de fleur d'oranger hors du feu.",
          "minuteurs": [
            {
              "secondes": 900,
              "label": "Pruneaux au miel"
            }
          ]
        },
        {
          "titre": "Les amandes",
          "texte": "Fais dorer les amandes à sec dans une poêle à feu moyen, en remuant sans arrêt, jusqu'à ce qu'elles soient blondes et parfumées. Fais griller les graines de sésame 1 minute de la même façon, puis réserve le tout dans une assiette pour stopper la cuisson.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Amandes"
            }
          ]
        },
        {
          "titre": "Réduire la sauce",
          "texte": "Retire le bouquet d'herbes et le bâton de cannelle. Fais réduire la sauce à découvert jusqu'à ce qu'elle soit onctueuse et nappante, les oignons complètement fondus, puis rectifie l'assaisonnement.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Réduction de la sauce"
            }
          ]
        },
        {
          "titre": "Le dressage",
          "texte": "Dispose la viande dans un plat chaud ou dans le tajine et nappe-la de sauce. Répartis les pruneaux et leur sirop par-dessus, parsème d'amandes et de sésame, et sers aussitôt, bien chaud."
        }
      ],
      "astuces": [
        "L'épaule, riche en collagène, devient fondante en mijotant ; un morceau trop maigre comme le gigot resterait plus sec avec une cuisson aussi longue.",
        "Cuire les pruneaux à part, dans un peu de sauce sucrée au miel, leur permet de rester entiers et brillants au lieu de se défaire dans la cocotte.",
        "Avec un vrai tajine en terre cuite, chauffe toujours progressivement et utilise un diffuseur sur le gaz : un choc thermique peut le fendre."
      ],
      "choix": {
        "titre": "Accompagnements & variantes",
        "mode": "single",
        "label": "Ton choix",
        "options": [
          "Pain marocain (khobz)",
          "Semoule fine",
          "Salade de carottes au cumin",
          "Zaalouk d'aubergines",
          "Abricots secs",
          "Œufs durs",
          "Thé à la menthe"
        ]
      },
      "accords": [
        {
          "titre": "La tradition",
          "texte": "du pain marocain pour saucer, posé au centre de la table."
        },
        {
          "titre": "Le complet",
          "texte": "une semoule fine bien beurrée servie à part."
        },
        {
          "titre": "La variante",
          "texte": "des abricots secs à la place d'une partie des pruneaux."
        },
        {
          "titre": "Pour finir",
          "texte": "un thé vert à la menthe bien chaud."
        }
      ],
      "conservation": "Une fois refroidi rapidement, il se garde 2 à 3 jours au réfrigérateur dans une boîte hermétique. Réchauffe-le doucement à couvert avec un peu d'eau, et ajoute les amandes au moment de servir pour qu'elles restent croquantes.",
      "allergenes": [
        "fruitsacoque",
        "sesame",
        "lait"
      ],
      "noteAllergenes": "Le sésame est facultatif, et le lait ne vient que du beurre, que tu peux remplacer par de l'huile d'olive.",
      "regime": {
        "sansViande": false,
        "sansPoisson": true
      },
      "origine": {
        "pays": "Maroc",
        "drapeau": "🇲🇦",
        "resume": "Le tajine porte le nom du plat en terre cuite à couvercle conique dans lequel il mijote ; l'agneau aux pruneaux en est l'une des versions sucrées-salées les plus connues.",
        "faits": [
          "Le couvercle conique du tajine fait retomber la vapeur condensée dans le plat, ce qui permet de braiser la viande avec très peu d'eau.",
          "Le mot arabe « ṭajīn » vient du grec ancien « tágēnon », une poêle ; certaines étymologies ajoutent un intermédiaire berbère, qui reste incertain.",
          "L'agneau aux pruneaux est souvent présenté comme un plat de fête, servi lors des mariages ou aux invités que l'on veut honorer."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Tagine",
            "url": "https://en.wikipedia.org/wiki/Tagine"
          },
          {
            "titre": "Merriam-Webster — Tagine",
            "url": "https://www.merriam-webster.com/dictionary/Tagine"
          },
          {
            "titre": "Le Creuset — Lamb and prunes tagine",
            "url": "https://www.lecreuset.co.uk/en_GB/lamb-and-prunes-tagine/r0000000001977.html"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "paellavalencienne",
      "url": "paella-valencienne.html",
      "titre": "Paella valencienne au poulet et au lapin",
      "titreCourt": "Paella valencienne",
      "alias": [
        "paella",
        "paella valenciana",
        "paella poulet lapin"
      ],
      "emoji": "🥘",
      "categorie": "plat",
      "badge": "Recette de Valence",
      "accroche": "Poulet et lapin dorés, haricots plats, safran et riz rond qui accroche juste ce qu'il faut : la vraie paella.",
      "intro": "La paella de Valence n'a ni fruits de mer ni chorizo : du poulet et du lapin longuement dorés, des haricots plats, de la tomate, du safran et un riz rond qui boit tout le bouillon. Le secret tient au feu et à la patience, jusqu'à la fine croûte caramélisée du fond, le socarrat.",
      "images": [],
      "cover": {
        "motif": "poele",
        "fond": "#4a1c0c",
        "encre": "#f6efe4",
        "accent": "#f4b400"
      },
      "temps": {
        "preparation": 20,
        "cuisson": 70,
        "repos": 5
      },
      "difficulte": "Intermédiaire",
      "portions": {
        "base": 4,
        "unite": "personne",
        "pluriel": "personnes",
        "min": 2,
        "max": 12,
        "pas": 2
      },
      "tags": [
        "viande",
        "espagnol",
        "traditionnel",
        "sale",
        "plat",
        "convivial",
        "fete",
        "ete",
        "dimanche",
        "invite",
        "chaud",
        "copieux",
        "familial"
      ],
      "ingredients": [
        {
          "groupe": "Pour la paella",
          "items": [
            {
              "nom": "Riz rond (bomba ou D.O. Valencia)",
              "qte": 400,
              "unite": "g"
            },
            {
              "nom": "Poulet fermier en morceaux (hauts de cuisse, ailes)",
              "qte": 600,
              "unite": "g"
            },
            {
              "nom": "Lapin en morceaux",
              "qte": 400,
              "unite": "g"
            },
            {
              "nom": "Haricots plats (ferraura)",
              "qte": 250,
              "unite": "g"
            },
            {
              "nom": "Garrofó (gros haricots blancs plats, frais ou surgelés)",
              "qte": 150,
              "unite": "g"
            },
            {
              "nom": "Tomate bien mûre",
              "qte": 1,
              "unite": "pièce"
            },
            {
              "nom": "Huile d'olive vierge extra",
              "qte": 100,
              "unite": "ml"
            },
            {
              "nom": "Paprika doux (pimentón)",
              "qte": 1,
              "unite": "c. à café",
              "optionnel": true
            },
            {
              "nom": "Safran en pistils",
              "qte": 1,
              "unite": "pincée"
            },
            {
              "nom": "Eau",
              "qte": 1500,
              "unite": "ml"
            },
            {
              "nom": "Romarin frais",
              "qte": 1,
              "unite": "brin",
              "optionnel": true,
              "fixe": true
            },
            {
              "nom": "Sel",
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
          "texte": "Coupe le poulet et le lapin en morceaux d'environ 5 cm et sale-les. Équeute les haricots plats et coupe-les en tronçons de 4 cm. Coupe la tomate en deux et râpe la chair sur une râpe à gros trous, en jetant la peau."
        },
        {
          "titre": "Dorer les viandes",
          "texte": "Fais chauffer l'huile d'olive à feu moyen dans une paellera (ou la plus grande poêle que tu aies), en l'étalant bien sur tout le fond. Fais dorer lentement le poulet et le lapin en les retournant souvent, jusqu'à ce qu'ils soient bien dorés de tous les côtés : ces sucs font le goût de la paella.",
          "minuteurs": [
            {
              "secondes": 1200,
              "label": "Dorer les viandes"
            }
          ]
        },
        {
          "titre": "Les légumes",
          "texte": "Pousse les viandes sur les bords et mets les haricots plats et le garrofó au centre. Fais-les revenir en remuant, jusqu'à ce que les haricots plats soient brillants et légèrement saisis.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Haricots"
            }
          ]
        },
        {
          "titre": "Tomate et pimentón",
          "texte": "Ajoute la tomate râpée au centre et laisse-la compoter jusqu'à ce qu'elle réduise et fonce un peu. Si tu en mets, saupoudre le paprika, remue quelques secondes seulement et verse aussitôt l'eau : le paprika brûle et devient amer très vite. Sinon, verse directement l'eau.",
          "minuteurs": [
            {
              "secondes": 240,
              "label": "Tomate"
            }
          ]
        },
        {
          "titre": "Le bouillon",
          "texte": "Ajoute le safran émietté et du sel, porte à ébullition puis laisse bouillonner doucement 20 à 25 minutes pour que le bouillon prenne le goût des viandes. Goûte : il doit être un peu plus salé que tu ne l'aimes, car le riz va l'absorber. Dans une paellera adaptée au nombre de convives, le niveau arrive en général à hauteur des rivets des poignées : complète avec un peu d'eau chaude s'il a trop baissé.",
          "minuteurs": [
            {
              "secondes": 1200,
              "label": "Bouillon"
            },
            {
              "secondes": 1500,
              "label": "Bouillon corsé"
            }
          ]
        },
        {
          "titre": "Le riz",
          "texte": "Monte le feu, verse le riz en pluie et répartis-le d'un coup de cuillère sur toute la surface, puis ne remue plus jamais. Laisse cuire à feu vif jusqu'à ce que le riz affleure à la surface du bouillon, et pose le brin de romarin si tu en mets.",
          "minuteurs": [
            {
              "secondes": 540,
              "label": "Riz à feu vif"
            }
          ]
        },
        {
          "titre": "À feu doux",
          "texte": "Baisse à feu moyen-doux et laisse cuire jusqu'à ce que tout le liquide soit absorbé et que le grain soit tendre avec un léger cœur. Si ta paellera dépasse ton brûleur, fais-la tourner régulièrement d'un quart de tour pour une cuisson égale.",
          "minuteurs": [
            {
              "secondes": 540,
              "label": "Riz à feu doux"
            }
          ]
        },
        {
          "titre": "Le socarrat",
          "texte": "Pour finir, monte le feu 1 à 2 minutes : quand le fond crépite et qu'une odeur de riz grillé, pas de brûlé, se dégage, le socarrat est formé. Retire alors aussitôt du feu et enlève le romarin.",
          "minuteurs": [
            {
              "secondes": 90,
              "label": "Socarrat"
            }
          ]
        },
        {
          "titre": "Le repos",
          "texte": "Couvre la paella d'un torchon propre et laisse-la reposer 5 minutes : le grain finit de gonfler et se détache mieux. Sers directement dans la paellera, au centre de la table.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Repos"
            }
          ]
        }
      ],
      "astuces": [
        "Utilise un riz rond qui absorbe beaucoup de bouillon sans éclater (bomba, sénia ou riz D.O. Valencia) et ne le remue jamais après l'avoir réparti : c'est ce qui permet au grain de rester entier et au socarrat de se former.",
        "Une paella n'est réussie que si toute la surface chauffe : choisis une paellera adaptée à ton feu (environ 38 à 42 cm sur une grande plaque) ou fais-la sur un réchaud ou un barbecue assez large.",
        "Le garrofó se trouve surgelé dans les épiceries espagnoles ; à défaut, des haricots de Lima surgelés font un bon remplaçant."
      ],
      "securite": "Le poulet et le lapin doivent être cuits à cœur, sans trace rosée près de l'os : selon l'Anses, une cuisson à cœur au-delà de 65 °C détruit les bactéries comme Campylobacter, et le long dorage puis le bouillon de la recette assurent cette cuisson. Lave-toi les mains, la planche et le couteau après avoir découpé la viande crue.",
      "sourcesSecurite": [
        {
          "titre": "Anses — Campylobactériose",
          "url": "https://www.anses.fr/fr/content/campylobacteriose"
        },
        {
          "titre": "Santé publique France — Campylobacter : la maladie",
          "url": "https://www.santepubliquefrance.fr/campylobacter/la-maladie"
        }
      ],
      "choix": {
        "titre": "Variantes de la huerta",
        "mode": "multi",
        "label": "Ta paella",
        "options": [
          "Brin de romarin",
          "Pimentón doux",
          "Escargots",
          "Canard",
          "Artichauts en saison",
          "Haricots de Lima"
        ]
      },
      "accords": [
        {
          "titre": "En entrée",
          "texte": "une salade de tomates, oignon doux et huile d'olive."
        },
        {
          "titre": "Le partage",
          "texte": "la paellera posée au centre, chacun se sert directement à la cuillère."
        },
        {
          "titre": "Le dessert",
          "texte": "des oranges fraîches de saison, simplement coupées."
        },
        {
          "titre": "Côté verre",
          "texte": "un vin rouge ou rosé léger, servi frais."
        }
      ],
      "conservation": "La paella se déguste tout de suite. Les restes, mis au réfrigérateur rapidement après refroidissement, se consomment le lendemain au plus tard, bien réchauffés.",
      "allergenes": [],
      "noteAllergenes": "La recette de base ne contient aucun des 14 allergènes majeurs. Si tu ajoutes des escargots (variante traditionnelle), ce sont des mollusques ; si tu remplaces l'eau par un bouillon, vérifie sa composition (il contient souvent du céleri).",
      "regime": {
        "sansViande": false,
        "sansPoisson": true
      },
      "origine": {
        "pays": "Espagne (Valence)",
        "drapeau": "🇪🇸",
        "resume": "Le plat de riz de la campagne valencienne, cuit dans la poêle large et plate qui lui a donné son nom.",
        "faits": [
          "Elle est née dans les campagnes rizicoles qui entourent Valence, notamment autour de l'Albufera ; les sources ne s'accordent pas sur la date de sa naissance.",
          "Une étude menée auprès de cuisiniers valenciens a retenu dix ingrédients essentiels : riz, eau, huile d'olive, sel, safran, tomate, haricots plats, garrofó, poulet et lapin ; le pimentón, le romarin et l'artichaut y sont jugés des ajouts acceptables.",
          "La Generalitat valencienne l'a déclarée Bien d'intérêt culturel immatériel par un décret du 29 octobre 2021, sous l'intitulé « l'art d'unir et de partager », sans pour autant y fixer de recette précise."
        ],
        "sources": [
          {
            "titre": "Barceló — Paella valenciana : histoire et origine",
            "url": "https://www.barcelo.com/guia-turismo/es/espana/valencia/que-ver/paella-valenciana/"
          },
          {
            "titre": "Consell Valencià de Cultura — Informe sobre la paella",
            "url": "https://cvcultura.es/wp-content/uploads/88.pdf"
          },
          {
            "titre": "The Olive Press — Les règles de la paella selon des chercheurs de Valence",
            "url": "https://theolivepress.es/spain-news/2022/03/23/its-official-these-are-the-rules-of-paella-as-determined-by-researchers-in-spains-valencia-and-chorizo-is-most-definitely-not-allowed/"
          },
          {
            "titre": "BOE — Decreto 176/2021 (paella valenciana, BIC inmaterial)",
            "url": "https://boe.es/boe/dias/2022/03/15/pdfs/BOE-A-2022-4133.pdf"
          },
          {
            "titre": "elDiario.es — La paella, « el arte de unir y compartir », oficialmente BIC valenciano",
            "url": "https://www.eldiario.es/cultura/paella-arte-unir-compartir-oficialmente-bic-valenciano_1_8472168.html"
          },
          {
            "titre": "Directo al Paladar — La paella ya es Bien de Interés Cultural Inmaterial",
            "url": "https://www.directoalpaladar.com/actualidad-1/paella-bien-interes-cultural-inmaterial-norma-no-se-atreve-a-definir-receta-concreta"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "butterchicken",
      "url": "butter-chicken.html",
      "titre": "Butter chicken (murgh makhani)",
      "titreCourt": "Butter chicken",
      "alias": [
        "murgh makhani",
        "poulet au beurre",
        "poulet makhani"
      ],
      "emoji": "🍛",
      "categorie": "plat",
      "badge": "Grand classique",
      "accroche": "Poulet mariné et grillé, sauce tomate au beurre et à la crème, fenugrec : le curry star de Delhi.",
      "intro": "Le curry de restaurant indien par excellence : des morceaux de poulet marinés au yaourt et aux épices, grillés au four, puis nappés d'une sauce tomate soyeuse au beurre et à la crème. Les feuilles de fenugrec séchées lui donnent ce parfum si particulier, et tu règles le piquant comme tu l'aimes.",
      "images": [],
      "cover": {
        "motif": "cocotte",
        "fond": "#5e1a0c",
        "encre": "#f6efe4",
        "accent": "#ff8a2a"
      },
      "temps": {
        "preparation": 20,
        "cuisson": 35,
        "repos": 60
      },
      "difficulte": "Intermédiaire",
      "portions": {
        "base": 4,
        "unite": "personne",
        "pluriel": "personnes",
        "min": 2,
        "max": 12
      },
      "tags": [
        "viande",
        "indien",
        "epice",
        "plat",
        "sale",
        "chaud",
        "mijote",
        "four",
        "gourmand",
        "reconfort",
        "convivial",
        "invite",
        "hiver",
        "raffine"
      ],
      "ingredients": [
        {
          "groupe": "Pour la marinade",
          "items": [
            {
              "nom": "Hauts de cuisse de poulet désossés, sans peau",
              "qte": 800,
              "unite": "g"
            },
            {
              "nom": "Yaourt nature entier",
              "qte": 150,
              "unite": "g"
            },
            {
              "nom": "Jus de citron",
              "qte": 1,
              "unite": "c. à soupe"
            },
            {
              "nom": "Ail",
              "qte": 2,
              "unite": "gousse"
            },
            {
              "nom": "Gingembre frais râpé",
              "qte": 10,
              "unite": "g"
            },
            {
              "nom": "Piment du Cachemire en poudre (ou paprika doux)",
              "qte": 2,
              "unite": "c. à café"
            },
            {
              "nom": "Garam masala",
              "qte": 1,
              "unite": "c. à café"
            },
            {
              "nom": "Cumin en poudre",
              "qte": 1,
              "unite": "c. à café"
            },
            {
              "nom": "Sel fin",
              "qte": 1,
              "unite": "c. à café"
            }
          ]
        },
        {
          "groupe": "Pour la sauce makhani",
          "items": [
            {
              "nom": "Beurre doux",
              "qte": 50,
              "unite": "g"
            },
            {
              "nom": "Huile neutre",
              "qte": 1,
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
              "nom": "Gingembre frais râpé",
              "qte": 15,
              "unite": "g"
            },
            {
              "nom": "Piment du Cachemire en poudre (ou paprika doux)",
              "qte": 1,
              "unite": "c. à café"
            },
            {
              "nom": "Garam masala",
              "qte": 1,
              "unite": "c. à café"
            },
            {
              "nom": "Coulis de tomate (passata)",
              "qte": 400,
              "unite": "g"
            },
            {
              "nom": "Noix de cajou non salées",
              "qte": 40,
              "unite": "g",
              "optionnel": true
            },
            {
              "nom": "Sucre ou miel",
              "qte": 1,
              "unite": "c. à café"
            },
            {
              "nom": "Crème liquide entière",
              "qte": 150,
              "unite": "ml"
            },
            {
              "nom": "Feuilles de fenugrec séchées (kasuri methi)",
              "qte": 1,
              "unite": "c. à soupe"
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
          "groupe": "Pour servir",
          "items": [
            {
              "nom": "Riz basmati",
              "qte": 300,
              "unite": "g"
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
          "titre": "La marinade",
          "texte": "Coupe le poulet en morceaux d'environ 4 cm. Mélange-le avec le yaourt, le jus de citron, l'ail écrasé, le gingembre, le piment du Cachemire, le garam masala, le cumin et le sel, puis couvre et laisse mariner au moins 1 heure au réfrigérateur (jusqu'à 12 heures pour plus de goût).",
          "minuteurs": [
            {
              "secondes": 3600,
              "label": "Marinade minimum"
            }
          ]
        },
        {
          "titre": "Griller le poulet",
          "texte": "Préchauffe le four à 220 °C. Étale les morceaux bien espacés sur une plaque couverte de papier cuisson, en laissant l'excédent de marinade dans le saladier, et enfourne environ 15 minutes, jusqu'à ce que les bords soient grillés par endroits. Coupe le plus gros morceau : la chair doit être opaque et juteuse, sans trace rosée.",
          "minuteurs": [
            {
              "secondes": 900,
              "label": "Poulet au four"
            }
          ]
        },
        {
          "titre": "La base d'oignon",
          "texte": "Pendant ce temps, fais fondre 30 g de beurre avec l'huile dans une sauteuse à feu moyen. Fais revenir l'oignon finement émincé environ 8 minutes, jusqu'à ce qu'il soit tendre et blond doré.",
          "minuteurs": [
            {
              "secondes": 480,
              "label": "Oignon blond"
            }
          ]
        },
        {
          "titre": "Aromates et épices",
          "texte": "Ajoute l'ail haché et le gingembre de la sauce, remue 1 minute, puis saupoudre le piment du Cachemire et le garam masala. Remue encore 30 secondes : les épices doivent embaumer sans brûler.",
          "minuteurs": [
            {
              "secondes": 90,
              "label": "Aromates et épices"
            }
          ]
        },
        {
          "titre": "Mijoter la tomate",
          "texte": "Verse le coulis de tomate, ajoute les noix de cajou si tu en mets et le sucre, puis laisse mijoter 15 minutes à feu doux à demi couvert, en remuant de temps en temps. La sauce doit épaissir et le gras commencer à perler sur les bords.",
          "minuteurs": [
            {
              "secondes": 900,
              "label": "Sauce tomate"
            }
          ]
        },
        {
          "titre": "Le riz",
          "texte": "Rince le riz basmati jusqu'à ce que l'eau soit claire, puis cuis-le selon les indications du paquet. Égrène-le à la fourchette au moment de servir.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Riz basmati"
            }
          ]
        },
        {
          "titre": "Mixer et crémer",
          "texte": "Mixe la sauce au mixeur plongeant jusqu'à ce qu'elle soit parfaitement lisse et veloutée. Remets-la sur feu doux, incorpore la crème et ajoute le poulet grillé avec son jus, puis laisse frémir 5 minutes sans faire bouillir.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Poulet dans la sauce"
            }
          ]
        },
        {
          "titre": "La finition",
          "texte": "Hors du feu, émiette le fenugrec en le frottant entre tes paumes au-dessus de la sauce et ajoute les 20 g de beurre restants. Goûte, rectifie le sel, parsème de coriandre ciselée et sers avec le riz."
        }
      ],
      "astuces": [
        "Choisis des hauts de cuisse plutôt que des blancs : plus gras, ils restent tendres et ne sèchent pas pendant le passage au four puis dans la sauce.",
        "Le piment du Cachemire colore la sauce d'un rouge profond tout en restant doux ; avec du paprika doux, ajoute une pincée de piment de Cayenne si tu aimes que ça pique.",
        "Frotter le fenugrec séché entre les paumes libère ses arômes : c'est la touche qui fait reconnaître un butter chicken de restaurant."
      ],
      "securite": "Le poulet doit être cuit à cœur, sans aucune trace rosée : coupe le plus gros morceau pour vérifier. Selon l'Anses, une cuisson à cœur au-delà de 65 °C détruit les bactéries comme Campylobacter, et le poulet finit de cuire dans la sauce chaude. Ne réutilise pas l'excédent de marinade crue, et lave-toi les mains, la planche et les ustensiles après avoir manipulé le poulet cru.",
      "sourcesSecurite": [
        {
          "titre": "Santé publique France — Campylobacter : la maladie (mesures de prévention)",
          "url": "https://www.santepubliquefrance.fr/campylobacter/la-maladie"
        },
        {
          "titre": "Anses — Campylobactériose",
          "url": "https://www.anses.fr/fr/content/campylobacteriose"
        }
      ],
      "choix": {
        "titre": "Accompagnements",
        "mode": "multi",
        "label": "Ta table indienne",
        "options": [
          "Riz basmati",
          "Pain naan",
          "Naan au fromage",
          "Chapati",
          "Raïta au concombre",
          "Lassi nature",
          "Oignon rouge citronné",
          "Coriandre fraîche"
        ]
      },
      "accords": [
        {
          "titre": "Le classique",
          "texte": "riz basmati et un pain naan bien chaud pour saucer."
        },
        {
          "titre": "Le frais",
          "texte": "une raïta au concombre et à la menthe pour adoucir les épices."
        },
        {
          "titre": "À boire",
          "texte": "un lassi nature ou à la mangue, bien frais."
        },
        {
          "titre": "Côté vin",
          "texte": "un vin blanc aromatique et peu boisé, qui accompagne bien la crème et les épices douces."
        }
      ],
      "conservation": "Le butter chicken se garde 2 à 3 jours au réfrigérateur dans une boîte hermétique ; réchauffe-le doucement à feu doux avec un trait d'eau, sans le faire bouillir. Mets le riz restant au frais rapidement et consomme-le dans les 24 h.",
      "allergenes": [
        "lait",
        "fruitsacoque"
      ],
      "noteAllergenes": "Les fruits à coque ne viennent que des noix de cajou, facultatives. Certains mélanges d'épices (garam masala) peuvent contenir de la moutarde ou du céleri : vérifie l'étiquette.",
      "regime": {
        "sansViande": false,
        "sansPoisson": true
      },
      "origine": {
        "pays": "Inde (Delhi)",
        "drapeau": "🇮🇳",
        "resume": "Un curry de poulet grillé dans une sauce tomate au beurre et à la crème, associé au restaurant Moti Mahal de Delhi, dont l'inventeur reste disputé.",
        "faits": [
          "La famille Gujral affirme que Kundan Lal Gujral, fondateur du restaurant Moti Mahal, a créé le plat dans les années 1930 à Peshawar, avant d'installer son restaurant dans le quartier de Daryaganj, à Delhi, au moment de la Partition de 1947.",
          "Les descendants de Kundan Lal Jaggi, qui tiennent la chaîne Daryaganj, soutiennent qu'il s'était associé à Gujral pour ouvrir le restaurant de Delhi en 1947 et que le plat y est né ; en 2024, la famille Gujral a porté l'affaire devant la Haute Cour de Delhi.",
          "L'historien de la cuisine Pushpesh Pant doute qu'une seule personne puisse revendiquer l'invention du butter chicken : pour lui, cela revient à demander qui a découvert le feu."
        ],
        "sources": [
          {
            "titre": "DT Next (Reuters) — Who invented butter chicken? Indian judge to rule on dispute",
            "url": "https://www.dtnext.in/news/national/who-invented-butter-chicken-indian-judge-to-rule-on-dispute-over-global-favourite-763373"
          },
          {
            "titre": "NPR — Who cooked up butter chicken? A New Delhi court seeks the answer",
            "url": "https://www.npr.org/2024/03/01/1235119520/who-cooked-up-butter-chicken-a-new-delhi-court-seeks-the-answer"
          },
          {
            "titre": "Chowhound — The highly disputed origins of butter chicken",
            "url": "https://www.chowhound.com/1782589/origins-of-butter-chicken/"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "padthai",
      "url": "pad-thai.html",
      "titre": "Pad thaï aux crevettes",
      "titreCourt": "Pad thaï crevettes",
      "alias": [
        "pad thai",
        "phad thai",
        "nouilles sautees thai",
        "pad thai crevettes"
      ],
      "emoji": "🍜",
      "categorie": "plat",
      "badge": "Street food thaï",
      "accroche": "Nouilles de riz sautées au wok, tamarin, crevettes, œuf, cacahuètes et citron vert : l'équilibre thaï.",
      "intro": "Le plat de rue le plus célèbre de Thaïlande : des nouilles de riz sautées à feu vif dans une sauce aigre-douce au tamarin, avec des crevettes juteuses, de l'œuf et des pousses croquantes. Tout se joue en quelques minutes au wok, alors prépare tout avant d'allumer le feu.",
      "images": [],
      "cover": {
        "motif": "bol",
        "fond": "#3a2410",
        "encre": "#f6efe4",
        "accent": "#f5a742"
      },
      "temps": {
        "preparation": 20,
        "cuisson": 12,
        "repos": 30
      },
      "difficulte": "Intermédiaire",
      "portions": {
        "base": 2,
        "unite": "personne",
        "pluriel": "personnes",
        "min": 1,
        "max": 8
      },
      "tags": [
        "fruits de mer",
        "thai",
        "asiatique",
        "plat",
        "sale",
        "chaud",
        "epice",
        "frais",
        "gourmand",
        "convivial",
        "invite"
      ],
      "ingredients": [
        {
          "groupe": "Pour les nouilles",
          "items": [
            {
              "nom": "Nouilles de riz plates (3 à 5 mm de large)",
              "qte": 200,
              "unite": "g"
            }
          ]
        },
        {
          "groupe": "Pour la sauce",
          "items": [
            {
              "nom": "Pâte de tamarin (concentré)",
              "qte": 2,
              "unite": "c. à soupe"
            },
            {
              "nom": "Sauce poisson (nuoc-mâm)",
              "qte": 2,
              "unite": "c. à soupe"
            },
            {
              "nom": "Sucre de palme (ou cassonade)",
              "qte": 30,
              "unite": "g"
            },
            {
              "nom": "Eau",
              "qte": 2,
              "unite": "c. à soupe"
            }
          ]
        },
        {
          "groupe": "Pour la garniture",
          "items": [
            {
              "nom": "Crevettes crues décortiquées",
              "qte": 250,
              "unite": "g"
            },
            {
              "nom": "Œufs",
              "qte": 2,
              "unite": "pièce"
            },
            {
              "nom": "Échalotes",
              "qte": 2,
              "unite": "pièce"
            },
            {
              "nom": "Ail",
              "qte": 2,
              "unite": "gousse"
            },
            {
              "nom": "Huile neutre",
              "qte": 3,
              "unite": "c. à soupe"
            },
            {
              "nom": "Pousses de soja (haricot mungo)",
              "qte": 100,
              "unite": "g"
            },
            {
              "nom": "Ciboule ou ciboulette chinoise",
              "qte": 4,
              "unite": "tige"
            },
            {
              "nom": "Cacahuètes non salées",
              "qte": 40,
              "unite": "g"
            },
            {
              "nom": "Citron vert",
              "qte": 1,
              "unite": "pièce"
            },
            {
              "nom": "Piment en poudre",
              "qte": 1,
              "unite": "pincée",
              "optionnel": true
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Tremper les nouilles",
          "texte": "Plonge les nouilles de riz dans un grand saladier d'eau tiède et laisse-les tremper environ 30 minutes. Elles doivent devenir souples et pliables tout en restant fermes au centre : elles finiront de cuire dans le wok. Égoutte-les bien.",
          "minuteurs": [
            {
              "secondes": 1800,
              "label": "Trempage des nouilles"
            }
          ]
        },
        {
          "titre": "La sauce au tamarin",
          "texte": "Dans une petite casserole, chauffe la pâte de tamarin, la sauce poisson, le sucre de palme et l'eau à feu doux environ 2 minutes, juste le temps que le sucre fonde. Goûte : la sauce doit être à la fois acidulée, salée et sucrée ; ajuste avec un peu de sucre ou de tamarin.",
          "minuteurs": [
            {
              "secondes": 120,
              "label": "Sauce au tamarin"
            }
          ]
        },
        {
          "titre": "La mise en place",
          "texte": "Torréfie les cacahuètes 3 minutes à sec dans le wok en remuant, puis concasse-les grossièrement. Émince les échalotes, hache l'ail, coupe la ciboule en tronçons de 3 cm, rince les pousses de soja et coupe le citron vert en quartiers.",
          "minuteurs": [
            {
              "secondes": 180,
              "label": "Cacahuètes"
            }
          ]
        },
        {
          "titre": "Saisir les crevettes",
          "texte": "Fais chauffer 1 cuillère à soupe d'huile dans le wok à feu vif jusqu'à ce qu'elle frémisse. Saisis les crevettes 1 à 2 minutes, jusqu'à ce qu'elles soient roses et opaques, puis réserve-les sur une assiette.",
          "minuteurs": [
            {
              "secondes": 90,
              "label": "Crevettes"
            }
          ]
        },
        {
          "titre": "Sauter les nouilles",
          "texte": "Verse le reste d'huile dans le wok, fais revenir les échalotes et l'ail 30 secondes sans les laisser brunir, puis ajoute les nouilles égouttées et la sauce. Saute 2 à 3 minutes en soulevant les nouilles avec deux spatules, jusqu'à ce qu'elles aient absorbé la sauce et soient tendres ; si elles collent, ajoute une cuillère d'eau.",
          "minuteurs": [
            {
              "secondes": 180,
              "label": "Nouilles sautées"
            }
          ]
        },
        {
          "titre": "Les œufs",
          "texte": "Pousse les nouilles sur un côté du wok et casse les œufs dans l'espace libéré. Laisse-les prendre 30 secondes, brouille-les grossièrement à la spatule, puis mélange-les aux nouilles.",
          "minuteurs": [
            {
              "secondes": 30,
              "label": "Œufs"
            }
          ]
        },
        {
          "titre": "L'assemblage",
          "texte": "Remets les crevettes dans le wok avec les pousses de soja et la ciboule. Saute encore 1 minute, juste pour chauffer le tout : les pousses doivent rester croquantes.",
          "minuteurs": [
            {
              "secondes": 60,
              "label": "Assemblage"
            }
          ]
        },
        {
          "titre": "Le service",
          "texte": "Sers aussitôt dans des assiettes chaudes, parsemé de cacahuètes concassées et d'une pincée de piment si tu aimes. Pose les quartiers de citron vert à côté : chacun presse le sien juste avant de manger."
        }
      ],
      "astuces": [
        "Ne fais jamais sauter plus de deux portions à la fois : un wok trop rempli refroidit, les nouilles cuisent à la vapeur et deviennent collantes. Pour 4 personnes, fais deux fournées.",
        "Les nouilles doivent être encore un peu fermes après le trempage : trop trempées, elles se cassent et se transforment en purée au wok.",
        "Le tamarin varie beaucoup d'une marque à l'autre, surtout en concentré : commence par 2 cuillères à soupe, goûte la sauce et ajoutes-en si besoin, en cherchant l'équilibre entre acide, salé et sucré."
      ],
      "securite": "Les pousses de soja sont des graines germées : ici, elles sont seulement saisies 1 minute pour rester croquantes. Les graines germées crues ou peu cuites sont déconseillées aux personnes fragiles (femmes enceintes, jeunes enfants, personnes âgées ou immunodéprimées) : pour elles, fais sauter les pousses jusqu'à ce qu'elles soient bien chaudes et ramollies, ou supprime-les. Les crevettes, elles, doivent être roses et opaques à cœur.",
      "sourcesSecurite": [
        {
          "titre": "Gouvernement du Québec — Pousses et germinations : précautions",
          "url": "https://www.quebec.ca/sante/alimentation/salubrite-aliments-prevention-risques/salubrite-aliments-domicile/preparation-aliments-cuisson-securitaires/precautions-manipule-aliments/pousses-germinations"
        },
        {
          "titre": "Anses — Infection à E. coli et consommation de graines germées",
          "url": "https://www.anses.fr/fr/content/infection-e-coli-et-consommation-de-graines-germees-lanses-fait-un-point-sur-letat-des"
        }
      ],
      "choix": {
        "titre": "Variantes & garnitures",
        "mode": "multi",
        "label": "Ton pad thaï",
        "options": [
          "Crevettes",
          "Poulet émincé",
          "Tofu ferme",
          "Cacahuètes concassées",
          "Piment en poudre",
          "Citron vert",
          "Coriandre fraîche",
          "Œuf en plus"
        ]
      },
      "accords": [
        {
          "titre": "La version classique",
          "texte": "crevettes, cacahuètes concassées et un quartier de citron vert."
        },
        {
          "titre": "La version volaille",
          "texte": "des lanières de poulet saisies à la place des crevettes, bien cuites à cœur."
        },
        {
          "titre": "La version végétarienne",
          "texte": "du tofu ferme doré et une sauce soja légère à la place de la sauce poisson."
        },
        {
          "titre": "À boire",
          "texte": "un thé glacé citronné ou une citronnade bien fraîche."
        }
      ],
      "conservation": "Le pad thaï est bien meilleur tout juste sauté. Les restes se gardent 1 jour au réfrigérateur dans une boîte hermétique : réchauffe-les à la poêle avec un trait d'eau, jusqu'à ce qu'ils soient bien chauds.",
      "allergenes": [
        "crustaces",
        "poisson",
        "oeufs",
        "arachides"
      ],
      "noteAllergenes": "Les « pousses de soja » vendues en France sont en réalité des pousses de haricot mungo. La composition de la pâte de tamarin et de la sauce poisson varie selon les marques : vérifie les étiquettes.",
      "regime": {
        "sansViande": true,
        "sansPoisson": false
      },
      "origine": {
        "pays": "Thaïlande (racines chinoises)",
        "drapeau": "🇹🇭",
        "resume": "Un plat de nouilles de riz sautées devenu emblème national, dont la promotion est liée à la politique nationaliste du Premier ministre Plaek Phibunsongkhram.",
        "faits": [
          "Le gouvernement de Plaek Phibunsongkhram a promu le pad thaï comme plat national dans le cadre d'une politique nationaliste ; selon les sources, cette campagne est située entre la fin des années 1930 et les années 1940.",
          "Cette même politique a aussi changé le nom du pays : le Siam est devenu la Thaïlande.",
          "Ses racines restent discutées : selon Mental Floss, des commerçants chinois ont introduit les nouilles sautées dans la région au XVIIIe siècle, et certains historiens pensent que le plat vient de cuisiniers chinois."
        ],
        "sources": [
          {
            "titre": "Mental Floss — A brief history of pad thai",
            "url": "https://www.mentalfloss.com/food/pad-thai-food-history"
          },
          {
            "titre": "Quartz — The strange and potentially stolen origins of pad Thai",
            "url": "https://qz.com/198860/the-strange-and-potentially-stolen-origins-of-pad-thai"
          },
          {
            "titre": "Smithsonian Magazine — The surprising history of pad thai",
            "url": "https://www.smithsonianmag.com/arts-culture/the-surprising-history-of-pad-thai-180984625/"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "oeufsbenedicte",
      "url": "oeufs-benedicte.html",
      "titre": "Œufs Bénédicte, sauce hollandaise",
      "titreCourt": "Œufs Bénédicte",
      "alias": [
        "oeufs benedicte",
        "eggs benedict",
        "oeufs benedict",
        "oeufs benedictine"
      ],
      "emoji": "🍳",
      "categorie": "brunch",
      "badge": "Brunch chic",
      "accroche": "Muffin toasté, jambon, œuf poché au jaune coulant et hollandaise au beurre : le roi du brunch.",
      "intro": "La star des brunchs de grands hôtels, que tu peux réussir à la maison avec une casserole et un fouet. Un muffin toasté, une tranche de jambon, un œuf poché bien net et une sauce hollandaise mousseuse et citronnée : tout l'art est dans le timing.",
      "images": [],
      "cover": {
        "motif": "assiette",
        "fond": "#1f3340",
        "encre": "#f6efe4",
        "accent": "#f5c542"
      },
      "temps": {
        "preparation": 15,
        "cuisson": 20,
        "repos": 0
      },
      "difficulte": "Intermédiaire",
      "portions": {
        "base": 2,
        "unite": "personne",
        "pluriel": "personnes",
        "min": 1,
        "max": 8
      },
      "tags": [
        "brunch",
        "matin",
        "sale",
        "chaud",
        "americain",
        "viande",
        "gourmand",
        "raffine",
        "gastronomique",
        "dimanche",
        "invite",
        "romantique"
      ],
      "ingredients": [
        {
          "groupe": "Pour la sauce hollandaise",
          "items": [
            {
              "nom": "Beurre doux",
              "qte": 125,
              "unite": "g"
            },
            {
              "nom": "Jaunes d'œufs extra-frais",
              "qte": 2,
              "unite": "pièce"
            },
            {
              "nom": "Eau froide",
              "qte": 2,
              "unite": "c. à soupe"
            },
            {
              "nom": "Jus de citron",
              "qte": 1,
              "unite": "c. à soupe"
            },
            {
              "nom": "Sel fin",
              "qte": 1,
              "unite": "pincée",
              "fixe": true
            },
            {
              "nom": "Piment de Cayenne",
              "qte": 1,
              "unite": "pincée",
              "fixe": true,
              "optionnel": true
            }
          ]
        },
        {
          "groupe": "Pour les œufs pochés",
          "items": [
            {
              "nom": "Œufs extra-frais",
              "qte": 4,
              "unite": "pièce"
            },
            {
              "nom": "Vinaigre blanc (d'alcool)",
              "qte": 2,
              "unite": "c. à soupe",
              "fixe": true
            }
          ]
        },
        {
          "groupe": "Pour le montage",
          "items": [
            {
              "nom": "Muffins anglais",
              "qte": 2,
              "unite": "pièce"
            },
            {
              "nom": "Jambon cuit ou bacon canadien",
              "qte": 4,
              "unite": "tranche"
            },
            {
              "nom": "Beurre doux (pour les muffins)",
              "qte": 10,
              "unite": "g"
            },
            {
              "nom": "Ciboulette",
              "qte": 4,
              "unite": "brin",
              "optionnel": true
            },
            {
              "nom": "Poivre noir du moulin",
              "qte": null,
              "unite": "",
              "note": "selon le goût"
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Clarifier le beurre",
          "texte": "Fais fondre les 125 g de beurre à feu très doux, sans le laisser bouillir. Retire la mousse blanche en surface, puis verse le beurre jaune et limpide dans un bol en laissant le petit-lait au fond : garde ce beurre clarifié tiède.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Beurre clarifié"
            }
          ]
        },
        {
          "titre": "L'eau de pochage",
          "texte": "Remplis une casserole d'environ 8 cm d'eau, ajoute le vinaigre blanc et porte à petit frémissement : de petites bulles doivent remonter, sans gros bouillons. Ne sale pas l'eau."
        },
        {
          "titre": "Le sabayon",
          "texte": "Dans un bol posé sur une casserole d'eau frémissante (le fond ne doit pas toucher l'eau), fouette les jaunes avec l'eau froide 3 à 4 minutes. Le mélange doit devenir mousseux, puis crémeux et épais, au point que le fouet laisse des traces ; retire du feu dès que les bords risquent de cuire, sans dépasser environ 65 °C.",
          "minuteurs": [
            {
              "secondes": 240,
              "label": "Sabayon"
            }
          ]
        },
        {
          "titre": "Monter la hollandaise",
          "texte": "Hors du feu, verse le beurre clarifié tiède en mince filet sans cesser de fouetter, comme pour une mayonnaise. Ajoute le jus de citron, le sel et une pointe de piment de Cayenne, puis garde le bol au-dessus de l'eau chaude, feu éteint, en fouettant de temps en temps."
        },
        {
          "titre": "Muffins et jambon",
          "texte": "Coupe les muffins en deux et fais-les toaster, puis beurre légèrement la face coupée. Réchauffe les tranches de jambon environ 1 minute de chaque côté dans une poêle chaude.",
          "minuteurs": [
            {
              "secondes": 120,
              "label": "Jambon"
            }
          ]
        },
        {
          "titre": "Pocher les œufs",
          "texte": "Casse chaque œuf dans un petit ramequin. Glisse-les délicatement dans l'eau frémissante, deux à la fois au maximum (pour un œuf seul, un léger tourbillon créé à la cuillère aide le blanc à s'enrouler), et laisse pocher 3 minutes : le blanc doit être pris et le jaune encore souple sous le doigt. Égoutte-les à l'écumoire sur du papier absorbant.",
          "minuteurs": [
            {
              "secondes": 180,
              "label": "Œufs pochés"
            }
          ]
        },
        {
          "titre": "Le montage",
          "texte": "Pose deux moitiés de muffin par assiette, ajoute une tranche de jambon puis un œuf poché sur chacune. Nappe généreusement de hollandaise, parsème de ciboulette ciselée, donne un tour de moulin à poivre et sers immédiatement."
        }
      ],
      "astuces": [
        "Si la hollandaise devient trop épaisse, détends-la avec une cuillère d'eau tiède ; si elle tranche, fouette une cuillère d'eau froide dans un bol propre et incorpore-y la sauce tranchée petit à petit.",
        "Tu peux pocher les œufs à l'avance : plonge-les aussitôt dans de l'eau glacée, puis réchauffe-les 30 secondes dans l'eau frémissante au moment de servir.",
        "Pour des œufs pochés bien nets, utilise des œufs très frais et égoutte-les d'abord dans une petite passoire : le blanc trop liquide s'en va et ne fait plus de filaments."
      ],
      "securite": "La sauce hollandaise est montée avec des jaunes d'œufs seulement épaissis au bain-marie, et les œufs pochés gardent un jaune coulant : ils ne sont pas cuits à cœur. Utilise des œufs extra-frais gardés au réfrigérateur, prépare la sauce au dernier moment et ne la laisse pas plusieurs heures à température ambiante. Les œufs crus ou peu cuits sont déconseillés aux personnes fragiles (femmes enceintes, jeunes enfants, personnes âgées ou immunodéprimées) : pour elles, utilise des jaunes d'œufs pasteurisés pour la sauce (vérifie l'étiquette) et prolonge le pochage jusqu'à ce que le jaune soit pris.",
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
          "Jambon (classique)",
          "Bacon canadien",
          "Saumon fumé (Royale)",
          "Épinards (Florentine)",
          "Avocat",
          "Asperges vertes",
          "Pain brioché",
          "Ciboulette"
        ]
      },
      "accords": [
        {
          "titre": "La classique",
          "texte": "jambon cuit et une pointe de piment de Cayenne dans la hollandaise."
        },
        {
          "titre": "La Royale",
          "texte": "saumon fumé à la place du jambon et un peu d'aneth."
        },
        {
          "titre": "La Florentine",
          "texte": "des pousses d'épinards tombées au beurre, pour une version sans viande."
        },
        {
          "titre": "Le brunch complet",
          "texte": "une salade de jeunes pousses et un jus d'orange pressé."
        }
      ],
      "conservation": "À déguster tout de suite : la hollandaise ne se conserve pas et ne se réchauffe pas. Prépare seulement la quantité nécessaire.",
      "allergenes": [
        "oeufs",
        "lait",
        "gluten"
      ],
      "noteAllergenes": "Certains muffins anglais contiennent aussi du soja : vérifie l'étiquette.",
      "regime": {
        "sansViande": false,
        "sansPoisson": true,
        "adaptableSansViande": true
      },
      "origine": {
        "pays": "États-Unis (New York)",
        "drapeau": "🇺🇸",
        "resume": "Un classique new-yorkais de la fin du XIXe siècle, dont l'origine reste disputée entre Delmonico's et le Waldorf.",
        "faits": [
          "Charles Ranhofer, chef de Delmonico's, a publié dans son livre The Epicurean une recette d'« eggs à la Benedick » : muffins toastés, rond de jambon cuit, œuf poché et sauce hollandaise. Sa présence dès la toute première édition de 1894 est toutefois discutée.",
          "Selon un article du New Yorker paru en 1942, l'agent de change Lemuel Benedict aurait commandé au Waldorf, en 1894, des toasts, du bacon, des œufs pochés et de la hollandaise pour soigner une gueule de bois ; le maître d'hôtel Oscar Tschirky aurait remplacé le bacon par du jambon et le pain par un muffin anglais.",
          "D'autres récits l'attribuent à des clients de Delmonico's, M. et Mme LeGrand Benedict, ou au commodore E. C. Benedict : aucune version n'est fermement établie."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Eggs Benedict",
            "url": "https://en.wikipedia.org/wiki/Eggs_Benedict"
          },
          {
            "titre": "Chowhound — The warring theories about how eggs Benedict was invented",
            "url": "https://chowhound.com/1546594/theories-about-history-of-eggs-benedict"
          },
          {
            "titre": "6sqft — How an 1894 hangover created an eggs Benedict controversy",
            "url": "https://www.6sqft.com/how-an-1894-hangover-created-an-eggs-benedict-controversy-in-new-york-city/"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "painperdu",
      "url": "pain-perdu-brioche.html",
      "titre": "Pain perdu brioché caramélisé",
      "titreCourt": "Pain perdu brioché",
      "alias": [
        "pain perdu",
        "brioche perdue",
        "french toast",
        "pain perdu brioche"
      ],
      "emoji": "🍞",
      "categorie": "brunch",
      "badge": "Brunch gourmand",
      "accroche": "Brioche épaisse, cœur crémeux et fine croûte de caramel au beurre salé : le pain perdu des grands jours.",
      "intro": "Le pain perdu version brasserie chic : d'épaisses tranches de brioche gorgées d'une crème vanillée, dorées au beurre puis enrobées d'une fine croûte caramélisée. Croustillant dehors, presque crémeux dedans, c'est aussi la meilleure façon de sauver une brioche de la veille.",
      "images": [],
      "cover": {
        "motif": "poele",
        "fond": "#4a2412",
        "encre": "#f6efe4",
        "accent": "#e8a33d"
      },
      "temps": {
        "preparation": 15,
        "cuisson": 20,
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
        "matin",
        "sucre",
        "gouter",
        "dessert",
        "francais",
        "traditionnel",
        "gourmand",
        "reconfort",
        "dimanche",
        "familial",
        "enfant",
        "facile"
      ],
      "ingredients": [
        {
          "groupe": "Pour le pain perdu",
          "items": [
            {
              "nom": "Brioche rassise (de la veille), en tranches de 2,5 cm",
              "qte": 8,
              "unite": "tranche"
            }
          ]
        },
        {
          "groupe": "Pour l'appareil",
          "items": [
            {
              "nom": "Œufs",
              "qte": 3,
              "unite": "pièce"
            },
            {
              "nom": "Lait entier",
              "qte": 250,
              "unite": "ml"
            },
            {
              "nom": "Crème liquide entière",
              "qte": 100,
              "unite": "ml"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 30,
              "unite": "g"
            },
            {
              "nom": "Extrait de vanille",
              "qte": 1,
              "unite": "c. à café"
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
          "groupe": "Pour la cuisson et le caramel",
          "items": [
            {
              "nom": "Beurre demi-sel",
              "qte": 40,
              "unite": "g"
            },
            {
              "nom": "Cassonade",
              "qte": 40,
              "unite": "g"
            }
          ]
        },
        {
          "groupe": "Pour servir",
          "items": [
            {
              "nom": "Fruits rouges",
              "qte": 150,
              "unite": "g",
              "optionnel": true
            },
            {
              "nom": "Fleur de sel",
              "qte": 1,
              "unite": "pincée",
              "fixe": true,
              "optionnel": true
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Four et brioche",
          "texte": "Préchauffe le four à 180 °C. Coupe la brioche en tranches régulières d'environ 2,5 cm : une brioche de la veille, un peu sèche, absorbe la crème sans se désagréger."
        },
        {
          "titre": "L'appareil",
          "texte": "Dans un plat creux, fouette les œufs avec le sucre, la vanille et le sel jusqu'à ce que le mélange soit homogène. Verse le lait et la crème en fouettant, puis passe l'appareil au tamis pour retirer les filaments d'œuf."
        },
        {
          "titre": "Le trempage",
          "texte": "Trempe chaque tranche 20 à 30 secondes par face, jusqu'à ce que la mie soit imbibée mais encore assez ferme pour être soulevée. Laisse égoutter les tranches 1 minute sur une grille."
        },
        {
          "titre": "Dorer au beurre",
          "texte": "Fais fondre une noisette de beurre demi-sel dans une grande poêle à feu moyen. Quand il mousse, dépose les tranches sans les serrer et laisse dorer environ 3 minutes par face, jusqu'à une belle couleur blonde.",
          "minuteurs": [
            {
              "secondes": 180,
              "label": "Première face"
            },
            {
              "secondes": 180,
              "label": "Seconde face"
            }
          ]
        },
        {
          "titre": "La caramélisation",
          "texte": "Saupoudre le dessus des tranches d'une fine couche de cassonade, retourne-les et laisse le sucre fondre en caramel ambré environ 1 minute. Répète sur l'autre face, en surveillant sans arrêt : le caramel passe vite de blond à brûlé.",
          "minuteurs": [
            {
              "secondes": 60,
              "label": "Caramel première face"
            },
            {
              "secondes": 60,
              "label": "Caramel seconde face"
            }
          ]
        },
        {
          "titre": "Finir au four",
          "texte": "Range les tranches caramélisées sur une plaque couverte de papier cuisson et enfourne 5 minutes. Le cœur finit de cuire et devient fondant, presque comme un flan, sans que la croûte ne ramollisse.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Finition au four"
            }
          ]
        },
        {
          "titre": "Le service",
          "texte": "Sers aussitôt, tant que la croûte de caramel croustille. Ajoute quelques fruits rouges et, si tu aimes le sucré-salé, quelques grains de fleur de sel."
        }
      ],
      "astuces": [
        "Pas de brioche de la veille ? Fais sécher les tranches 10 minutes au four à 120 °C : elles absorberont l'appareil sans se défaire.",
        "Essuie la poêle avec du papier absorbant entre deux fournées et remets un peu de beurre neuf : le beurre et le sucre brûlés donneraient de l'amertume.",
        "Le beurre demi-sel donne au caramel un goût de caramel au beurre salé ; avec du beurre doux, ajoute la pincée de fleur de sel au service."
      ],
      "choix": {
        "titre": "Garnitures au choix",
        "mode": "multi",
        "label": "Ton pain perdu",
        "options": [
          "Fruits rouges",
          "Glace vanille",
          "Crème fouettée",
          "Pommes poêlées",
          "Banane caramélisée",
          "Sirop d'érable",
          "Fleur de sel",
          "Noisettes torréfiées"
        ]
      },
      "accords": [
        {
          "titre": "Le brunch",
          "texte": "des fruits rouges frais et une cuillère de crème fouettée peu sucrée."
        },
        {
          "titre": "En dessert",
          "texte": "tiède, avec une boule de glace vanille qui fond sur le caramel."
        },
        {
          "titre": "L'automnal",
          "texte": "des quartiers de pomme poêlés au beurre et à la cannelle."
        },
        {
          "titre": "À boire",
          "texte": "un chocolat chaud ou un jus d'orange pressé."
        }
      ],
      "conservation": "À déguster tout de suite, tant que le caramel croustille. L'appareil se prépare la veille et se garde 24 h au réfrigérateur, filmé.",
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
        "pays": "Europe (racines romaines)",
        "drapeau": "🌍",
        "resume": "Une recette de récupération très ancienne : du pain rassis trempé puis frit, connue sous bien des noms à travers l'Europe.",
        "faits": [
          "Un recueil de cuisine romain attribué à Apicius décrit déjà du pain trempé dans du lait, frit dans l'huile puis nappé de miel ; les sources ne s'accordent pas sur la présence d'œufs dans cette recette, ni sur la date exacte du recueil.",
          "En France, son nom de « pain perdu » viendrait de l'habitude d'y utiliser du pain rassis, qui aurait sinon été perdu.",
          "En anglais, le nom « French toast » apparaît pour la première fois en 1660 selon les dictionnaires d'Oxford cités par le Smithsonian ; en Allemagne, on l'appelle « Arme Ritter », les « pauvres chevaliers »."
        ],
        "sources": [
          {
            "titre": "Smithsonian Magazine — There are many names for French toast",
            "url": "https://www.smithsonianmag.com/smart-news/there-are-many-names-french-toast-ways-cook-it-180961221/"
          },
          {
            "titre": "Wikipédia (en) — French toast",
            "url": "https://en.wikipedia.org/wiki/French_toast"
          },
          {
            "titre": "Food Republic — The unexpectedly ancient origins of French toast",
            "url": "https://www.foodrepublic.com/1290861/unexpectedly-ancient-origins-french-toast"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "parisbrest",
      "url": "paris-brest.html",
      "titre": "Paris-Brest à la crème mousseline pralinée",
      "titreCourt": "Paris-Brest",
      "alias": [
        "paris brest",
        "paris-brest",
        "couronne pralinee"
      ],
      "emoji": "🌰",
      "categorie": "dessert",
      "badge": "Pâtisserie fine",
      "accroche": "Une couronne de pâte à choux aux amandes effilées, garnie d'une généreuse crème mousseline au praliné.",
      "intro": "Le grand classique des vitrines de pâtissier : une couronne de pâte à choux croustillante, parsemée d'amandes effilées et garnie d'une crème mousseline au praliné. Chaque élément demande un peu de soin, mais tout se fait avec un four, une casserole et une poche à douille.",
      "images": [],
      "cover": {
        "motif": "cloche",
        "fond": "#4a2c17",
        "encre": "#f6efe4",
        "accent": "#e0a456"
      },
      "temps": {
        "preparation": 60,
        "cuisson": 50,
        "repos": 90
      },
      "difficulte": "Avancé",
      "portions": {
        "base": 8,
        "unite": "part",
        "pluriel": "parts",
        "min": 4,
        "max": 16,
        "pas": 4
      },
      "tags": [
        "dessert",
        "francais",
        "patisserie",
        "gastronomique",
        "traditionnel",
        "sucre",
        "gourmand",
        "raffine",
        "four",
        "fete",
        "invite",
        "dimanche"
      ],
      "ingredients": [
        {
          "groupe": "Pour la crème mousseline au praliné",
          "items": [
            {
              "nom": "Lait entier",
              "qte": 300,
              "unite": "ml"
            },
            {
              "nom": "Jaunes d'œufs",
              "qte": 3,
              "unite": "pièce"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 60,
              "unite": "g"
            },
            {
              "nom": "Fécule de maïs",
              "qte": 30,
              "unite": "g"
            },
            {
              "nom": "Pâte de praliné (noisette ou amande-noisette)",
              "qte": 150,
              "unite": "g"
            },
            {
              "nom": "Beurre doux mou",
              "qte": 160,
              "unite": "g"
            }
          ]
        },
        {
          "groupe": "Pour la pâte à choux",
          "items": [
            {
              "nom": "Lait entier",
              "qte": 125,
              "unite": "ml"
            },
            {
              "nom": "Eau",
              "qte": 125,
              "unite": "ml"
            },
            {
              "nom": "Beurre doux",
              "qte": 110,
              "unite": "g"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 1,
              "unite": "c. à café"
            },
            {
              "nom": "Sel fin",
              "qte": 0.5,
              "unite": "c. à café"
            },
            {
              "nom": "Farine de blé (type 45 ou 55)",
              "qte": 140,
              "unite": "g"
            },
            {
              "nom": "Œufs (environ 250 g sans coquille)",
              "qte": 5,
              "unite": "pièce"
            }
          ]
        },
        {
          "groupe": "Pour la finition",
          "items": [
            {
              "nom": "Œuf pour la dorure",
              "qte": 1,
              "unite": "pièce"
            },
            {
              "nom": "Amandes effilées",
              "qte": 40,
              "unite": "g"
            },
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
          "titre": "La crème pâtissière",
          "texte": "Porte le lait à ébullition. Dans un saladier, fouette les jaunes avec le sucre, puis ajoute la fécule ; verse le lait bouillant en filet sans cesser de fouetter. Reverse le tout dans la casserole et laisse bouillir 1 minute en fouettant vivement, jusqu'à ce que la crème soit épaisse et lisse.",
          "minuteurs": [
            {
              "secondes": 60,
              "label": "Ébullition de la crème"
            }
          ]
        },
        {
          "titre": "Praliné et refroidissement",
          "texte": "Hors du feu, incorpore le praliné et 60 g de beurre jusqu'à ce que la crème soit homogène. Verse-la dans un plat, filme-la au contact pour éviter qu'une peau se forme et laisse-la refroidir 1 heure au réfrigérateur.",
          "minuteurs": [
            {
              "secondes": 3600,
              "label": "Refroidir la crème"
            }
          ]
        },
        {
          "titre": "La panade",
          "texte": "Préchauffe le four à 170 °C (chaleur statique). Dans une casserole, porte à ébullition le lait, l'eau, le beurre en morceaux, le sucre et le sel. Hors du feu, verse la farine d'un coup et mélange vivement à la spatule jusqu'à obtenir une pâte lisse qui forme une boule."
        },
        {
          "titre": "Dessécher la pâte",
          "texte": "Remets la casserole sur feu moyen et remue sans arrêt 1 à 2 minutes : la pâte doit se décoller des parois et laisser un léger film au fond. Transfère-la dans un saladier et laisse-la tiédir 2 à 3 minutes pour qu'elle ne cuise pas les œufs.",
          "minuteurs": [
            {
              "secondes": 90,
              "label": "Dessèchement"
            }
          ]
        },
        {
          "titre": "Les œufs",
          "texte": "Bats les œufs en omelette et incorpore-les en quatre ou cinq fois, en mélangeant bien entre chaque ajout. Arrête-toi quand la pâte est lisse et brillante et que, soulevée à la spatule, elle retombe en formant un « V » : il peut rester un peu d'œuf."
        },
        {
          "titre": "Dresser la couronne",
          "texte": "Trace un cercle de 22 cm sur une feuille de papier cuisson et retourne-la sur la plaque. Avec une poche munie d'une douille cannelée d'environ 15 mm, poche deux boudins de pâte côte à côte le long du cercle, puis un troisième par-dessus, dans le creux entre les deux. Badigeonne d'œuf battu et parsème d'amandes effilées."
        },
        {
          "titre": "La cuisson",
          "texte": "Enfourne pour 40 à 45 minutes sans jamais ouvrir la porte : la couronne doit être bien dorée, même dans les creux, et sèche au toucher. Laisse-la refroidir complètement sur une grille.",
          "minuteurs": [
            {
              "secondes": 2400,
              "label": "Vérifier la couleur"
            },
            {
              "secondes": 2700,
              "label": "Cuisson complète"
            }
          ]
        },
        {
          "titre": "La mousseline",
          "texte": "Sors la crème pralinée du réfrigérateur un quart d'heure à l'avance et lisse-la au fouet. Fouette le reste du beurre bien mou au batteur jusqu'à ce qu'il soit crémeux, puis ajoute la crème petit à petit et fouette encore 3 à 5 minutes, jusqu'à obtenir une mousseline légère, lisse et bien tenue.",
          "minuteurs": [
            {
              "secondes": 900,
              "label": "Tempérer la crème"
            }
          ]
        },
        {
          "titre": "Le montage",
          "texte": "Coupe la couronne en deux dans l'épaisseur avec un couteau-scie. Poche la mousseline en rosaces serrées sur la base avec une douille cannelée, repose le chapeau et saupoudre de sucre glace. Place 30 minutes au réfrigérateur pour raffermir la crème, puis sers.",
          "minuteurs": [
            {
              "secondes": 1800,
              "label": "Raffermir au frais"
            }
          ]
        }
      ],
      "astuces": [
        "La crème et le beurre doivent être à peu près à la même température, autour de 20 °C : si la mousseline tranche et paraît granuleuse, chauffe le bol quelques secondes au-dessus d'un bain-marie en continuant de fouetter, elle redevient lisse.",
        "N'ouvre pas la porte du four pendant la cuisson : c'est la vapeur enfermée dans la pâte qui fait gonfler la couronne, et un courant d'air froid la ferait retomber.",
        "Pour un praliné maison, fais caraméliser à sec 100 g de sucre, verse-le sur 100 g de noisettes torréfiées, laisse durcir puis mixe longuement, en plusieurs fois, jusqu'à obtenir une pâte coulante."
      ],
      "choix": {
        "titre": "Variantes au choix",
        "mode": "single",
        "label": "Ta version",
        "options": [
          "Praliné noisette",
          "Praliné amande-noisette",
          "Cœur de praliné pur",
          "Éclats de noisettes",
          "Couronnes individuelles",
          "Voile de sucre glace",
          "Amandes effilées"
        ]
      },
      "accords": [
        {
          "titre": "Le classique",
          "texte": "praliné noisette, amandes effilées et voile de sucre glace."
        },
        {
          "titre": "Le croquant",
          "texte": "quelques noisettes torréfiées concassées sur la mousseline avant de refermer."
        },
        {
          "titre": "L'intense",
          "texte": "un trait de praliné pur poché au cœur de la mousseline."
        },
        {
          "titre": "En individuel",
          "texte": "de petites couronnes d'environ 8 cm, cuites un peu moins longtemps."
        }
      ],
      "conservation": "Garde le Paris-Brest au réfrigérateur et déguste-le dans les 24 heures, car la crème ne supporte pas de rester longtemps à température ambiante ; la couronne vide se garde 2 jours dans une boîte hermétique et se recroustille quelques minutes au four.",
      "allergenes": [
        "gluten",
        "oeufs",
        "lait",
        "fruitsacoque"
      ],
      "noteAllergenes": "Le praliné du commerce peut contenir de la lécithine de soja ou des traces d'arachides : vérifie l'étiquette.",
      "regime": {
        "sansViande": true,
        "sansPoisson": true
      },
      "origine": {
        "pays": "France (Maisons-Laffitte)",
        "drapeau": "🇫🇷",
        "resume": "Une couronne de pâte à choux pralinée, imaginée en hommage à la course cycliste Paris-Brest-Paris.",
        "faits": [
          "La course cycliste Paris-Brest-Paris a été lancée en 1891 par le journaliste Pierre Giffard.",
          "Selon le récit le plus répandu, le pâtissier Louis Durand, installé à Maisons-Laffitte, a créé le gâteau à la demande de Pierre Giffard ; la plupart des sources donnent 1910, d'autres 1909.",
          "Sa forme est censée évoquer une roue de vélo, mais certaines sources affirment que la première version avait la forme d'un éclair et que la couronne serait venue plus tard : ce point reste discuté."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Paris–Brest",
            "url": "https://en.wikipedia.org/wiki/Paris%E2%80%93Brest"
          },
          {
            "titre": "Visit Paris Region — Pâtisserie Durand, berceau du Paris-Brest",
            "url": "https://www.visitparisregion.com/en/patisserie-durand"
          },
          {
            "titre": "Obviously French — Paris-Brest, an iconic French pastry",
            "url": "https://obviouslyfrench.com/paris-brest-history/"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "eclairschocolat",
      "url": "eclairs-au-chocolat.html",
      "titre": "Éclairs au chocolat",
      "titreCourt": "Éclairs au chocolat",
      "alias": [
        "eclair",
        "eclairs",
        "eclair au chocolat",
        "eclairs chocolat"
      ],
      "emoji": "🍫",
      "categorie": "dessert",
      "badge": "Classique de pâtissier",
      "accroche": "Pâte à choux bien dorée, crème pâtissière au chocolat noir et glaçage brillant : l'éclair des vitrines.",
      "intro": "L'éclair des grandes pâtisseries, à refaire chez toi : une pâte à choux légère et croustillante, généreusement garnie de crème pâtissière au chocolat noir. Un glaçage brillant au chocolat termine le tout, pour des éclairs aussi beaux que gourmands.",
      "images": [],
      "cover": {
        "motif": "assiette",
        "fond": "#2b1810",
        "encre": "#f6efe4",
        "accent": "#d9823b"
      },
      "temps": {
        "preparation": 50,
        "cuisson": 40,
        "repos": 75
      },
      "difficulte": "Intermédiaire",
      "portions": {
        "base": 12,
        "unite": "éclair",
        "pluriel": "éclairs",
        "min": 6,
        "max": 36,
        "pas": 6
      },
      "tags": [
        "dessert",
        "chocolat",
        "francais",
        "patisserie",
        "gastronomique",
        "traditionnel",
        "gourmand",
        "sucre",
        "gouter",
        "four",
        "fete",
        "invite"
      ],
      "ingredients": [
        {
          "groupe": "Pour la crème pâtissière au chocolat",
          "items": [
            {
              "nom": "Lait entier",
              "qte": 500,
              "unite": "ml"
            },
            {
              "nom": "Jaunes d'œufs",
              "qte": 4,
              "unite": "pièce"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 90,
              "unite": "g"
            },
            {
              "nom": "Fécule de maïs",
              "qte": 40,
              "unite": "g"
            },
            {
              "nom": "Chocolat noir (60 à 70 % de cacao)",
              "qte": 100,
              "unite": "g"
            },
            {
              "nom": "Beurre doux",
              "qte": 25,
              "unite": "g"
            }
          ]
        },
        {
          "groupe": "Pour la pâte à choux",
          "items": [
            {
              "nom": "Lait entier",
              "qte": 125,
              "unite": "ml"
            },
            {
              "nom": "Eau",
              "qte": 125,
              "unite": "ml"
            },
            {
              "nom": "Beurre doux",
              "qte": 110,
              "unite": "g"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 1,
              "unite": "c. à café"
            },
            {
              "nom": "Sel fin",
              "qte": 0.5,
              "unite": "c. à café"
            },
            {
              "nom": "Farine de blé (type 45 ou 55)",
              "qte": 140,
              "unite": "g"
            },
            {
              "nom": "Œufs (environ 250 g sans coquille)",
              "qte": 5,
              "unite": "pièce"
            }
          ]
        },
        {
          "groupe": "Pour le glaçage",
          "items": [
            {
              "nom": "Chocolat noir (60 à 70 % de cacao)",
              "qte": 100,
              "unite": "g"
            },
            {
              "nom": "Crème liquide entière",
              "qte": 100,
              "unite": "ml"
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "La crème au chocolat",
          "texte": "Hache finement le chocolat de la crème. Porte le lait à ébullition ; pendant ce temps, fouette les jaunes avec le sucre puis la fécule. Verse le lait bouillant en filet sur les jaunes en fouettant, reverse le tout dans la casserole et laisse bouillir 1 minute sans cesser de fouetter.",
          "minuteurs": [
            {
              "secondes": 60,
              "label": "Ébullition de la crème"
            }
          ]
        },
        {
          "titre": "Refroidir la crème",
          "texte": "Hors du feu, ajoute le chocolat haché et le beurre, puis fouette jusqu'à ce que la crème soit lisse et brillante. Verse-la dans un plat, filme-la au contact et laisse-la refroidir 1 heure au réfrigérateur.",
          "minuteurs": [
            {
              "secondes": 3600,
              "label": "Refroidir la crème"
            }
          ]
        },
        {
          "titre": "La panade",
          "texte": "Préchauffe le four à 180 °C (chaleur statique). Dans une casserole, porte à ébullition le lait, l'eau, le beurre en morceaux, le sucre et le sel. Hors du feu, verse la farine d'un coup et mélange vivement à la spatule jusqu'à obtenir une boule de pâte lisse."
        },
        {
          "titre": "Dessécher, puis les œufs",
          "texte": "Remets sur feu moyen et remue 1 à 2 minutes, jusqu'à ce que la pâte se décolle des parois et laisse un léger film au fond. Transfère-la dans un saladier, laisse-la tiédir 2 à 3 minutes, puis incorpore les œufs battus en quatre ou cinq fois : la pâte est prête quand elle est lisse, brillante et retombe de la spatule en formant un « V ».",
          "minuteurs": [
            {
              "secondes": 90,
              "label": "Dessèchement"
            }
          ]
        },
        {
          "titre": "Dresser les éclairs",
          "texte": "Garnis une poche d'une douille cannelée d'environ 15 mm. Sur une plaque couverte de papier cuisson, poche des boudins réguliers de 12 à 13 cm, en tenant la poche inclinée et en gardant une pression constante, puis coupe la pâte net d'un petit coup de poignet. Espace-les de 4 à 5 cm : ils vont gonfler."
        },
        {
          "titre": "La cuisson",
          "texte": "Enfourne pour 30 à 35 minutes sans ouvrir la porte. Les éclairs sont cuits quand ils sont bien dorés, même dans les sillons, légers et secs : trop pâles, ils retomberaient en refroidissant. Laisse-les refroidir sur une grille.",
          "minuteurs": [
            {
              "secondes": 1800,
              "label": "Vérifier la couleur"
            },
            {
              "secondes": 2100,
              "label": "Cuisson complète"
            }
          ]
        },
        {
          "titre": "Garnir les éclairs",
          "texte": "Lisse la crème au fouet et mets-la dans une poche munie d'une petite douille lisse. Perce deux ou trois petits trous sous chaque éclair avec la pointe de la douille et garnis-le jusqu'à ce qu'il soit lourd et que la crème affleure aux trous."
        },
        {
          "titre": "Le glaçage",
          "texte": "Hache le chocolat du glaçage et place-le dans un bol. Porte la crème à frémissement, verse-la sur le chocolat, attends 1 minute, puis mélange du centre vers les bords jusqu'à obtenir un glaçage lisse et brillant. Laisse-le tiédir quelques minutes : il doit napper sans couler.",
          "minuteurs": [
            {
              "secondes": 60,
              "label": "Laisser fondre"
            }
          ]
        },
        {
          "titre": "Glacer et servir",
          "texte": "Trempe le dessus de chaque éclair dans le glaçage, laisse s'écouler l'excédent et lisse le bord du bout du doigt. Laisse figer 15 minutes au réfrigérateur, puis sers frais.",
          "minuteurs": [
            {
              "secondes": 900,
              "label": "Figer le glaçage"
            }
          ]
        }
      ],
      "astuces": [
        "Pour des éclairs tous identiques, trace des repères de 12 cm au crayon au dos du papier cuisson avant de le retourner sur la plaque : il ne reste qu'à suivre les lignes.",
        "Les éclairs qui retombent à la sortie du four manquaient de cuisson : mieux vaut quelques minutes de trop que pas assez, tant qu'ils ne brûlent pas.",
        "Pour un glaçage de pâtissier, tu peux remplacer celui-ci par du fondant pâtissier tiédi vers 35 °C et mélangé à un peu de chocolat fondu : il fige en une couche lisse et brillante."
      ],
      "choix": {
        "titre": "Parfums au choix",
        "mode": "single",
        "label": "Ton éclair",
        "options": [
          "Chocolat noir",
          "Café",
          "Vanille",
          "Caramel",
          "Praliné",
          "Pistache",
          "Éclats de noisettes",
          "Fleur de sel"
        ]
      },
      "accords": [
        {
          "titre": "Le classique",
          "texte": "crème et glaçage au chocolat noir."
        },
        {
          "titre": "Le moka",
          "texte": "une crème pâtissière au café sous un glaçage au chocolat."
        },
        {
          "titre": "Le croquant",
          "texte": "quelques éclats de noisettes torréfiées posés sur le glaçage encore souple."
        },
        {
          "titre": "Le sucré-salé",
          "texte": "quelques grains de fleur de sel sur le glaçage."
        }
      ],
      "conservation": "Garde les éclairs garnis au réfrigérateur et déguste-les dans les 24 heures, car la pâte ramollit au contact de la crème ; les coques vides se gardent 2 jours dans une boîte hermétique.",
      "allergenes": [
        "gluten",
        "oeufs",
        "lait"
      ],
      "noteAllergenes": "Certains chocolats contiennent de la lécithine de soja ou des traces de fruits à coque : vérifie l'étiquette.",
      "regime": {
        "sansViande": true,
        "sansPoisson": true
      },
      "origine": {
        "pays": "France",
        "drapeau": "🇫🇷",
        "resume": "Une pâtisserie de pâte à choux allongée, garnie et glacée, née en France au XIXe siècle.",
        "faits": [
          "Il se serait d'abord appelé « pain à la duchesse » ou « petite duchesse » ; selon Wikipédia, le mot « éclair » est attesté en français comme en anglais dans les années 1860, mais certaines sources le font remonter aux années 1850.",
          "Certains historiens de la cuisine supposent qu'il a été créé par le grand cuisinier Antonin Carême (1784-1833), mais aucune preuve ne permet de l'affirmer.",
          "L'origine de son nom reste incertaine : on dit souvent qu'il se mange « en un éclair », d'autres évoquent l'éclat de son glaçage, mais aucune de ces explications n'est prouvée."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Éclair",
            "url": "https://en.wikipedia.org/wiki/%C3%89clair"
          },
          {
            "titre": "Etymonline — Éclair",
            "url": "https://www.etymonline.com/word/eclair"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "millefeuille",
      "url": "mille-feuille.html",
      "titre": "Mille-feuille à la vanille",
      "titreCourt": "Mille-feuille",
      "alias": [
        "millefeuille",
        "mille feuille",
        "mille-feuille",
        "napoleon"
      ],
      "emoji": "🍰",
      "categorie": "dessert",
      "badge": "Feuilletage maison",
      "accroche": "Trois feuilles de pâte feuilletée maison, une crème pâtissière vanillée et le glaçage marbré de chocolat.",
      "intro": "Le mille-feuille dans sa version de pâtisserie : un feuilletage maison bien croustillant, une crème pâtissière à la vanille et le fameux glaçage blanc marbré de chocolat. Le feuilletage demande surtout du temps et du froid : organise-toi, et le résultat en vaut largement la peine.",
      "images": [],
      "cover": {
        "motif": "gateau",
        "fond": "#3a2a17",
        "encre": "#f6efe4",
        "accent": "#f2cf6b"
      },
      "temps": {
        "preparation": 75,
        "cuisson": 45,
        "repos": 210
      },
      "difficulte": "Avancé",
      "portions": {
        "base": 8,
        "unite": "part",
        "pluriel": "parts",
        "min": 4,
        "max": 16,
        "pas": 4
      },
      "tags": [
        "dessert",
        "francais",
        "patisserie",
        "gastronomique",
        "traditionnel",
        "raffine",
        "sucre",
        "gourmand",
        "four",
        "fete",
        "invite",
        "dimanche"
      ],
      "ingredients": [
        {
          "groupe": "Pour la pâte feuilletée",
          "items": [
            {
              "nom": "Farine de blé (type 45 ou 55)",
              "qte": 250,
              "unite": "g"
            },
            {
              "nom": "Sel fin",
              "qte": 1,
              "unite": "c. à café"
            },
            {
              "nom": "Eau froide",
              "qte": 125,
              "unite": "ml"
            },
            {
              "nom": "Beurre doux fondu",
              "qte": 25,
              "unite": "g"
            },
            {
              "nom": "Beurre doux bien froid (pour le tourage)",
              "qte": 200,
              "unite": "g"
            },
            {
              "nom": "Farine pour le plan de travail",
              "qte": null,
              "unite": "",
              "note": "un peu"
            }
          ]
        },
        {
          "groupe": "Pour la crème pâtissière à la vanille",
          "items": [
            {
              "nom": "Lait entier",
              "qte": 500,
              "unite": "ml"
            },
            {
              "nom": "Gousse de vanille",
              "qte": 1,
              "unite": "gousse"
            },
            {
              "nom": "Jaunes d'œufs",
              "qte": 5,
              "unite": "pièce"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 120,
              "unite": "g"
            },
            {
              "nom": "Fécule de maïs",
              "qte": 50,
              "unite": "g"
            },
            {
              "nom": "Beurre doux",
              "qte": 40,
              "unite": "g"
            }
          ]
        },
        {
          "groupe": "Pour le glaçage marbré",
          "items": [
            {
              "nom": "Sucre glace",
              "qte": 150,
              "unite": "g"
            },
            {
              "nom": "Eau",
              "qte": 2,
              "unite": "c. à soupe"
            },
            {
              "nom": "Chocolat noir",
              "qte": 30,
              "unite": "g"
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "La détrempe",
          "texte": "Mélange la farine et le sel, ajoute l'eau froide et le beurre fondu, puis pétris juste assez pour obtenir une pâte homogène, sans la travailler davantage. Forme un carré, entaille le dessus en croix, filme-le et laisse-le reposer 30 minutes au réfrigérateur.",
          "minuteurs": [
            {
              "secondes": 1800,
              "label": "Repos de la détrempe"
            }
          ]
        },
        {
          "titre": "Le beurre de tourage",
          "texte": "Place le beurre froid entre deux feuilles de papier cuisson et tape-le au rouleau pour former un carré d'environ 14 cm de côté. Il doit rester froid mais souple, de la même consistance que la détrempe : trop dur, il casserait en morceaux dans la pâte."
        },
        {
          "titre": "L'enfermage",
          "texte": "Sur le plan de travail fariné, étale la détrempe en un carré d'environ 22 cm. Pose le beurre au centre, en losange, puis rabats les quatre coins de pâte par-dessus et soude bien les bords pour l'enfermer complètement."
        },
        {
          "titre": "Les six tours",
          "texte": "Étale la pâte en un long rectangle environ trois fois plus long que large, puis plie-la en trois comme un portefeuille : c'est un tour simple. Tourne-la d'un quart de tour, fais un deuxième tour, filme et laisse reposer 30 minutes au froid. Répète deux fois cette série de deux tours et de repos, pour six tours en tout.",
          "minuteurs": [
            {
              "secondes": 1800,
              "label": "Repos entre deux séries"
            }
          ]
        },
        {
          "titre": "La crème pâtissière",
          "texte": "Pendant les repos de la pâte, fends la gousse de vanille, gratte les graines dans le lait, ajoute la gousse et porte à ébullition. Fouette les jaunes avec le sucre et la fécule, verse le lait chaud en filet (gousse retirée), reverse dans la casserole et laisse bouillir 1 minute en fouettant. Hors du feu, ajoute le beurre, puis verse la crème dans un plat, filme-la au contact et réserve-la au réfrigérateur.",
          "minuteurs": [
            {
              "secondes": 60,
              "label": "Ébullition de la crème"
            }
          ]
        },
        {
          "titre": "Étaler et piquer",
          "texte": "Étale le feuilletage en un rectangle d'environ 30 × 40 cm, de la taille de ta plaque (il fera environ 4 mm d'épaisseur), pose-le sur une plaque couverte de papier cuisson et pique-le partout à la fourchette. Laisse-le reposer 30 minutes au réfrigérateur pour qu'il se rétracte moins, et préchauffe le four à 180 °C.",
          "minuteurs": [
            {
              "secondes": 1800,
              "label": "Repos avant cuisson"
            }
          ]
        },
        {
          "titre": "La cuisson sous plaque",
          "texte": "Couvre la pâte d'une feuille de papier cuisson et d'une seconde plaque pour l'empêcher de trop gonfler, puis enfourne 30 minutes. Retire la plaque du dessus et poursuis 5 à 10 minutes, jusqu'à ce que le feuilletage soit bien doré et sec à cœur. Laisse-le refroidir sur une grille.",
          "minuteurs": [
            {
              "secondes": 1800,
              "label": "Cuisson sous plaque"
            },
            {
              "secondes": 600,
              "label": "Dorer à découvert"
            }
          ]
        },
        {
          "titre": "Découper et glacer",
          "texte": "Avec un couteau-scie, coupe le feuilletage en trois bandes égales d'environ 10 × 40 cm. Mélange le sucre glace et l'eau en un glaçage épais et lisse, fais fondre le chocolat, puis étale le glaçage sur la plus belle bande. Trace aussitôt des lignes de chocolat en travers avec un cornet, et passe la pointe d'un couteau dans la longueur, alternativement dans un sens puis dans l'autre, pour marbrer."
        },
        {
          "titre": "Le montage",
          "texte": "Lisse la crème au fouet et mets-la dans une poche à douille. Poche une couche régulière de crème sur la première bande, pose la deuxième, poche le reste de crème et termine par la bande glacée. Place 1 heure au réfrigérateur pour que l'ensemble se tienne.",
          "minuteurs": [
            {
              "secondes": 3600,
              "label": "Prise au frais"
            }
          ]
        },
        {
          "titre": "La découpe",
          "texte": "Coupe le mille-feuille en 8 parts au couteau-scie, par petits mouvements de va-et-vient sans appuyer, en essuyant la lame entre chaque part. Sers frais."
        }
      ],
      "astuces": [
        "Le secret du feuilletage, c'est le froid : si le beurre ramollit ou commence à percer la pâte, remets-la 15 minutes au réfrigérateur avant de continuer.",
        "Pour glacer, retourne la bande du dessus : la face qui cuisait contre la plaque est parfaitement plane et donne un glaçage bien lisse.",
        "Pas le temps de faire le feuilletage ? Deux rouleaux de pâte feuilletée pur beurre du commerce, cuits de la même façon sous une plaque, donnent déjà un très bon mille-feuille."
      ],
      "choix": {
        "titre": "Finitions & variantes",
        "mode": "single",
        "label": "Ta version",
        "options": [
          "Glaçage marbré",
          "Dessus caramélisé",
          "Voile de sucre glace",
          "Vanille bourbon",
          "Framboises fraîches",
          "Crème au praliné",
          "Parts individuelles"
        ]
      },
      "accords": [
        {
          "titre": "Le classique",
          "texte": "glaçage blanc marbré de chocolat et crème à la vanille."
        },
        {
          "titre": "Le caramélisé",
          "texte": "une bande du dessus saupoudrée de sucre glace et caramélisée quelques minutes au four très chaud."
        },
        {
          "titre": "Le fruité",
          "texte": "des framboises fraîches alignées dans la crème."
        },
        {
          "titre": "Le plus simple",
          "texte": "un simple voile de sucre glace sur la bande du dessus."
        }
      ],
      "conservation": "Le mille-feuille se déguste de préférence le jour même : garde-le au réfrigérateur et consomme-le dans les 24 heures, car le feuilletage ramollit au contact de la crème. La pâte feuilletée crue se garde 2 jours au réfrigérateur, bien filmée.",
      "allergenes": [
        "gluten",
        "oeufs",
        "lait"
      ],
      "noteAllergenes": "Certains chocolats contiennent de la lécithine de soja ou du lait : vérifie l'étiquette.",
      "regime": {
        "sansViande": true,
        "sansPoisson": true
      },
      "origine": {
        "pays": "France",
        "drapeau": "🇫🇷",
        "resume": "Un gâteau de pâte feuilletée et de crème, dont l'histoire écrite remonterait au XVIIe siècle, sans inventeur connu.",
        "faits": [
          "Plusieurs sources citent « Le Cuisinier françois » de La Varenne (1651) comme la première trace écrite d'un « gâteau de mille feuilles » ; selon Wikipédia, le nom « mille-feuille » apparaît en 1733 dans un livre en anglais du cuisinier français Vincent La Chapelle.",
          "Le grand cuisinier Antonin Carême est cité pour l'avoir perfectionné, pas pour l'avoir inventé : il en parlait comme d'une recette ancienne.",
          "Le pâtissier parisien Adolphe Seugnot, installé rue du Bac, est souvent cité pour l'avoir rendu célèbre en 1867, mais pas pour l'avoir inventé."
        ],
        "sources": [
          {
            "titre": "Tasting Table — The alluring history of the mille-feuille",
            "url": "https://tastingtable.com/1061714/the-alluring-history-of-the-mille-feuille"
          },
          {
            "titre": "Wikipédia (en) — Mille-feuille",
            "url": "https://en.wikipedia.org/wiki/Mille-feuille"
          },
          {
            "titre": "Sortir à Paris — D'où vient le mille-feuille ?",
            "url": "https://www.sortiraparis.com/hotel-restaurant/cafe-tea-time/articles/260282-histoire-de-la-patisserie-francaise-d-ou-vient-le-mille-feuille"
          },
          {
            "titre": "Epicure & Culture — The delicious history of the millefeuille",
            "url": "https://epicureandculture.com/millefeuille/"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "tartecitronmeringuee",
      "url": "tarte-citron-meringuee.html",
      "titre": "Tarte au citron meringuée",
      "titreCourt": "Tarte citron meringuée",
      "alias": [
        "tarte au citron",
        "tarte citron",
        "tarte citron meringuee",
        "lemon meringue pie"
      ],
      "emoji": "🍋",
      "categorie": "dessert",
      "badge": "Grand classique",
      "accroche": "Pâte sucrée croustillante, crème au citron bien acidulée et meringue italienne dorée au chalumeau.",
      "intro": "Une tarte pleine de contrastes : une pâte sucrée croustillante, une crème au citron bien acidulée et un nuage de meringue italienne à peine doré. Montée avec un sirop de sucre cuit, la meringue italienne est plus stable qu'une meringue classique et se tient parfaitement sur la tarte.",
      "images": [],
      "cover": {
        "motif": "tarte",
        "fond": "#2e3a14",
        "encre": "#f6efe4",
        "accent": "#f5d91c"
      },
      "temps": {
        "preparation": 50,
        "cuisson": 35,
        "repos": 150
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
        "patisserie",
        "gastronomique",
        "traditionnel",
        "sucre",
        "frais",
        "gourmand",
        "four",
        "fete",
        "invite",
        "dimanche"
      ],
      "ingredients": [
        {
          "groupe": "Pour la pâte sucrée",
          "items": [
            {
              "nom": "Beurre doux mou",
              "qte": 125,
              "unite": "g"
            },
            {
              "nom": "Sucre glace",
              "qte": 90,
              "unite": "g"
            },
            {
              "nom": "Sel fin",
              "qte": 1,
              "unite": "pincée",
              "fixe": true
            },
            {
              "nom": "Œuf",
              "qte": 1,
              "unite": "pièce"
            },
            {
              "nom": "Farine de blé",
              "qte": 250,
              "unite": "g"
            },
            {
              "nom": "Farine pour le plan de travail",
              "qte": null,
              "unite": "",
              "note": "un peu"
            }
          ]
        },
        {
          "groupe": "Pour la crème au citron",
          "items": [
            {
              "nom": "Citrons jaunes non traités (pour 150 ml de jus)",
              "qte": 4,
              "unite": "pièce"
            },
            {
              "nom": "Œufs",
              "qte": 3,
              "unite": "pièce"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 150,
              "unite": "g"
            },
            {
              "nom": "Fécule de maïs",
              "qte": 15,
              "unite": "g"
            },
            {
              "nom": "Beurre doux",
              "qte": 80,
              "unite": "g"
            }
          ]
        },
        {
          "groupe": "Pour la meringue italienne",
          "items": [
            {
              "nom": "Blancs d'œufs (environ 100 g)",
              "qte": 3,
              "unite": "pièce"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 150,
              "unite": "g"
            },
            {
              "nom": "Eau",
              "qte": 50,
              "unite": "ml"
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "La pâte sucrée",
          "texte": "Travaille le beurre mou avec le sucre glace et le sel jusqu'à ce que le mélange soit crémeux, puis ajoute l'œuf. Incorpore la farine et mélange juste assez pour obtenir une pâte homogène, sans la pétrir. Aplatis-la en disque, filme-la et laisse-la reposer 30 minutes au réfrigérateur.",
          "minuteurs": [
            {
              "secondes": 1800,
              "label": "Repos de la pâte"
            }
          ]
        },
        {
          "titre": "Foncer le moule",
          "texte": "Préchauffe le four à 170 °C. Étale la pâte sur environ 3 mm sur un plan de travail légèrement fariné, garnis-en un moule à tarte de 24 cm, idéalement à fond amovible, en la plaquant bien dans les angles, coupe l'excédent et pique le fond à la fourchette. Garde le moule au frais jusqu'à ce que le four soit chaud."
        },
        {
          "titre": "Cuire à blanc",
          "texte": "Couvre la pâte de papier cuisson garni de billes de cuisson ou de légumes secs et enfourne 15 minutes. Retire papier et billes, puis poursuis 10 minutes environ, jusqu'à ce que le fond soit doré partout : il doit être entièrement cuit, car la crème ne repasse pas au four. Laisse refroidir.",
          "minuteurs": [
            {
              "secondes": 900,
              "label": "Avec les billes"
            },
            {
              "secondes": 600,
              "label": "Dorer le fond"
            }
          ]
        },
        {
          "titre": "Le zeste et le jus",
          "texte": "Râpe finement le zeste de deux citrons en évitant la partie blanche, qui est amère, puis presse les quatre citrons pour obtenir environ 150 ml de jus. Dans une casserole hors du feu, fouette les œufs avec le sucre et la fécule, puis ajoute le jus et les zestes."
        },
        {
          "titre": "Cuire la crème",
          "texte": "Chauffe à feu moyen sans cesser de fouetter : la crème épaissit d'un coup. Dès les premiers bouillons, laisse cuire encore 1 minute en fouettant pour bien cuire la fécule. Hors du feu, incorpore le beurre en morceaux jusqu'à ce que la crème soit lisse et brillante.",
          "minuteurs": [
            {
              "secondes": 60,
              "label": "Cuisson de la crème"
            }
          ]
        },
        {
          "titre": "Garnir et laisser prendre",
          "texte": "Verse la crème encore chaude dans le fond de tarte refroidi et lisse-la à la spatule. Laisse tiédir, puis place la tarte au moins 2 heures au réfrigérateur pour que la crème prenne.",
          "minuteurs": [
            {
              "secondes": 7200,
              "label": "Prise au réfrigérateur"
            }
          ]
        },
        {
          "titre": "Le sirop",
          "texte": "Peu avant de servir, verse l'eau et le sucre de la meringue dans une petite casserole et chauffe sans remuer, avec un thermomètre de cuisine. Mets les blancs dans le bol du batteur et commence à les fouetter à vitesse moyenne quand le sirop atteint environ 110 °C."
        },
        {
          "titre": "La meringue italienne",
          "texte": "Quand le sirop atteint 118 à 121 °C, verse-le en mince filet sur les blancs mousseux, batteur en marche, le long de la paroi du bol sans toucher les fouets. Fouette ensuite à vitesse rapide pendant 8 à 10 minutes, jusqu'à ce que la meringue soit ferme, brillante et tiède.",
          "minuteurs": [
            {
              "secondes": 540,
              "label": "Fouetter la meringue"
            }
          ]
        },
        {
          "titre": "Meringuer et dorer",
          "texte": "Poche la meringue sur la crème avec une douille, ou étale-la en vagues à la spatule. Dore-la au chalumeau, ou 1 à 2 minutes sous le gril du four très chaud en surveillant sans arrêt, puis sers aussitôt.",
          "minuteurs": [
            {
              "secondes": 60,
              "label": "Surveiller le gril"
            }
          ]
        }
      ],
      "astuces": [
        "Sans thermomètre, fais le test du « petit boulé » : une goutte de sirop plongée dans un verre d'eau froide doit former une petite boule souple entre tes doigts.",
        "Cuis le fond de tarte jusqu'à ce qu'il soit bien doré partout : c'est ce qui le garde croustillant sous la crème, qui ne repasse pas au four.",
        "Les chutes de pâte sucrée se gardent 2 jours au réfrigérateur, bien filmées : étalées et découpées à l'emporte-pièce, elles font de délicieux petits sablés."
      ],
      "securite": "La meringue italienne est « cuite » par le sirop de sucre brûlant, mais rien ne garantit que toute la masse de blancs atteigne une température suffisante pour éliminer d'éventuelles salmonelles. Les œufs crus ou peu cuits sont déconseillés aux personnes fragiles (femmes enceintes, jeunes enfants, personnes âgées ou immunodéprimées) : pour elles, utilise des blancs d'œufs pasteurisés (vérifie l'étiquette) ou sers la tarte sans meringue. La crème au citron, elle, est portée à ébullition.",
      "sourcesSecurite": [
        {
          "titre": "Anses — Qu'est-ce que la salmonellose et comment s'en prémunir ?",
          "url": "https://www.anses.fr/fr/content/quest-ce-que-la-salmonellose-et-comment-sen-premunir"
        },
        {
          "titre": "Santé publique France — Salmonellose : la maladie",
          "url": "https://www.santepubliquefrance.fr/salmonellose/la-maladie"
        }
      ],
      "choix": {
        "titre": "Finitions & variantes",
        "mode": "single",
        "label": "Ta version",
        "options": [
          "Meringue au chalumeau",
          "Meringue dorée au gril",
          "Sans meringue",
          "Zeste de citron vert",
          "Zestes confits",
          "Tartelettes individuelles",
          "Meringue en vagues"
        ]
      },
      "accords": [
        {
          "titre": "La classique",
          "texte": "meringue italienne joliment dorée au chalumeau."
        },
        {
          "titre": "La plus acidulée",
          "texte": "un peu de zeste de citron vert râpé sur la meringue."
        },
        {
          "titre": "La nature",
          "texte": "sans meringue, une crème bien lisse et quelques zestes."
        },
        {
          "titre": "En tartelettes",
          "texte": "de petits fonds de 8 à 10 cm, pour un service à l'assiette."
        }
      ],
      "conservation": "Garde la tarte au réfrigérateur et déguste-la dans les 24 heures, idéalement le jour même : la pâte ramollit au contact de la crème et la meringue perd peu à peu de sa tenue.",
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
        "pays": "Origine incertaine (Europe, États-Unis)",
        "drapeau": "🌍",
        "resume": "Une tarte au citron couronnée de meringue, dont on ignore où et quand elle est née.",
        "faits": [
          "Le mot « meringue » apparaît pour la première fois imprimé en 1692, dans un livre du cuisinier français François Massialot ; des recettes de meringues plus anciennes, sous un autre nom, figurent dans des manuscrits anglais du début du XVIIe siècle.",
          "Aux États-Unis, la tarte au citron meringuée est parfois attribuée à Elizabeth Goodfellow, pâtissière et professeure de cuisine à Philadelphie ; selon Wikipédia, sa tarte au citron utilisait des œufs entiers, ce qui rend cette attribution peu probable, mais la question reste discutée.",
          "Selon une légende populaire, la meringue aurait été inventée par un pâtissier nommé Gasparini, à Meiringen en Suisse : cette histoire n'est pas prouvée."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Meringue",
            "url": "https://en.wikipedia.org/wiki/Meringue"
          },
          {
            "titre": "Wikipédia (en) — Elizabeth Goodfellow",
            "url": "https://en.wikipedia.org/wiki/Elizabeth_Goodfellow"
          },
          {
            "titre": "KPU Food History — Many names for one dish: lemon meringue pie",
            "url": "https://wordpress.kpu.ca/foodhistory/2023/04/05/many-names-for-one-dish-lemon-meringue-pie/"
          },
          {
            "titre": "Gambero Rosso — Meringue: history, origins and recipes",
            "url": "https://www.gamberorossointernational.com/news/meringue-history-origins-and-recipes-that-see-it-as-the-protagonist/page/1270/"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "fraisier",
      "url": "fraisier.html",
      "titre": "Fraisier à la crème mousseline",
      "titreCourt": "Fraisier",
      "alias": [
        "fraisier",
        "gateau aux fraises",
        "fraisier creme mousseline"
      ],
      "emoji": "🍓",
      "categorie": "dessert",
      "badge": "Pâtisserie fine",
      "accroche": "Génoise imbibée, crème mousseline vanillée et fraises bien rangées : le grand gâteau de fête du printemps.",
      "intro": "Le fraisier est la vitrine des pâtisseries françaises au printemps : une génoise moelleuse, une crème mousseline à la vanille et une couronne de fraises coupées qui se dévoile sur les côtés. Il demande un peu d'organisation, mais chaque étape est simple quand on la prend dans l'ordre, et le résultat fait toujours son effet.",
      "images": [],
      "cover": {
        "motif": "gateau",
        "fond": "#5c1a2b",
        "encre": "#f6efe4",
        "accent": "#e8384f"
      },
      "temps": {
        "preparation": 90,
        "cuisson": 35,
        "repos": 300
      },
      "difficulte": "Avancé",
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
        "patisserie",
        "gastronomique",
        "francais",
        "traditionnel",
        "sucre",
        "frais",
        "froid",
        "ete",
        "fete",
        "invite",
        "raffine",
        "gourmand"
      ],
      "ingredients": [
        {
          "groupe": "Pour la génoise",
          "items": [
            {
              "nom": "Œufs",
              "qte": 4,
              "unite": "pièce"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 125,
              "unite": "g"
            },
            {
              "nom": "Farine de blé (type 45)",
              "qte": 125,
              "unite": "g"
            },
            {
              "nom": "Beurre pour le moule",
              "qte": 10,
              "unite": "g"
            }
          ]
        },
        {
          "groupe": "Pour le sirop d'imbibage",
          "items": [
            {
              "nom": "Eau",
              "qte": 100,
              "unite": "ml"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 80,
              "unite": "g"
            },
            {
              "nom": "Kirsch",
              "qte": 2,
              "unite": "c. à soupe",
              "optionnel": true
            }
          ]
        },
        {
          "groupe": "Pour la crème mousseline",
          "items": [
            {
              "nom": "Lait entier",
              "qte": 500,
              "unite": "ml"
            },
            {
              "nom": "Gousse de vanille",
              "qte": 1,
              "unite": "gousse"
            },
            {
              "nom": "Jaunes d'œufs",
              "qte": 4,
              "unite": "pièce"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 125,
              "unite": "g"
            },
            {
              "nom": "Fécule de maïs",
              "qte": 50,
              "unite": "g"
            },
            {
              "nom": "Beurre doux mou (pommade)",
              "qte": 200,
              "unite": "g"
            }
          ]
        },
        {
          "groupe": "Pour le montage et la finition",
          "items": [
            {
              "nom": "Fraises fermes, de taille régulière",
              "qte": 750,
              "unite": "g"
            },
            {
              "nom": "Pâte d'amande (rose ou verte)",
              "qte": 150,
              "unite": "g"
            },
            {
              "nom": "Sucre glace (pour étaler la pâte d'amande)",
              "qte": 1,
              "unite": "c. à soupe"
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "La génoise",
          "texte": "Préchauffe le four à 180 °C et beurre un moule rond de 22 cm, fond chemisé de papier cuisson. Fouette les œufs et le sucre au bain-marie frémissant jusqu'à ce que le mélange soit chaud au doigt (environ 45 °C), puis hors du feu, au batteur, jusqu'à complet refroidissement : il doit tripler de volume et former un ruban épais. Incorpore la farine tamisée en deux fois à la maryse, en soulevant la masse sans la faire retomber."
        },
        {
          "titre": "Cuire la génoise",
          "texte": "Verse la pâte dans le moule et enfourne environ 25 minutes : la génoise est dorée, se détache des bords et la lame d'un couteau ressort sèche. Démoule-la sur une grille et laisse-la refroidir complètement.",
          "minuteurs": [
            {
              "secondes": 1500,
              "label": "Cuisson de la génoise"
            }
          ]
        },
        {
          "titre": "La crème pâtissière",
          "texte": "Porte le lait à ébullition avec la gousse de vanille fendue et grattée. Fouette les jaunes avec le sucre jusqu'à ce qu'ils blanchissent, ajoute la fécule, puis verse un tiers du lait chaud en fouettant. Reverse le tout dans la casserole, retire la gousse et fais épaissir sur feu moyen sans cesser de fouetter ; laisse bouillir 1 minute.",
          "minuteurs": [
            {
              "secondes": 60,
              "label": "Ébullition de la crème"
            }
          ]
        },
        {
          "titre": "Refroidir la crème",
          "texte": "Étale la crème dans un plat, filme-la au contact pour éviter qu'une peau se forme et place-la environ 1 heure au réfrigérateur. Sors-la 15 à 20 minutes avant de l'utiliser : elle doit être à peu près à la même température que le beurre pommade.",
          "minuteurs": [
            {
              "secondes": 3600,
              "label": "Refroidissement de la crème"
            }
          ]
        },
        {
          "titre": "Le sirop",
          "texte": "Porte l'eau et le sucre à ébullition, juste le temps que le sucre fonde, puis laisse refroidir. Ajoute le kirsch une fois le sirop froid, si tu en mets."
        },
        {
          "titre": "La crème mousseline",
          "texte": "Fouette le beurre pommade seul 2 à 3 minutes, jusqu'à ce qu'il soit crémeux et pâle. Lisse la crème pâtissière au fouet, puis ajoute-la au beurre en trois fois, et fouette encore 3 à 5 minutes à vitesse élevée : la crème doit devenir lisse, légère et bien homogène."
        },
        {
          "titre": "Préparer le montage",
          "texte": "Lave les fraises avant de les équeuter, sèche-les bien, puis coupe en deux dans la hauteur les plus régulières, de même taille. Coupe la génoise en deux disques d'environ 1,5 cm d'épaisseur. Pose un cercle de 22 cm sur le plat de service, chemise-le d'une bande de rhodoïd ou de papier cuisson, et place le premier disque au fond, taillé au diamètre si besoin ; imbibe-le de sirop au pinceau, sans le détremper."
        },
        {
          "titre": "Le montage",
          "texte": "Dresse les demi-fraises debout tout autour, face coupée bien plaquée contre le rhodoïd. Poche de la crème entre les fraises et sur la génoise, garnis le centre de fraises entières, pointe vers le haut, puis recouvre de crème en la faisant bien pénétrer dans les vides. Pose le second disque, taillé 1 à 2 cm plus petit que le cercle pour qu'il se loge à l'intérieur des fraises, presse légèrement, imbibe-le et termine par une fine couche de crème lissée à la spatule."
        },
        {
          "titre": "La prise au frais",
          "texte": "Place le fraisier au réfrigérateur au moins 4 heures : la crème au beurre doit se raffermir pour que le gâteau se tienne au décerclage.",
          "minuteurs": [
            {
              "secondes": 14400,
              "label": "Prise du fraisier"
            }
          ]
        },
        {
          "titre": "La finition",
          "texte": "Étale la pâte d'amande sur 2 mm d'épaisseur sur le plan de travail poudré de sucre glace, puis découpe un disque à l'aide du cercle et pose-le sur le gâteau. Soulève délicatement le cercle, décolle le rhodoïd et décore avec quelques fraises. Garde au frais jusqu'au service."
        }
      ],
      "astuces": [
        "Pour une crème mousseline lisse, le beurre et la crème pâtissière doivent être à peu près à la même température : si la crème a un aspect granuleux, elle est trop froide, chauffe brièvement les parois du bol en continuant de fouetter ; si elle est trop liquide, mets-la 10 minutes au frais puis fouette de nouveau.",
        "Lave toujours les fraises avant de retirer leur queue et sèche-les soigneusement : équeutées puis lavées, elles se gorgent d'eau et détrempent la crème.",
        "Prépare la génoise la veille et garde-la filmée : un peu rassise, elle se tranche plus proprement et absorbe mieux le sirop."
      ],
      "choix": {
        "titre": "Variantes et finitions",
        "mode": "single",
        "label": "Ta version",
        "options": [
          "Pâte d'amande rose",
          "Pâte d'amande verte",
          "Nappage aux fraises",
          "Simple voile de sucre glace",
          "Sirop à la vanille sans alcool",
          "Framboises (framboisier)",
          "Crème à la pistache",
          "Fraises des bois en décor"
        ]
      },
      "accords": [
        {
          "titre": "La tradition",
          "texte": "un disque de pâte d'amande et une belle fraise entière sur le dessus."
        },
        {
          "titre": "Le framboisier",
          "texte": "la même recette avec des framboises à la place des fraises."
        },
        {
          "titre": "La touche pistache",
          "texte": "un peu de pâte de pistache fouettée dans la crème mousseline."
        },
        {
          "titre": "À table",
          "texte": "servi bien frais, avec un vin effervescent demi-sec pour les adultes."
        }
      ],
      "conservation": "Garde-le au réfrigérateur, couvert ou sous cloche, et déguste-le de préférence dans les 24 heures, 48 heures au plus : les fraises rendent du jus avec le temps.",
      "allergenes": [
        "gluten",
        "oeufs",
        "lait",
        "fruitsacoque"
      ],
      "noteAllergenes": "Le kirsch est ajouté au sirop froid et n'est pas cuit : le gâteau contient donc de l'alcool. Pour une version sans alcool (enfants, femmes enceintes…), parfume simplement le sirop avec un peu de vanille. Les fruits à coque viennent de la pâte d'amande : sans elle, finis avec un nappage aux fraises.",
      "regime": {
        "sansViande": true,
        "sansPoisson": true
      },
      "origine": {
        "pays": "France",
        "drapeau": "🇫🇷",
        "resume": "Un gâteau de la pâtisserie française qui associe génoise, crème et fraises fraîches, dans sa forme actuelle depuis les années 1960.",
        "faits": [
          "On lui cite plusieurs ancêtres : un gâteau aux fraises fraîches d'Auguste Escoffier à la fin du XIXe siècle, puis un gâteau de Pierre Lacam au début du XXe siècle, à base de génoise et d'une touche de kirsch.",
          "Sa version moderne (génoise imbibée au kirsch, crème au beurre et fraises fraîches) est généralement attribuée à Gaston Lenôtre et datée de 1966 ; il l'appelait alors « Bagatelle », en référence aux jardins de Bagatelle, près de Paris."
        ],
        "sources": [
          {
            "titre": "Gault&Millau — Il était un gâteau, épisode 2 : le fraisier",
            "url": "https://fr.gaultmillau.com/news/il-etait-un-gateau-episode-2-%E2%80%93-le-fraisier"
          },
          {
            "titre": "Wikipédia (en) — Fraisier",
            "url": "https://en.wikipedia.org/wiki/Fraisier"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "macarons",
      "url": "macarons.html",
      "titre": "Macarons à la ganache chocolat",
      "titreCourt": "Macarons chocolat",
      "alias": [
        "macaron",
        "macarons au chocolat",
        "macarons parisiens"
      ],
      "emoji": "🍪",
      "categorie": "dessert",
      "badge": "Défi pâtissier",
      "accroche": "Coques lisses et croquantes à la meringue italienne, cœur fondant de ganache : le macaron des grandes maisons.",
      "intro": "Le macaron a la réputation d'être capricieux, mais avec une meringue italienne, une balance précise et un peu de patience, il devient tout à fait accessible à la maison. Une coque fine et croquante, un intérieur moelleux, une ganache au chocolat noir : la maturation au frais fait le reste.",
      "images": [],
      "cover": {
        "motif": "biscuit",
        "fond": "#3b1f2b",
        "encre": "#f6efe4",
        "accent": "#f29bb8"
      },
      "temps": {
        "preparation": 75,
        "cuisson": 45,
        "repos": 1470
      },
      "difficulte": "Avancé",
      "portions": {
        "base": 36,
        "unite": "macaron",
        "pluriel": "macarons",
        "min": 18,
        "max": 72,
        "pas": 18
      },
      "tags": [
        "dessert",
        "patisserie",
        "gastronomique",
        "francais",
        "sucre",
        "chocolat",
        "gourmand",
        "raffine",
        "gouter",
        "fete",
        "invite",
        "four"
      ],
      "ingredients": [
        {
          "groupe": "Pour la ganache chocolat",
          "items": [
            {
              "nom": "Chocolat noir pâtissier (60 à 70 % de cacao)",
              "qte": 200,
              "unite": "g"
            },
            {
              "nom": "Crème liquide entière",
              "qte": 200,
              "unite": "ml"
            },
            {
              "nom": "Beurre doux",
              "qte": 50,
              "unite": "g"
            }
          ]
        },
        {
          "groupe": "Pour la pâte des coques",
          "items": [
            {
              "nom": "Poudre d'amande blanche (amandes émondées)",
              "qte": 150,
              "unite": "g"
            },
            {
              "nom": "Sucre glace",
              "qte": 150,
              "unite": "g"
            },
            {
              "nom": "Blancs d'œufs (environ 2), pour la pâte",
              "qte": 55,
              "unite": "g"
            },
            {
              "nom": "Colorant alimentaire en poudre",
              "qte": 1,
              "unite": "pincée",
              "optionnel": true,
              "fixe": true
            }
          ]
        },
        {
          "groupe": "Pour la meringue italienne",
          "items": [
            {
              "nom": "Blancs d'œufs (environ 2), pour la meringue",
              "qte": 55,
              "unite": "g"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 150,
              "unite": "g"
            },
            {
              "nom": "Eau",
              "qte": 50,
              "unite": "ml"
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "La ganache",
          "texte": "Hache finement le chocolat et mets-le dans un bol. Porte la crème à ébullition, verse-la sur le chocolat, attends 1 minute, puis mélange du centre vers les bords jusqu'à obtenir une ganache lisse et brillante. Quand elle est redescendue vers 35 à 40 °C, ajoute le beurre en petits morceaux, filme au contact et laisse-la prendre au réfrigérateur environ 1 heure, jusqu'à une texture souple qui se poche.",
          "minuteurs": [
            {
              "secondes": 3600,
              "label": "Prise de la ganache"
            }
          ]
        },
        {
          "titre": "Le tant pour tant",
          "texte": "Mixe la poudre d'amande et le sucre glace par quelques brèves impulsions, sans chauffer (sinon l'amande rend son huile), puis tamise le mélange. Prépare deux ou trois plaques couvertes de papier cuisson ou de tapis en silicone, et une poche munie d'une douille unie de 8 à 10 mm."
        },
        {
          "titre": "La base aux amandes",
          "texte": "Ajoute au tant pour tant les 55 g de blancs non battus réservés pour la pâte, et le colorant si tu en mets. Mélange à la maryse jusqu'à obtenir une pâte épaisse et homogène."
        },
        {
          "titre": "Le sirop de sucre",
          "texte": "Dans une petite casserole, chauffe le sucre en poudre et l'eau, sans remuer, en contrôlant au thermomètre de cuisson. Quand le sirop atteint environ 110 °C, commence à fouetter les autres blancs à vitesse moyenne. Retire le sirop du feu entre 117 et 118 °C."
        },
        {
          "titre": "La meringue italienne",
          "texte": "Verse le sirop en mince filet le long de la paroi du bol, sur les blancs mousseux, en continuant de fouetter. Augmente la vitesse et fouette jusqu'à ce que la meringue soit ferme, lisse, brillante et redescendue à une température tiède (autour de 45 à 50 °C)."
        },
        {
          "titre": "Le macaronnage",
          "texte": "Incorpore la meringue à la base aux amandes en trois fois, à la maryse, en raclant le fond et en écrasant légèrement la pâte contre la paroi du bol. Arrête dès que la pâte est lisse, brillante et qu'elle retombe en un ruban épais qui s'efface lentement : pas assez travaillée, elle garde des pointes ; trop travaillée, elle s'étale."
        },
        {
          "titre": "Dresser et croûter",
          "texte": "Poche des disques d'environ 3,5 cm bien espacés, en tenant la poche verticale. Tapote fermement le dessous des plaques pour chasser les bulles, puis laisse croûter environ 30 minutes à température ambiante, jusqu'à ce que la surface ne colle plus au doigt. Pendant ce temps, préchauffe le four à 150 °C en chaleur tournante.",
          "minuteurs": [
            {
              "secondes": 1800,
              "label": "Croûtage des coques"
            }
          ]
        },
        {
          "titre": "La cuisson",
          "texte": "Enfourne une plaque à la fois pour 13 à 15 minutes : les coques forment une collerette (le « pied ») et se décollent facilement du papier une fois cuites. Chaque four est différent : surveille bien la première plaque. Laisse les coques refroidir complètement sur la plaque avant de les décoller.",
          "minuteurs": [
            {
              "secondes": 780,
              "label": "Premier contrôle"
            },
            {
              "secondes": 900,
              "label": "Cuisson d'une plaque"
            }
          ]
        },
        {
          "titre": "Garnir les coques",
          "texte": "Associe les coques deux par deux, par taille. Retourne-en la moitié, poche une belle noisette de ganache au centre, puis referme avec une seconde coque en appuyant et tournant légèrement, jusqu'à ce que la ganache arrive juste au bord."
        },
        {
          "titre": "La maturation",
          "texte": "Range les macarons dans une boîte hermétique au réfrigérateur au moins 12 heures, idéalement 24 heures : l'humidité de la ganache attendrit l'intérieur des coques. Sors-les 30 minutes avant de les déguster.",
          "minuteurs": [
            {
              "secondes": 43200,
              "label": "Maturation minimum"
            },
            {
              "secondes": 86400,
              "label": "Maturation idéale"
            }
          ]
        }
      ],
      "astuces": [
        "Pèse les blancs au gramme près plutôt que de compter les œufs : beaucoup de pâtissiers les séparent la veille et les gardent couverts au réfrigérateur, puis les utilisent à température ambiante.",
        "Choisis un colorant en poudre ou en gel plutôt que liquide : il colore sans modifier la consistance de la pâte.",
        "La meringue italienne a besoin d'un minimum de matière pour que le sirop se mesure bien au thermomètre et que le fouet travaille correctement : si tu veux peu de macarons, fais la recette entière et congèle les coques en trop."
      ],
      "choix": {
        "titre": "Parfums de garniture",
        "mode": "single",
        "label": "Ton parfum",
        "options": [
          "Ganache chocolat noir",
          "Ganache chocolat au lait",
          "Ganache framboise",
          "Caramel au beurre salé",
          "Pistache",
          "Café",
          "Citron",
          "Vanille"
        ]
      },
      "accords": [
        {
          "titre": "Le classique",
          "texte": "coques nature et ganache au chocolat noir."
        },
        {
          "titre": "Le fruité",
          "texte": "un petit cœur de confiture de framboise au centre de la ganache."
        },
        {
          "titre": "L'épicé",
          "texte": "une pincée de cannelle ou de piment d'Espelette infusée dans la crème chaude."
        },
        {
          "titre": "À la pause",
          "texte": "avec un café serré ou un thé noir."
        }
      ],
      "conservation": "Garnis, ils se gardent environ 3 jours au réfrigérateur dans une boîte hermétique. Les coques seules se congèlent bien, à plat dans une boîte, et se garnissent après décongélation.",
      "allergenes": [
        "fruitsacoque",
        "oeufs",
        "lait"
      ],
      "noteAllergenes": "Certains chocolats contiennent aussi de la lécithine de soja : vérifie l'étiquette. Selon le produit, la poudre d'amande peut contenir des traces d'autres fruits à coque.",
      "regime": {
        "sansViande": true,
        "sansPoisson": true
      },
      "origine": {
        "pays": "France (racines italiennes possibles)",
        "drapeau": "🇫🇷",
        "resume": "Un petit gâteau à base d'amande, de sucre et de blancs d'œufs, devenu à Paris le macaron double garni que l'on connaît.",
        "faits": [
          "Le macaron serait arrivé en France au XVIe siècle, peut-être avec les cuisiniers de Catherine de Médicis : c'est une piste souvent évoquée, mais elle n'est pas prouvée.",
          "Pendant la Révolution française, deux religieuses réfugiées à Nancy ont vécu de la vente de macarons ; on les a surnommées les « Sœurs Macarons ».",
          "Le macaron double garni, dit « macaron parisien » ou « Gerbet », est parfois attribué à Pierre Desfontaines, de la maison Ladurée, au début du XXe siècle, mais le pâtissier Claude Gerbet en revendique aussi l'invention : sa paternité reste disputée."
        ],
        "sources": [
          {
            "titre": "Encyclopædia Britannica — Macaron",
            "url": "https://britannica.com/topic/macaron"
          },
          {
            "titre": "Wikipédia (en) — Macaron",
            "url": "https://en.wikipedia.org/wiki/Macaron"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "ileflottante",
      "url": "ile-flottante.html",
      "titre": "Île flottante, œufs à la neige et crème anglaise",
      "titreCourt": "Île flottante",
      "alias": [
        "oeufs a la neige",
        "iles flottantes",
        "ile flottante"
      ],
      "emoji": "☁️",
      "categorie": "dessert",
      "badge": "Grand classique",
      "accroche": "Des blancs pochés légers comme un nuage sur une crème anglaise vanillée, sous des fils de caramel blond.",
      "intro": "Un dessert de bistrot tout en douceur : des blancs en neige pochés dans le lait vanillé, posés sur une crème anglaise bien froide. La même casserole de lait sert aux deux préparations, et un filet de caramel apporte la touche croquante qui fait tout.",
      "images": [],
      "cover": {
        "motif": "bol",
        "fond": "#22324a",
        "encre": "#f6efe4",
        "accent": "#e9a93b"
      },
      "temps": {
        "preparation": 25,
        "cuisson": 40,
        "repos": 135
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
        "dessert",
        "francais",
        "traditionnel",
        "gastronomique",
        "sucre",
        "leger",
        "froid",
        "gourmand",
        "raffine",
        "invite",
        "fete",
        "dimanche"
      ],
      "ingredients": [
        {
          "groupe": "Pour le lait vanillé",
          "items": [
            {
              "nom": "Lait entier",
              "qte": 750,
              "unite": "ml"
            },
            {
              "nom": "Gousse de vanille",
              "qte": 1,
              "unite": "gousse"
            }
          ]
        },
        {
          "groupe": "Pour les œufs à la neige",
          "items": [
            {
              "nom": "Blancs d'œufs",
              "qte": 6,
              "unite": "pièce"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 60,
              "unite": "g"
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
          "groupe": "Pour la crème anglaise",
          "items": [
            {
              "nom": "Jaunes d'œufs (ceux des mêmes œufs)",
              "qte": 6,
              "unite": "pièce"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 120,
              "unite": "g"
            }
          ]
        },
        {
          "groupe": "Pour le caramel et la finition",
          "items": [
            {
              "nom": "Sucre en poudre",
              "qte": 100,
              "unite": "g"
            },
            {
              "nom": "Eau",
              "qte": 30,
              "unite": "ml"
            },
            {
              "nom": "Amandes effilées",
              "qte": 30,
              "unite": "g",
              "optionnel": true
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Infuser la vanille",
          "texte": "Fends la gousse de vanille en deux, gratte les graines et mets graines et gousse dans le lait. Porte à frémissement dans une large casserole, puis couvre hors du feu et laisse infuser 15 minutes.",
          "minuteurs": [
            {
              "secondes": 900,
              "label": "Infusion de la vanille"
            }
          ]
        },
        {
          "titre": "Les blancs en neige",
          "texte": "Sépare les œufs, en gardant les jaunes pour la crème anglaise. Fouette les blancs avec la pincée de sel ; dès qu'ils sont mousseux, verse le sucre en pluie et continue jusqu'à obtenir une meringue ferme et brillante, qui forme un bec d'oiseau au bout du fouet."
        },
        {
          "titre": "Pocher les blancs",
          "texte": "Remets le lait sur feu doux, juste frémissant : il ne doit jamais bouillir. Forme de grosses quenelles de blanc avec deux cuillères à soupe et dépose-les dans le lait, trois ou quatre à la fois sans les serrer. Laisse-les pocher 1 à 2 minutes de chaque côté, jusqu'à ce qu'elles soient gonflées et fermes au toucher, puis égoutte-les sur une grille ou du papier absorbant.",
          "minuteurs": [
            {
              "secondes": 90,
              "label": "Pochage, première face"
            },
            {
              "secondes": 90,
              "label": "Pochage, seconde face"
            }
          ]
        },
        {
          "titre": "Blanchir les jaunes",
          "texte": "Dans un saladier, fouette les jaunes avec le sucre jusqu'à ce que le mélange pâlisse et devienne légèrement mousseux."
        },
        {
          "titre": "La crème anglaise",
          "texte": "Retire la gousse et passe le lait de pochage au tamis, puis verse-le chaud sur les jaunes en fouettant. Reverse le tout dans la casserole et fais cuire à feu doux en remuant sans arrêt à la spatule, en dessinant des 8, environ 8 à 10 minutes. La crème est prête « à la nappe », vers 82 à 84 °C : elle épaissit et nappe la spatule, et un trait tracé au doigt reste net. Elle ne doit surtout pas bouillir.",
          "minuteurs": [
            {
              "secondes": 480,
              "label": "Vérifier la nappe"
            },
            {
              "secondes": 600,
              "label": "Cuisson de la crème"
            }
          ]
        },
        {
          "titre": "Refroidir",
          "texte": "Verse immédiatement la crème dans un saladier froid pour stopper la cuisson et remue quelques instants. Filme-la au contact et place-la au réfrigérateur au moins 2 heures, avec les œufs à la neige couverts à part.",
          "minuteurs": [
            {
              "secondes": 7200,
              "label": "Refroidissement"
            }
          ]
        },
        {
          "titre": "Le caramel",
          "texte": "Juste avant de servir, fais dorer les amandes à sec dans une poêle, 3 à 4 minutes en remuant, si tu en mets. Dans une petite casserole, chauffe le sucre et l'eau à feu moyen sans remuer, en inclinant doucement la casserole, jusqu'à obtenir un caramel blond ambré. Retire-le du feu et plonge un instant le fond de la casserole dans l'eau froide pour stopper la cuisson.",
          "minuteurs": [
            {
              "secondes": 210,
              "label": "Amandes grillées"
            }
          ]
        },
        {
          "titre": "Le dressage",
          "texte": "Verse la crème anglaise bien froide dans des assiettes creuses ou des coupes et pose une ou deux îles par personne. Quand le caramel a un peu épaissi et qu'il file, fais-le couler en fins filaments à l'aide d'une fourchette, parsème d'amandes grillées et sers aussitôt. Attention, le caramel est brûlant : ne le touche jamais du doigt."
        }
      ],
      "astuces": [
        "Si ta crème anglaise commence à grainer parce qu'elle a trop chauffé, verse-la aussitôt dans un récipient froid et donne quelques coups de mixeur plongeant : elle redevient souvent lisse.",
        "Poche les blancs dans un lait seulement frémissant : à gros bouillons, ils gonflent puis retombent et deviennent caoutchouteux.",
        "Pour une version express, tu peux cuire la meringue en petits ramequins au micro-ondes, quelques dizaines de secondes à pleine puissance selon la taille et l'appareil, jusqu'à ce qu'elle gonfle et soit prise."
      ],
      "choix": {
        "titre": "Finitions",
        "mode": "single",
        "label": "Ta finition",
        "options": [
          "Caramel en filaments",
          "Amandes effilées grillées",
          "Pralines roses concassées",
          "Éclats de pistache",
          "Coulis de framboise",
          "Zeste de citron vert",
          "Fève tonka",
          "Caramel au beurre salé"
        ]
      },
      "accords": [
        {
          "titre": "La classique",
          "texte": "caramel blond en filaments et amandes grillées."
        },
        {
          "titre": "La lyonnaise",
          "texte": "des éclats de pralines roses sur les îles."
        },
        {
          "titre": "La fruitée",
          "texte": "quelques framboises fraîches dans la crème anglaise."
        },
        {
          "titre": "La parfumée",
          "texte": "un peu de fève tonka râpée dans le lait à la place de la vanille."
        }
      ],
      "conservation": "La crème anglaise se garde jusqu'à 24 heures au réfrigérateur, filmée au contact. Les œufs à la neige sont meilleurs le jour même : garde-les couverts au frais jusqu'au service et ajoute le caramel au dernier moment.",
      "allergenes": [
        "oeufs",
        "lait",
        "fruitsacoque"
      ],
      "noteAllergenes": "Les fruits à coque ne concernent que les amandes, qui sont facultatives.",
      "regime": {
        "sansViande": true,
        "sansPoisson": true
      },
      "origine": {
        "pays": "France",
        "drapeau": "🇫🇷",
        "resume": "Un dessert de la cuisine française fait de meringue posée sur une crème anglaise, dont l'histoire exacte reste floue.",
        "faits": [
          "En français, on distingue l'île flottante, une meringue cuite au bain-marie dans un moule qui forme une seule masse, des œufs à la neige, des blancs pochés en quenelles ; en anglais, « floating island » désigne généralement les deux.",
          "En Angleterre, la « Flooting Island » publiée par Hannah Glasse en 1747 était un tout autre dessert : une crème épaisse sucrée, parfumée au vin (le « sack ») et au zeste de citron, fouettée en mousse et dressée sur de fines tranches de pain et de la gelée.",
          "Les spécialistes ne s'accordent pas sur les premières versions françaises : pour certains, elles ressemblaient déjà au dessert actuel ; pour d'autres, il s'agissait de biscuit ou de brioche imbibés d'alcool, servis avec une crème ou une purée de fruits, sans meringue."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Floating island (dessert)",
            "url": "https://en.wikipedia.org/wiki/Floating_island_(dessert)"
          },
          {
            "titre": "Office québécois de la langue française — Œufs à la neige",
            "url": "https://vitrinelinguistique.oqlf.gouv.qc.ca/fiche-gdt/fiche/26544656/oeufs-a-la-neige"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "poiresbellehelene",
      "url": "poires-belle-helene.html",
      "titre": "Poires Belle-Hélène, sauce chocolat chaude",
      "titreCourt": "Poires Belle-Hélène",
      "alias": [
        "poire belle helene",
        "belle helene",
        "poires au chocolat"
      ],
      "emoji": "🍐",
      "categorie": "dessert",
      "badge": "Classique de brasserie",
      "accroche": "Poires pochées à la vanille, glace bien froide et sauce chocolat chaude versée à table : un classique intemporel.",
      "intro": "Un dessert de brasserie devenu grand classique : des poires fondantes pochées dans un sirop vanillé, une boule de glace et une sauce au chocolat noir versée bien chaude au dernier moment. Tout se prépare à l'avance, il ne reste qu'à dresser au moment du dessert.",
      "images": [],
      "cover": {
        "motif": "coupe",
        "fond": "#2a1a14",
        "encre": "#f6efe4",
        "accent": "#c9d36a"
      },
      "temps": {
        "preparation": 20,
        "cuisson": 35,
        "repos": 120
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
        "francais",
        "traditionnel",
        "gastronomique",
        "chocolat",
        "sucre",
        "gourmand",
        "froid",
        "hiver",
        "invite",
        "fete",
        "dimanche",
        "raffine",
        "simple"
      ],
      "ingredients": [
        {
          "groupe": "Pour les poires pochées",
          "items": [
            {
              "nom": "Poires Williams ou Conférence, mûres mais fermes",
              "qte": 6,
              "unite": "pièce"
            },
            {
              "nom": "Eau",
              "qte": 1000,
              "unite": "ml"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 200,
              "unite": "g"
            },
            {
              "nom": "Gousse de vanille",
              "qte": 1,
              "unite": "gousse"
            },
            {
              "nom": "Citron",
              "qte": 1,
              "unite": "pièce"
            }
          ]
        },
        {
          "groupe": "Pour la sauce chocolat",
          "items": [
            {
              "nom": "Chocolat noir pâtissier (60 à 70 % de cacao)",
              "qte": 150,
              "unite": "g"
            },
            {
              "nom": "Crème liquide entière",
              "qte": 150,
              "unite": "ml"
            }
          ]
        },
        {
          "groupe": "Pour le service",
          "items": [
            {
              "nom": "Glace à la vanille",
              "qte": 500,
              "unite": "ml"
            },
            {
              "nom": "Amandes effilées",
              "qte": 40,
              "unite": "g",
              "optionnel": true
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Le sirop vanillé",
          "texte": "Dans une casserole assez large pour contenir les poires debout, verse l'eau et le sucre. Ajoute la gousse de vanille fendue et grattée et le jus de la moitié du citron, puis porte à ébullition en remuant jusqu'à ce que le sucre soit dissous."
        },
        {
          "titre": "Préparer les poires",
          "texte": "Épluche les poires en gardant la queue, puis retire le cœur par le dessous à l'aide d'une cuillère parisienne ou d'un vide-pomme. Frotte-les aussitôt avec la seconde moitié du citron pour qu'elles ne noircissent pas, et coupe une fine tranche à la base pour qu'elles tiennent debout."
        },
        {
          "titre": "Le pochage",
          "texte": "Plonge les poires dans le sirop, baisse le feu pour garder un léger frémissement et couvre la surface d'un disque de papier cuisson pour qu'elles restent immergées. Compte 10 à 25 minutes selon leur taille et leur maturité : la pointe d'un couteau doit entrer sans résistance jusqu'au cœur.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Premier test au couteau"
            },
            {
              "secondes": 1500,
              "label": "Pochage maximum"
            }
          ]
        },
        {
          "titre": "Refroidir dans le sirop",
          "texte": "Retire la casserole du feu et laisse les poires refroidir dans leur sirop : elles s'en imprègnent et restent moelleuses. Place-les ensuite au réfrigérateur au moins 2 heures, toujours dans le sirop.",
          "minuteurs": [
            {
              "secondes": 7200,
              "label": "Refroidissement des poires"
            }
          ]
        },
        {
          "titre": "Griller les amandes",
          "texte": "Si tu en mets, fais dorer les amandes effilées à sec dans une poêle à feu moyen, 3 à 4 minutes, en remuant souvent. Verse-les aussitôt dans une assiette : elles continueraient de brunir dans la poêle chaude.",
          "minuteurs": [
            {
              "secondes": 210,
              "label": "Amandes grillées"
            }
          ]
        },
        {
          "titre": "La sauce chocolat",
          "texte": "Hache le chocolat et mets-le dans un bol. Porte la crème à ébullition, verse-la sur le chocolat, attends 1 minute, puis mélange du centre vers les bords jusqu'à obtenir une sauce lisse et brillante. Si elle te semble trop épaisse, détends-la avec une ou deux cuillerées du sirop de pochage, et garde-la au chaud sans la faire bouillir."
        },
        {
          "titre": "Le dressage",
          "texte": "Égoutte les poires. Dans des coupes ou des assiettes creuses, dépose une boule de glace à la vanille et une poire debout à côté. Nappe de sauce chocolat chaude au dernier moment, parsème d'amandes grillées et sers aussitôt."
        }
      ],
      "astuces": [
        "Choisis des poires mûres mais encore fermes : trop mûres, elles se défont au pochage ; trop dures, elles restent fades et farineuses.",
        "Le disque de papier cuisson posé à la surface du sirop maintient les poires immergées : elles cuisent et se colorent de façon régulière, sans parties sèches.",
        "Garde le sirop de pochage : filtré et conservé au frais, il sert à détendre la sauce chocolat ou à parfumer une salade de fruits."
      ],
      "choix": {
        "titre": "Garnitures",
        "mode": "single",
        "label": "Ta garniture",
        "options": [
          "Amandes effilées grillées",
          "Violettes cristallisées",
          "Crème chantilly",
          "Éclats de noisettes",
          "Sorbet poire",
          "Pointe de cannelle",
          "Zeste d'orange"
        ]
      },
      "accords": [
        {
          "titre": "À l'ancienne",
          "texte": "quelques violettes cristallisées, comme on la décorait autrefois."
        },
        {
          "titre": "La croquante",
          "texte": "des amandes effilées grillées sur la sauce chocolat."
        },
        {
          "titre": "La gourmande",
          "texte": "une rosace de crème chantilly à côté de la glace."
        },
        {
          "titre": "L'épicée",
          "texte": "un bâton de cannelle ou une étoile de badiane dans le sirop de pochage."
        }
      ],
      "conservation": "Les poires pochées se gardent 2 à 3 jours au réfrigérateur dans leur sirop, dans une boîte fermée. La sauce chocolat se garde 2 jours au frais et se réchauffe doucement au bain-marie : dresse toujours au dernier moment.",
      "allergenes": [
        "lait",
        "fruitsacoque"
      ],
      "noteAllergenes": "Les fruits à coque ne concernent que les amandes, facultatives. Selon le produit, la glace à la vanille contient souvent des œufs, et certains chocolats de la lécithine de soja : vérifie les étiquettes.",
      "regime": {
        "sansViande": true,
        "sansPoisson": true
      },
      "origine": {
        "pays": "France",
        "drapeau": "🇫🇷",
        "resume": "Un dessert de la cuisine française associant poire pochée, glace à la vanille et sauce chocolat, traditionnellement attribué à Auguste Escoffier.",
        "faits": [
          "Selon la version la plus répandue, Auguste Escoffier l'aurait créé vers 1864 et nommé d'après « La Belle Hélène », l'opéra-bouffe de Jacques Offenbach créé à Paris en décembre 1864 ; une autre source avance plutôt 1870, et les circonstances exactes de sa création restent mal documentées.",
          "À l'origine, on le décorait de violettes cristallisées ; aujourd'hui, les amandes effilées les remplacent le plus souvent."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Poire belle Hélène",
            "url": "https://en.wikipedia.org/wiki/Poire_belle_H%C3%A9l%C3%A8ne"
          },
          {
            "titre": "Gault&Millau — La poire belle Hélène, son histoire",
            "url": "https://fr.gaultmillau.com/fr/news/La-poire-belle-helene-son-histoire-et-nos-meilleures-adresses"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "babaaurhum",
      "url": "baba-au-rhum.html",
      "titre": "Babas au rhum et chantilly vanillée",
      "titreCourt": "Baba au rhum",
      "alias": [
        "baba au rhum",
        "babas au rhum",
        "baba",
        "savarin"
      ],
      "emoji": "🧁",
      "categorie": "dessert",
      "badge": "Pâtisserie fine",
      "accroche": "Une pâte levée légère, gorgée d'un sirop vanillé au rhum et coiffée de chantilly : le classique des brasseries.",
      "intro": "Le baba est une pâte levée toute simple qui devient un dessert de fête une fois plongée dans un sirop parfumé aux agrumes, à la vanille et au rhum. Bien imbibé, il fond sous la cuillère, et une chantilly maison vient adoucir le tout.",
      "images": [],
      "cover": {
        "motif": "coupe",
        "fond": "#3d1f0b",
        "encre": "#f6efe4",
        "accent": "#e8a03a"
      },
      "temps": {
        "preparation": 40,
        "cuisson": 25,
        "repos": 145
      },
      "difficulte": "Intermédiaire",
      "portions": {
        "base": 8,
        "unite": "baba",
        "pluriel": "babas",
        "min": 8,
        "max": 24,
        "pas": 8
      },
      "tags": [
        "dessert",
        "francais",
        "traditionnel",
        "sucre",
        "gourmand",
        "patisserie",
        "gastronomique",
        "raffine",
        "fete",
        "invite",
        "dimanche",
        "four"
      ],
      "ingredients": [
        {
          "groupe": "Pour la pâte à baba",
          "items": [
            {
              "nom": "Farine de blé (T45)",
              "qte": 250,
              "unite": "g"
            },
            {
              "nom": "Levure de boulanger fraîche",
              "qte": 12,
              "unite": "g"
            },
            {
              "nom": "Lait entier tiède",
              "qte": 30,
              "unite": "ml"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 15,
              "unite": "g"
            },
            {
              "nom": "Sel fin",
              "qte": 5,
              "unite": "g"
            },
            {
              "nom": "Œufs",
              "qte": 3,
              "unite": "pièce"
            },
            {
              "nom": "Beurre doux mou",
              "qte": 75,
              "unite": "g"
            }
          ]
        },
        {
          "groupe": "Pour les moules",
          "items": [
            {
              "nom": "Beurre doux",
              "qte": 15,
              "unite": "g"
            }
          ]
        },
        {
          "groupe": "Pour le sirop",
          "items": [
            {
              "nom": "Eau",
              "qte": 600,
              "unite": "ml"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 300,
              "unite": "g"
            },
            {
              "nom": "Orange non traitée (le zeste)",
              "qte": 1,
              "unite": "pièce"
            },
            {
              "nom": "Citron non traité (le zeste)",
              "qte": 1,
              "unite": "pièce"
            },
            {
              "nom": "Gousse de vanille",
              "qte": 1,
              "unite": "gousse"
            },
            {
              "nom": "Rhum ambré",
              "qte": 80,
              "unite": "ml"
            }
          ]
        },
        {
          "groupe": "Pour la finition",
          "items": [
            {
              "nom": "Confiture ou nappage d'abricot",
              "qte": 3,
              "unite": "c. à soupe",
              "optionnel": true
            },
            {
              "nom": "Crème liquide entière très froide (30 % MG minimum)",
              "qte": 250,
              "unite": "ml"
            },
            {
              "nom": "Sucre glace",
              "qte": 25,
              "unite": "g"
            },
            {
              "nom": "Rhum ambré pour arroser",
              "qte": 4,
              "unite": "c. à soupe",
              "optionnel": true
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Délayer la levure",
          "texte": "Émiette la levure dans le lait tiède, autour de 30 °C et surtout pas chaud, et remue jusqu'à ce qu'elle soit dissoute. Bats les œufs à la fourchette dans un bol."
        },
        {
          "titre": "Pétrir la pâte",
          "texte": "Dans la cuve d'un robot muni du crochet, verse la farine, le sucre et le sel. Ajoute la levure délayée dans le lait et les œufs battus, puis pétris à vitesse moyenne environ 10 minutes, jusqu'à ce que la pâte devienne élastique et se décolle des parois.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Pétrissage"
            }
          ]
        },
        {
          "titre": "Incorporer le beurre",
          "texte": "Ajoute le beurre mou en petits morceaux et continue de pétrir 3 à 5 minutes, jusqu'à ce qu'il soit entièrement absorbé. La pâte doit être lisse, brillante et encore un peu collante : c'est normal pour une pâte à baba.",
          "minuteurs": [
            {
              "secondes": 300,
              "label": "Incorporer le beurre"
            }
          ]
        },
        {
          "titre": "Première pousse",
          "texte": "Couvre la cuve d'un torchon et laisse pousser environ 45 minutes dans un endroit tiède, à l'abri des courants d'air. La pâte doit doubler de volume.",
          "minuteurs": [
            {
              "secondes": 2700,
              "label": "Première pousse"
            }
          ]
        },
        {
          "titre": "Garnir les moules",
          "texte": "Beurre soigneusement des moules à baba individuels (ou des moules à muffins). Rabats la pâte pour la dégazer, puis répartis-la dans les moules en les remplissant au tiers, à la poche à douille ou avec deux cuillères."
        },
        {
          "titre": "Deuxième pousse",
          "texte": "Laisse pousser à nouveau 30 à 40 minutes, jusqu'à ce que la pâte arrive presque au bord des moules. Pendant ce temps, préchauffe le four à 180 °C.",
          "minuteurs": [
            {
              "secondes": 2400,
              "label": "Deuxième pousse"
            }
          ]
        },
        {
          "titre": "Cuire et sécher",
          "texte": "Enfourne pour environ 20 minutes, jusqu'à ce que les babas soient bien dorés. Démoule-les aussitôt sur une grille et laisse-les sécher à l'air au moins 1 heure : un baba un peu rassis absorbe mieux le sirop.",
          "minuteurs": [
            {
              "secondes": 1200,
              "label": "Cuisson des babas"
            },
            {
              "secondes": 3600,
              "label": "Séchage"
            }
          ]
        },
        {
          "titre": "Le sirop",
          "texte": "Prélève les zestes de l'orange et du citron à l'économe et fends la gousse de vanille. Porte à ébullition l'eau, le sucre, les zestes et la vanille, puis retire du feu et laisse tiédir une vingtaine de minutes, jusqu'à environ 50 °C, avant d'ajouter le rhum.",
          "minuteurs": [
            {
              "secondes": 1200,
              "label": "Tiédir le sirop"
            }
          ]
        },
        {
          "titre": "L'imbibage",
          "texte": "Plonge les babas dans le sirop tiède et retourne-les régulièrement pendant quelques minutes, jusqu'à ce qu'ils soient gorgés et souples sous le doigt. Égoutte-les sur une grille posée au-dessus d'un plat, puis, si tu en as, badigeonne-les de confiture d'abricot tiédie pour les faire briller."
        },
        {
          "titre": "Chantilly et service",
          "texte": "Fouette la crème bien froide avec le sucre glace jusqu'à ce qu'elle forme des pointes fermes. Sers chaque baba avec une belle rosace de chantilly et, si tu le souhaites, un trait de rhum versé au dernier moment."
        }
      ],
      "astuces": [
        "Pour une imbibition à cœur, joue sur le contraste : baba froid et rassis, sirop tiède autour de 50 °C. Trop froid, le sirop pénètre mal ; bouillant, il peut faire s'effondrer le baba.",
        "Cuire les babas la veille et les laisser sécher à l'air sur une grille est une habitude de pâtissier : ils boivent encore mieux le sirop sans se défaire.",
        "Version sans alcool : remplace le rhum du sirop par la même quantité de jus d'orange et supprime le trait de rhum au service ; la vanille et les zestes suffisent à parfumer."
      ],
      "choix": {
        "titre": "Variantes & service",
        "mode": "single",
        "label": "Ta version",
        "options": [
          "Chantilly vanillée",
          "Rhum ambré",
          "Sans alcool",
          "Fruits frais",
          "Nappage abricot",
          "Façon savarin",
          "Zestes d'agrumes"
        ]
      },
      "accords": [
        {
          "titre": "Le classique",
          "texte": "baba bien imbibé, nappage abricot et chantilly vanillée."
        },
        {
          "titre": "Le fruité",
          "texte": "quelques fruits frais de saison, comme des fraises ou de l'ananas."
        },
        {
          "titre": "Façon savarin",
          "texte": "la même pâte cuite en couronne, avec la chantilly au centre."
        },
        {
          "titre": "Le sans alcool",
          "texte": "un sirop parfumé seulement à la vanille et aux agrumes."
        }
      ],
      "conservation": "Non imbibés, les babas se gardent jusqu'à 2 jours dans une boîte hermétique ; une fois imbibés, garde-les au réfrigérateur et déguste-les dans les 24 heures, en fouettant la chantilly au dernier moment.",
      "allergenes": [
        "gluten",
        "oeufs",
        "lait"
      ],
      "noteAllergenes": "Ces babas contiennent de l'alcool non cuit : le rhum est ajouté au sirop hors du feu, et éventuellement au service. Ils ne conviennent donc pas aux enfants, aux femmes enceintes ni aux personnes qui évitent l'alcool : pour eux, prépare la version sans alcool décrite dans les astuces.",
      "regime": {
        "sansViande": true,
        "sansPoisson": true
      },
      "origine": {
        "pays": "France (Lorraine et Paris)",
        "drapeau": "🇫🇷",
        "resume": "Une pâte levée imbibée d'alcool, que la tradition rattache à la cour de Stanislas Leszczynski en Lorraine, puis à la pâtisserie Stohrer à Paris ; le baba a aussi trouvé une seconde patrie à Naples.",
        "faits": [
          "Selon la légende la plus répandue, Stanislas Leszczynski, ancien roi de Pologne devenu duc de Lorraine, aurait trouvé un kouglof trop sec et l'aurait fait imbiber d'un vin doux (Malaga ou Tokay selon les versions). Ce récit n'est pas documenté de façon certaine.",
          "Le pâtissier Nicolas Stohrer suivit Marie Leszczynska à Versailles lors de son mariage avec Louis XV en 1725, puis ouvrit en 1730 sa boutique rue Montorgueil, à Paris : elle y est toujours installée et revendique la paternité du baba au rhum.",
          "Le passage du vin au rhum n'est pas daté avec certitude. Le savarin, cousin du baba cuit en couronne, est attribué aux frères Julien, pâtissiers à Paris, au milieu du XIXe siècle (1844 ou 1845 selon les sources)."
        ],
        "sources": [
          {
            "titre": "Paris Zigzag — La pâtisserie Stohrer, rue Montorgueil",
            "url": "https://www.pariszigzag.fr/insolite/lieux-insolites/patisserie-stohrer-montorgueil/"
          },
          {
            "titre": "Taste of France — Baba au Rhum: A Royal Favourite",
            "url": "https://tasteoffrancemag.com/trending/baba-au-rhum-a-royal-favourite/"
          },
          {
            "titre": "Destination Nancy — Le baba au Tokay",
            "url": "https://www.destination-nancy.com/en/decouvrir-nancy/gastronomie/nancy-passions-sucrees/baba-au-tokay/"
          },
          {
            "titre": "What's Cooking America — Baba au Rhum and Savarin history",
            "url": "https://whatscookingamerica.net/history/cakes/babacake.htm"
          },
          {
            "titre": "Visit Naples — The babà: a 1400 kilometers history",
            "url": "https://visitnaples.eu/en/neapolitanity/flavours-of-naples/baba-a-royal-dessert-"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "caneles",
      "url": "caneles-de-bordeaux.html",
      "titre": "Canelés de Bordeaux à la vanille et au rhum",
      "titreCourt": "Canelés de Bordeaux",
      "alias": [
        "canele",
        "cannele",
        "canneles",
        "canele bordelais"
      ],
      "emoji": "🍮",
      "categorie": "dessert",
      "badge": "Spécialité bordelaise",
      "accroche": "Une croûte caramélisée presque craquante, un cœur moelleux vanillé : le petit gâteau cannelé de Bordeaux.",
      "intro": "Le canelé joue sur un contraste irrésistible : une croûte acajou bien caramélisée et un cœur tendre, presque crémeux, parfumé à la vanille et au rhum. Sa pâte, simple comme une pâte à crêpes, demande surtout de la patience : un long repos au frais et une cuisson à four très chaud.",
      "images": [],
      "cover": {
        "motif": "biscuit",
        "fond": "#2e150a",
        "encre": "#f6efe4",
        "accent": "#c9772e"
      },
      "temps": {
        "preparation": 20,
        "cuisson": 65,
        "repos": 1560
      },
      "difficulte": "Intermédiaire",
      "portions": {
        "base": 16,
        "unite": "canelé",
        "pluriel": "canelés",
        "min": 8,
        "max": 32,
        "pas": 8
      },
      "tags": [
        "dessert",
        "francais",
        "traditionnel",
        "gouter",
        "sucre",
        "gourmand",
        "patisserie",
        "four",
        "raffine",
        "gastronomique",
        "brunch"
      ],
      "ingredients": [
        {
          "groupe": "Pour la pâte",
          "items": [
            {
              "nom": "Lait entier",
              "qte": 500,
              "unite": "ml"
            },
            {
              "nom": "Gousse de vanille",
              "qte": 1,
              "unite": "gousse"
            },
            {
              "nom": "Beurre doux",
              "qte": 50,
              "unite": "g"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 250,
              "unite": "g"
            },
            {
              "nom": "Farine de blé (T45)",
              "qte": 125,
              "unite": "g"
            },
            {
              "nom": "Œufs entiers",
              "qte": 2,
              "unite": "pièce"
            },
            {
              "nom": "Jaunes d'œufs",
              "qte": 2,
              "unite": "pièce"
            },
            {
              "nom": "Rhum ambré",
              "qte": 50,
              "unite": "ml"
            }
          ]
        },
        {
          "groupe": "Pour les moules",
          "items": [
            {
              "nom": "Beurre doux fondu",
              "qte": 30,
              "unite": "g"
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Infuser le lait",
          "texte": "Fends la gousse de vanille et gratte les graines. Mets le lait, la gousse, les graines et le beurre dans une casserole, porte juste à ébullition, puis retire du feu et laisse tiédir.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Tiédir le lait"
            }
          ]
        },
        {
          "titre": "Sucre et farine",
          "texte": "Dans un grand saladier, mélange le sucre et la farine tamisée. Ajoute les œufs entiers et les jaunes, puis mélange à la cuillère en bois ou à la spatule, sans fouetter : la pâte ne doit pas prendre d'air."
        },
        {
          "titre": "Détendre la pâte",
          "texte": "Verse le lait tiède petit à petit, avec la gousse, en mélangeant doucement jusqu'à obtenir une pâte fluide et lisse, comme une pâte à crêpes. Ajoute le rhum et mélange encore quelques secondes."
        },
        {
          "titre": "Le long repos",
          "texte": "Filme la pâte au contact et place-la au réfrigérateur 24 heures, en laissant la gousse infuser. Ce repos détend la pâte et laisse les arômes se développer.",
          "minuteurs": [
            {
              "secondes": 86400,
              "label": "Repos au frais"
            }
          ]
        },
        {
          "titre": "Remettre à température",
          "texte": "Sors la pâte du réfrigérateur 1 heure avant la cuisson, retire la gousse et remue doucement à la spatule pour la rendre homogène, sans fouetter. Préchauffe le four à 250 °C.",
          "minuteurs": [
            {
              "secondes": 3600,
              "label": "Pâte à température"
            }
          ]
        },
        {
          "titre": "Les moules",
          "texte": "Badigeonne généreusement l'intérieur des moules à canelés de beurre fondu au pinceau, jusque dans les cannelures, puis retourne-les sur une grille pour égoutter l'excédent. Remplis-les de pâte jusqu'à environ 1 cm du bord et pose-les sur une plaque."
        },
        {
          "titre": "Cuisson en deux temps",
          "texte": "Enfourne 10 minutes à 250 °C pour saisir la croûte, puis baisse à 180 °C et poursuis environ 50 minutes. Si des canelés gonflent et sortent de leur moule, sors la plaque une minute pour les laisser retomber, puis renfourne : ils sont prêts quand la croûte est brun acajou, très foncée mais pas noire.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Saisir à 250 °C"
            },
            {
              "secondes": 3000,
              "label": "Cuisson à 180 °C"
            }
          ]
        },
        {
          "titre": "Démouler à chaud",
          "texte": "Démoule les canelés dès la sortie du four en tapotant les moules sur une grille. Laisse-les refroidir au moins 1 heure : la croûte durcit et devient croustillante en refroidissant.",
          "minuteurs": [
            {
              "secondes": 3600,
              "label": "Refroidissement"
            }
          ]
        }
      ],
      "astuces": [
        "Les moules en cuivre ou en métal donnent la croûte la plus épaisse et la plus caramélisée, car ils conduisent mieux la chaleur ; en silicone, les canelés se démoulent plus facilement mais colorent moins.",
        "Certains pâtissiers graissent leurs moules en cuivre avec un mélange de beurre et de cire d'abeille alimentaire, qui renforce le croustillant de la croûte.",
        "Mélange la pâte sans jamais la fouetter, avant comme après le repos : trop d'air la fait gonfler et déborder des moules à la cuisson."
      ],
      "choix": {
        "titre": "Parfums & service",
        "mode": "single",
        "label": "Ta version",
        "options": [
          "Vanille & rhum",
          "Vanille seule",
          "Zeste d'orange",
          "Mini-canelés",
          "Avec un café",
          "Au goûter",
          "Au brunch"
        ]
      },
      "accords": [
        {
          "titre": "Le bordelais",
          "texte": "nature, à température ambiante, avec un café serré."
        },
        {
          "titre": "Au goûter",
          "texte": "avec un verre de lait froid ou un chocolat chaud."
        },
        {
          "titre": "En dessert",
          "texte": "à côté d'une boule de glace vanille et de quelques fruits rouges."
        },
        {
          "titre": "En mignardise",
          "texte": "en mini-canelés, servis à la fin d'un repas de fête."
        }
      ],
      "conservation": "Ils sont meilleurs le jour même ; ensuite, garde-les 1 à 2 jours à température ambiante dans une boîte non hermétique et repasse-les quelques minutes au four chaud pour raviver la croûte.",
      "allergenes": [
        "gluten",
        "oeufs",
        "lait"
      ],
      "noteAllergenes": "La pâte contient du rhum, qui cuit avec elle ; une partie de l'alcool peut toutefois subsister. Pour une version sans alcool, adaptée aux enfants et aux femmes enceintes, supprime-le simplement : la vanille suffit à parfumer les canelés.",
      "regime": {
        "sansViande": true,
        "sansPoisson": true
      },
      "origine": {
        "pays": "France (Bordeaux)",
        "drapeau": "🇫🇷",
        "resume": "Petit gâteau emblématique de Bordeaux, cuit dans un moule cannelé, dont l'histoire ancienne mêle faits attestés et récits difficiles à vérifier.",
        "faits": [
          "Selon le récit le plus répandu, il serait né au couvent des Annonciades de Bordeaux, où les religieuses auraient utilisé les jaunes d'œufs laissés par les viticulteurs, qui se servaient des blancs pour clarifier (coller) le vin. Aucune preuve ne permet de confirmer cette histoire.",
          "Dès le XVIIe siècle, on vendait à Bordeaux de petits gâteaux à la farine et au jaune d'œuf appelés canaules ou canaulets, préparés par des artisans nommés « canauliers » ; les dates avancées pour leur corporation varient selon les sources.",
          "En 1985, des pâtissiers bordelais ont fondé la Confrérie du Canelé de Bordeaux pour défendre la recette traditionnelle et ont retiré l'un des deux « n » du nom ; on écrit encore souvent « cannelé » ailleurs."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Canelé",
            "url": "https://en.wikipedia.org/wiki/Canel%C3%A9"
          },
          {
            "titre": "Baillardran — L'histoire du canelé",
            "url": "https://www.baillardran.com/gb/content/7-l-histoire-du-canele"
          },
          {
            "titre": "Afar — Cannelés, Bordeaux's most popular local treat",
            "url": "https://www.afar.com/magazine/canneles-the-gilded-pastry-of-bordeaux"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "pavlova",
      "url": "pavlova.html",
      "titre": "Pavlova aux fruits rouges et chantilly",
      "titreCourt": "Pavlova",
      "alias": [
        "pavlova aux fruits rouges",
        "pavlova fruits rouges",
        "meringue aux fruits rouges"
      ],
      "emoji": "🍓",
      "categorie": "dessert",
      "badge": "Meringue croquante",
      "accroche": "Une meringue croquante au cœur moelleux, une chantilly légère et des fruits rouges : un dessert de fête aérien.",
      "intro": "La pavlova, c'est une grande meringue à la coque croquante et au cœur tendre comme une guimauve, garnie au dernier moment de chantilly et de fruits frais. Les fruits rouges lui apportent une belle acidité qui équilibre la douceur du sucre.",
      "images": [],
      "cover": {
        "motif": "assiette",
        "fond": "#4a0f22",
        "encre": "#f6efe4",
        "accent": "#ff4d6d"
      },
      "temps": {
        "preparation": 30,
        "cuisson": 75,
        "repos": 120
      },
      "difficulte": "Intermédiaire",
      "portions": {
        "base": 8,
        "unite": "part",
        "pluriel": "parts",
        "min": 4,
        "max": 16,
        "pas": 4
      },
      "tags": [
        "dessert",
        "sucre",
        "frais",
        "ete",
        "leger",
        "fete",
        "invite",
        "raffine",
        "gastronomique",
        "patisserie",
        "four",
        "convivial"
      ],
      "ingredients": [
        {
          "groupe": "Pour la meringue",
          "items": [
            {
              "nom": "Blancs d'œufs à température ambiante",
              "qte": 4,
              "unite": "pièce"
            },
            {
              "nom": "Sucre en poudre fin",
              "qte": 220,
              "unite": "g"
            },
            {
              "nom": "Maïzena (fécule de maïs)",
              "qte": 1,
              "unite": "c. à café"
            },
            {
              "nom": "Vinaigre blanc (d'alcool)",
              "qte": 1,
              "unite": "c. à café"
            },
            {
              "nom": "Extrait de vanille",
              "qte": 1,
              "unite": "c. à café"
            }
          ]
        },
        {
          "groupe": "Pour la chantilly",
          "items": [
            {
              "nom": "Crème liquide entière très froide (30 % MG minimum)",
              "qte": 300,
              "unite": "ml"
            },
            {
              "nom": "Sucre glace",
              "qte": 30,
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
          "groupe": "Pour la garniture",
          "items": [
            {
              "nom": "Fraises",
              "qte": 250,
              "unite": "g"
            },
            {
              "nom": "Framboises",
              "qte": 125,
              "unite": "g"
            },
            {
              "nom": "Myrtilles",
              "qte": 125,
              "unite": "g"
            },
            {
              "nom": "Groseilles",
              "qte": 50,
              "unite": "g",
              "optionnel": true
            },
            {
              "nom": "Feuilles de menthe",
              "qte": 6,
              "unite": "feuille",
              "optionnel": true
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Four et gabarit",
          "texte": "Préchauffe le four à 120 °C, en chaleur statique. Trace un cercle d'environ 20 cm (pour 8 parts) sur une feuille de papier cuisson et retourne-la sur la plaque : le trait te servira de guide."
        },
        {
          "titre": "Monter les blancs",
          "texte": "Dans un saladier parfaitement propre et sec, fouette les blancs à vitesse moyenne jusqu'à ce qu'ils forment des pics souples. La moindre trace de jaune ou de gras les empêcherait de monter."
        },
        {
          "titre": "Serrer au sucre",
          "texte": "Augmente la vitesse et ajoute le sucre cuillerée par cuillerée, en laissant chaque ajout se dissoudre. Continue 8 à 10 minutes, jusqu'à obtenir une meringue très ferme et brillante qui ne crisse plus entre tes doigts.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Meringue"
            }
          ]
        },
        {
          "titre": "Maïzena et vinaigre",
          "texte": "Saupoudre la maïzena, ajoute le vinaigre et l'extrait de vanille. Incorpore-les délicatement à la maryse, en quelques mouvements seulement, pour ne pas faire retomber la meringue."
        },
        {
          "titre": "Façonner le nid",
          "texte": "Dépose la meringue dans le cercle et étale-la en gardant les bords un peu plus hauts que le centre, pour former un nid. Dessine des stries sur les côtés en remontant avec le dos d'une cuillère."
        },
        {
          "titre": "La cuisson",
          "texte": "Enfourne pour environ 1 h 15, sans ouvrir la porte. La pavlova est cuite quand sa coque est sèche au toucher, à peine teintée de crème, et qu'elle se décolle du papier.",
          "minuteurs": [
            {
              "secondes": 4500,
              "label": "Cuisson de la meringue"
            }
          ]
        },
        {
          "titre": "Refroidir au four",
          "texte": "Éteins le four, entrouvre la porte et laisse la meringue refroidir complètement à l'intérieur, au moins 2 heures. Ce refroidissement lent limite les grosses fissures.",
          "minuteurs": [
            {
              "secondes": 7200,
              "label": "Refroidissement au four"
            }
          ]
        },
        {
          "titre": "La chantilly",
          "texte": "Fouette la crème bien froide avec le sucre glace, et la vanille si tu en mets, jusqu'à ce qu'elle se tienne en pointes souples mais nettes. Garde-la au frais jusqu'au montage."
        },
        {
          "titre": "Le montage",
          "texte": "Juste avant de servir, pose la meringue sur le plat, garnis le creux de chantilly et dispose les fruits en dôme : fraises coupées en deux, framboises, myrtilles et, si tu en as, groseilles. Termine par quelques feuilles de menthe et sers aussitôt."
        }
      ],
      "astuces": [
        "Ajoute le sucre très progressivement : s'il reste des grains non dissous, la meringue « pleure » des gouttes de sirop pendant la cuisson.",
        "La maïzena et le vinaigre ne sont pas là par hasard : ils donnent à la pavlova son cœur moelleux, presque guimauve, sous la coque croquante.",
        "Monte la pavlova au dernier moment, car la meringue ramollit vite au contact de la crème et des fruits. Les fissures sont normales et font partie de son charme."
      ],
      "choix": {
        "titre": "Fruits & finitions",
        "mode": "multi",
        "label": "Ta composition",
        "options": [
          "Fraises",
          "Framboises",
          "Myrtilles",
          "Groseilles",
          "Fruit de la passion",
          "Coulis de framboise",
          "Feuilles de menthe",
          "Zeste de citron vert"
        ]
      },
      "accords": [
        {
          "titre": "La classique",
          "texte": "fraises, framboises et myrtilles sur une chantilly vanillée."
        },
        {
          "titre": "L'acidulée",
          "texte": "groseilles et un filet de coulis de framboise."
        },
        {
          "titre": "Façon antipodes",
          "texte": "kiwi et fruit de la passion à la place des fruits rouges."
        },
        {
          "titre": "La fraîche",
          "texte": "quelques feuilles de menthe et un zeste de citron vert."
        }
      ],
      "conservation": "La meringue nue se garde 2 jours dans une boîte hermétique, à l'abri de l'humidité ; une fois garnie, sers-la aussitôt et garde les restes au réfrigérateur pour les finir dans les 24 heures.",
      "allergenes": [
        "oeufs",
        "lait"
      ],
      "regime": {
        "sansViande": true,
        "sansPoisson": true
      },
      "origine": {
        "pays": "Nouvelle-Zélande ou Australie (origine disputée)",
        "drapeau": "🌏",
        "resume": "Un dessert de meringue baptisé en l'honneur de la ballerine russe Anna Pavlova, que la Nouvelle-Zélande et l'Australie se disputent depuis des décennies.",
        "faits": [
          "Le seul point sur lequel les deux pays s'accordent : le dessert porte le nom de la danseuse étoile russe Anna Pavlova, qui a fait une tournée en Australie et en Nouvelle-Zélande en 1926.",
          "Côté australien, le chef Bert Sachse affirmait l'avoir créée à l'hôtel Esplanade de Perth en 1935 (1934 selon certaines sources) ; côté néo-zélandais, l'anthropologue culinaire Helen Leach, de l'université d'Otago, cite une recette parue en 1929 dans le New Zealand Dairy Exporter Annual.",
          "Le récit d'un chef d'hôtel de Wellington qui l'aurait inventée lors de la tournée de 1926, rapporté par le biographe de la danseuse, n'a pas pu être vérifié par Helen Leach : l'origine exacte reste débattue."
        ],
        "sources": [
          {
            "titre": "New Zealand Geographic — From Russia with Love",
            "url": "https://www.nzgeo.com/stories/from-russia-with-love/"
          },
          {
            "titre": "National Geographic — The story behind pavlova",
            "url": "https://www.nationalgeographic.com/travel/article/the-story-behind-pavlova-recipe-where-to-eat"
          },
          {
            "titre": "The Canberra Times — The great pavlova debate",
            "url": "https://www.canberratimes.com.au/story/3573840/the-great-pavlova-debate"
          },
          {
            "titre": "National Portrait Gallery (Australie) — The pavlova",
            "url": "https://portrait.gov.au/aboutface/2014/12/the-pavlova"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "cheesecake",
      "url": "cheesecake-new-yorkais.html",
      "titre": "Cheesecake new-yorkais crémeux",
      "titreCourt": "Cheesecake new-yorkais",
      "alias": [
        "cheesecake",
        "new york cheesecake",
        "cheese cake",
        "cheesecake new york"
      ],
      "emoji": "🍰",
      "categorie": "dessert",
      "badge": "Star new-yorkaise",
      "accroche": "Une base biscuitée au beurre, un appareil au fromage dense et crémeux, cuit tout doucement au bain-marie.",
      "intro": "Le cheesecake new-yorkais se reconnaît à sa texture dense, riche et pourtant fondante, posée sur une fine base de biscuits au beurre. Le secret tient en trois gestes : des ingrédients à température ambiante, une cuisson douce au bain-marie et une longue nuit au frais.",
      "images": [],
      "cover": {
        "motif": "gateau",
        "fond": "#3a2418",
        "encre": "#f6efe4",
        "accent": "#e0384f"
      },
      "temps": {
        "preparation": 30,
        "cuisson": 100,
        "repos": 540
      },
      "difficulte": "Intermédiaire",
      "portions": {
        "base": 12,
        "unite": "part",
        "pluriel": "parts",
        "min": 6,
        "max": 24,
        "pas": 6
      },
      "tags": [
        "dessert",
        "americain",
        "sucre",
        "gourmand",
        "patisserie",
        "four",
        "froid",
        "fete",
        "invite",
        "convivial",
        "gastronomique",
        "lourd"
      ],
      "ingredients": [
        {
          "groupe": "Pour la base biscuitée",
          "items": [
            {
              "nom": "Biscuits sablés type digestive ou graham",
              "qte": 200,
              "unite": "g"
            },
            {
              "nom": "Beurre doux fondu",
              "qte": 80,
              "unite": "g"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 1,
              "unite": "c. à soupe"
            }
          ]
        },
        {
          "groupe": "Pour l'appareil au fromage",
          "items": [
            {
              "nom": "Fromage à la crème nature type Philadelphia (entier)",
              "qte": 900,
              "unite": "g"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 250,
              "unite": "g"
            },
            {
              "nom": "Farine de blé",
              "qte": 2,
              "unite": "c. à soupe"
            },
            {
              "nom": "Sel fin",
              "qte": 1,
              "unite": "pincée",
              "fixe": true
            },
            {
              "nom": "Œufs",
              "qte": 4,
              "unite": "pièce"
            },
            {
              "nom": "Crème aigre (ou crème fraîche épaisse)",
              "qte": 150,
              "unite": "g"
            },
            {
              "nom": "Extrait de vanille",
              "qte": 2,
              "unite": "c. à café"
            },
            {
              "nom": "Citron jaune non traité (zeste et 1 c. à soupe de jus)",
              "qte": 1,
              "unite": "pièce",
              "optionnel": true
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Tout à température",
          "texte": "Sors le fromage, les œufs et la crème aigre du réfrigérateur 1 heure à l'avance : à température ambiante, ils se mélangent sans grumeaux et sans trop battre. Chemise le fond d'un moule à charnière d'environ 23 cm (pour 12 parts) de papier cuisson et préchauffe le four à 175 °C.",
          "minuteurs": [
            {
              "secondes": 3600,
              "label": "Ingrédients à température"
            }
          ]
        },
        {
          "titre": "La base biscuitée",
          "texte": "Mixe les biscuits en fine chapelure, puis mélange-la avec le beurre fondu et le sucre jusqu'à obtenir une texture de sable mouillé. Tasse-la bien au fond du moule avec le dos d'un verre et enfourne 10 minutes, puis laisse tiédir et baisse le four à 160 °C.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Cuisson de la base"
            }
          ]
        },
        {
          "titre": "Un moule étanche",
          "texte": "Enveloppe l'extérieur du moule de deux couches de papier aluminium bien remontées sur les bords, pour que l'eau du bain-marie ne s'infiltre pas. Fais chauffer une bouilloire d'eau."
        },
        {
          "titre": "Lisser le fromage",
          "texte": "Au batteur à vitesse lente, travaille le fromage avec le sucre, la farine et le sel, en raclant souvent les parois, jusqu'à ce qu'il ne reste plus aucun grumeau. Ne monte pas la vitesse : l'air ferait gonfler puis craquer le gâteau."
        },
        {
          "titre": "Œufs et crème",
          "texte": "Ajoute les œufs un à un, toujours à vitesse lente, en mélangeant juste assez entre chaque. Incorpore enfin la crème aigre, la vanille et, si tu en mets, le zeste râpé et la cuillerée de jus de citron : l'appareil doit être lisse et dense."
        },
        {
          "titre": "Le bain-marie",
          "texte": "Verse l'appareil sur la base et lisse la surface. Pose le moule dans un grand plat allant au four et verse de l'eau très chaude dans le plat jusqu'à environ 2,5 cm de hauteur."
        },
        {
          "titre": "La cuisson",
          "texte": "Enfourne pour 1 h 15 à 1 h 30 à 160 °C. Le cheesecake est prêt quand les bords sont pris et que le centre tremble encore légèrement, comme une gelée, quand tu bouges le plat.",
          "minuteurs": [
            {
              "secondes": 4500,
              "label": "Vérifier la cuisson"
            },
            {
              "secondes": 5400,
              "label": "Cuisson complète"
            }
          ]
        },
        {
          "titre": "Refroidir lentement",
          "texte": "Éteins le four, entrouvre la porte et laisse le cheesecake y refroidir 1 heure. Sors-le du bain-marie, passe une lame fine entre le gâteau et le cercle, puis laisse-le finir de refroidir 1 heure à température ambiante.",
          "minuteurs": [
            {
              "secondes": 3600,
              "label": "Dans le four éteint"
            },
            {
              "secondes": 3600,
              "label": "À température ambiante"
            }
          ]
        },
        {
          "titre": "La nuit au frais",
          "texte": "Filme le moule et place-le au réfrigérateur au moins 6 heures, idéalement une nuit : c'est là que la texture devient dense et crémeuse. Démoule et découpe avec un couteau trempé dans l'eau chaude et essuyé entre chaque part.",
          "minuteurs": [
            {
              "secondes": 21600,
              "label": "Repos au frais"
            }
          ]
        }
      ],
      "astuces": [
        "Tout se joue à vitesse lente : un appareil trop battu se charge d'air, gonfle au four puis retombe en se fissurant.",
        "Le bain-marie et le refroidissement dans le four éteint évitent les chocs de température, grands responsables des fissures en surface.",
        "Ne prolonge pas la cuisson parce que le centre tremble : il finit de prendre en refroidissant. Cuit jusqu'à être ferme au centre, le cheesecake devient sec et granuleux."
      ],
      "choix": {
        "titre": "Nappages",
        "mode": "single",
        "label": "Ton nappage",
        "options": [
          "Nature",
          "Coulis de fruits rouges",
          "Myrtilles",
          "Cerises",
          "Caramel beurre salé",
          "Fruit de la passion",
          "Zeste de citron"
        ]
      },
      "accords": [
        {
          "titre": "Le new-yorkais",
          "texte": "nature, une part dense et crémeuse, sans rien d'autre."
        },
        {
          "titre": "Le fruité",
          "texte": "un coulis de fruits rouges ou quelques cerises pochées."
        },
        {
          "titre": "Le gourmand",
          "texte": "un filet de caramel au beurre salé."
        },
        {
          "titre": "L'acidulé",
          "texte": "un peu de pulpe de fruit de la passion et un zeste de citron vert."
        }
      ],
      "conservation": "Bien filmé, il se garde jusqu'à 3 jours au réfrigérateur ; sors-le 20 à 30 minutes avant de servir pour qu'il retrouve toute sa texture crémeuse.",
      "allergenes": [
        "gluten",
        "oeufs",
        "lait"
      ],
      "noteAllergenes": "Certains biscuits contiennent du soja ou des traces de fruits à coque : vérifie l'étiquette.",
      "regime": {
        "sansViande": true,
        "sansPoisson": true
      },
      "origine": {
        "pays": "États-Unis (New York)",
        "drapeau": "🇺🇸",
        "resume": "Le gâteau au fromage existe sous bien des formes, mais le style new-yorkais, dense et riche, repose sur le cream cheese ; son inventeur exact n'est pas établi.",
        "faits": [
          "Selon l'historien de la cuisine Gil Marks, cité par Tori Avey, le cream cheese américain remonte à 1872, quand William A. Lawrence, laitier à Chester, dans l'État de New York, a cherché à imiter le neufchâtel d'un voisin ; les récits varient sur les détails.",
          "D'après la même source, c'est dans les années 1930 que le cheesecake américain est passé du fromage caillé au cream cheese, bien plus crémeux et plus riche ; son inventeur exact n'est pas établi.",
          "À Brooklyn, le restaurant Junior's, ouvert par Harry Rosen en 1950 à l'angle de Flatbush Avenue Extension et de DeKalb Avenue, a fait de son cheesecake une spécialité célèbre de New York."
        ],
        "sources": [
          {
            "titre": "Tori Avey — New York Cheesecake (histoire)",
            "url": "https://toriavey.com/new-york-cheesecake/"
          },
          {
            "titre": "Wikipédia (en) — Junior's",
            "url": "https://en.wikipedia.org/wiki/Junior%27s"
          },
          {
            "titre": "Junior's — Our story",
            "url": "https://juniorscheesecake.com/our-story"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "gaufres",
      "url": "gaufres.html",
      "titre": "Gaufres croustillantes maison",
      "titreCourt": "Gaufres croustillantes",
      "alias": [
        "gaufre",
        "gaufres maison",
        "pate a gaufres",
        "gaufres legeres"
      ],
      "emoji": "🧇",
      "categorie": "brunch",
      "badge": "Brunch gourmand",
      "accroche": "Dorées et croustillantes dehors, légères et tendres dedans, grâce aux blancs en neige et à l'eau gazeuse.",
      "intro": "Des gaufres comme au salon de thé : une pâte au beurre fondu allégée de blancs montés en neige, cuite dans un gaufrier bien chaud jusqu'à ce qu'elle soit croustillante. Compte une dizaine de gaufres, à dévorer tièdes avec du sucre glace ou la garniture de ton choix.",
      "images": [],
      "cover": {
        "motif": "biscuit",
        "fond": "#3e2614",
        "encre": "#f6efe4",
        "accent": "#f0b23c"
      },
      "temps": {
        "preparation": 20,
        "cuisson": 30,
        "repos": 30
      },
      "difficulte": "Facile",
      "portions": {
        "base": 4,
        "unite": "personne",
        "pluriel": "personnes",
        "min": 2,
        "max": 12
      },
      "tags": [
        "brunch",
        "matin",
        "gouter",
        "sucre",
        "gourmand",
        "familial",
        "convivial",
        "enfant",
        "dimanche",
        "chaud",
        "facile",
        "hiver"
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
              "qte": 0.5,
              "unite": "sachet"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 30,
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
              "nom": "Œufs",
              "qte": 3,
              "unite": "pièce"
            },
            {
              "nom": "Beurre doux",
              "qte": 100,
              "unite": "g"
            },
            {
              "nom": "Lait entier",
              "qte": 400,
              "unite": "ml"
            },
            {
              "nom": "Eau gazeuse bien froide",
              "qte": 100,
              "unite": "ml"
            }
          ]
        },
        {
          "groupe": "Pour la cuisson",
          "items": [
            {
              "nom": "Huile neutre pour le gaufrier",
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
              "nom": "Sucre glace",
              "qte": 2,
              "unite": "c. à soupe"
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Le beurre",
          "texte": "Fais fondre le beurre doucement, à la casserole ou au micro-ondes, puis laisse-le tiédir. Trop chaud, il commencerait à cuire les jaunes d'œufs."
        },
        {
          "titre": "Séparer les œufs",
          "texte": "Casse les œufs en séparant les blancs des jaunes. Réserve les blancs au réfrigérateur dans un saladier bien propre et sec : la moindre trace de jaune ou de gras les empêcherait de monter."
        },
        {
          "titre": "Les ingrédients secs",
          "texte": "Dans un grand saladier, mélange la farine, la levure chimique, le sucre, le sel et le sucre vanillé si tu en mets. Creuse un puits au centre."
        },
        {
          "titre": "La pâte lisse",
          "texte": "Verse les jaunes et le beurre fondu tiédi dans le puits, puis ajoute le lait en filet en fouettant du centre vers les bords. Arrête dès que la pâte est lisse et nappante, sans grumeaux : inutile de la travailler davantage."
        },
        {
          "titre": "Le repos",
          "texte": "Couvre le saladier et laisse reposer la pâte 30 minutes à température ambiante. Dix minutes avant la fin, mets le gaufrier à préchauffer : il doit être bien chaud.",
          "minuteurs": [
            {
              "secondes": 1800,
              "label": "Repos de la pâte"
            }
          ]
        },
        {
          "titre": "Les blancs en neige",
          "texte": "Juste avant la cuisson, incorpore l'eau gazeuse bien froide à la pâte. Monte les blancs en neige ferme : ils doivent former un bec d'oiseau au bout du fouet. Incorpore-les en trois fois à la maryse, en soulevant délicatement la pâte pour ne pas les casser."
        },
        {
          "titre": "La cuisson",
          "texte": "Huile très légèrement les plaques au pinceau : trop de matière grasse empêche la croûte de se former. Verse une louche de pâte pour couvrir les alvéoles, referme aussitôt et laisse cuire 4 à 5 minutes sans ouvrir tant que la vapeur s'échappe en abondance. La gaufre est prête quand la vapeur faiblit nettement et qu'elle est bien dorée ; le temps exact dépend de ton gaufrier.",
          "minuteurs": [
            {
              "secondes": 240,
              "label": "Gaufre dorée"
            },
            {
              "secondes": 300,
              "label": "Extra croustillante"
            }
          ]
        },
        {
          "titre": "Sur une grille",
          "texte": "Dépose chaque gaufre sur une grille, côte à côte, sans les empiler : la vapeur qu'elles dégagent les ramollirait. Pour les garder chaudes pendant que tu cuis le reste, glisse la grille dans le four préchauffé à 100 °C environ."
        },
        {
          "titre": "Le service",
          "texte": "Sers les gaufres tièdes, saupoudrées de sucre glace au dernier moment, ou avec la garniture de ton choix."
        }
      ],
      "astuces": [
        "N'ouvre pas le gaufrier tant que la vapeur s'échappe en abondance : la pâte n'est pas encore prise et la gaufre risque de se déchirer et de coller aux plaques.",
        "Remplacer une partie du lait par de l'eau, ici de l'eau gazeuse, donne une pâte plus légère et des gaufres plus croustillantes qu'avec du lait seul.",
        "Une gaufre qui a ramolli retrouve son croustillant en quelques minutes au grille-pain ou dans un four chaud, posée directement sur la grille."
      ],
      "choix": {
        "titre": "Garnitures au choix",
        "mode": "multi",
        "label": "Ta gaufre",
        "options": [
          "Sucre glace",
          "Chantilly",
          "Fraises fraîches",
          "Pâte à tartiner",
          "Sirop d'érable",
          "Caramel beurre salé",
          "Banane",
          "Boule de glace vanille"
        ]
      },
      "accords": [
        {
          "titre": "La classique",
          "texte": "simplement saupoudrée de sucre glace, encore tiède."
        },
        {
          "titre": "La fruitée",
          "texte": "fraises fraîches et une généreuse cuillerée de chantilly."
        },
        {
          "titre": "La gourmande",
          "texte": "pâte à tartiner et rondelles de banane."
        },
        {
          "titre": "La bretonne",
          "texte": "un filet de caramel au beurre salé et une boule de glace vanille."
        }
      ],
      "conservation": "La pâte aux blancs en neige se cuit tout de suite. Les gaufres cuites se gardent 2 jours au réfrigérateur, bien emballées, ou se congèlent : réchauffe-les au grille-pain ou au four pour leur rendre leur croustillant.",
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
        "pays": "Belgique et France (racines médiévales)",
        "drapeau": "🇧🇪",
        "resume": "Une pâte cuite entre deux plaques de fer, héritière des oublies du Moyen Âge, devenue un emblème de la Belgique.",
        "faits": [
          "Les gaufres ont pour ancêtres les oublies médiévales : vers les IXe et Xe siècles apparaissent à la fois des fers pour cuire les hosties de la messe et des fers à oublies, plus grands, faits de deux plaques de fer à longues poignées.",
          "Le mot « gaufre », comme le néerlandais « wafel », vient d'un mot germanique lié à l'idée de rayon de miel, ce qui rappelle le motif alvéolé de la pâte.",
          "Aux États-Unis, la « Belgian waffle » a été popularisée à la Foire internationale de New York de 1964 par Maurice Vermersch, originaire de Bruxelles ; d'autres récits évoquent une présentation dès 1962, à l'exposition de Seattle."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Waffle",
            "url": "https://en.wikipedia.org/wiki/Waffle"
          },
          {
            "titre": "Aleteia — L'origine très chrétienne des gaufres",
            "url": "https://fr.aleteia.org/2023/09/23/lorigine-tres-chretienne-des-gaufres/"
          },
          {
            "titre": "Etymonline — waffle",
            "url": "https://www.etymonline.com/word/waffle"
          },
          {
            "titre": "Wikipédia (en) — Belgian waffle",
            "url": "https://en.wikipedia.org/wiki/Belgian_waffle"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "chailatte",
      "url": "chai-latte.html",
      "titre": "Chai latte maison aux épices",
      "titreCourt": "Chai latte",
      "alias": [
        "chai",
        "masala chai",
        "the chai",
        "the aux epices"
      ],
      "emoji": "🫖",
      "categorie": "boisson",
      "badge": "Épicé & réconfortant",
      "accroche": "Thé noir corsé infusé avec cardamome, cannelle et gingembre, adouci d'un lait chaud bien mousseux.",
      "intro": "Inspiré du masala chai indien, ce chai latte associe un thé noir corsé, des épices entières fraîchement écrasées et un lait chaud fouetté en mousse. Rien à voir avec les sirops tout prêts : ici, chaque épice se devine, et tu règles toi-même le sucre et l'intensité.",
      "images": [],
      "cover": {
        "motif": "tasse",
        "fond": "#4a2216",
        "encre": "#f6efe4",
        "accent": "#e3913a"
      },
      "temps": {
        "preparation": 10,
        "cuisson": 17,
        "repos": 0
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
        "chaud",
        "hiver",
        "reconfort",
        "epice",
        "indien",
        "gouter",
        "matin",
        "sucre",
        "facile",
        "convivial"
      ],
      "ingredients": [
        {
          "groupe": "Pour le chai épicé",
          "items": [
            {
              "nom": "Eau",
              "qte": 400,
              "unite": "ml"
            },
            {
              "nom": "Gousses de cardamome verte",
              "qte": 6,
              "unite": "pièce"
            },
            {
              "nom": "Bâton de cannelle",
              "qte": 1,
              "unite": "pièce"
            },
            {
              "nom": "Clous de girofle",
              "qte": 4,
              "unite": "pièce"
            },
            {
              "nom": "Grains de poivre noir",
              "qte": 6,
              "unite": "pièce"
            },
            {
              "nom": "Gingembre frais",
              "qte": 20,
              "unite": "g"
            },
            {
              "nom": "Étoile de badiane",
              "qte": 1,
              "unite": "pièce",
              "optionnel": true
            },
            {
              "nom": "Thé noir corsé en vrac (type Assam)",
              "qte": 3,
              "unite": "c. à soupe"
            },
            {
              "nom": "Sucre roux",
              "qte": 3,
              "unite": "c. à soupe"
            }
          ]
        },
        {
          "groupe": "Pour le lait mousseux",
          "items": [
            {
              "nom": "Lait entier",
              "qte": 600,
              "unite": "ml"
            }
          ]
        },
        {
          "groupe": "Pour servir",
          "items": [
            {
              "nom": "Cannelle en poudre",
              "qte": 1,
              "unite": "pincée",
              "optionnel": true,
              "fixe": true
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "Écraser les épices",
          "texte": "Écrase grossièrement la cardamome, le bâton de cannelle, les clous de girofle et le poivre au mortier, ou sous le plat d'un grand couteau. Épluche le gingembre et coupe-le en fines tranches : les épices concassées libèrent bien plus de parfum."
        },
        {
          "titre": "Les épices frémissantes",
          "texte": "Mets l'eau dans une casserole avec les épices écrasées, le gingembre et la badiane. Porte à ébullition, puis baisse le feu et laisse frémir environ 7 minutes : l'eau se colore et embaume.",
          "minuteurs": [
            {
              "secondes": 420,
              "label": "Infusion des épices"
            }
          ]
        },
        {
          "titre": "Le thé",
          "texte": "Ajoute le thé noir et laisse frémir à feu très doux 3 minutes, pas davantage. Au-delà, le thé libère ses tanins et devient amer.",
          "minuteurs": [
            {
              "secondes": 180,
              "label": "Infusion du thé"
            }
          ]
        },
        {
          "titre": "Filtrer et sucrer",
          "texte": "Retire du feu et filtre au chinois fin ou dans une passoire fine, en pressant les épices du dos d'une cuillère. Ajoute le sucre roux dans ce concentré encore chaud et remue jusqu'à ce qu'il soit dissous."
        },
        {
          "titre": "Chauffer le lait",
          "texte": "Dans une casserole propre, chauffe le lait à feu moyen jusqu'à ce que de petites bulles apparaissent sur les bords, sans le laisser bouillir. Surveille-le de près : le lait qui monte déborde en quelques secondes.",
          "minuteurs": [
            {
              "secondes": 240,
              "label": "Lait chaud"
            }
          ]
        },
        {
          "titre": "La mousse de lait",
          "texte": "Hors du feu, fouette vivement le lait au fouet à main, au mousseur à lait ou quelques secondes au mixeur plongeant en inclinant la casserole. Arrête quand la surface est couverte d'une mousse fine et brillante."
        },
        {
          "titre": "L'assemblage",
          "texte": "Répartis le concentré de chai dans des tasses chaudes. Verse le lait chaud en retenant la mousse avec une cuillère, puis dépose-la sur le dessus."
        },
        {
          "titre": "Le service",
          "texte": "Saupoudre d'une pincée de cannelle en poudre si tu aimes, goûte et ajuste le sucre, puis sers aussitôt."
        }
      ],
      "astuces": [
        "Pour un chai encore plus parfumé, fais griller les épices entières 1 à 2 minutes à sec dans la casserole, en remuant, avant d'ajouter l'eau : elles libèrent davantage leurs arômes.",
        "Ne laisse pas cuire le thé trop longtemps : ce sont les épices qui ont besoin de frémir, le thé, lui, devient amer s'il cuit plus de quelques minutes.",
        "Pour une version végétale, remplace le lait par une boisson à l'avoine, qui mousse bien ; pour une version glacée, verse le concentré refroidi sur des glaçons avec du lait froid."
      ],
      "choix": {
        "titre": "Épices & variantes",
        "mode": "multi",
        "label": "Ton chai",
        "options": [
          "Cardamome",
          "Cannelle",
          "Gingembre",
          "Clou de girofle",
          "Badiane",
          "Poivre noir",
          "Lait d'avoine",
          "Version glacée"
        ]
      },
      "accords": [
        {
          "titre": "Le classique",
          "texte": "bien épicé, avec une tranche de pain d'épices ou un biscuit sablé."
        },
        {
          "titre": "Le doux",
          "texte": "plus de lait, moins de poivre et une cuillère de miel."
        },
        {
          "titre": "Le glacé",
          "texte": "concentré refroidi, lait froid et beaucoup de glaçons."
        },
        {
          "titre": "Le gourmand",
          "texte": "une pointe de vanille et un nuage de cannelle sur la mousse."
        }
      ],
      "conservation": "Le concentré de chai filtré se garde 2 à 3 jours au réfrigérateur dans un bocal fermé. Réchauffe-le doucement et prépare le lait mousseux au moment de servir.",
      "allergenes": [
        "lait"
      ],
      "noteAllergenes": "Le thé noir contient de la caféine (théine) : pour les enfants ou le soir, choisis un thé noir déthéiné ou un rooibos.",
      "regime": {
        "sansViande": true,
        "sansPoisson": true
      },
      "origine": {
        "pays": "Inde",
        "drapeau": "🇮🇳",
        "resume": "Le chai latte est une version occidentale du masala chai, le thé noir indien préparé avec du lait, du sucre et des épices.",
        "faits": [
          "« Chai » veut simplement dire « thé » : le mot remonte au chinois « chá ». Dire « thé chai » revient donc à dire « thé thé ».",
          "En Inde, la consommation de thé est restée faible jusqu'à une campagne de promotion de l'Indian Tea Association au début du XXe siècle. Les vendeurs de rue y ont ajouté des épices et beaucoup plus de lait et de sucre, ce que l'association a d'abord désapprouvé, car on utilisait ainsi moins de feuilles de thé.",
          "Aux États-Unis, Starbucks a testé un chai latte à Los Angeles en 1998, puis l'a mis définitivement à sa carte en 1999."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Masala chai",
            "url": "https://en.wikipedia.org/wiki/Masala_chai"
          },
          {
            "titre": "The Takeout — How chai (and the chai latte) came to America",
            "url": "https://thetakeout.com/1723117/chai-latte-america-history"
          },
          {
            "titre": "Starbucks Stories — histoire du Chai Tea Latte",
            "url": "https://about.starbucks.com/?p=278169"
          },
          {
            "titre": "Sporked — Starbucks change son chai latte pour la première fois en 25 ans",
            "url": "https://sporked.com/article/starbucks-changing-chai-latte-recipe/"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "theglacepeche",
      "url": "the-glace-peche.html",
      "titre": "Thé glacé maison à la pêche",
      "titreCourt": "Thé glacé pêche",
      "alias": [
        "the glace",
        "ice tea",
        "iced tea",
        "the glace a la peche"
      ],
      "emoji": "🍑",
      "categorie": "boisson",
      "badge": "Fait maison",
      "accroche": "Un thé noir infusé juste ce qu'il faut et un sirop de vraies pêches : l'ice tea maison, frais et parfumé.",
      "intro": "Bien loin des boissons en bouteille, ce thé glacé marie un thé noir infusé sans amertume et un sirop maison de pêches bien mûres. Tu doses toi-même le sucre, et le parfum du fruit se sent vraiment.",
      "images": [],
      "cover": {
        "motif": "verre",
        "fond": "#3d1a12",
        "encre": "#f6efe4",
        "accent": "#f59a6b"
      },
      "temps": {
        "preparation": 15,
        "cuisson": 20,
        "repos": 150
      },
      "difficulte": "Facile",
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
        "froid",
        "frais",
        "ete",
        "convivial",
        "familial",
        "brunch",
        "gouter",
        "americain",
        "facile",
        "simple"
      ],
      "ingredients": [
        {
          "groupe": "Pour le sirop de pêche",
          "items": [
            {
              "nom": "Pêches bien mûres",
              "qte": 3,
              "unite": "pièce"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 100,
              "unite": "g"
            },
            {
              "nom": "Eau",
              "qte": 250,
              "unite": "ml"
            },
            {
              "nom": "Jus de citron",
              "qte": 1,
              "unite": "c. à soupe"
            }
          ]
        },
        {
          "groupe": "Pour le thé",
          "items": [
            {
              "nom": "Eau",
              "qte": 1000,
              "unite": "ml"
            },
            {
              "nom": "Thé noir (en sachets)",
              "qte": 5,
              "unite": "sachet"
            }
          ]
        },
        {
          "groupe": "Pour servir",
          "items": [
            {
              "nom": "Glaçons",
              "qte": 12,
              "unite": "pièce"
            },
            {
              "nom": "Pêche en fines tranches",
              "qte": 1,
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
          "titre": "Préparer les pêches",
          "texte": "Lave les pêches, coupe-les en deux, retire le noyau et taille la chair en morceaux. Garde la peau : elle donne au sirop sa jolie couleur rosée."
        },
        {
          "titre": "Le sirop de pêche",
          "texte": "Mets les morceaux de pêche dans une casserole avec le sucre et l'eau du sirop. Porte à ébullition, puis laisse frémir 10 à 15 minutes à feu doux, jusqu'à ce que les fruits soient très tendres et que le sirop soit parfumé.",
          "minuteurs": [
            {
              "secondes": 600,
              "label": "Vérifier les fruits"
            },
            {
              "secondes": 900,
              "label": "Sirop de pêche"
            }
          ]
        },
        {
          "titre": "Filtrer le sirop",
          "texte": "Écrase les pêches à la fourchette dans la casserole, puis filtre le tout dans une passoire fine en pressant bien la pulpe. Ajoute le jus de citron et laisse refroidir."
        },
        {
          "titre": "Infuser le thé",
          "texte": "Porte l'eau du thé à ébullition, retire-la du feu et laisse-la reposer 1 à 2 minutes pour qu'elle redescende vers 90-95 °C. Verse-la sur les sachets de thé et laisse infuser 4 minutes, pas plus.",
          "minuteurs": [
            {
              "secondes": 240,
              "label": "Infusion du thé"
            }
          ]
        },
        {
          "titre": "Retirer les sachets",
          "texte": "Retire les sachets sans les presser : en les essorant, tu ferais passer davantage de tanins amers dans le thé. Laisse refroidir le thé et le sirop à température ambiante, environ 30 minutes.",
          "minuteurs": [
            {
              "secondes": 1800,
              "label": "Refroidissement"
            }
          ]
        },
        {
          "titre": "Au frais",
          "texte": "Verse le thé refroidi et le sirop de pêche dans une grande carafe, mélange, puis place au réfrigérateur au moins 2 heures.",
          "minuteurs": [
            {
              "secondes": 7200,
              "label": "Au réfrigérateur"
            }
          ]
        },
        {
          "titre": "Ajuster",
          "texte": "Goûte avant de servir : ajoute un peu d'eau fraîche si c'est trop sucré, ou un trait de jus de citron pour plus de peps."
        },
        {
          "titre": "Le service",
          "texte": "Remplis les verres de glaçons, verse le thé glacé et ajoute quelques tranches de pêche et des feuilles de menthe légèrement froissées. Sers bien frais."
        }
      ],
      "astuces": [
        "Respecte le temps d'infusion : au-delà de 4 à 5 minutes, ou avec une eau bouillante, le thé noir libère davantage de tanins et devient âpre et amer.",
        "Pour un thé encore plus doux, infuse-le à froid : sachets dans l'eau froide, 8 à 12 heures au réfrigérateur, puis retire-les et ajoute le sirop.",
        "Prépare des glaçons avec un peu de thé glacé : ils rafraîchissent les verres sans diluer la boisson."
      ],
      "choix": {
        "titre": "Compose ta carafe",
        "mode": "multi",
        "label": "Ta composition",
        "options": [
          "Tranches de pêche",
          "Menthe fraîche",
          "Citron jaune",
          "Thé vert",
          "Thé déthéiné",
          "Basilic",
          "Eau pétillante",
          "Beaucoup de glaçons"
        ]
      },
      "accords": [
        {
          "titre": "Le classique",
          "texte": "thé noir, sirop de pêche et beaucoup de glaçons."
        },
        {
          "titre": "Le léger",
          "texte": "thé vert infusé 2 à 3 minutes à eau moins chaude."
        },
        {
          "titre": "Le pétillant",
          "texte": "un trait d'eau gazeuse ajouté dans le verre au moment de servir."
        },
        {
          "titre": "Le jardin",
          "texte": "quelques feuilles de basilic ou de menthe froissées dans la carafe."
        }
      ],
      "conservation": "Jusqu'à 2 jours au réfrigérateur dans une carafe fermée ; ajoute les glaçons et les fruits frais seulement au moment de servir. Le sirop de pêche seul se garde quelques jours au frais dans un bocal fermé.",
      "allergenes": [],
      "noteAllergenes": "Le thé noir contient de la caféine (théine) : pour les enfants ou le soir, choisis un thé noir déthéiné ou un rooibos.",
      "regime": {
        "sansViande": true,
        "sansPoisson": true,
        "vegan": true
      },
      "origine": {
        "pays": "États-Unis",
        "drapeau": "🇺🇸",
        "resume": "Le thé glacé sucré s'est popularisé aux États-Unis entre la fin du XIXe et le début du XXe siècle.",
        "faits": [
          "La plus ancienne recette imprimée connue de thé glacé sucré a été publiée en 1879 dans « Housekeeping in Old Virginia », un livre de cuisine de Marion Cabell Tyree ; elle utilisait du thé vert.",
          "On attribue souvent son invention à Richard Blechynden, à l'Exposition universelle de Saint-Louis en 1904, mais du thé glacé était déjà servi avant : l'exposition l'a surtout popularisé."
        ],
        "sources": [
          {
            "titre": "What's Cooking America — Iced Tea History",
            "url": "https://whatscookingamerica.net/History/IcedTeaHistory.htm"
          },
          {
            "titre": "Georgia Public Broadcasting — Sweet tea, history of the nectar of the South",
            "url": "https://www.gpb.org/news/2017/05/23/sweet-tea-history-of-the-nectar-of-the-south"
          }
        ]
      }
    },

    /* ===================================================================== */
    {
      "key": "lassimangue",
      "url": "lassi-mangue.html",
      "titre": "Lassi à la mangue",
      "titreCourt": "Lassi mangue",
      "alias": [
        "lassi",
        "mango lassi",
        "lassi mangue",
        "smoothie mangue yaourt"
      ],
      "emoji": "🥭",
      "categorie": "boisson",
      "badge": "Douceur indienne",
      "accroche": "Mangue bien mûre, yaourt nature et une pointe de cardamome, mixés en une boisson onctueuse et fraîche.",
      "intro": "Une boisson épaisse et veloutée venue du sous-continent indien, à mi-chemin entre le milk-shake et le smoothie, qui accompagne merveilleusement les plats épicés. En dix minutes et un coup de mixeur, la mangue, le yaourt et la cardamome font le reste.",
      "images": [],
      "cover": {
        "motif": "verre",
        "fond": "#4a2a08",
        "encre": "#f6efe4",
        "accent": "#ffb627"
      },
      "temps": {
        "preparation": 10,
        "cuisson": 0,
        "repos": 0
      },
      "difficulte": "Très facile",
      "portions": {
        "base": 4,
        "unite": "verre",
        "pluriel": "verres",
        "min": 1,
        "max": 12
      },
      "tags": [
        "boisson",
        "froid",
        "frais",
        "ete",
        "indien",
        "rapide",
        "facile",
        "simple",
        "brunch",
        "matin",
        "gouter",
        "enfant"
      ],
      "ingredients": [
        {
          "groupe": "Pour le lassi",
          "items": [
            {
              "nom": "Mangues bien mûres",
              "qte": 2,
              "unite": "pièce"
            },
            {
              "nom": "Yaourt nature entier, bien froid",
              "qte": 400,
              "unite": "g"
            },
            {
              "nom": "Lait froid",
              "qte": 200,
              "unite": "ml"
            },
            {
              "nom": "Sucre en poudre",
              "qte": 2,
              "unite": "c. à soupe"
            },
            {
              "nom": "Gousses de cardamome verte",
              "qte": 3,
              "unite": "pièce"
            },
            {
              "nom": "Glaçons",
              "qte": 6,
              "unite": "pièce",
              "optionnel": true
            }
          ]
        },
        {
          "groupe": "Pour servir",
          "items": [
            {
              "nom": "Pistaches non salées concassées",
              "qte": 1,
              "unite": "c. à soupe",
              "optionnel": true
            }
          ]
        }
      ],
      "etapes": [
        {
          "titre": "La mangue",
          "texte": "Épluche les mangues à l'économe. Coupe la chair de chaque côté du noyau, qui est large et plat, puis récupère ce qui reste autour et taille le tout en gros cubes."
        },
        {
          "titre": "La cardamome",
          "texte": "Ouvre les gousses de cardamome du bout du couteau et récupère les petites graines noires. Écrase-les au mortier en poudre fine : tu en garderas une pincée pour le service."
        },
        {
          "titre": "La purée de mangue",
          "texte": "Mixe d'abord la mangue seule, environ 1 minute, jusqu'à obtenir une purée parfaitement lisse, sans fibres. C'est elle qui donne au lassi sa texture veloutée."
        },
        {
          "titre": "Le mélange",
          "texte": "Ajoute le yaourt, le lait froid, le sucre, presque toute la cardamome et les glaçons si tu en mets. Mixe 30 secondes à 1 minute, jusqu'à ce que le lassi soit lisse et légèrement mousseux."
        },
        {
          "titre": "Ajuster",
          "texte": "Goûte et ajuste : un peu de sucre si la mangue manque de douceur, un trait de lait si le lassi est trop épais pour être bu facilement. Mixe encore quelques secondes."
        },
        {
          "titre": "Le service",
          "texte": "Verse dans des verres bien froids, parsème de pistaches concassées et d'une pincée de cardamome. Sers aussitôt, tant qu'il est frais et mousseux."
        }
      ],
      "astuces": [
        "Choisis des mangues qui cèdent légèrement sous le doigt et sentent bon près du pédoncule : une mangue pas assez mûre donne un lassi fade et fibreux.",
        "La pulpe de mangue en conserve, souvent faite avec des mangues Alphonso, donne un lassi très parfumé toute l'année ; comme elle est souvent déjà sucrée, réduis alors le sucre.",
        "Avec des cubes de mangue congelés à la place des glaçons, ton lassi est bien froid sans être dilué."
      ],
      "choix": {
        "titre": "Variantes & garnitures",
        "mode": "multi",
        "label": "Ton lassi",
        "options": [
          "Cardamome",
          "Pistaches",
          "Filaments de safran",
          "Eau de rose",
          "Miel",
          "Yaourt grec",
          "Menthe fraîche",
          "Mangue congelée"
        ]
      },
      "accords": [
        {
          "titre": "Le classique",
          "texte": "mangue, yaourt et une pointe de cardamome, bien frais."
        },
        {
          "titre": "Le parfumé",
          "texte": "quelques filaments de safran infusés dans un peu de lait tiède."
        },
        {
          "titre": "Le fleuri",
          "texte": "une goutte d'eau de rose et des pistaches concassées."
        },
        {
          "titre": "Avec un repas",
          "texte": "aux côtés d'un curry ou d'un plat épicé, dont il adoucit le feu."
        }
      ],
      "conservation": "À boire de préférence tout de suite. Sinon, jusqu'à 24 heures au réfrigérateur dans une bouteille fermée : secoue-le ou remixe-le avant de servir.",
      "allergenes": [
        "lait",
        "fruitsacoque"
      ],
      "noteAllergenes": "Les fruits à coque ne concernent que les pistaches, facultatives. Pour une version sans lait, utilise un yaourt végétal et une boisson végétale (avoine, coco…) ; s'ils sont au soja, pense que le soja est lui aussi un allergène.",
      "regime": {
        "sansViande": true,
        "sansPoisson": true
      },
      "origine": {
        "pays": "Inde et Pakistan (Pendjab)",
        "drapeau": "🇮🇳",
        "resume": "Le lassi, boisson au yaourt, est originaire de la région du Pendjab ; la version à la mangue en est une variante sucrée devenue très populaire.",
        "faits": [
          "Le lassi est né dans la région du Pendjab, aujourd'hui partagée entre l'Inde et le Pakistan, où le yaourt est traditionnellement fait avec du lait de bufflonne.",
          "Il existe un lassi salé, assaisonné de sel, de poivre noir et de cumin, et des lassis sucrés, parfois parfumés à l'eau de rose ou à la pulpe de fruits ; le lassi à la mangue se boit dans toute l'Asie du Sud.",
          "L'origine lointaine du mot « lassi » reste incertaine ; les dictionnaires anglais datent ses premières attestations écrites de la fin du XIXe siècle."
        ],
        "sources": [
          {
            "titre": "Wikipédia (en) — Lassi",
            "url": "https://en.wikipedia.org/wiki/Lassi"
          },
          {
            "titre": "Wikipédia (en) — Mango",
            "url": "https://en.wikipedia.org/wiki/Mango"
          },
          {
            "titre": "Dictionary.com — lassi",
            "url": "https://www.dictionary.com/browse/LASSI"
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
