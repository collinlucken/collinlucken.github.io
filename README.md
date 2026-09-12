# Collin Lucken — Academic Website

A clean, responsive static site for [collin-lucken.com](https://www.collin-lucken.com/), deployed on GitHub Pages.

Pages: home, research, teaching, [colligate](colligate/), cv.

Colligate is the concept-mapping workspace. The project page is `/colligate/`; the app is the production build at `/colligate/workspace/`. To refresh the app from the [colligate](https://github.com/collinlucken/colligate) repo:

```bash
npm run build:site
rm -rf ../collinlucken.github.io/colligate/workspace
cp -a dist/. ../collinlucken.github.io/colligate/workspace/
```
