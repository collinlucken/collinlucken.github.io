# Collin Lucken — Academic Website

A clean, responsive static site for [collin-lucken.com](https://www.collin-lucken.com/), deployed on GitHub Pages.

Pages: home, research, teaching, [colligate](colligate.html), cv.

Colligate is the concept-mapping workspace at `colligate.html`. To refresh it from the [colligate](https://github.com/collinlucken/colligate) repo:

```bash
npm run build:site
cp dist/index.html ../collinlucken.github.io/colligate.html
rm -rf ../collinlucken.github.io/colligate-app
mkdir -p ../collinlucken.github.io/colligate-app
cp -a dist/assets ../collinlucken.github.io/colligate-app/assets
```
