aimport { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import {
  getFirestore,
  doc,
  onSnapshot,
  runTransaction
} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCtBvjtu_3IocLNNwDStjaJ7UfVOBS5zVI",
  authDomain: "le-restaurant-d-antoine.firebaseapp.com",
  projectId: "le-restaurant-d-antoine",
  storageBucket: "le-restaurant-d-antoine.firebasestorage.app",
  messagingSenderId: "84094296690",
  appId: "1:84094296690:web:53b0256eb7278b9a2a58eb",
  measurementId: "G-4H6MFL9NGV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const RECIPE_KEYS = ["cailles", "crepes", "burgers", "fondants", "marbre", "pokebowl"];

const recipesMeta = {
  cailles: { name: "Cailles", url: "cailles.html", emoji: "🍗" },
  crepes: { name: "Crêpes", url: "crepes.html", emoji: "🥞" },
  burgers: { name: "Burger maison", url: "burger.html", emoji: "🍔" },
  fondants: { name: "Fondant au chocolat", url: "fondant.html", emoji: "🍫" },
  marbre: { name: "Gâteau marbré", url: "gateau-marbre.html", emoji: "🍰" },
  pokebowl: { name: "Poké Bowl", url: "poke-bowl.html", emoji: "🥗" }
};

const STORAGE_KEY = "antoine-user-liked-recipes";
const liveLikes = {};

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
  } catch {}
}

function getUserLikedRecipes() {
  try {
    const raw = safeGetStorage(STORAGE_KEY, "[]");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveUserLikedRecipes(likedRecipes) {
  safeSetStorage(STORAGE_KEY, JSON.stringify(likedRecipes));
}

function hasUserLiked(recipe) {
  return getUserLikedRecipes().includes(recipe);
}

function showToast(message) {
  if (typeof window.showToast === "function") {
    window.showToast(message);
  }
}

function updateLikeDisplay(recipe) {
  const countEl = document.getElementById(`likes-${recipe}`);
  const button = document.querySelector(`[onclick="toggleLike('${recipe}')"]`);
  const isLiked = hasUserLiked(recipe);
  const count = liveLikes[recipe] || 0;

  if (countEl) {
    countEl.textContent = count;
  }

  if (button) {
    button.classList.toggle("liked", isLiked);
    button.setAttribute("aria-pressed", isLiked ? "true" : "false");
    button.title = isLiked ? "Retirer mon like" : "Liker cette recette";
  }
}

function getTopRecipe() {
  let top = null;
  let max = 0;

  RECIPE_KEYS.forEach((recipe) => {
    const score = liveLikes[recipe] || 0;
    if (score > max) {
      max = score;
      top = recipe;
    }
  });

  return top;
}

function renderTopRecipe() {
  const container = document.getElementById("topRecipe");
  if (!container) return;

  const top = getTopRecipe();

  if (!top || !recipesMeta[top]) {
    container.innerHTML = `
      <div class="top-recipe-card">
        <div class="top-recipe-left">
          <div class="top-recipe-emoji">🏆</div>
          <div class="top-recipe-text">
            <span class="top-recipe-kicker">Recette mise en avant</span>
            <h4>Aucune recette favorite pour le moment</h4>
            <p>Les likes des visiteurs feront apparaître la recette star ici.</p>
          </div>
        </div>
      </div>
    `;
    return;
  }

  const recipe = recipesMeta[top];
  const count = liveLikes[top] || 0;

  container.innerHTML = `
    <a href="${recipe.url}" class="top-recipe-card">
      <div class="top-recipe-left">
        <div class="top-recipe-emoji">${recipe.emoji}</div>
        <div class="top-recipe-text">
          <span class="top-recipe-kicker">Recette la plus aimée</span>
          <h4>${recipe.name}</h4>
          <p>La favorite actuelle des visiteurs.</p>
        </div>
      </div>
      <div class="top-recipe-badge">❤️ ${count} like${count > 1 ? "s" : ""}</div>
    </a>
  `;
}

function listenLikes(recipe) {
  const ref = doc(db, "likes", recipe);

  onSnapshot(ref, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data();
      liveLikes[recipe] = Number(data.count) || 0;
    } else {
      liveLikes[recipe] = 0;
    }

    updateLikeDisplay(recipe);
    renderTopRecipe();
  });
}

async function toggleLike(recipe) {
  const ref = doc(db, "likes", recipe);
  const likedRecipes = getUserLikedRecipes();
  const alreadyLiked = likedRecipes.includes(recipe);

  try {
    await runTransaction(db, async (transaction) => {
      const snap = await transaction.get(ref);

      if (!snap.exists()) {
        transaction.set(ref, { count: alreadyLiked ? 0 : 1 });
        return;
      }

      const current = Number(snap.data().count) || 0;
      const next = alreadyLiked ? Math.max(0, current - 1) : current + 1;

      transaction.update(ref, { count: next });
    });

    if (alreadyLiked) {
      const nextLiked = likedRecipes.filter((item) => item !== recipe);
      saveUserLikedRecipes(nextLiked);
      showToast("Like retiré.");
    } else {
      likedRecipes.push(recipe);
      saveUserLikedRecipes(likedRecipes);
      showToast("Recette likée ❤️");
    }

    updateLikeDisplay(recipe);
  } catch (error) {
    console.error("Erreur Firebase likes :", error);
    showToast("Impossible de mettre à jour le like.");
  }
}

window.toggleLike = toggleLike;

RECIPE_KEYS.forEach((recipe) => {
  liveLikes[recipe] = 0;
  listenLikes(recipe);
  updateLikeDisplay(recipe);
});

renderTopRecipe();