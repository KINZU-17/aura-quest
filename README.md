# 🎮 AURAQUEST - Gamified Fitness Tracker

**The Ultimate RPG-Style Workout Experience**

Transform your fitness journey into an epic quest! AuraQuest turns bodyweight exercises into a full-featured gamification system with achievements, daily challenges, progression tracking, and more.

---

## ✨ Features

### 🏋️ Expanded Workout Database (35+ Exercises)

Comprehensive no-equipment exercises across multiple categories:

**Upper Body**
- Diamond Pushups, Archer Pushups, Pike Pushups
- Tricep Dips, Pseudo Planche Pushups
- Wall Handstand Hold, Pull-Up Negatives
- Inverted Rows, Australian Pull-Ups

**Lower Body**
- Bulgarian Split Squats, Pistol Squats, Jump Squats
- Wall Sit, Nordic Curl Negatives
- Single Leg Glute Bridges

**Core**
- Plank Jacks, Superman Hold, Hollow Body Rock
- Dragon Flags, Ab Wheel Rollouts, L-Sit Hold
- Russian Twists, Hanging Leg Raises
- Forearm Plank, Side Plank, V-Ups Hold

**Full Body & Cardio**
- Burpees, Mountain Climbers, Burpee Pull-Up Negatives
- Bear Crawl Hold

**Mobility**
- Deep Squat Hold, Pike Stretch, Spiderman Lunge

Each exercise includes:
- Difficulty rating (1-5 stars)
- XP rewards
- Detailed step-by-step instructions
- Expert tips and form cues
- Timed or rep-based variations

---

### 🎯 Daily Challenges System

Get a random daily challenge each day! Complete them for bonus XP:

- **Chest Day** - 100 XP bonus
- **Leg Destroyer** - 150 XP bonus
- **Core Master** - 120 XP bonus
- **Cardio Blast** - 100 XP bonus
- **Full Body Quest** - 130 XP bonus

Challenges reset daily and provide focused workout routines.

---

### 🏆 Achievement & Badge System

Unlock 9 achievements as you progress:

- 🥋 **Novice** - Complete your first workout
- 💪 **Persistent** - Complete 10 workouts
- ⚔️ **Warrior** - Complete 50 workouts
- 👑 **Legend** - Complete 100 workouts
- 🔥 **On Fire** - Maintain a 7-day streak
- ⚡ **Unstoppable** - Maintain a 30-day streak
- ⭐ **Ascended** - Reach level 10
- 🚶 **Wanderer** - Walk 1,000 steps
- ✅ **Disciplined** - Complete daily challenge all week

Achievements unlock with visual popups and celebratory sound effects!

---

### 🎨 Enhanced UI & Animations

**Modern Design**
- Gradient backgrounds with glassmorphism effects
- Color-coded muscle groups (green=upper, yellow=lower, red=core, cyan=cardio)
- Dynamic difficulty stars for each exercise
- Smooth hover effects and transitions

**Animations**
- Level-up flash effects
- XP bar gradient transitions
- Workout card slide-in animations
- Modal popups with scale-up effects
- Countdown timer pulse animations
- Achievement unlock fanfare

---

### 🔊 Sound Effects & Audio Feedback

*Optional* audio feedback system with:
- **Level-up** - Ascending tone sequence
- **Workout Complete** - Success tone
- **Achievement Unlocked** - Fanfare sequence
- **Countdown Tick** - Subtle beep during timers

Toggle sound on/off anytime. Uses Web Audio API for dynamic sound generation.

---

### 📊 Stats Dashboard

Real-time statistics display:
- Total workouts completed
- Current daily streak
- Achievement progress (e.g., 7/9 unlocked)
- Total steps walked
- All data synced with user account

---

### 📈 Progress Charts

- Interactive line graph showing XP earned per workout
- Updates automatically after each completed workout
- Theme‑aware colors that match your selected dark/light mode
- Powered by Chart.js with responsive canvas

---

### 🏆 Leaderboard

- Global rankings across all registered users
- Sorted by level and XP (highest first)
- Highlights your own entry for quick reference
- Displays Level, Workouts, and Streak for each warrior
- Access via the 🏆 button in the top‑right header

---

### 🎬 YouTube Video Tutorials

- Each exercise includes a "Watch Tutorial" link in the instructions panel
- Opens YouTube search for the exercise name + "exercise technique"
- Study proper form before attempting advanced moves
- Learn variations and progressions from expert creators

---

### 👥 Social Sharing

