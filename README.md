# goodgrid.nl

Personal website for goodgrid — freelance strategy to execution.

## Development

```bash
npm install
npm run dev
```

Opens a local dev server at `http://localhost:5173`.

## Build for production

```bash
npm run build
```

Creates a `dist/` folder with static files ready for deployment.

## Deploy

Copy the contents of `dist/` to your web server:

```bash
scp -r dist/* user@server:/var/www/goodgrid.nl/
```

Or use rsync for incremental updates:

```bash
rsync -avz --delete dist/ user@server:/var/www/goodgrid.nl/
```

## Analytics

The site uses [Umami](https://umami.is/) for privacy-friendly analytics with:

- **Scroll depth tracking** — 25%, 50%, 75%, 100%
- **Section visibility** — which sections visitors view
- **Click events** — CTA buttons, navigation, accordion interactions
- **`show-cv`** — when visitor opens the CV page
- **`print`** — when visitor prints any page (via browser print dialog)
- **`nexustrust-click`** — when visitor clicks the Nexus Trust logo

Custom tracking is implemented in `src/useAnalytics.js`.