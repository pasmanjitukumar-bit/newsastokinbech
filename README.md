# SastoKinBech demo

A responsive Nepali storefront built with HTML, CSS and JavaScript. Open `index.html` in a browser, or serve this directory with `python -m http.server 3000`.

Includes product search, category filters, cart quantities and removal, browser-local cart persistence, a demo sale countdown, and mobile layouts. Product imagery is loaded from Unsplash; fonts are loaded from Google Fonts and require internet access.

Click a product image or name to open its details at `/?product=1` (IDs 1–8). The home page's product-page button opens the first product. Detail pages include photo zoom views, category-appropriate sizes, sample color choices, quantity/stock checks, variant-aware local cart, delivery estimates, specifications, size charts, return terms and a reviews placeholder. Buy now opens the demo cart summary, not a real checkout. Call/WhatsApp remain disabled until genuine seller contact details are supplied.

To serve this experience at `https://product.sastokinbech.com/`, deploy all HTML/CSS/JS files to a static host and configure that subdomain in the hosting provider and DNS. The corresponding product URL will be `https://product.sastokinbech.com/?product=1`. No DNS or remote hosting changes have been made. Photos are sample images; thumbnails are zoom views of the same photo, not additional actual product photos. The UI labels seller, stock, delivery and policy content as demo data.

All products, prices, reviews, delivery claims, return claims, contact details and discounts are sample content. This demo does not authenticate users, place orders or process payments. Replace sample information and connect a backend before using as a live store.