- Share your achievements and progress directly to social platforms
- One‑click sharing to Twitter, Facebook, and LinkedIn
- Copy your stats to clipboard with the 📋 button
- Pre‑filled messages include your current level, XP, and streak
- Access the share panel at the bottom of the dashboard

---

### 💾 CSV Export

- Export your workout history to a CSV file with one click
- Download includes columns: Workout, XP, Time of day
- Filename includes current date for easy organization
- Analyze your progress in spreadsheet software or backup your data

---

### 🎵 Background Workout Playlist

- Play energizing music while you workout to stay motivated
- Toggle on/off via the 🎵 button in the top‑right header
- Single looping track included; replace with your own playlist URL in `app.js`
- Volume adjustable via system controls (default 50%)
- Music pauses automatically when workout timer starts

---

### 📡 Offline Mode (PWA)

- Service worker caches core assets for offline access
- Once loaded, the app works without an internet connection
- Automatic background updates when back online
- Offline fallback page displays when navigation fails while offline
- Installable on home screen via native browser prompt

---

### 🎯 RPG Progression System

- **Levels** - Increase through XP gain (1.5x multiplier each level)
- **Ranks** - Unlock new ranks as you level up:
  - Recruit → Squire → Warrior → Knight → Champion → Legend
- **XP Bar** - Visual progress toward next level
- **Streaks** - Track daily consistency for extra motivation

---

### 📱 Mobile-First Design

- Fully responsive layout for all screen sizes
- Touch-friendly buttons and interactive elements
- Optimized for smartphone, tablet, and desktop
- Accessibility features with ARIA labels
- Support for prefers-reduced-motion

---

### 🌙 Dark/Light Theme Toggle

Switch between dark and light modes to match your environment and preferences:

- **Toggle Button** - Located in the top-right header (🌙/☀️ icon)
- **Autosave** - Preference stored per user in localStorage
- **Full Coverage** - Both login page and main dashboard respect the theme
- **Seamless** - Instant switch, no page reload required

The dark theme provides an energy‑saving, sleek interface ideal for low‑light workouts. The light theme offers maximum readability in bright environments. Both themes preserve AuraQuest's signature neon accents and visual hierarchy.

---

### 🚶 Step Counter (Pedometer)

- **Passive Gains** - Earn XP by walking
- 20 steps = 2 XP
- Uses device accelerometer
- Automatic streak tracking
- Works in background

---

### 🗣️ Audio Instructor (Optional)

Text-to-speech instructor guidance:
- Motivational voice feedback
- Voice type selection (male/female)
- Volume and speech rate controls
- Countdown audio cues
- Workout-specific instructions

---

## 🎪 Seasonal Challenges

- Rotating quarterly challenges aligned with the seasons
- Each season has a unique focus: workouts, XP, steps, or streak
- Progress tracked automatically; rewards large XP bonuses
- Dashboard card displays current season, goal, and progress
- Resets at the start of each new season (March, June, September, December)

---

## 🏋️ Personal Records

- Tracks your best performance on timed exercises
- Shows your longest hold times for planks, wall sits, and more
- Personal bests displayed in a dedicated section
- Get notified when you beat your own record
- Motivates continuous improvement and goal setting

---

## ⭐ Rate the App

- Found in the header (⭐ button) next to other controls
- Click to open the rating modal with 5 stars
- Your rating is saved per user account
- Community average and total count displayed in real-time
- Only one rating per user; you can update it anytime
- Feedback helps shape future improvements

---

## 🎮 Game Mechanics

### XP System
- Each exercise rewards 25-100 XP depending on difficulty
- Bonus XP for completing daily challenges
- Extra XP multipliers at milestone levels

### Difficulty Scaling
- Star ratings help you choose appropriate challenges
- Progress from basic (★) to elite (★★★★★) exercises
- Timed exercises build endurance, rep-based build strength

### Streak Mechanics
- Land bonus motivation at 7+ days
- 30-day streak unlock "Unstoppable" achievement
- Automatic reset if you miss a day

---

## 🛠️ Technical Features

### Local Storage & Data Persistence
- All progress saved automatically per user account
- Encrypted with username-based keys
- Synced with login system
- 5 workout history items displayed

### Architecture
- Modular JavaScript with separate concerns:
  - `app.js` - Core game logic & UI (600+ lines)
  - `workouts.js` - Exercise database (35+ exercises)
  - `features.js` - Achievements & audio system
  - `instructor.js` - Text-to-speech integration
- CSS custom properties for theming (500+ lines of styles)
- Progressive enhancement

### Browser Support
- Chrome/Edge (90+)
- Firefox (88+)
- Safari (14+)
- Mobile browsers with accelerometer support

