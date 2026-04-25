## Architecture Overview

The project uses vanilla JS in a modular pattern with mandatory account-based access:

### Entry Points
- `login.html` - **ONLY** entry point (signup/login required)
- `index.html` - Main game dashboard (auto-redirects to login if no session)

### Supporting Files
- `style.css` - Game UI styles (neon theme, responsive)
- `login.css` - Login page styles (glassmorphism)
- `app.js` - Game logic (445 lines, account-enforced)
- `login.js` - Authentication flow (173 lines)
- `workouts.js` - 36 exercises with instructions
- `instructor.js` - Audio instructor TTS
- `test.js` - Comprehensive test suite
- `sw.js` - Service worker for PWA
- `manifest.json` - PWA configuration

## Local Development Workflow

### Using Login System (REQUIRED)
1. **Start server**: `python3 -m http.server 8000`
2. **Open login page**: http://localhost:8000/login.html
3. **Create account or login** - both require valid credentials
4. **Play**: Redirected to AuraQuest dashboard

### Testing
5. **Run tests**: `node test.js`
6. **All 35 tests pass** ✅

## ⚠️ MANDATORY ACCOUNT SYSTEM

**No guest access is allowed.** All users must create an account to use AuraQuest.

### Authentication Flow

1. **Visit login.html** → Only entry point
2. **Sign Up** or **Login**:
   - Email + Username + Password (6+ chars)
   - Session saved to localStorage under `activeSession`
   - Progress stored under `auraQuest_<username>`
3. **Redirect to index.html** → Welcome banner shows username
4. **Play** → All progress auto-saved

### Data Isolation

Each user gets isolated storage:
```
localStorage.users = [...all accounts...]
localStorage.activeSession = { username, email, loggedInAt }
localStorage.auraQuest_<username> = { level, xp, progress... }
```

### Logout

Logout button (top-right) clears `activeSession` and redirects to login page. Your progress remains saved under your username.

## Key Features

- **Account-Required Access** - No anonymous usage
- **Multi-user Support** - Isolated progress per account
- **Audio Instructor** - 36 workouts with voice guidance
- **RPG Progression** - 6 ranks (Recruit → Legend)
- **35+ Exercises** - Full instructions & tips
- **PWA Ready** - Offline-capable
- **Responsive** - Mobile-first design