# Avi Dharani — Portfolio Site

A single-page personal site: white + blue professional design, headshot hero,
smooth-scroll animations, ventures, client work, experience, and a working
contact form (via Resend).

## Preview it locally

Just open `index.html` in your browser to see the design and animations.

Note: the contact form and video play buttons only work when the site is
served over `http` (a local server or after deploying), not from a raw
`file://` open. To run a quick local server (optional):

```
cd portfolio-site
npx serve .
```

## Add your photos

Open the `assets/` folder and drop in your images (see `assets/README.md` for
the exact file names). The site swaps placeholders for your photos
automatically — start with `headshot.jpg`.

## Deploy to Vercel (no terminal required)

1. Go to https://vercel.com and sign in with GitHub (free).
2. Push this `portfolio-site` folder to a GitHub repo, **or** use Vercel's
   "Deploy" flow and drag the folder in.
3. In Vercel, import the project. Framework preset: **Other** (it's a static
   site with serverless functions — Vercel detects the `/api` folder on its own).
4. Add your environment variables (next section), then click **Deploy**.

## Turn on the contact form (Resend)

1. Create a free account at https://resend.com.
2. Go to **API Keys** and create one. Copy it.
3. In Vercel: **Project → Settings → Environment Variables**, add:
   - `RESEND_API_KEY` = the key you copied
   - `CONTACT_TO` = `avidharani110@gmail.com`
   - `CONTACT_FROM` = `Avi Dharani Portfolio <onboarding@resend.dev>`
4. Redeploy. Messages from the form now arrive in your inbox, with the
   sender's email set as reply-to.

To send from your own domain (e.g. `hello@avidharani.com`) instead of the
Resend test sender, verify your domain in Resend and update `CONTACT_FROM`.

## Custom domain

In Vercel → **Project → Settings → Domains**, add your domain (e.g.
`avidharani.com`) and follow the DNS steps. HTTPS is automatic.

## What's where

```
portfolio-site/
├─ index.html        the whole page
├─ css/styles.css    all styling
├─ js/main.js        animations, counters, form, video lightbox
├─ api/contact.js    serverless function that sends the email (key stays server-side)
├─ assets/           your images + videos (see assets/README.md)
├─ vercel.json       clean-URL config
└─ .env.example      copy to .env for local testing
```

## Editing content

All text lives in `index.html` and is grouped by section with clear headings.
Colors and fonts are CSS variables at the top of `css/styles.css`
(`--blue`, `--gold`, `--ink`, etc.) — change them in one place.
