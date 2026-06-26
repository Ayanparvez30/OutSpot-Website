# OutSpot Website

Single-page React (Vite) marketing landing page for the OutSpot app.

## Run

```bash
cd outspot-website
npm install
npm run dev      # local dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Structure

- `src/App.jsx` — the whole page (navbar + hero).
- `src/styles.css` — all styling (dark purple theme, gradient buttons).
- `public/icons/` — nav + logo icons, copied from the Flutter app's assets
  (`outspot/assets/svg`). Explore / Map / Camera / Challenges / Chat match the
  app's bottom-tab icons.
- `public/images/` — drop your hero artwork here (see that folder's README).

## Notes

- The navbar feature icons are the **app's own tab icons** for visual
  consistency.
- Hero phone mockups & 3D characters are loaded from `public/images/` and
  degrade gracefully if a file is missing, so the layout never breaks.
