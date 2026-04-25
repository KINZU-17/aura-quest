/**
 * AuraQuest - Main Application Logic
 * CSP-compliant, modular architecture
 */

// ============================================
// CONFIGURATION
// ============================================
const STEP_THRESHOLD = 13; // m/s² acceleration threshold for step detection
const RANK_LEVEL_INTERVAL = 5;
const RANKS = ['Recruit', 'Squire', 'Warrior', 'Knight', 'Champion', 'Legend'];

const XP_PER_LEVEL_BASE = 100;
const XP_MULTIPLIER = 1.5;

// ============================================
// DEFAULT USER STATE
// ============================================
const DEFAULT_USER = {
  level: 1,
  xp: 0,
  xpToNext: XP_PER_LEVEL_BASE,
  steps: 0,
  streak: 0,
  lastDate: null,
  history: [],
  rank: RANKS[0]
};

// ============================================
// GLOBAL STATE
// ============================================
let user = null;
let instructor = null;
let currentTimer = null;
let stepDetectionActive = false;
let lastStepTime = 0;

// ============================================
// UTILITY FUNCTIONS
// ============================================
function escapeHTML(str) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(str).replace(/[&<>"']/g, m => map[m]);
}

function getXpWidthClass(percent) {
  const rounded = Math.round(percent);
  return `xp-width-${rounded}`;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function validateStepThreshold(acceleration) {
  if (!acceleration) return false;
  const { x, y, z } = acceleration;
  if (x === null || y === null || z === null) return false;
  const magnitude = Math.sqrt(x * x + y * y + z * z);
  return magnitude > STEP_THRESHOLD;
}

// ============================================
// STATE MANAGEMENT
// ============================================
function loadUser() {
  const session = localStorage.getItem('activeSession');
  if (!session) return { ...DEFAULT_USER, rank: RANKS[0] };

  try {
    const username = JSON.parse(session).username;
    const key = `auraQuest_${username}`;
    const saved = localStorage.getItem(key);

    if (!saved) {
      const fresh = { ...DEFAULT_USER };
      fresh.rank = RANKS[Math.min(Math.floor(fresh.level / RANK_LEVEL_INTERVAL), RANKS.length - 1)];
      return fresh;
    }

    const parsed = JSON.parse(saved);
    const u = {
      ...DEFAULT_USER,
      level: parseInt(parsed.level) || DEFAULT_USER.level,
      xp: parseInt(parsed.xp) || DEFAULT_USER.xp,
      xpToNext: parseInt(parsed.xpToNext) || DEFAULT_USER.xpToNext,
      steps: parseInt(parsed.steps) || DEFAULT_USER.steps,
      streak: parseInt(parsed.streak) || DEFAULT_USER.streak,
      lastDate: parsed.lastDate || null,
      history: Array.isArray(parsed.history) ? parsed.history : [],
    };
    u.rank = RANKS[Math.min(Math.floor(u.level / RANK_LEVEL_INTERVAL), RANKS.length - 1)];
    return u;
  } catch (e) {
    console.warn('Failed to parse user data:', e);
    return { ...DEFAULT_USER, rank: RANKS[0] };
  }
}

function saveUser() {
  if (!user) return false;
  const session = localStorage.getItem('activeSession');
  if (!session) return false;

  try {
    const username = JSON.parse(session).username;
    const key = `auraQuest_${username}`;
    localStorage.setItem(key, JSON.stringify(user));
    return true;
  } catch (e) {
    if (e.name === 'QuotaExceededError') return false;
    throw e;
  }
}

function updateStreak() {
  if (!user) return;
  const now = Date.now();
  const today = new Date(now).toDateString();
  const yesterday = new Date(now - 86400000).toDateString();

  if (user.lastDate === today) return;

  if (user.lastDate === yesterday) {
    user.streak++;
  } else {
    user.streak = 1;
  }
  user.lastDate = today;
}

function updateRank() {
  if (!user) return;
  const rankIndex = Math.min(Math.floor(user.level / RANK_LEVEL_INTERVAL), RANKS.length - 1);
  user.rank = RANKS[rankIndex];
}

function checkLevelUp() {
  if (!user) return;
  while (user.xp >= user.xpToNext) {
    user.level++;
    user.xp -= user.xpToNext;
    user.xpToNext = Math.floor(user.xpToNext * XP_MULTIPLIER);
    updateRank();
  }
}

function calculateXpPercent() {
  if (!user) return 0;
  return user.xpToNext > 0 ? Math.min((user.xp / user.xpToNext) * 100, 100) : 0;
}

function completeActivity(name, xpGained) {
  if (!user) return;

  user.xp += xpGained;
  user.history.unshift({
    name,
    xp: xpGained,
    time: new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
  });

  if (user.history.length > 5) user.history.pop();

  checkLevelUp();
  updateStreak();
  saveUser();
  updateUI();

  // Update achievements
  if (typeof updateAchievements !== 'undefined' && typeof loadAchievements !== 'undefined') {
    let achievements = loadAchievements();
    const wasUnlocked = updateAchievements(achievements, user);
    if (wasUnlocked) {
      Object.values(achievements).forEach(ach => {
        if (ach.unlocked && !ach.shown) {
          showAchievementUnlocked(ach);
          ach.shown = true;
        }
      });
      saveAchievements(achievements);
    }
    if (typeof renderStatsPanel !== 'undefined') {
      renderStatsPanel(user, achievements);
    }
  }
}

function resetUser() {
  if (!user) return;
  user = { ...DEFAULT_USER, rank: RANKS[0] };
  updateRank();
  saveUser();
  updateUI();
  hideInstructions();
}

// ============================================
// UI UPDATES
// ============================================
function updateUI() {
  if (!user) return;

  const levelEl = document.getElementById('level');
  const rankEl = document.getElementById('player-rank');
  const streakEl = document.getElementById('streak-count');
  const xpFillEl = document.getElementById('xp-fill');
  const currentXpEl = document.getElementById('current-xp');
  const nextLevelXpEl = document.getElementById('next-level-xp');

  if (levelEl) levelEl.textContent = user.level;
  if (rankEl) rankEl.textContent = user.rank;
  if (streakEl) streakEl.textContent = user.streak;

  if (xpFillEl) {
    const percent = calculateXpPercent();
    xpFillEl.className = 'xp-bar-fill ' + getXpWidthClass(percent);
  }
  if (currentXpEl) currentXpEl.textContent = Math.floor(user.xp);
  if (nextLevelXpEl) nextLevelXpEl.textContent = user.xpToNext;

  const stepCountEl = document.getElementById('step-count');
  if (stepCountEl) stepCountEl.textContent = user.steps.toLocaleString();

  renderHistory();
}

function renderWorkouts() {
  const container = document.getElementById('workout-list');
  if (!container || typeof workoutData === 'undefined') return;

  container.innerHTML = '';

  workoutData.forEach(workout => {
    const card = document.createElement('div');
    card.className = 'workout-card';
    card.dataset.id = workout.id;

    const typeClass = workout.type || 'general';
    card.classList.add(typeClass);

    const stars = '★'.repeat(workout.difficulty) + '☆'.repeat(5 - workout.difficulty);

    card.innerHTML = `
      <div class="workout-header">
        <span class="muscle-tag ${workout.type}">${escapeHTML(workout.muscle)}</span>
        <span class="difficulty">${stars}</span>
      </div>
      <h3 class="workout-name">${escapeHTML(workout.name)}</h3>
      <div class="workout-meta">
        <span class="xp-reward">+${workout.xp} XP</span>
        <span class="goal-display">${escapeHTML(workout.isTimed ? workout.duration + 's' : workout.goal)}</span>
      </div>
    `;

    card.addEventListener('click', () => startWorkout(workout));
    container.appendChild(card);
  });
}

function renderHistory() {
  const container = document.getElementById('history-list');
  if (!container) return;

  container.innerHTML = '';

  if (user.history.length === 0) {
    container.innerHTML = '<div class="history-empty">Complete quests to see your glory here</div>';
    return;
  }

  user.history.forEach(entry => {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.innerHTML = `
      <span class="history-name">${escapeHTML(entry.name)}</span>
      <span class="history-xp">+${entry.xp} XP</span>
      <span class="history-time">${escapeHTML(entry.time)}</span>
    `;
    container.appendChild(item);
  });
}

function displayWelcomeUser() {
  const db = document.querySelector('.dashboard');
  const existingBanner = document.querySelector('.welcome-banner');
  const existingPrompt = document.querySelector('.login-prompt');

  if (existingBanner) existingBanner.remove();
  if (existingPrompt) existingPrompt.remove();

  if (!db || !db.firstChild) return;

  const session = localStorage.getItem('activeSession');
  if (!session) {
    const div = document.createElement('div');
    div.className = 'login-prompt';
    div.innerHTML = '<span>⚔️ Start your quest! <a href="login.html">Sign in</a> to save progress.</span>';
    db.insertBefore(div, db.firstChild);
    return;
  }

  try {
    const { username } = JSON.parse(session);
    if (username) {
      const div = document.createElement('div');
      div.className = 'welcome-banner';
      div.innerHTML = `
        <div class="welcome-text">
          <span>👋 Welcome back, ${escapeHTML(username)}!</span>
          <div class="level-display">Level ${user.level}</div>
          <span class="rank-display">${user.rank}</span>
        </div>
        <a href="login.html" class="switch-account">Switch Account</a>
      `;
      db.insertBefore(div, db.firstChild);
    }
  } catch (e) {
    console.warn('Session parse failed:', e);
    localStorage.removeItem('activeSession');
  }
}

// ============================================
// WORKOUT FLOW
// ============================================
function startWorkout(workout) {
  if (typeof instructor !== 'undefined' && instructor) {
    instructor.speakWorkoutStart(workout);
  }

  if (workout.isTimed) {
    startTimer(workout);
  } else {
    openInstructions(workout);
  }
}

function startTimer(workout) {
  const modal = document.getElementById('timer-modal');
  const nameEl = document.getElementById('timer-name');
  const countdownEl = document.getElementById('countdown-display');
  if (!modal || !nameEl || !countdownEl) return;

  nameEl.textContent = workout.name;
  modal.classList.remove('hidden');

  let remaining = workout.duration;
  countdownEl.textContent = formatTime(remaining);

  const xpFill = document.getElementById('xp-fill');
  if (xpFill) {
    xpFill.className = 'xp-bar-fill ' + getXpWidthClass(calculateXpPercent());
  }

  currentTimer = {
    interval: setInterval(() => {
      remaining--;
      countdownEl.textContent = formatTime(remaining);
      if (typeof instructor !== 'undefined' && instructor && instructor.speakCountdown) {
        instructor.speakCountdown(remaining);
      }

      if (remaining <= 0) {
        clearInterval(currentTimer.interval);
        completeWorkout(workout);
      }
    }, 1000)
  };

  const quitBtn = document.getElementById('quit-btn');
  if (quitBtn) {
    quitBtn.removeEventListener('click', quitHandler);
    quitBtn.addEventListener('click', quitHandler);
  }

  function quitHandler() {
    clearInterval(currentTimer.interval);
    modal.classList.add('hidden');
    if (typeof instructor !== 'undefined' && instructor) {
      instructor.speak('Workout abandoned.');
    }
  }
}

function completeWorkout(workout) {
  const modal = document.getElementById('timer-modal');
  if (modal) modal.classList.add('hidden');

  completeActivity(workout.name, workout.xp);
  if (typeof instructor !== 'undefined' && instructor) {
    instructor.speakWorkoutComplete(workout);
  }

  if (typeof instructor !== 'undefined' && instructor) {
    instructor.speakLevelUp(user.level);
  }
}

// ============================================
// INSTRUCTIONS PANEL
// ============================================
function getInstructionsPanel() {
  let panel = document.getElementById('instructions-panel');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'instructions-panel';
    panel.className = 'modal-overlay hidden';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.innerHTML = `
      <div class="modal-content">
        <button class="modal-close" id="close-instructions" aria-label="Close">&times;</button>
        <h3 class="instructions-title"></h3>
        <div class="instructions-steps"></div>
        <p class="instructions-tips"></p>
        <button class="begin-btn modal-btn">BEGIN WORKOUT</button>
      </div>
    `;
    document.body.appendChild(panel);

    const closeBtn = document.getElementById('close-instructions');
    if (closeBtn) {
      closeBtn.addEventListener('click', hideInstructions);
    }

    panel.addEventListener('click', (e) => {
      if (e.target === panel) hideInstructions();
    });
  }
  return panel;
}

function openInstructions(workout) {
  const panel = getInstructionsPanel();
  if (!panel) return;

  const titleEl = panel.querySelector('.instructions-title');
  const stepsEl = panel.querySelector('.instructions-steps');
  const tipsEl = panel.querySelector('.instructions-tips');
  const beginBtn = panel.querySelector('.begin-btn');

  if (titleEl) titleEl.textContent = workout.name;
  if (stepsEl) {
    stepsEl.innerHTML = workout.instructions.map(step =>
      `<div class="step-item"><span class="step-number"></span>${escapeHTML(step)}</div>`
    ).join('');
  }
  if (tipsEl) tipsEl.textContent = workout.tips || '';

  if (beginBtn) {
    beginBtn.removeEventListener('click', beginHandler);
    beginBtn.addEventListener('click', beginHandler);
  }

  panel.classList.remove('hidden');
  panel.classList.add('open');

  function beginHandler() {
    hideInstructions();
    startRepBasedWorkout(workout);
  }
}

function hideInstructions() {
  const panel = document.getElementById('instructions-panel');
  if (panel) {
    panel.classList.remove('open');
    panel.classList.add('hidden');
  }
}

function startRepBasedWorkout(workout) {
  if (typeof instructor !== 'undefined' && instructor && instructor.speak) {
    instructor.speak(`Start ${workout.name}. ${workout.instructions ? workout.instructions[0] : 'Focus on form.'}`);
  }
  completeActivity(workout.name, workout.xp);
}

// ============================================
// PEDOMETER
// ============================================
function initPedometer() {
  if (!window.DeviceMotionEvent) {
    updateStepStatus('Sensors not available');
    return;
  }

  const stepSection = document.getElementById('step-section');
  if (!stepSection) return;

  stepSection.addEventListener('click', toggleStepDetection);
  stepSection.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleStepDetection();
    }
  });

  updateStepStatus('Tap to Activate Sensors');
}

