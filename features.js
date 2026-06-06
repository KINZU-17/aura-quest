/**
 * AURAQUEST - Enhanced Features Module
 * Handles achievements, daily challenges, sound effects, animations, and progress charts
 */

// Global chart instance
let xpProgressChart = null;

// ============================================
// ACHIEVEMENT SYSTEM
// ============================================
const achievementDefinitions = {
  first_workout: {
    id: "first_workout",
    name: "Novice",
    description: "Complete your first workout",
    icon: "🥋",
    progress: 0,
    target: 1
  },
  ten_workouts: {
    id: "ten_workouts",
    name: "Persistent",
    description: "Complete 10 workouts",
    icon: "💪",
    progress: 0,
    target: 10
  },
  fifty_workouts: {
    id: "fifty_workouts",
    name: "Warrior",
    description: "Complete 50 workouts",
    icon: "⚔️",
    progress: 0,
    target: 50
  },
  hundred_workouts: {
    id: "hundred_workouts",
    name: "Legend",
    description: "Complete 100 workouts",
    icon: "👑",
    progress: 0,
    target: 100
  },
  seven_day_streak: {
    id: "seven_day_streak",
    name: "On Fire",
    description: "Maintain a 7-day streak",
    icon: "🔥",
    progress: 0,
    target: 7
  },
  thirty_day_streak: {
    id: "thirty_day_streak",
    name: "Unstoppable",
    description: "Maintain a 30-day streak",
    icon: "⚡",
    progress: 0,
    target: 30
  },
  level_ten: {
    id: "level_ten",
    name: "Ascended",
    description: "Reach level 10",
    icon: "⭐",
    progress: 0,
    target: 10
  },
  thousand_steps: {
    id: "thousand_steps",
    name: "Wanderer",
    description: "Walk 1,000 steps",
    icon: "🚶",
    progress: 0,
    target: 1000
  },
  perfect_week: {
    id: "perfect_week",
    name: "Disciplined",
    description: "Complete daily challenge all week",
    icon: "✅",
    progress: 0,
    target: 7
  }
};

// ============================================
// DAILY CHALLENGES
// ============================================
function getDailyChallenge() {
  const challenges = [
    {
      id: "chest_day",
      title: "Chest Day",
      description: "Complete all chest exercises",
      exercises: [1, 2, 3, 5],
      bonusXp: 100,
      icon: "💪"
    },
    {
      id: "leg_destroyer",
      title: "Leg Destroyer",
      description: "Complete all leg exercises",
      exercises: [11, 12, 13, 15, 16],
      bonusXp: 150,
      icon: "🦵"
    },
    {
      id: "core_master",
      title: "Core Master",
      description: "Build an iron core",
      exercises: [17, 18, 19, 20, 21, 22, 23, 24],
      bonusXp: 120,
      icon: "🔥"
    },
    {
      id: "cardio_blast",
      title: "Cardio Blast",
      description: "Get your heart pumping",
      exercises: [25, 26, 27],
      bonusXp: 100,
      icon: "❤️"
    },
    {
      id: "full_body",
      title: "Full Body Quest",
      description: "Complete a full-body session",
      exercises: [1, 12, 17, 25, 11],
      bonusXp: 130,
      icon: "⚔️"
    }
  ];

  const today = new Date().toDateString();
  const seed = today.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const index = seed % challenges.length;
  return challenges[index];
}

// ============================================
// SOUND EFFECTS & AUDIO FEEDBACK
// ============================================
class AudioManager {
  constructor() {
    this.enabled = localStorage.getItem('auraQuest_audioEnabled') !== 'false';
    this.audioContext = null;
    this.initialized = false;
  }

  initialize() {
    if (this.initialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioContext = new AudioContext();
        this.initialized = true;
      }
    } catch (e) {
      console.warn('AudioContext not supported');
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('auraQuest_audioEnabled', this.enabled);
    return this.enabled;
  }

  playTone(frequency = 600, duration = 100, volume = 0.3) {
    if (!this.enabled) return;
    this.initialize();
    if (!this.audioContext) return;

    try {
      // Resume if the context was suspended (autoplay policy)
      if (this.audioContext.state === 'suspended') this.audioContext.resume();
      const now = this.audioContext.currentTime;
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.frequency.value = frequency;
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + duration / 1000);

      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      osc.start(now);
      osc.stop(now + duration / 1000);
    } catch (e) {
      console.warn('Tone playback failed:', e);
    }
  }

  levelUp() {
    // Ascending tones
    this.playTone(600, 100, 0.2);
    setTimeout(() => this.playTone(800, 100, 0.2), 100);
    setTimeout(() => this.playTone(1000, 200, 0.2), 200);
  }

  success() {
    this.playTone(800, 100, 0.2);
    setTimeout(() => this.playTone(1000, 150, 0.2), 100);
  }

  tick() {
    this.playTone(1200, 50, 0.15);
  }

  achievement() {
    // Fanfare-like sequence
    this.playTone(800, 150, 0.2);
    setTimeout(() => this.playTone(1000, 150, 0.2), 150);
    setTimeout(() => this.playTone(1200, 300, 0.2), 300);
  }
}

