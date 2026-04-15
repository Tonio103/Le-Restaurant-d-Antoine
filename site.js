/**
 * LE RESTAURANT D'ANTOINE - SCRIPT PRINCIPAL
 * Version simplifiée pour site multi-pages
 */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* ==========================================================================
     DOM REFERENCES
     ========================================================================== */
  const body = document.body;
  const loader = document.getElementById("loader");
  const menuToggle = document.getElementById("menuToggle");
  const navCenter = document.getElementById("navCenter");
  const themeToggle = document.getElementById("themeToggle");
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const toast = document.getElementById("secretToast");
  const searchInput = document.getElementById("searchInput");

  /* ==========================================================================
     STORAGE KEYS
     ========================================================================== */
  const STORAGE_KEYS = {
    theme: "antoine-theme"
  };

  /* ==========================================================================
     RECIPE DATA
     ========================================================================== */
  const recipeData = {
    cailles: {
      base: 4,
      label: "PERSONNES",
      targetId: "caillesIngredients",
      labelId: "caillesCountLabel",
      items: [
        { emoji: "", name: "Cuisses de caille fraîches", amount: 8, unit: "pièces" },
        { emoji: "", name: "Petits pois (frais ou surgelés)", amount: 500, unit: "g" },
        { emoji: "", name: "Lardons allumettes fumés", amount: 150, unit: "g" },
        { emoji: "", name: "Petits oignons grelots", amount: 15, unit: "pièces" },
        { emoji: "", name: "Carottes fanes", amount: 2, unit: "pièces" },
        { emoji: "", name: "Beurre doux", amount: 30, unit: "g" },
        { emoji: "", name: "Bouillon de volaille chaud", amount: 200, unit: "ml" },
        { emoji: "", name: "Bouquet garni (thym, laurier)", amount: 1, unit: "bouquet" }
      ]
    },

    crepes: {
      base: 4,
      label: "PERSONNES",
      targetId: "crepesIngredients",
      labelId: "crepesCountLabel",
      items: [
        { emoji: "", name: "Farine de blé type 45", amount: 250, unit: "g" },
        { emoji: "", name: "Œufs frais", amount: 4, unit: "pièces" },
        { emoji: "", name: "Lait demi-écrémé", amount: 500, unit: "ml" },
        { emoji: "", name: "Beurre fondu", amount: 50, unit: "g" },
        { emoji: "", name: "Sucre en poudre", amount: 30, unit: "g" },
        { emoji: "", name: "Huile de tournesol", amount: 1, unit: "c. à soupe" },
        { emoji: "", name: "Pincée de sel fin", amount: 1, unit: "pincée" },
        { emoji: "", name: "Rhum ambré (optionnel)", amount: 1, unit: "bouchon" }
      ]
    },

    burgers: {
      base: 4,
      label: "BURGERS",
      targetId: "burgersIngredients",
      labelId: "burgersCountLabel",
      items: [
        { emoji: "", name: "Pains burger briochés (buns)", amount: 4, unit: "pièces" },
        { emoji: "", name: "Steaks hachés de bœuf (15% MG)", amount: 4, unit: "pièces" },
        { emoji: "", name: "Tranches de cheddar affiné", amount: 4, unit: "tranches" },
        { emoji: "", name: "Tomates charnues", amount: 2, unit: "pièces" },
        { emoji: "", name: "Salade iceberg", amount: 4, unit: "feuilles" },
        { emoji: "", name: "Oignon rouge", amount: 1, unit: "pièce" },
        { emoji: "", name: "Sauce spéciale burger", amount: 4, unit: "c. à soupe" },
        { emoji: "", name: "Beurre pour toaster", amount: 20, unit: "g" }
      ]
    },

    fondants: {
      base: 4,
      label: "PERSONNES",
      targetId: "fondantsIngredients",
      labelId: "fondantsCountLabel",
      items: [
        { emoji: "", name: "Chocolat noir (70% cacao)", amount: 200, unit: "g" },
        { emoji: "", name: "Beurre doux coupé en dés", amount: 100, unit: "g" },
        { emoji: "", name: "Œufs entiers", amount: 3, unit: "pièces" },
        { emoji: "", name: "Sucre en poudre", amount: 100, unit: "g" },
        { emoji: "", name: "Farine tamisée", amount: 50, unit: "g" },
        { emoji: "", name: "Beurre pour les moules", amount: 10, unit: "g" }
      ]
    },

    marbre: {
      base: 4,
      label: "PERSONNES",
      targetId: "marbreIngredients",
      labelId: "marbreCountLabel",
      items: [
        { emoji: "", name: "Farine blanche", amount: 250, unit: "g" },
        { emoji: "", name: "Œufs frais", amount: 3, unit: "pièces" },
        { emoji: "", name: "Beurre mou (pommade)", amount: 125, unit: "g" },
        { emoji: "", name: "Sucre blanc", amount: 125, unit: "g" },
        { emoji: "", name: "Chocolat", amount: 100, unit: "g" },
        { emoji: "", name: "Lait entier", amount: 80, unit: "ml" },
        { emoji: "", name: "Levure chimique", amount: 1, unit: "sachet" },
        { emoji: "", name: "Extrait de vanille", amount: 1, unit: "c. à café" }
      ]
    },

    pokebowl: {
      base: 2,
      label: "BOLS",
      targetId: "pokeIngredients",
      labelId: "pokebowlCountLabel",
      items: [
        { emoji: "", name: "Riz japonais rond", amount: 200, unit: "g" },
        { emoji: "", name: "Dos de saumon cru", amount: 250, unit: "g" },
        { emoji: "", name: "Avocat mûr à point", amount: 1, unit: "pièce" },
        { emoji: "", name: "Concombre Noa", amount: 0.5, unit: "pièce" },
        { emoji: "", name: "Mangue fraîche", amount: 0.5, unit: "pièce" },
        { emoji: "", name: "Carotte", amount: 1, unit: "pièce" },
        { emoji: "", name: "Fèves edamame", amount: 100, unit: "g" },
        { emoji: "", name: "Sauce soja", amount: 3, unit: "c. à soupe" }
      ]
    }
  };

  /* ==========================================================================
     STATE
     ========================================================================== */
  const portions = {
    cailles: 4,
    crepes: 4,
    burgers: 4,
    fondants: 4,
    marbre: 4,
    pokebowl: 2
  };

  const timers = {};
  let toastTimeout = null;

  /* ==========================================================================
     STORAGE HELPERS
     ========================================================================== */
  function safeGetStorage(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ?? fallback;
    } catch {
      return fallback;
    }
  }

  function safeSetStorage(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* ignore */
    }
  }

  /* ==========================================================================
     UI HELPERS
     ========================================================================== */
  function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  function hideLoader() {
    if (!loader) return;
    loader.classList.add("hidden");
  }

  function formatAmount(value) {
    if (Number.isInteger(value)) return String(value);
    return value.toFixed(1).replace(/\.0$/, "").replace(".", ",");
  }

  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function normalizeText(text) {
    return String(text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  /* ==========================================================================
     THEME
     ========================================================================== */
  function applyTheme(theme) {
    const isDark = theme === "dark";
    body.classList.toggle("dark-mode", isDark);

    if (themeToggle) {
      themeToggle.textContent = isDark ? "☀️" : "🌙";
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Activer le thème clair" : "Activer le thème sombre"
      );
    }
  }

  function initTheme() {
    const savedTheme = safeGetStorage(STORAGE_KEYS.theme, "light");
    applyTheme(savedTheme);

    themeToggle?.addEventListener("click", () => {
      const nextTheme = body.classList.contains("dark-mode") ? "light" : "dark";
      safeSetStorage(STORAGE_KEYS.theme, nextTheme);
      applyTheme(nextTheme);
      showToast(nextTheme === "dark" ? "Thème sombre activé" : "Thème clair activé");
    });
  }

  /* ==========================================================================
     NAVIGATION
     ========================================================================== */
  function initNavigation() {
    menuToggle?.addEventListener("click", () => {
      navCenter?.classList.toggle("open");
    });
  }

  /* ==========================================================================
     SEARCH
     ========================================================================== */
function initAiChef() {
  const input = document.getElementById("aiChefInput");
  const button = document.getElementById("aiChefBtn");
  const result = document.getElementById("aiChefResult");

  if (!input || !button || !result) return;

  const recipeBrain = [
    {
      key: "cailles",
      name: "Cailles & Petits pois",
      url: "cailles.html",
      tags: ["viande", "raffine", "traditionnel", "francais", "sale", "plat", "familial", "moyen", "dimanche", "chaud"],
      aliases: ["caille", "cailles", "petits pois", "cailles petits pois", "cailles et petits pois"]
    },
    {
      key: "crepes",
      name: "Crêpes gourmandes",
      url: "crepes.html",
      tags: ["dessert", "gouter", "rapide", "facile", "leger", "familial", "simple", "convivial", "sucre", "plaisir", "reconfort"],
      aliases: ["crepe", "crepes", "crêpe", "crêpes", "pancake", "pancakes"]
    },
    {
      key: "burgers",
      name: "Burgers garnis",
      url: "burger.html",
      tags: ["viande", "copieux", "gourmand", "rapide", "sale", "plat", "familial", "lourd", "convivial", "plaisir", "chaud", "enfant"],
      aliases: ["burger", "burgers", "hamburger", "hamburgers", "cheeseburger"]
    },
    {
      key: "fondants",
      name: "Fondants intenses",
      url: "fondant.html",
      tags: ["dessert", "chocolat", "gourmand", "lourd", "plaisir", "sucre", "reconfort"],
      aliases: ["fondant", "fondants", "fondant chocolat", "fondants chocolat", "coulant", "coulant chocolat"]
    },
    {
      key: "marbre",
      name: "Gâteau marbré",
      url: "gateau-marbre.html",
      tags: ["dessert", "gouter", "familial", "simple", "leger", "sucre", "plaisir", "enfant"],
      aliases: ["marbre", "gateau marbre", "gâteau marbré", "cake marbre", "cake marbré"]
    },
    {
      key: "pokebowl",
      name: "Poké bowl hawaïen",
      url: "poke-bowl.html",
      tags: ["leger", "frais", "healthy", "equilibre", "rapide", "poisson", "sale", "plat", "sain", "familial", "froid", "ete"],
      aliases: ["poke", "pokebowl", "poke bowl", "poké", "poké bowl", "bowl saumon"]
    }
  ];

  const lexicon = {
    leger: ["leger", "léger", "light", "digeste"],
    pas_trop_lourd: ["pas trop lourd", "pas lourd", "pas trop copieux", "assez leger", "assez léger"],
    lourd: ["lourd", "copieux", "gras", "qui cale", "consistant"],

    familial: ["famille", "familial", "convivial", "a plusieurs", "à plusieurs", "partager"],
    frais: ["frais", "froid", "rafraichissant", "rafraîchissant"],
    rapide: ["rapide", "vite", "express", "simple", "ce soir"],
    gourmand: ["gourmand", "gourmande", "plaisir", "reconfortant", "réconfortant"],
    chocolat: ["chocolat", "choco", "cacao"],
    viande: ["viande", "boeuf", "bœuf", "carne"],
    poisson: ["poisson", "saumon"],
    dessert: ["dessert", "sucre", "sucré", "gouter", "goûter", "gateau", "gâteau"],
    sale: ["sale", "salé", "repas", "plat"],
    raffine: ["raffine", "raffiné", "chic", "elegant", "élégant"],

    bonjour: ["bonjour", "salut", "coucou", "hello", "hey"],
    merci: ["merci", "thanks", "merci beaucoup"],
    faim: ["faim", "j ai faim", "j'ai faim", "affame", "affamé"],
    soif: ["soif", "j ai soif", "j'ai soif"],
    triste: ["triste", "deprime", "déprime", "pas bien", "cafard"],
    fatigue: ["fatigue", "fatigué", "fatiguee", "fatiguée", "creve", "crevé"],
    fete: ["fete", "fête", "anniversaire", "occasion"],
    dimanche: ["dimanche", "repas du dimanche"],
    hiver: ["hiver", "jour froid", "temps froid"],
    ete: ["ete", "été", "soleil", "estival"],
    romantique: ["romantique", "amoureux", "date", "diner a deux", "dîner à deux"],
    enfant: ["enfant", "enfants", "petits", "petit", "kids"],
    invite: ["invite", "invites", "invité", "invités", "recevoir", "du monde"],
    reconfort: ["reconfort", "réconfort", "comfort", "remonter le moral"],
    healthy: ["healthy", "sain", "saine", "equilibre", "équilibré", "équilibrée", "fit"],
    plaisir: ["plaisir", "envie", "gourmand", "gourmande"],
    sucre: ["sucre", "sucré", "dessert", "gouter", "goûter"],
    chaud: ["chaud", "chaude", "rechauffant", "réchauffant"],
    froid: ["froid", "frais", "rafraichissant", "rafraîchissant"],

    aide: ["aide", "aider", "help", "besoin d aide", "besoin d'aide"],
    amour: ["amour", "love", "coeur", "cœur"],
    antoine: ["antoine", "chef antoine", "restaurant d antoine", "restaurant d'antoine"]
  };

  function normalize(text) {
    return String(text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function findRecipeMentions(text) {
    const normalized = normalize(text);
    const mentioned = new Set();

    recipeBrain.forEach((recipe) => {
      const allNames = [recipe.name, ...(recipe.aliases || [])];
      const match = allNames.some((name) => normalized.includes(normalize(name)));
      if (match) {
        mentioned.add(recipe.key);
      }
    });

    return [...mentioned];
  }

  function detectNegations(text) {
    const normalized = normalize(text);
    const negatives = new Set();

    const patterns = [
      /sans ([a-z0-9\s-]+)/g,
      /pas de ([a-z0-9\s-]+)/g,
      /pas d ([a-z0-9\s-]+)/g,
      /je ne veux pas de ([a-z0-9\s-]+)/g,
      /je veux pas de ([a-z0-9\s-]+)/g,
      /pas trop ([a-z0-9\s-]+)/g
    ];

    patterns.forEach((pattern) => {
      let match;
      while ((match = pattern.exec(normalized)) !== null) {
        negatives.add(match[1].trim());
      }
    });

    if (normalized.includes("pas lourd") || normalized.includes("pas trop lourd")) {
      negatives.add("lourd");
    }

    return [...negatives];
  }

  function extractConcepts(text) {
    const normalized = normalize(text);
    const found = new Set();

    Object.entries(lexicon).forEach(([concept, words]) => {
      const matched = words.some((word) => normalized.includes(normalize(word)));
      if (matched) found.add(concept);
    });

    return [...found];
  }

  function detectSpecialIntent(text, recipeMentions) {
    const normalized = normalize(text);

    if (!normalized) return null;

    if (recipeMentions.length > 0) return null;

    if (normalized.includes("bonjour") || normalized.includes("salut") || normalized.includes("coucou") || normalized.includes("hello")) {
      return "bonjour";
    }

    if (normalized.includes("merci")) {
      return "merci";
    }

    if (normalized.includes("aide") || normalized.includes("aider") || normalized.includes("help")) {
      return "aide";
    }

    if (normalized.includes("amour") || normalized.includes("love") || normalized.includes("coeur") || normalized.includes("cœur")) {
      return "amour";
    }

    if (normalized.includes("antoine")) {
      return "antoine";
    }

    if (normalized.includes("faim")) {
      return "faim";
    }

    if (normalized.includes("soif")) {
      return "soif";
    }

    if (normalized.includes("triste") || normalized.includes("deprime") || normalized.includes("déprime") || normalized.includes("cafard")) {
      return "triste";
    }

    if (normalized.includes("fatigue") || normalized.includes("fatigué") || normalized.includes("fatiguee") || normalized.includes("fatiguée")) {
      return "fatigue";
    }

    return null;
  }

  function scoreRecipes(query) {
    const normalized = normalize(query);
    const concepts = extractConcepts(normalized);
    const negatives = detectNegations(normalized);
    const recipeMentions = findRecipeMentions(normalized);

    const scored = recipeBrain.map((recipe) => {
      let score = 0;
      const reasons = [];
      const blocked = [];

      concepts.forEach((concept) => {
        if (recipe.tags.includes(concept)) {
          score += 3;
          reasons.push(concept);
        }
      });

      if (recipeMentions.includes(recipe.key)) {
        score += 10;
        reasons.push("recette citée");
      }

      if (concepts.includes("familial")) {
        if (recipe.tags.includes("familial")) score += 4;
        if (recipe.tags.includes("convivial")) score += 2;
      }

      if (concepts.includes("leger")) {
        if (recipe.tags.includes("leger")) score += 5;
        if (recipe.tags.includes("lourd")) score -= 5;
        if (recipe.tags.includes("moyen")) score -= 1;
      }

      if (concepts.includes("pas_trop_lourd")) {
        if (recipe.tags.includes("leger")) score += 6;
        if (recipe.tags.includes("moyen")) score += 1;
        if (recipe.tags.includes("lourd")) score -= 8;
        if (recipe.tags.includes("raffine")) score -= 1;
      }

      if (concepts.includes("lourd")) {
        if (recipe.tags.includes("lourd")) score += 5;
        if (recipe.tags.includes("leger")) score -= 4;
      }

      if (normalized.includes("repas")) {
        if (recipe.tags.includes("plat")) score += 2;
        if (recipe.tags.includes("dessert")) score -= 2;
      }

      if (normalized.includes("ce soir") || normalized.includes("soir")) {
        if (recipe.tags.includes("rapide")) score += 2;
        if (recipe.tags.includes("leger")) score += 2;
      }

      if (concepts.includes("fete")) {
        if (recipe.key === "cailles") score += 4;
        if (recipe.key === "fondants") score += 2;
      }

      if (concepts.includes("dimanche")) {
        if (recipe.key === "cailles") score += 4;
      }

      if (concepts.includes("ete") || concepts.includes("froid") || concepts.includes("healthy")) {
        if (recipe.key === "pokebowl") score += 4;
      }

      if (concepts.includes("hiver") || concepts.includes("reconfort")) {
        if (recipe.key === "fondants") score += 3;
        if (recipe.key === "crepes") score += 2;
        if (recipe.key === "cailles") score += 2;
      }

      if (concepts.includes("romantique")) {
        if (recipe.key === "cailles") score += 4;
        if (recipe.key === "fondants") score += 2;
      }

      if (concepts.includes("enfant")) {
        if (recipe.key === "burgers") score += 3;
        if (recipe.key === "crepes") score += 3;
        if (recipe.key === "marbre") score += 2;
      }

      if (concepts.includes("invite")) {
        if (recipe.key === "cailles") score += 3;
        if (recipe.key === "burgers") score += 2;
      }

      if (normalized.includes("famille") && concepts.includes("pas_trop_lourd")) {
        if (recipe.key === "crepes") score += 4;
        if (recipe.key === "pokebowl") score += 4;
        if (recipe.key === "marbre") score += 1;
        if (recipe.key === "burgers") score -= 3;
        if (recipe.key === "cailles") score -= 4;
        if (recipe.key === "fondants") score -= 3;
      }

      negatives.forEach((negative) => {
        const neg = normalize(negative);

        if (neg.includes("lourd") && recipe.tags.includes("lourd")) {
          score -= 12;
          blocked.push("trop lourd");
        }

        if ((neg.includes("burger") || neg.includes("hamburger")) && recipe.key === "burgers") {
          score -= 30;
          blocked.push("burger exclu");
        }

        if ((neg.includes("chocolat") || neg.includes("choco") || neg.includes("cacao")) && recipe.tags.includes("chocolat")) {
          score -= 25;
          blocked.push("chocolat exclu");
        }

        if ((neg.includes("poisson") || neg.includes("saumon")) && recipe.tags.includes("poisson")) {
          score -= 25;
          blocked.push("poisson exclu");
        }

        if ((neg.includes("viande") || neg.includes("boeuf") || neg.includes("bœuf")) && recipe.tags.includes("viande")) {
          score -= 25;
          blocked.push("viande exclue");
        }

        if ((neg.includes("dessert") || neg.includes("sucre") || neg.includes("gouter")) && recipe.tags.includes("dessert")) {
          score -= 15;
          blocked.push("dessert exclu");
        }

        if ((neg.includes("sale") || neg.includes("plat") || neg.includes("repas")) && recipe.tags.includes("sale")) {
          score -= 15;
          blocked.push("plat salé exclu");
        }

        const recipeNameBlocked = (recipe.aliases || []).some((alias) => neg.includes(normalize(alias)));
        if (recipeNameBlocked || neg.includes(normalize(recipe.name))) {
          score -= 35;
          blocked.push("recette exclue");
        }
      });

      return {
        ...recipe,
        score,
        reasons: [...new Set(reasons)],
        blocked: [...new Set(blocked)]
      };
    });

    scored.sort((a, b) => b.score - a.score);
    return { concepts, negatives, recipeMentions, scored };
  }

  function labelConcept(concept) {
    const labels = {
      leger: "léger",
      pas_trop_lourd: "pas trop lourd",
      lourd: "copieux",
      familial: "familial",
      frais: "frais",
      rapide: "rapide",
      gourmand: "gourmand",
      chocolat: "chocolat",
      viande: "viande",
      poisson: "poisson",
      dessert: "dessert",
      sale: "salé",
      raffine: "raffiné",
      reconfort: "réconfortant",
      healthy: "sain",
      chaud: "chaud",
      froid: "froid"
    };
    return labels[concept] || concept;
  }

  function renderSpecialResponse(intent) {
    if (intent === "bonjour") {
      result.innerHTML = `
        <strong>Bonjour 👋</strong><br>
        Dis-moi ce que tu veux manger et je t’aide à trouver la meilleure recette.
      `;
      return;
    }

    if (intent === "merci") {
      result.innerHTML = `
        <strong>Avec plaisir ✨</strong><br>
        Je suis là pour t’aider à choisir la bonne recette.
      `;
      return;
    }

    if (intent === "aide") {
      result.innerHTML = `
        <strong>Bien sûr 👋</strong><br>
        Je peux t’aider à choisir une recette selon ce que tu veux : léger, familial, rapide, gourmand, sans chocolat, sans burger, etc.<br><br>
        <strong>Exemples :</strong><br>
        • un truc pas trop lourd<br>
        • un repas familial<br>
        • sans burger et sans chocolat<br>
        • je veux des crêpes
      `;
      return;
    }

    if (intent === "amour") {
      result.innerHTML = `
        <strong>Oh 🫶</strong><br>
        Moi je peux surtout t’aider côté cuisine et ambiance gourmande.<br>
        Je peux te proposer une recette réconfortante ou à partager.
      `;
      return;
    }

    if (intent === "antoine") {
      result.innerHTML = `
        <strong>Antoine ?</strong><br>
        C’est le chef du restaurant 😌<br>
        Je peux t’aider à choisir parmi ses recettes : burgers, crêpes, cailles, fondants, gâteau marbré ou poké bowl.
      `;
      return;
    }

    if (intent === "faim") {
      result.innerHTML = `
        <strong>On va régler ça 😌</strong><br>
        Dis-moi juste : léger, gourmand, familial, rapide, sucré ou salé.
      `;
      return;
    }

    if (intent === "soif") {
      result.innerHTML = `
        <strong>Je gère surtout les plats 🍽️</strong><br>
        Mais je peux déjà t’aider à choisir une recette légère, fraîche ou gourmande.
      `;
      return;
    }

    if (intent === "triste") {
      result.innerHTML = `
        <strong>Oh 💛</strong><br>
        On peut partir sur une recette réconfortante. Par exemple : crêpes, fondants ou gâteau marbré.
      `;
      return;
    }

    if (intent === "fatigue") {
      result.innerHTML = `
        <strong>Je vois 😴</strong><br>
        Dans ce cas, on peut viser un truc simple et rapide. Par exemple : crêpes, burgers ou poké bowl.
      `;
    }
  }

  function renderRecommendation(query) {
    const normalized = normalize(query);
    const { concepts, negatives, recipeMentions, scored } = scoreRecipes(normalized);
    const specialIntent = detectSpecialIntent(normalized, recipeMentions);

    if (specialIntent) {
      renderSpecialResponse(specialIntent);
      return;
    }

    const available = scored.filter((recipe) => recipe.score > -15);
    const best = available[0] || scored[0];
    const second = available[1] || scored[1];

    if (!best) {
      result.innerHTML = `<strong>Aucune recommandation disponible.</strong>`;
      return;
    }

    const readableReasons = best.reasons
      .filter((reason) => reason !== "recette citée")
      .map(labelConcept);

    let html = `<strong>Je te conseille : ${best.name}</strong><br>`;

    if (recipeMentions.includes(best.key)) {
      html += `Tu as cité cette recette, donc je l’ai bien prise en compte.<br>`;
    }

    if (readableReasons.length) {
      html += `Ça correspond bien à : ${readableReasons.join(", ")}.<br>`;
    } else {
      html += `Je l’ai choisie comme meilleure option par rapport à ta demande.<br>`;
    }

    if (negatives.length) {
      html += `J’ai évité : ${negatives.join(", ")}.<br>`;
    }

    if (second && second.key !== best.key) {
      html += `Deuxième option : ${second.name}.<br>`;
    }

    html += `<br><a class="primary-btn" href="${best.url}">Voir cette recette</a>`;
    result.innerHTML = html;
  }

  button.addEventListener("click", () => {
    const value = input.value.trim();

    if (!value) {
      result.innerHTML = `<strong>Bonjour 👋</strong><br>Dis-moi ce que tu cherches, et je te proposerai la recette la plus adaptée.`;
      return;
    }

    result.innerHTML = `<strong>Recherche en cours...</strong>`;
    window.setTimeout(() => renderRecommendation(value), 350);
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      button.click();
    }
  });
}

  /* ==========================================================================
     PLANE ANIMATION
     ========================================================================== */
  function initPlaneAnimation() {
    const plane = document.getElementById("plane");
    if (!plane) return;

    let startTime = null;
    const duration = 10000;

    function animatePlane(timestamp) {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progress = elapsed / duration;

      if (progress >= 1) {
        plane.style.opacity = "0";
        return;
      }

      const x = progress * (window.innerWidth + 120) - 60;
      const y = window.innerHeight * 0.38 + Math.sin(progress * Math.PI * 1.4) * 70;

      const nextX = (progress + 0.001) * (window.innerWidth + 120) - 60;
      const nextY = window.innerHeight * 0.38 + Math.sin((progress + 0.001) * Math.PI * 1.4) * 70;

      const angleRad = Math.atan2(nextY - y, nextX - x);

      plane.style.opacity = "1";
      plane.style.left = `${x}px`;
      plane.style.top = `${y}px`;
      plane.style.transform = `translate(-50%, -50%) rotate(${angleRad}rad)`;

      requestAnimationFrame(animatePlane);
    }

    requestAnimationFrame(animatePlane);
  }

  /* ==========================================================================
     INGREDIENTS / PORTIONS
     ========================================================================== */
  function renderIngredients(recipeKey) {
    const recipe = recipeData[recipeKey];
    if (!recipe) return;

    const container = document.getElementById(recipe.targetId);
    const label = document.getElementById(recipe.labelId);
    if (!container || !label) return;

    const currentPortion = portions[recipeKey];
    label.textContent = `${currentPortion} ${recipe.label}`;
    container.innerHTML = "";

    recipe.items.forEach((item) => {
      const scaledAmount = (item.amount / recipe.base) * currentPortion;

      const card = document.createElement("div");
      card.className = "ingredient-card";

      const left = document.createElement("div");
      left.className = "ingredient-left";

      const emoji = document.createElement("span");
      emoji.className = "ingredient-emoji";
      emoji.textContent = item.emoji || "";

      const name = document.createElement("div");
      name.className = "ingredient-name";
      name.textContent = item.name;

      const amount = document.createElement("div");
      amount.className = "ingredient-amount";
      amount.textContent = `${formatAmount(scaledAmount)} ${item.unit}`;

      left.appendChild(emoji);
      left.appendChild(name);
      card.appendChild(left);
      card.appendChild(amount);
      container.appendChild(card);
    });
  }

  /* ==========================================================================
     TIMERS
     ========================================================================== */
  function updateTimerDisplay(displayId) {
    const display = document.getElementById(displayId);
    if (!display) return;

    const timer = timers[displayId];
    display.textContent = formatTime(timer ? timer.seconds : 0);
  }

  function playTimerSound() {
    try {
      const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
      audio.volume = 0.4;
      void audio.play();
    } catch {
      /* ignore */
    }
  }

  /* ==========================================================================
     CHECKLISTS
     ========================================================================== */
  function initChecklists() {
    const checklists = document.querySelectorAll(".checklist");

    checklists.forEach((checklist) => {
      const fillId = checklist.dataset.fill;
      const textId = checklist.dataset.text;
      const checkboxes = checklist.querySelectorAll('input[type="checkbox"]');
      const fill = fillId ? document.getElementById(fillId) : null;
      const text = textId ? document.getElementById(textId) : null;

      const updateChecklist = () => {
        const checked = Array.from(checkboxes).filter((checkbox) => checkbox.checked).length;
        const total = checkboxes.length;
        const percent = total > 0 ? (checked / total) * 100 : 0;

        if (fill) fill.style.width = `${percent}%`;
        if (text) text.textContent = `${checked} / ${total}`;

        if (total > 0 && checked === total) {
          showToast("🎉 Étapes terminées ! Bravo chef.");
        }
      };

      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", updateChecklist);
      });

      updateChecklist();
    });
  }

  /* ==========================================================================
     COUNTERS
     ========================================================================== */
  function initCounters() {
    const counters = document.querySelectorAll(".counter");

    const runCounter = (counter) => {
      const target = Number(counter.dataset.target || 0);
      if (target <= 0 || counter.dataset.counted === "true") return;

      counter.dataset.counted = "true";

      const duration = 1500;
      const steps = Math.min(target, 120);
      const increment = target / steps;
      const stepTime = Math.max(16, Math.floor(duration / steps));
      let current = 0;

      const interval = window.setInterval(() => {
        current += increment;

        if (current >= target) {
          counter.textContent = String(target);
          window.clearInterval(interval);
          return;
        }

        counter.textContent = String(Math.floor(current));
      }, stepTime);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => {
      if (counter.dataset.observed !== "true") {
        counter.dataset.observed = "true";
        observer.observe(counter);
      }
    });
  }

  /* ==========================================================================
     SCROLL REVEAL
     ========================================================================== */
  function revealOnScroll() {
    const elements = document.querySelectorAll(
      ".glass-card, .universe-card, .feature-box, .recipe-banner, .recipe-gallery-grid img"
    );

    const triggerBottom = window.innerHeight * 0.9;

    elements.forEach((element) => {
      if (element.getBoundingClientRect().top < triggerBottom) {
        element.classList.add("revealed");
      }
    });
  }

  /* ==========================================================================
     TILT EFFECT
     ========================================================================== */
  function initTilt() {
    if (!window.matchMedia("(min-width: 860px)").matches) return;

    const tiltCards = document.querySelectorAll(".tilt-card");

    tiltCards.forEach((card) => {
      if (card.dataset.tiltBound === "true") return;
      card.dataset.tiltBound = "true";

      card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
      });
    });
  }

  /* ==========================================================================
     LIGHTBOX
     ========================================================================== */
  function initLightbox() {
    const images = document.querySelectorAll(".lightboxable");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxClose = document.getElementById("lightboxClose");
    const lightboxBackdrop = document.querySelector(".lightbox-backdrop");

    if (!lightbox || !lightboxImage) return;

    const closeLightbox = () => {
      lightbox.classList.remove("open");
      body.style.overflow = "";

      window.setTimeout(() => {
        lightboxImage.src = "";
        lightboxImage.alt = "";
      }, 250);
    };

    images.forEach((image) => {
      image.addEventListener("click", () => {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt || "";
        lightbox.classList.add("open");
        body.style.overflow = "hidden";
      });
    });

    lightboxClose?.addEventListener("click", closeLightbox);
    lightboxBackdrop?.addEventListener("click", closeLightbox);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && lightbox.classList.contains("open")) {
        closeLightbox();
      }
    });
  }

  /* ==========================================================================
     LIQUID GLASS
     ========================================================================== */
  function initLiquidGlass() {
    const glassCards = document.querySelectorAll(".liquid-glass-card");
    if (!glassCards.length) return;

    glassCards.forEach((card) => {
      const specular = card.querySelector(".glass-specular");

      if (specular) {
        specular.style.transition = "background 0.25s ease";
        specular.style.background = `
          linear-gradient(
            145deg,
            rgba(255,255,255,0.30) 0%,
            rgba(255,255,255,0.12) 18%,
            rgba(255,255,255,0.03) 40%,
            transparent 60%
          )
        `;
      }

      card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (specular) {
          specular.style.background = `radial-gradient(
            circle at ${x}px ${y}px,
            rgba(255,255,255,0.22) 0%,
            rgba(255,255,255,0.10) 20%,
            rgba(255,255,255,0.02) 45%,
            transparent 65%
          )`;
        }
      });

      card.addEventListener("mouseleave", () => {
        if (specular) {
          specular.style.background = `
            linear-gradient(
              145deg,
              rgba(255,255,255,0.30) 0%,
              rgba(255,255,255,0.12) 18%,
              rgba(255,255,255,0.03) 40%,
              transparent 60%
            )
          `;
        }
      });
    });
  }

  /* ==========================================================================
     HERO PARALLAX
     ========================================================================== */
  function initHeroParallax() {
    const cards = document.querySelectorAll(".bento-card, .bento-badge");
    if (!cards.length) return;

    window.addEventListener("mousemove", (event) => {
      const x = (window.innerWidth / 2 - event.clientX) / 30;
      const y = (window.innerHeight / 2 - event.clientY) / 30;

      cards.forEach((card) => {
        const speed = Number(card.getAttribute("data-speed")) || 1;
        card.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    });
  }

  /* ==========================================================================
     SCROLL TOP BUTTON
     ========================================================================== */
  function initScrollTopButton() {
    const toggleVisibility = () => {
      if (!scrollTopBtn) return;
      scrollTopBtn.classList.toggle("show", window.scrollY > 400);
    };

    window.addEventListener("scroll", toggleVisibility);
    toggleVisibility();

    scrollTopBtn?.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ==========================================================================
     GLOBAL WINDOW FUNCTIONS
     ========================================================================== */
  window.changePortions = (recipeKey, delta) => {
    if (!(recipeKey in portions)) return;

    const nextValue = portions[recipeKey] + delta;

    if (nextValue < 1) {
      showToast("La portion minimum est de 1.");
      return;
    }

    if (nextValue > 24) {
      showToast("Maximum 24 portions pour garder une recette fiable.");
      return;
    }

    portions[recipeKey] = nextValue;
    renderIngredients(recipeKey);
  };

  window.resetPortions = (recipeKey) => {
    if (!recipeData[recipeKey]) return;

    portions[recipeKey] = recipeData[recipeKey].base;
    renderIngredients(recipeKey);
    showToast("Portions réinitialisées.");
  };

  window.toggleChoice = (button, outputId) => {
    if (!(button instanceof HTMLElement)) return;

    const group = button.parentElement;
    const output = document.getElementById(outputId);
    if (!group || !output) return;

    const buttons = group.querySelectorAll("button");
    const wasActive = button.classList.contains("active");

    buttons.forEach((btn) => btn.classList.remove("active"));

    if (!wasActive) {
      button.classList.add("active");
      output.textContent = button.textContent?.trim() || "Aucune";
    } else {
      output.textContent = "Aucune";
    }
  };

  window.toggleMultiChoice = (button, outputId) => {
    if (!(button instanceof HTMLElement)) return;

    const group = button.parentElement;
    const output = document.getElementById(outputId);
    if (!group || !output) return;

    button.classList.toggle("active");

    const activeButtons = group.querySelectorAll("button.active");
    const values = Array.from(activeButtons)
      .map((btn) => btn.textContent?.trim())
      .filter(Boolean);

    output.textContent = values.length ? values.join(", ") : "Aucune";
  };

  window.startTimer = (seconds, displayId) => {
    const safeSeconds = Math.max(0, Number(seconds) || 0);

    if (!timers[displayId]) {
      timers[displayId] = { seconds: 0, interval: null };
    }

    if (timers[displayId].interval) {
      window.clearInterval(timers[displayId].interval);
    }

    timers[displayId].seconds = safeSeconds;
    updateTimerDisplay(displayId);

    timers[displayId].interval = window.setInterval(() => {
      timers[displayId].seconds -= 1;

      if (timers[displayId].seconds <= 0) {
        timers[displayId].seconds = 0;
        updateTimerDisplay(displayId);
        window.clearInterval(timers[displayId].interval);
        timers[displayId].interval = null;
        showToast("⏰ Dring ! C'est prêt.");
        playTimerSound();
        return;
      }

      updateTimerDisplay(displayId);
    }, 1000);
  };

  window.resetTimer = (displayId) => {
    if (timers[displayId]?.interval) {
      window.clearInterval(timers[displayId].interval);
    }

    timers[displayId] = { seconds: 0, interval: null };
    updateTimerDisplay(displayId);
  };

  window.showToast = showToast;

  /* ==========================================================================
     AI CHEF RECOMMENDER
     ========================================================================== */
  function initAiChef() {
    const input = document.getElementById("aiChefInput");
    const button = document.getElementById("aiChefBtn");
    const result = document.getElementById("aiChefResult");

    if (!input || !button || !result) return;

    const recipeBrain = [
      {
        key: "cailles",
        name: "Cailles & Petits pois",
        url: "cailles.html",
        tags: ["viande", "raffine", "traditionnel", "francais", "sale", "plat", "familial", "moyen"]
      },
      {
        key: "crepes",
        name: "Crêpes gourmandes",
        url: "crepes.html",
        tags: ["dessert", "gouter", "rapide", "facile", "leger", "familial", "simple", "convivial"]
      },
      {
        key: "burgers",
        name: "Burgers garnis",
        url: "burger.html",
        tags: ["viande", "copieux", "gourmand", "rapide", "sale", "plat", "familial", "lourd", "convivial"]
      },
      {
        key: "fondants",
        name: "Fondants intenses",
        url: "fondant.html",
        tags: ["dessert", "chocolat", "gourmand", "lourd", "plaisir"]
      },
      {
        key: "marbre",
        name: "Gâteau marbré",
        url: "gateau-marbre.html",
        tags: ["dessert", "gouter", "familial", "simple", "leger"]
      },
      {
        key: "pokebowl",
        name: "Poké bowl hawaïen",
        url: "poke-bowl.html",
        tags: ["leger", "frais", "healthy", "equilibre", "rapide", "poisson", "sale", "plat", "sain", "familial"]
      }
    ];

    const lexicon = {
      leger: ["leger", "léger", "light", "digeste"],
      pas_trop_lourd: ["pas trop lourd", "pas lourd", "pas trop copieux", "assez leger", "assez léger"],
      lourd: ["lourd", "copieux", "gras", "qui cale", "consistant"],
      familial: ["famille", "familial", "convivial", "a plusieurs", "à plusieurs", "partager"],
      frais: ["frais", "froid", "rafraichissant", "rafraîchissant"],
      rapide: ["rapide", "vite", "express", "simple", "ce soir"],
      gourmand: ["gourmand", "gourmande", "plaisir", "reconfortant", "réconfortant"],
      chocolat: ["chocolat", "choco", "cacao"],
      viande: ["viande", "boeuf", "bœuf", "carne", "burger"],
      poisson: ["poisson", "saumon"],
      dessert: ["dessert", "sucre", "sucré", "gouter", "goûter", "gateau", "gâteau"],
      sale: ["sale", "salé", "repas", "plat"],
      raffine: ["raffine", "raffiné", "chic", "elegant", "élégant"]
    };

    function normalize(text) {
      return String(text || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    }

    function extractConcepts(text) {
      const normalized = normalize(text);
      const found = new Set();

      Object.entries(lexicon).forEach(([concept, words]) => {
        const matched = words.some((word) => normalized.includes(normalize(word)));
        if (matched) found.add(concept);
      });

      return [...found];
    }

    function scoreRecipes(query) {
      const normalized = normalize(query);
      const concepts = extractConcepts(normalized);

      const scored = recipeBrain.map((recipe) => {
        let score = 0;
        const reasons = [];

        concepts.forEach((concept) => {
          if (recipe.tags.includes(concept)) {
            score += 3;
            reasons.push(concept);
          }
        });

        if (concepts.includes("familial")) {
          if (recipe.tags.includes("familial")) score += 4;
          if (recipe.tags.includes("convivial")) score += 2;
        }

        if (concepts.includes("leger")) {
          if (recipe.tags.includes("leger")) score += 5;
          if (recipe.tags.includes("lourd")) score -= 5;
          if (recipe.tags.includes("moyen")) score -= 1;
        }

        if (concepts.includes("pas_trop_lourd")) {
          if (recipe.tags.includes("leger")) score += 6;
          if (recipe.tags.includes("moyen")) score += 1;
          if (recipe.tags.includes("lourd")) score -= 7;
          if (recipe.tags.includes("raffine")) score -= 1;
        }

        if (concepts.includes("lourd")) {
          if (recipe.tags.includes("lourd")) score += 5;
          if (recipe.tags.includes("leger")) score -= 4;
        }

        if (normalized.includes("repas")) {
          if (recipe.tags.includes("plat")) score += 2;
          if (recipe.tags.includes("dessert")) score -= 2;
        }

        if (normalized.includes("ce soir") || normalized.includes("soir")) {
          if (recipe.tags.includes("rapide")) score += 2;
          if (recipe.tags.includes("leger")) score += 2;
        }

        if (normalized.includes("famille") && concepts.includes("pas_trop_lourd")) {
          if (recipe.key === "crepes") score += 4;
          if (recipe.key === "pokebowl") score += 4;
          if (recipe.key === "burgers") score -= 2;
          if (recipe.key === "cailles") score -= 3;
        }

        return {
          ...recipe,
          score,
          reasons: [...new Set(reasons)]
        };
      });

      scored.sort((a, b) => b.score - a.score);
      return { concepts, scored };
    }

    function labelConcept(concept) {
      const labels = {
        leger: "léger",
        pas_trop_lourd: "pas trop lourd",
        lourd: "copieux",
        familial: "familial",
        frais: "frais",
        rapide: "rapide",
        gourmand: "gourmand",
        chocolat: "chocolat",
        viande: "viande",
        poisson: "poisson",
        dessert: "dessert",
        sale: "salé",
        raffine: "raffiné"
      };
      return labels[concept] || concept;
    }

    function renderRecommendation(query) {
      const { concepts, scored } = scoreRecipes(query);
      const best = scored[0];
      const second = scored[1];

      if (!best) {
        result.innerHTML = `<strong>Aucune recommandation disponible.</strong>`;
        return;
      }

      const readableReasons = best.reasons.map(labelConcept);

      let html = `<strong>Je te conseille : ${best.name}</strong><br>`;

      if (readableReasons.length) {
        html += `Ça correspond bien à : ${readableReasons.join(", ")}.<br>`;
      } else {
        html += `Je l’ai choisie comme recommandation polyvalente.<br>`;
      }

      if (second) {
        html += `Deuxième option : ${second.name}.<br>`;
      }

      html += `<br><a class="primary-btn" href="${best.url}">Voir cette recette</a>`;
      result.innerHTML = html;
    }

    button.addEventListener("click", () => {
      const value = input.value.trim();

      if (!value) {
        result.innerHTML = `<strong>Bonjour 👋</strong><br>Dis-moi ce que tu cherches, et je te proposerai la recette la plus adaptée.`;
        return;
      }

      result.innerHTML = `<strong>Recherche en cours...</strong>`;
      window.setTimeout(() => renderRecommendation(value), 350);
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        button.click();
      }
    });
  }

  /* ==========================================================================
     AI WIDGET
     ========================================================================== */
  function initAiWidget() {
    const aiFab = document.getElementById("aiFab");
    const aiWidget = document.getElementById("aiWidget");
    const aiWidgetClose = document.getElementById("aiWidgetClose");
    const aiWidgetExpand = document.getElementById("aiWidgetExpand");

    if (!aiFab || !aiWidget) return;

    function openWidget() {
      aiWidget.classList.remove("hidden");
      aiFab.classList.add("hidden");
    }

    function closeWidget() {
      aiWidget.classList.add("hidden");
      aiWidget.classList.remove("expanded");
      aiFab.classList.remove("hidden");
    }

    function toggleExpand() {
      aiWidget.classList.toggle("expanded");

      if (aiWidgetExpand) {
        aiWidgetExpand.textContent = aiWidget.classList.contains("expanded") ? "⤡" : "⤢";
      }
    }

    aiFab.addEventListener("click", openWidget);
    aiWidgetClose?.addEventListener("click", closeWidget);
    aiWidgetExpand?.addEventListener("click", toggleExpand);
  }

  /* ==========================================================================
     GLOBAL EVENTS
     ========================================================================== */
  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("error", () => {
    hideLoader();
  });

  /* ==========================================================================
     INIT
     ========================================================================== */
  initTheme();
  initNavigation();
  initSearch();
  initPlaneAnimation();
  initChecklists();
  initCounters();
  initTilt();
  initLightbox();
  initHeroParallax();
  initLiquidGlass();
  initScrollTopButton();
  initAiChef();
  initAiWidget();

  Object.keys(recipeData).forEach(renderIngredients);
  revealOnScroll();

  window.setTimeout(hideLoader, 900);
});
