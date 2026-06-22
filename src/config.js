/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║   Tam & Jenn — Wedding Website Config                                    ║
 * ║                                                                          ║
 * ║   ⚠️  This is the ONLY file you need to edit to change site content.    ║
 * ║   No code changes required. Just edit the values below, save, and       ║
 * ║   the site will reflect your edits.                                     ║
 * ║                                                                          ║
 * ║   See EDITORS_GUIDE.md for a plain-English walkthrough.                ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 */

const config = {
  /**
   * Visual theme — site-wide colors and typography.
   *
   * `theme.colors` controls every section background, button, accent, and text
   * color across the site (loaded into CSS variables at startup).
   *
   * `theme.fonts` controls the three font families. Each entry is a Google Font:
   * set `name` to ANY Google Font (e.g. "Playfair Display", "Lora", "Cinzel",
   * "Parisienne") and the site will fetch it automatically.
   * Browse fonts at https://fonts.google.com.
   */
  theme: {
    colors: {
      beige: '#F5EFE6', //   primary background — warm ivory
      sage:  '#8FAF8B', //   accent — nature-inspired green
      sky:   '#A8C9DC', //   secondary accent — soft sky blue
      navy:  '#1E3A5F', //   headings, dark contrast
      gold:  '#C9A96E', //   decorative metallic accent
      text:  '#3A3A3A', //   body text
    },
    fonts: {
      // Used for: headings, the couple's names in the invitation card and nav monogram
      display: { name: 'Cormorant Garamond', weights: '400;500;600;700' },
      // Used for: body copy, buttons, nav links
      body:    { name: 'DM Sans',            weights: '400;500;600;700' },
      // Used for: "Save the Date" eyebrow, hashtag, the couple's footer signature
      script:  { name: 'Great Vibes',        weights: '400' },
    },
  },

  /**
   * Background and accent images. Drop a file in `/public/images/` then set
   * the path here, e.g. `heroBackground: '/images/danang-hero.jpg'`.
   * Leave a value as `''` to fall back to the soft gradient / leaf placeholder.
   *
   * Recommended sizes (for crisp display on big screens):
   *   envelopeBackground  – 2000x1300 (landing page bg behind envelope)
   *   heroBackground      – 2400x1600 (home page Save the Date hero)
   *   welcomeImage        – 1200x900  (small image in Welcome blurb section)
   *   venueCardImage      – 1200x900  (home page Venue preview card)
   *   travelCardImage     – 1200x900  (home page Travel preview card)
   *   rsvpBackground      – 2400x1600 (home page RSVP CTA section)
   *   footerAccent        – 800x800   (decorative accent in the footer)
   */
  images: {
    envelopeBackground: '',
    heroBackground:     '',
    welcomeImage:       '',
    venueCardImage:     '',
    travelCardImage:    '',
    rsvpBackground:     '',
    footerAccent:       '',
  },

  /**
   * The couple — names, display name, and social hashtag.
   * `name1` / `name2` are the first names (used in monogram and small UI bits).
   * `displayName` is the combined name shown across the site.
   * `hashtag` is shown in the footer.
   */
  couple: {
    name1: 'Tam',
    name2: 'Jenn',
    displayName: 'Tam & Jenn',
    hashtag: '#TamAndJenn2027',
  },

  /**
   * The wedding date, time, and RSVP deadline.
   * `date` MUST be in ISO format (YYYY-MM-DD) — it drives the countdown.
   * `displayDate` and `rsvpDeadlineDisplay` are the human-readable strings.
   *
   * `startHour` / `startMinute` / `durationHours` describe the event time in
   * the wedding's local timezone (`utcOffsetHours` = the offset from UTC in
   * hours, e.g. 7 for Vietnam/ICT). These power the "Add to Calendar" button —
   * keep them in sync with `time`.
   */
  wedding: {
    date: '2027-03-28',
    displayDate: '28th March 2027',
    displayDay: 'Sunday',
    time: '4:00 PM (GMT+7)',
    timezone: 'Asia/Ho_Chi_Minh',
    utcOffsetHours: 7,
    startHour: 16,        // 24h clock — 16 = 4 PM
    startMinute: 0,
    durationHours: 6,     // event length for the calendar invite
    rsvpDeadline: '2027-02-14',
    rsvpDeadlineDisplay: '14th February 2027 (Valentine\'s Day 💛)',
  },

  /**
   * "Add to Calendar" event details.
   * The title and description appear in the user's calendar when they accept.
   * Date/time/location are derived from `wedding` and `venue` above.
   */
  calendar: {
    eventTitle: 'Tam & Jenn\'s Wedding',
    description: 'We can\'t wait to celebrate with you in Đà Nẵng! See the full details, dress code and timeline on our website.',
  },

  /**
   * The venue. Replace `googleMapsEmbed` with the iframe `src` URL
   * (in Google Maps: Share → Embed a map → copy the src="..." value only).
   * Leave `photos` as `[]` until you upload images to /public/venue/ and
   * add their paths here.
   */
  venue: {
    name: 'Mikazuki Resorts Da Nang',
    address: 'Nguyễn Tất Thành, Hải Vân, Đà Nẵng 55000, Vietnam',
    googleMapsUrl: 'https://maps.app.goo.gl/zooDtJd62KCKK2Bk7',
    googleMapsEmbed: '',
    description:
      'A stunning beachside resort nestled between the mountains and the East Sea in Da Nang, Vietnam.',
    amenities: [
      { icon: '🏖️', label: 'Private Beach' },
      { icon: '🏊', label: 'Pool' },
      { icon: '💆', label: 'Spa' },
      { icon: '🍽️', label: 'Fine Dining' },
      { icon: '🏔️', label: 'Mountain Views' },
    ],
    websiteUrl: '',
    photos: [],
  },

  /**
   * Where guests are recommended to stay. The venue IS the hotel,
   * but you can list other options here too in future.
   */
  accommodation: {
    hotelName: 'Mikazuki Resorts Da Nang',
    bookingDetails: 'Details to follow — check back soon!',
    bookingUrl: '',
    checkInDate: '2027-03-27',
    checkOutDate: '2027-03-29',
    checkInDisplay: '27 March 2027',
    checkOutDisplay: '29 March 2027',
    notes: 'We recommend arriving a day early to settle in and enjoy the resort.',
  },

  /**
   * Travel information for guests flying in.
   */
  travel: {
    nearestAirport: 'Da Nang International Airport (DAD)',
    airportCode: 'DAD',
    airportDistance: 'Approximately 15 minutes from the venue',
    flightNotes:
      'Guests are welcome to book their own preferred flights. We recommend arriving by 27th March 2027.',
    visaInfo:
      'Most nationalities can visit Vietnam visa-free for 45 days. Check your country\'s requirements at the official Vietnam immigration website.',
    visaUrl: 'https://evisa.xuatnhapcanh.gov.vn',
    localTransport:
      'Taxis and ride-sharing apps (Grab) are widely available at Da Nang airport.',
    currency: 'Vietnamese Đồng (VND)',
    language: 'Vietnamese (English widely spoken at resorts)',
    timezone: 'GMT+7 (Indochina Time)',
    emergencyContact: '',
    airlines: [],
  },

  /**
   * Dress code guidance for guests.
   * `palette` and `paletteNames` arrays must be the same length and order.
   */
  dressCode: {
    label: 'Cocktail · Semi-Formal · Formal',
    subtitle: 'Dress to impress — the sky\'s the limit.',
    notes:
      'We\'d love to see you in beige, sage green, sky blue, or deep navy — our wedding palette. Avoid white, ivory, or cream.',
    palette: ['#F5EFE6', '#8FAF8B', '#A8C9DC', '#1E3A5F'],
    paletteNames: ['Beige', 'Sage Green', 'Sky Blue', 'Deep Navy'],
  },

  /**
   * Curated playlist. Paste the embed URL from Spotify
   * (Spotify → Share → Embed playlist → copy the src URL).
   */
  music: {
    spotifyUrl:
      'https://open.spotify.com/playlist/1lpu4Dk3teu9KKQtDtAiFZ?si=bb96c016dac74361',
    spotifyEmbed:
      'https://open.spotify.com/embed/playlist/1lpu4Dk3teu9KKQtDtAiFZ',
  },

  /**
   * Wedding day timeline. Order matters — entries display top-to-bottom.
   * `featured: true` highlights an entry (use sparingly).
   */
  timeline: [
    { time: '3:30 PM', event: 'Guest Arrival', icon: '🌿', description: 'Welcome drinks served as guests find their seats.' },
    { time: '4:00 PM', event: 'Ceremony Begins', icon: '💍', description: 'The moment we\'ve been waiting for.', featured: true },
    { time: '5:00 PM', event: 'Cocktail Hour', icon: '🥂', description: 'Celebrate with drinks, canapés, and great company.' },
    { time: '5:30 PM', event: 'Games & Performances', icon: '🎶', description: 'Fun, laughter, and entertainment for all.' },
    { time: '6:00 PM', event: 'First Dance', icon: '💃', description: 'Tam & Jenn take the floor.' },
    { time: '6:15 PM', event: 'Speeches & Messages', icon: '🎙️', description: 'Words from those who mean the most.' },
    { time: '6:45 PM', event: 'Toasting', icon: '🥂', description: 'Raise a glass to love!' },
    { time: '7:00 PM', event: 'Dinner Reception', icon: '🍽️', description: 'A celebration feast.' },
    { time: '8:00 PM', event: 'SDE Screening', icon: '🎬', description: 'Same Day Edit — relive the magic of the day.' },
    { time: '8:00 PM', event: 'After-Party', icon: '🎉', description: 'The party continues! Dancing until the night ends.' },
  ],

  /**
   * Events before the wedding day (e.g. rehearsal). These are shown in a
   * smaller section beneath the main timeline.
   */
  preWeddingEvents: [
    {
      name: 'Rehearsal',
      date: '27th March 2027',
      time: 'TBC',
      location: 'Mikazuki Resorts Da Nang',
      invitedGroups: ['Family', 'Entourage'],
      notes: 'Invite-only. Details will be shared directly with those involved.',
    },
  ],

  /**
   * The categories used to group guests in the guest list page.
   * `id` is referenced from individual guest entries below.
   */
  guestSections: [
    { id: 'family', label: 'Family', icon: '🏠', color: '#C9A96E' },
    { id: 'vip', label: 'VIP', icon: '⭐', color: '#1E3A5F' },
    { id: 'bridesmaids', label: 'Bridesmaids', icon: '💐', color: '#A8C9DC' },
    { id: 'groomsmen', label: 'Groomsmen', icon: '🤵', color: '#8FAF8B' },
    { id: 'entourage', label: 'Entourage', icon: '🎊', color: '#F5EFE6' },
  ],

  /**
   * The guest list. `section` MUST match a `guestSections.id` above.
   * `rsvpStatus` is one of: 'pending', 'confirmed', 'declined'.
   * The Guest List page is password-protected — see `guestListPassword`.
   */
  guests: [
    // Example entries — replace with your real guests
    { name: 'Guest Name', section: 'family', rsvpStatus: 'pending', plusOne: false },
    { name: 'Guest Name', section: 'vip', rsvpStatus: 'pending', plusOne: true },
  ],

  /**
   * Shared password to unlock the Guest List page.
   * Anyone with the password can see the list — keep it for guests only.
   */
  guestListPassword: 'tamjenn2027',

  /**
   * The reminder cards on the Reminders page (and a teaser on Home).
   */
  reminders: [
    { icon: '🌡️', title: 'Weather', body: 'Da Nang in late March is warm and sunny, averaging 25–28°C. Light, breathable fabrics are recommended.' },
    { icon: '👟', title: 'Footwear', body: 'Parts of the venue may be on sand or grass. Ladies, consider block heels or wedges.' },
    { icon: '🕓', title: 'Arrive on Time', body: 'Please arrive by 3:30 PM. The ceremony will begin promptly at 4:00 PM.' },
    { icon: '📵', title: 'Unplugged Ceremony', body: 'We kindly ask that you keep phones away during the ceremony. Our photographers will capture every moment.' },
    { icon: '💉', title: 'Health & Travel', body: 'Check entry requirements and any recommended travel health precautions for Vietnam before your trip.' },
    { icon: '💛', title: 'RSVP Deadline', body: 'Please RSVP by 14th February 2027 — Valentine\'s Day! We need final numbers for catering.' },
  ],

  /**
   * "Our Story" content. Leave `text` short — the gallery page has more room.
   */
  ourStory: {
    text: 'Our story is coming soon — stay tuned! 💛',
    photos: [],
  },

  /**
   * Pre-wedding photos shown on the Gallery page.
   * Each entry: { src: '/gallery/photo.jpg', caption: '...', alt: '...' }
   * Add files to /public/gallery/ then list them here.
   */
  preweddingPhotos: [],

  /**
   * RSVP form is sent via EmailJS. To wire it up:
   *   1. Sign up at https://www.emailjs.com
   *   2. Create a service + template
   *   3. Paste your service ID, template ID, and public key below
   *   4. Set `recipientEmail` to where RSVPs should be delivered
   * Leave the placeholders to keep the form in "demo" mode (success state shown,
   * but no email actually sent).
   */
  rsvp: {
    emailjsServiceId: '',
    emailjsTemplateId: '',
    emailjsPublicKey: '',
    recipientEmail: '',
  },

  /**
   * SEO metadata. `ogImage` should be an absolute URL (or `/og.jpg` in public/).
   */
  seo: {
    title: 'Tam & Jenn — 28 March 2027 | Da Nang, Vietnam',
    description: 'Join us to celebrate the wedding of Tam & Jenn in beautiful Da Nang, Vietnam.',
    ogImage: '',
  },
}

export default config
