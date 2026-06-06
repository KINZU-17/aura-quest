/**
 * AuraQuest - "Juice" module
 * Fun & motivating feedback: confetti, floating XP popups,
 * motivational hype messages, combo meter, and animated counters.
 *
 * CSP-safe: served from 'self', uses the Web Animations API
 * (element.animate) — no inline <script> and no eval.
 */
(function () {
  'use strict';

  // ------------------------------------------------------------------
  // Config
  // ------------------------------------------------------------------
  const CONFETTI_COLORS = [
    '#7000ff', '#00f2fe', '#00ff88', '#ff2e9a',
    '#ff8a00', '#ffe14d', '#ff4757'
  ];
  const COMBO_WINDOW_MS = 4 * 60 * 1000; // keep the combo alive between sets
  const reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ------------------------------------------------------------------
  // Motivational copy
  // ------------------------------------------------------------------
  const MESSAGES = {
    complete: [
      'You crushed it! 💥',
      'Beast mode unlocked! 🦾',
      'That rep counts. Keep going! 🔥',
      'Stronger than yesterday! 💪',
      'Boom — another quest down! ⚔️',
      'Your aura is glowing! ✨',
      'No days off, champion! 🏆',
      'Sweat now, shine later! 🌟'
    ],
    // {n} is replaced with the exercise name
    completeNamed: [
      '{n} — crushed it! 💥',
      '{n} conquered! 🔥',
      'Nailed {n}! 💪',
      '{n}? Too easy. 😎',
      'That\'s {n} done. Beast! 🦾',
      '{n} — your aura grows! ✨'
    ],
    levelUp: [
      'LEVEL UP! New power unlocked! ⚡',
      'You ascended! Keep climbing! 🚀',
      'A new tier of greatness! 👑',
      'Level up! The grind pays off! 💎'
    ],
    combo: [
      'On fire! 🔥',
      'Unstoppable! ⚡',
      'Combo king! 👑',
      'Don\'t stop now! 💫',
      'Momentum building! 🌊'
    ],
    streak: [
      'day streak — consistency is power! 🔥',
      'days strong! You\'re built different! 💪',
      'days in a row! Habits = legends! ⭐'
    ]
  };

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ------------------------------------------------------------------
  // Overlay layer for floating effects
  // ------------------------------------------------------------------
  let layer = null;
  function getLayer() {
    if (layer && document.body.contains(layer)) return layer;
    layer = document.createElement('div');
    layer.className = 'juice-layer';
    document.body.appendChild(layer);
    return layer;
  }

  // ------------------------------------------------------------------
  // Confetti
  // ------------------------------------------------------------------
  function confetti(count, origin) {
    if (reduceMotion) return;
    const root = getLayer();
    const cx = origin && typeof origin.x === 'number' ? origin.x : window.innerWidth / 2;
    const cy = origin && typeof origin.y === 'number' ? origin.y : window.innerHeight / 3;
    const total = count || 70;

    for (let i = 0; i < total; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
      piece.style.background = color;
      piece.style.left = cx + 'px';
      piece.style.top = cy + 'px';
      if (Math.random() > 0.5) piece.style.borderRadius = '50%';
      root.appendChild(piece);

      const angle = Math.random() * Math.PI * 2;
      const distance = 120 + Math.random() * 220;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance - 120; // bias upward, then gravity
      const rot = (Math.random() * 720 - 360) + 'deg';
      const duration = 900 + Math.random() * 900;

      const anim = piece.animate(
        [
          { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
          { transform: `translate(${dx * 0.6}px, ${dy}px) rotate(${rot})`, opacity: 1, offset: 0.6 },
          { transform: `translate(${dx}px, ${dy + 320}px) rotate(${rot})`, opacity: 0 }
        ],
        { duration: duration, easing: 'cubic-bezier(0.21, 0.78, 0.4, 1)' }
      );
      anim.onfinish = () => piece.remove();
    }
  }

  // ------------------------------------------------------------------
  // Floating "+XP" popup
  // ------------------------------------------------------------------
  function xpPopup(amount, anchor) {
    if (!amount) return;
    const root = getLayer();
    const pop = document.createElement('div');
    pop.className = 'xp-popup';
    pop.textContent = '+' + Math.round(amount) + ' XP';

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    const el = anchor || document.getElementById('xp-fill');
    if (el && el.getBoundingClientRect) {
      const r = el.getBoundingClientRect();
      x = r.left + r.width / 2;
      y = r.top + r.height / 2;
    }
    pop.style.left = x + 'px';
    pop.style.top = y + 'px';
    root.appendChild(pop);

    if (reduceMotion) {
      setTimeout(() => pop.remove(), 1200);
      return;
    }
    const anim = pop.animate(
      [
        { transform: 'translate(-50%, -50%) scale(0.6)', opacity: 0 },
        { transform: 'translate(-50%, -120%) scale(1.2)', opacity: 1, offset: 0.3 },
        { transform: 'translate(-50%, -260%) scale(1)', opacity: 0 }
      ],
      { duration: 1400, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
    );
    anim.onfinish = () => pop.remove();
  }

  // ------------------------------------------------------------------
  // Hype toast (motivational one-liner)
  // ------------------------------------------------------------------
  function hype(text, variant) {
    const root = getLayer();
    const toast = document.createElement('div');
    toast.className = 'hype-toast' + (variant ? ' ' + variant : '');
    toast.textContent = text;
    root.appendChild(toast);

    const lifetime = 2200;
    if (reduceMotion) {
      setTimeout(() => toast.remove(), lifetime);
      return;
    }
    const anim = toast.animate(
      [
        { transform: 'translate(-50%, 30px)', opacity: 0 },
        { transform: 'translate(-50%, 0)', opacity: 1, offset: 0.15 },
        { transform: 'translate(-50%, 0)', opacity: 1, offset: 0.8 },
        { transform: 'translate(-50%, -20px)', opacity: 0 }
      ],
      { duration: lifetime, easing: 'ease-out' }
    );
    anim.onfinish = () => toast.remove();
  }

  // ------------------------------------------------------------------
  // Combo meter
  // ------------------------------------------------------------------
  let comboCount = 0;
  let comboTimer = null;
  let comboEl = null;

  function getComboEl() {
    if (comboEl && document.body.contains(comboEl)) return comboEl;
    comboEl = document.createElement('div');
    comboEl.className = 'combo-meter';
    comboEl.innerHTML =
      '<span class="combo-flame">🔥</span>' +
      '<span class="combo-count"></span>' +
      '<span class="combo-label">COMBO</span>';
    document.body.appendChild(comboEl);
    return comboEl;
  }

  function renderCombo() {
    const el = getComboEl();
    el.querySelector('.combo-count').textContent = 'x' + comboCount;
    el.classList.add('show');
    el.classList.remove('bump');
    // restart bump animation
    void el.offsetWidth;
    el.classList.add('bump');
  }

  function clearCombo() {
    if (comboEl) comboEl.classList.remove('show');
    comboCount = 0;
  }

  /**
   * Register a completed activity toward the combo.
   * Returns { count, bonus } where bonus is extra XP to award.
   */
  function combo() {
    comboCount += 1;
    if (comboTimer) clearTimeout(comboTimer);
    comboTimer = setTimeout(clearCombo, COMBO_WINDOW_MS);

    const bonus = comboCount > 1 ? (comboCount - 1) * 5 : 0;
    if (comboCount > 1) {
      renderCombo();
      hype('COMBO x' + comboCount + ' — ' + pick(MESSAGES.combo), 'combo');
    }
    return { count: comboCount, bonus: bonus };
  }

  // ------------------------------------------------------------------
  // Animated number counter
  // ------------------------------------------------------------------
  function animateCount(el, from, to, duration) {
    if (!el) return;
    if (reduceMotion || from === to) {
      el.textContent = Math.round(to).toLocaleString();
      return;
    }
    const start = performance.now();
    const dur = duration || 600;
    function frame(now) {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      el.textContent = Math.round(from + (to - from) * eased).toLocaleString();
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // ------------------------------------------------------------------
  // Sound — reuse the shared AudioManager from features.js
  // ------------------------------------------------------------------
  function getAudio() {
    if (window.audioManager) return window.audioManager;
    if (typeof window.AudioManager === 'function') {
      window.audioManager = new window.AudioManager();
      return window.audioManager;
    }
    return null;
  }

  function sparkle(big) {
    const am = getAudio();
    if (!am || !am.enabled) return;
    const notes = big ? [523, 659, 784, 1047, 1319] : [659, 880, 1175];
    notes.forEach((f, i) => setTimeout(() => am.playTone(f, 150, 0.16), i * 70));
  }

  // ------------------------------------------------------------------
  // Full-screen flash (level-up punch)
  // ------------------------------------------------------------------
  function screenFlash(color) {
    if (reduceMotion) return;
    const root = getLayer();
    const flash = document.createElement('div');
    flash.className = 'screen-flash';
    if (color) flash.style.background = color;
    root.appendChild(flash);
    const anim = flash.animate(
      [{ opacity: 0 }, { opacity: 0.55, offset: 0.2 }, { opacity: 0 }],
      { duration: 650, easing: 'ease-out' }
    );
    anim.onfinish = () => flash.remove();
  }

  // ------------------------------------------------------------------
  // High-level celebration orchestrator
  // ------------------------------------------------------------------
  function completeMessage(name) {
    if (name) {
      return pick(MESSAGES.completeNamed).replace('{n}', name);
    }
    return pick(MESSAGES.complete);
  }

  function celebrate(opts) {
    opts = opts || {};
    xpPopup(opts.xp, document.getElementById('xp-fill'));

    if (opts.leveledUp) {
      confetti(140, { x: window.innerWidth / 2, y: window.innerHeight / 3 });
      screenFlash();
      sparkle(true);
      hype(pick(MESSAGES.levelUp), 'levelup');
    } else {
      confetti(60, { x: window.innerWidth / 2, y: window.innerHeight / 2 });
      sparkle(false);
      hype(completeMessage(opts.name), 'complete');
    }

    // Streak shout-out on milestone days
    if (opts.streak && opts.streak >= 2 && (opts.streak <= 5 || opts.streak % 5 === 0)) {
      setTimeout(() => hype(opts.streak + ' ' + pick(MESSAGES.streak), 'streak'), 1000);
    }
  }

  // ------------------------------------------------------------------
  // Public API
  // ------------------------------------------------------------------
  window.AuraJuice = {
    confetti: confetti,
    xpPopup: xpPopup,
    hype: hype,
    combo: combo,
    animateCount: animateCount,
    celebrate: celebrate,
    screenFlash: screenFlash,
    sparkle: sparkle,
    message: pick,
    MESSAGES: MESSAGES
  };
})();
