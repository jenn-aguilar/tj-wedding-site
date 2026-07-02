# Tam & Jenn — Editors Guide

Hi! 💛 This guide is written for **you**, not a developer. No coding knowledge needed.

## The one file you'll edit

Everything on your website — names, dates, photos, the entourage, reminders, dress code, hotels, everything — lives in **one file**:

```
src/config.js
```

Open it in any text editor (VS Code, Sublime, Notepad, even TextEdit). Make a change, save it, and the website updates.

### Two golden rules

1. **Keep the quotes and commas.** The structure is:
   ```js
   keyName: 'Your text here',
   ```
   Don't delete the `'` quotes around text, or the `,` comma at the end of a line.
2. **When in doubt, copy-paste** an existing line and edit it. Match the format.

If you break something, the site will show a blank page and the dev preview will show an error. Undo your last change and you're back to normal.

---

## Table of contents

1. [Common edits](#common-edits)
2. [Adding photos](#adding-photos)
3. [Editing the entourage](#editing-the-entourage)
4. [Editing the hotel list](#editing-the-hotel-list)
5. [Editing reminders](#editing-reminders)
6. [Editing the dress code](#editing-the-dress-code)
7. [Editing the registry](#editing-the-registry)
8. [Turning a whole page on/off](#turning-a-whole-page-onoff)
9. [Adding the YouTube video tour](#adding-the-youtube-video-tour)
10. [Adding the Spotify playlist](#adding-the-spotify-playlist)
11. [Adding the QR code (registry)](#adding-the-qr-code-registry)
12. [Setting up RSVP emails](#setting-up-rsvp-emails)
13. [Changing colors and fonts](#changing-colors-and-fonts)
14. [Publishing your changes](#publishing-your-changes)
15. [Help — something broke](#help--something-broke)

---

## Common edits

### Change the couple's names

Find the `couple` block (near the top of `config.js`):

```js
couple: {
  name1: 'Tam',
  name2: 'Jenn',
  displayName: 'Tam & Jenn',
  hashtag: '#TamAndJenn2027',
},
```

### Change the wedding date

```js
wedding: {
  date: '2027-03-28',            // ← keep this format: YYYY-MM-DD
  displayDate: '28th March 2027',
  displayDay: 'Sunday',
  time: '4:00 PM (GMT+7)',
  rsvpDeadline: '2027-02-14',
  rsvpDeadlineDisplay: '28th January 2027',
  // ...
}
```

The `date` field powers the countdown on the homepage. The others are what guests actually see.

### Change the venue

```js
venue: {
  name: 'Mikazuki Resorts Da Nang',
  address: 'Nguyễn Tất Thành, Hải Vân, Đà Nẵng 55000, Vietnam',
  googleMapsUrl: 'https://maps.app.goo.gl/...',     // share link from Google Maps
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=...',  // embed iframe src
  description: 'A stunning beachside resort...',
  websiteUrl: 'https://mikazuki.com.vn/en/',
}
```

> **Tip — finding the Google Maps embed URL**
> Open Google Maps → find your venue → Share → **Embed a map** → copy the long URL inside `src="..."` (just the URL, not the whole `<iframe>` tag).

---

## Adding photos

All photos live in the `public/` folder. **Drop your photo in there**, then **reference its path** in `config.js`.

### Where photos go

| Photo type                       | Folder to drop file in        | Where it appears                             |
| -------------------------------- | ----------------------------- | -------------------------------------------- |
| Home page hero background        | `/public/images/`             | Behind "Save the Date" on the homepage       |
| Welcome blurb image              | `/public/images/`             | Inside the Welcome section on homepage       |
| Home Venue card photo            | `/public/images/`             | The venue preview card on homepage           |
| Home Travel card photo           | `/public/images/`             | The travel preview card on homepage          |
| Venue page hero                  | `/public/images/`             | Full-bleed hero at top of /venue             |
| Venue carousel photos            | `/public/venue/`              | The sliding carousel of resort photos        |
| Hotel photos                     | `/public/images/`             | The "Where to Stay" cards on /travel         |
| Dress code sample looks          | `/public/dress-code/`         | The Style Inspiration photos                 |
| Pre-wedding gallery photos       | `/public/gallery/`            | The masonry gallery on /gallery              |
| Registry QR code                 | `/public/images/`             | The "Scan to send a gift" card               |

### How to reference a photo

If you put a file at `/public/dress-code/ladies.jpg`, you reference it in `config.js` as:

```js
'/dress-code/ladies.jpg'    // ← note: NO 'public' in the path
```

The `/public/` part is dropped — paths always start at the slash.

### Example: changing the home venue card photo

1. Drop `mikazuki.jpg` into `/public/images/`
2. In `config.js`, find:
   ```js
   images: {
     venueCardImage: '',     // currently empty
   },
   ```
3. Change to:
   ```js
   images: {
     venueCardImage: '/images/mikazuki.jpg',
   },
   ```

### Example: adding venue photos to the carousel

1. Drop your photos in `/public/venue/`, e.g. `pool.jpg`, `beach.jpg`, `villa.jpg`.
2. In `config.js`, find the venue's `photos` array and add entries:
   ```js
   venue: {
     // ...
     photos: [
       { src: '/venue/pool.jpg',   caption: 'The pool at sunset', alt: 'Pool' },
       { src: '/venue/beach.jpg',  caption: 'The private beach',  alt: 'Beach' },
       { src: '/venue/villa.jpg',  caption: 'Mountain view from the villa', alt: 'View' },
     ],
   },
   ```
3. Save. The carousel updates instantly.

---

## Editing the entourage

The Entourage page is **password-protected** (`config.guestListPassword`). Guests see the password in their printed invitation.

The page renders as an elegant printed-program layout. Each **row** is either:
- **1 role** → centered, single column (e.g. Ring Bearer)
- **2 roles** → side-by-side (e.g. Groomsmen | Bridesmaids)

Find the `entourage` array:

```js
entourage: [
  // A 2-column row (Parents of the Groom + Parents of the Bride)
  [
    { label: 'Parents of the Groom', names: ['Full Name', 'Full Name'] },
    { label: 'Parents of the Bride', names: ['Full Name', 'Full Name'] },
  ],
  // A 1-column row (just Ring Bearer)
  [
    { label: 'Ring Bearer', names: ['Full Name'] },
  ],
  // Add as many rows as you want, in any order
],
```

### To add a new role

Copy any existing row, paste it, and edit the label + names. Want it on its own line (centered)? Use 1 role in the row. Want it paired with another? Use 2 roles.

### To add more people to a role

Just add more names to the `names` array:

```js
{ label: 'Groomsmen', names: [
  'First Last',
  'First Last',
  'First Last',
  'First Last',
  'First Last',
] },
```

---

## Editing the hotel list

The Travel page can show multiple recommended hotels. Find the `accommodations` array:

```js
accommodations: [
  {
    name: 'Mikazuki Resorts',
    featured: true,                          // gold "Featured · Wedding Venue" pill
    image: '/images/mikazuki-venue.jpg',     // hotel photo
    websiteUrl: 'https://mikazuki.com.vn/en/',
    bookingUrl: '',                          // direct booking link
    bookingDetails: 'Details to follow...',
    mapsUrl: '',
    checkInDisplay: '27 March 2027',
    checkOutDisplay: '29 March 2027',
    notes: 'We recommend arriving a day early...',
  },
],
```

### Adding a second hotel

Copy the whole `{ ... }` block (including the curly braces and the comma after), paste it after the first one, and edit the values:

```js
accommodations: [
  {
    name: 'Mikazuki Resorts',
    // ... existing first hotel
  },
  {
    name: 'Pullman Da Nang Beach Resort',
    featured: false,
    image: '/images/pullman.jpg',
    websiteUrl: 'https://www.pullman-danang.com',
    bookingUrl: '',
    bookingDetails: '10% off for our wedding guests — use code TJWED27.',
    mapsUrl: '',
    checkInDisplay: '27 March 2027',
    checkOutDisplay: '29 March 2027',
    notes: 'A great beachfront alternative ~10 minutes from the venue.',
  },
],
```

The Travel page automatically renders one card per hotel.

The **first hotel** in the list is also what the homepage Travel preview uses for its dates summary — keep your primary recommendation first.

---

## Editing reminders

The reminder cards on `/reminders` (and the first 3 are previewed on the homepage) come from this array:

```js
reminders: [
  { icon: '🌡️', title: 'Weather',         body: 'Da Nang in late March is warm...' },
  { icon: '👟', title: 'Footwear',        body: 'Parts of the venue may be on sand...' },
  { icon: '🕓', title: 'Arrive on Time',  body: 'Please arrive by 3:30 PM...' },
  // ...
],
```

To add or remove a reminder, copy an existing line, edit, and make sure each line ends with a comma. Emojis can be copied from [emojipedia.org](https://emojipedia.org).

---

## Editing the dress code

```js
dressCode: {
  label: 'Cocktail · Semi-Formal · Formal',
  subtitle: 'Dress to impress — the sky\'s the limit.',
  notes: 'We\'d love to see you in beige, sage green, sky blue, or deep navy...',

  // Palette circles — add as many colors as you like
  palette: ['#F5EFE6', '#8FAF8B', '#A8C9DC', '#1E3A5F'],
  paletteNames: ['Beige', 'Sage Green', 'Sky Blue', 'Deep Navy'],

  // Style Inspiration photos (and the "what not to wear" footnote)
  samples: {
    title: 'Sample looks',
    description: 'A few outfit ideas...',
    photos: [
      { src: '/dress-code/dresscode-women.png', caption: 'Light, breathable fabrics in sage or beige' },
      { src: '/dress-code/dresscode-men.png',   caption: 'Sky blue or beige for a coastal-formal feel' },
    ],
    avoidNote: 'Please avoid white, ivory, or cream...',
  },
},
```

> **Adding more palette colors** — just add to both `palette` and `paletteNames` arrays in the same order. They wrap automatically.
> **Adding more sample looks** — copy a `{ src: ..., caption: ... }` line into the `photos` array.

---

## Editing the registry

```js
registry: {
  message: 'We are deeply grateful and overwhelmed by your love...',
  luckyMoneyNote: 'There will be a lucky money box at the venue on the day...',
  qrCodeImage: '',     // see "Adding the QR code" section below
  qrCodeLabel: 'Scan to send a monetary gift',
  qrCodeNote: 'QR code to follow — we\'ll add our payment details here closer to the day.',
},
```

The page shows your `message` as the main gratitude paragraph, the lucky money note on one card, and a QR code card. While `qrCodeImage` is empty, a "QR code coming soon" placeholder shows.

---

## Turning a whole page on/off

If a page isn't ready yet — say, the Gallery doesn't have photos, or you want to hide RSVP until invites go out — flip its switch:

```js
pages: {
  venue:     true,    // ← show the real Venue page
  travel:    true,
  timeline:  true,
  rsvp:      false,   // ← visitors see "Coming soon" instead
  dressCode: true,
  reminders: true,
  gallery:   true,
  guestList: true,    // controls the Entourage page
  registry:  true,
},
```

The page is still reachable from the nav, but visitors see a soft "Coming soon" placeholder with a "Back to home" button.

---

## Adding the YouTube video tour

1. On YouTube, copy the video's URL (any format works: `youtube.com/watch?v=...`, `youtu.be/...`, or `youtube.com/shorts/...`).
2. In `config.js`, find `venue.youtubeUrl` and paste:
   ```js
   venue: {
     // ...
     youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
   },
   ```
3. The "Video tour" section appears on the Venue page automatically. Leave blank to hide.

---

## Adding the Spotify playlist

1. On Spotify, open your playlist → click **⋯** → **Share** → **Embed playlist** → copy the iframe `src` URL.
2. In `config.js`, set:
   ```js
   music: {
     spotifyUrl:   'https://open.spotify.com/playlist/...',       // for "Open in Spotify" button
     spotifyEmbed: 'https://open.spotify.com/embed/playlist/...', // for the embedded player
   },
   ```
3. The "Set the Mood" section appears at the bottom of the homepage. Leave both blank to hide.

---

## Adding the QR code (registry)

1. Generate your QR code using your bank's app, Wise, Revolut, GCash, or any QR generator linked to your payment account.
2. Save the image (PNG works great) and name it something simple like `registry-qr.png`.
3. Drop it in `/public/images/`.
4. In `config.js`, set:
   ```js
   registry: {
     // ...
     qrCodeImage: '/images/registry-qr.png',
     qrCodeLabel: 'Scan to send a monetary gift',
   },
   ```

The placeholder swaps to your real QR. Guests can scan with their phone camera.

---

## Setting up RSVP emails

The RSVP form runs in **demo mode** until you connect a free EmailJS account. Here's the path:

1. Go to [emailjs.com](https://www.emailjs.com), sign up (free tier covers 200 emails/month).
2. **Add a service** (Gmail, Outlook, etc.) — note the **Service ID**.
3. **Create an email template** with these variable placeholders:
   - `{{user_name}}`, `{{user_email}}`, `{{attending}}`, `{{kids}}`, `{{dietary}}`, `{{song}}`, `{{message}}`, `{{is_update}}`, `{{reply_to}}`
   - Note the **Template ID**.
4. Account → API Keys → copy your **Public Key**.
5. In `config.js`, paste them into the `rsvp` block:
   ```js
   rsvp: {
     emailjsServiceId:  'service_abc1234',
     emailjsTemplateId: 'template_xyz5678',
     emailjsPublicKey:  'YOUR_PUBLIC_KEY',
     recipientEmail:    'tam.and.jenn@example.com',
   },
   ```
6. Test by submitting the form on your live site. You should get an email seconds later.

> If a guest updates their reply later (same email address), you'll get a separate email tagged "Yes — this replaces an earlier reply", so you know to use the latest.

---

## Changing colors and fonts

```js
theme: {
  colors: {
    beige: '#F5EFE6',   // primary background
    sage:  '#8FAF8B',   // green accent
    sky:   '#A8C9DC',   // blue accent
    navy:  '#1E3A5F',   // headings + dark contrast
    gold:  '#C9A96E',   // decorative metallic
    text:  '#3A3A3A',   // body text
  },
  fonts: {
    display: { name: 'Cormorant Garamond', weights: '400;500;600;700' },  // headings
    body:    { name: 'DM Sans',            weights: '400;500;600;700' },  // body copy
    script:  { name: 'Great Vibes',        weights: '400' },              // cursive accents
  },
},
```

**Changing colors**: replace any hex code (e.g. `'#8FAF8B'`) with another (use any [color picker](https://www.w3schools.com/colors/colors_picker.asp) to find hex codes).

**Changing fonts**: replace `name` with any [Google Fonts](https://fonts.google.com) family. The font is fetched automatically — no other change needed. Some pretty options:
- Display: `Playfair Display`, `Lora`, `Cinzel`, `Italiana`, `EB Garamond`
- Body: `Inter`, `Lato`, `Nunito`, `Work Sans`, `Source Sans 3`
- Script: `Parisienne`, `Allura`, `Sacramento`, `Pinyon Script`

---

## Publishing your changes

It depends on where the site lives:

### If your site is on Netlify or Vercel

The pattern is **commit → push → auto-deploy**:

1. Save your changes to `config.js`.
2. Open a terminal in the project folder.
3. Run:
   ```bash
   git add .
   git commit -m "Update [thing you changed]"
   git push
   ```
4. Wait ~1 minute. Netlify/Vercel rebuilds and your changes are live.

> ⚠️ **`config.js` is gitignored**. If you've added it to `.gitignore`, your changes to `config.js` won't be picked up by `git push`. Either remove `config.js` from `.gitignore` (privacy trade-off), or upload it to the host another way (Netlify drag-and-drop, etc.).

### To preview locally first

```bash
npm run dev
```

Open `http://localhost:5173` in your browser. Edit `config.js`, save, and the page reloads automatically. When happy, then push.

