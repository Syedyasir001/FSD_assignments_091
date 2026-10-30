# BCA Website Replica

A responsive replica of the RV University BCA department website, built with **React + Vite**.

## Features

- Sticky navigation with mobile menu and scroll progress bar
- Hero carousel (Swiper) and animated section reveals (AOS)
- Programs, Vision & Mission, HOD message, Faculty grid with profile modals
- Labs, Research, Placements, Recruiters, Achievements, Gallery with lightbox
- Events, Downloads, Contact form, Back-to-top button
- `index_static.html` — standalone single-file version of the whole site

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Project structure

```
index.html            Vite entry
src/                  React app (components, data, styles)
public/assets/        Images served by Vite
assets/               Image sources used by the static page
index_static.html     Single-file static version
script.js / style.css Styles for the static version
```
