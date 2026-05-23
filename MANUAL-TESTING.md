# 🧪 AURAQUEST - Manual Testing Guide

## Pre-Testing Setup

```bash
cd /home/james-nzuki/development/PERSONAL-PROJECTS/WORKING-ON/AURA-QUEST
python3 -m http.server 8000
```

Open browser to: http://localhost:8000/login.html

---

## Test Suite (19 Checks)

### 1. ✅ Server Start
- [ ] `python3 -m http.server 8000` runs without errors
- [ ] No port conflicts on 8000
- [ ] Terminal shows "Serving HTTP on 0.0.0.0 port 8000"

---

### 2. ✅ Account Creation (Sign Up)
- [ ] Click "Create Account" link
- [ ] Enter email: `test@example.com`
- [ ] Enter username: `TestUser`
- [ ] Enter password: `test123` (6+ chars)
- [ ] Confirm password: `test123`
- [ ] Click "CREATE ACCOUNT"
- [ ] Expect: Success alert, redirect to index.html
- [ ] Verify: Welcome banner shows "TestUser"

---

### 3. ✅ Login
- [ ] Click "Logout" button (if logged in)
- [ ] Enter username: `TestUser`
- [ ] Enter password: `test123`
- [ ] Click "LOGIN"
- [ ] Expect: "Access Granted!" alert, redirect to dashboard
- [ ] Verify: Welcome back message appears

---

### 4. ✅ Theme Toggle (Dark/Light)
- [ ] Locate theme toggle button in header (🌙/☀️)
- [ ] Click to switch from dark to light
- [ ] Verify: Background becomes light, text darkens
- [ ] Verify: Accent colors remain visible (purple/cyan)
- [ ] Click again to return to dark
- [ ] Refresh page - theme should persist
- [ ] Logout and login again - theme persists per user

---

### 5. ✅ Complete Timed Workout (Plank Jacks - 45s)
- [ ] Click "Plank Jacks" card
- [ ] Instructions modal opens
- [ ] Click "BEGIN WORKOUT"
- [ ] Timer modal appears, counts down from 45
- [ ] Audio instructor speaks (if enabled)
- [ ] After 45s: Modal closes
- [ ] XP awarded (+45 XP)
- [ ] Entry appears in "Recent Glory" history
- [ ] Stats update: Total Workouts = 1

---

### 6. ✅ Complete Rep-Based Workout (Diamond Pushups)
- [ ] Click "Diamond Pushups" card
- [ ] Instructions modal opens with steps
- [ ] Click "BEGIN WORKOUT"
- [ ] XP awarded immediately (+50 XP)
- [ ] History updates
- [ ] Stats update

---

### 7. ✅ Level-Up Verification
- [ ] Complete enough workouts to reach 100 XP (default start)
- [ ] Expect: Level-Up notification appears
- [ ] Verify: Level number increments (Level 2)
- [ ] Verify: XP bar resets and starts filling again
- [ ] Verify: Rank updates at level 5 (Squire)

---

### 8. ✅ Progress Chart (Chart.js)
- [ ] Scroll down below stats panel
- [ ] Line chart visible showing XP per workout
- [ ] X-axis: workout times, Y-axis: XP earned
- [ ] Chart displays cyan line with gradient fill
- [ ] Theme-aware: chart colors invert on light mode
- [ ] Complete another workout - chart updates
- [ ] With 0 workouts: "Complete workouts to see chart" message

---

### 9. ✅ Leaderboard
- [ ] Click 🏆 button in header
- [ ] Modal opens: "Leaderboard" title
- [ ] List of all users appears (if multiple accounts exist)
- [ ] Columns: Rank, Username, Level, Workouts, Streak
- [ ] Current user highlighted with cyan border
- [ ] Sorted by Level DESC, then XP DESC
- [ ] Click outside modal or X to close

---

### 10. ✅ YouTube Tutorials
- [ ] Open any workout instructions (e.g., "Dragon Flags")
- [ ] Scroll to bottom of modal
- [ ] Click "🎬 Watch Tutorial" link
- [ ] New tab opens with YouTube search results
- [ ] Search query: "[Exercise Name] exercise technique"
- [ ] Close tab, repeat for different exercise

---

### 11. ✅ Social Sharing
- [ ] Scroll to bottom of dashboard
- [ ] Locate "Share Your AuraQuest Progress" panel
- [ ] Click Twitter (𝕏) button
- [ ] New tab opens with pre-filled tweet
- [ ] Verify: tweet includes level, XP, streak, and link
- [ ] Close tab, click Facebook (f) button
- [ ] Verify: Facebook share dialog opens
- [ ] Click LinkedIn (in) button - share dialog opens
- [ ] Click 📋 (copy) button
- [ ] Verify: button shows ✓ briefly
- [ ] Paste in notepad - confirms progress text copied

---

### 12. ✅ CSV Export
- [ ] Click "💾 Export Workout History (CSV)" button
- [ ] File downloads: `AuraQuest_workouts_YYYY-MM-DD.csv`
- [ ] Open CSV in text editor or spreadsheet
- [ ] Verify columns: Workout, XP, Time
- [ ] Verify each workout history entry appears
- [ ] Check quotes are properly escaped for multi-word names

