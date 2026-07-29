# Tharaka Portfolio Starter

A low-maintenance personal portfolio built with Astro and designed for static hosting on Cloudflare Pages.

## Why this architecture

- No database
- No CMS account
- No server to patch
- No paid hosting
- Projects are Markdown files
- Every Git push can deploy automatically

## 1. Install prerequisites

Install the current Node.js LTS release and Git.

## 2. Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Astro, normally `http://localhost:4321`.

## 3. Personalize the site

Edit `src/config/site.ts` first. Replace:

- Email
- GitHub URL
- LinkedIn URL
- Job title and tagline if necessary

Then replace the text in:

- `src/pages/about.astro`
- `src/pages/resume.astro`
- `src/pages/contact.astro`

## 4. Replace the résumé

Delete `public/resume/REPLACE-ME.txt` and add your PDF as:

`public/resume/tharaka-malwaththa-resume.pdf`

## 5. Add or edit projects

Project files live in `src/content/projects/`.

Duplicate an existing `.md` file, rename it with a URL-friendly name, and update the frontmatter and case study content.

Required metadata:

```yaml
title: Project title
summary: One strong sentence
date: 2026-07-21
featured: true
status: Completed
technologies:
  - Azure
  - Terraform
```

Optional metadata:

```yaml
repository: https://github.com/...
demo: https://...
image: /images/projects/example.png
```

## 6. Validate before publishing

```bash
npm run check
npm run build
npm run preview
```

## 7. Publish to GitHub

Create an empty GitHub repository, then run:

```bash
git init
git add .
git commit -m "Create portfolio starter"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

## 8. Deploy on Cloudflare Pages

1. Open Cloudflare Dashboard.
2. Go to **Workers & Pages**.
3. Create a Pages project and connect GitHub.
4. Select the portfolio repository.
5. Use build command: `npm run build`
6. Use output directory: `dist`
7. Deploy.

No Astro Cloudflare adapter is required because this project is fully static.

## 9. Connect a domain

In the Cloudflare Pages project, open **Custom domains**, add your domain, and follow the DNS prompts.

After choosing the real domain, replace `https://example.com` in `astro.config.mjs`.

## Normal maintenance workflow

1. Edit a Markdown project file.
2. Run `npm run dev` and inspect it.
3. Commit and push.
4. Cloudflare deploys the update automatically.

## Do not add these without a real need

- WordPress
- A database
- A headless CMS
- User accounts
- Server-side rendering
- A complex contact-form backend
- Heavy animation libraries

Every additional service becomes another failure point and maintenance obligation.
