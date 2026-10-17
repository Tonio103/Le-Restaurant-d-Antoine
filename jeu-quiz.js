/**
 * QUIZ DU CHEF — 10 questions tirées au sort.
 * Les questions « maison » sont générées depuis recettes-data.js ; les questions
 * de culture reprennent uniquement des faits sourcés (voir la page Origines).
 */
(function () {
  "use strict";

  const A = window.Antoine;
  const stage = document.getElementById("quizStage");
  if (!A || !stage) return;

  const R = A.recettes;
  const BY = A.parCle;
  const QUESTIONS_PAR_PARTIE = 10;
  const SECONDES = 20;

  const ui = {
    score: document.getElementById("quizScore"),
    count: document.getElementById("quizCount"),
    streak: document.getElementById("quizStreak"),
    best: document.getElementById("quizBest"),
    progress: document.getElementById("quizProgress"),
    timer: document.getElementById("quizTimer"),
    overlay: document.getElementById("quizOverlay"),
    board: document.getElementById("quizBoard")
  };

  function shuffle(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function sourcesOf(key) {
    return BY[key]?.origine?.sources || [];
  }

  /* ---------------------------------------------------------------------
     Banque de questions
     --------------------------------------------------------------------- */
  function questionsMaison() {
    const qs = [];
    const total = (r) => A.meta.tempsTotal(r);

    // Temps total
    shuffle(R)
      .slice(0, 3)
      .forEach((r) => {
        const good = A.duree(total(r));
        const wrong = [...new Set(R.filter((x) => A.duree(total(x)) !== good).map((x) => A.duree(total(x))))];
        if (wrong.length < 3) return;
        qs.push({
          cat: "Recettes de la maison",
          q: `Combien de temps faut-il au total pour la recette « ${r.titreCourt} » du site ?`,
          answers: [good, ...shuffle(wrong).slice(0, 3)],
          explain: `La recette compte ${A.duree(r.temps.preparation)} de préparation${r.temps.cuisson ? `, ${A.duree(r.temps.cuisson)} de cuisson` : ""}${r.temps.repos ? ` et ${A.duree(r.temps.repos)} de repos` : ""}.`,
          link: r.url
        });
      });

    // Ingrédient distinctif → recette (les mauvaises réponses ne contiennent jamais l'ingrédient)
    const DISTINCTIFS = [
      ["Edamame", "pokebowl", "edamame"],
      ["Câpres", "saladecesar", "capre"],
      ["Gingembre frais", "ramen", "gingembre"],
      ["Petits oignons grelots", "cailles", "grelot"],
      ["Cheddar", "burgers", "cheddar"],
      ["Levure chimique", "marbre", "levure chimique"],
      ["Feta", "avocadotoast", "feta"],
      ["Miso", "ramen", "miso"],
      ["Filets d'anchois", "saladecesar", "anchois"],
      ["Mangue", "pokebowl", "mangue"],
      ["Rhum ambré ou fleur d'oranger", "crepes", "rhum"],
      ["Bouquet garni", "cailles", "bouquet garni"]
    ];
    const contient = (r, mot) => A.tousIngredients(r).some((i) => A.normalize(i.nom).includes(mot));
    shuffle(DISTINCTIFS)
      .slice(0, 3)
      .forEach(([ing, key, mot]) => {
        const r = BY[key];
        const autres = R.filter((x) => x.key !== key && !contient(x, mot));
        if (!r || autres.length < 3) return;
        qs.push({
          cat: "Recettes de la maison",
          q: `Laquelle de ces recettes de la maison contient : ${ing.toLowerCase()} ?`,
          answers: [r.titreCourt, ...shuffle(autres).slice(0, 3).map((x) => x.titreCourt)],
          explain: `Parmi ces choix, seule la recette « ${r.titre} » en contient.`,
          link: r.url
        });
      });

    // Intrus
    const INTRUS = { cailles: "Mangue", crepes: "Câpres", fondants: "Levure chimique", pokebowl: "Lardons fumés", ramen: "Feta", burgers: "Edamame", marbre: "Sauce soja", avocadotoast: "Petits pois" };
    const ik = pick(Object.keys(INTRUS));
    const ir = BY[ik];
    const vrais = shuffle(A.tousIngredients(ir).filter((i) => !i.optionnel && i.qte !== null)).slice(0, 3).map((i) => i.nom);
    qs.push({
      cat: "Recettes de la maison",
      q: `Quel ingrédient n'entre PAS dans la recette « ${ir.titreCourt} » ?`,
      answers: [INTRUS[ik], ...vrais],
      explain: `${INTRUS[ik]} n'apparaît pas dans la liste des ingrédients de « ${ir.titre} ».`,
      link: ir.url
    });

    // Températures de four lues dans les étapes
    ["fondants", "marbre"].forEach((key) => {
      const r = BY[key];
      const step = r.etapes.find((e) => /\d{3} °C/.test(e.texte));
      if (!step) return;
      const t = Number(step.texte.match(/(\d{3}) °C/)[1]);
      const wrong = shuffle([140, 160, 180, 200, 220, 240].filter((x) => x !== t)).slice(0, 3);
      qs.push({
        cat: "Recettes de la maison",
        q: `À quelle température préchauffe-t-on le four pour « ${r.titreCourt} » dans la recette du site ?`,
        answers: [`${t} °C`, ...wrong.map((x) => `${x} °C`)],
        explain: `La recette indique : « ${step.texte.split(".")[0]}. »`,
        link: r.url
      });
    });

    // Minuteurs précis
    const fondantStep = BY.fondants.etapes.find((e) => e.minuteurs?.length > 1);
    if (fondantStep) {
      qs.push({
        cat: "Recettes de la maison",
        q: "D'après la recette de la maison, combien de minutes de cuisson pour des fondants au cœur très coulant ?",
        answers: [`${fondantStep.minuteurs[0].secondes / 60} minutes`, "5 minutes", "13 minutes", "20 minutes"],
        explain: "9 minutes pour très coulant, 11 pour moelleux, 13 pour cuit à cœur. Chaque four est différent : surveille la première fois !",
        link: BY.fondants.url
      });
    }
    const repos = BY.crepes.etapes.find((e) => e.minuteurs?.some((m) => /idéal/i.test(m.label)));
    if (repos) {
      const m = repos.minuteurs.find((x) => /idéal/i.test(x.label));
      qs.push({
        cat: "Recettes de la maison",
        q: "Combien de temps de repos idéal pour la pâte à crêpes de la maison ?",
        answers: [A.dureeSecondes(m.secondes), "5 min", "3 h", "Aucun repos"],
        explain: "Au moins 30 minutes, idéalement 1 heure : les crêpes seront plus souples et régulières.",
        link: BY.crepes.url
      });
    }
    return qs;
  }

  const CULTURE = [
    {
      cat: "Culture",
      q: "Dans quelle ville la salade César aurait-elle été créée ?",
      answers: ["Tijuana (Mexique)", "Rome (Italie)", "New York (États-Unis)", "Madrid (Espagne)"],
      explain: "Elle est attribuée à Caesar Cardini, dans son restaurant de Tijuana, en 1924 selon le récit de sa fille. D'autres versions existent.",
      sources: sourcesOf("saladecesar"),
      link: "infos.html#saladecesar"
    },
    {
      cat: "Culture",
      q: "D'où vient le nom de la salade César ?",
      answers: ["De son créateur, Caesar Cardini", "De Jules César", "De sa forme de couronne", "D'une victoire romaine"],
      explain: "Elle porte le prénom du restaurateur Caesar Cardini, pas celui de l'empereur romain.",
      sources: sourcesOf("saladecesar"),
      link: "infos.html#saladecesar"
    },
    {
      cat: "Culture",
      q: "Que signifie le mot hawaïen « poke » ?",
      answers: ["Couper en morceaux", "Bol de riz", "Poisson cru", "Fête de la mer"],
      explain: "« Poke » signifie couper, trancher en morceaux.",
      sources: sourcesOf("pokebowl"),
      link: "infos.html#pokebowl"
    },
    {
      cat: "Culture",
      q: "Quel jour fête-t-on la Chandeleur ?",
      answers: ["Le 2 février", "Le 14 février", "Le 6 janvier", "Le 1er mars"],
      explain: "La Chandeleur a lieu le 2 février, 40 jours après Noël.",
      sources: sourcesOf("crepes"),
      link: "infos.html#crepes"
    },
    {
      cat: "Culture",
      q: "Dans quel pays le gâteau marbré serait-il apparu au XIXe siècle ?",
      answers: ["Allemagne", "Italie", "Angleterre", "Espagne"],
      explain: "Le Marmorkuchen serait né en Allemagne au XIXe siècle ; la version au chocolat s'est généralisée plus tard.",
      sources: sourcesOf("marbre"),
      link: "infos.html#marbre"
    },
    {
      cat: "Culture",
      q: "Quel chef est généralement crédité de l'invention du biscuit de chocolat coulant (1981) ?",
      answers: ["Michel Bras", "Paul Bocuse", "Joël Robuchon", "Alain Ducasse"],
      explain: "Michel Bras date son « biscuit de chocolat coulant » de 1981. Jean-Georges Vongerichten revendique un dessert proche à New York en 1987.",
      sources: sourcesOf("fondants"),
      link: "infos.html#fondants"
    },
    {
      cat: "Culture",
      q: "Dans quelle ville le chef Bill Granger a-t-il popularisé l'avocado toast ?",
      answers: ["Sydney", "Melbourne", "Los Angeles", "Londres"],
      explain: "Il est crédité de l'avoir mis à la carte de son café « bills », à Sydney, en 1993.",
      sources: sourcesOf("avocadotoast"),
      link: "infos.html#avocadotoast"
    },
    {
      cat: "Culture",
      q: "Le mot « ramen » viendrait du chinois « lamian ». Que désigne ce mot ?",
      answers: ["Des nouilles étirées à la main", "Une soupe épicée", "Un bol en porcelaine", "Un bouillon de porc"],
      explain: "« Lamian » désigne des nouilles étirées à la main.",
      sources: sourcesOf("ramen"),
      link: "infos.html#ramen"
    },
    {
      cat: "Culture",
      q: "Dans l'Union européenne, peut-on ajouter du sucre à un jus de fruits ?",
      answers: ["Non, c'est interdit depuis 2013", "Oui, jusqu'à 5 %", "Oui, sans limite", "Seulement pour les jus bio"],
      explain: "La directive 2012/12/UE interdit l'ajout de sucre aux jus de fruits depuis le 28 octobre 2013.",
      sources: sourcesOf("jusorange"),
      link: "infos.html#jusorange"
    },
    {
      cat: "Culture",
      q: "Quelle caille est élevée pour la consommation en France ?",
      answers: ["La caille du Japon", "La caille des blés", "La perdrix grise", "Le faisan de Colchide"],
      explain: "Les cailles d'élevage sont des cailles du Japon (Coturnix japonica) ; la caille des blés est l'espèce sauvage.",
      sources: sourcesOf("cailles"),
      link: "infos.html#cailles"
    },
    {
      cat: "Culture",
      q: "Le nom « hamburger » fait référence à quelle ville ?",
      answers: ["Hambourg", "Hambach", "Amsterdam", "Hanovre"],
      explain: "Il rappelle le « steak de Hambourg » des immigrés allemands, même si l'inventeur du hamburger reste disputé.",
      sources: sourcesOf("burgers"),
      link: "infos.html#burgers"
    }
  ];

  // Questions sur les recettes ajoutées ensuite (seulement si la recette est présente)
  [
    {
      key: "tartetatin",
      cat: "Culture",
      q: "La tarte Tatin porte le nom de deux sœurs. Où tenaient-elles leur hôtel ?",
      answers: ["À Lamotte-Beuvron, en Sologne", "À Lyon", "À Bayonne", "À Dijon"],
      explain: "Stéphanie et Caroline Tatin tenaient un hôtel à Lamotte-Beuvron. Le récit de la tarte ratée puis retournée relève en grande partie de la légende."
    },
    {
      key: "tiramisu",
      cat: "Culture",
      q: "Que signifie littéralement « tiramisù » ?",
      answers: ["« Tire-moi vers le haut »", "« Petit café »", "« Gâteau de Venise »", "« Crème du soir »"],
      explain: "De « tira mi sù » (« tireme sù » en dialecte vénitien) : « tire-moi vers le haut », autrement dit « remonte-moi »."
    },
    {
      key: "cookies",
      cat: "Culture",
      q: "Le cookie aux pépites de chocolat est le biscuit officiel de quel État américain ?",
      answers: ["Le Massachusetts", "La Californie", "Le Texas", "L'État de New York"],
      explain: "Il est attribué à Ruth Graves Wakefield, de la Toll House Inn à Whitman (Massachusetts), et il est le biscuit officiel de cet État depuis 1997."
    }
  ]
    .filter((x) => BY[x.key]?.origine)
    .forEach(({ key, ...question }) => CULTURE.push({ ...question, sources: sourcesOf(key), link: `infos.html#${key}` }));

  const TECHNIQUE = [
    {
      cat: "Technique",
      q: "Que veut dire « faire suer » un oignon ?",
      answers: ["Le cuire doucement, sans coloration, jusqu'à ce qu'il devienne translucide", "Le faire griller à feu vif", "Le faire tremper dans l'eau froide", "Le cuire au four à 200 °C"],
      explain: "C'est l'étape 3 des cailles aux petits pois : l'oignon devient translucide et fondant, sans brunir.",
      link: "cailles.html"
    },
    {
      cat: "Technique",
      q: "Un beurre « pommade », c'est…",
      answers: ["Un beurre ramolli à la consistance d'une crème", "Un beurre fondu", "Un beurre salé", "Un beurre mélangé à des herbes"],
      explain: "Le beurre pommade est mou et crémeux, idéal pour le travailler avec le sucre (étape 3 du gâteau marbré).",
      link: "gateau-marbre.html"
    },
    {
      cat: "Technique",
      q: "En France, le thermostat 6 d'un four correspond environ à…",
      answers: ["180 °C", "150 °C", "210 °C", "240 °C"],
      explain: "Repère courant : on multiplie le thermostat par 30. Les fours varient, surveille la cuisson."
    },
    {
      cat: "Technique",
      q: "Une cuillère à soupe, c'est environ…",
      answers: ["15 ml", "5 ml", "30 ml", "50 ml"],
      explain: "Une cuillère à soupe fait environ 15 ml, une cuillère à café environ 5 ml."
    },
    {
      cat: "Technique",
      q: "Pourquoi toaste-t-on le pain d'un burger ?",
      answers: ["Pour qu'il ne se détrempe pas sous la sauce", "Pour qu'il cuise plus vite", "Pour le rendre plus sucré", "Pour enlever la croûte"],
      explain: "La face toastée fait barrière : le pain reste croustillant sous la sauce.",
      link: "burger.html"
    }
  ];

  const SECURITE = [
    {
      cat: "Sécurité",
      q: "Pour les jeunes enfants, comment les autorités sanitaires recommandent-elles de cuire un steak haché ?",
      answers: ["À cœur, sans aucune trace rosée", "Saignant", "Bleu", "Rosé au centre"],
      explain: "La cuisson à cœur de la viande hachée limite le risque lié à la bactérie E. coli, surtout pour les jeunes enfants et les personnes âgées.",
      sources: BY.burgers.sourcesSecurite,
      link: "burger.html"
    },
    {
      cat: "Sécurité",
      q: "Si le poisson n'a pas déjà été congelé, combien de jours au congélateur avant de le manger cru ?",
      answers: ["7 jours", "1 jour", "2 heures", "30 jours"],
      explain: "La congélation élimine les éventuels parasites (anisakis). Le repère de 7 jours au congélateur domestique est celui repris par les autorités sanitaires.",
      sources: BY.pokebowl.sourcesSecurite,
      link: "poke-bowl.html"
    },
    {
      cat: "Sécurité",
      q: "À qui déconseille-t-on les œufs crus (comme dans la sauce César maison) ?",
      answers: ["Aux femmes enceintes, jeunes enfants et personnes âgées ou fragiles", "Uniquement aux sportifs", "À personne", "Uniquement aux adolescents"],
      explain: "Les œufs crus ou peu cuits sont déconseillés aux personnes les plus vulnérables (risque de salmonellose).",
      sources: BY.saladecesar.sourcesSecurite,
      link: "salade-cesar.html"
    }
  ];

  function buildGame() {
    const maison = shuffle(questionsMaison()).slice(0, 4);
    const culture = shuffle(CULTURE).slice(0, 3);
    const autres = shuffle([...TECHNIQUE, ...SECURITE]).slice(0, QUESTIONS_PAR_PARTIE - maison.length - culture.length);
    return shuffle([...maison, ...culture, ...autres]).map((q) => {
      const correct = q.answers[0];
      return { ...q, options: shuffle(q.answers), correct };
    });
  }

  /* ---------------------------------------------------------------------
     Partie
     --------------------------------------------------------------------- */
  let game = null;
  let raf = null;

  function renderBest() {
    const best = Number(A.store.get("antoine-quiz-best", 0));
    ui.best.textContent = best ? `${best}` : "–";
  }

  function startGame() {
    A.ensureAudio();
    game = { list: buildGame(), index: 0, score: 0, streak: 0, good: 0, answered: false, results: [] };
    ui.overlay.hidden = true;
    ui.score.textContent = "0";
    ui.streak.textContent = "0";
    showQuestion();
  }

  function renderProgress() {
    ui.progress.innerHTML = game.list
      .map((_, i) => `<i class="${game.results[i] === true ? "ok" : game.results[i] === false ? "ko" : i === game.index ? "now" : ""}"></i>`)
      .join("");
    ui.count.textContent = `${Math.min(game.index + 1, game.list.length)}/${game.list.length}`;
  }

  function showQuestion() {
    const q = game.list[game.index];
    game.answered = false;
    renderProgress();
    stage.innerHTML = `<div class="quiz-question">
        <div class="q-cat"><span class="pill pill-saffron">${A.esc(q.cat)}</span><span class="pill">Question ${game.index + 1}</span></div>
        <h2>${A.esc(q.q)}</h2>
        <div class="quiz-answers">
          ${q.options
            .map(
              (o, i) => `<button class="quiz-answer" type="button" style="--i:${i}" data-answer="${i}">
                <span class="letter">${"ABCD"[i]}</span><span>${A.esc(o)}</span></button>`
            )
            .join("")}
        </div>
        <div data-feedback></div>
      </div>`;
    const startAt = performance.now();
    cancelAnimationFrame(raf);
    const tick = (now) => {
      if (game.answered) return;
      const left = Math.max(0, SECONDES - (now - startAt) / 1000);
      ui.timer.style.transform = `scaleX(${left / SECONDES})`;
      game.left = left;
      if (left <= 0) return answer(-1);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  }

  function answer(i) {
    if (!game || game.answered) return;
    game.answered = true;
    cancelAnimationFrame(raf);
    const q = game.list[game.index];
    const buttons = [...stage.querySelectorAll("[data-answer]")];
    const correctIndex = q.options.indexOf(q.correct);
    const ok = i === correctIndex;
    buttons.forEach((b, idx) => {
      b.disabled = true;
      if (idx === correctIndex) b.classList.add("is-right");
      if (idx === i && !ok) b.classList.add("is-wrong");
    });
    game.results[game.index] = ok;
    let gain = 0;
    if (ok) {
      game.streak++;
      game.good++;
      gain = 100 + Math.round(game.left * 5) + (game.streak - 1) * 25;
      game.score += gain;
      A.bip(784, 0.1, 0, "triangle", 0.12);
      A.bip(1046, 0.18, 0.1, "triangle", 0.12);
      const pop = document.createElement("span");
      pop.className = "score-pop";
      pop.textContent = `+${gain}`;
      const rect = buttons[correctIndex].getBoundingClientRect();
      const boardRect = ui.board.getBoundingClientRect();
      pop.style.left = `${rect.left - boardRect.left + rect.width / 2 - 30}px`;
      pop.style.top = `${rect.top - boardRect.top - 10}px`;
      ui.board.appendChild(pop);
      setTimeout(() => pop.remove(), 1000);
    } else {
      game.streak = 0;
      A.bip(196, 0.25, 0, "sawtooth", 0.05);
    }
    ui.score.textContent = String(game.score);
    ui.streak.textContent = String(game.streak);
    renderProgress();

    const sources = q.sources?.length
      ? `<p class="sources">Sources : ${q.sources.map((s) => `<a href="${A.esc(s.url)}" target="_blank" rel="noopener">${A.esc(s.titre)}</a>`).join(" · ")}</p>`
      : "";
    stage.querySelector("[data-feedback]").innerHTML = `<div class="quiz-feedback" role="status">
        <strong>${ok ? `Bonne réponse ! +${gain}` : i === -1 ? "Temps écoulé ⏰" : "Raté !"}</strong>
        <p>${ok ? "" : `La bonne réponse était : <b>${A.esc(q.correct)}</b>. `}${A.esc(q.explain)}</p>
        ${q.link ? `<p style="margin-top:6px"><a href="${q.link}">En savoir plus →</a></p>` : ""}
        ${sources}
      </div>
      <div class="quiz-next"><button class="btn btn-primary" type="button" data-next>${game.index === game.list.length - 1 ? "Voir mon score" : "Question suivante →"}</button></div>`;
    stage.querySelector("[data-next]").focus({ preventScroll: true });
  }

  function next() {
    game.index++;
    if (game.index >= game.list.length) return finish();
    showQuestion();
  }

  function finish() {
    const best = Number(A.store.get("antoine-quiz-best", 0));
    const record = game.score > best;
    if (record) {
      A.store.set("antoine-quiz-best", String(game.score));
      A.store.set("antoine-quiz-record", `${game.score} pts`);
    }
    renderBest();
    const n = game.good;
    const titre = n >= 9 ? "Chef étoilé ! 🌟" : n >= 7 ? "Second de cuisine 👨‍🍳" : n >= 5 ? "Commis prometteur 🥄" : "Apprenti marmiton 🍳";
    ui.timer.style.transform = "scaleX(0)";
    ui.overlay.innerHTML = `<div class="game-modal" role="dialog" aria-label="Résultat du quiz">
        <div class="big" aria-hidden="true">${n >= 7 ? "🏆" : n >= 5 ? "🎉" : "📚"}</div>
        <h2>${record ? "Nouveau record !" : titre}</h2>
        ${record ? `<p>${titre}</p>` : ""}
        <div class="result-stats">
          <div><strong>${game.score}</strong><span>points</span></div>
          <div><strong>${n}/${game.list.length}</strong><span>bonnes réponses</span></div>
          <div><strong>${Math.max(best, game.score)}</strong><span>record</span></div>
        </div>
        <div class="btn-row">
          <button class="btn btn-primary" type="button" data-start>Rejouer (nouvelles questions)</button>
          <a class="btn" href="jeux.html">Autres jeux</a>
        </div>
      </div>`;
    ui.overlay.hidden = false;
    ui.overlay.querySelector("[data-start]").focus();
    if (n >= 7) A.confetti(n * 15);
  }

  stage.addEventListener("click", (e) => {
    const b = e.target.closest("[data-answer]");
    if (b) answer(Number(b.dataset.answer));
    if (e.target.closest("[data-next]")) next();
  });

  ui.overlay.addEventListener("click", (e) => {
    if (e.target.closest("[data-start]")) startGame();
  });

  document.addEventListener("keydown", (e) => {
    if (!game || !ui.overlay.hidden) return;
    const k = e.key.toLowerCase();
    const map = { 1: 0, 2: 1, 3: 2, 4: 3, a: 0, b: 1, c: 2, d: 3 };
    if (!game.answered && k in map && !/INPUT|TEXTAREA/.test(document.activeElement?.tagName || "")) {
      answer(map[k]);
    }
  });

  renderBest();
})();
