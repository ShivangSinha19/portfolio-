# Portfolio (Vite + React)

Local dev:

```bash
npm install
npm run dev
```

EmailJS setup (optional):

1. Create an account at https://www.emailjs.com
2. Create a service and email template
3. Copy `.env.example` to `.env.local` and fill values:

```
VITE_EMAILJS_SERVICE_ID=YOUR_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID=YOUR_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY=YOUR_PUBLIC_KEY
```

Vite exposes variables prefixed with `VITE_`.

Deploy to Vercel:

```bash
npm install -g vercel
vercel
```

Or connect the GitHub repo in the Vercel dashboard for automatic deploys.