---

## Help — something broke

| Symptom                                  | What to do                                                                                                  |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Page is blank or shows an error overlay  | You probably broke a quote or comma in `config.js`. Undo your last change (Ctrl-Z / Cmd-Z) and try again.    |
| Photo doesn't show up                    | Check the path: it should start with `/`, no `public` prefix, and the file should exist exactly where you said. |
| RSVP submissions don't arrive            | Triple-check the EmailJS service / template / public key values. Test from the EmailJS dashboard's "Test" tab. |
| Countdown shows wrong number             | Check `wedding.date` is in `YYYY-MM-DD` format with quotes.                                                  |
| A page shows "Coming soon" unexpectedly  | Check `config.pages.{name}` — set it to `true`.                                                              |
| Spotify or YouTube embed isn't showing   | Make sure the URL is the embed URL (Spotify: from "Embed playlist"; YouTube: any standard watch URL works).  |

For anything you can't fix, save your unbroken backup of `config.js`, undo the change that broke things, and reach out to whoever set this up for you.

---

## A note from the build

The site is fully **mobile-first** — open it on your phone, share it with your invited guests, and everything will scale beautifully. Animations respect `prefers-reduced-motion`, color contrast hits WCAG-AA, and every page has been verified at 375px-wide (iPhone SE class) up through desktop.

You can flip pages on and off, swap fonts and colors, add photos, and grow the entourage and hotel lists at your own pace — the site never breaks, the placeholders are always friendly, and your guests will see "Coming soon" instead of a 404.

Have fun making it yours. 💛

— *Built with love for Tam & Jenn, 28 March 2027 · Đà Nẵng, Vietnam*
