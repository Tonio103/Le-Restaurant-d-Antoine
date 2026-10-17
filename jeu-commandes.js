/**
 * COUP DE FEU EN CUISINE — assemble les commandes dans le bon ordre
 * avant que les clients ne perdent patience.
 */
(function () {
  "use strict";

  const A = window.Antoine;
  const board = document.getElementById("kitchenBoard");
  if (!A || !board) return;

  const INGREDIENTS = {
    pain: { e: "🍞", n: "Pain" },
    salade: { e: "🥬", n: "Salade" },
    tomate: { e: "🍅", n: "Tomate" },
    steak: { e: "🥩", n: "Steak" },
    fromage: { e: "🧀", n: "Fromage" },
    bacon: { e: "🥓", n: "Bacon" },
    oignon: { e: "🧅", n: "Oignon" },
    riz: { e: "🍚", n: "Riz" },
    saumon: { e: "🐟", n: "Saumon" },
    avocat: { e: "🥑", n: "Avocat" },
    mangue: { e: "🥭", n: "Mangue" },
    concombre: { e: "🥒", n: "Concombre" },
    nouilles: { e: "🍜", n: "Nouilles" },
    oeuf: { e: "🥚", n: "Œuf" },
    champignon: { e: "🍄", n: "Champi" },
    poulet: { e: "🍗", n: "Poulet" },
    crepe: { e: "🥞", n: "Crêpe" },
    chocolat: { e: "🍫", n: "Chocolat" },
    banane: { e: "🍌", n: "Banane" },
    fraise: { e: "🍓", n: "Fraise" },
    orange: { e: "🍊", n: "Orange" },
    glacon: { e: "🧊", n: "Glaçon" },
    menthe: { e: "🌿", n: "Menthe" },
    citron: { e: "🍋", n: "Citron" }
  };

  const COMMANDES = [
    { nom: "Burger maison", key: "burgers", suite: ["pain", "salade", "tomate", "steak", "fromage", "pain"], niveau: 1 },
    { nom: "Bacon cheeseburger", key: "burgers", suite: ["pain", "steak", "fromage", "bacon", "oignon", "pain"], niveau: 2 },
    { nom: "Poké bowl", key: "pokebowl", suite: ["riz", "saumon", "avocat", "mangue", "concombre"], niveau: 1 },
    { nom: "Ramen", key: "ramen", suite: ["nouilles", "poulet", "oeuf", "champignon"], niveau: 1 },
    { nom: "Crêpe choco-banane", key: "crepes", suite: ["crepe", "chocolat", "banane"], niveau: 0 },
    { nom: "Crêpe aux fraises", key: "crepes", suite: ["crepe", "fraise", "chocolat"], niveau: 0 },
    { nom: "Crêpe sucre-citron", key: "crepes", suite: ["crepe", "citron"], niveau: 0 },
    { nom: "Avocado toast", key: "avocadotoast", suite: ["pain", "avocat", "tomate", "oeuf"], niveau: 1 },
    { nom: "Jus d'orange frais", key: "jusorange", suite: ["orange", "orange", "glacon", "menthe"], niveau: 0 },
    { nom: "Salade César", key: "saladecesar", suite: ["salade", "bacon", "fromage", "pain"], niveau: 1 },
    { nom: "Poké végétarien", key: "pokebowl", suite: ["riz", "avocat", "concombre", "mangue", "oeuf"], niveau: 2 },
    { nom: "Ramen gourmand", key: "ramen", suite: ["nouilles", "poulet", "champignon", "oeuf", "oignon"], niveau: 2 },
    { nom: "Shakshuka", key: "shakshuka", suite: ["oignon", "tomate", "oeuf", "oeuf", "fromage"], niveau: 1 },
    { nom: "Risotto aux champignons", key: "risottochampignons", suite: ["riz", "champignon", "fromage"], niveau: 1 },
    { nom: "Citronnade", key: "citronnade", suite: ["citron", "citron", "glacon", "menthe"], niveau: 0 }
  ];

  const SERVICE = 90; // secondes
  const ui = {
    score: document.getElementById("kScore"),
    combo: document.getElementById("kCombo"),
    lives: document.getElementById("kLives"),
    time: document.getElementById("kTime"),
    best: document.getElementById("kBest"),
    ticketZone: document.getElementById("kTicket"),
    plate: document.getElementById("kPlate"),
    pantry: document.getElementById("kPantry"),
    overlay: document.getElementById("kOverlay")
  };

  let g = null;
  let raf = null;

  function shuffle(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function renderBest() {
    const best = Number(A.store.get("antoine-commandes-best", 0));
    ui.best.textContent = best ? String(best) : "–";
  }

  function renderPantry() {
    ui.pantry.innerHTML = shuffle(Object.entries(INGREDIENTS))
      .map(([id, ing]) => `<button type="button" data-ing="${id}" aria-label="${ing.n}"><span aria-hidden="true">${ing.e}</span>${ing.n}</button>`)
      .join("");
  }

  function bump(node) {
    node.classList.remove("bump");
    void node.offsetWidth;
    node.classList.add("bump");
  }

  function flash(text) {
    const m = document.createElement("span");
    m.className = "flash-msg";
    m.textContent = text;
    ui.plate.appendChild(m);
    setTimeout(() => m.remove(), 1000);
  }

  function pickOrder() {
    const stage = g.served < 3 ? 0 : g.served < 8 ? 1 : 2;
    const pool = COMMANDES.filter((c) => c.niveau <= stage && c.nom !== g.order?.nom && A.parCle[c.key]);
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function patienceFor(order) {
    // Plus le service avance, moins les clients sont patients.
    const base = 5 + order.suite.length * 2.1;
    return Math.max(4.5, base - g.served * 0.35);
  }

  function newOrder() {
    g.order = pickOrder();
    g.step = 0;
    g.patience = patienceFor(g.order);
    g.patienceLeft = g.patience;
    renderTicket();
    renderPlate();
  }

  function renderTicket() {
    const o = g.order;
    const num = String(g.served + g.lost + 1).padStart(3, "0");
    ui.ticketZone.innerHTML = `<div class="ticket" data-ticket>
        <small>Commande n° ${num} · Table ${1 + ((g.served * 7 + 3) % 12)}</small>
        <h2>${A.esc(o.nom)}</h2>
        <ol class="ticket-steps" aria-label="Ordre d'assemblage">
          ${o.suite
            .map((id, i) => `<li class="${i < g.step ? "done" : i === g.step ? "next" : ""}" title="${INGREDIENTS[id].n}">${INGREDIENTS[id].e}</li>`)
            .join("")}
        </ol>
        <div class="patience" aria-hidden="true"><i data-patience></i></div>
      </div>`;
  }

  function updateTicketSteps() {
    ui.ticketZone.querySelectorAll(".ticket-steps li").forEach((li, i) => {
      li.className = i < g.step ? "done" : i === g.step ? "next" : "";
    });
  }

  function renderPlate() {
    const stack = g.order.suite
      .slice(0, g.step)
      .map((id) => `<span>${INGREDIENTS[id].e}</span>`)
      .join("");
    ui.plate.querySelector(".plate-stack").innerHTML = stack;
  }

  function renderHud() {
    ui.score.textContent = String(g.score);
    ui.combo.textContent = `×${1 + Math.min(4, Math.floor(g.combo / 2))}`;
    ui.lives.textContent = "⭐".repeat(g.lives) + "☆".repeat(Math.max(0, 3 - g.lives));
  }

  function start() {
    A.ensureAudio();
    cancelAnimationFrame(raf);
    g = { score: 0, combo: 0, lives: 3, served: 0, lost: 0, timeLeft: SERVICE, order: null, step: 0, last: performance.now(), over: false, errors: 0 };
    ui.overlay.hidden = true;
    renderPantry();
    renderHud();
    newOrder();
    raf = requestAnimationFrame(loop);
  }

  function loop(now) {
    if (!g || g.over) return;
    const dt = Math.min(0.1, (now - g.last) / 1000);
    g.last = now;
    g.timeLeft -= dt;
    g.patienceLeft -= dt;

    ui.time.textContent = `${Math.max(0, Math.ceil(g.timeLeft))} s`;
    const bar = ui.ticketZone.querySelector("[data-patience]");
    if (bar) {
      const p = Math.max(0, g.patienceLeft / g.patience);
      bar.style.transform = `scaleX(${p})`;
      bar.style.backgroundPosition = `${(1 - p) * 100}% 0`;
      ui.ticketZone.querySelector("[data-ticket]")?.classList.toggle("is-late", p < 0.25);
    }

    if (g.patienceLeft <= 0) {
      lose();
      if (g.over) return;
    }
    if (g.timeLeft <= 0) return end("time");
    raf = requestAnimationFrame(loop);
  }

  function lose() {
    g.lives--;
    g.lost++;
    g.combo = 0;
    A.bip(160, 0.35, 0, "sawtooth", 0.06);
    flash("Le client est parti… 😤");
    const ticket = ui.ticketZone.querySelector("[data-ticket]");
    ticket?.classList.add("lost");
    renderHud();
    if (g.lives <= 0) {
      end("lives");
      return;
    }
    g.patienceLeft = 99;
    setTimeout(() => {
      if (!g.over) newOrder();
    }, 450);
  }

  function serve() {
    const o = g.order;
    g.combo++;
    g.served++;
    const mult = 1 + Math.min(4, Math.floor(g.combo / 2));
    const speed = Math.max(0, g.patienceLeft / g.patience);
    const gain = Math.round((60 + o.suite.length * 15 + speed * 80) * mult);
    g.score += gain;
    g.timeLeft = Math.min(SERVICE, g.timeLeft + 3);
    renderHud();
    bump(ui.score);
    A.bip(1318, 0.12, 0, "triangle", 0.14);
    A.bip(1760, 0.3, 0.08, "sine", 0.1);
    flash(`Ding ! +${gain}${mult > 1 ? ` (×${mult})` : ""}`);
    ui.ticketZone.querySelector("[data-ticket]")?.classList.add("served");
    g.patienceLeft = 99;
    setTimeout(() => {
      if (!g.over) newOrder();
    }, 420);
  }

  function addIngredient(id, button) {
    if (!g || g.over || g.patienceLeft > 90) return;
    const expected = g.order.suite[g.step];
    if (id === expected) {
      g.step++;
      A.bip(500 + g.step * 70, 0.06, 0, "sine", 0.08);
      updateTicketSteps();
      renderPlate();
      if (g.step === g.order.suite.length) serve();
    } else {
      g.combo = 0;
      g.errors++;
      g.patienceLeft -= 1.5;
      renderHud();
      A.bip(180, 0.15, 0, "square", 0.05);
      ui.plate.classList.remove("is-wrong");
      void ui.plate.offsetWidth;
      ui.plate.classList.add("is-wrong");
      flash(`Non, il faut : ${INGREDIENTS[expected].n} !`);
      const hint = ui.pantry.querySelector(`[data-ing="${expected}"]`);
      hint?.classList.add("hint");
      setTimeout(() => hint?.classList.remove("hint"), 900);
      button?.blur();
    }
  }

  function end(reason) {
    g.over = true;
    cancelAnimationFrame(raf);
    const best = Number(A.store.get("antoine-commandes-best", 0));
    const record = g.score > best;
    if (record) {
      A.store.set("antoine-commandes-best", String(g.score));
      A.store.set("antoine-commandes-record", `${g.score} pts`);
    }
    renderBest();
    ui.overlay.innerHTML = `<div class="game-modal" role="dialog" aria-label="Fin du service">
        <div class="big" aria-hidden="true">${reason === "time" ? "🛎️" : "😵‍💫"}</div>
        <h2>${record ? "Nouveau record !" : reason === "time" ? "Fin du service !" : "Trop de clients mécontents…"}</h2>
        <p>${g.served >= 15 ? "Une brigade à toi tout seul !" : g.served >= 8 ? "Joli coup de feu, chef !" : "La cuisine, ça s'apprend : on y retourne ?"}</p>
        <div class="result-stats">
          <div><strong>${g.score}</strong><span>points</span></div>
          <div><strong>${g.served}</strong><span>plats servis</span></div>
          <div><strong>${g.errors}</strong><span>erreurs</span></div>
        </div>
        <div class="btn-row">
          <button class="btn btn-primary" type="button" data-start>Nouveau service</button>
          <a class="btn" href="jeux.html">Autres jeux</a>
        </div>
      </div>`;
    ui.overlay.hidden = false;
    ui.overlay.querySelector("[data-start]").focus();
    if (record || g.served >= 8) A.confetti(120);
  }

  ui.pantry.addEventListener("click", (e) => {
    const b = e.target.closest("[data-ing]");
    if (b) addIngredient(b.dataset.ing, b);
  });

  ui.overlay.addEventListener("click", (e) => {
    if (e.target.closest("[data-start]")) start();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && g && !g.over) {
      g.over = true;
      cancelAnimationFrame(raf);
      ui.overlay.innerHTML = `<div class="game-modal"><div class="big">⏸️</div><h2>Service en pause</h2>
        <p>Tu as quitté la cuisine ! Le service reprend quand tu veux.</p>
        <div class="btn-row"><button class="btn btn-primary" type="button" data-resume>Reprendre</button></div></div>`;
      ui.overlay.hidden = false;
      ui.overlay.querySelector("[data-resume]").addEventListener("click", () => {
        g.over = false;
        g.last = performance.now();
        ui.overlay.hidden = true;
        raf = requestAnimationFrame(loop);
      });
    }
  });

  renderBest();
  renderPantry();
})();