function toggleStepDetection() {
  if (stepDetectionActive) return;

  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission()
      .then(response => {
        if (response === 'granted') {
          startStepDetection();
        } else {
          updateStepStatus('Permission denied');
        }
      })
      .catch(err => {
        console.error('Step detection error:', err);
        updateStepStatus('Error');
      });
  } else {
    startStepDetection();
  }
}

function startStepDetection() {
  stepDetectionActive = true;
  updateStepStatus('Sensors Active');
  window.addEventListener('devicemotion', handleMotion);
}

function handleMotion(event) {
  const acceleration = event.accelerationIncludingGravity;
  if (!acceleration) return;

  const { x, y, z } = acceleration;
  if (x === null || y === null || z === null) return;

  if (!validateStepThreshold({ x, y, z })) return;

  const now = Date.now();
  if (now - lastStepTime < 300) return;
  lastStepTime = now;

  user.steps++;
  saveUser();
  updateUI();
}

function updateStepStatus(message) {
  const statusEl = document.getElementById('step-status');
  if (statusEl) statusEl.textContent = message;
}

// ============================================
// INSTRUCTOR UI
// ============================================
function initInstructorUI() {
  if (!instructor || typeof AudioInstructor === 'undefined') return;

  instructor.updateUI = function() {
    const btn = document.getElementById('instructor-btn');
    const status = document.getElementById('instructor-status');
    if (btn) {
      btn.textContent = this.enabled ? '🔊 ON' : '🔇 OFF';
      btn.classList.toggle('active', this.enabled);
    }
    if (status) {
      status.textContent = this.enabled ? `(voice: ${this.selectedVoiceType})` : '(inactive)';
    }
  };

  instructor.updateUI();

  const btn = document.getElementById('instructor-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      const enabled = instructor.toggle();
      const vt = document.getElementById('voice-type');
      if (vt) vt.disabled = !enabled;
    });
  }

  const voiceSelect = document.getElementById('voice-type');
  if (voiceSelect) {
    voiceSelect.value = instructor.selectedVoiceType;
    voiceSelect.addEventListener('change', () => {
      instructor.setVoiceType(voiceSelect.value);
    });
  }

  const volumeSlider = document.getElementById('voice-volume');
  const volumeVal = document.getElementById('volume-val');
  if (volumeSlider) {
    volumeSlider.value = instructor.volume;
    volumeSlider.addEventListener('input', () => {
      instructor.setVolume(parseFloat(volumeSlider.value));
      if (volumeVal) volumeVal.textContent = Math.round(instructor.volume * 100) + '%';
    });
  }

  const rateSlider = document.getElementById('voice-rate');
  const rateVal = document.getElementById('rate-val');
  if (rateSlider) {
    rateSlider.value = instructor.rate;
    rateSlider.addEventListener('input', () => {
      instructor.setRate(parseFloat(rateSlider.value));
      if (rateVal) rateVal.textContent = instructor.rate.toFixed(1) + 'x';
    });
  }

  const ttsSupportEl = document.getElementById('tts-support');
  if (ttsSupportEl) {
    ttsSupportEl.textContent = instructor.supported ? '✓ Supported' : '✗ Not supported';
  }
}

// ============================================
// SESSION & NAVIGATION
// ============================================
function checkSession() {
  const session = localStorage.getItem('activeSession');
  if (!session) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

function setupLogout() {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('activeSession');
      window.location.href = 'login.html';
    });
  }
}

// ============================================
// INITIALIZATION
// ============================================
function init() {
  if (!checkSession()) return;

  // Initialize features first
  if (typeof initializeFeatures !== 'undefined') {
    initializeFeatures();
  }

  user = loadUser();
  displayWelcomeUser();
  updateUI();
  renderWorkouts();
  setupLogout();
  initPedometer();

  // Load and display achievements/stats
  if (typeof loadAchievements !== 'undefined' && typeof renderStatsPanel !== 'undefined') {
    const achievements = loadAchievements();
    renderStatsPanel(user, achievements);
  }

  if (typeof AudioInstructor !== 'undefined') {
    instructor = new AudioInstructor();
    initInstructorUI();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
