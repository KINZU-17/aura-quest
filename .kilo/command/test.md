---
name: test
ndescription: Run the full test suite for AuraQuest
usage: /test
---

Executes the comprehensive test suite for core game logic, state management,
and edge cases.

```bash
node test.js
```

Tests cover:
- Default state initialization
- JSON parse/save error handling (malformed data, quota limits)
- Streak calculation (consecutive days, resets, same-day)
- Rank progression (Recruit → Legend)
- XP level-up (single and multi-level jumps)
- Activity completion (XP, history capping at 5)
- HTML escaping (XSS prevention)
- Step detection threshold validation
- XP percentage calculations
- Workout database integrity

All 35 tests must pass before production deploy.
