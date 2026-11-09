# Escape artists

A React + D3 recreation of The Economist's barplot *Escape artists: Number of laboratory-acquired
infections, 1970–2021*. It's the Scales module project from the
[D3 ❤️ React course](https://www.react-graph-gallery.com/react-d3-dataviz-course).

Live: <https://j-sirgo.github.io/economist-barplot/>

D3 does only the math (`scaleBand`, `scaleLinear`, `ticks`). React renders every SVG element.

Data sources: Laboratory-Acquired Infection Database; American Biological Safety Association.

## Run locally

```
npm install
npm run dev
```

## Deploy

```
npm run deploy
```

This builds the site and publishes `dist/` to the `gh-pages` branch.
