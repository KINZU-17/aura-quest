# 🎯 AuraQuest | Warrior Edition

A gamified fitness tracker that turns workouts into RPG-style quests. Built with vanilla JavaScript, HTML, and CSS. No frameworks, no dependencies, just pure progress.

---

## ⚔️ Features

### Core Gameplay
- **Muscle Quests** - Complete bodyweight exercises to earn XP and level up
- **Rank System** - Progress through 6 ranks: Recruit → Squire → Warrior → Knight → Champion → Legend
- **Streak Tracking** - Build daily habits with visible streak counters
- **Passive Gains** - Automatic step counting via device motion sensors (20 steps = 2 XP)
- **History Feed** - Track your last 5 completed activities
- **Persistence** - All progress saved locally via localStorage

### Combat Types
- **Rep-Based Quests** - Diamond Pushups, Archer Pushups, Bulgarian Split Squats
- **Timed Holds** - Plank Jacks (45s), Superman Hold (30s), Hollow Body Rock (40s)

### Technical Highlights
- Zero dependencies (vanilla JS)
- Mobile-first responsive design
- Dark UI with neon accents
- Motion sensor integration for step detection
- Smooth animations and transitions

---

## 🚀 Quick Start

Since this is pure HTML/CSS/JS, just open `index.html` in any modern browser. No build process, no installation required.

### For Mobile Development
```bash
# Serve via any static server
python3 -m http.server 8000
# OR
npx serve
```

Then navigate to `http://localhost:8000`

### Activate Step Tracking
1. Open on a mobile device with motion sensors
2. Tap the "PASSIVE GAINS" card
3. Grant motion permission when prompted
4. Walk - every 20 steps earns 2 XP

---

## 📁 Project Structure

```
aura-quest/
├── index.html          # Main app layout (53 lines)
├── app.js              # All game logic (162 lines)
├── style.css           # Theme & responsive styles (58 lines)
├── workouts.js         # Expansion workout definitions (reserved)
└── README.md           # This file
```

---

## 🧠 Architecture

### State Management
Single `user` object persisted to localStorage:
```js
{
  level, xp, xpToNext, steps, streak,
  lastDate, history: [], rank
}
```

### XP Progression
- `nextLevel = Math.floor(currentXpToNext × 1.5)`
- Each level scales difficulty exponentially

### Rank Tiers
| Level Range | Rank |
|---|---|
| 1-4 | Recruit |
| 5-9 | Squire |
| 10-14 | Warrior |
| 15-19 | Knight |
| 20-24 | Champion |
| 25+ | Legend |

### Pedometer Algorithm
- Uses `accelerationIncludingGravity` magnitude threshold > 13
- Prevents double-counting with 350ms cooldown
- Awards bonus XP every 20 steps (gated by debounce)

---

## 🎮 Game Mechanics

1. **Select a quest** from the Muscle Quests section
2. **For timed exercises**, modal appears with countdown
3. **Complete** → XP added → Progress bar updates
4. **Level up** when XP bar fills → auto-reset with scaled threshold
5. **Streak increments** once daily per session
6. **Walk** → Earn passive XP automatically

---

## 🔮 Future Roadmap

### Planned Features
- Workout categories (Push, Pull, Legs, Core)
- Rest timer between sets
- Custom workout builder
- Graph visualization of progress
- Export data (JSON/CSV)
- Sound effects & haptic feedback
- PWA support for offline use
- Cloud sync (optional)

### Expansion Ideas
- Equipment-based exercises (dumbbells, bands)
- Weekly challenges
- Achievements/badges system
- Friend leaderboards
- Integration with Apple Health / Google Fit

---

## 🛠️ Development Notes

### Code Style
- Minimal, readable functions (< 20 lines each)
- Event-driven architecture
- No external libraries
- Mobile-first CSS with CSS variables

### Adding New Workouts
Edit `app.js` line 2-9:
```js
{ id: 7, name: "Pistol Squats", goal: "5 Per Leg", xp: 75, muscle: "Quads", isTimed: false }
// or
{ id: 8, name: "Wall Sit", duration: 60, xp: 50, muscle: "Quads", isTimed: true }
```

---

## 📝 License

MIT License - Free to use, modify, and distribute.

---

## 💎 Why This Exists

Most fitness apps are bloated, subscription-based, or overly complex. AuraQuest strips fitness tracking down to its core psychology: **progress → reward → repeat**. No social pressure, no paywalls, just you versus your past self.

Built in one weekend to prove that sometimes the simplest tools are the most powerful.

---

**Ready to ascend?** Open `index.html` and begin your first quest.