// ============================================
// ANIMATION TRIGGERS
// ============================================
function showLevelUpAnimation(newLevel) {
  const levelCircle = document.querySelector('.level-indicator');
  if (!levelCircle) return;

  // Flash the level circle
  levelCircle.style.animation = 'none';
  setTimeout(() => {
    levelCircle.style.animation = 'levelUpFlash 0.6s ease-out';
  }, 10);

  // Play sound
  const audioManager = window.audioManager || new AudioManager();
  audioManager.levelUp();

  // Show notification
  showNotification(`⭐ LEVEL UP! ${newLevel}`, 'success');
}

function showAchievementUnlocked(achievement) {
  const container = document.body;
  const badge = document.createElement('div');
  badge.className = 'achievement-notification';
  badge.innerHTML = `
    <div class="achievement-popup">
      <div class="achievement-icon">${achievement.icon}</div>
      <div class="achievement-name">${achievement.name}</div>
      <div class="achievement-desc">${achievement.description}</div>
    </div>
  `;

  container.appendChild(badge);

  // Play fanfare
  const audioManager = window.audioManager || new AudioManager();
  audioManager.achievement();

  // Remove after animation
  setTimeout(() => badge.remove(), 3000);
}

function showNotification(text, type = 'info') {
  const container = document.querySelector('.dashboard') || document.body;
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = text;

  container.appendChild(notification);

  // Fade out and remove
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// ============================================
// ACHIEVEMENT TRACKING
// ============================================
function loadAchievements() {
  const session = localStorage.getItem('activeSession');
  if (!session) return { ...achievementDefinitions };

  try {
    const username = JSON.parse(session).username;
    const key = `auraQuest_achievements_${username}`;
    const saved = localStorage.getItem(key);

    if (!saved) {
      return { ...achievementDefinitions };
    }

    const parsed = JSON.parse(saved);
    return { ...achievementDefinitions, ...parsed };
  } catch (e) {
    console.warn('Failed to load achievements:', e);
    return { ...achievementDefinitions };
  }
}

function saveAchievements(achievements) {
  const session = localStorage.getItem('activeSession');
  if (!session) return;

  try {
    const username = JSON.parse(session).username;
    const key = `auraQuest_achievements_${username}`;
    localStorage.setItem(key, JSON.stringify(achievements));
  } catch (e) {
    console.warn('Failed to save achievements:', e);
  }
}

function updateAchievements(achievements, user) {
  let unlocked = false;

  // Check first workout
  if (user.history.length === 1 && !achievements.first_workout.unlocked) {
    achievements.first_workout.progress = 1;
    achievements.first_workout.unlocked = true;
    unlocked = true;
  }

  // Check workout count
  const workoutCount = user.history.length;
  if (workoutCount >= 10 && achievements.ten_workouts.progress < 10) {
    achievements.ten_workouts.progress = 10;
    achievements.ten_workouts.unlocked = true;
    unlocked = true;
  }
  if (workoutCount >= 50 && achievements.fifty_workouts.progress < 50) {
    achievements.fifty_workouts.progress = 50;
    achievements.fifty_workouts.unlocked = true;
    unlocked = true;
  }
  if (workoutCount >= 100 && achievements.hundred_workouts.progress < 100) {
    achievements.hundred_workouts.progress = 100;
    achievements.hundred_workouts.unlocked = true;
    unlocked = true;
  }

  // Check streak
  if (user.streak >= 7 && achievements.seven_day_streak.progress < 7) {
    achievements.seven_day_streak.progress = 7;
    achievements.seven_day_streak.unlocked = true;
    unlocked = true;
  }
  if (user.streak >= 30 && achievements.thirty_day_streak.progress < 30) {
    achievements.thirty_day_streak.progress = 30;
    achievements.thirty_day_streak.unlocked = true;
    unlocked = true;
  }

  // Check level
  if (user.level >= 10 && achievements.level_ten.progress < 10) {
    achievements.level_ten.progress = 10;
    achievements.level_ten.unlocked = true;
    unlocked = true;
  }

  // Check steps
  if (user.steps >= 1000 && achievements.thousand_steps.progress < 1000) {
    achievements.thousand_steps.progress = 1000;
    achievements.thousand_steps.unlocked = true;
    unlocked = true;
  }

  if (unlocked) {
    saveAchievements(achievements);
  }

  return unlocked;
}

// ============================================
// STATS DASHBOARD
// ============================================
function renderStatsPanel(user, achievements) {
  let panel = document.getElementById('stats-panel');
  
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'stats-panel';
    panel.className = 'stats-grid';
    const dashboard = document.querySelector('.dashboard');
    const historySection = document.querySelector('.section-title');
    if (dashboard && historySection) {
      dashboard.insertBefore(panel, historySection);
    }
  }

  const unlockedCount = Object.values(achievements).filter(a => a.unlocked).length;
  const totalAchievements = Object.keys(achievements).length;

  panel.innerHTML = `
    <div class="stat-card">
      <div class="stat-label">Total Workouts</div>
      <div class="stat-value">${user.history.length}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Current Streak</div>
      <div class="stat-value">${user.streak}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Achievements</div>
      <div class="stat-value">${unlockedCount}/${totalAchievements}</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Total Steps</div>
      <div class="stat-value">${user.steps.toLocaleString()}</div>
    </div>
  `;
}

