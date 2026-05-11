# Paper & Petals Floral — Website

Static site for Paper & Petals Floral. Built with Astro, Decap CMS, and Netlify.

## Quick links

- **Live site:** https://paperandpetalsfloral.com (after deploy)
- **Content admin:** https://paperandpetalsfloral.com/admin

## Local development

```bash
npm install
npm run dev          # localhost:4321
```

```bash
npm run build        # static site → dist/
npm run preview      # serve dist/ at localhost:4321
```

```bash
npm run test:unit    # vitest
npm run test:e2e     # playwright (auto-builds)
npm run test         # all of the above + build
```

## Deploying for the first time

1. **Buy `paperandpetalsfloral.com`** — already owned. (Otherwise: any registrar, ~$15/year.)
2. **Push this repository** to a GitHub account.
3. **Create a free Netlify account** at https://app.netlify.com → "Add new site" → "Import from GitHub" → select this repo → click "Deploy."
4. **Connect the domain:** In Netlify → Domain settings → Add domain → enter `paperandpetalsfloral.com`. Netlify gives DNS records; paste them into your registrar.
5. **Enable Netlify Identity:** In Netlify → Identity → Enable. Settings → Registration → "Invite only." Invite yourself; check email; set password.
6. **Enable Git Gateway:** Identity → Services → enable Git Gateway. (Lets Decap commit on your behalf.)
7. **First Decap login:** Visit `https://paperandpetalsfloral.com/admin`, click "Log in with Netlify Identity," sign in.

## Editing content

Once logged in at `/admin` you'll see four sections:

- **Site Settings** — title, SEO description, inquiry email, social handles, booking banner.
- **Pages** — Home, About, Inquire (single-edit per page).
- **Portfolio** — event entries with hero image, gallery, story, credits.
- **Journal** — blog posts.

After clicking "Save," changes commit to GitHub and Netlify rebuilds automatically (~30 seconds).

## Stack

- [Astro](https://astro.build) static site generator
- [Decap CMS](https://decapcms.org) (open source) for content management
- [Netlify](https://netlify.com) hosting + Forms + Identity
- TypeScript, MDX, Vitest, Playwright

## Brand tokens

| Token | Value |
|---|---|
| Background | `#f6f1e8` |
| Heading | `#2b2520` |
| Body | `#4a4138` |
| Accent | `#a48871` |
| Display font | Cormorant Garamond |
| Body font | Inter |

These live in `src/styles/tokens.css` and are intentionally not exposed in the CMS — they keep the site visually consistent.