---

### 13. ✅ Background Music
- [ ] Click 🔇 button in header (initially off)
- [ ] Music starts playing (royalty-free track)
- [ ] Button changes to 🔊
- [ ] Click again - music pauses, button = 🔇
- [ ] Refresh page - music setting persists (but doesn't autoplay due to browser policy)
- [ ] Start a workout timer - music auto-pauses
- [ ] Complete workout - music remains paused

---

### 14. ✅ Seasonal Challenge
- [ ] Dashboard top shows seasonal challenge card
- [ ] Displays: Season name, XP reward, progress bar
- [ ] Progress updates automatically as you meet criteria
- [ ] On completion: notification appears, XP bonus added
- [ ] Challenge resets on season change (simulate by changing system date or wait for next season)

---

### 15. ✅ Personal Records (Timed Exercises)
- [ ] Complete a timed exercise (e.g., Plank Hold 30s)
- [ ] Complete again with longer time (e.g., 35s)
- [ ] Notification: "Personal Record: Plank Hold - 35s!"
- [ ] Scroll to "🏆 Personal Bests (Timed)" section
- [ ] Verify: Exercise name and best duration listed
- [ ] Beat record again - updates in real-time

---

### 16. ✅ Logout & Persistence
- [ ] Click "Logout" button
- [ ] Redirect to login.html
- [ ] Session cleared, welcome banner gone
- [ ] Login again with same credentials
- [ ] Verify: All progress restored (level, XP, history, settings)
- [ ] Theme preference preserved
- [ ] Music preference preserved
- [ ] Stats, chart, records all intact

---

### 17. ✅ Offline Mode (PWA)
- [ ] Ensure page loaded at least once with network
- [ ] Open DevTools → Network tab
- [ ] Check "Offline" checkbox (throttle)
- [ ] Refresh page
- [ ] Expect: App still loads (service worker cache)
- [ ] Navigate to unknown page → offline.html displays
- [ ] Uncheck Offline, refresh → back online

---

### 18. ✅ Mobile Responsiveness
- [ ] Open DevTools → Toggle device toolbar (mobile view)
- [ ] Test at 375px width (iPhone SE)
- [ ] Test at 768px width (iPad)
- [ ] Verify: Buttons are touch-friendly (44px+)
- [ ] Verify: Text remains readable
- [ ] Verify: No horizontal scrolling
- [ ] Verify: Leaderboard modal fits screen
- [ ] Verify: Theme toggle accessible

---

### 19. ✅ Audio Instructor (Optional)
- [ ] Click instructor button (🔇 OFF) in header
- [ ] Toggle to 🔊 ON
- [ ] Adjust voice type (Male/Female)
- [ ] Adjust volume slider (0-100%)
- [ ] Adjust speed slider (0.5x-2.0x)
- [ ] Start a workout - instructor speaks guidance
- [ ] Verify: TTS plays clearly without distortion

---

### 20. ✅ User Rating System
- [ ] Click ⭐ button in header
- [ ] Modal opens with 5 stars
- [ ] Hover over stars: they light up (★)
- [ ] Click 4 stars: they stay filled (★)
- [ ] Submit button becomes enabled
- [ ] Click Submit: confirmation notification appears
- [ ] Modal closes
- [ ] Click ⭐ again: modal opens showing your selected rating
- [ ] Button tooltip shows updated average ("X.X/5, Y ratings")
- [ ] Logout, login with different account: can rate separately
- [ ] Average rating updates accurately across all users

---

## Expected Results Summary

| Feature | Expected Behavior |
|---|---|
| Theme Toggle | Instant switch, persists across sessions |
| Workouts | XP awarded, history updates, stats refresh |
| Chart | Line graph shows XP trend, updates after each workout |
| Leaderboard | Shows all users, current user highlighted |
| YouTube Links | Opens search in new tab |
| Social Share | Pre-filled messages, new tabs open |
| CSV Export | .csv file downloads with correct data |
| Background Music | Plays/pauses, persists preference |
| Seasonal Challenge | Progress bar fills, rewards on completion |
| Personal Records | Updates on beating timed exercise best |
| Rating | Users rate 1-5 stars, average displayed, one per account |
| Offline | App loads from cache, offline.html on navigation failure |
| Mobile | All features accessible, no layout breaks |

---

## Known Limitations

1. **Music Source** - Default track from SoundHelix; replace URL in `app.js:926` for custom playlist
2. **YouTube Links** - Opens search results, not specific videos
3. **Offline** - First load requires internet; subsequent loads work offline
4. **Date Mocking** - Test suite uses fixed date "2026-04-24"; real-time features use current date

---

## Quick Health Check

Run automated tests:
```bash
node test.js
# Should show: 35 passed, 0 failed ✅
```

Start server:
```bash
python3 -m http.server 8000
# Should show no errors ✅
```

---

**All systems go!** ⚔️
