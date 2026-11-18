# Hershey Beer Website

Website for Hershey Beer, a beer distributor at 659 E. Main Street in Hummelstown, PA.

**Live site:** https://hersheybeer.netlify.app

## Features

- **3D top sellers slider** with product photos that spin in the direction you click, a background that changes per product, and floating limes, ice and hops. Works with swipes on phones.
- **Seasonal letter board and announcement bar** that switch on their own through the year (Thanksgiving, Christmas, 4th of July, Super Bowl and more), with holiday hours support.
- **Live open/closed status** based on store hours in Eastern time.
- **21+ age check** pop-up that remembers the visitor's answer.
- **Giveaway winners board** with Polaroid-style photos and a lightbox.
- Pack size picker, Mix-A-Six builder, reviews, hours and location.
- Terms & Conditions and Privacy Policy pages.
- Local business info for Google (schema.org), sitemap and robots.txt.
- Security headers (Content Security Policy, HSTS, no framing) through Netlify's `_headers` file.

## Tech

Plain HTML, CSS and JavaScript. No frameworks and no build step. Hosted on Netlify.

## Files

| Path | What it is |
|---|---|
| `index.html` | Homepage |
| `js/site.js` | All page scripts. Holiday hours and the seasonal calendar are near the top. |
| `terms.html`, `privacy.html`, `legal.css` | Legal pages |
| `_headers` | Netlify security headers |
| `photos/` | Storefront, giveaway winners and product cut-outs |

## Editing

- **Holiday hours:** add dates to `SPECIAL_HOURS` in `js/site.js`.
- **Preview a season:** add `#season-12-20` (any month-day) to the end of the URL.
- **Deploy:** upload the folder (or a zip of it) on the site's Deploys page in Netlify.

Product names and photos belong to their brands and are shown to represent products sold in store.
