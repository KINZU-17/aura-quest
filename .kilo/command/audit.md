---
name: audit
ndescription: Run code audit for bugs and security issues
usage: /audit
---

Performs static analysis to identify:
- XSS vulnerabilities (innerHTML usage)
- Error handling gaps (try-catch coverage)
- Type coercion issues
- localStorage data corruption risks
- Mobile permission handling
- Accessibility violations

This is a manual review - no automated tool configured.
See /test for automated test coverage.
