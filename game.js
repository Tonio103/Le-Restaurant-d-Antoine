(() => {
  "use strict";

  const STORAGE_KEY = "service-infini-premium-best";
  const VIEW_W = 640;
  const VIEW_H = 360;
  const GROUND_Y = 302;
  const MAX_LIVES = 3;

  const ASSETS = {
    restaurant: "assets/restaurant.png",
    terrace: "assets/terrace.png",
    kitchen: "assets/kitchen.png",
    cellar: "assets/cellar.png",
    factory: "assets/factory.png",
    secret: "assets/secret-royal.png",
    chef: "assets/chef-sheet.png",
    chefRun: "assets/ref-chef-run-0.png",
    chefRun0: "assets/ref-chef-run-0.png",
    chefRun1: "assets/ref-chef-run-1.png",
    chefRun2: "assets/ref-chef-run-2.png",
    chefSlide: "assets/chef-roll-run.png",
    obstacleBottle: "assets/ref-obstacle-bottle.png",
    obstacleCart: "assets/new-cart-run.png",
    obstacleChair: "assets/ref-obstacle-chair.png",
    obstacleMenu: "assets/ref-obstacle-menu.png",
    obstacleTable: "assets/ref-obstacle-table.png",
    obstacleTableLamp: "assets/ref-obstacle-lamp.png",
    obstaclePendantLamp: "assets/ref-obstacle-lamp.png",
  };

  const BIOMES = [
    {
      key: "restaurant",
      name: "RESTAURANT",
      image: "restaurant",
      ambient: { base: 116, color: "#f5b866", parallax: 0.035, zoom: 1.03, y: 0.5 },
      lights: [[28, 96, 38], [160, 102, 44], [394, 82, 48], [523, 88, 40], [608, 103, 36]],
      steam: [[386, 198], [421, 198]],
    },
    {
      key: "terrace",
      name: "TERRASSE",
      image: "terrace",
      ambient: { base: 148, color: "#ff944d", parallax: 0.055, zoom: 1.01, y: 0.52 },
      lights: [[88, 128, 38], [292, 122, 34], [410, 112, 32], [542, 126, 34]],
      steam: [],
    },
    {
      key: "kitchen",
      name: "CUISINE",
      image: "kitchen",
      ambient: { base: 136, color: "#f7c783", parallax: 0.038, zoom: 1.04, y: 0.5 },
      lights: [[236, 118, 54], [385, 89, 40], [432, 88, 38]],
      steam: [[278, 210], [330, 212], [368, 210]],
    },
    {
      key: "cellar",
      name: "CAVE",
      image: "cellar",
      ambient: { base: 86, color: "#e6aa65", parallax: 0.028, zoom: 1.04, y: 0.5 },
      lights: [[62, 106, 36], [285, 102, 34], [480, 112, 36], [620, 135, 32]],
      steam: [[346, 242]],
    },
    {
      key: "factory",
      name: "USINE",
      image: "factory",
      ambient: { base: 96, color: "#f0c271", parallax: 0.046, zoom: 1.02, y: 0.5 },
      lights: [[210, 64, 30], [344, 64, 34], [548, 66, 30]],
      steam: [[520, 164], [382, 184], [302, 240]],
    },
    {
      key: "secret",
      name: "TABLE SECRETE",
      image: "secret",
      ambient: { base: 150, color: "#ffe27b", parallax: 0.032, zoom: 1.025, y: 0.5 },
      lights: [[160, 102, 58], [394, 82, 66], [523, 88, 54], [608, 103, 46]],
      steam: [[386, 198], [421, 198], [470, 206]],
      hidden: true,
    },
  ];

  const OBSTACLES = [
    {
      id: "table",
      action: "jump",
      layer: "ground",
      unlock: 0,
      weight: 12,
      w: 82,
      h: 62,
      hit: [11, 27, 60, 29],
      biomes: ["restaurant", "terrace", "cellar"],
    },
    {
      id: "chair",
      action: "jump",
      layer: "ground",
      unlock: 0,
      weight: 16,
      w: 44,
      h: 72,
      hit: [8, 17, 29, 48],
      biomes: ["restaurant", "terrace", "cellar", "kitchen"],
    },
    {
      id: "bottle",
      action: "jump",
      layer: "ground",
      unlock: 0,
      weight: 14,
      w: 26,
      h: 36,
      hit: [7, 5, 12, 25],
      biomes: ["restaurant", "terrace", "kitchen", "cellar", "factory"],
    },
    {
      id: "cart",
      action: "jump",
      layer: "ground",
      unlock: 0.18,
      weight: 8,
      w: 74,
      h: 58,
      hit: [8, 18, 58, 31],
      biomes: ["restaurant", "kitchen", "factory"],
      wide: true,
    },
    {
      id: "menu",
      action: "jump",
      layer: "ground",
      unlock: 0.22,
      weight: 8,
      w: 50,
      h: 68,
      hit: [7, 10, 36, 51],
      biomes: ["restaurant", "terrace", "kitchen", "cellar"],
    },
    {
      id: "meal-trolley",
      action: "jump",
      layer: "ground",
      unlock: 0.36,
      weight: 6,
      w: 78,
      h: 58,
      hit: [8, 18, 62, 31],
      biomes: ["restaurant", "kitchen", "factory"],
      wide: true,
    },
    {
      id: "lamp",
      action: "slide",
      layer: "ceiling",
      unlock: 0.08,
      weight: 13,
      w: 42,
      h: 86,
      clearance: 64,
      hit: [8, 70, 26, 24],
      biomes: ["restaurant", "terrace", "kitchen", "cellar", "factory"],
    },
    {
      id: "chandelier",
      action: "slide",
      layer: "ceiling",
      unlock: 0.28,
      weight: 8,
      w: 54,
      h: 92,
      clearance: 64,
      hit: [9, 72, 36, 27],
      biomes: ["restaurant", "terrace", "cellar"],
      wide: true,
    },
  ];

  const COIN_TYPES = [
    { id: "coin", value: 50, size: 18, weight: 18 },
    { id: "premium", value: 120, size: 20, weight: 4 },
    { id: "star", value: 200, size: 24, weight: 1 },
  ];

  const OBSTACLE_VISUALS = {
    table: { h: 64, floor: 4, x: 0 },
    chair: { h: 72, floor: 3, x: 1 },
    bottle: { h: 38, floor: 3, x: 0 },
    cart: { h: 66, floor: 4, x: 0 },
    menu: { h: 70, floor: 3, x: 0 },
    "meal-trolley": { h: 66, floor: 4, x: 0 },
    lamp: { h: 86, bottom: GROUND_Y - 64, x: 0 },
    chandelier: { h: 92, bottom: GROUND_Y - 64, x: 0 },
  };

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function chance(probability) {
    return Math.random() < probability;
  }

  function pickWeighted(list, weightFn) {
    const total = list.reduce((sum, item) => sum + Math.max(0.001, weightFn(item)), 0);
    let cursor = Math.random() * total;
    for (const item of list) {
      cursor -= Math.max(0.001, weightFn(item));
      if (cursor <= 0) {
        return item;
      }
    }
    return list[list.length - 1];
  }

  function intersects(a, b) {
    return (
      a.x < b.x + b.w &&
      a.x + a.w > b.x &&
      a.y < b.y + b.h &&
      a.y + a.h > b.y
    );
  }

  function px(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  }

  function frame(ctx, x, y, w, h, fill, light, dark) {
    px(ctx, x, y, w, h, fill);
    px(ctx, x, y, w, 2, light);
    px(ctx, x, y, 2, h, light);
    px(ctx, x, y + h - 2, w, 2, dark);
    px(ctx, x + w - 2, y, 2, h, dark);
  }

  function glow(ctx, x, y, radius, color, alpha) {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, color.replace(")", `, ${alpha})`).replace("rgb", "rgba"));
    gradient.addColorStop(1, color.replace(")", ", 0)").replace("rgb", "rgba"));
    ctx.fillStyle = gradient;
    ctx.fillRect(Math.round(x - radius), Math.round(y - radius), Math.round(radius * 2), Math.round(radius * 2));
  }

  function shadow(ctx, x, y, w, alpha) {
    ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
    ctx.fillRect(Math.round(x + 4), Math.round(y), Math.round(w - 8), 2);
    ctx.fillRect(Math.round(x + 1), Math.round(y + 2), Math.round(w - 2), 2);
    ctx.fillRect(Math.round(x), Math.round(y + 4), Math.round(w), 2);
  }

  function isEdgeBackgroundPixel(pixels, index) {
    const offset = index * 4;
    const r = pixels[offset];
    const g = pixels[offset + 1];
    const b = pixels[offset + 2];
    const a = pixels[offset + 3];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    return a < 16 || (r > 205 && g > 205 && b > 205 && max - min < 26) || (r > 150 && g > 150 && b > 150 && max - min < 18);
  }

  function cleanSprite(image, padding = 2) {
    if (!image) {
      return null;
    }
    try {
      const source = document.createElement("canvas");
      source.width = image.width;
      source.height = image.height;
      const ctx = source.getContext("2d", { willReadFrequently: true });
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(image, 0, 0);
      const data = ctx.getImageData(0, 0, source.width, source.height);
      const pixels = data.data;
      const w = source.width;
      const h = source.height;
      const visited = new Uint8Array(w * h);
      const stack = [];

      for (let x = 0; x < w; x += 1) {
        stack.push(x, (h - 1) * w + x);
      }
      for (let y = 0; y < h; y += 1) {
        stack.push(y * w, y * w + w - 1);
      }

      while (stack.length) {
        const index = stack.pop();
        if (visited[index] || !isEdgeBackgroundPixel(pixels, index)) {
          continue;
        }
        visited[index] = 1;
        pixels[index * 4 + 3] = 0;
        const x = index % w;
        const y = Math.floor(index / w);
        if (x > 0) stack.push(index - 1);
        if (x < w - 1) stack.push(index + 1);
        if (y > 0) stack.push(index - w);
        if (y < h - 1) stack.push(index + w);
      }

      let minX = w;
      let minY = h;
      let maxX = 0;
      let maxY = 0;
      for (let y = 0; y < h; y += 1) {
        for (let x = 0; x < w; x += 1) {
          const alpha = pixels[(y * w + x) * 4 + 3];
          if (alpha > 8) {
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
          }
        }
      }

      if (minX > maxX || minY > maxY) {
        return image;
      }

      ctx.putImageData(data, 0, 0);
      minX = Math.max(0, minX - padding);
      minY = Math.max(0, minY - padding);
      maxX = Math.min(w - 1, maxX + padding);
      maxY = Math.min(h - 1, maxY + padding);
      const cropped = document.createElement("canvas");
      cropped.width = maxX - minX + 1;
      cropped.height = maxY - minY + 1;
      const cropCtx = cropped.getContext("2d");
      cropCtx.imageSmoothingEnabled = false;
      cropCtx.drawImage(source, minX, minY, cropped.width, cropped.height, 0, 0, cropped.width, cropped.height);
      return cropped;
    } catch (error) {
      return image;
    }
  }

  class AssetBank {
    constructor(paths) {
      this.paths = paths;
      this.images = {};
      this.failed = [];
      this.ready = false;
    }

    load() {
      const jobs = Object.entries(this.paths).map(([key, src]) => new Promise((resolve) => {
        const image = new Image();
        image.onload = () => {
          this.images[key] = image;
          resolve();
        };
        image.onerror = () => {
          this.failed.push(key);
          resolve();
        };
        image.src = src;
      }));
      return Promise.all(jobs).then(() => {
        if (this.failed.length) {
          throw new Error(`Missing game assets: ${this.failed.join(", ")}`);
        }
        this.ready = true;
      });
    }

    get(key) {
      return this.images[key];
    }
  }

  class SpriteAtlas {
    constructor(image) {
      this.image = image;
      this.frames = { run: [], jump: [], slide: [], hit: [] };
      if (image) {
        this.build();
      }
    }

    build() {
      const runXs = [268, 372, 475, 578, 681, 784, 887];
      const jump = [
        [267, 222, 90, 126],
        [384, 222, 96, 126],
        [514, 214, 94, 128],
        [638, 214, 94, 128],
        [762, 222, 94, 126],
        [881, 222, 94, 126],
      ];
      const slide = [
        [274, 397, 112, 82],
        [403, 394, 120, 86],
        [535, 394, 120, 86],
        [664, 394, 120, 86],
        [825, 394, 112, 82],
      ];
      this.frames.run = runXs.map((x) => this.crop(x, 34, 84, 128));
      this.frames.jump = jump.map((box) => this.crop(...box));
      this.frames.slide = slide.map((box) => this.crop(...box));
      this.frames.hit = [
        this.crop(595, 520, 90, 132),
        this.crop(710, 520, 100, 132),
        this.crop(850, 520, 104, 132),
      ];
    }

    crop(sx, sy, sw, sh) {
      const canvas = document.createElement("canvas");
      canvas.width = sw;
      canvas.height = sh;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(this.image, sx, sy, sw, sh, 0, 0, sw, sh);
      this.removeConnectedBackground(ctx, sw, sh);
      return canvas;
    }

    removeConnectedBackground(ctx, w, h) {
      const data = ctx.getImageData(0, 0, w, h);
      const pixels = data.data;
      const visited = new Uint8Array(w * h);
      const stack = [];
      const base = [pixels[0], pixels[1], pixels[2]];
      const closeToBase = (index) => {
        const offset = index * 4;
        const dr = pixels[offset] - base[0];
        const dg = pixels[offset + 1] - base[1];
        const db = pixels[offset + 2] - base[2];
        return dr * dr + dg * dg + db * db < 1150;
      };
      for (let x = 0; x < w; x += 1) {
        stack.push(x, (h - 1) * w + x);
      }
      for (let y = 0; y < h; y += 1) {
        stack.push(y * w, y * w + (w - 1));
      }
      while (stack.length) {
        const index = stack.pop();
        if (visited[index] || !closeToBase(index)) {
          continue;
        }
        visited[index] = 1;
        pixels[index * 4 + 3] = 0;
        const x = index % w;
        const y = Math.floor(index / w);
        if (x > 0) stack.push(index - 1);
        if (x < w - 1) stack.push(index + 1);
        if (y > 0) stack.push(index - w);
        if (y < h - 1) stack.push(index + w);
      }
      ctx.putImageData(data, 0, 0);
    }

    get(name, index) {
      const list = this.frames[name] || this.frames.run;
      return list[index % list.length];
    }
  }

  class AudioSystem {
    constructor() {
      this.ctx = null;
      this.enabled = true;
      this.ambient = null;
      this.currentBiome = null;
    }

    ensure() {
      if (!this.enabled) {
        return null;
      }
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) {
          return null;
        }
        this.ctx = new AudioContext();
      }
      if (this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    }

    toggle() {
      this.enabled = !this.enabled;
      if (!this.enabled) {
        this.stopAmbient();
      } else {
        this.ensure();
      }
      return this.enabled;
    }

    tone(freq, duration, type, gain, slideTo, delay = 0) {
      const ctx = this.ensure();
      if (!ctx) {
        return;
      }
      const start = ctx.currentTime + delay;
      const osc = ctx.createOscillator();
      const amp = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, start);
      if (slideTo) {
        osc.frequency.exponentialRampToValueAtTime(slideTo, start + duration);
      }
      amp.gain.setValueAtTime(0.0001, start);
      amp.gain.exponentialRampToValueAtTime(gain, start + 0.012);
      amp.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      osc.connect(amp);
      amp.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration + 0.04);
    }

    noise(duration, gain, filterFreq) {
      const ctx = this.ensure();
      if (!ctx) {
        return;
      }
      const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * duration));
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const channel = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i += 1) {
        channel[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      }
      const source = ctx.createBufferSource();
      const filter = ctx.createBiquadFilter();
      const amp = ctx.createGain();
      filter.type = "bandpass";
      filter.frequency.value = filterFreq;
      amp.gain.value = gain;
      source.buffer = buffer;
      source.connect(filter);
      filter.connect(amp);
      amp.connect(ctx.destination);
      source.start();
    }

    jump() {
      this.tone(360, 0.08, "triangle", 0.035, 620);
      this.noise(0.045, 0.012, 900);
    }

    coin() {
      this.tone(920, 0.07, "square", 0.025, 1280);
      this.tone(1480, 0.055, "triangle", 0.016, 1680, 0.035);
    }

    star() {
      this.tone(540, 0.16, "triangle", 0.03, 1080);
      this.tone(1080, 0.18, "square", 0.018, 1740, 0.045);
    }

    hit() {
      this.tone(180, 0.18, "sawtooth", 0.035, 86);
      this.noise(0.08, 0.025, 210);
    }

    transition() {
      this.tone(620, 0.055, "triangle", 0.008, 820);
    }

    stopAmbient() {
      if (!this.ambient) {
        return;
      }
      for (const node of this.ambient.nodes) {
        try {
          node.stop();
        } catch (error) {
          // Already stopped.
        }
      }
      this.ambient = null;
    }

    setBiome(biome) {
      this.stopAmbient();
      this.currentBiome = biome.key;
    }
  }

  class InputController {
    constructor(root) {
      this.root = root;
      this.jumpQueued = false;
      this.slideHeld = false;
      this.pauseQueued = false;
      this.pointer = null;
      this.tapTimer = 0;
      this.slideLatch = 0;
      this.attach();
    }

    attach() {
      window.addEventListener("keydown", (event) => {
        const key = event.key.toLowerCase();
        if (key === " " || key === "arrowup" || key === "w") {
          event.preventDefault();
          this.jumpQueued = true;
        }
        if (key === "arrowdown" || key === "s") {
          event.preventDefault();
          this.slideHeld = true;
        }
        if (key === "p" || key === "escape") {
          event.preventDefault();
          this.pauseQueued = true;
        }
      });

      window.addEventListener("keyup", (event) => {
        const key = event.key.toLowerCase();
        if (key === "arrowdown" || key === "s") {
          event.preventDefault();
          this.slideHeld = false;
        }
      });

      this.root.addEventListener("pointerdown", (event) => {
        if (!event.isPrimary || event.target.closest("button")) {
          return;
        }
        event.preventDefault();
        this.root.setPointerCapture(event.pointerId);
        this.pointer = {
          id: event.pointerId,
          x: event.clientX,
          y: event.clientY,
          swiped: false,
        };
        this.tapTimer = 0.085;
      });

      this.root.addEventListener("pointermove", (event) => {
        if (!this.pointer || event.pointerId !== this.pointer.id) {
          return;
        }
        const dy = event.clientY - this.pointer.y;
        if (dy > 22) {
          this.pointer.swiped = true;
          this.slideHeld = true;
          this.slideLatch = 0.18;
          this.tapTimer = 0;
        }
      });

      const clearPointer = (event) => {
        if (!this.pointer || event.pointerId !== this.pointer.id) {
          return;
        }
        if (!this.pointer.swiped && this.tapTimer > 0) {
          this.jumpQueued = true;
        }
        this.pointer = null;
        this.tapTimer = 0;
        this.slideHeld = false;
      };

      this.root.addEventListener("pointerup", clearPointer);
      this.root.addEventListener("pointercancel", clearPointer);
    }

    update(dt) {
      if (this.tapTimer > 0) {
        this.tapTimer -= dt;
        if (this.tapTimer <= 0 && this.pointer && !this.pointer.swiped) {
          this.jumpQueued = true;
          this.pointer.swiped = true;
        }
      }
      this.slideLatch = Math.max(0, this.slideLatch - dt);
    }

    consumeJump() {
      const value = this.jumpQueued;
      this.jumpQueued = false;
      return value;
    }

    consumePause() {
      const value = this.pauseQueued;
      this.pauseQueued = false;
      return value;
    }

    isSliding() {
      return this.slideHeld || this.slideLatch > 0;
    }

    reset() {
      this.jumpQueued = false;
      this.slideHeld = false;
      this.pauseQueued = false;
      this.pointer = null;
      this.tapTimer = 0;
      this.slideLatch = 0;
    }
  }

  class RunnerGame {
    constructor(root) {
      this.root = root;
      this.canvas = root.querySelector("#game-canvas");
      this.ctx = this.canvas.getContext("2d");
      this.ctx.imageSmoothingEnabled = false;
      this.canvas.width = VIEW_W;
      this.canvas.height = VIEW_H;

      this.ui = {
        overlay: root.querySelector("[data-overlay]"),
        panels: [...root.querySelectorAll("[data-panel]")],
        buttons: [...root.querySelectorAll("[data-action]")],
        score: root.querySelector("[data-score]"),
        best: root.querySelector("[data-best]"),
        lives: root.querySelector("[data-lives]"),
        zone: root.querySelector("[data-theme]"),
        meter: root.querySelector("[data-rush]"),
        meterFill: root.querySelector("[data-rush-fill]"),
        stateLabel: root.querySelector("[data-state-label]"),
        finalScore: root.querySelector("[data-final-score]"),
        finalBest: root.querySelector("[data-final-best]"),
        finalCoins: root.querySelector("[data-final-bonuses]"),
      };

      this.assets = new AssetBank(ASSETS);
      this.audio = new AudioSystem();
      this.input = new InputController(root);
      this.spriteAssets = {};

      this.best = this.loadBest();
      this.state = "loading";
      this.lastFrame = performance.now();
      this.resetRun();
      this.bindUi();
      this.assets.load().then(() => {
        this.prepareSpriteAssets();
        this.state = "ready";
        this.setPanel("ready");
      }).catch((error) => {
        this.state = "error";
        this.setPanel("ready");
        const title = root.querySelector("[data-panel='ready'] h1");
        if (title) {
          title.textContent = "Assets introuvables";
        }
        console.error(error);
      });
      document.addEventListener("visibilitychange", () => {
        if (document.hidden && this.state === "running") {
          this.pause();
        }
      });
      requestAnimationFrame((time) => this.frame(time));
    }

    prepareSpriteAssets() {
      this.spriteAssets = {
        chefRun: this.assets.get("chefRun"),
        chefRunFrames: [
          this.assets.get("chefRun0"),
          this.assets.get("chefRun1"),
          this.assets.get("chefRun2"),
        ].filter(Boolean),
        chefSlide: this.assets.get("chefSlide"),
        table: this.assets.get("obstacleTable"),
        chair: this.assets.get("obstacleChair"),
        bottle: this.assets.get("obstacleBottle"),
        menu: this.assets.get("obstacleMenu"),
        cart: this.assets.get("obstacleCart"),
        "meal-trolley": this.assets.get("obstacleCart"),
        "table-lamp": this.assets.get("obstacleTableLamp"),
        lamp: this.assets.get("obstaclePendantLamp"),
        chandelier: this.assets.get("obstaclePendantLamp"),
      };
    }

    bindUi() {
      for (const button of this.ui.buttons) {
        button.addEventListener("click", () => {
          this.audio.ensure();
          const action = button.getAttribute("data-action");
          if (action === "start" || action === "restart") {
            this.start();
          } else if (action === "resume") {
            this.resume();
          } else if (action === "togglePause") {
            if (this.state === "running") {
              this.pause();
            } else if (this.state === "paused") {
              this.resume();
            }
          } else if (action === "mute") {
            button.textContent = this.audio.toggle() ? "ON" : "OFF";
          }
        });
      }
    }

    loadBest() {
      try {
        return Number(localStorage.getItem(STORAGE_KEY) || 0);
      } catch (error) {
        return 0;
      }
    }

    saveBest() {
      try {
        localStorage.setItem(STORAGE_KEY, String(this.best));
      } catch (error) {
        // Storage can be unavailable in private contexts.
      }
    }

    resetRun() {
      this.time = 0;
      this.runTime = 0;
      this.score = 0;
      this.scoreFloat = 0;
      this.coins = 0;
      this.lives = MAX_LIVES;
      this.speed = 152;
      this.targetSpeed = 152;
      this.worldX = 0;
      this.biomeIndex = 0;
      this.biomeDeck = [];
      this.nextBiomeAt = 34;
      this.transition = null;
      this.secretUnlocked = false;
      this.obstacles = [];
      this.pickups = [];
      this.particles = [];
      this.floaters = [];
      this.spawnTimer = 1.1;
      this.starTimer = 0;
      this.invulnTimer = 0;
      this.hitFlash = 0;
      this.combo = 0;
      this.comboTimer = 0;
      this.player = {
        x: 112,
        y: GROUND_Y,
        vy: 0,
        onGround: true,
        slide: 0,
        jumpBuffer: 0,
        coyote: 0,
        cycle: 0,
        hitPose: 0,
        landPulse: 0,
      };
      this.refillBiomeDeck();
    }

    start() {
      this.resetRun();
      this.input.reset();
      this.state = "running";
      this.setPanel("none");
      this.audio.setBiome(this.currentBiome());
      this.updateHud();
    }

    pause() {
      this.state = "paused";
      this.setPanel("paused");
    }

    resume() {
      this.state = "running";
      this.input.reset();
      this.audio.ensure();
      this.audio.setBiome(this.currentBiome());
      this.setPanel("none");
    }

    gameOver() {
      this.state = "gameover";
      this.hitFlash = 0.32;
      if (this.score > this.best) {
        this.best = this.score;
        this.saveBest();
      }
      this.ui.finalScore.textContent = String(this.score).padStart(5, "0");
      this.ui.finalBest.textContent = String(this.best).padStart(5, "0");
      this.ui.finalCoins.textContent = String(this.coins);
      this.audio.hit();
      this.setPanel("gameover");
      this.updateHud();
    }

    setPanel(name) {
      const hidden = name === "none";
      this.ui.overlay.classList.toggle("overlay--hidden", hidden);
      for (const panel of this.ui.panels) {
        panel.classList.toggle("panel--active", panel.getAttribute("data-panel") === name);
      }
    }

    refillBiomeDeck() {
      this.biomeDeck = BIOMES
        .map((biome, index) => index)
        .filter((index) => index !== this.biomeIndex && !BIOMES[index].hidden);
      for (let i = this.biomeDeck.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        const value = this.biomeDeck[i];
        this.biomeDeck[i] = this.biomeDeck[j];
        this.biomeDeck[j] = value;
      }
    }

    pickNextBiome() {
      if (!this.biomeDeck.length) {
        this.refillBiomeDeck();
      }
      return this.biomeDeck.shift() ?? ((this.biomeIndex + 1) % BIOMES.length);
    }

    currentBiome() {
      if (this.transition && this.transition.t > 0.5) {
        return BIOMES[this.transition.to];
      }
      return BIOMES[this.biomeIndex];
    }

    frame(timestamp) {
      const dt = Math.min(0.033, (timestamp - this.lastFrame) / 1000 || 0.016);
      this.lastFrame = timestamp;
      this.input.update(dt);

      if (this.input.consumePause()) {
        if (this.state === "running") {
          this.pause();
        } else if (this.state === "paused") {
          this.resume();
        }
      }

      if ((this.state === "ready" || this.state === "gameover") && this.input.consumeJump()) {
        this.start();
        this.jump();
      } else if (this.state === "paused" && this.input.consumeJump()) {
        this.resume();
      }

      if (this.state === "running") {
        this.update(dt);
      }
      this.render();
      requestAnimationFrame((time) => this.frame(time));
    }

    update(dt) {
      this.time += dt;
      this.runTime += dt;
      this.worldX += this.speed * dt;
      this.hitFlash = Math.max(0, this.hitFlash - dt * 2.8);
      this.starTimer = Math.max(0, this.starTimer - dt);
      this.invulnTimer = Math.max(0, this.invulnTimer - dt);
      this.comboTimer = Math.max(0, this.comboTimer - dt);
      if (this.comboTimer === 0) {
        this.combo = 0;
      }

      const difficulty = clamp(this.runTime / 170, 0, 1);
      this.targetSpeed = 152 + this.runTime * 0.42 + difficulty * 58;
      this.speed = lerp(this.speed, this.targetSpeed, clamp(dt * 1.8, 0, 1));
      this.scoreFloat += dt * (this.speed * 0.15 + this.combo * 2.2) * (this.starTimer > 0 ? 1.35 : 1);
      this.score = Math.floor(this.scoreFloat);

      if (!this.secretUnlocked && this.score >= 10000 && !this.transition) {
        this.secretUnlocked = true;
        this.beginTransition(BIOMES.findIndex((biome) => biome.key === "secret"), true);
      } else if (this.runTime >= this.nextBiomeAt && !this.transition) {
        this.beginTransition();
      }
      this.updateTransition(dt);
      this.updatePlayer(dt);
      this.updateSpawning(dt, difficulty);
      this.updateObjects(dt);
      this.updateParticles(dt);
      this.collide();
      this.updateHud();
    }

    beginTransition(forcedIndex = null, secret = false) {
      const next = forcedIndex ?? this.pickNextBiome();
      if (next < 0) {
        return;
      }
      this.transition = { from: this.biomeIndex, to: next, t: 0, duration: secret ? 1.45 : 1.15, secret };
      this.nextBiomeAt += secret ? 58 : rand(35, 48);
      if (secret) {
        this.audio.star();
        this.addFloater("TABLE SECRETE", VIEW_W * 0.5, 82, "#ffe88c");
      } else {
        this.audio.transition();
      }
      const color = secret ? "#ffe88c" : "#f6c26e";
      const count = secret ? 46 : 26;
      for (let i = 0; i < count; i += 1) {
        this.spawnParticle(rand(80, VIEW_W - 80), rand(40, 170), rand(-18, 18), rand(12, 42), secret ? 1.15 : 0.8, color, rand(1, secret ? 4 : 3));
      }
    }

    updateTransition(dt) {
      if (!this.transition) {
        return;
      }
      this.transition.t += dt / this.transition.duration;
      if (this.transition.t >= 1) {
        this.biomeIndex = this.transition.to;
        this.transition = null;
        this.audio.setBiome(this.currentBiome());
      }
    }

    updatePlayer(dt) {
      const wantSlide = this.input.isSliding();
      if (this.input.consumeJump()) {
        this.player.jumpBuffer = 0.11;
      }
      this.player.jumpBuffer = Math.max(0, this.player.jumpBuffer - dt);
      this.player.coyote = this.player.onGround ? 0.08 : Math.max(0, this.player.coyote - dt);

      if (this.player.jumpBuffer > 0 && (this.player.onGround || this.player.coyote > 0) && this.player.slide < 0.45) {
        this.jump();
      }

      const targetSlide = wantSlide && this.player.onGround ? 1 : 0;
      this.player.slide = lerp(this.player.slide, targetSlide, clamp(dt * 12, 0, 1));

      const gravity = this.player.vy < 0 ? 1780 : 1320;
      const fastFall = wantSlide && !this.player.onGround ? 1.62 : 1;
      if (!this.player.onGround) {
        this.player.vy += gravity * fastFall * dt;
        this.player.y += this.player.vy * dt;
        if (this.player.y >= GROUND_Y) {
          this.player.y = GROUND_Y;
          this.player.vy = 0;
          this.player.onGround = true;
          this.player.landPulse = 1;
          this.emitLandingDust();
        }
      }

      this.player.cycle += dt * (this.player.onGround ? 11 + this.speed * 0.03 : 7);
      this.player.hitPose = Math.max(0, this.player.hitPose - dt * 2.4);
      this.player.landPulse = Math.max(0, this.player.landPulse - dt * 4);
    }

    jump() {
      this.player.jumpBuffer = 0;
      this.player.coyote = 0;
      this.player.onGround = false;
      this.player.vy = -642;
      this.player.slide = 0;
      this.audio.jump();
      this.emitJumpDust();
    }

    updateSpawning(dt, difficulty) {
      this.spawnTimer -= dt;
      if (this.spawnTimer > 0) {
        return;
      }
      const recovery = this.spawnPattern(difficulty);
      this.spawnTimer = rand(1.38, 1.72) - difficulty * 0.28 + recovery;
    }

    spawnPattern(difficulty) {
      const pool = this.obstaclePool(difficulty);
      if (!pool.length) {
        return 0.4;
      }
      const startX = VIEW_W + rand(34, 68);
      const canDouble = difficulty > 0.34 && chance(0.32);
      let endX = startX;
      const first = this.pickObstacle(pool, difficulty, false);
      endX = this.pushObstacle(first, startX);

      if (canDouble && !first.wide) {
        const secondPool = pool.filter((type) => !type.wide && type.id !== first.id);
        if (secondPool.length) {
          const second = this.pickObstacle(secondPool, difficulty, true);
          const gap = this.safeObstacleGap(first, second, difficulty);
          endX = this.pushObstacle(second, endX + gap);
        }
      }

      this.spawnCoinLine(endX + rand(28, 44), first.action, difficulty);
      if (difficulty > 0.18 && chance(0.08 + difficulty * 0.05)) {
        this.pushPickup("star", endX + rand(96, 126), GROUND_Y - rand(72, 96));
      }
      return canDouble ? 0.22 : 0.08;
    }

    obstaclePool(difficulty) {
      const key = this.currentBiome().key;
      const poolKey = key === "secret" ? "restaurant" : key;
      return OBSTACLES.filter((type) => difficulty >= type.unlock && type.biomes.includes(poolKey));
    }

    pickObstacle(pool, difficulty, preferSwitch) {
      return pickWeighted(pool, (type) => {
        let weight = type.weight;
        if (type.layer === "ceiling" && difficulty < 0.22) {
          weight *= 0.55;
        }
        if (type.wide && difficulty < 0.52) {
          weight *= 0.55;
        }
        if (preferSwitch) {
          weight *= type.layer === "ceiling" ? 1.15 : 0.95;
        }
        return weight;
      });
    }

    safeObstacleGap(first, second, difficulty) {
      const jumpCost = first.action === "jump" || second.action === "jump" ? 122 : 92;
      const switchCost = first.action !== second.action ? 24 : 0;
      const speedCost = clamp((this.speed - 160) * 0.16, 0, 18);
      return Math.round(jumpCost + switchCost + speedCost - difficulty * 10);
    }

    pushObstacle(type, x) {
      this.obstacles.push({
        type,
        x,
        phase: rand(0, Math.PI * 2),
        passed: false,
        rewarded: false,
      });
      return x + type.w;
    }

    spawnCoinLine(startX, action, difficulty) {
      const count = chance(0.2 + difficulty * 0.15) ? 6 : 4;
      const baseY = action === "slide" ? GROUND_Y - 72 : GROUND_Y - rand(82, 104);
      for (let i = 0; i < count; i += 1) {
        const arc = Math.sin((i / Math.max(1, count - 1)) * Math.PI) * 16;
        this.pushPickup(chance(0.14) ? "premium" : "coin", startX + i * 30, baseY - arc);
      }
    }

    pushPickup(id, x, y) {
      const type = COIN_TYPES.find((item) => item.id === id);
      this.pickups.push({
        type,
        x,
        y,
        phase: rand(0, Math.PI * 2),
        taken: false,
      });
    }

    updateObjects(dt) {
      for (const obstacle of this.obstacles) {
        obstacle.x -= this.speed * dt;
        if (!obstacle.rewarded && !obstacle.passed && obstacle.x + obstacle.type.w < this.player.x + 7) {
          obstacle.rewarded = true;
          this.rewardPerfectDodge(obstacle);
        }
      }
      for (const pickup of this.pickups) {
        pickup.x -= this.speed * dt;
        pickup.phase += dt * 7;
      }
      this.obstacles = this.obstacles.filter((obstacle) => obstacle.x + obstacle.type.w > -80);
      this.pickups = this.pickups.filter((pickup) => pickup.x + pickup.type.size > -60 && !pickup.taken);
    }

    rewardPerfectDodge(obstacle) {
      const value = obstacle.type.action === "slide" ? 45 : 30;
      this.scoreFloat += value;
      this.combo = Math.min(12, this.combo + 1);
      this.comboTimer = Math.max(this.comboTimer, 1.4);
      this.emitPerfectDodge(obstacle);
    }

    collide() {
      const player = this.playerBox();
      for (const pickup of this.pickups) {
        const box = this.pickupBox(pickup);
        if (!intersects(player, box)) {
          continue;
        }
        pickup.taken = true;
        if (pickup.type.id === "star") {
          this.starTimer = 6.2;
          this.scoreFloat += pickup.type.value;
          this.addFloater("+STAR", pickup.x, pickup.y, "#fff4a8");
          this.audio.star();
          this.emitStarBurst();
        } else {
          this.combo = Math.min(12, this.combo + 1);
          this.comboTimer = 2.2;
          this.coins += 1;
          this.scoreFloat += pickup.type.value * (1 + Math.floor(this.combo / 4));
          this.addFloater(`+${pickup.type.value}`, pickup.x, pickup.y, "#ffe29a");
          this.audio.coin();
          this.emitCoinBurst(pickup.x, pickup.y, pickup.type.id === "premium");
        }
      }

      for (const obstacle of this.obstacles) {
        if (obstacle.passed || !intersects(player, this.obstacleBox(obstacle))) {
          continue;
        }
        obstacle.passed = true;
        if (this.starTimer > 0) {
          this.scoreFloat += 130;
          this.combo = Math.min(12, this.combo + 1);
          this.comboTimer = 2.2;
          this.addFloater("+130", obstacle.x, GROUND_Y - obstacle.type.h, "#fff4a8");
          this.emitObstacleBurst(obstacle);
          this.audio.coin();
          continue;
        }
        if (this.invulnTimer > 0) {
          continue;
        }
        this.lives -= 1;
        this.combo = 0;
        this.comboTimer = 0;
        this.invulnTimer = 1.25;
        this.player.hitPose = 1;
        this.hitFlash = 0.24;
        this.emitHitBurst(obstacle);
        this.audio.hit();
        if (this.lives <= 0) {
          this.gameOver();
          return;
        }
      }
    }

    playerBox() {
      const slide = this.player.slide > 0.55;
      const h = slide ? 30 : 68;
      const w = slide ? 52 : 34;
      return {
        x: this.player.x + (slide ? 8 : 15),
        y: this.player.y - h + (slide ? 3 : 0),
        w,
        h,
      };
    }

    obstacleBox(obstacle) {
      const rect = this.obstacleRect(obstacle);
      const hit = obstacle.type.hit;
      return {
        x: rect.x + hit[0],
        y: rect.y + hit[1],
        w: hit[2],
        h: hit[3],
      };
    }

    obstacleRect(obstacle) {
      const type = obstacle.type;
      const y = type.layer === "ceiling"
        ? GROUND_Y - type.clearance - type.h
        : GROUND_Y - type.h;
      return { x: obstacle.x, y, w: type.w, h: type.h };
    }

    pickupBox(pickup) {
      const s = pickup.type.size;
      return { x: pickup.x, y: pickup.y, w: s, h: s };
    }

    spawnParticle(x, y, vx, vy, life, color, size) {
      this.particles.push({ x, y, vx, vy, life, maxLife: life, color, size });
    }

    addFloater(text, x, y, color) {
      this.floaters.push({ text, x, y, life: 0.82, maxLife: 0.82, color });
    }

    emitJumpDust() {
      for (let i = 0; i < 10; i += 1) {
        this.spawnParticle(this.player.x + rand(8, 38), GROUND_Y + rand(-2, 4), rand(-70, 10), rand(-34, -10), rand(0.18, 0.34), "#cfa077", rand(2, 4));
      }
    }

    emitLandingDust() {
      for (let i = 0; i < 12; i += 1) {
        this.spawnParticle(this.player.x + rand(5, 46), GROUND_Y + rand(-1, 5), rand(-58, 42), rand(-30, -6), rand(0.2, 0.38), "#b88663", rand(2, 4));
      }
    }

    emitCoinBurst(x, y, premium) {
      const color = premium ? "#fff0b0" : "#ffd15c";
      for (let i = 0; i < 12; i += 1) {
        this.spawnParticle(x + rand(4, 14), y + rand(4, 14), rand(-50, 50), rand(-62, 28), rand(0.25, 0.48), color, rand(2, 4));
      }
    }

    emitStarBurst() {
      for (let i = 0; i < 34; i += 1) {
        this.spawnParticle(this.player.x + rand(10, 44), this.player.y - rand(14, 70), rand(-78, 86), rand(-84, 46), rand(0.35, 0.72), i % 2 ? "#fff3a8" : "#f0a94c", rand(2, 5));
      }
    }

    emitObstacleBurst(obstacle) {
      const rect = this.obstacleRect(obstacle);
      for (let i = 0; i < 20; i += 1) {
        this.spawnParticle(rect.x + rect.w * 0.5, rect.y + rect.h * 0.5, rand(-88, 88), rand(-72, 42), rand(0.28, 0.58), "#ffe2a3", rand(2, 4));
      }
    }

    emitHitBurst(obstacle) {
      const rect = this.obstacleRect(obstacle);
      for (let i = 0; i < 18; i += 1) {
        this.spawnParticle(rect.x + rect.w * 0.5, rect.y + rect.h * 0.5, rand(-58, 58), rand(-42, 42), rand(0.26, 0.5), "#e77758", rand(2, 4));
      }
    }

    emitPerfectDodge(obstacle) {
      const rect = this.obstacleRect(obstacle);
      const y = obstacle.type.layer === "ceiling" ? rect.y + rect.h - 12 : GROUND_Y - 18;
      for (let i = 0; i < 7; i += 1) {
        this.spawnParticle(rect.x + rect.w * 0.5 + rand(-8, 8), y + rand(-5, 5), rand(-18, 22), rand(-34, -12), rand(0.18, 0.32), "#ffd77a", rand(1.5, 3));
      }
    }

    updateParticles(dt) {
      for (const particle of this.particles) {
        particle.life -= dt;
        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;
        particle.vy += 280 * dt;
      }
      for (const floater of this.floaters) {
        floater.life -= dt;
        floater.y -= 28 * dt;
      }
      this.particles = this.particles.filter((particle) => particle.life > 0);
      this.floaters = this.floaters.filter((floater) => floater.life > 0);
    }

    updateHud() {
      const biome = this.currentBiome();
      this.ui.score.textContent = String(this.score).padStart(5, "0");
      this.ui.best.textContent = String(Math.max(this.best, this.score)).padStart(5, "0");
      this.ui.lives.textContent = String(this.lives);
      this.ui.zone.textContent = biome.name;
      const starPercent = clamp(this.starTimer / 6.2, 0, 1);
      this.ui.meter.textContent = this.starTimer > 0 ? `${Math.ceil(this.starTimer)}s` : "0%";
      this.ui.meterFill.style.width = `${Math.round(starPercent * 100)}%`;
      this.ui.stateLabel.textContent = "Star";
      if (this.score > this.best) {
        this.best = this.score;
      }
    }

    render() {
      const ctx = this.ctx;
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, VIEW_W, VIEW_H);

      if (this.state === "loading") {
        this.drawLoading();
        return;
      }

      this.drawWorld();
      this.drawPickups();
      this.drawObstacles();
      this.drawPlayer();
      this.drawParticles();
      this.drawFloaters();
      this.drawSpeedLines();
      this.drawScreenFx();
    }

    drawLoading() {
      px(this.ctx, 0, 0, VIEW_W, VIEW_H, "#050607");
      px(this.ctx, 220, 174, 200, 2, "#f0b461");
    }

    drawWorld() {
      if (this.transition) {
        const eased = this.transition.t * this.transition.t * (3 - 2 * this.transition.t);
        this.drawBiome(BIOMES[this.transition.from], 1, 0);
        this.drawBiome(BIOMES[this.transition.to], eased, eased);
      } else {
        this.drawBiome(this.currentBiome(), 1, 0);
      }
      this.drawAtmosphere(this.currentBiome());
      this.drawForegroundLip();
    }

    drawBiome(biome, alpha, reveal) {
      const image = this.assets.get(biome.image);
      const ctx = this.ctx;
      ctx.save();
      ctx.globalAlpha = alpha;
      if (!image) {
        px(ctx, 0, 0, VIEW_W, VIEW_H, "#171a1d");
        ctx.restore();
        return;
      }
      const inset = 4;
      const sw = Math.max(1, image.width - inset * 2);
      const sh = Math.max(1, image.height - inset * 2);
      const scale = Math.max(VIEW_W / sw, VIEW_H / sh) * biome.ambient.zoom;
      const dw = sw * scale;
      const dh = sh * scale;
      const maxY = Math.min(0, VIEW_H - dh);
      const y = Math.round(maxY * biome.ambient.y);
      const move = this.worldX * biome.ambient.parallax;
      const cycle = dw;
      let start = -((move % cycle) + cycle) % cycle;
      if (start > -4) {
        start -= cycle;
      }
      for (let x = start; x < VIEW_W + cycle; x += cycle) {
        ctx.drawImage(image, inset, inset, sw, sh, Math.round(x), y, Math.ceil(dw), Math.ceil(dh));
      }
      if (reveal > 0) {
        ctx.fillStyle = `rgba(255, 224, 176, ${0.12 * (1 - Math.abs(reveal - 0.5) * 2)})`;
        ctx.fillRect(0, 0, VIEW_W, VIEW_H);
      }
      ctx.restore();
    }

    drawAtmosphere(biome) {
      const flicker = 0.7 + Math.sin(this.time * 8) * 0.12 + Math.sin(this.time * 3.7) * 0.08;
      for (const [x, y, r] of biome.lights) {
        glow(this.ctx, x, y, r, `rgb(${biome.ambient.color === "#ff944d" ? "255, 148, 77" : "246, 194, 110"})`, 0.15 * flicker);
      }
      for (const [x, y] of biome.steam) {
        const drift = Math.sin(this.time * 1.8 + x * 0.03) * 8;
        px(this.ctx, x + drift, y - (this.time * 14) % 34, 5, 9, "rgba(238, 226, 204, 0.22)");
        px(this.ctx, x + 10 - drift * 0.4, y - 14 - (this.time * 11) % 30, 4, 7, "rgba(238, 226, 204, 0.16)");
      }
      if (biome.key === "terrace") {
        this.drawTerraceBirds();
      }
      if (biome.key === "secret") {
        this.drawSecretSparkles();
      }
      px(this.ctx, 0, 0, VIEW_W, 42, "rgba(0, 0, 0, 0.28)");
      px(this.ctx, 0, VIEW_H - 32, VIEW_W, 32, "rgba(0, 0, 0, 0.22)");
    }

    drawSecretSparkles() {
      for (let i = 0; i < 18; i += 1) {
        const x = ((i * 73 + this.worldX * 0.11) % (VIEW_W + 40)) - 20;
        const y = 58 + ((i * 37) % 178) + Math.sin(this.time * 1.8 + i) * 5;
        const pulse = Math.sin(this.time * 4 + i) > 0 ? "#fff3b1" : "#d99a3b";
        px(this.ctx, x, y, 2, 2, pulse);
        if (i % 3 === 0) {
          px(this.ctx, x - 2, y + 1, 6, 1, "rgba(255, 230, 138, 0.34)");
          px(this.ctx, x + 1, y - 2, 1, 6, "rgba(255, 230, 138, 0.28)");
        }
      }
    }

    drawTerraceBirds() {
      for (let i = 0; i < 5; i += 1) {
        const x = VIEW_W - ((this.worldX * 0.08 + i * 148) % (VIEW_W + 90));
        const y = 54 + Math.sin(this.time * 1.4 + i) * 12 + i * 7;
        const flap = Math.sin(this.time * 8 + i) > 0 ? 1 : -1;
        px(this.ctx, x, y, 4, 2, "rgba(34, 24, 35, 0.74)");
        px(this.ctx, x - 4, y - flap, 5, 1, "rgba(34, 24, 35, 0.74)");
        px(this.ctx, x + 3, y - flap, 5, 1, "rgba(34, 24, 35, 0.74)");
      }
    }

    drawForegroundLip() {
      px(this.ctx, 0, GROUND_Y + 8, VIEW_W, 3, "rgba(255, 202, 130, 0.18)");
      px(this.ctx, 0, GROUND_Y + 16, VIEW_W, 44, "rgba(0, 0, 0, 0.48)");
      const offset = Math.floor(this.worldX * 0.22) % 36;
      for (let x = -offset; x < VIEW_W; x += 36) {
        px(this.ctx, x, GROUND_Y + 21, 24, 3, "rgba(255, 208, 143, 0.12)");
      }
    }

    drawPickups() {
      for (const pickup of this.pickups) {
        const bob = Math.sin(this.time * 4 + pickup.phase) * 4;
        const x = Math.round(pickup.x);
        const y = Math.round(pickup.y + bob);
        if (pickup.type.id === "star") {
          this.drawStarPickup(x, y, pickup.phase);
        } else {
          this.drawCoin(x, y, pickup.type.id === "premium", pickup.phase);
        }
      }
    }

    drawCoin(x, y, premium, phase) {
      const spin = Math.abs(Math.sin(phase));
      const w = Math.max(5, Math.round((premium ? 18 : 15) * (0.35 + spin * 0.65)));
      const cx = x + 10;
      const color = premium ? "#fff0a8" : "#f4b950";
      glow(this.ctx, cx, y + 10, premium ? 20 : 15, "rgb(245, 185, 80)", premium ? 0.18 : 0.12);
      frame(this.ctx, cx - w / 2, y + 2, w, 17, color, "#fff6c4", "#9a5f22");
      px(this.ctx, cx - 2, y + 5, 4, 8, premium ? "#d98242" : "#ffe083");
      px(this.ctx, cx + w / 2 - 3, y + 4, 2, 3, "#fff8d0");
    }

    drawStarPickup(x, y, phase) {
      const pulse = Math.sin(phase) > 0 ? "#fff9c7" : "#ffd85d";
      glow(this.ctx, x + 12, y + 12, 25, "rgb(255, 220, 90)", 0.22);
      px(this.ctx, x + 10, y + 0, 4, 8, pulse);
      px(this.ctx, x + 6, y + 7, 12, 4, "#ffd85d");
      px(this.ctx, x + 1, y + 11, 22, 4, "#f5a842");
      px(this.ctx, x + 6, y + 15, 12, 4, "#ffd85d");
      px(this.ctx, x + 10, y + 19, 4, 6, pulse);
    }

    drawObstacles() {
      for (const obstacle of this.obstacles) {
        const rect = this.obstacleRect(obstacle);
        this.drawObstacle(obstacle, rect);
      }
    }

    drawObstacle(obstacle, rect) {
      const ctx = this.ctx;
      const x = Math.round(rect.x);
      const y = Math.round(rect.y);
      const id = obstacle.type.id;
      const sprite = this.spriteAssets[id];
      if (!sprite) {
        return;
      }

      const visual = OBSTACLE_VISUALS[id] || {};
      const targetH = visual.h || rect.h;
      const ratio = targetH / sprite.height;
      const targetW = sprite.width * ratio;
      const centerX = x + rect.w * 0.5 + (visual.x || 0);

      if (obstacle.type.layer === "ceiling") {
        const bottom = visual.bottom || (rect.y + rect.h);
        const drawX = Math.round(centerX - targetW * 0.5);
        const drawY = Math.round(bottom - targetH);
        const cableX = Math.round(centerX);
        px(ctx, cableX - 1, 0, 2, Math.max(0, drawY + 18), "rgba(13, 12, 13, 0.96)");
        px(ctx, cableX + 1, 0, 1, Math.max(0, drawY + 18), "rgba(70, 48, 34, 0.42)");
        ctx.drawImage(sprite, drawX, drawY, Math.round(targetW), Math.round(targetH));
      } else {
        const footY = GROUND_Y + (visual.floor || 5);
        const drawX = Math.round(centerX - targetW * 0.5);
        const drawY = Math.round(footY - targetH);
        const shadowW = clamp(targetW * 0.82, 18, rect.w + 18);
        shadow(ctx, drawX + (targetW - shadowW) * 0.5, footY + 2, shadowW, 0.24);
        ctx.drawImage(sprite, drawX, drawY, Math.round(targetW), Math.round(targetH));
      }

      if (id === "lamp" || id === "chandelier" || id === "table-lamp") {
        glow(ctx, x + rect.w * 0.5, y + rect.h - 10, 28, "rgb(245, 184, 92)", 0.14);
      }
    }

    drawPlayer() {
      const ctx = this.ctx;
      const x = Math.round(this.player.x);
      const feet = Math.round(this.player.y);
      const slide = this.player.slide > 0.55;
      const airborne = !this.player.onGround;
      const flash = this.invulnTimer > 0 && Math.sin(this.time * 28) > 0;
      const star = this.starTimer > 0;
      const shadowWidth = slide ? 74 : 44 - clamp((GROUND_Y - this.player.y) * 0.12, 0, 18);
      shadow(ctx, x + 6, GROUND_Y + 7, shadowWidth, 0.36);

      if (star) {
        glow(ctx, x + 31, feet - 48, 72, "rgb(255, 230, 96)", 0.34);
        glow(ctx, x + 31, feet - 48, 38, "rgb(255, 255, 206)", 0.22);
        for (let i = 0; i < 9; i += 1) {
          const a = this.time * 4.6 + i * 0.7;
          const rx = 34 + (i % 3) * 4;
          const ry = 24 + (i % 2) * 5;
          px(ctx, x + 31 + Math.cos(a) * rx, feet - 48 + Math.sin(a) * ry, i % 3 === 0 ? 5 : 4, i % 3 === 0 ? 5 : 4, i % 2 ? "#fff7bd" : "#ffbd47");
        }
      }

      const runFrames = this.spriteAssets.chefRunFrames || [];
      const runFrame = runFrames.length ? Math.floor(this.player.cycle * 0.55) % runFrames.length : 0;
      const runSprite = runFrames[runFrame] || this.spriteAssets.chefRun || this.assets.get("chefRun");
      const slideSprite = this.spriteAssets.chefSlide || this.assets.get("chefSlide") || runSprite;
      const useSlideSprite = slide && slideSprite;
      const sprite = useSlideSprite ? slideSprite : runSprite;
      if (!sprite) {
        return;
      }

      const targetH = sprite.height;
      const dw = sprite.width;
      const anchorX = useSlideSprite ? x + 39 : x + 36;
      const anchorY = useSlideSprite ? feet + 2 : feet;
      ctx.save();
      if (flash) {
        ctx.globalAlpha = 0.72;
      }
      ctx.drawImage(sprite, Math.round(anchorX - dw * 0.5), Math.round(anchorY - targetH), Math.round(dw), Math.round(targetH));
      if (useSlideSprite) {
        const dust = Math.floor(this.time * 18) % 3;
        px(ctx, x - 16 - dust * 3, feet - 12, 16, 2, "rgba(202, 150, 78, 0.62)");
        px(ctx, x - 30 - dust * 2, feet - 7, 9, 2, "rgba(202, 150, 78, 0.42)");
        px(ctx, x - 40, feet - 17 + dust, 4, 3, "rgba(255, 242, 202, 0.58)");
      }
      if (!useSlideSprite && !airborne && runFrame === 1) {
        px(ctx, x - 8, feet - 4, 8, 2, "rgba(180, 122, 78, 0.55)");
        px(ctx, x - 20, feet - 2, 5, 2, "rgba(180, 122, 78, 0.35)");
      }
      ctx.restore();
    }

    drawParticles() {
      const ctx = this.ctx;
      for (const particle of this.particles) {
        const alpha = clamp(particle.life / particle.maxLife, 0, 1);
        ctx.globalAlpha = alpha;
        px(ctx, particle.x, particle.y, particle.size, particle.size, particle.color);
      }
      ctx.globalAlpha = 1;
    }

    drawFloaters() {
      const ctx = this.ctx;
      ctx.save();
      ctx.font = "12px Courier New, monospace";
      ctx.textAlign = "center";
      for (const floater of this.floaters) {
        ctx.globalAlpha = clamp(floater.life / floater.maxLife, 0, 1);
        ctx.fillStyle = "rgba(0,0,0,0.65)";
        ctx.fillText(floater.text, Math.round(floater.x + 1), Math.round(floater.y + 1));
        ctx.fillStyle = floater.color;
        ctx.fillText(floater.text, Math.round(floater.x), Math.round(floater.y));
      }
      ctx.restore();
      ctx.globalAlpha = 1;
    }

    drawSpeedLines() {
      const intensity = clamp((this.speed - 170) / 86, 0, 1);
      if (intensity <= 0) {
        return;
      }
      const color = this.starTimer > 0 ? "rgba(255, 230, 116, 0.48)" : "rgba(255, 226, 184, 0.22)";
      const offset = (this.worldX * 0.55) % 96;
      for (let i = 0; i < 8; i += 1) {
        const x = VIEW_W - ((offset + i * 88) % (VIEW_W + 120));
        const y = GROUND_Y + 18 + i * 4;
        px(this.ctx, x, y, 42 + i * 5, 2, color);
      }
    }

    drawScreenFx() {
      if (this.hitFlash > 0) {
        this.ctx.fillStyle = `rgba(226, 84, 62, ${this.hitFlash})`;
        this.ctx.fillRect(0, 0, VIEW_W, VIEW_H);
      }
      if (this.starTimer > 0) {
        this.ctx.fillStyle = `rgba(255, 221, 103, ${0.06 + Math.sin(this.time * 10) * 0.02})`;
        this.ctx.fillRect(0, 0, VIEW_W, VIEW_H);
      }
    }
  }

  const root = document.getElementById("runner-shell");
  if (root) {
    new RunnerGame(root);
  }
})();
