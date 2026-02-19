# Collin Lucken — Academic Website

A clean, responsive static site ready for deployment on GitHub Pages.

## Quick Start

1. Create a GitHub repository named `yourusername.github.io`
2. Push this entire `website/` folder's contents to the repository
3. Enable GitHub Pages in Settings → Pages → Source: "Deploy from a branch" → Branch: main
4. Your site will be live at `https://yourusername.github.io`

## Before You Deploy — Checklist

Search the HTML files for `TODO` comments. Here's what needs your attention:

- [ ] **Headshot photo**: Add `assets/img/headshot.jpg` (recommended: 400×480px, JPG)
- [ ] **CV PDF**: Add `assets/Lucken_CV.pdf`
- [ ] **Google Scholar link**: Replace placeholder URL in `index.html` with your profile URL
- [ ] **PhilPeople link**: Replace placeholder URL in `index.html` with your profile URL
- [ ] **Publication abstracts**: Add abstracts for papers under review in `research.html`
- [ ] **Paper titles**: Verify all paper titles match your preferred citation format
- [ ] **Email address**: Confirm `clucken@bowdoin.edu` is correct across all pages

## Custom Domain (Optional)

To use `collin-lucken.com`:
1. Add a file named `CNAME` to the root with the content: `www.collin-lucken.com`
2. In your domain registrar, add a CNAME record pointing `www` to `yourusername.github.io`
3. GitHub will automatically provision HTTPS

## Updating Content

All content is in plain HTML. To update:
- **Add a publication**: Copy a `<div class="publication">...</div>` block in `research.html`
- **Add a news item**: Copy a `<li class="news-item">...</li>` block in `index.html`
- **Update CV**: Replace `assets/Lucken_CV.pdf`
- **Change courses**: Edit the course cards in `teaching.html`

## File Structure

```
website/
├── index.html          Home/About page
├── research.html       Research areas + publications
├── teaching.html       Teaching philosophy + courses
├── cv.html             Embedded CV display
├── css/style.css       All styles (light + dark mode)
├── js/main.js          Dark mode, mobile nav, interactions
├── assets/
│   ├── img/            Your photos (add headshot.jpg here)
│   └── Lucken_CV.pdf   Your CV (add PDF here)
└── README.md           This file
```

## Design

- **Colors**: Navy (#1a365d) + warm gold (#c9a96e) accent
- **Fonts**: Playfair Display (headings) + Inter (body) via Google Fonts
- **Features**: Dark/light mode toggle, responsive mobile layout, abstract expand/collapse
- **Dependencies**: None (vanilla HTML/CSS/JS, Google Fonts CDN only)
