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
  function initSearch() {
    if (!searchInput) return;

    const suggestionsBox = document.getElementById("searchSuggestions");
    if (!suggestionsBox) return;

    const recipeRoutes = [
      { label: "Cailles", keywords: ["caille", "cailles", "petits pois"], url: "cailles.html" },
      { label: "Crêpes", keywords: ["crepe", "crepes", "crêpe", "crêpes"], url: "crepes.html" },
      { label: "Burgers", keywords: ["burger", "burgers", "hamburger"], url: "burger.html" },
      { label: "Fondants", keywords: ["fondant", "fondants", "chocolat"], url: "fondant.html" },
      { label: "Marbré", keywords: ["marbre", "marbré", "gateau marbre", "gâteau marbré"], url: "gateau-marbre.html" },
      { label: "Poké bowl", keywords: ["poke", "pokebowl", "poké", "poké bowl", "poke bowl"], url: "poke-bowl.html" }
    ];

    function hideSuggestions() {
      suggestionsBox.style.display = "none";
      suggestionsBox.innerHTML = "";
    }

    function showSuggestions(results) {
      suggestionsBox.innerHTML = "";

      if (!results.length) {
        hideSuggestions();
        return;
      }

      results.forEach((recipe) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "search-suggestion-item";
        button.innerHTML = `🍽️ ${recipe.label}`;

        button.addEventListener("click", () => {
          window.location.href = recipe.url;
        });

        suggestionsBox.appendChild(button);
      });

      suggestionsBox.style.display = "block";
    }

    searchInput.addEventListener("input", () => {
      const value = normalizeText(searchInput.value);

      if (!value) {
        hideSuggestions();
        return;
      }

      const results = recipeRoutes.filter((recipe) =>
        normalizeText(recipe.label).includes(value) ||
        recipe.keywords.some((keyword) => normalizeText(keyword).includes(value))
      );

      showSuggestions(results);
    });

    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        hideSuggestions();
      }
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (target !== searchInput && !suggestionsBox.contains(target)) {
        hideSuggestions();
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
        tags: [
          "viande", "raffine", "traditionnel", "francais", "sale",
          "plat", "fete", "dimanche", "familial", "plus long","familial"
        ]
      },
      {
        key: "crepes",
        name: "Crêpes gourmandes",
        url: "crepes.html",
        tags: [
          "sucre", "dessert", "gouter", "rapide", "facile",
          "leger", "reconfortant", "simple", "douceur","familial"
        ]
      },
      {
        key: "burgers",
        name: "Burgers garnis",
        url: "burger.html",
        tags: [
          "viande", "copieux", "gourmand", "rapide", "sale",
          "plat", "plaisir", "genereux", "consistant","familial","lourd"
        ]
      },
      {
        key: "fondants",
        name: "Fondants intenses",
        url: "fondant.html",
        tags: [
          "dessert", "sucre", "chocolat", "gourmand",
          "intense", "plaisir", "reconfortant","lourd"
        ]
      },
      {
        key: "marbre",
        name: "Gâteau marbré",
        url: "gateau-marbre.html",
        tags: [
          "dessert", "sucre", "gouter", "moelleux",
          "familial", "simple", "classique"
        ]
      },
      {
        key: "pokebowl",
        name: "Poké bowl hawaïen",
        url: "poke-bowl.html",
        tags: [
          "leger", "frais", "healthy", "equilibre", "rapide",
          "poisson", "sale", "plat", "ete", "sain","leger"
        ]
      }
    ];

    const lexicon = {
      leger: ["leger", "léger", "light", "sain", "healthy", "pas lourd"],
      frais: ["frais", "frais", "froid", "rafraichissant", "rafraîchissant"],
      rapide: ["rapide", "vite", "express", "pas trop long", "simple", "ce soir"],
      gourmand: ["gourmand", "gourmande", "plaisir", "ultra bon", "reconfortant", "réconfortant"],
      chocolat: ["chocolat", "choco", "cacao"],
      viande: ["viande", "boeuf", "bœuf", "carné", "burger"],
      poisson: ["poisson", "saumon", "poisson cru"],
      dessert: ["dessert", "sucre", "sucré", "gouter", "goûter", "gateau", "gâteau"],
      sale: ["sale", "salé", "repas", "plat"],
      copieux: ["copieux", "consistant", "qui cale", "gros repas"],
      facile: ["facile", "simple", "sans prise de tete", "sans prise de tête"],
      raffine: ["raffine", "raffiné", "chic", "élégant", "elegant"],
      familial: ["familial", "famille", "convivial"],
      ete: ["ete", "été", "soleil", "estival"],
      familial: ["famille", "familial", "convivial", "repas famille", "a plusieurs"],
      leger: ["leger", "léger", "light", "pas lourd", "digeste"],
      lourd: ["lourd", "copieux", "gras", "qui cale", "consistant"]
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

    function detectNegations(text) {
      const negatives = [];
      const patterns = [
        /sans ([a-zA-Zàâçéèêëîïôûùüÿñæœ -]+)/g,
        /pas de ([a-zA-Zàâçéèêëîïôûùüÿñæœ -]+)/g,
        /je ne veux pas de ([a-zA-Zàâçéèêëîïôûùüÿñæœ -]+)/g
      ];

      for (const pattern of patterns) {
        let match;
        while ((match = pattern.exec(text)) !== null) {
          negatives.push(normalize(match[1]));
        }
      }

      return negatives;
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
      const negatives = detectNegations(normalized);

      const scored = recipeBrain.map((recipe) => {
        let score = 0;
        const reasons = [];
        const penalties = [];

        concepts.forEach((concept) => {
          if (recipe.tags.includes(concept)) {
            score += 3;
            reasons.push(concept);
          }
        });
// gestion léger / lourd
if (concepts.includes("leger")) {
  if (recipe.tags.includes("leger")) score += 4;
  if (recipe.tags.includes("lourd")) score -= 4;
}

if (concepts.includes("lourd")) {
  if (recipe.tags.includes("lourd")) score += 4;
  if (recipe.tags.includes("leger")) score -= 4;
}
        if (normalized.includes("soir") && recipe.tags.includes("rapide")) {
          score += 2;
          reasons.push("rapide");
        }
if (normalized.includes("famille")) {
  if (recipe.tags.includes("familial")) score += 5;
  if (recipe.tags.includes("plat")) score += 3;
  if (recipe.tags.includes("dessert")) score -= 2;
}
        if (normalized.includes("repas") && recipe.tags.includes("plat")) {
          score += 2;
          reasons.push("plat");
        }

        if ((normalized.includes("envie") || normalized.includes("plaisir")) && recipe.tags.includes("gourmand")) {
          score += 2;
          reasons.push("gourmand");
        }

        negatives.forEach((negative) => {
          const negConcepts = extractConcepts(negative);

          negConcepts.forEach((negConcept) => {
            if (recipe.tags.includes(negConcept)) {
              score -= 5;
              penalties.push(negConcept);
            }
          });

          if (recipe.tags.some((tag) => negative.includes(tag))) {
            score -= 4;
            penalties.push(negative);
          }
        });

        if (!concepts.length) {
          score += recipe.key === "pokebowl" ? 1 : 0;
        }

        return {
          ...recipe,
          score,
          reasons: [...new Set(reasons)],
          penalties: [...new Set(penalties)]
        };
      });

      scored.sort((a, b) => b.score - a.score);
      return { concepts, negatives, scored };
    }

    function labelConcept(concept) {
      const labels = {
        leger: "léger",
        frais: "frais",
        rapide: "rapide",
        gourmand: "gourmand",
        chocolat: "chocolat",
        viande: "viande",
        poisson: "poisson",
        dessert: "dessert",
        sale: "salé",
        copieux: "copieux",
        facile: "facile",
        raffine: "raffiné",
        familial: "familial",
        ete: "esprit d’été"
      };
      return labels[concept] || concept;
    }

    function renderRecommendation(query) {
      const { concepts, negatives, scored } = scoreRecipes(query);
      const best = scored[0];
      const second = scored[1];

      if (!best) {
        result.innerHTML = `<strong>Aucune recommandation disponible.</strong>`;
        return;
      }

      const readableReasons = best.reasons.map(labelConcept);
      const readableNegatives = negatives.map((item) => item.trim()).filter(Boolean);

      let html = `
        <strong>Je te conseille : ${best.name}</strong><br>
      `;

      if (readableReasons.length) {
        html += `Ça correspond bien à : ${readableReasons.join(", ")}.<br>`;
      } else {
        html += `Je l’ai choisie comme recommandation polyvalente.<br>`;
      }

      if (readableNegatives.length) {
        html += `J’ai aussi pris en compte : ${readableNegatives.join(", ")}.<br>`;
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
  window.setTimeout(() => renderRecommendation(value), 500);
});
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        button.click();
      }
    });
  }
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
}  /* ==========================================================================
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
