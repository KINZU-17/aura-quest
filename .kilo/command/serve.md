---
name: serve
description: Start local development server for AuraQuest
usage: /serve
---

Run a static HTTP server on port 8000 to preview the app.

```bash
# Python 3 (most portable)
python3 -m http.server 8000

# OR Node.js (if installed)
npx serve -p 8000
```

Then open http://localhost:8000 in your browser.
