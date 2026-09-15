# Uttarakhand Explorer

An interactive travel itinerary and destination explorer for six stops across
Uttarakhand — Haridwar, Rishikesh, Dehradun, Tehri Garhwal, Chopta and Auli.

Built with React, Vite, Tailwind CSS, React Router and Leaflet (via
react-leaflet).

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview   # serves the production build locally
```

## Project structure

```
src/
  data/
    destinations.js   # all destination content: hotels, cuisine, attractions...
    packages.js        # tour packages + day-by-day itineraries
  context/
    ItineraryContext.jsx   # "Plan My Trip" state, persisted to localStorage
  utils/
    search.js          # flattens all data into one searchable index
  components/           # reusable UI: Navbar, Footer, MapView, cards, etc.
  pages/                 # one file per route
  App.jsx                # router + layout
  main.jsx               # entry point
```

## Where to plug in real content

Everything shown on the site is driven from `src/data/destinations.js` and
`src/data/packages.js` — no content is hard-coded inside components. To swap
in real photography, prices, hotel names, etc., edit those two files only;
every page and card pulls from them automatically.

Image URLs currently point to Unsplash placeholders. Replace `image`,
`gallery`, and any per-item `image` fields with your own hosted assets when
ready.

## Key interactive features

- **Interactive map** (`/map`): Leaflet map with custom glowing markers per
  destination, a route line connecting them in order, hover-to-preview and
  click-to-open a full detail panel, plus a destination list and journey
  stats panel.
- **Itinerary builder** (`/itinerary`): add/remove/reorder destinations
  (drag-and-drop or up/down buttons), persisted automatically to
  `localStorage` under the key `uttarakhand-explorer:itinerary`.
- **Global search**: click the search icon in the navbar to search
  destinations, hotels, attractions, activities, cuisine and packages in one
  place.
- **Gallery** (`/gallery`): category-filterable grid with a fullscreen
  lightbox viewer.

## Notes

- No backend, booking flow, or payment integration is included by design —
  all prices and hotel details are placeholder content structured so they're
  easy to replace later.
- The map's distance figures (in the itinerary builder and map overview) are
  rough straight-line/road estimates for display purposes, not routed
  directions.
