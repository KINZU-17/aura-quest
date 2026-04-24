// ============================================
// AURAQUEST - WORKOUT DATABASE
// ============================================
// This file exports workout definitions used by the app.
// Each workout has:
//   - id: unique identifier
//   - name: exercise display name
//   - muscle: target muscle group(s)
//   - difficulty: 1-5 (affects XP scaling if desired)
//   - xp: base XP reward
//   - isTimed: true = timed hold, false = rep/position based
//   - goal OR duration: description field
// ============================================

const workoutDatabase = [
  // ─── PUSH (Chest/Triceps/Shoulders) ──────────────────────────────────────
  { id: 1, name: "Diamond Pushups", muscle: "Chest/Triceps", difficulty: 3, xp: 50, isTimed: false, goal: "12 Reps", type: "push" },
  { id: 2, name: "Archer Pushups", muscle: "Chest/Shoulders", difficulty: 4, xp: 65, isTimed: false, goal: "8 Per Side", type: "push" },
  { id: 3, name: "Pseudo Planche Pushups", muscle: "Chest/Shoulders", difficulty: 5, xp: 80, isTimed: false, goal: "8 Reps", type: "push" },
  { id: 4, name: "Decline Pushups", muscle: "Upper Chest", difficulty: 2, xp: 40, isTimed: false, goal: "12 Reps", type: "push" },
  { id: 5, name: "Pike Pushups", muscle: "Shoulders", difficulty: 3, xp: 55, isTimed: false, goal: "10 Reps", type: "push" },
  { id: 6, name: "Wall Handstand Hold", muscle: "Shoulders/Core", difficulty: 4, xp: 60, isTimed: true, duration: 30, goal: "30s Hold", type: "push" },

  // ─── PULL (Back/Biceps) ───────────────────────────────────────────────────
  { id: 7, name: "Pull-Up Negatives", muscle: "Back/Biceps", difficulty: 4, xp: 70, isTimed: false, goal: "5 Reps", type: "pull" },
  { id: 8, name: "Inverted Rows", muscle: "Upper Back", difficulty: 3, xp: 50, isTimed: false, goal: "12 Reps", type: "pull" },
  { id: 9, name: "Australian Pull-Ups", muscle: "Latissimus", difficulty: 3, xp: 55, isTimed: false, goal: "10 Reps", type: "pull" },
  { id: 10, name: "Commando Planks", muscle: "Core/Obliques", difficulty: 3, xp: 45, isTimed: true, duration: 40, goal: "40s Hold", type: "pull" },

  // ─── LEGS (Quads/Glutes/Hamstrings) ───────────────────────────────────────
  { id: 11, name: "Bulgarian Split Squats", muscle: "Quads/Glutes", difficulty: 4, xp: 60, isTimed: false, goal: "12 Per Leg", type: "legs" },
  { id: 12, name: "Pistol Squats ( assisted )", muscle: "Quads/Glutes", difficulty: 5, xp: 75, isTimed: false, goal: "5 Per Leg", type: "legs" },
  { id: 13, name: "Jump Squats", muscle: "Quads/Glutes", difficulty: 3, xp: 50, isTimed: false, goal: "15 Reps", type: "legs" },
  { id: 14, name: "Nordic Curl Negatives", muscle: "Hamstrings", difficulty: 5, xp: 80, isTimed: false, goal: "6 Reps", type: "legs" },
  { id: 15, name: "Wall Sit", muscle: "Quads", difficulty: 2, xp: 45, isTimed: true, duration: 45, goal: "45s Hold", type: "legs" },
  { id: 16, name: "Single-Leg Glute Bridge", muscle: "Glutes/Hamstrings", difficulty: 3, xp: 50, isTimed: false, goal: "12 Per Leg", type: "legs" },

  // ─── CORE (Abs/Obliques/Lower Back) ───────────────────────────────────────
  { id: 17, name: "Plank Jacks", muscle: "Core/Cardio", difficulty: 2, xp: 45, isTimed: true, duration: 45, goal: "45s Hold", type: "core" },
  { id: 18, name: "Superman Hold", muscle: "Lower Back", difficulty: 2, xp: 40, isTimed: true, duration: 30, goal: "30s Hold", type: "core" },
  { id: 19, name: "Hollow Body Rock", muscle: "Core", difficulty: 3, xp: 55, isTimed: true, duration: 40, goal: "40s Hold", type: "core" },
  { id: 20, name: "Dragon Flags (Negatives)", muscle: "Lower Abs", difficulty: 5, xp: 85, isTimed: false, goal: "6 Reps", type: "core" },
  { id: 21, name: "L-Sit Hold", muscle: "Hip Flexors/Core", difficulty: 4, xp: 65, isTimed: true, duration: 20, goal: "20s Hold", type: "core" },
  { id: 22, name: "Russian Twists", muscle: "Obliques", difficulty: 2, xp: 40, isTimed: false, goal: "20 Reps", type: "core" },
  { id: 23, name: "Hanging Leg Raises", muscle: "Lower Abs", difficulty: 4, xp: 70, isTimed: false, goal: "12 Reps", type: "core" },
  { id: 24, name: "Ab Wheel Rollout", muscle: "Full Core", difficulty: 5, xp: 90, isTimed: false, goal: "10 Reps", type: "core" },

  // ─── FULL BODY / CARDIO ─────────────────────────────────────────────────────
  { id: 25, name: "Burpees", muscle: "Full Body/Cardio", difficulty: 4, xp: 70, isTimed: false, goal: "15 Reps", type: "full" },
  { id: 26, name: "Mountain Climbers", muscle: "Core/Cardio", difficulty: 2, xp: 40, isTimed: true, duration: 30, goal: "30s Sprint", type: "full" },
  { id: 27, name: "Burpee Pull-Up Negatives", muscle: "Full Body", difficulty: 5, xp: 95, isTimed: false, goal: "8 Reps", type: "full" },
  { id: 28, name: "Bear Crawl Hold", muscle: "Full Body/Core", difficulty: 3, xp: 50, isTimed: true, duration: 35, goal: "35s Hold", type: "full" },

  // ─── MOBILITY / FLEXIBILITY ────────────────────────────────────────────────
  { id: 29, name: "Deep Squat Hold", muscle: "Ankles/Hips", difficulty: 2, xp: 35, isTimed: true, duration: 60, goal: "60s Hold", type: "mobility" },
  { id: 30, name: "Pike Stretch", muscle: "Hamstrings/Back", difficulty: 1, xp: 25, isTimed: true, duration: 45, goal: "45s Hold", type: "mobility" },
  { id: 31, name: "Spiderman Lunge with Reach", muscle: "Hip Flexors/Thoracic", difficulty: 2, xp: 30, isTimed: true, duration: 30, goal: "30s Per Side", type: "mobility" },

  // ─── ISOMETRIC HOLDS (STATIC STRENGTH) ─────────────────────────────────────
  { id: 32, name: "Forearm Plank", muscle: "Core/Shoulders", difficulty: 1, xp: 35, isTimed: true, duration: 60, goal: "60s Hold", type: "isometric" },
  { id: 33, name: "Side Plank", muscle: "Obliques", difficulty: 2, xp: 40, isTimed: true, duration: 30, goal: "30s Per Side", type: "isometric" },
  { id: 34, name: "Handstand Hold (against wall)", muscle: "Shoulders/Core", difficulty: 4, xp: 60, isTimed: true, duration: 20, goal: "20s Hold", type: "isometric" },
  { id: 35, name: "V-Ups Hold", muscle: "Upper/Lower Abs", difficulty: 3, xp: 50, isTimed: true, duration: 30, goal: "30s Hold", type: "isometric" }
];

// XP SCALING TIER (if dynamic balancing needed later)
const XP_TIERS = {
  EASY:  25,
  MEDIUM: 50,
  HARD:  75,
  EXTREME: 100
};

// Export for use in main app (works in browser via script tag too)
if (typeof window !== 'undefined') {
  window.workoutData = workoutDatabase;
}

// For Node.js module usage (future-proofing)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { workoutDatabase, XP_TIERS };
}
