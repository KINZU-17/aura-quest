# AGENTS.md - Local Development Guide

This project uses specialized command shortcuts via Kilo's local agent system.

## Available Commands

| Command | Description |
|---|---|
| **/serve** | Start local HTTP server on port 8000 |
| **/test** | Run comprehensive test suite (35 tests) |
| **/format** | Format code with Prettier (if configured) |
| **/audit** | Run code audit for bugs/security |

## Architecture Overview

The project uses vanilla JS in a modular pattern:
- `index.html` - Main HTML structure
- `style.css` - CSS with custom properties (neon theme)
- `app.js` - All game logic (264 lines)
- `workouts.js` - Exercise database (35 workouts)
- `test.js` - Comprehensive test suite
- `sw.js` - Service worker for PWA
- `manifest.json` - PWA configuration

## Local Development Workflow

1. **Start server**: `python3 -m http.server 8000`
2. **Open app**: Navigate to http://localhost:8000
3. **Run tests**: `node test.js`
4. **Check coverage**: All 35+ tests passing

## Kilo Config Paths

- **Commands**: `.kilo/command/*.md`
- **Agents**: `.kilo/agent/*.md`
- **Skills**: Built-in (kilo-config)

## Key Patterns

- State stored in `user` object, persisted to localStorage
- DOM elements cached on init for performance
- Event delegation for dynamic workout buttons
- CSP Content-Security-Policy enforced
- XSS prevention via HTML escaping
- PWA-ready with service worker
- Mobile-first responsive design
