/**
 * Livre d'or (Firestore : collection "reviews" avec les champs
 * name, message, rating, date).
 */
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
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

const form = document.getElementById("reviewForm");
const list = document.getElementById("reviewsList");
const summary = document.getElementById("ratingSummary");
const moreBtn = document.getElementById("moreReviews");
const LAST_POST_KEY = "antoine-dernier-avis";
const PAGE_SIZE = 8;
let allReviews = [];
let shown = PAGE_SIZE;

window.__reviewsModuleLoaded = true;

const toast = (message) => window.Antoine?.toast?.(message);

function starsText(n) {
  const rating = Math.max(0, Math.min(5, Math.round(n)));
  return `${"★".repeat(rating)}${"☆".repeat(5 - rating)}`;
}

function initials(name) {
  return (name || "?")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() || "")
    .join("");
}

function renderSummary() {
  if (!summary) return;
  const rated = allReviews.filter((r) => Number(r.rating) >= 1);
  if (!rated.length) {
    summary.innerHTML = `<p class="muted">Pas encore de note : sois le premier ou la première à donner ton avis !</p>`;
    return;
  }
  const avg = rated.reduce((s, r) => s + Number(r.rating), 0) / rated.length;
  const dist = [5, 4, 3, 2, 1].map((n) => ({ n, c: rated.filter((r) => Math.round(Number(r.rating)) === n).length }));
  summary.innerHTML = `
    <div class="rating-summary">
      <div>
        <div class="rating-big">${avg.toFixed(1).replace(".", ",")}</div>
        <div class="rating-stars" aria-label="Note moyenne ${avg.toFixed(1)} sur 5">${starsText(avg)}</div>
        <small class="muted">${rated.length} avis</small>
      </div>
      <div class="rating-bars">
        ${dist
          .map(
            (d) => `<div class="rating-bar"><span>${d.n}★</span>
              <div class="progress"><i style="--p:${d.c / rated.length}"></i></div><span>${d.c}</span></div>`
          )
          .join("")}
      </div>
    </div>`;
}

function renderList() {
  if (!list) return;
  list.innerHTML = "";
  if (!allReviews.length) {
    list.innerHTML = `<div class="empty-state"><span class="big">📖</span><strong>Le livre d'or attend sa première page</strong>
      <span>Teste une recette et raconte-nous comment ça s'est passé !</span></div>`;
    if (moreBtn) moreBtn.hidden = true;
    return;
  }
  allReviews.slice(0, shown).forEach((review, i) => {
    const item = document.createElement("article");
    item.className = "review";
    item.style.animationDelay = `${Math.min(i, 8) * 50}ms`;

    const head = document.createElement("div");
    head.className = "review-head";

    const avatar = document.createElement("span");
    avatar.className = "avatar";
    avatar.textContent = initials(review.name);

    const who = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = review.name || "Anonyme";
    const date = document.createElement("small");
    date.textContent =
      typeof review.date?.toDate === "function"
        ? review.date.toDate().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
        : "À l'instant";
    who.append(name, date);

    const stars = document.createElement("span");
    stars.className = "rating-stars";
    stars.textContent = starsText(Number(review.rating) || 0);
    stars.setAttribute("aria-label", `${Number(review.rating) || 0} sur 5`);

    const message = document.createElement("p");
    message.textContent = review.message || "";

    head.append(avatar, who, stars);
    item.append(head, message);
    list.appendChild(item);
  });
  if (moreBtn) moreBtn.hidden = shown >= allReviews.length;
}

moreBtn?.addEventListener("click", () => {
  shown += PAGE_SIZE;
  renderList();
});

if (list) {
  onSnapshot(
    query(collection(db, "reviews"), orderBy("date", "desc")),
    (snapshot) => {
      allReviews = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      renderSummary();
      renderList();
    },
    (error) => {
      console.error("Avis indisponibles :", error);
      list.innerHTML = `<div class="empty-state"><span class="big">📡</span><strong>Impossible de charger les avis</strong><span>Réessaie dans quelques instants.</span></div>`;
    }
  );
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const nameInput = form.querySelector("#reviewName");
  const messageInput = form.querySelector("#reviewMessage");
  const ratingInput = form.querySelector('input[name="rating"]:checked');
  const honeypot = form.querySelector('input[name="site"]');
  const submit = form.querySelector('button[type="submit"]');

  const name = nameInput.value.trim();
  const message = messageInput.value.trim();
  const rating = Number(ratingInput?.value || 0);

  if (honeypot?.value) return;
  if (!name || !message || !rating) {
    toast("⚠️ Il manque ton prénom, ton message ou ta note.");
    return;
  }
  if (message.length < 10) {
    toast("Ton message est un peu court : dis-nous en un peu plus !");
    return;
  }
  const last = Number(localStorage.getItem(LAST_POST_KEY) || 0);
  if (Date.now() - last < 60_000) {
    toast("Merci ! Attends une petite minute avant de publier un autre avis.");
    return;
  }

  submit.disabled = true;
  try {
    await addDoc(collection(db, "reviews"), {
      name: name.slice(0, 40),
      message: message.slice(0, 600),
      rating,
      date: serverTimestamp()
    });
    try {
      localStorage.setItem(LAST_POST_KEY, String(Date.now()));
    } catch {
      /* stockage indisponible */
    }
    form.reset();
    form.dispatchEvent(new Event("input"));
    toast("✅ Merci ! Ton avis est publié dans le livre d'or.");
    window.Antoine?.confetti?.(90);
  } catch (error) {
    console.error("Erreur Firebase reviews :", error);
    toast("Impossible de publier l'avis pour le moment.");
  } finally {
    submit.disabled = false;
  }
});
