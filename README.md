# Tam & Jenn — Wedding Website

A private, mobile-first wedding website for **Tam & Jenn**, celebrating on **28 March 2027 at Mikazuki Resorts, Đà Nẵng, Vietnam**.

> **For non-technical edits**, see [EDITORS_GUIDE.md](EDITORS_GUIDE.md) — it covers everything the couple can change without touching code.
> This README is for the person running or deploying the site.

---

## ⚡ Quick start

```bash
# install dependencies
npm install

# start the local dev server (http://localhost:5173)
npm run dev

# build for production (output lands in /dist)
npm run build

# preview the production build locally
npm run preview
```

That's it — the site is a static Vite + React app, no backend, no database.

---

## 🛠 Tech stack

| Piece            | Choice                                             | Why                                                    |
| ---------------- | -------------------------------------------------- | ------------------------------------------------------ |
| Build tool       | **Vite 6**                                         | Fast HMR, simple config, modern bundle                 |
| UI               | **React 18** + **React Router 6**                  | Familiar, small bundle, easy to share components       |
| Animations       | **Framer Motion**                                  | Declarative scroll reveals, respects reduced-motion    |
| Dates            | **date-fns** (light) + native `Date`               | For the countdown + .ics file generation               |
| RSVP backend     | **EmailJS** (free tier)                            | Form data → email, no server required                  |
| Hosting          | Anywhere static (Netlify / Vercel / GitHub Pages)  | Pure static output                                     |
| Styling          | Plain CSS with CSS variables                       | Editable theme tokens, no framework lock-in            |

---

## 📁 Project structure

```
wedding-website/
├── public/                  # static assets served at site root
│   ├── images/              # site-wide images (hero, venue card, etc.)
│   ├── venue/               # photos for the Venue carousel
│   ├── dress-code/          # sample-look photos
│   ├── gallery/             # pre-wedding photos
│   ├── favicon.svg
│   └── robots.txt           # currently Disallow:/ — site stays unindexed
├── src/
│   ├── config.js            # 🟢 SINGLE SOURCE OF TRUTH for all content
│   ├── main.jsx             # React entry
│   ├── App.jsx              # Router + global layout (Nav, Footer, BackToTop)
│   ├── components/
│   │   ├── Nav.jsx          # frosted-glass desktop nav + mobile hamburger overlay
│   │   ├── Footer.jsx
│   │   ├── BackToTop.jsx    # in-flow up-arrow above the footer
│   │   ├── ScrollProgress.jsx
│   │   ├── SectionHeader.jsx
│   │   ├── Countdown.jsx
│   │   ├── Reveal.jsx       # Framer Motion scroll-fade wrapper
│   │   ├── Placeholder.jsx  # leaf-watermark fallback when an image isn't set
│   │   ├── PageGate.jsx     # "Coming soon" wrapper, gated by config.pages.*
│   │   ├── AddToCalendar.jsx
│   │   ├── PhotoCarousel.jsx
│   │   └── Lightbox.jsx     # shared full-screen photo viewer
│   ├── pages/
│   │   ├── Landing.jsx      # animated envelope entry page
│   │   ├── Home.jsx         # single-scroll overview with previews
│   │   ├── Venue.jsx
│   │   ├── Travel.jsx
│   │   ├── Timeline.jsx
│   │   ├── DressCode.jsx
│   │   ├── Gallery.jsx
│   │   ├── Reminders.jsx
│   │   ├── GuestList.jsx    # the Entourage page (legacy filename)
│   │   ├── Registry.jsx
│   │   └── RSVP.jsx
│   ├── hooks/
│   │   ├── useTheme.js      # applies config.theme at runtime (CSS vars + Google Fonts)
│   │   └── useCountdown.js
│   └── styles/
│       ├── tokens.css       # design tokens (colors, type scale, spacing, motion)
│       └── global.css
├── index.html
├── vite.config.js
├── package.json
└── EDITORS_GUIDE.md         # plain-English content guide for the couple
```

### Configuration is gitignored

`src/config.js` is intentionally in `.gitignore` — it holds personal details (names, addresses, guest list, etc.) and shouldn't be committed to a public repo. If you're cloning this fresh, you'll need to write your own `config.js` matching the shape described in [EDITORS_GUIDE.md](EDITORS_GUIDE.md).

---

## ✏️ Editing content

**99% of edits happen in [`src/config.js`](src/config.js)** — every page reads from it.

- Names, dates, venue → `couple`, `wedding`, `venue`
- Photos → drop files in `/public/{folder}/` then reference paths in config
- Toggle pages on/off → `pages` object (each key is `true`/`false`)
- Entourage (guest list) → `entourage` array of role rows
- Hotels → `accommodations` array (add as many as you want)
- Dress code palette → `dressCode.palette` (any number of colors)
- Reminders → `reminders` array
- Registry → `registry` block + drop a QR image in `/public/images/`

