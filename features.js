/**
 * AURAQUEST - Enhanced Features Module
 * Handles achievements, daily challenges, sound effects, and animations
 */

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
    if (!this.enabled || !this.audioContext) return;

    try {
      this.initialize();
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
  window.initializeFeatures = initializeFeatures;
}
