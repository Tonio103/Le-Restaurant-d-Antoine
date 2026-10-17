/**
 * LE RESTAURANT D'ANTOINE — SCRIPT PRINCIPAL
 * En-tête et pied de page partagés, accueil, pages recettes générées
 * depuis recettes-data.js, mode cuisine, minuteurs, liste de courses,
 * recherche, lightbox et animations.
 */
(function () {
  "use strict";

  const RECETTES = window.RECETTES || [];
  const META = window.RECETTES_META || { CATEGORIES: {}, ALLERGENES: {}, tempsTotal: () => 0 };
  const BY_KEY = Object.fromEntries(RECETTES.map((r) => [r.key, r]));
  const body = document.body;
  const PAGE = body.dataset.page || "";
  const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.documentElement.classList.add("js");

  /* ==========================================================================
     STOCKAGE (toujours protégé : navigation privée, stockage bloqué…)
     ========================================================================== */
  const store = {
    get(key, fallback = null) {
      try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : value;
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch {
        /* stockage indisponible */
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch {
        /* stockage indisponible */
      }
    },
    json(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch {
        return fallback;
      }
    },
    setJson(key, value) {
      this.set(key, JSON.stringify(value));
    }
  };

  /* ==========================================================================
     ICÔNES
     ========================================================================== */
  const ICON_PATHS = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    basket: '<path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z"/><path d="M9 8V7a3 3 0 0 1 6 0v1"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M21.5 20a6.5 6.5 0 0 0-4-6"/>',
    flame: '<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-3.5 2-5 .8 1.5 1.5 2 2.5 2.5C11 8 11 5.5 12 3Z"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/>',
    printer: '<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',
    share: '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4"/>',
    play: '<path d="M8 5v14l11-7L8 5Z" fill="currentColor"/>',
    pause: '<path d="M9 5v14M15 5v14"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M10 2h4"/>',
    chef: '<path d="M7 18h10v3H7z"/><path d="M7 18v-4.5A4 4 0 0 1 6 6a4.5 4.5 0 0 1 6-2 4.5 4.5 0 0 1 6 2 4 4 0 0 1-1 7.5V18"/>',
    send: '<path d="M4 12 20 4l-6 16-3-7-7-1Z"/>',
    expand: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    shrink: '<path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/>',
    trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
    reset: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
    book: '<path d="M3 5h6a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H3z"/><path d="M21 5h-6a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h7z"/>',
    sparkles: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
    message: '<path d="M4 5h16v11H9l-5 4V5Z"/>',
    dice: '<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1.1" fill="currentColor"/><circle cx="15" cy="15" r="1.1" fill="currentColor"/><circle cx="15" cy="9" r="1.1" fill="currentColor"/><circle cx="9" cy="15" r="1.1" fill="currentColor"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',
    bell: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4l2-2Z"/><path d="M10 21h4"/>',
    alert: '<path d="M12 3 2.5 20h19L12 3Z"/><path d="M12 10v4M12 17h.01"/>',
    pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
    run: '<circle cx="15" cy="4.5" r="2"/><path d="m6 21 3.5-5.5L13 17l2 4M8 11l3-3 4 1 2 3 3 1M11 8l-2 7"/>',
    cards: '<rect x="3" y="6" width="11" height="15" rx="2"/><path d="M10 3h9a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-2"/>',
    question: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5v.7M12 17h.01"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'
  };

  function icon(name, extraClass = "") {
    const paths = ICON_PATHS[name] || "";
    return `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths}</svg>`;
  }

  const LOGO = `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-linecap="round" aria-hidden="true">
      <path class="steam-line" d="M17 9c-2-2.5 2-3.5 0-6" stroke-width="2.4"/>
      <path class="steam-line" d="M24 8c-2-2.5 2-3.5 0-6" stroke-width="2.4"/>
      <path class="steam-line" d="M31 9c-2-2.5 2-3.5 0-6" stroke-width="2.4"/>
      <path d="M8 36a16 16 0 0 1 32 0" stroke-width="3.2" fill="currentColor" fill-opacity=".15"/>
      <path d="M5 37h38" stroke-width="3.6"/>
      <circle cx="24" cy="17.5" r="2.4" fill="currentColor" stroke="none"/>
      <path d="M15 31a10 10 0 0 1 6-8" stroke-width="2.4" opacity=".7"/>
    </svg>`;

  /* ==========================================================================
     OUTILS
     ========================================================================== */
  function esc(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function normalize(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/œ/g, "oe")
      .replace(/æ/g, "ae")
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[’']/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function duree(minutes) {
    const m = Math.round(minutes);
    if (m < 60) return `${m} min`;
    const h = Math.floor(m / 60);
    const rest = m % 60;
    return rest ? `${h} h ${String(rest).padStart(2, "0")}` : `${h} h`;
  }

  function dureeSecondes(seconds) {
    const s = Math.round(seconds);
    if (s < 60) return `${s} s`;
    const m = Math.floor(s / 60);
    const r = s % 60;
    if (m >= 60) return duree(m);
    return r ? `${m} min ${String(r).padStart(2, "0")}` : `${m} min`;
  }

  function clock(totalSeconds) {
    const s = Math.max(0, Math.ceil(totalSeconds));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    const mm = String(m).padStart(2, "0");
    const ss = String(sec).padStart(2, "0");
    return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
  }

  const PLURALISABLES = new Set(["tranche", "feuille", "gousse", "pincée", "bouquet", "sachet", "portion", "tige", "brin", "bol", "verre", "part"]);
  const FRACTIONS = { 0.25: "¼", 0.5: "½", 0.75: "¾" };

  function formatNombre(value) {
    const whole = Math.floor(value);
    const frac = Math.round((value - whole) * 100) / 100;
    if (FRACTIONS[frac]) return whole ? `${whole} ${FRACTIONS[frac]}` : FRACTIONS[frac];
    if (Number.isInteger(value)) return String(value);
    return String(Math.round(value * 10) / 10).replace(".", ",");
  }

  function arrondir(value, unite) {
    if (unite === "g" || unite === "ml") {
      if (value >= 100) return Math.round(value / 5) * 5;
      if (value >= 10) return Math.round(value);
      return Math.max(0.5, Math.round(value * 2) / 2);
    }
    if (value >= 10) return Math.round(value);
    if (value >= 3) return Math.max(1, Math.round(value * 2) / 2);
    return Math.max(0.25, Math.round(value * 4) / 4);
  }

  function formatQuantite(qte, unite) {
    if (qte === null || qte === undefined) return "";
    const v = arrondir(qte, unite);
    if (unite === "g" && v >= 1000) return `${formatNombre(Math.round(v / 50) / 20)} kg`;
    if (unite === "ml" && v >= 1000) return `${formatNombre(Math.round(v / 50) / 20)} l`;
    if (!unite || unite === "pièce") return formatNombre(v);
    const u = PLURALISABLES.has(unite) && v >= 2 ? `${unite}s` : unite;
    return `${formatNombre(v)} ${u}`;
  }

  function quantiteIngredient(item, recette, portions) {
    if (item.qte === null || item.qte === undefined) return item.note || "";
    const factor = item.fixe ? 1 : portions / recette.portions.base;
    return formatQuantite(item.qte * factor, item.unite);
  }

  function tousIngredients(recette) {
    return recette.ingredients.flatMap((g) => g.items.map((i) => ({ ...i, groupe: g.groupe })));
  }

  function portionsLabel(recette, n) {
    return `${n} ${n > 1 ? recette.portions.pluriel : recette.portions.unite}`;
  }

  /* Couvertures illustrées pour les recettes qui n'ont pas encore de photo.
     Dessin vectoriel (pas de texte, donc indépendant des polices), généré
     depuis recette.cover = { motif, fond, encre, accent }. */
  const MOTIFS = {
    cocotte: (a) => `
      <path d="M58 40c-9-11 9-16 0-28M120 34c-9-11 9-16 0-28M182 40c-9-11 9-16 0-28" stroke-width="5"/>
      <path d="M40 112h160v52a30 30 0 0 1-30 30H70a30 30 0 0 1-30-30z" fill="${a}"/>
      <path d="M26 112h188M40 132H20M200 132h20"/>
      <path d="M50 104a70 36 0 0 1 140 0z" fill="${a}" fill-opacity=".55"/>
      <circle cx="120" cy="62" r="9"/>`,
    "plat-four": (a) => `
      <path d="M78 54c-9-11 9-16 0-28M162 54c-9-11 9-16 0-28" stroke-width="5"/>
      <path d="M34 112h172l-14 70a14 14 0 0 1-14 11H62a14 14 0 0 1-14-11z" fill="${a}"/>
      <path d="M22 112h196M22 112q-16 0-16 14M218 112q16 0 16 14"/>
      <path d="M46 100q15-15 30 0t30 0 30 0 30 0 30 0" stroke-width="6"/>
      <circle cx="80" cy="140" r="5"/><circle cx="130" cy="152" r="4"/><circle cx="168" cy="136" r="5"/>`,
    assiette: (a) => `
      <circle cx="120" cy="120" r="80"/>
      <circle cx="120" cy="120" r="56" fill="${a}"/>
      <path d="M16 46v34M26 46v34M36 46v34M16 80q10 12 20 0M26 86v110"/>
      <path d="M220 46q18 34 0 72v78"/>`,
    bol: (a) => `
      <path d="M78 64c-9-11 9-16 0-28M120 58c-9-11 9-16 0-28M162 64c-9-11 9-16 0-28" stroke-width="5"/>
      <path d="M36 104h168a84 76 0 0 1-168 0z" fill="${a}"/>
      <path d="M24 104h192M96 186h48"/>
      <path d="M150 96l46-72" stroke-width="6"/>`,
    tarte: (a) => `
      <circle cx="120" cy="120" r="94" stroke-width="12" stroke-dasharray="9 7"/>
      <circle cx="120" cy="120" r="78" fill="${a}"/>
      <path d="M120 120V42M120 120l70 36" stroke-width="5"/>
      <path d="M78 96a50 50 0 0 1 22-26M70 136a52 52 0 0 0 30 40M150 82a48 48 0 0 1 20 22" stroke-width="5"/>`,
    verre: (a) => `
      <path d="M74 92h92l-9 104a10 10 0 0 1-10 9H93a10 10 0 0 1-10-9z" fill="${a}"/>
      <path d="M66 36h108l-15 160a10 10 0 0 1-10 9H91a10 10 0 0 1-10-9z"/>
      <path d="M148 14l-24 150" stroke-width="6"/>
      <circle cx="174" cy="42" r="26" fill="${a}"/>
      <path d="M174 16v52M148 42h52M156 24l36 36M192 24l-36 36" stroke-width="3"/>
      <rect x="92" y="118" width="22" height="22" rx="5" stroke-width="4"/><rect x="122" y="140" width="20" height="20" rx="5" stroke-width="4"/>`,
    tasse: (a) => `
      <path d="M84 56c-9-11 9-16 0-28M116 50c-9-11 9-16 0-28M148 56c-9-11 9-16 0-28" stroke-width="5"/>
      <path d="M46 78h118v82a32 32 0 0 1-32 32H78a32 32 0 0 1-32-32z" fill="${a}"/>
      <path d="M164 98h14a24 24 0 0 1 0 48h-14M24 204h170"/>`,
    poele: (a) => `
      <circle cx="104" cy="120" r="84"/>
      <circle cx="104" cy="120" r="68" fill="${a}"/>
      <path d="M188 120h48" stroke-width="16"/>
      <path d="M58 104c0-22 40-26 46-6 8 24-30 34-46 6z" fill="currentColor"/>
      <path d="M110 142c4-22 44-18 44 4 0 22-46 22-44-4z" fill="currentColor"/>
      <circle cx="80" cy="104" r="11" fill="#f2b23a" stroke="none"/><circle cx="132" cy="146" r="11" fill="#f2b23a" stroke="none"/>`,
    ramequin: (a) => `
      <path d="M40 116h160v50a20 20 0 0 1-20 20H60a20 20 0 0 1-20-20z"/>
      <path d="M62 120v64M84 120v66M106 120v66M128 120v66M150 120v66M172 120v64" stroke-width="4"/>
      <ellipse cx="120" cy="116" rx="82" ry="20" fill="${a}"/>
      <path d="M150 98l54-66" stroke-width="6"/>
      <ellipse cx="210" cy="26" rx="12" ry="18" transform="rotate(40 210 26)"/>`,
    biscuit: (a) => `
      <path d="M150 52c30 4 54 30 52 62s-30 58-62 56-58-28-56-60 32-62 66-58z" fill="${a}" fill-opacity=".6"/>
      <path d="M96 84c32 2 58 30 56 64s-32 58-64 56-58-30-56-62 30-60 64-58z" fill="${a}"/>
      <path d="M78 122l12 4-4 11-11-5zM110 104l10 6-6 10-10-6zM118 152l12 2-2 12-12-2zM80 168l10 6-6 9-9-6z" fill="currentColor"/>`,
    cloche: (a) => `
      <path d="M30 172a90 90 0 0 1 180 0z" fill="${a}"/>
      <path d="M12 172h216M40 192h160"/>
      <circle cx="120" cy="70" r="11"/>
      <path d="M62 146a62 62 0 0 1 34-50" stroke-width="5"/>`,
    poisson: (a) => `
      <ellipse cx="120" cy="124" rx="112" ry="72"/>
      <path d="M40 120c30-42 100-42 132 0-32 42-102 42-132 0z" fill="${a}"/>
      <path d="M170 120l38-28v56z" fill="${a}"/>
      <circle cx="68" cy="112" r="5" fill="currentColor"/>
      <path d="M90 98q-10 22 0 44" stroke-width="4"/>
      <path d="M112 170l18-12M128 176l16-6" stroke-width="4"/>`,
    gateau: (a) => `
      <path d="M30 150h176v26H30z" fill="${a}" stroke="none"/>
      <path d="M30 198V124L206 76v122z"/>
      <path d="M30 150h176M30 176h176" stroke-width="4"/>
      <circle cx="176" cy="66" r="17" fill="${a}"/>
      <path d="M166 48l10 9 10-9" stroke-width="4"/>
      <path d="M12 206h216"/>`,
    coquille: (a) => `
      <path d="M120 194L30 106a92 92 0 0 1 180 0z" fill="${a}"/>
      <path d="M120 194L62 52M120 194L90 32M120 194V28M120 194l30-162M120 194l58-142" stroke-width="4"/>
      <path d="M94 194h52l-9 16h-34z"/>`,
    coupe: (a) => `
      <path d="M40 74h160a80 62 0 0 1-160 0z" fill="${a}"/>
      <circle cx="120" cy="58" r="22" fill="currentColor" fill-opacity=".9"/>
      <circle cx="140" cy="30" r="9"/><path d="M144 22q6-12 18-14" stroke-width="4"/>
      <path d="M120 136v54M80 198h80"/>`
  };

  function coverSvg(r) {
    const c = r.cover || {};
    const fond = c.fond || "#3b2a20";
    const encre = c.encre || "#f6efe4";
    const accent = c.accent || "#c9a462";
    const motif = (MOTIFS[c.motif] || MOTIFS.assiette)(accent);
    // Coins du cadre : petites équerres dorées
    const coin = (x, y, sx, sy) => `<path d="M${x} ${y + 34 * sy}V${y}H${x + 34 * sx}" />`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
      <defs>
        <linearGradient id="l" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".1"/><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".38"/></linearGradient>
        <radialGradient id="g" cx="50%" cy="48%" r="34%"><stop offset="0" stop-color="${accent}" stop-opacity=".28"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></radialGradient>
        <pattern id="p" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M14 9l5 5-5 5-5-5z" fill="${encre}" fill-opacity=".05"/></pattern>
        <filter id="f" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="14"/></filter>
      </defs>
      <rect width="800" height="600" fill="${fond}"/><rect width="800" height="600" fill="url(#p)"/><rect width="800" height="600" fill="url(#l)"/>
      <circle cx="400" cy="290" r="290" fill="url(#g)"/>
      <circle cx="400" cy="290" r="232" fill="${fond}" fill-opacity=".5"/>
      <circle cx="400" cy="290" r="232" fill="none" stroke="${accent}" stroke-opacity=".5" stroke-width="2"/>
      <circle cx="400" cy="290" r="246" fill="none" stroke="${encre}" stroke-opacity=".16" stroke-width="1.2" stroke-dasharray="2 9"/>
      <ellipse cx="400" cy="452" rx="150" ry="16" fill="#000" fill-opacity=".35" filter="url(#f)"/>
      <rect x="24" y="24" width="752" height="552" rx="4" fill="none" stroke="${encre}" stroke-opacity=".22" stroke-width="1.2"/>
      <rect x="36" y="36" width="728" height="528" rx="2" fill="none" stroke="${accent}" stroke-opacity=".3" stroke-width="1"/>
      <g fill="none" stroke="${accent}" stroke-opacity=".85" stroke-width="2.4" stroke-linecap="round">${coin(48, 48, 1, 1)}${coin(752, 48, -1, 1)}${coin(48, 552, 1, -1)}${coin(752, 552, -1, -1)}</g>
      <g fill="${accent}" fill-opacity=".8"><path d="M400 542l7 9-7 9-7-9z"/></g><path d="M374 551h-64M426 551h64" stroke="${accent}" stroke-opacity=".5" stroke-width="1.2"/>
      <g transform="translate(212 102) scale(1.57)" fill="none" stroke="${encre}" color="${encre}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${motif}</g>
    </svg>`.replace(/\s{2,}/g, " ");
  }

  const coverCache = {};
  function coverUri(r) {
    if (!coverCache[r.key]) coverCache[r.key] = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(coverSvg(r))}`;
    return coverCache[r.key];
  }

  function imageDe(recette, index = 0) {
    const im = recette.images?.[index] || recette.images?.[0];
    if (im) return im;
    const uri = coverUri(recette);
    return { src: uri, thumb: uri, alt: `Illustration : ${recette.titre}`, cover: true };
  }

  function debounce(fn, delay = 150) {
    let t = null;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), delay);
    };
  }

  function el(html) {
    const tpl = document.createElement("template");
    tpl.innerHTML = html.trim();
    return tpl.content.firstElementChild;
  }

  /* ==========================================================================
     TOASTS
     ========================================================================== */
  let toastZone = null;

  function toast(message, duration = 3200) {
    if (!toastZone) {
      toastZone = el('<div class="toast-zone" role="status" aria-live="polite"></div>');
      body.appendChild(toastZone);
    }
    const t = el(`<div class="toast"></div>`);
    t.textContent = message;
    toastZone.appendChild(t);
    setTimeout(() => {
      t.classList.add("out");
      setTimeout(() => t.remove(), 320);
    }, duration);
  }

  /* ==========================================================================
     SON (Web Audio : aucun fichier externe)
     ========================================================================== */
  let audioCtx = null;

  function ensureAudio() {
    try {
      if (!audioCtx) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return null;
        audioCtx = new Ctx();
      }
      if (audioCtx.state === "suspended") audioCtx.resume();
      return audioCtx;
    } catch {
      return null;
    }
  }

  function bip(freq = 880, duration = 0.18, delay = 0, type = "sine", gain = 0.18) {
    const ctx = ensureAudio();
    if (!ctx) return;
    const start = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(gain, start + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.connect(g).connect(ctx.destination);
    osc.start(start);
    osc.stop(start + duration + 0.05);
  }

  function sonnerie() {
    [0, 0.25, 0.5, 1.1, 1.35, 1.6].forEach((d, i) => bip(i % 3 === 2 ? 1320 : 988, 0.2, d, "triangle", 0.22));
  }

  /* ==========================================================================
     CONFETTIS
     ========================================================================== */
  function confetti(amount = 140) {
    if (REDUCED_MOTION) return;
    const canvas = document.createElement("canvas");
    canvas.className = "confetti-canvas";
    body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    ctx.scale(dpr, dpr);
    const colors = ["#c0502e", "#e0a030", "#5d7a54", "#a13652", "#f6efe4", "#ea7651"];
    const parts = Array.from({ length: amount }, () => ({
      x: innerWidth / 2 + (Math.random() - 0.5) * innerWidth * 0.4,
      y: innerHeight * 0.35,
      vx: (Math.random() - 0.5) * 14,
      vy: -Math.random() * 14 - 4,
      w: 6 + Math.random() * 6,
      h: 8 + Math.random() * 8,
      r: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      c: colors[Math.floor(Math.random() * colors.length)]
    }));
    const start = performance.now();
    function frame(now) {
      const t = now - start;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      parts.forEach((p) => {
        p.vy += 0.35;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.r += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.globalAlpha = Math.max(0, 1 - t / 2600);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.r * 2)));
        ctx.restore();
      });
      if (t < 2600) requestAnimationFrame(frame);
      else canvas.remove();
    }
    requestAnimationFrame(frame);
  }

  function burst(target, emojis = ["♥", "✦", "♥", "✧"]) {
    if (REDUCED_MOTION || !target) return;
    const rect = target.getBoundingClientRect();
    for (let i = 0; i < 10; i++) {
      const p = document.createElement("span");
      p.className = "burst-particle";
      p.textContent = emojis[i % emojis.length];
      const angle = (Math.PI * 2 * i) / 10 + Math.random() * 0.4;
      const dist = 50 + Math.random() * 40;
      p.style.left = `${rect.left + rect.width / 2 - 9}px`;
      p.style.top = `${rect.top + rect.height / 2 - 12}px`;
      p.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
      p.style.setProperty("--dy", `${Math.sin(angle) * dist}px`);
      p.style.setProperty("--rot", `${(Math.random() - 0.5) * 120}deg`);
      body.appendChild(p);
      setTimeout(() => p.remove(), 950);
    }
  }

  /* ==========================================================================
     THÈME CLAIR / SOMBRE
     ========================================================================== */
  const THEME_KEY = "antoine-theme";

  function themeActuel() {
    const forced = document.documentElement.dataset.theme;
    if (forced) return forced;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function basculerTheme() {
    const next = themeActuel() === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      store.set(THEME_KEY, next);
    };
    if (document.startViewTransition && !REDUCED_MOTION) document.startViewTransition(apply);
    else apply();
    toast(next === "dark" ? "Ambiance tamisée activée" : "Lumière du jour activée", 1800);
  }

  /* ==========================================================================
     EN-TÊTE, MENU MOBILE, PIED DE PAGE
     ========================================================================== */
  const NAV = [
    { href: "index.html#recettes", label: "Recettes", page: "recipe" },
    { href: "jeux.html", label: "Jeux", page: "games" },
    { href: "infos.html", label: "Origines", page: "infos" },
    { href: "avis.html", label: "Avis", page: "avis" },
    { href: "questions.html", label: "Questions", page: "questions" }
  ];

  function renderHeader() {
    const isMac = /Mac|iPhone|iPad/.test(navigator.platform || "");
    const links = NAV.map(
      (n) => `<a href="${n.href}"${n.page === PAGE ? ' aria-current="page"' : ""}>${n.label}</a>`
    ).join("");

    const header = el(`
      <header class="site-header" data-header>
        <div class="container header-inner">
          <a class="brand" href="index.html" aria-label="Le restaurant d'Antoine, accueil">
            <span class="brand-mark">${LOGO}</span>
            <span class="brand-text"><strong>Le restaurant</strong><em>d'Antoine</em></span>
          </a>
          <nav class="main-nav" aria-label="Navigation principale">${links}</nav>
          <div class="header-actions">
            <button class="icon-btn search-trigger" type="button" data-open-search aria-label="Rechercher une recette">
              ${icon("search")}<span class="label">Rechercher</span><span class="kbd">${isMac ? "⌘" : "Ctrl"} K</span>
            </button>
            <button class="icon-btn" type="button" data-open-list aria-label="Ma liste de courses">
              ${icon("basket")}<span class="badge-count" data-list-count hidden>0</span>
            </button>
            <button class="icon-btn theme-toggle" type="button" data-theme-toggle aria-label="Changer de thème">
              ${icon("sun", "icon-sun")}${icon("moon", "icon-moon")}
            </button>
            <button class="icon-btn menu-btn" type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-menu" aria-label="Ouvrir le menu"><span></span></button>
          </div>
        </div>
      </header>`);

    const skip = el('<a class="skip-link" href="#main">Aller au contenu</a>');
    const menu = el(`<nav class="mobile-menu" id="mobile-menu" hidden aria-label="Menu mobile">
        <a href="index.html" style="--i:0">Accueil</a>
        ${NAV.map((n, i) => `<a href="${n.href}" style="--i:${i + 1}"${n.page === PAGE ? ' aria-current="page"' : ""}>${n.label}</a>`).join("")}
      </nav>`);

    body.prepend(skip, header, menu);

    const toggle = header.querySelector("[data-menu-toggle]");
    const setMenu = (open) => {
      menu.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
      body.style.overflow = open ? "hidden" : "";
      body.classList.toggle("menu-open", open);
    };
    toggle.addEventListener("click", () => setMenu(menu.hidden));
    menu.addEventListener("click", (e) => {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !menu.hidden) setMenu(false);
    });

    header.querySelector("[data-theme-toggle]").addEventListener("click", basculerTheme);

    // En-tête qui se cache en descendant et réapparaît en remontant.
    // Sur l'accueil et les recettes, il reste transparent tant qu'on est sur la grande photo
    // (la couverture d'une recette est créée plus tard par initRecipe, d'où la recherche à chaque fois).
    let lastY = scrollY;
    const onScroll = () => {
      const y = scrollY;
      const hero = document.querySelector(".hero-cine, .r-cover");
      header.classList.toggle("is-scrolled", y > 8);
      header.classList.toggle("is-solid", !hero || y > hero.offsetHeight - header.offsetHeight - 10);
      const goingDown = y > lastY + 4;
      const goingUp = y < lastY - 4;
      if (goingDown && y > 320 && menu.hidden) header.classList.add("is-hidden");
      if (goingUp || y < 120) header.classList.remove("is-hidden");
      lastY = y;
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function renderFooter() {
    const cats = Object.entries(META.CATEGORIES)
      .map(([key, c]) => `<li><a href="index.html?cat=${key}#recettes">${c.label}</a></li>`)
      .join("");
    const footer = el(`
      <footer class="site-footer">
        <div class="container">
          <div class="footer-sign">
            <p>Bon appétit.</p>
            <a class="btn btn-gold" href="index.html#recettes">Voir la carte ${icon("arrow")}</a>
          </div>
          <div class="footer-grid">
            <div>
              <a class="brand" href="index.html" aria-label="Accueil">
                <span class="brand-mark">${LOGO}</span>
                <span class="brand-text"><strong>Le restaurant</strong><em>d'Antoine</em></span>
              </a>
              <p class="footer-tagline">Les recettes de la famille, à cuisiner ensemble, à partager et à refaire encore.</p>
            </div>
            <div>
              <h4>Recettes</h4>
              <ul>${cats}</ul>
            </div>
            <div>
              <h4>Le restaurant</h4>
              <ul>
                <li><a href="jeux.html">Mini-jeux</a></li>
                <li><a href="infos.html">Origines des plats</a></li>
                <li><a href="avis.html">Livre d'or</a></li>
                <li><a href="questions.html">Poser une question</a></li>
              </ul>
            </div>
            <div>
              <h4>Outils</h4>
              <ul>
                <li><a href="#" data-open-search>Rechercher</a></li>
                <li><a href="#" data-open-list>Liste de courses</a></li>
                <li><a href="#" data-open-chat>Assistant du chef</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© ${new Date().getFullYear()} Le restaurant d'Antoine · Codé avec passion pour la famille.</span>
            <span>Fait maison, servi avec amour.</span>
          </div>
        </div>
      </footer>`);
    body.appendChild(footer);
  }

  /* ==========================================================================
     RÉVÉLATIONS AU DÉFILEMENT
     ========================================================================== */
  let revealObserver = null;

  function observeReveal(root = document) {
    const items = root.querySelectorAll("[data-reveal]:not(.is-visible)");
    if (!("IntersectionObserver" in window) || REDUCED_MOTION) {
      items.forEach((i) => i.classList.add("is-visible"));
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
    }
    items.forEach((i) => revealObserver.observe(i));
  }

  /* ==========================================================================
     LIKES (le comptage est géré par likes-firebase.js)
     ========================================================================== */
  const likeCounts = {};

  function likeButton(key) {
    return `<button class="btn like-btn" type="button" data-like="${esc(key)}" aria-pressed="false" title="Liker cette recette">
        ${icon("heart")}<span data-like-count="${esc(key)}">${likeCounts[key] ?? "–"}</span>
      </button>`;
  }

  document.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-like]");
    if (!btn) return;
    const key = btn.dataset.like;
    if (typeof window.toggleLike !== "function") {
      toast("Les likes ne sont pas disponibles pour le moment (connexion au serveur impossible).");
      return;
    }
    const willLike = btn.getAttribute("aria-pressed") !== "true";
    btn.classList.remove("pop");
    void btn.offsetWidth;
    btn.classList.add("pop");
    if (willLike) burst(btn);
    window.toggleLike(key);
  });

  document.addEventListener("antoine:likes", (event) => {
    Object.assign(likeCounts, event.detail?.counts || {});
    renderTopRecipe();
    document.querySelectorAll("[data-card-likes]").forEach((node) => {
      const n = likeCounts[node.dataset.cardLikes];
      node.textContent = n ?? "–";
      // Pas de « ♥ 0 » sur les cartes : le compteur n'apparaît qu'à partir du premier like.
      node.parentElement.hidden = !(n > 0);
    });
  });

  /* ==========================================================================
     LISTE DE COURSES
     ========================================================================== */
  const LIST_KEY = "antoine-liste-courses";
  let listDrawer = null;
  let overlay = null;

  function getList() {
    const data = store.json(LIST_KEY, []);
    return Array.isArray(data) ? data : [];
  }

  function saveList(list) {
    store.setJson(LIST_KEY, list);
    updateListBadge(true);
    if (listDrawer && !listDrawer.hidden) renderListDrawer();
  }

  function updateListBadge(bump = false) {
    const count = getList().filter((i) => !i.checked).length;
    document.querySelectorAll("[data-list-count]").forEach((badge) => {
      badge.hidden = count === 0;
      badge.textContent = String(count);
      if (bump && count) {
        badge.classList.remove("bump");
        void badge.offsetWidth;
        badge.classList.add("bump");
      }
    });
  }

  function addRecipeToList(recette, portions) {
    const list = getList().filter((i) => i.recette !== recette.key);
    tousIngredients(recette).forEach((item, idx) => {
      list.push({
        id: `${recette.key}-${idx}`,
        recette: recette.key,
        nom: item.nom,
        qte: quantiteIngredient(item, recette, portions),
        optionnel: !!item.optionnel,
        checked: false
      });
    });
    saveList(list);
    toast(`Ingrédients « ${recette.titreCourt} » ajoutés à ta liste (${portionsLabel(recette, portions)}).`);
  }

  function listAsText() {
    const list = getList();
    const groups = {};
    list.forEach((i) => (groups[i.recette] = groups[i.recette] || []).push(i));
    return Object.entries(groups)
      .map(([key, items]) => {
        const titre = BY_KEY[key]?.titreCourt || key;
        return `${titre}\n${items.map((i) => `${i.checked ? "✓" : "•"} ${i.nom}${i.qte ? ` : ${i.qte}` : ""}`).join("\n")}`;
      })
      .join("\n\n");
  }

  function ensureOverlay() {
    if (overlay) return overlay;
    overlay = el('<div class="overlay" hidden></div>');
    overlay.addEventListener("click", closePanels);
    body.appendChild(overlay);
    return overlay;
  }

  function closePanels() {
    if (listDrawer) listDrawer.hidden = true;
    if (palette) palette.hidden = true;
    if (overlay) overlay.hidden = true;
    body.style.overflow = "";
  }

  function renderListDrawer() {
    const list = getList();
    const bodyEl = listDrawer.querySelector(".drawer-body");
    if (!list.length) {
      bodyEl.innerHTML = `<div class="empty-state"><span class="big">${icon("basket")}</span><strong>Ta liste est vide</strong>
        <span>Sur une recette, clique sur « Ajouter à ma liste » : les quantités suivent le nombre de portions.</span></div>`;
      return;
    }
    const groups = {};
    list.forEach((i) => (groups[i.recette] = groups[i.recette] || []).push(i));
    bodyEl.innerHTML = Object.entries(groups)
      .map(([key, items]) => {
        const r = BY_KEY[key];
        return `<div class="list-group">
          <div class="list-group-head">
            <h3>${r ? esc(r.titreCourt) : esc(key)}</h3>
            <button class="icon-btn" type="button" data-remove-group="${esc(key)}" aria-label="Retirer cette recette">${icon("trash")}</button>
          </div>
          ${items
            .map(
              (i) => `<label class="list-item${i.checked ? " is-checked" : ""}">
                <input class="check-input" type="checkbox" data-list-item="${esc(i.id)}"${i.checked ? " checked" : ""}>
                <span class="ing-name">${esc(i.nom)}${i.optionnel ? '<span class="opt-tag">option</span>' : ""}</span>
                <span class="ing-qty">${esc(i.qte)}</span>
              </label>`
            )
            .join("")}
        </div>`;
      })
      .join("");
  }

  function openList() {
    if (!listDrawer) {
      listDrawer = el(`<aside class="drawer" hidden role="dialog" aria-modal="true" aria-labelledby="list-title">
          <div class="drawer-head">
            <h2 id="list-title">Ma liste de courses</h2>
            <button class="icon-btn" type="button" data-close aria-label="Fermer">${icon("x")}</button>
          </div>
          <div class="drawer-body"></div>
          <div class="drawer-foot">
            <button class="btn btn-sm" type="button" data-copy-list>${icon("copy")} Copier</button>
            <button class="btn btn-sm" type="button" data-clear-list>${icon("trash")} Vider</button>
          </div>
        </aside>`);
      body.appendChild(listDrawer);
      listDrawer.querySelector("[data-close]").addEventListener("click", closePanels);
      listDrawer.addEventListener("change", (e) => {
        const id = e.target.dataset.listItem;
        if (!id) return;
        const list = getList().map((i) => (i.id === id ? { ...i, checked: e.target.checked } : i));
        saveList(list);
      });
      listDrawer.addEventListener("click", (e) => {
        const group = e.target.closest("[data-remove-group]");
        if (group) saveList(getList().filter((i) => i.recette !== group.dataset.removeGroup));
        if (e.target.closest("[data-clear-list]")) {
          if (!getList().length) return;
          saveList([]);
          toast("Liste vidée.");
        }
        if (e.target.closest("[data-copy-list]")) {
          const text = listAsText();
          if (!text) return toast("Ta liste est vide.");
          copyText(`Ma liste de courses — Le restaurant d'Antoine\n\n${text}`, "Liste copiée : colle-la dans tes notes ou un message.");
        }
      });
    }
    renderListDrawer();
    ensureOverlay().hidden = false;
    listDrawer.hidden = false;
    body.style.overflow = "hidden";
    listDrawer.querySelector("[data-close]").focus();
  }

  function copyText(text, okMessage) {
    const done = () => toast(okMessage);
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text) && done());
    } else if (fallbackCopy(text)) {
      done();
    }
  }

  function fallbackCopy(text) {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      if (!ok) toast("Copie impossible sur ce navigateur.");
      return ok;
    } catch {
      toast("Copie impossible sur ce navigateur.");
      return false;
    }
  }

  /* ==========================================================================
     RECHERCHE (palette Ctrl/⌘ + K)
     ========================================================================== */
  let palette = null;
  const EXTRA_PAGES = [
    { titre: "Mini-jeux du restaurant", url: "jeux.html", icon: "sparkles", mots: "jeux jeu jouer memory quiz commandes course runner" },
    { titre: "Memory du chef", url: "memory.html", icon: "cards", mots: "memory paires cartes jeu" },
    { titre: "Quiz du chef", url: "quiz.html", icon: "question", mots: "quiz questions jeu culture" },
    { titre: "Coup de feu en cuisine", url: "commandes.html", icon: "bell", mots: "commandes service burger assembler jeu" },
    { titre: "Service infini (course)", url: "index2.html", icon: "run", mots: "course runner chef jeu sauter" },
    { titre: "Origines des plats", url: "infos.html", icon: "globe", mots: "origines histoire culture pays infos" },
    { titre: "Livre d'or", url: "avis.html", icon: "star", mots: "avis note livre d or commentaires" },
    { titre: "Poser une question", url: "questions.html", icon: "mail", mots: "question contact message chef" }
  ];

  function searchIndex(query) {
    const q = normalize(query);
    const tokens = q.split(" ").filter(Boolean);
    if (!tokens.length) {
      return RECETTES.map((r) => ({ type: "recette", r, score: 1 }));
    }
    const results = [];
    RECETTES.forEach((r) => {
      const titre = normalize(`${r.titre} ${r.titreCourt}`);
      const cat = normalize(META.CATEGORIES[r.categorie]?.label || "");
      const tags = normalize(r.tags.join(" "));
      const ings = normalize(tousIngredients(r).map((i) => i.nom).join(" "));
      let score = 0;
      let matchedIng = "";
      const ok = tokens.every((t) => {
        let s = 0;
        if (titre.includes(t)) s += titre.startsWith(t) ? 8 : 5;
        if (cat.includes(t)) s += 3;
        if (tags.includes(t)) s += 2;
        if (ings.includes(t)) {
          s += 1.5;
          matchedIng = matchedIng || tousIngredients(r).find((i) => normalize(i.nom).includes(t))?.nom || "";
        }
        score += s;
        return s > 0;
      });
      if (ok) results.push({ type: "recette", r, score, matchedIng });
    });
    EXTRA_PAGES.forEach((p) => {
      const hay = normalize(`${p.titre} ${p.mots}`);
      if (tokens.every((t) => hay.includes(t))) results.push({ type: "page", p, score: 2 });
    });
    return results.sort((a, b) => b.score - a.score);
  }

  function highlight(text, query) {
    const tokens = normalize(query).split(" ").filter((t) => t.length > 1);
    let out = esc(text);
    if (!tokens.length) return out;
    const norm = normalize(text);
    // Surligne seulement la première occurrence du premier mot trouvé (texte court).
    for (const t of tokens) {
      const idx = norm.indexOf(t);
      if (idx >= 0 && norm.length === text.length) {
        out = `${esc(text.slice(0, idx))}<mark>${esc(text.slice(idx, idx + t.length))}</mark>${esc(text.slice(idx + t.length))}`;
        break;
      }
    }
    return out;
  }

  function openSearch(initial = "") {
    if (!palette) {
      palette = el(`<div class="palette" hidden role="dialog" aria-modal="true" aria-label="Rechercher">
          <div class="palette-input">
            ${icon("search")}
            <input type="search" placeholder="Une recette, un ingrédient (chocolat, œufs…)" aria-label="Rechercher" autocomplete="off" role="combobox" aria-expanded="true" aria-controls="palette-results">
            <button class="icon-btn" type="button" data-close aria-label="Fermer">${icon("x")}</button>
          </div>
          <ul class="palette-results" id="palette-results" role="listbox"></ul>
          <div class="palette-foot"><span>↑ ↓ pour naviguer</span><span>Entrée pour ouvrir</span><span>Échap pour fermer</span></div>
        </div>`);
      body.appendChild(palette);
      const input = palette.querySelector("input");
      const list = palette.querySelector(".palette-results");
      let active = 0;

      const render = () => {
        const results = searchIndex(input.value).slice(0, 8);
        active = 0;
        if (!results.length) {
          list.innerHTML = `<li class="palette-empty">Aucun résultat pour « ${esc(input.value)} ».<br>Essaie un ingrédient, ou demande à l'assistant du chef !</li>`;
          return;
        }
        list.innerHTML = results
          .map((res, i) => {
            if (res.type === "page") {
              return `<li><a href="${res.p.url}" role="option" aria-selected="${i === 0}">
                  <span class="emoji-tile">${icon(res.p.icon || "search")}</span>
                  <span><strong>${highlight(res.p.titre, input.value)}</strong><small>Page du site</small></span>
                  ${icon("right")}
                </a></li>`;
            }
            const r = res.r;
            const sub = res.matchedIng
              ? `Contient : ${esc(res.matchedIng)}`
              : `${esc(META.CATEGORIES[r.categorie]?.singulier || "")} · ${duree(META.tempsTotal(r))}`;
            return `<li><a href="${r.url}" role="option" aria-selected="${i === 0}">
                <img src="${imageDe(r).thumb}" alt="" loading="lazy">
                <span><strong>${highlight(r.titre, input.value)}</strong><small>${sub}</small></span>
                ${icon("right")}
              </a></li>`;
          })
          .join("");
      };

      const setActive = (i) => {
        const links = [...list.querySelectorAll("a")];
        if (!links.length) return;
        active = (i + links.length) % links.length;
        links.forEach((a, idx) => a.setAttribute("aria-selected", String(idx === active)));
        links[active].scrollIntoView({ block: "nearest" });
      };

      input.addEventListener("input", debounce(render, 60));
      input.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setActive(active + 1);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setActive(active - 1);
        } else if (e.key === "Enter") {
          const link = list.querySelectorAll("a")[active];
          if (link) {
            e.preventDefault();
            location.href = link.getAttribute("href");
          }
        }
      });
      palette.querySelector("[data-close]").addEventListener("click", closePanels);
      palette.render = render;
    }
    const input = palette.querySelector("input");
    input.value = initial;
    palette.render();
    ensureOverlay().hidden = false;
    palette.hidden = false;
    setTimeout(() => input.focus(), 30);
  }

  document.addEventListener("keydown", (e) => {
    const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || "") || document.activeElement?.isContentEditable;
    if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      openSearch();
    } else if (e.key === "/" && !typing) {
      e.preventDefault();
      openSearch();
    } else if (e.key === "Escape") {
      if ((palette && !palette.hidden) || (listDrawer && !listDrawer.hidden)) closePanels();
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-open-search]")) {
      e.preventDefault();
      openSearch();
    } else if (e.target.closest("[data-open-list]")) {
      e.preventDefault();
      openList();
    }
  });

  /* ==========================================================================
     MINUTEURS (plusieurs en parallèle, conservés d'une page à l'autre)
     ========================================================================== */
  const TIMERS_KEY = "antoine-minuteurs";
  let timers = store.json(TIMERS_KEY, []);
  if (!Array.isArray(timers)) timers = [];
  let dock = null;
  let tickHandle = null;
  const originalTitle = document.title;

  function saveTimers() {
    store.setJson(TIMERS_KEY, timers);
  }

  function remaining(t) {
    if (t.done) return 0;
    if (t.paused) return t.left;
    return Math.max(0, (t.endAt - Date.now()) / 1000);
  }

  function startTimer(seconds, label = "Minuteur", recette = "") {
    ensureAudio();
    const s = Math.max(1, Math.round(Number(seconds) || 0));
    const t = { id: `t${Date.now()}${Math.random().toString(16).slice(2, 6)}`, label, recette, total: s, endAt: Date.now() + s * 1000, paused: false, left: s, done: false };
    timers.push(t);
    saveTimers();
    renderDock();
    toast(`Minuteur lancé : ${label} (${dureeSecondes(s)})`, 2200);
    return t;
  }

  function renderDock() {
    if (!dock) {
      dock = el('<div class="timer-dock" aria-live="polite" aria-label="Minuteurs"></div>');
      body.appendChild(dock);
      dock.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-timer-action]");
        if (!btn) return;
        const t = timers.find((x) => x.id === btn.dataset.id);
        if (!t) return;
        const action = btn.dataset.timerAction;
        if (action === "toggle") {
          if (t.paused) {
            t.paused = false;
            t.endAt = Date.now() + t.left * 1000;
          } else {
            t.left = remaining(t);
            t.paused = true;
          }
        } else if (action === "add") {
          if (t.done) {
            t.done = false;
            t.paused = false;
            t.endAt = Date.now() + 60000;
            t.total = 60;
          } else if (t.paused) {
            t.left += 60;
            t.total += 60;
          } else {
            t.endAt += 60000;
            t.total += 60;
          }
        } else if (action === "close") {
          timers = timers.filter((x) => x.id !== t.id);
        }
        saveTimers();
        renderDock();
      });
    }
    dock.innerHTML = timers
      .map((t) => {
        const r = BY_KEY[t.recette];
        return `<div class="timer${t.paused ? " is-paused" : ""}${t.done ? " is-done" : ""}" data-timer="${t.id}">
          <div class="timer-ring">
            <svg viewBox="0 0 44 44"><circle class="track" cx="22" cy="22" r="18"/><circle class="bar" cx="22" cy="22" r="18" stroke-dasharray="113.1" stroke-dashoffset="0"/></svg>
            <span>${icon(t.done ? "bell" : "timer")}</span>
          </div>
          <div class="timer-info"><small>${esc(t.label)}${r ? ` · ${esc(r.titreCourt)}` : ""}</small><strong>${t.done ? "C'est prêt !" : clock(remaining(t))}</strong></div>
          <div class="timer-btns">
            ${t.done ? "" : `<button class="icon-btn" type="button" data-timer-action="toggle" data-id="${t.id}" aria-label="${t.paused ? "Reprendre" : "Pause"}">${icon(t.paused ? "play" : "pause")}</button>`}
            <button class="icon-btn" type="button" data-timer-action="add" data-id="${t.id}" aria-label="Ajouter une minute">${icon("plus")}</button>
            <button class="icon-btn" type="button" data-timer-action="close" data-id="${t.id}" aria-label="${t.done ? "Arrêter" : "Annuler"}">${icon("x")}</button>
          </div>
        </div>`;
      })
      .join("");
    tickTimers();
    if (timers.length && !tickHandle) tickHandle = setInterval(tickTimers, 250);
    if (!timers.length && tickHandle) {
      clearInterval(tickHandle);
      tickHandle = null;
      document.title = originalTitle;
    }
  }

  function tickTimers() {
    let changed = false;
    let ringing = false;
    timers.forEach((t) => {
      const node = dock?.querySelector(`[data-timer="${t.id}"]`);
      const left = remaining(t);
      if (!t.done && !t.paused && left <= 0) {
        t.done = true;
        changed = true;
        sonnerie();
        try {
          navigator.vibrate?.([300, 150, 300, 150, 300]);
        } catch {
          /* vibration non disponible */
        }
        toast(`${t.label} : c'est prêt !`, 6000);
      }
      if (t.done) ringing = true;
      if (node && !changed) {
        const strong = node.querySelector(".timer-info strong");
        if (strong && !t.done) strong.textContent = clock(left);
        const bar = node.querySelector(".bar");
        if (bar) bar.style.strokeDashoffset = String(113.1 * (1 - left / t.total));
      }
    });
    if (changed) {
      saveTimers();
      renderDock();
      return;
    }
    if (ringing) {
      document.title = document.title === originalTitle ? "🔔 C'est prêt !" : originalTitle;
    } else if (document.title !== originalTitle) {
      document.title = originalTitle;
    }
  }

  document.addEventListener("click", (e) => {
    const chip = e.target.closest("[data-start-timer]");
    if (!chip) return;
    startTimer(Number(chip.dataset.startTimer), chip.dataset.label || "Minuteur", chip.dataset.recette || "");
  });

  /* ==========================================================================
     LIGHTBOX
     ========================================================================== */
  let lightbox = null;

  function openLightbox(images, index = 0) {
    if (!images.length) return;
    if (!lightbox) {
      lightbox = el(`<div class="lightbox" hidden role="dialog" aria-modal="true" aria-label="Photo agrandie">
          <img alt="">
          <button class="icon-btn lb-close" type="button" aria-label="Fermer">${icon("x")}</button>
          <button class="icon-btn lb-prev" type="button" aria-label="Photo précédente">${icon("left")}</button>
          <button class="icon-btn lb-next" type="button" aria-label="Photo suivante">${icon("right")}</button>
          <p class="lb-caption"></p>
        </div>`);
      body.appendChild(lightbox);
      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox || e.target.closest(".lb-close")) closeLightbox();
        if (e.target.closest(".lb-prev")) showLb(lightbox.index - 1);
        if (e.target.closest(".lb-next")) showLb(lightbox.index + 1);
      });
      document.addEventListener("keydown", (e) => {
        if (lightbox.hidden) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") showLb(lightbox.index - 1);
        if (e.key === "ArrowRight") showLb(lightbox.index + 1);
      });
    }
    lightbox.images = images;
    lightbox.hidden = false;
    body.style.overflow = "hidden";
    const multi = images.length > 1;
    lightbox.querySelector(".lb-prev").hidden = !multi;
    lightbox.querySelector(".lb-next").hidden = !multi;
    showLb(index);
    lightbox.querySelector(".lb-close").focus();
  }

  function showLb(i) {
    const imgs = lightbox.images;
    lightbox.index = (i + imgs.length) % imgs.length;
    const img = lightbox.querySelector("img");
    img.src = imgs[lightbox.index].src;
    img.alt = imgs[lightbox.index].alt;
    lightbox.querySelector(".lb-caption").textContent = `${imgs[lightbox.index].alt}${imgs.length > 1 ? ` · ${lightbox.index + 1}/${imgs.length}` : ""}`;
  }

  function closeLightbox() {
    lightbox.hidden = true;
    body.style.overflow = "";
  }

  /* ==========================================================================
     CARTE RECETTE (accueil, suggestions)
     ========================================================================== */
  function recipeCard(r, { transition = false, index = 0 } = {}) {
    const img = imageDe(r);
    const cat = META.CATEGORIES[r.categorie];
    return `<a class="recipe-card" href="${r.url}" data-reveal style="--i:${index % 6}" data-key="${r.key}">
        <div class="recipe-card-media">
          <img src="${img.thumb}" alt="${esc(img.alt)}" loading="lazy" width="640" height="512"${transition ? ` style="view-transition-name: photo-${r.key}"` : ""}>
          <div class="card-badges">
            ${r.badge ? `<span class="pill pill-glass">${esc(r.badge)}</span>` : "<span></span>"}
          </div>
          <span class="card-like" aria-label="Likes"${likeCounts[r.key] > 0 ? "" : " hidden"}>${icon("heart")}<span data-card-likes="${r.key}">${likeCounts[r.key] ?? "–"}</span></span>
        </div>
        <div class="recipe-card-body">
          <span class="card-cat">${esc(cat?.singulier || "")}</span>
          <h3>${esc(r.titreCourt)}</h3>
          <p>${esc(r.accroche)}</p>
          <div class="recipe-card-meta">
            <span>${icon("clock")} ${duree(META.tempsTotal(r))}</span>
            <span>${icon("flame")} ${esc(r.difficulte)}</span>
            <span>${icon("users")} ${portionsLabel(r, r.portions.base)}</span>
          </div>
        </div>
        <span class="card-arrow">${icon("arrow")}</span>
      </a>`;
  }

  /* ==========================================================================
     ACCUEIL
     ========================================================================== */
  function renderTopRecipe() {
    const box = document.getElementById("topRecipe");
    if (!box) return;
    let best = null;
    RECETTES.forEach((r) => {
      const n = likeCounts[r.key] || 0;
      if (n > 0 && (!best || n > (likeCounts[best.key] || 0))) best = r;
    });
    if (!best) {
      box.innerHTML = `<p class="muted">Les likes des visiteurs feront apparaître ici la recette préférée de la maison. Donne ton cœur à ta recette favorite !</p>`;
      return;
    }
    const n = likeCounts[best.key];
    box.innerHTML = `<a class="top-recipe" href="${best.url}">
        <img src="${imageDe(best).thumb}" alt="">
        <span><small class="muted top-likes">${icon("heart")} ${n} like${n > 1 ? "s" : ""}</small><strong>${esc(best.titreCourt)}</strong></span>
      </a>`;
  }

  function initHome() {
    // Héros plein écran : diaporama des photos de la maison (effet Ken Burns)
    const media = document.getElementById("heroMedia");
    const nowTitle = document.getElementById("heroNowTitle");
    const nowLink = document.getElementById("heroNow");
    const progress = document.getElementById("heroProgress");
    const avecPhoto = RECETTES.filter((r) => r.images?.length);
    if (media && avecPhoto.length) {
      const SLIDE_MS = 6500;
      const ORIGINES = ["30% 40%", "70% 35%", "50% 60%", "40% 70%", "65% 55%"];
      media.innerHTML = avecPhoto
        .map(
          (r, i) => `<div class="hero-slide${i === 0 ? " is-active" : ""}" style="--ox:${ORIGINES[i % 5].split(" ")[0]};--oy:${ORIGINES[i % 5].split(" ")[1]}">
            <img src="${r.images[0].src}" alt=""${i === 0 ? ' fetchpriority="high"' : ' loading="lazy"'} width="1600" height="1100">
          </div>`
        )
        .join("");
      if (progress) {
        progress.style.setProperty("--slide-ms", `${SLIDE_MS}ms`);
        progress.innerHTML = avecPhoto.map(() => "<i></i>").join("");
      }
      const slides = [...media.querySelectorAll(".hero-slide")];
      const bars = progress ? [...progress.querySelectorAll("i")] : [];
      let current = 0;
      const show = (i) => {
        slides[current].classList.remove("is-active");
        current = (i + slides.length) % slides.length;
        const slide = slides[current];
        // relance l'animation Ken Burns
        const img = slide.querySelector("img");
        img.style.animation = "none";
        void img.offsetWidth;
        img.style.animation = "";
        slide.classList.add("is-active");
        const r = avecPhoto[current];
        if (nowTitle) nowTitle.textContent = r.titre;
        if (nowLink) nowLink.href = r.url;
        bars.forEach((b, idx) => {
          b.className = idx < current ? "done" : idx === current ? "now" : "";
        });
      };
      show(0);
      if (!REDUCED_MOTION && slides.length > 1) {
        let timer = setInterval(() => show(current + 1), SLIDE_MS);
        document.addEventListener("visibilitychange", () => {
          clearInterval(timer);
          if (!document.hidden) timer = setInterval(() => show(current + 1), SLIDE_MS);
        });
      }
    }

    // Titre animé mot à mot
    const title = document.querySelector("[data-split]");
    if (title && !REDUCED_MOTION) {
      let i = 0;
      const wrap = (node) => {
        [...node.childNodes].forEach((child) => {
          if (child.nodeType === Node.TEXT_NODE) {
            const frag = document.createDocumentFragment();
            child.textContent.split(/(\s+)/).forEach((part) => {
              if (!part) return;
              if (/^\s+$/.test(part)) {
                frag.appendChild(document.createTextNode(part));
              } else {
                const w = document.createElement("span");
                w.className = "word";
                w.innerHTML = `<span style="--i:${i++}">${esc(part)}</span>`;
                frag.appendChild(w);
              }
            });
            child.replaceWith(frag);
          } else if (child.nodeType === Node.ELEMENT_NODE && !child.classList.contains("squiggle-svg")) {
            wrap(child);
          }
        });
      };
      wrap(title);
    }

    // Statistiques calculées depuis les données
    const stats = document.getElementById("heroStats");
    if (stats) {
      const etapes = RECETTES.reduce((n, r) => n + r.etapes.length, 0);
      const minuteurs = RECETTES.reduce((n, r) => n + r.etapes.reduce((m, e) => m + (e.minuteurs?.length || 0), 0), 0);
      stats.innerHTML = `
        <div><strong>${RECETTES.length}</strong><span>recettes</span></div>
        <div><strong>${etapes}</strong><span>étapes guidées</span></div>
        <div><strong>${minuteurs}</strong><span>minuteurs</span></div>
        <div><strong>4</strong><span>mini-jeux</span></div>`;
    }

    // Bandeau défilant
    const marquee = document.getElementById("marqueeTrack");
    if (marquee) {
      const items = RECETTES.map((r) => `<span>${esc(r.titreCourt)}</span>`).join("");
      marquee.innerHTML = items + items;
    }

    // Grille + filtres
    const grid = document.getElementById("recipeGrid");
    const filters = document.getElementById("recipeFilters");
    const search = document.getElementById("recipeSearch");
    const empty = document.getElementById("recipeEmpty");
    const count = document.getElementById("recipeCount");
    if (grid) {
      grid.innerHTML = RECETTES.map((r, i) => recipeCard(r, { transition: true, index: i })).join("");
      const FILTRES = [
        { id: "tout", label: "Tout", test: () => true },
        ...Object.entries(META.CATEGORIES).map(([key, c]) => ({ id: key, label: c.label, test: (r) => r.categorie === key })),
        { id: "gastro", label: "Gastronomique", test: (r) => r.tags.includes("gastronomique") },
        { id: "rapide", label: "30 min max", test: (r) => META.tempsTotal(r) <= 30 },
        { id: "sansviande", label: "Sans viande", test: (r) => r.regime?.sansViande }
      ].filter((f) => RECETTES.some(f.test));
      const params = new URLSearchParams(location.search);
      let active = FILTRES.some((f) => f.id === params.get("cat")) ? params.get("cat") : "tout";
      filters.innerHTML = FILTRES.map(
        (f) =>
          `<button class="chip" type="button" data-filter="${f.id}" aria-pressed="${f.id === active}">${f.label}<span class="chip-count">${RECETTES.filter(f.test).length}</span></button>`
      ).join("");

      // Sans recherche, on montre les recettes par paquets de 12 avec « Voir plus ».
      const PAQUET = 12;
      let limiteVisible = PAQUET;
      const more = document.getElementById("recipeMore");
      more?.addEventListener("click", () => {
        limiteVisible += PAQUET;
        apply();
        observeReveal(grid);
      });

      const apply = () => {
        const f = FILTRES.find((x) => x.id === active);
        const q = normalize(search.value);
        const limite = q ? Infinity : limiteVisible;
        let visible = 0;
        let matches = 0;
        grid.querySelectorAll(".recipe-card").forEach((card) => {
          const r = BY_KEY[card.dataset.key];
          const hay = normalize(`${r.titre} ${r.accroche} ${r.tags.join(" ")} ${tousIngredients(r).map((i) => i.nom).join(" ")}`);
          const match = f.test(r) && (!q || q.split(" ").every((t) => hay.includes(t)));
          if (match) matches++;
          const show = match && visible < limite;
          card.classList.toggle("is-hidden", !show);
          if (show) visible++;
        });
        empty.hidden = matches > 0;
        count.textContent = `${matches} recette${matches > 1 ? "s" : ""}`;
        if (more) {
          more.hidden = visible >= matches;
          more.textContent = `Voir plus de recettes (${matches - visible})`;
        }
      };

      filters.addEventListener("click", (e) => {
        const b = e.target.closest("[data-filter]");
        if (!b) return;
        active = b.dataset.filter;
        limiteVisible = PAQUET;
        filters.querySelectorAll("[data-filter]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        apply();
      });
      search.addEventListener("input", debounce(apply, 80));
      apply();
    }

    // Roulette « Je ne sais pas quoi cuisiner »
    const spin = document.getElementById("rouletteBtn");
    if (spin) {
      const win = document.getElementById("rouletteWindow");
      const name = document.getElementById("rouletteName");
      const go = document.getElementById("rouletteGo");
      let last = -1;
      spin.addEventListener("click", () => {
        ensureAudio();
        spin.disabled = true;
        win.classList.add("is-spinning");
        let target;
        do {
          target = Math.floor(Math.random() * RECETTES.length);
        } while (target === last && RECETTES.length > 1);
        last = target;
        let n = 0;
        const total = REDUCED_MOTION ? 1 : 16;
        const step = () => {
          const r = n >= total - 1 ? RECETTES[target] : RECETTES[Math.floor(Math.random() * RECETTES.length)];
          win.innerHTML = `<img src="${imageDe(r).thumb}" alt="">`;
          name.textContent = r.titreCourt;
          bip(500 + n * 30, 0.05, 0, "square", 0.05);
          n++;
          if (n < total) {
            setTimeout(step, 40 + n * n * 1.2);
          } else {
            win.classList.remove("is-spinning");
            spin.disabled = false;
            go.href = r.url;
            go.hidden = false;
            bip(1046, 0.25, 0, "triangle", 0.15);
            burst(win, ["✦", "✧", "✦"]);
          }
        };
        step();
      });
    }

    renderTopRecipe();
  }

  /* ==========================================================================
     PAGE RECETTE
     ========================================================================== */
  function initRecipe() {
    const key = body.dataset.recipe;
    const r = BY_KEY[key];
    const main = document.getElementById("main");
    if (!r || !main) return;

    const PROGRESS_KEY = `antoine-progression-${r.key}`;
    const saved = store.json(PROGRESS_KEY, {});
    const state = {
      portions: Number(saved.portions) || r.portions.base,
      etapes: new Set(saved.etapes || []),
      ings: new Set(saved.ings || []),
      choix: new Set(saved.choix || [])
    };
    const persist = () =>
      store.setJson(PROGRESS_KEY, {
        portions: state.portions,
        etapes: [...state.etapes],
        ings: [...state.ings],
        choix: [...state.choix]
      });

    const idx = RECETTES.indexOf(r);
    const prev = RECETTES[(idx - 1 + RECETTES.length) % RECETTES.length];
    const next = RECETTES[(idx + 1) % RECETTES.length];
    const cat = META.CATEGORIES[r.categorie] || { label: "", singulier: "" };
    const total = META.tempsTotal(r);
    const related = RECETTES.filter((x) => x.key !== r.key)
      .map((x) => ({ x, s: x.tags.filter((t) => r.tags.includes(t)).length + (x.categorie === r.categorie ? 2 : 0) }))
      .sort((a, b) => b.s - a.s)
      .slice(0, 3)
      .map((o) => o.x);

    const factsTemps = [
      { label: "Préparation", value: duree(r.temps.preparation), icon: "clock" },
      r.temps.cuisson ? { label: "Cuisson", value: duree(r.temps.cuisson), icon: "flame" } : null,
      r.temps.repos ? { label: "Repos", value: duree(r.temps.repos), icon: "timer" } : null,
      { label: "Total", value: duree(total), icon: "clock" },
      { label: "Niveau", value: r.difficulte, icon: "chef" }
    ].filter(Boolean).slice(0, 4);

    const allergenes = (r.allergenes || []).map((a) => `<span class="pill">${esc(META.ALLERGENES[a] || a)}</span>`).join("");

    const couverture = imageDe(r);
    main.innerHTML = `
      <section class="r-cover">
        <img class="r-cover-img" src="${couverture.src}" alt="${esc(couverture.alt)}" width="1600" height="1100" style="view-transition-name: photo-${r.key}" fetchpriority="high">
        <div class="container">
          <nav class="breadcrumb" aria-label="Fil d'Ariane">
            <a href="index.html">Accueil</a><span>/</span>
            <a href="index.html?cat=${r.categorie}#recettes">${esc(cat.label)}</a><span>/</span>
            <span aria-current="page">${esc(r.titreCourt)}</span>
          </nav>
          <p class="eyebrow">${esc(r.badge || cat.singulier)}</p>
          <h1 class="r-title">${esc(r.titre)}</h1>
          <p class="r-intro">${esc(r.intro)}</p>
        </div>
      </section>
      <div class="container">
        <div class="r-bar" data-reveal>
          <div class="r-facts">
            ${factsTemps.map((f) => `<div class="r-fact"><span>${icon(f.icon)} ${f.label}</span><strong>${esc(f.value)}</strong></div>`).join("")}
          </div>
          <div class="r-actions">
            <button class="btn btn-primary" type="button" data-cook>${icon("book")} Mode cuisine</button>
            ${likeButton(r.key)}
            <button class="btn" type="button" data-share aria-label="Partager">${icon("share")} Partager</button>
            <button class="btn" type="button" data-print aria-label="Imprimer">${icon("printer")}</button>
          </div>
        </div>
        ${
          r.images?.length
            ? `<div class="r-strip" aria-label="Photos de la recette">${r.images
                .map((im, i) => `<button type="button" data-photo="${i}" aria-label="Agrandir : ${esc(im.alt)}"><img src="${im.thumb}" alt="" loading="lazy"></button>`)
                .join("")}</div>`
            : ""
        }

        <section class="r-layout" id="recette">
          <aside class="card ingredients-card" data-reveal="left" aria-labelledby="ing-title">
            <div class="card-title"><h2 id="ing-title">Ingrédients</h2><span class="pill" data-ing-count></span></div>
            <div class="stepper">
              <button type="button" data-portions="-1" aria-label="Moins de portions">${icon("minus")}</button>
              <output aria-live="polite"><strong data-portions-n>${state.portions}</strong> <span data-portions-unit></span></output>
              <button type="button" data-portions="1" aria-label="Plus de portions">${icon("plus")}</button>
            </div>
            <div data-ingredients></div>
            <div class="ing-actions">
              <button class="btn btn-dark btn-block" type="button" data-add-list>${icon("basket")} Ajouter à ma liste</button>
              <button class="btn btn-ghost btn-sm" type="button" data-reset-portions>${icon("reset")} Revenir à ${portionsLabel(r, r.portions.base)}</button>
            </div>
          </aside>

          <div>
            <section class="card" aria-labelledby="steps-title" data-reveal>
              <div class="steps-head">
                <h2 id="steps-title" class="section-title" style="font-size:var(--fs-2xl)">Préparation</h2>
                <button class="btn btn-sm" type="button" data-reset-steps>${icon("reset")} Recommencer</button>
              </div>
              <div class="progress" aria-hidden="true"><i data-progress></i></div>
              <p class="progress-label" data-progress-label></p>
              <ol class="steps">
                ${r.etapes
                  .map(
                    (e, i) => `<li class="step" data-step="${i}">
                      <button class="step-num" type="button" data-toggle-step="${i}" aria-pressed="false" aria-label="Marquer l'étape ${i + 1} comme faite">
                        ${i + 1}<span class="check">${icon("check")}</span>
                      </button>
                      <div class="step-body">
                        <h3>${esc(e.titre)}</h3>
                        <p>${esc(e.texte)}</p>
                        ${timerChips(e, r)}
                      </div>
                    </li>`
                  )
                  .join("")}
              </ol>
            </section>

            ${
              r.securite
                ? `<div class="notice" style="margin-top:20px" data-reveal>
                    <span class="notice-icon" aria-hidden="true">${icon("alert")}</span>
                    <div><strong>Bon à savoir</strong><p>${esc(r.securite)}</p>
                    ${r.sourcesSecurite?.length ? `<p class="sources">Sources : ${r.sourcesSecurite.map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.titre)}</a>`).join(" · ")}</p>` : ""}
                    </div>
                  </div>`
                : ""
            }

            <div class="info-grid">
              <section class="card" data-reveal style="--i:0">
                <div class="card-title"><h3>✦ Les astuces du chef</h3></div>
                <ul class="tips-list">${r.astuces.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>
              </section>
              <section class="card choices-card" data-reveal style="--i:1">
                <div class="card-title"><h3>${esc(r.choix.titre)}</h3></div>
                <div class="chip-row" data-choices>
                  ${r.choix.options.map((o) => `<button class="chip" type="button" data-choice="${esc(o)}" aria-pressed="${state.choix.has(o)}">${esc(o)}</button>`).join("")}
                </div>
                <p class="selection-line">${esc(r.choix.label)} : <strong data-choice-out>Aucune</strong></p>
                <div class="accords">${r.accords.map((a) => `<div class="accord"><strong>${esc(a.titre)}</strong><span>${esc(a.texte)}</span></div>`).join("")}</div>
              </section>
              <section class="card" data-reveal style="--i:2">
                <div class="card-title"><h3>Conservation</h3></div>
                <p class="muted">${esc(r.conservation)}</p>
                <div class="card-title" style="margin:22px 0 10px"><h3>Allergènes</h3></div>
                ${allergenes ? `<div class="allergens">${allergenes}</div>` : `<p class="muted">Aucun des 14 allergènes majeurs dans les ingrédients listés.</p>`}
                <p class="field-hint" style="margin-top:10px">${esc(r.noteAllergenes || "")} Liste établie d'après les ingrédients de la recette : vérifie toujours les étiquettes de tes produits.</p>
              </section>
            </div>
          </div>
        </section>

        <section class="section related" aria-labelledby="related-title">
          <div class="section-head">
            <div><p class="eyebrow">À la même table</p><h2 class="section-title" id="related-title">Tu aimeras <em>aussi</em></h2></div>
            <a class="btn" href="index.html#recettes">Toutes les recettes ${icon("arrow")}</a>
          </div>
          <div class="related-grid">${related.map((x, i) => recipeCard(x, { index: i })).join("")}</div>
          <nav class="prevnext" aria-label="Recettes voisines">
            <a href="${prev.url}"><img src="${imageDe(prev).thumb}" alt=""><span><small>← Précédente</small><strong>${esc(prev.titreCourt)}</strong></span></a>
            <a class="next" href="${next.url}"><span><small>Suivante →</small><strong>${esc(next.titreCourt)}</strong></span><img src="${imageDe(next).thumb}" alt=""></a>
          </nav>
        </section>
      </div>`;

    // --- Ingrédients ---
    const ingBox = main.querySelector("[data-ingredients]");
    const nOut = main.querySelector("[data-portions-n]");
    const unitOut = main.querySelector("[data-portions-unit]");
    const ingCount = main.querySelector("[data-ing-count]");
    const step = r.portions.pas || 1;

    function renderIngredients(flash = false) {
      nOut.textContent = String(state.portions);
      unitOut.textContent = state.portions > 1 ? r.portions.pluriel : r.portions.unite;
      if (flash) {
        nOut.classList.remove("tick");
        void nOut.offsetWidth;
        nOut.classList.add("tick");
      }
      main.querySelector('[data-portions="-1"]').disabled = state.portions - step < (r.portions.min || 1);
      main.querySelector('[data-portions="1"]').disabled = state.portions + step > (r.portions.max || 24);
      let n = 0;
      ingBox.innerHTML = r.ingredients
        .map(
          (g, gi) => `<div class="ing-group">
            ${r.ingredients.length > 1 ? `<h4>${esc(g.groupe)}</h4>` : ""}
            <ul class="ing-list">
              ${g.items
                .map((item, ii) => {
                  const id = `${gi}-${ii}`;
                  n++;
                  return `<li class="ing-item"><label>
                    <input type="checkbox" data-ing="${id}"${state.ings.has(id) ? " checked" : ""}>
                    <span class="ing-name">${esc(item.nom)}${item.optionnel ? '<span class="opt-tag">option</span>' : ""}</span>
                    <span class="ing-qty${flash && !item.fixe && item.qte ? " flash" : ""}">${esc(quantiteIngredient(item, r, state.portions))}</span>
                  </label></li>`;
                })
                .join("")}
            </ul>
          </div>`
        )
        .join("");
      ingCount.textContent = `${state.ings.size}/${n} prêts`;
    }

    main.querySelectorAll("[data-portions]").forEach((b) =>
      b.addEventListener("click", () => {
        const next = state.portions + Number(b.dataset.portions) * step;
        if (next < (r.portions.min || 1) || next > (r.portions.max || 24)) return;
        state.portions = next;
        persist();
        renderIngredients(true);
      })
    );
    main.querySelector("[data-reset-portions]").addEventListener("click", () => {
      state.portions = r.portions.base;
      persist();
      renderIngredients(true);
      toast(`Quantités remises pour ${portionsLabel(r, r.portions.base)}.`);
    });
    ingBox.addEventListener("change", (e) => {
      const id = e.target.dataset.ing;
      if (!id) return;
      if (e.target.checked) state.ings.add(id);
      else state.ings.delete(id);
      persist();
      const total = tousIngredients(r).length;
      ingCount.textContent = `${state.ings.size}/${total} prêts`;
      if (state.ings.size === total) toast("Tous les ingrédients sont prêts. En cuisine !");
    });
    main.querySelector("[data-add-list]").addEventListener("click", () => addRecipeToList(r, state.portions));
    renderIngredients();

    // --- Étapes ---
    const progress = main.querySelector("[data-progress]");
    const progressLabel = main.querySelector("[data-progress-label]");

    function renderSteps(celebrate = false) {
      main.querySelectorAll(".step").forEach((li) => {
        const i = Number(li.dataset.step);
        const done = state.etapes.has(i);
        li.classList.toggle("is-done", done);
        li.querySelector(".step-num").setAttribute("aria-pressed", String(done));
      });
      const n = state.etapes.size;
      const tot = r.etapes.length;
      progress.style.setProperty("--p", String(n / tot));
      progressLabel.textContent =
        n === 0 ? `${tot} étapes · clique sur un numéro quand l'étape est faite` : n === tot ? "Tout est prêt : bon appétit !" : `${n} étape${n > 1 ? "s" : ""} sur ${tot} terminée${n > 1 ? "s" : ""}`;
      if (celebrate && n === tot) {
        confetti();
        toast("Bravo chef ! Il ne reste plus qu'à déguster.");
      }
    }

    main.querySelector(".steps").addEventListener("click", (e) => {
      const b = e.target.closest("[data-toggle-step]");
      if (!b) return;
      const i = Number(b.dataset.toggleStep);
      if (state.etapes.has(i)) state.etapes.delete(i);
      else state.etapes.add(i);
      persist();
      renderSteps(true);
    });
    main.querySelector("[data-reset-steps]").addEventListener("click", () => {
      state.etapes.clear();
      state.ings.clear();
      persist();
      renderSteps();
      renderIngredients();
      toast("C'est reparti de zéro !");
    });
    renderSteps();

    // --- Choix (garnitures, accompagnements…) ---
    const choiceOut = main.querySelector("[data-choice-out]");
    const renderChoices = () => {
      main.querySelectorAll("[data-choice]").forEach((c) => c.setAttribute("aria-pressed", String(state.choix.has(c.dataset.choice))));
      choiceOut.textContent = state.choix.size ? [...state.choix].join(", ") : "Aucune";
    };
    main.querySelector("[data-choices]").addEventListener("click", (e) => {
      const c = e.target.closest("[data-choice]");
      if (!c) return;
      const v = c.dataset.choice;
      if (r.choix.mode === "single") {
        const had = state.choix.has(v);
        state.choix.clear();
        if (!had) state.choix.add(v);
      } else if (state.choix.has(v)) {
        state.choix.delete(v);
      } else {
        state.choix.add(v);
      }
      persist();
      renderChoices();
    });
    renderChoices();

    // --- Photos ---
    // En-tête transparent au-dessus de la couverture
    body.classList.add("has-cover");
    window.dispatchEvent(new Event("scroll"));

    // Une couverture illustrée n'est pas une photo : pas de visionneuse dans ce cas.
    const photos = r.images || [];
    main.querySelectorAll("[data-photo]").forEach((t) =>
      t.addEventListener("click", () => openLightbox(photos, Number(t.dataset.photo)))
    );
    if (photos.length) {
      const coverImg = main.querySelector(".r-cover-img");
      coverImg.style.cursor = "zoom-in";
      coverImg.addEventListener("click", () => openLightbox(photos, 0));
    }

    // --- Actions ---
    main.querySelector("[data-print]").addEventListener("click", () => window.print());
    main.querySelector("[data-share]").addEventListener("click", async () => {
      const data = { title: `${r.titre} — Le restaurant d'Antoine`, text: r.accroche, url: location.href };
      if (navigator.share) {
        try {
          await navigator.share(data);
        } catch {
          /* partage annulé */
        }
      } else {
        copyText(location.href, "Lien de la recette copié.");
      }
    });
    main.querySelector("[data-cook]").addEventListener("click", () => openCookMode(r, state, persist, renderSteps));

    // Barre de progression de lecture
    const bar = el('<div class="scroll-progress" aria-hidden="true"></div>');
    body.appendChild(bar);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (location.hash === "#cuisine") openCookMode(r, state, persist, renderSteps);
  }

  function timerChips(etape, r) {
    if (!etape.minuteurs?.length) return "";
    return `<div class="step-timers">${etape.minuteurs
      .map(
        (m) => `<button class="timer-chip" type="button" data-start-timer="${m.secondes}" data-label="${esc(m.label)}" data-recette="${r.key}">
          ${icon("timer")} ${esc(m.label)} · ${dureeSecondes(m.secondes)}
        </button>`
      )
      .join("")}</div>`;
  }

  /* ==========================================================================
     MODE CUISINE (plein écran, écran maintenu allumé)
     ========================================================================== */
  function openCookMode(r, state, persist, renderSteps) {
    let current = Math.min(r.etapes.length - 1, [...Array(r.etapes.length).keys()].find((i) => !state.etapes.has(i)) ?? 0);
    let wakeLock = null;

    const cook = el(`<div class="cook" role="dialog" aria-modal="true" aria-label="Mode cuisine : ${esc(r.titre)}">
        <div>
          <div class="cook-top">
            <span class="avatar avatar-chef" aria-hidden="true">${LOGO}</span>
            <div class="cook-title"><small>Mode cuisine</small><strong>${esc(r.titre)}</strong></div>
            <button class="btn btn-sm" type="button" data-show-ings>${icon("list")} <span>Ingrédients</span></button>
            <button class="icon-btn bordered" type="button" data-close-cook aria-label="Quitter le mode cuisine">${icon("x")}</button>
          </div>
          <div class="cook-dots" aria-hidden="true">${r.etapes.map(() => "<i></i>").join("")}</div>
        </div>
        <div class="cook-stage" aria-live="polite"></div>
        <div class="cook-bottom">
          <button class="btn" type="button" data-cook-prev>${icon("left")} Précédente</button>
          <span class="muted" data-cook-pos></span>
          <button class="btn btn-primary" type="button" data-cook-next>Étape suivante ${icon("right")}</button>
        </div>
        <aside class="cook-ings" hidden>
          <div class="card-title"><h3>Ingrédients · ${esc(portionsLabel(r, state.portions))}</h3>
            <button class="icon-btn" type="button" data-hide-ings aria-label="Fermer">${icon("x")}</button></div>
          <ul class="ing-list">${tousIngredients(r)
            .map((i) => `<li class="ing-item"><label><span></span><span class="ing-name">${esc(i.nom)}</span><span class="ing-qty">${esc(quantiteIngredient(i, r, state.portions))}</span></label></li>`)
            .join("")}</ul>
        </aside>
      </div>`);
    body.appendChild(cook);
    body.style.overflow = "hidden";
    body.classList.add("is-cooking");

    const stage = cook.querySelector(".cook-stage");
    const dots = [...cook.querySelectorAll(".cook-dots i")];
    const pos = cook.querySelector("[data-cook-pos]");
    const nextBtn = cook.querySelector("[data-cook-next]");
    const prevBtn = cook.querySelector("[data-cook-prev]");
    let finished = false;

    function render(direction = "") {
      finished = false;
      const e = r.etapes[current];
      stage.innerHTML = `<div class="cook-step ${direction ? `anim-${direction}` : ""}">
          <span class="cook-num">${current + 1}</span>
          <h2>${esc(e.titre)}</h2>
          <p>${esc(e.texte)}</p>
          ${timerChips(e, r)}
        </div>`;
      dots.forEach((d, i) => {
        d.classList.toggle("is-current", i === current);
        d.classList.toggle("is-done", state.etapes.has(i) && i !== current);
      });
      pos.textContent = `Étape ${current + 1} / ${r.etapes.length}`;
      prevBtn.disabled = current === 0;
      nextBtn.innerHTML = current === r.etapes.length - 1 ? `Terminer ${icon("check")}` : `Étape suivante ${icon("right")}`;
    }

    function finish() {
      finished = true;
      r.etapes.forEach((_, i) => state.etapes.add(i));
      persist();
      renderSteps();
      dots.forEach((d) => {
        d.classList.remove("is-current");
        d.classList.add("is-done");
      });
      stage.innerHTML = `<div class="cook-step cook-finish anim-next">
          <div class="big cook-logo" aria-hidden="true">${LOGO}</div>
          <h2>Bon appétit !</h2>
          <p>Toutes les étapes sont faites. Tu peux être fier·e de toi, chef.</p>
          <div class="step-timers">${likeButton(r.key)}<button class="btn" type="button" data-close-cook>Retour à la recette</button></div>
        </div>`;
      pos.textContent = "Terminé";
      nextBtn.innerHTML = `Fermer ${icon("x")}`;
      confetti(180);
      bip(784, 0.15, 0, "triangle");
      bip(988, 0.15, 0.15, "triangle");
      bip(1318, 0.3, 0.3, "triangle");
    }

    function go(delta) {
      if (finished) {
        if (delta > 0) close();
        else {
          current = r.etapes.length - 1;
          render("prev");
        }
        return;
      }
      if (delta > 0) {
        state.etapes.add(current);
        persist();
        renderSteps();
        if (current === r.etapes.length - 1) return finish();
      }
      const target = current + delta;
      if (target < 0 || target >= r.etapes.length) return;
      current = target;
      render(delta > 0 ? "next" : "prev");
    }

    function close() {
      document.removeEventListener("keydown", onKey);
      if (wakeLock) wakeLock.release().catch(() => {});
      cook.remove();
      body.style.overflow = "";
      body.classList.remove("is-cooking");
      if (location.hash === "#cuisine") history.replaceState(null, "", location.pathname + location.search);
    }

    function onKey(e) {
      if (e.key === "ArrowRight" || e.key === " ") {
        if (e.target.closest?.("button") && e.key === " ") return;
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        go(-1);
      } else if (e.key === "Escape") {
        const ings = cook.querySelector(".cook-ings");
        if (!ings.hidden) ings.hidden = true;
        else close();
      }
    }

    cook.addEventListener("click", (e) => {
      if (e.target.closest("[data-close-cook]")) close();
      if (e.target.closest("[data-show-ings]")) cook.querySelector(".cook-ings").hidden = false;
      if (e.target.closest("[data-hide-ings]")) cook.querySelector(".cook-ings").hidden = true;
    });
    nextBtn.addEventListener("click", () => go(1));
    prevBtn.addEventListener("click", () => go(-1));
    document.addEventListener("keydown", onKey);

    // Balayage sur mobile
    let touchX = null;
    stage.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
    stage.addEventListener(
      "touchend",
      (e) => {
        if (touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
        touchX = null;
      },
      { passive: true }
    );

    // Garde l'écran allumé pendant la cuisine (si le navigateur le permet)
    if ("wakeLock" in navigator) {
      navigator.wakeLock
        .request("screen")
        .then((lock) => {
          wakeLock = lock;
          toast("L'écran restera allumé pendant que tu cuisines.", 2400);
        })
        .catch(() => {});
    }

    render();
    nextBtn.focus();
  }

  /* ==========================================================================
     PAGE ORIGINES
     ========================================================================== */
  function initInfos() {
    const grid = document.getElementById("originGrid");
    if (!grid) return;
    grid.innerHTML = RECETTES.filter((r) => r.origine)
      .map((r, i) => {
        const o = r.origine;
        const img = imageDe(r);
        return `<article class="origin-card" id="${r.key}" data-reveal style="--i:${i % 3}">
            <div class="media">
              <img src="${img.thumb}" alt="${esc(img.alt)}" loading="lazy" width="640" height="360">
            </div>
            <div class="body">
              <p class="where">${icon("pin")} ${esc(o.pays)}</p>
              <h2>${esc(r.titreCourt)}</h2>
              <p class="muted">${esc(o.resume)}</p>
              <ul>${o.faits.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
              <div class="sources">
                <strong>Sources</strong>
                <ul>${o.sources.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.titre)}</a></li>`).join("")}</ul>
              </div>
              <a class="btn btn-sm" href="${r.url}" style="align-self:flex-start">Cuisiner la recette ${icon("arrow")}</a>
            </div>
          </article>`;
      })
      .join("");

    // Filtre par pays (le premier mot du champ pays, avant une éventuelle parenthèse)
    const paysDe = (r) => r.origine.pays.split(" (")[0];
    const avecOrigine = RECETTES.filter((r) => r.origine);
    const compte = {};
    avecOrigine.forEach((r) => (compte[paysDe(r)] = (compte[paysDe(r)] || 0) + 1));
    const listePays = Object.keys(compte).sort((a, b) => compte[b] - compte[a] || a.localeCompare(b, "fr"));
    if (listePays.length > 1) {
      grid.insertAdjacentHTML(
        "beforebegin",
        `<div class="chip-row origin-filters" id="originFilters" role="group" aria-label="Filtrer par pays">
          <button class="chip" type="button" data-pays="" aria-pressed="true">Tous<span class="chip-count">${avecOrigine.length}</span></button>
          ${listePays.map((p) => `<button class="chip" type="button" data-pays="${esc(p)}" aria-pressed="false">${esc(p)}<span class="chip-count">${compte[p]}</span></button>`).join("")}
        </div>`
      );
      document.getElementById("originFilters").addEventListener("click", (e) => {
        const b = e.target.closest("[data-pays]");
        if (!b) return;
        b.parentElement.querySelectorAll("[data-pays]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        grid.querySelectorAll(".origin-card").forEach((card) => {
          card.hidden = Boolean(b.dataset.pays) && paysDe(BY_KEY[card.id]) !== b.dataset.pays;
        });
      });
    }

    const banner = document.getElementById("travelPins");
    if (banner) {
      const pays = [...new Set(RECETTES.filter((r) => r.origine).map((r) => r.origine.pays.split(" (")[0]))].slice(0, 8);
      banner.innerHTML = pays
        .map((p, i) => {
          // Les étiquettes de la moitié droite partent vers la gauche pour ne pas déborder de l'écran.
          const pos = 4 + i * (88 / Math.max(1, pays.length - 1));
          const x = pos > 50 ? `right:${100 - pos}%;flex-direction:row-reverse` : `left:${pos}%`;
          return `<span class="pin" style="${x};top:${i % 2 ? 60 : 14}%;animation-delay:${0.3 + i * 0.12}s"><i></i>${esc(p)}</span>`;
        })
        .join("");
    }
  }

  /* ==========================================================================
     PAGE QUESTIONS (formulaire Formspree, envoi sans quitter la page)
     ========================================================================== */
  function initQuestions() {
    const select = document.getElementById("questionCategory");
    if (select) {
      const recettes = RECETTES.map((r) => `<option value="${esc(r.key)}">Recette : ${esc(r.titreCourt)}</option>`).join("");
      select.insertAdjacentHTML("beforeend", `<optgroup label="Une recette">${recettes}</optgroup>`);
      const pre = new URLSearchParams(location.search).get("recette");
      if (pre && BY_KEY[pre]) select.value = pre;
    }
    const form = document.getElementById("questionForm");
    const message = form?.querySelector("textarea");
    const counter = document.getElementById("questionCounter");
    if (message && counter) {
      const update = () => (counter.textContent = `${message.value.length}/1500`);
      message.addEventListener("input", update);
      update();
    }
    form?.addEventListener("submit", async (e) => {
      if (!window.fetch) return;
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = "Envoi en cours…";
      try {
        const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error(String(res.status));
        form.innerHTML = `<div class="empty-state" style="border-style:solid"><span class="big">${icon("mail")}</span><strong>Message bien reçu, merci !</strong>
          <span>Le restaurant te répondra par e-mail dès que possible.</span></div>`;
        confetti(80);
      } catch {
        toast("L'envoi n'a pas fonctionné. Vérifie ta connexion et réessaie.");
        btn.disabled = false;
        btn.textContent = "Envoyer au restaurant";
      }
    });
  }

  /* ==========================================================================
     API PUBLIQUE (utilisée par l'assistant et les jeux)
     ========================================================================== */
  window.Antoine = {
    logo: LOGO,
    recettes: RECETTES,
    parCle: BY_KEY,
    meta: META,
    store,
    icon,
    esc,
    normalize,
    duree,
    dureeSecondes,
    formatQuantite,
    quantiteIngredient,
    tousIngredients,
    portionsLabel,
    imageDe,
    coverUri,
    motifs: Object.keys(MOTIFS),
    toast,
    confetti,
    burst,
    bip,
    ensureAudio,
    startTimer,
    openSearch,
    openList,
    addRecipeToList,
    observeReveal,
    recipeCard,
    likeCounts,
    page: PAGE
  };

  /* ==========================================================================
     DÉMARRAGE
     ========================================================================== */
  renderHeader();
  renderFooter();

  // Meilleurs scores des jeux (accueil et page des jeux)
  document.querySelectorAll("[data-best]").forEach((node) => {
    const value = store.get(node.dataset.best);
    if (value && value !== "0") node.textContent = `Record : ${value}${node.dataset.suffix || ""}`;
  });
  updateListBadge();
  if (timers.length) renderDock();

  if (PAGE === "home") initHome();
  if (PAGE === "recipe") initRecipe();
  if (PAGE === "infos") initInfos();
  if (PAGE === "questions") initQuestions();
  if (PAGE === "avis") {
    // Si le service des avis ne répond pas (hors connexion, bloqueur…), on le dit.
    setTimeout(() => {
      const list = document.getElementById("reviewsList");
      if (window.__reviewsModuleLoaded || !list) return;
      list.innerHTML = `<div class="empty-state"><span class="big">${icon("alert")}</span><strong>Le livre d'or ne répond pas</strong>
        <span>Impossible de joindre le serveur des avis pour le moment. Réessaie un peu plus tard.</span></div>`;
      const summary = document.getElementById("ratingSummary");
      if (summary) summary.innerHTML = `<p class="muted">Note indisponible pour le moment.</p>`;
    }, 6000);
  }

  observeReveal();
  document.dispatchEvent(new CustomEvent("antoine:ready"));
})();
