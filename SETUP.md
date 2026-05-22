# AI/Cloud Developer Portfolio — Setup Guide
 
## Quick Start

```bash
npm create vite@latest portfolio -- --template react
cd portfolio
npm install
npm run dev
```

Then replace `src/App.jsx` with the contents of `Portfolio.jsx`.

---

## Install Dependencies

```bash
npm install framer-motion
npm install @emailjs/browser
```

## Update `index.html`

Add Google Fonts to `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
```

## Personalize These Values

In `Portfolio.jsx`, update:
- `"Aryan Kumar"` → your name
- `"yourhandle"` → your GitHub username
- GitHub/LinkedIn URLs
- Email address
- Project details (titles, descriptions, tech stack, links)
- Internship details
- Certification list
- GitHub stats (can be fetched via GitHub API)

## Live GitHub Stats (Optional)

Replace the mock `GITHUB_STATS` with a real API call:
```js
const res = await fetch("https://api.github.com/users/YOUR_USERNAME");
const data = await res.json();
// data.public_repos, etc.
```

## EmailJS Contact Form

1. Sign up at [emailjs.com](https://emailjs.com)
2. Install: `npm install @emailjs/browser`
3. Replace the `handleContact` function:

```js
import emailjs from "@emailjs/browser";

const handleContact = (e) => {
  e.preventDefault();
  emailjs.send(
    "YOUR_SERVICE_ID",
    "YOUR_TEMPLATE_ID",
    { name: contactState.name, email: contactState.email, message: contactState.message },
    "YOUR_PUBLIC_KEY"
  ).then(() => setSent(true));
};
```

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for auto-deployments.

---

## Project Structure

```
src/
├── App.jsx          ← Entry point (import Portfolio)
├── Portfolio.jsx    ← Main portfolio file
└── index.css        ← Optional global resets
```

## What's Included

- **Hero** — Typewriter animation, floating badge, stat pills
- **About** — Story + cards grid
- **Projects** — 4 expandable project cards with stack, highlights, GitHub/demo links
- **Skills** — Tab-filtered animated skill bars (6 categories)
- **Experience** — SuprMentr internship timeline card
- **Certifications** — 6 cert cards with icons
- **GitHub Activity** — Stats panel with link to profile
- **Contact** — Form (EmailJS-ready) + social links
- **Footer** — Clean minimal
