/**
 * Likes des recettes (Firestore : collection "likes", un document par recette
 * avec un champ "count"). Les likes de chaque visiteur sont mémorisés dans le
 * navigateur pour qu'il puisse retirer son like.
 */
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
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

const RECIPE_KEYS = (window.RECETTES || []).map((r) => r.key);
const STORAGE_KEY = "antoine-user-liked-recipes";
const liveLikes = {};
const pending = new Set();

function getUserLikedRecipes() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveUserLikedRecipes(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* stockage indisponible */
  }
}

function toast(message) {
  window.Antoine?.toast?.(message);
}

function applyToDom(root = document) {
  const liked = getUserLikedRecipes();
  root.querySelectorAll("[data-like-count]").forEach((node) => {
    const key = node.dataset.likeCount;
    const text = String(liveLikes[key] ?? "–");
    if (key in liveLikes && node.textContent !== text) node.textContent = text;
  });
  root.querySelectorAll("[data-like]").forEach((button) => {
    const isLiked = liked.includes(button.dataset.like);
    button.classList.toggle("is-liked", isLiked);
    button.setAttribute("aria-pressed", String(isLiked));
    button.title = isLiked ? "Retirer mon like" : "Liker cette recette";
  });
  return liked;
}

function updateDisplay() {
  const liked = applyToDom();
  document.dispatchEvent(new CustomEvent("antoine:likes", { detail: { counts: { ...liveLikes }, liked } }));
}

function listen(recipe) {
  onSnapshot(
    doc(db, "likes", recipe),
    (snapshot) => {
      liveLikes[recipe] = snapshot.exists() ? Number(snapshot.data().count) || 0 : 0;
      updateDisplay();
    },
    (error) => console.warn("Likes indisponibles :", error)
  );
}

async function toggleLike(recipe) {
  if (!RECIPE_KEYS.includes(recipe)) {
    toast("Cette recette n'est pas reconnue.");
    return;
  }
  if (pending.has(recipe)) return;
  pending.add(recipe);

  const ref = doc(db, "likes", recipe);
  const liked = getUserLikedRecipes();
  const alreadyLiked = liked.includes(recipe);

  try {
    await runTransaction(db, async (transaction) => {
      const snap = await transaction.get(ref);
      if (!snap.exists()) {
        transaction.set(ref, { count: alreadyLiked ? 0 : 1 });
        return;
      }
      const current = Number(snap.data().count) || 0;
      transaction.update(ref, { count: alreadyLiked ? Math.max(0, current - 1) : current + 1 });
    });

    if (alreadyLiked) {
      saveUserLikedRecipes(liked.filter((item) => item !== recipe));
      toast("Like retiré.");
    } else {
      saveUserLikedRecipes([...liked, recipe]);
      toast("Merci ! Recette likée ❤️");
    }
    updateDisplay();
  } catch (error) {
    console.error("Erreur Firebase likes :", error);
    toast("Impossible de mettre à jour le like pour le moment.");
  } finally {
    pending.delete(recipe);
  }
}

window.toggleLike = toggleLike;
window.antoineLikesState = {
  counts: liveLikes,
  isLiked: (key) => getUserLikedRecipes().includes(key),
  refresh: updateDisplay
};

RECIPE_KEYS.forEach(listen);
updateDisplay();

// Les boutons créés plus tard (mode cuisine, assistant…) reçoivent leur état.
const SELECTOR = "[data-like], [data-like-count]";
new MutationObserver((mutations) => {
  const hasLikeNode = mutations.some((m) =>
    [...m.addedNodes].some((n) => n.nodeType === 1 && (n.matches(SELECTOR) || n.querySelector(SELECTOR)))
  );
  if (hasLikeNode) applyToDom();
}).observe(document.body, { childList: true, subtree: true });
