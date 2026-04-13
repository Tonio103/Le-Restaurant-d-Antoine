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

const reviewsList = document.getElementById("reviewsList");
const submitReviewBtn = document.getElementById("submitReview");
const ratingValueDisplay = document.getElementById("ratingValue");
const stars = document.querySelectorAll("#stars span");

let currentRating = 0;

function showToast(message) {
  if (typeof window.showToast === "function") {
    window.showToast(message);
  }
}

function setRating(value) {
  currentRating = value;

  if (ratingValueDisplay) {
    ratingValueDisplay.textContent = String(value);
  }

  stars.forEach((star, index) => {
    star.classList.toggle("active", index < value);
  });
}

function renderReviews(reviews) {
  if (!reviewsList) return;

  reviewsList.innerHTML = "";

  if (!reviews.length) {
    const empty = document.createElement("div");
    empty.className = "review-item empty-review";

    const title = document.createElement("strong");
    title.textContent = "Aucun avis pour le moment";

    const text = document.createElement("p");
    text.textContent = "Sois le premier à tester les recettes et à donner ton avis au chef Antoine !";

    empty.appendChild(title);
    empty.appendChild(text);
    reviewsList.appendChild(empty);
    return;
  }

  reviews.forEach((review) => {
    const item = document.createElement("div");
    item.className = "review-item";

    const header = document.createElement("div");
    header.className = "review-header-flex";

    const name = document.createElement("strong");
    name.textContent = review.name || "Anonyme";

    const date = document.createElement("span");
    date.className = "review-date";

    let displayDate = "Récemment";
    if (review.date?.toDate instanceof Function) {
      displayDate = review.date.toDate().toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    }

    date.textContent = displayDate;

    const starsLine = document.createElement("div");
    starsLine.className = "review-stars";
    const rating = Math.max(0, Math.min(5, Number(review.rating) || 0));
    starsLine.textContent = `${"★".repeat(rating)}${"☆".repeat(5 - rating)}`;

    const message = document.createElement("p");
    message.className = "review-text-content";
    message.textContent = review.message || "";

    header.appendChild(name);
    header.appendChild(date);
    item.appendChild(header);
    item.appendChild(starsLine);
    item.appendChild(message);
    reviewsList.appendChild(item);
  });
}

function listenReviews() {
  if (!reviewsList) return;

  const reviewsRef = collection(db, "reviews");
  const reviewsQuery = query(reviewsRef, orderBy("date", "desc"));

  onSnapshot(reviewsQuery, (snapshot) => {
    const reviews = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    renderReviews(reviews);
  });
}

function initReviews() {
  if (!reviewsList && !submitReviewBtn) return;

  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      setRating(index + 1);
    });
  });

  submitReviewBtn?.addEventListener("click", async () => {
    const nameInput = document.getElementById("reviewName");
    const messageInput = document.getElementById("reviewMessage");

    if (!(nameInput instanceof HTMLInputElement) || !(messageInput instanceof HTMLTextAreaElement)) {
      return;
    }

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message || currentRating === 0) {
      showToast("⚠️ Merci de compléter le prénom, le message et la note.");
      return;
    }

    try {
      await addDoc(collection(db, "reviews"), {
        name,
        message,
        rating: currentRating,
        date: serverTimestamp()
      });

      nameInput.value = "";
      messageInput.value = "";
      setRating(0);

      showToast("✅ Votre avis a été publié avec succès !");
    } catch (error) {
      console.error("Erreur Firebase reviews :", error);
      showToast("Impossible de publier l'avis.");
    }
  });

  listenReviews();
}

window.setRating = setRating;

initReviews();