// ============================================
// PROGRESS CHART
// ============================================
function renderProgressChart(user) {
  if (!user) return;

  // Prepare data
  const history = user.history.slice().reverse(); // oldest first
  if (history.length === 0) {
    // Show empty state
    let container = document.getElementById('progress-chart-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'progress-chart-container';
      container.className = 'chart-container';
      const statsPanel = document.getElementById('stats-panel');
      if (statsPanel && statsPanel.parentNode) {
        statsPanel.parentNode.insertBefore(container, statsPanel.nextSibling);
      } else {
        const dashboard = document.querySelector('.dashboard');
        if (dashboard) dashboard.appendChild(container);
      }
    }
    container.innerHTML = '<p class="chart-error">Complete workouts to see your progress chart.</p>';
    // Destroy chart if exists
    if (xpProgressChart) {
      xpProgressChart.destroy();
      xpProgressChart = null;
    }
    return;
  }

  // Find or create container
  let container = document.getElementById('progress-chart-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'progress-chart-container';
    container.className = 'chart-container';
    const statsPanel = document.getElementById('stats-panel');
    if (statsPanel && statsPanel.parentNode) {
      statsPanel.parentNode.insertBefore(container, statsPanel.nextSibling);
    } else {
      const dashboard = document.querySelector('.dashboard');
      if (dashboard) dashboard.appendChild(container);
    }
  }

  // Clear previous canvas
  container.innerHTML = '';

  // Create canvas element
  const canvas = document.createElement('canvas');
  canvas.id = 'xp-progress-chart';
  container.appendChild(canvas);

  // Check if Chart.js is loaded
  if (typeof Chart === 'undefined') {
    const msg = document.createElement('p');
    msg.className = 'chart-error';
    msg.textContent = 'Chart library not loaded.';
    container.appendChild(msg);
    return;
  }

  // Destroy existing chart instance
  if (xpProgressChart) {
    xpProgressChart.destroy();
    xpProgressChart = null;
  }

  const labels = history.map((h, idx) => h.time || `#${idx + 1}`);
  const dataPoints = history.map(h => h.xp);

  // Theme-aware colors
  const style = getComputedStyle(document.documentElement);
  const accentColor = style.getPropertyValue('--accent-cyan').trim() || '#00f2fe';
  const bgColor = 'rgba(0, 242, 254, 0.1)';
  const theme = document.documentElement.getAttribute('data-theme') || 'dark';
  const isLight = theme === 'light';
  const gridColor = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';
  const tickColor = isLight ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)';

  const ctx = canvas.getContext('2d');
  xpProgressChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'XP Earned',
        data: dataPoints,
        borderColor: accentColor,
        backgroundColor: bgColor,
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: accentColor
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, labels: { color: tickColor } }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: gridColor },
          ticks: { color: tickColor }
        },
        x: {
          grid: { color: gridColor },
          ticks: { color: tickColor }
        }
      }
    }
  });
}

