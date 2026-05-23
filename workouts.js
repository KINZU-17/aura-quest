/**
 * Workout Database - Expanded no-equipment exercises with instructions
 */

const workoutData = [
  // ─── PUSH (Chest/Triceps/Shoulders) ──────────────────────────────────────
  {
    id: 1,
    name: "Diamond Pushups",
    muscle: "Chest/Triceps",
    difficulty: 3,
    xp: 50,
    isTimed: false,
    goal: "12 Reps",
    type: "push",
    instructions: [
      "Form a diamond with thumbs and index fingers under chest",
      "Keep elbows tucked close to body throughout movement",
      "Lower until chest nearly touches hands",
      "Push back up explosively while keeping core tight"
    ],
    tips: "Keep elbows pointing backward, not flaring out. Go slow on the way down."
  },
  {
    id: 2,
    name: "Archer Pushups",
    muscle: "Chest/Shoulders",
    difficulty: 4,
    xp: 65,
    isTimed: false,
    goal: "8 Per Side",
    type: "push",
    instructions: [
      "Start in wide pushup position, hands wider than shoulders",
      "Lower toward right hand while keeping left arm straight",
      "Push back up from right side",
      "Repeat on left side - alternate each rep"
    ],
    tips: "The straight arm acts as a support. Focus on controlled lowering."
  },
  {
    id: 3,
    name: "Pseudo Planche Pushups",
    muscle: "Chest/Shoulders",
    difficulty: 5,
    xp: 80,
    isTimed: false,
    goal: "8 Reps",
    type: "push",
    instructions: [
      "Place hands by lower ribs, pointing down toward feet",
      "Lean shoulders forward past hands",
      "Keep body in straight line",
      "Lower chest while leaning forward, then push back up"
    ],
    tips: "Lean forward more than regular pushups. Start with feet elevated on chair for easier version."
  },
  {
    id: 4,
    name: "Decline Pushups",
    muscle: "Upper Chest",
    difficulty: 2,
    xp: 40,
    isTimed: false,
    goal: "12 Reps",
    type: "push",
    instructions: [
      "Place feet on elevated surface (chair, step, sofa)",
      "Hands on floor in normal pushup position",
      "Keep body straight from head to heels",
      "Lower chest to floor, then push back up"
    ],
    tips: "Higher feet = harder. Start low and increase height as you get stronger."
  },
  {
    id: 5,
    name: "Pike Pushups",
    muscle: "Shoulders",
    difficulty: 3,
    xp: 55,
    isTimed: false,
    goal: "10 Reps",
    type: "push",
    instructions: [
      "Start in downward dog position - hips high, feet on floor",
      "Hands shoulder-width apart, forming inverted V",
      "Lower top of head toward floor between hands",
      "Push back up by straightening arms"
    ],
    tips: "Keep legs straight if possible. The more vertical you are, the harder it is."
  },
  {
    id: 6,
    name: "Wall Handstand Hold",
    muscle: "Shoulders/Core",
    difficulty: 4,
    xp: 60,
    isTimed: true,
    duration: 30,
    goal: "30s Hold",
    type: "push",
    instructions: [
      "Start facing wall, hands on floor shoulder-width apart",
      "Kick one leg up, then the other against wall",
      "Walk hands close to wall (2-4 inches away)",
      "Squeeze glutes and core, hold position"
    ],
    tips: "Point toes toward ceiling. Keep arms locked. If falling, tuck chin and cartwheel out sideways."
  },

  // ─── PULL (Back/Biceps) ───────────────────────────────────────────────────
  {
    id: 7,
    name: "Pull-Up Negatives",
    muscle: "Back/Biceps",
    difficulty: 4,
    xp: 70,
    isTimed: false,
    goal: "5 Reps",
    type: "pull",
    instructions: [
      "Jump up or use chair to get chin over bar",
      "Hold top position with chin over bar",
      "Lower as SLOWLY as possible - aim for 3-5 seconds",
      "Once arms are straight, repeat"
    ],
    tips: "The slower you lower, the more effective. If 5 seconds feels impossible, you're doing it right."
  },
  {
    id: 8,
    name: "Inverted Rows",
    muscle: "Upper Back",
    difficulty: 3,
    xp: 50,
    isTimed: false,
    goal: "12 Reps",
    type: "pull",
    instructions: [
      "Lie under sturdy table or desk",
      "Grab edge with hands shoulder-width apart",
      "Keep body in straight line, heels on floor",
      "Pull chest up to edge, then lower slowly"
    ],
    tips: "The more horizontal you are, the harder. Bend knees to make easier."
  },
  {
    id: 9,
    name: "Australian Pull-Ups",
    muscle: "Latissimus",
    difficulty: 3,
    xp: 55,
    isTimed: false,
    goal: "10 Reps",
    type: "pull",
    instructions: [
      "Find bar or sturdy table at waist height",
      "Lie underneath holding bar",
      "Keep body straight, pull chest to bar",
      "Lower with control"
    ],
    tips: "Squeeze shoulder blades together at the top. Keep core tight."
  },
  {
    id: 10,
    name: "Commando Planks",
    muscle: "Core/Obliques",
    difficulty: 3,
    xp: 45,
    isTimed: true,
    duration: 40,
    goal: "40s Hold",
    type: "pull",
    instructions: [
      "Start in forearm plank position on elbows",
      "Rotate to right side, lifting left arm toward ceiling",
      "Hold 2 seconds, return to center",
      "Rotate to left, lift right arm, hold 2 seconds",
      "Alternate sides continuously"
    ],
    tips: "Keep hips from sagging. Move deliberately, don't rush the rotation."
  },

  // ─── LEGS (Quads/Glutes/Hamstrings) ───────────────────────────────────────
  {
    id: 11,
    name: "Bulgarian Split Squats",
    muscle: "Quads/Glutes",
    difficulty: 4,
    xp: 60,
    isTimed: false,
    goal: "12 Per Leg",
    type: "legs",
    instructions: [
      "Stand 2 feet in front of chair or couch",
      "Place top of one foot behind you on elevated surface",
      "Lower until front thigh is parallel to floor",
      "Push through front heel to stand back up",
      "Complete all reps on one side before switching"
    ],
    tips: "Keep torso upright. Most weight is on front heel, not back toe."
  },
  {
    id: 12,
    name: "Pistol Squats (assisted)",
    muscle: "Quads/Glutes",
    difficulty: 5,
    xp: 75,
    isTimed: false,
    goal: "5 Per Leg",
    type: "legs",
    instructions: [
      "Stand on one leg, other leg extended forward",
      "Hold doorframe or pole for balance",
      "Lower slowly until back touches other leg's calf",
      "Push back up to standing",
      "Use support only for balance, not to pull yourself up"
    ],
    tips: "Keep the extended leg off the ground. Go as deep as your flexibility allows."
  },
  {
    id: 13,
    name: "Jump Squats",
    muscle: "Quads/Glutes",
    difficulty: 3,
    xp: 50,
    isTimed: false,
    goal: "15 Reps",
    type: "legs",
    instructions: [
      "Stand with feet shoulder-width apart",
      "Lower into full squat, thighs parallel to floor",
      "Explode upward, jumping as high as possible",
      "Land softly with bent knees",
      "Immediately go into next rep"
    ],
    tips: "Land quietly. Think 'absorb' the impact through your legs. Control the landing."
  },
  {
    id: 14,
    name: "Nordic Curl Negatives",
    muscle: "Hamstrings",
    difficulty: 5,
    xp: 80,
    isTimed: false,
    goal: "6 Reps",
    type: "legs",
    instructions: [
      "Kneel with ankles secured under heavy furniture or held by partner",
      "Keep body in straight line from knees to head",
      "Lower torso toward floor as SLOWLY as possible",
      "Catch yourself with hands when needed",
      "Push back up to knees with hands"
    ],
    tips: "Squeeze hamstrings hard as you lower. Aim for 3+ seconds. This is brutally effective."
  },
  {
    id: 15,
    name: "Wall Sit",
    muscle: "Quads",
    difficulty: 2,
    xp: 45,
    isTimed: true,
    duration: 45,
    goal: "45s Hold",
    type: "legs",
    instructions: [
      "Stand with back against wall",
      "Step feet forward 2 feet from wall",
      "Slide down until thighs are parallel to floor",
      "Knees should be at 90 degrees",
      "Hold position, keep back flat against wall"
    ],
    tips: "Keep weight on heels, not toes. Push back into the wall."
  },
  {
    id: 16,
    name: "Single-Leg Glute Bridge",
    muscle: "Glutes/Hamstrings",
    difficulty: 3,
    xp: 50,
    isTimed: false,
    goal: "12 Per Leg",
    type: "legs",
    instructions: [
      "Lie on back, knees bent, feet flat on floor",
      "Extend one leg straight into air",
      "Drive through heel of grounded foot to lift hips",
      "Squeeze glutes hard at top",
      "Lower slowly without touching hips to floor"
    ],
    tips: "Don't let hips rotate. Keep them level. Squeeze glutes at the top for 1 second."
  },

  // ─── CORE (Abs/Obliques/Lower Back) ───────────────────────────────────────
  {
    id: 17,
    name: "Plank Jacks",
    muscle: "Core/Cardio",
    difficulty: 2,
    xp: 45,
    isTimed: true,
    duration: 45,
    goal: "45s Hold",
    type: "core",
    instructions: [
      "Start in forearm plank position",
      "Jump feet out to sides like jumping jack",
      "Jump feet back to center",
      "Repeat at steady pace"
    ],
    tips: "Don't let hips sag or rise too high. Keep core tight."
  },
  {
    id: 18,
    name: "Superman Hold",
    muscle: "Lower Back",
    difficulty: 2,
    xp: 40,
    isTimed: true,
    duration: 30,
    goal: "30s Hold",
    type: "core",
    instructions: [
      "Lie face down on floor, arms extended forward",
      "Simultaneously lift arms, chest, and legs off floor",
      "Only hips and lower abs should touch ground",
      "Squeeze glutes and lower back",
      "Hold position"
    ],
    tips: "Look at floor, not forward. Squeeze glutes to protect lower back."
  },
  {
    id: 19,
    name: "Hollow Body Rock",
    muscle: "Core",
    difficulty: 3,
    xp: 55,
    isTimed: true,
    duration: 40,
    goal: "40s Hold",
    type: "core",
    instructions: [
      "Lie on back, arms extended behind head",
      "Lift shoulders and legs off floor",
      "Lower back should press into floor",
      "Rock gently forward and backward while maintaining position",
      "Keep legs straight if possible"
    ],
    tips: "If too hard, bend knees slightly. Keep lower back on floor."
  },
  {
    id: 20,
    name: "Dragon Flags (Negatives)",
    muscle: "Lower Abs",
    difficulty: 5,
    xp: 85,
    isTimed: false,
    goal: "6 Reps",
    type: "core",
    instructions: [
      "Lie on bench or floor, grab behind head",
      "Lift legs straight up to vertical",
      "Lower legs as SLOWLY as possible toward floor",
      "Stop when feet are 6 inches off floor",
      "If needed, use hands to assist on way up"
    ],
    tips: "Slower is better. If you can't control the descent, you're not ready for full reps."
  },
  {
    id: 21,
    name: "L-Sit Hold",
    muscle: "Hip Flexors/Core",
    difficulty: 4,
    xp: 65,
    isTimed: true,
    duration: 20,
    goal: "20s Hold",
    type: "core",
    instructions: [
      "Sit on floor or parallel bars",
      "Place hands by hips, fingers pointing forward",
      "Press down, lift hips off ground",
      "Extend legs straight out in front",
      "Hold position, keep chest up"
    ],
    tips: "On floor, bend knees first to make it easier. Point toes toward ceiling."
  },
  {
    id: 22,
    name: "Russian Twists",
    muscle: "Obliques",
    difficulty: 2,
    xp: 40,
    isTimed: false,
    goal: "20 Reps",
    type: "core",
    instructions: [
      "Sit on floor, knees bent, feet lifted off ground",
      "Lean back slightly, keeping back straight",
      "Clasp hands together in front of chest",
      "Rotate torso to right, then left",
      "One right + left = 1 rep"
    ],
    tips: "Go slow. Touch floor with hands for harder version. Keep feet elevated."
  },
  {
    id: 23,
    name: "Hanging Leg Raises",
    muscle: "Lower Abs",
    difficulty: 4,
    xp: 70,
    isTimed: false,
    goal: "12 Reps",
    type: "core",
    instructions: [
      "Hang from pull-up bar, arms straight",
      "Keep legs straight (bent if too hard)",
      "Lift legs up to 90 degrees",
      "Lower slowly without swinging",
      "Control the descent"
    ],
    tips: "No momentum! If you swing, you're doing it wrong. Knee raises count too."
  },
  {
    id: 24,
    name: "Ab Wheel Rollout",
    muscle: "Full Core",
    difficulty: 5,
    xp: 90,
    isTimed: false,
    goal: "10 Reps",
    type: "core",
    instructions: [
      "Kneel on floor with ab wheel in hands",
      "Roll wheel forward while keeping back flat",
      "Go as far as you can without touching floor",
      "Pull back using abs, not just arms",
      "Return to starting position"
    ],
    tips: "Start from knees. Keep hips from sagging. If your back rounds, you went too far."
  },

  // ─── FULL BODY / CARDIO ─────────────────────────────────────────────────────
  {
    id: 25,
    name: "Burpees",
    muscle: "Full Body/Cardio",
    difficulty: 4,
    xp: 70,
    isTimed: false,
    goal: "15 Reps",
    type: "full",
    instructions: [
      "Stand tall, feet shoulder-width",
      "Drop to squat, hands on floor",
      "Jump feet back to plank position",
      "Do a pushup (optional)",
      "Jump feet forward to hands",
      "Explode up, jump with arms overhead"
    ],
    tips: "Keep moving. Quality over speed. Step back instead of jumping if needed."
  },
  {
    id: 26,
    name: "Mountain Climbers",
    muscle: "Core/Cardio",
    difficulty: 2,
    xp: 40,
    isTimed: true,
    duration: 30,
    goal: "30s Sprint",
    type: "full",
    instructions: [
      "Start in high plank position",
      "Drive right knee toward chest",
      "Quickly switch, left knee to chest",
      "Alternate as fast as possible",
      "Keep hips level, don't bounce"
    ],
    tips: "Quick steps. Don't lift hips. Imagine running in place horizontally."
  },
  {
    id: 27,
    name: "Burpee Pull-Up Negatives",
    muscle: "Full Body",
    difficulty: 5,
    xp: 95,
    isTimed: false,
    goal: "8 Reps",
    type: "full",
    instructions: [
      "Do a normal burpee to standing position",
      "Jump up to grab pull-up bar",
      "Pull chin over bar using momentum",
      "Lower as slowly as possible",
      "Drop down and repeat"
    ],
    tips: "The jump helps get chin over bar. Focus on the slow lowering. Exhausting!"
  },
  {
    id: 28,
    name: "Bear Crawl Hold",
    muscle: "Full Body/Core",
    difficulty: 3,
    xp: 50,
    isTimed: true,
    duration: 35,
    goal: "35s Hold",
    type: "full",
    instructions: [
      "Start on hands and knees",
      "Lift knees 1 inch off floor",
      "Keep back flat, core tight",
      "Hold position without moving",
      "Breathe steadily"
    ],
    tips: "Don't let hips rise or fall. This deceptively hard hold works everything."
  },

  // ─── MOBILITY / FLEXIBILITY ────────────────────────────────────────────────
  {
    id: 29,
    name: "Deep Squat Hold",
    muscle: "Ankles/Hips",
    difficulty: 2,
    xp: 35,
    isTimed: true,
    duration: 60,
    goal: "60s Hold",
    type: "mobility",
    instructions: [
      "Stand with feet wider than shoulders",
      "Toes pointed slightly outward",
      "Lower into deepest squat possible",
      "Keep heels on floor if possible",
      "Hold, focus on breathing",
      "Use elbows to gently push knees apart"
    ],
    tips: "This stretches hips, ankles, and groin. Use a wall or pole for balance if needed."
  },
  {
    id: 30,
    name: "Pike Stretch",
    muscle: "Hamstrings/Back",
    difficulty: 1,
    xp: 25,
    isTimed: true,
    duration: 45,
    goal: "45s Hold",
    type: "mobility",
    instructions: [
      "Stand with feet together",
      "Hinge at hips, reach toward toes",
      "Keep legs straight (soft knees OK)",
      "Let head hang heavy",
      "Hold gentle stretch"
    ],
    tips: "Don't bounce. Let gravity do the work. Touching toes not required."
  },
  {
    id: 31,
    name: "Spiderman Lunge with Reach",
    muscle: "Hip Flexors/Thoracic",
    difficulty: 2,
    xp: 30,
    isTimed: true,
    duration: 30,
    goal: "30s Per Side",
    type: "mobility",
    instructions: [
      "Start in pushup position",
      "Step right foot to right hand",
      "Drop left knee to floor",
      "Reach right arm toward ceiling, rotating chest open",
      "Hold, then switch sides"
    ],
    tips: "Open chest fully on the reach. Keep front heel down."
  },

  // ─── ISOMETRIC HOLDS (STATIC STRENGTH) ─────────────────────────────────────
  {
    id: 32,
    name: "Forearm Plank",
    muscle: "Core/Shoulders",
    difficulty: 1,
    xp: 35,
    isTimed: true,
    duration: 60,
    goal: "60s Hold",
    type: "isometric",
    instructions: [
      "Lie face down, elbows under shoulders",
      "Forearms on floor, hands forward or clasped",
      "Lift hips until body forms straight line",
      "Squeeze glutes and abs",
      "Don't let hips sag or rise"
    ],
    tips: "Standard plank. Watch your form in a mirror. Side planks work obliques."
  },
  {
    id: 33,
    name: "Side Plank",
    muscle: "Obliques",
    difficulty: 2,
    xp: 40,
    isTimed: true,
    duration: 30,
    goal: "30s Per Side",
    type: "isometric",
    instructions: [
      "Lie on one side, legs straight",
      "Prop up on one forearm, elbow under shoulder",
      "Lift hips until body forms straight diagonal line",
      "Hold position",
      "Repeat on other side"
    ],
    tips: "Don't let hips drop. Modify by bending bottom knee."
  },
  {
    id: 34,
    name: "Handstand Hold (against wall)",
    muscle: "Shoulders/Core",
    difficulty: 4,
    xp: 60,
    isTimed: true,
    duration: 20,
    goal: "20s Hold",
    type: "isometric",
    instructions: [
      "Face wall, hands on floor shoulder-width",
      "Walk feet up wall, hands close to wall",
      "Stack hips over shoulders over hands",
      "Squeeze glutes, point toes",
      "Hold tight line from hands to toes"
    ],
    tips: "Keep arms locked. Look slightly forward, not down. Heels touching wall."
  },
  {
    id: 35,
    name: "V-Ups Hold",
    muscle: "Upper/Lower Abs",
    difficulty: 3,
    xp: 50,
    isTimed: true,
    duration: 30,
    goal: "30s Hold",
    type: "isometric",
    instructions: [
      "Lie on back, arms extended behind head",
      "Lift arms and legs simultaneously",
      "Touch toes if possible, or reach toward them",
      "Lower slightly, hold in V position",
      "Keep back off floor"
    ],
    tips: "The lower you hover without touching, the harder it is. Keep legs and arms straight."
  }
];

// XP SCALING TIER (if dynamic balancing needed later)
const XP_TIERS = {
  EASY:  25,
  MEDIUM: 50,
  HARD:  75,
  EXTREME: 100
};

// Export for use in main app
if (typeof window !== 'undefined') {
  window.workoutData = workoutData;
}

// For Node.js module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { workoutData, XP_TIERS };
}
