/**
 * MEMORY DU CHEF — retrouve les paires de plats de la maison.
 */
(function () {
  "use strict";

  const A = window.Antoine;
  const grid = document.getElementById("memGrid");
  if (!A || !grid) return;

  const LEVELS = {
    facile: { label: "Facile", pairs: 6, cols: 4 },
    normal: { label: "Normal", pairs: 8, cols: 4 },
    chef: { label: "Chef", pairs: 10, cols: 5 }
  };

  const ui = {
    moves: document.getElementById("memMoves"),
    pairs: document.getElementById("memPairs"),
    time: document.getElementById("memTime"),
    best: document.getElementById("memBest"),
    levels: document.getElementById("memLevels"),
    overlay: document.getElementById("memOverlay")
  };

  const BACK = `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-linecap="round" aria-hidden="true">
    <path d="M8 36a16 16 0 0 1 32 0" stroke-width="3.2" fill="currentColor" fill-opacity=".15"/>
    <path d="M5 37h38" stroke-width="3.6"/><circle cx="24" cy="17.5" r="2.4" fill="currentColor" stroke="none"/></svg>`;

  let level = A.store.get("antoine-memory-niveau", "normal");
  if (!LEVELS[level]) level = "normal";
  let state = null;

  function shuffle(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function fmtTime(s) {
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  }

  function bump(node) {
    node.classList.remove("bump");
    void node.offsetWidth;
    node.classList.add("bump");
  }

  function bestKey() {
    return `antoine-memory-${level}`;
  }

  function renderBest() {
    const best = Number(A.store.get(bestKey(), 0));
    ui.best.textContent = best ? `${best} coups` : "–";
  }

  function renderLevels() {
    ui.levels.innerHTML = Object.entries(LEVELS)
      .map(([key, l]) => `<button class="chip" type="button" data-level="${key}" aria-pressed="${key === level}">${l.label} · ${l.pairs} paires</button>`)
      .join("");
  }

  function start() {
    const cfg = LEVELS[level];
    // Les cartes utilisent les vraies photos ; les recettes illustrées complètent si besoin.
    const avecPhoto = A.recettes.filter((r) => r.images?.length);
    const pool = avecPhoto.length >= cfg.pairs ? avecPhoto : A.recettes;
    const dishes = shuffle(pool).slice(0, cfg.pairs);
    const deck = shuffle(dishes.flatMap((r) => [r, r]));
    clearInterval(state?.clock);
    state = { first: null, lock: false, moves: 0, found: 0, seconds: 0, clock: null, started: false, total: cfg.pairs };
    grid.style.setProperty("--cols", cfg.cols);
    grid.innerHTML = deck
      .map(
        (r, i) => `<button class="memory-card" type="button" data-key="${r.key}" data-index="${i}" aria-label="Carte ${i + 1}, face cachée">
          <span class="memory-inner">
            <span class="memory-face memory-back">${BACK}</span>
            <span class="memory-face memory-front"><img src="${A.imageDe(r).thumb}" alt="" loading="lazy"><span>${A.esc(r.titreCourt)}</span></span>
          </span>
        </button>`
      )
      .join("");
    ui.moves.textContent = "0";
    ui.pairs.textContent = `0/${cfg.pairs}`;
    ui.time.textContent = "0:00";
    ui.overlay.hidden = true;
    renderBest();
  }

  function startClock() {
    if (state.started) return;
    state.started = true;
    state.clock = setInterval(() => {
      state.seconds++;
      ui.time.textContent = fmtTime(state.seconds);
    }, 1000);
  }

  function flip(card) {
    if (state.lock || card.classList.contains("is-flipped") || card.classList.contains("is-matched")) return;
    A.ensureAudio();
    startClock();
    card.classList.add("is-flipped");
    card.setAttribute("aria-label", `${A.parCle[card.dataset.key].titreCourt}, face visible`);
    A.bip(620, 0.06, 0, "sine", 0.06);

    if (!state.first) {
      state.first = card;
      return;
    }

    const a = state.first;
    const b = card;
    state.first = null;
    state.moves++;
    ui.moves.textContent = String(state.moves);
    bump(ui.moves);

    if (a.dataset.key === b.dataset.key) {
      setTimeout(() => {
        [a, b].forEach((c) => {
          c.classList.add("is-matched");
          c.disabled = true;
        });
        state.found++;
        ui.pairs.textContent = `${state.found}/${state.total}`;
        bump(ui.pairs);
        A.bip(880, 0.1, 0, "triangle", 0.12);
        A.bip(1175, 0.16, 0.1, "triangle", 0.12);
        if (state.found === state.total) win();
      }, 350);
    } else {
      state.lock = true;
      setTimeout(() => {
        [a, b].forEach((c) => c.classList.add("is-wrong"));
        A.bip(220, 0.12, 0, "sawtooth", 0.04);
      }, 450);
      setTimeout(() => {
        [a, b].forEach((c) => {
          c.classList.remove("is-flipped", "is-wrong");
          c.setAttribute("aria-label", `Carte ${Number(c.dataset.index) + 1}, face cachée`);
        });
        state.lock = false;
      }, 1050);
    }
  }

  function win() {
    clearInterval(state.clock);
    const cfg = LEVELS[level];
    const ratio = state.moves / cfg.pairs;
    const stars = ratio <= 1.5 ? 3 : ratio <= 2.2 ? 2 : 1;
    const prev = Number(A.store.get(bestKey(), 0));
    const record = !prev || state.moves < prev;
    if (record) {
      A.store.set(bestKey(), String(state.moves));
      A.store.set("antoine-memory-record", `${state.moves} coups (${cfg.label})`);
    }
    renderBest();
    ui.overlay.innerHTML = `<div class="game-modal" role="dialog" aria-label="Partie gagnée">
        <div class="big" aria-hidden="true">🏆</div>
        <h2>${record ? "Nouveau record !" : "Bravo, chef !"}</h2>
        <div class="stars-result" aria-label="${stars} étoiles sur 3">${[1, 2, 3].map((n) => `<span class="${n <= stars ? "on" : ""}">★</span>`).join("")}</div>
        <div class="result-stats">
          <div><strong>${state.moves}</strong><span>coups</span></div>
          <div><strong>${fmtTime(state.seconds)}</strong><span>temps</span></div>
          <div><strong>${cfg.label}</strong><span>niveau</span></div>
        </div>
        <p style="margin-top:14px">${stars === 3 ? "Une mémoire de chef étoilé !" : stars === 2 ? "Très joli service. Encore un effort pour les 3 étoiles !" : "Toutes les paires sont trouvées. Retente pour faire moins de coups !"}</p>
        <div class="btn-row">
          <button class="btn btn-primary" type="button" data-restart>Rejouer</button>
          <a class="btn" href="jeux.html">Autres jeux</a>
        </div>
      </div>`;
    ui.overlay.hidden = false;
    ui.overlay.querySelector("[data-restart]").focus();
    A.confetti(stars * 60);
  }

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".memory-card");
    if (card) flip(card);
  });

  ui.levels.addEventListener("click", (e) => {
    const b = e.target.closest("[data-level]");
    if (!b) return;
    level = b.dataset.level;
    A.store.set("antoine-memory-niveau", level);
    renderLevels();
    start();
  });

  ui.overlay.addEventListener("click", (e) => {
    if (e.target.closest("[data-restart]")) start();
  });

  document.getElementById("memRestart")?.addEventListener("click", start);

  renderLevels();
  start();
})();