See [EDITORS_GUIDE.md](EDITORS_GUIDE.md) for step-by-step instructions with examples.

---

## 📧 Setting up RSVP (EmailJS)

The RSVP form on `/rsvp` ships in **demo mode** — submissions show the success state but don't send anything. To wire up real emails:

1. **Create an EmailJS account** at [emailjs.com](https://www.emailjs.com) (free tier: 200 emails/month).

2. **Add an email service**
   Dashboard → Email Services → Add New Service → pick Gmail / Outlook / etc. → connect.
   Note the **Service ID** (looks like `service_abc1234`).

3. **Create a template**
   Dashboard → Email Templates → Create New Template.
   Use these variables in the template body (these are exactly what the form sends):

   ```
   From: {{user_name}} <{{user_email}}>

   Subject: New RSVP — {{user_name}} ({{attending}})

   Reply-to: {{reply_to}}

   ── Reply Details ──
   Name:         {{user_name}}
   Email:        {{user_email}}
   Attending:    {{attending}}
   Kids:         {{kids}}
   Dietary:      {{dietary}}
   Song request: {{song}}
   Message:      {{message}}

   Update?       {{is_update}}
   ```

   Note the **Template ID** (looks like `template_xyz5678`).

4. **Grab your Public Key**
   Dashboard → Account → API Keys → Public Key.

5. **Paste them into `src/config.js`**
   ```js
   rsvp: {
     emailjsServiceId:  'service_abc1234',
     emailjsTemplateId: 'template_xyz5678',
     emailjsPublicKey:  'YOUR_PUBLIC_KEY',
     recipientEmail:    'tam.and.jenn@example.com',
   },
   ```

6. **Test it** — fill out the form on `/rsvp`. You should receive an email within seconds.

The RSVP form also persists each guest's last reply to `localStorage` so they can come back and update it — your inbox will receive a separate email tagged `is_update: Yes — this replaces an earlier reply`.

---

## 🚀 Deployment

### Netlify (recommended — easiest)

1. Push the repo to GitHub.
2. On [netlify.com](https://app.netlify.com): **New site from Git** → pick your repo.
3. Build settings (Netlify auto-detects these from `vite.config.js`):
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Click **Deploy site**.

For a custom domain (e.g. `tamandjenn.com`): Site settings → Domain management → Add custom domain → follow DNS instructions.

### Vercel

1. Push to GitHub.
2. On [vercel.com](https://vercel.com): **New Project** → import the repo.
3. Vercel auto-detects Vite — no extra config needed.
4. Click **Deploy**.

### GitHub Pages

GitHub Pages serves static files but doesn't handle the SPA router automatically. Use a deploy script that copies `dist/index.html` to `dist/404.html` so client-side routing works:

```bash
npm run build
cp dist/index.html dist/404.html
# then push dist/ to a gh-pages branch (gh-pages npm package handles this)
```

---

## 🔒 Keeping the site private until launch

The site already ships `meta robots="noindex,nofollow"` and a `Disallow: /` `robots.txt`. Search engines won't index it.

For an extra layer (real auth) before launch, use:
- **Netlify**: Site settings → Build & deploy → Password protection (Pro plan)
- **Vercel**: Project settings → Deployment Protection (Pro plan)
- **Cloudflare Access** in front of any host (free tier covers a small site)

The **Entourage page** has its own shared-password gate (`config.guestListPassword`) for the entourage list, regardless of host-level auth.

---

## 🎨 Customizing the look

The whole design system is driven by `config.theme`:

```js
theme: {
  colors: {
    beige: '#F5EFE6',
    sage:  '#8FAF8B',
    sky:   '#A8C9DC',
    navy:  '#1E3A5F',
    gold:  '#C9A96E',
    text:  '#3A3A3A',
  },
  fonts: {
    display: { name: 'Cormorant Garamond', weights: '400;500;600;700' },
    body:    { name: 'DM Sans',            weights: '400;500;600;700' },
    script:  { name: 'Great Vibes',        weights: '400' },
  },
}
```

Change any hex → site-wide background, accent, button, gradient color updates.
Change any font `name` to any [Google Fonts](https://fonts.google.com) family — it's loaded automatically at runtime, no `index.html` edit needed.

---

## 📜 Scripts

| Script            | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Local dev server with hot module reload       |
| `npm run build`   | Production build into `dist/`                 |
| `npm run preview` | Serve the production build locally to verify  |

---

## ✅ Browser support

Targets modern evergreen browsers (Chrome / Safari / Firefox / Edge). Mobile-first: 375px-up. Includes:
- `prefers-reduced-motion` handling (animations gated)
- WCAG-AA contrast on primary palette
- Touch-friendly hit areas (≥44×44px)
- Keyboard navigation across nav, lightbox, password gate, RSVP

---

## 📝 License

Private project, all rights reserved. Built with love for Tam & Jenn. 💛
