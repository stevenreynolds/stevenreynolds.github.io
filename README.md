# stevenreynolds.com

Personal portfolio for Steven Reynolds — Product Owner, Design Lead, UI/UX, Front-end Developer. Deployed via GitHub Pages.

## Dev

```bash
npm run dev   # http://localhost:8000
```

No build step. The site is a static HTML + React (Babel standalone) app.

## Structure

```
index.html              # entry point + boot splash
assets/
  css/
    site-styles.css     # base reset + shared utilities
    studio.css          # Studio theme styles
    extracted-styles.css  # legacy (used by old/ archive)
    tailwind-output.css   # legacy (used by old/ archive)
  js/
    data.jsx            # all site copy and career data
    sr-logo.jsx         # animated SVG logo component
    studio.jsx          # Studio layout (hero, about, work, skills, contact)
    cursor.jsx          # shared utility hooks
    app.jsx             # app shell (locked settings)
  img/
    steven-hero.jpg     # hero portrait
old/                    # archived previous site (fullpage.js / Kube CSS)
```

## Contact

hello@stevenreynolds.com
