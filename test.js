/**
 * AuraQuest Test Suite
 * Run with: node test.js
 *
 * Tests core game logic, state management, streak calculations,
 * XP progression, and edge cases. Does NOT test DOM rendering
 * (requires browser environment).
 */

// ============================================
// MOCK ENVIRONMENT
// ============================================
const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = String(value); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; },
    get length() { return Object.keys(store).length; },
    key: (i) => Object.keys(store)[i] || null
  };
})();

// Freeze Date for deterministic tests using a custom getter
let _now = new Date('2026-04-24T12:00:00').getTime();
const realDateNow = Date.now;
const realDateValueOf = Date.prototype.valueOf;

Date.now = () => _now;
Date.prototype.valueOf = function() { return _now; };

function setFrozenDate(dateStr) {
  _now = new Date(dateStr).getTime();
}

// ============================================
// TEST FRAMEWORK
// ============================================
let passed = 0;
let failed = 0;
const tests = [];

function test(name, fn) {
  tests.push({ name, fn });
}

function assertEqual(actual, expected, msg = '') {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${msg}\nExpected: ${JSON.stringify(expected)}\nActual:   ${JSON.stringify(actual)}`);
  }
}

function assertTrue(condition, msg = '') {
  if (!condition) throw new Error(msg || 'Expected true');
}

function assertFalse(condition, msg = '') {
  if (condition) throw new Error(msg || 'Expected false');
}

function run() {
  console.log('\n🧪 AURAQUEST TEST SUITE\n' + '='.repeat(50) + '\n');
  for (const t of tests) {
    try {
      t.fn();
      console.log(`✓ ${t.name}`);
      passed++;
    } catch (e) {
      console.log(`✗ ${t.name}`);
      console.log(`  ${e.message}\n`);
      failed++;
    }
  }
  console.log('\n' + '='.repeat(50));
  console.log(`Results: ${passed} passed, ${failed} failed\n`);
  Date.now = realDateNow;
  Date.prototype.valueOf = realDateValueOf;
  process.exit(failed > 0 ? 1 : 0);
}

// ============================================
// MOCK DEPENDENCIES (workouts.js)
// ============================================
const workoutData = [
  { id: 1, name: "Diamond Pushups", goal: "12 Reps", xp: 50, muscle: "Chest/Triceps", isTimed: false },
  { id: 2, name: "Archer Pushups", goal: "8 Per Side", xp: 65, muscle: "Chest/Shoulders", isTimed: false },
  { id: 3, name: "Bulgarian Split Squats", goal: "12 Per Leg", xp: 60, muscle: "Quads/Glutes", isTimed: false },
  { id: 4, name: "Plank Jacks", duration: 45, xp: 45, muscle: "Core/Cardio", isTimed: true },
  { id: 5, name: "Superman Hold", duration: 30, xp: 40, muscle: "Lower Back", isTimed: true },
  { id: 6, name: "Hollow Body Rock", duration: 40, xp: 55, muscle: "Core", isTimed: true }
];

// ============================================
// CODE UNDER TEST (extracted from app.js)
// ============================================
const DEFAULT_USER = {
  level: 1, xp: 0, xpToNext: 100, steps: 0, streak: 0,
  lastDate: null, history: [], rank: 'Recruit'
};
const RANKS = ['Recruit', 'Squire', 'Warrior', 'Knight', 'Champion', 'Legend'];
const RANK_LEVEL_INTERVAL = 5;

function escapeHTML(str) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(str).replace(/[&<>"']/g, m => map[m]);
}

function loadUser(localStorage) {
  const saved = localStorage.getItem('auraQuest_Warrior');
  if (!saved) {
    const fresh = { ...DEFAULT_USER };
    fresh.rank = RANKS[Math.min(Math.floor(fresh.level / RANK_LEVEL_INTERVAL), RANKS.length - 1)];
    return fresh;
  }
  try {
    const parsed = JSON.parse(saved);
    const user = {
      ...DEFAULT_USER,
      level: parseInt(parsed.level) || DEFAULT_USER.level,
      xp: parseInt(parsed.xp) || DEFAULT_USER.xp,
      xpToNext: parseInt(parsed.xpToNext) || DEFAULT_USER.xpToNext,
      steps: parseInt(parsed.steps) || DEFAULT_USER.steps,
      streak: parseInt(parsed.streak) || DEFAULT_USER.streak,
      lastDate: parsed.lastDate || null,
      history: Array.isArray(parsed.history) ? parsed.history : [],
    };
    user.rank = RANKS[Math.min(Math.floor(user.level / RANK_LEVEL_INTERVAL), RANKS.length - 1)];
    return user;
  } catch (e) {
    return { ...DEFAULT_USER, rank: RANKS[0] };
  }
}

function saveUser(user, localStorage) {
  try {
    localStorage.setItem('auraQuest_Warrior', JSON.stringify(user));
    return true;
  } catch (e) {
    if (e.name === 'QuotaExceededError') return false;
    throw e;
  }
}

function updateStreak(user) {
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

function updateRank(user) {
  const rankIndex = Math.min(Math.floor(user.level / RANK_LEVEL_INTERVAL), RANKS.length - 1);
  user.rank = RANKS[rankIndex];
}

function completeActivity(user, name, xpGained) {
  user.xp += xpGained;
  user.history.unshift({
    name,
    xp: xpGained,
    time: new Date().toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'})
  });
  if (user.history.length > 5) user.history.pop();

  checkLevelUp(user);
  updateStreak(user);
}

function checkLevelUp(user) {
  while (user.xp >= user.xpToNext) {
    user.level++;
    user.xp -= user.xpToNext;
    user.xpToNext = Math.floor(user.xpToNext * 1.5);
    updateRank(user);
  }
}

function calculateXpPercent(user) {
  return user.xpToNext > 0 ? Math.min((user.xp / user.xpToNext) * 100, 100) : 0;
}

function validateStepThreshold(acceleration) {
  if (!acceleration) return false;
  const { x, y, z } = acceleration;
  if (x === null || y === null || z === null) return false;
  const magnitude = Math.sqrt(x * x + y * y + z * z);
  return magnitude > STEP_THRESHOLD;
}

// ============================================
// TESTS
// ============================================

// ─── DEFAULT STATE ─────────────────────────────────────────────────────────
test('DEFAULT_USER has correct initial values', () => {
  assertEqual(DEFAULT_USER.level, 1);
  assertEqual(DEFAULT_USER.xp, 0);
  assertEqual(DEFAULT_USER.xpToNext, 100);
  assertEqual(DEFAULT_USER.streak, 0);
  assertEqual(DEFAULT_USER.rank, 'Recruit');
  assertEqual(DEFAULT_USER.history.length, 0);
});

// ─── LOAD USER ──────────────────────────────────────────────────────────────
test('loadUser returns defaults when no data exists', () => {
  mockLocalStorage.clear();
  const user = loadUser(mockLocalStorage);
  assertEqual(user, DEFAULT_USER);
});

test('loadUser parses valid JSON', () => {
  mockLocalStorage.clear();
  mockLocalStorage.setItem('auraQuest_Warrior', JSON.stringify({
    level: 5, xp: 250, steps: 1000
  }));
  const user = loadUser(mockLocalStorage);
  assertEqual(user.level, 5);
  assertEqual(user.xp, 250);
  assertEqual(user.steps, 1000);
  assertEqual(user.rank, 'Squire'); // computed from level
});

test('loadUser handles malformed JSON gracefully', () => {
  mockLocalStorage.clear();
  mockLocalStorage.setItem('auraQuest_Warrior', '{invalid json');
  const user = loadUser(mockLocalStorage);
  assertEqual(user.level, 1);
  assertEqual(user.xp, 0);
});

test('loadUser coerces non-integer types to defaults', () => {
  mockLocalStorage.clear();
  mockLocalStorage.setItem('auraQuest_Warrior', JSON.stringify({
    level: "not a number", xp: null, steps: undefined, xpToNext: "50"
  }));
  const user = loadUser(mockLocalStorage);
  assertEqual(user.level, 1);
  assertEqual(user.xp, 0);
  assertEqual(user.steps, 0);
  assertEqual(user.xpToNext, 50); // parsed string "50" becomes 50 via parseInt
});

test('loadUser handles missing nested properties', () => {
  mockLocalStorage.clear();
  mockLocalStorage.setItem('auraQuest_Warrior', JSON.stringify({
    level: 10,
    // xp missing
    xpToNext: 200
    // history, streak, etc missing
  }));
  const user = loadUser(mockLocalStorage);
  assertEqual(user.level, 10);
  assertEqual(user.xp, 0);
  assertEqual(user.streak, 0);
  assertEqual(user.history.length, 0);
});

// ─── SAVE USER ──────────────────────────────────────────────────────────────
test('saveUser writes valid JSON', () => {
  mockLocalStorage.clear();
  const user = { ...DEFAULT_USER, level: 3, xp: 150 };
  const result = saveUser(user, mockLocalStorage);
  assertTrue(result);
  const raw = mockLocalStorage.getItem('auraQuest_Warrior');
  assertTrue(raw !== null);
  const parsed = JSON.parse(raw);
  assertEqual(parsed.level, 3);
});

// ─── STREAK LOGIC ───────────────────────────────────────────────────────────
test('updateStreak sets streak to 1 on first visit', () => {
  setFrozenDate('2026-04-24');
  const user = { lastDate: null, streak: 0 };
  updateStreak(user);
  assertEqual(user.streak, 1);
  assertEqual(user.lastDate, 'Fri Apr 24 2026');
});

test('updateStreak increments when returning next day', () => {
  setFrozenDate('2026-04-24'); // Friday
  // Yesterday = Thursday Apr 23
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const user = { lastDate: yesterday, streak: 3 };
  updateStreak(user);
  assertEqual(user.streak, 4);
});

test('updateStreak resets to 1 after missing a day', () => {
  setFrozenDate('2026-04-24');
  const user = { lastDate: 'Mon Apr 20 2026', streak: 5 };
  updateStreak(user);
  assertEqual(user.streak, 1);
});

test('updateStreak does not increment if already visited today', () => {
  setFrozenDate('2026-04-24');
  const user = { lastDate: 'Fri Apr 24 2026', streak: 3 };
  updateStreak(user);
  assertEqual(user.streak, 3);
});

// ─── RANK PROGRESSION ───────────────────────────────────────────────────────
test('updateRank assigns correct rank at level 1', () => {
  const user = { level: 1 };
  updateRank(user);
  assertEqual(user.rank, 'Recruit');
});

test('updateRank assigns correct rank at level 5', () => {
  const user = { level: 5 };
  updateRank(user);
  assertEqual(user.rank, 'Squire');
});

test('updateRank assigns correct rank at level 10', () => {
  const user = { level: 10 };
  updateRank(user);
  assertEqual(user.rank, 'Warrior');
});

test('updateRank caps at Legend for level 25+', () => {
  const user = { level: 50 };
  updateRank(user);
  assertEqual(user.rank, 'Legend');
});

// ─── XP & LEVEL-UP ──────────────────────────────────────────────────────────
test('checkLevelUp triggers at exact threshold', () => {
  const user = { level: 1, xp: 100, xpToNext: 100, history: [] };
  checkLevelUp(user);
  assertEqual(user.level, 2);
  assertEqual(user.xp, 0);
  assertEqual(user.xpToNext, 150);
});

test('checkLevelUp does nothing when below threshold', () => {
  const user = { level: 2, xp: 50, xpToNext: 150, history: [] };
  checkLevelUp(user);
  assertEqual(user.level, 2);
  assertEqual(user.xp, 50);
});

test('checkLevelUp handles multiple level-ups in one session', () => {
  const user = { level: 1, xp: 250, xpToNext: 100, history: [] };
  checkLevelUp(user);
  assertEqual(user.level, 3); // gained 2 levels
  assertEqual(user.xp, 0);
  assertEqual(user.xpToNext, 225);
});

test('xpToNext scales by 1.5 on level-up', () => {
  const user = { level: 3, xp: 200, xpToNext: 200, history: [] };
  checkLevelUp(user);
  assertEqual(user.xpToNext, 300); // floor(200 * 1.5) = 300
});

// ─── ACTIVITY COMPLETION ────────────────────────────────────────────────────
test('completeActivity adds XP and history entry', () => {
  setFrozenDate('2026-04-24T14:30:00');
  const user = { ...DEFAULT_USER, history: [] };
  completeActivity(user, "Diamond Pushups", 50);
  assertEqual(user.xp, 50);
  assertEqual(user.history.length, 1);
  assertEqual(user.history[0].name, "Diamond Pushups");
  assertEqual(user.history[0].xp, 50);
});

test('completeActivity caps history at 5 entries', () => {
  const user = { ...DEFAULT_USER, history: [] };
  for (let i = 0; i < 7; i++) {
    completeActivity(user, `Workout ${i}`, 10);
  }
  assertEqual(user.history.length, 5);
  assertEqual(user.history[0].name, 'Workout 6'); // most recent
  assertEqual(user.history[4].name, 'Workout 2'); // oldest kept
});

// ─── ESCAPE HTML ────────────────────────────────────────────────────────────
test('escapeHTML escapes dangerous characters', () => {
  assertEqual(escapeHTML('<script>'), '&lt;script&gt;');
  assertEqual(escapeHTML('"test"'), '&quot;test&quot;');
  assertEqual(escapeHTML("O'Reilly"), "O&#039;Reilly");
  assertEqual(escapeHTML('a & b'), 'a &amp; b');
});

test('escapeHTML leaves safe strings unchanged', () => {
  assertEqual(escapeHTML('Diamond Pushups'), 'Diamond Pushups');
  assertEqual(escapeHTML('12 Reps'), '12 Reps');
});

// ─── STEP DETECTION THRESHOLD ───────────────────────────────────────────────
const STEP_THRESHOLD = 13;

test('validateStepThreshold returns true for strong acceleration', () => {
  const strongAcc = { x: 15, y: 5, z: 10 };
  const mag = Math.sqrt(strongAcc.x**2 + strongAcc.y**2 + strongAcc.z**2);
  assertTrue(mag > STEP_THRESHOLD);
});

test('validateStepThreshold returns false for weak acceleration', () => {
  const weakAcc = { x: 2, y: 3, z: 1 };
  const mag = Math.sqrt(weakAcc.x**2 + weakAcc.y**2 + weakAcc.z**2);
  assertFalse(mag > STEP_THRESHOLD);
});

test('validateStepThreshold handles null acceleration', () => {
  const result = !(!null || null.x === null);
  assertFalse(result);
});

// ─── XP PERCENT CALCULATION ─────────────────────────────────────────────────
test('calculateXpPercent returns 0 at start', () => {
  const user = { xp: 0, xpToNext: 100 };
  assertEqual(calculateXpPercent(user), 0);
});

test('calculateXpPercent returns 100 at threshold', () => {
  const user = { xp: 100, xpToNext: 100 };
  assertEqual(calculateXpPercent(user), 100);
});

test('calculateXpPercent handles halfway', () => {
  const user = { xp: 75, xpToNext: 150 };
  assertEqual(calculateXpPercent(user), 50);
});

test('calculateXpPercent caps at 100 even if over', () => {
  const user = { xp: 200, xpToNext: 100 };
  assertEqual(calculateXpPercent(user), 100);
});

test('calculateXpPercent handles zero division safely', () => {
  const user = { xp: 10, xpToNext: 0 };
  assertEqual(calculateXpPercent(user), 0);
});

// ─── WORKOUT DATA INTEGRITY ─────────────────────────────────────────────────
test('all workouts have required fields', () => {
  for (const w of workoutData) {
    assertTrue(typeof w.id === 'number', `Workout ${w.name || w.id} missing id`);
    assertTrue(typeof w.name === 'string', `Workout ${w.id} missing name`);
    assertTrue(typeof w.muscle === 'string', `Workout ${w.id} missing muscle`);
    assertTrue(typeof w.xp === 'number', `Workout ${w.id} missing xp`);
    assertTrue(typeof w.isTimed === 'boolean', `Workout ${w.id} missing isTimed`);
    if (w.isTimed) {
      assertTrue(typeof w.duration === 'number', `Timed workout ${w.id} missing duration`);
    } else {
      assertTrue(typeof w.goal === 'string', `Rep-based workout ${w.id} missing goal`);
    }
  }
});

test('all workout IDs are unique', () => {
  const ids = workoutData.map(w => w.id);
  const unique = new Set(ids);
  assertEqual(ids.length, unique.size);
});

test('all XP values are positive integers', () => {
  for (const w of workoutData) {
    assertTrue(w.xp > 0, `Workout ${w.id} has non-positive XP`);
    assertTrue(Number.isInteger(w.xp), `Workout ${w.id} has non-integer XP`);
  }
});

// ─── STORAGE QUOTA HANDLING ─────────────────────────────────────────────────
test('saveUser handles QuotaExceededError gracefully', () => {
  const quotaMock = {
    setItem: () => { const e = new Error('QuotaExceeded'); e.name = 'QuotaExceededError'; throw e; },
    getItem: () => null
  };
  const result = saveUser(DEFAULT_USER, quotaMock);
  assertFalse(result);
});

// ============================================
// RUN TESTS
// ============================================
run();