// ============================================
// LEADERBOARD SYSTEM
// ============================================
function gatherAllUsersStats() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const leaderboardData = [];

  users.forEach(u => {
    const key = `auraQuest_${u.username}`;
    const data = localStorage.getItem(key);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        leaderboardData.push({
          username: u.username,
          level: parsed.level || 1,
          xp: parsed.xp || 0,
          workouts: parsed.history ? parsed.history.length : 0,
          streak: parsed.streak || 0,
          steps: parsed.steps || 0
        });
      } catch (e) {
        console.warn('Failed to parse user data for', u.username);
      }
    }
  });

  return leaderboardData;
}

function renderLeaderboard() {
  const data = gatherAllUsersStats();
  if (!data || data.length === 0) {
    const container = document.getElementById('leaderboard-list');
    if (container) container.innerHTML = '<div class="leaderboard-empty">No users registered yet.</div>';
    return;
  }

  // Sort by level DESC, then XP DESC
  data.sort((a, b) => b.level - a.level || b.xp - a.xp);

  const container = document.getElementById('leaderboard-list');
  if (!container) return;
  container.innerHTML = '';

  const session = localStorage.getItem('activeSession');
  let currentUsername = '';
  if (session) {
    try { currentUsername = JSON.parse(session).username; } catch(e) {}
  }

  data.forEach((entry, index) => {
    const rank = index + 1;
    const isCurrent = entry.username === currentUsername;
    const div = document.createElement('div');
    div.className = 'leaderboard-entry' + (isCurrent ? ' highlight' : '');
    div.innerHTML = `
      <div class="leaderboard-rank">#${rank}</div>
      <div class="leaderboard-name">${escapeHTML(entry.username)}</div>
      <div class="leaderboard-stats">
        <div class="leaderboard-stat">
          <span class="leaderboard-stat-value">${entry.level}</span>
          <span class="leaderboard-stat-label">Lvl</span>
        </div>
        <div class="leaderboard-stat">
          <span class="leaderboard-stat-value">${entry.workouts}</span>
          <span class="leaderboard-stat-label">Wkt</span>
        </div>
        <div class="leaderboard-stat">
          <span class="leaderboard-stat-value">${entry.streak}</span>
          <span class="leaderboard-stat-label">Str</span>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

// ============================================
// INITIALIZE FEATURES
// ============================================
function initializeFeatures() {
  // Initialize audio manager
  if (!window.audioManager) {
    window.audioManager = new AudioManager();
  }

  // Add CSS for notifications if not present
  if (!document.getElementById('features-css')) {
    const style = document.createElement('style');
    style.id = 'features-css';
    style.textContent = `
      .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 16px 20px;
        border-radius: 8px;
        z-index: 999;
        animation: slideInRight 0.4s ease, fadeOut 0.4s ease 2.6s;
        font-weight: 600;
      }

      .notification-success {
        background: linear-gradient(135deg, #4ade80, #22c55e);
        color: white;
      }

      .notification-info {
        background: linear-gradient(135deg, #00f2fe, #0ea5e9);
        color: #050505;
      }

      .notification-warning {
        background: linear-gradient(135deg, #fbbf24, #f59e0b);
        color: #050505;
      }

      @keyframes fadeOut {
        0% { opacity: 1; }
        100% { opacity: 0; }
      }

      .achievement-notification {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2000;
      }

      .achievement-popup {
        background: linear-gradient(135deg, #7000ff, #00f2fe);
        border: 2px solid #00f2fe;
        border-radius: 16px;
        padding: 32px;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 242, 254, 0.4);
        animation: slideUp 0.4s ease;
        color: white;
      }

      .achievement-icon {
        font-size: 3rem;
        margin-bottom: 12px;
      }

      .achievement-name {
        font-family: 'Orbitron', monospace;
        font-size: 1.4rem;
        font-weight: 700;
        margin-bottom: 8px;
        letter-spacing: 1px;
      }

      .achievement-desc {
        font-size: 0.9rem;
        opacity: 0.9;
      }
    `;
    document.head.appendChild(style);
  }
}

// Export
if (typeof window !== 'undefined') {
  window.achievementDefinitions = achievementDefinitions;
  window.AudioManager = AudioManager;
  window.getDailyChallenge = getDailyChallenge;
  window.showLevelUpAnimation = showLevelUpAnimation;
  window.showAchievementUnlocked = showAchievementUnlocked;
  window.showNotification = showNotification;
  window.loadAchievements = loadAchievements;
  window.saveAchievements = saveAchievements;
  window.updateAchievements = updateAchievements;
  window.renderStatsPanel = renderStatsPanel;
  window.renderProgressChart = renderProgressChart;
  window.gatherAllUsersStats = gatherAllUsersStats;
  window.renderLeaderboard = renderLeaderboard;
  window.initializeFeatures = initializeFeatures;
}
