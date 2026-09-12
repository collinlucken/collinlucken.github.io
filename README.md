# Collin Lucken — Academic Website

A clean, responsive static site for [collin-lucken.com](https://www.collin-lucken.com/), deployed on GitHub Pages.

Pages: home, research, teaching, [colligate](colligate/index.html), cv.

Colligate is the concept-mapping workspace at `/colligate/`. To refresh it from the [colligate](https://github.com/collinlucken/colligate) repo:

```bash
npm run build:site
rm -rf ../collinlucken.github.io/colligate
mkdir -p ../collinlucken.github.io/colligate
cp -a dist/. ../collinlucken.github.io/colligate/
```
