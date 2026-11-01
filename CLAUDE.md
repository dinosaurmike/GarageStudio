# Garage Studio: guide for contributors and AI coding assistants

Garage Studio (the "AR Organizer" on the author's profile) is a garage-shelving designer by Mike Warren
([dinosaurmike](https://github.com/dinosaurmike)): parametric lumber shelving with structural connectors in 3D,
a live load estimate, a materials list, an assembly PDF and WebXR AR placement. Live at
<https://dinomike.ca/GarageStudio/>. All rights reserved (see `LICENSE`).

## What this repository contains

* **The built app only** (a Vite production build): `index.html` (markup, HUD and modals),
  `assets/index-gs1.js` (Three.js, the parametric model, structural calculation, BOM, PDF, AR) and
  `assets/index-<hash>.css`. The original source project is not here yet; when it is added, update this file.
* `models/`: optional manufacturer STL files (not included; see `models/README.md`). The app requests them by
  file name and draws simplified parts when they're missing (the 404s in the console are expected).
* `qr_code.png`: shown on desktop to continue on a phone; it encodes https://dinomike.ca/GarageStudio/.
* `docs/images/`: README header GIF and social preview, with `source/record.js` (Playwright, key states with
  hold times for an ffmpeg concat) and `source/social-preview.html`.

## Changes made to the original build (keep them)

The original build was branded as a manufacturer's studio. For this personal, public version:
* the name is **Garage Studio** (tab title, header subtitle "Structural hardware");
* the third ordering tab is **"Pro Dealer (demo)"** (it was presented as a manufacturer's direct EDI channel);
* load wording is **"estimated"**, never "certified" (UI, tooltips, toasts and the PDF);
* retailer loyalty-program names and "IKEA-style" were removed from labels;
* the bundle file was renamed from `index-BN-Esm9o.js` to `index-gs1.js` (so browsers fetch the new one);
* `qr_code.png` pointed at a local development server (192.168.1.223:5173); it now points at the live app.

Product names and part numbers (connectors, screws, anchors, retailers) stay as plain references; the README
says the project is not affiliated with their owners. Don't reintroduce manufacturer branding, certification
claims or the manufacturer's CAD files.

## Ground rules

* No API keys or accounts; all data (prices, aisles, discounts) is built-in sample data.
* Load numbers are a design aid. Keep the README's disclaimer.
* Paths are relative (`./assets/...`, `./models/...`), so the app runs from any folder; on dinomike.ca it lives
  at `/GarageStudio/` (redirects for lowercase paths are in the website's `_redirects`).
