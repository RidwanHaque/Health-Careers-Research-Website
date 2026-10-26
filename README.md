# Health Careers Explorer

A kid-friendly, mostly single-page website that introduces K–12 students to health professions. It follows Rayan Haque's independent project proposal: one module per career, a simple education roadmap, and age-grouped "things you can do now."

Live repo: [RidwanHaque/Health-Careers-Research-Website](https://github.com/RidwanHaque/Health-Careers-Research-Website)

## What is included

- Career modules for physician, physician assistant, nurse, physical therapist, pharmacist, health/science educator, and researcher
- Sticky cartoon navigation, search, and jump links
- A poll, a question form for the author, and an opportunity-list signup
- Links to real outside resources (AAMC sample MCAT questions, PCOM youth outreach, HOSA)
- A private `/admin` view for saved questions and emails
- A privacy notice that matches what the site actually collects

This is **not** an official PCOM website. PCOM branding and mentor review are still pending, so the footer does not claim that staff have already approved the modules.

## Local setup

1. Install Node.js 20 or newer.
2. Copy `.env.example` to `.env.local` and fill in values:

```
SESSION_SECRET=at-least-32-characters-of-random-text
ADMIN_PASSWORD=a-strong-password-only-you-know
SITE_URL=http://localhost:3000
```

3. Install and run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev        # local server
npm run build      # production build
npm start          # serve the production build
npm run lint
npm run typecheck
npm test
```

## Environment variables

| Name | Required | Purpose |
| --- | --- | --- |
| `SESSION_SECRET` | Yes in production | Signs poll and admin cookies. Use 32+ random characters. |
| `ADMIN_PASSWORD` | Yes to use `/admin` | Password for viewing saved questions and emails. |
| `SITE_URL` | Recommended | Public site origin for sitemap, robots, and metadata. Example: `https://your-domain.example` |
| `DATA_STORE_PATH` | No | Override the JSON file used for poll/forms. Default: `data/store.json` |
| `RATE_LIMIT_SECRET` | No | Reserved; rate limits currently key off visitor IP in memory. |

Never commit `.env.local` or `data/store.json`. Those files can contain emails.

## How data is stored

Poll votes, questions, and mailing-list signups are saved in `data/store.json` on the server disk. There is no paid database and no email-sending service. The signup success message only means the address was stored.

Rate limits live in memory and reset when the server process restarts.

## Deployment

Any Node.js host that can run `npm run build` and `npm start` will work (a VPS, Railway, Render, or similar). Set the environment variables above on the host.

This app writes to disk, so a fully read-only serverless host is a poor fit unless you change storage. Do not enable a paid email or database provider without asking first.

After deploy, confirm:

1. The home page loads on a phone and a desktop
2. A poll vote saves and a second vote is blocked
3. A question and a signup appear in `/admin`
4. `/privacy` and a fake URL (404) still use the same visual language

## Rollback

Git history is the rollback path.

```bash
git log
git revert HEAD
git push
```

Then redeploy the previous successful build. Copy `data/store.json` aside before you replace a server if you need to keep form submissions:

```bash
cp data/store.json data/store.bak
```

There are no database migrations.

## Known limitations

- Official PCOM logo and final mentor review are not in this first version
- Dentist and optometrist modules are not built yet (easy to add in `src/lib/careers.ts`)
- The opportunity list does not send email
- In-memory rate limits do not persist across multiple server instances
- Admin login is a shared password, not individual staff accounts

## License / credits

Educational content: Rayan Haque. Implementation support: Ridwan Haque. Career facts checked against the [BLS Occupational Outlook Handbook](https://www.bls.gov/ooh/healthcare/) and the association pages linked in each module.