---

## 📋 How to Use

### Getting Started
1. **Sign In** - Create your warrior account at login.html
2. **Choose Workouts** - Browse the quest list and select exercises
3. **Complete Challenges** - Follow on-screen instructions and complete reps/hold times
4. **Earn Rewards** - Gain XP, level up, unlock achievements!
5. **Build Streaks** - Return daily to maintain your streak

### Tips for Success
- ⭐ Focus on form over speed - proper technique = more XP potential
- 🔥 Build a daily habit - even 5-10 minutes adds up
- 🎯 Follow the daily challenge - themed workouts keep it varied
- 📈 Progress gradually - start with ★★ exercises before ★★★★★
- 🎧 Enable audio for motivation and countdown cues

---

## 📈 Progress Metrics

Track your fitness journey:

| Metric | Value |
|--------|-------|
| Total Exercises | 35+ |
| Max Difficulty | 5 stars |
| Max Level | Unlimited |
| XP per Level | 1.5x multiplier |
| Daily Challenges | 5 rotating |
| Achievements | 9 total |
| Streak Bonus | Motivation + badge |

---

## 🎨 Customization

### Theme Colors
Edit `style.css` custom properties:
```css
:root {
  --accent-purple: #7000ff;
  --accent-cyan: #00f2fe;
  --accent-green: #00ff88;
}
```

### Add Custom Exercises
Edit `workouts.js` and add to `workoutData`:
```javascript
{
  id: 36,
  name: "Your Exercise",
  muscle: "Target Area",
  difficulty: 3,
  xp: 50,
  goal: "12 Reps",
  isTimed: false,
  instructions: [...],
  tips: "Form tip here"
}
```

---

## 🚀 Future Enhancements

Potential additions:
- 📊 Charts & progress graphs
- 🏅 Leaderboards
- 🎬 Video exercise tutorials
- 👥 Social sharing
- 📱 PWA offline support
- 💾 Data export/import
- 🎵 Custom background music
- 🌙 Dark/light theme toggle

---

## 🐛 Troubleshooting

**"Sensors not available"**
- Check browser support for accelerometer
- Grant permission when prompted
- Some browsers require HTTPS for security

**Progress not saving**
- Ensure you're logged in (check "Welcome back" message)
- Clear browser cache and try again
- Check localStorage isn't disabled

**Audio not working**
- Grant microphone/audio permissions if prompted
- Check if audio is toggled ON in instructor panel
- Some browsers require user interaction first

**Exercises not displaying**
- Verify `workouts.js` is loaded (check browser console)
- Refresh the page
- Clear cache and reload

---

## 📄 Files Overview

```
├── index.html           # Main app interface
├── login.html          # User authentication
├── login.js            # Login logic
├── login.css           # Login styling
├── app.js              # Core game mechanics (600+ lines)
├── workouts.js         # Exercise database (35+ exercises)
├── features.js         # Achievements & audio system
├── instructor.js       # Text-to-speech instructor
├── style.css           # Complete UI styling (500+ lines)
├── manifest.json       # PWA manifest
├── sw.js               # Service Worker
├── README.md           # This file
└── AGENTS.md           # Development notes
```

---

## 🎯 Development Info

**Built with:**
- Vanilla JavaScript (no frameworks)
- CSS3 with animations & gradients
- Web Audio API for sound
- Device Motion API for step tracking
- LocalStorage for persistence

**Code Quality:**
- CSP-compliant (no inline scripts in HTML)
- Modular architecture
- Extensive comments and documentation
- Mobile-first responsive design
- Accessibility features (ARIA labels)

---

## 🤝 Contributing

To add features:
1. Add exercises to `workouts.js` with full instructions
2. Add achievements to `features.js`
3. Update styles in `style.css`
4. Test on mobile and desktop
5. Update this README with new features

---

## 📞 Support

Encountering issues? Check:
1. Browser console for errors (F12)
2. localStorage limits (clear old data if needed)
3. Login status - must be signed in
4. Cache - try refreshing with Ctrl+Shift+R

---

## 🎮 Start Your Quest!

**Ready to become a legend?** Sign in now and begin your fitness journey! Every rep counts. Every day matters. Every achievement brings you closer to becoming a true warrior.

⚔️ **"From Recruit to Legend in 100 Workouts"** ⚔️

---

**Version:** 2.0 Enhanced Edition  
**Last Updated:** April 2026  
**Creator:** Your Fitness AI  
**License:** MIT

*Transform your fitness journey. Master your body. Become legendary.*
- Keyboard navigable