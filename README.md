# Joinspire Studios — Portfolio Website

## Quick Start (Local Development)

1. Make sure you have [Node.js](https://nodejs.org/) installed (v18 or newer)
2. Open your terminal and navigate to this folder
3. Run these commands:

```bash
npm install
npm run dev
```

4. Open http://localhost:5173 in your browser

## Deploy to Vercel (Free, takes 5 minutes)

### Option A: Deploy via GitHub (Recommended — auto-updates when you push changes)

1. Create a free account at [github.com](https://github.com)
2. Create a new repository (e.g. "joinspire-site")
3. Push this folder to that repository:

```bash
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/joinspire-site.git
git push -u origin main
```

4. Go to [vercel.com](https://vercel.com) and sign up with your GitHub account
5. Click "Add New Project" → Import your GitHub repo
6. Click "Deploy" — that's it. Vercel gives you a live URL instantly.
7. To connect your custom domain: Go to Project Settings → Domains → Add your domain

### Option B: Deploy directly from terminal

1. Install the Vercel CLI:

```bash
npm install -g vercel
```

2. Run:

```bash
vercel
```

3. Follow the prompts. Done.

## How to Update Your Portfolio

### Adding a new video project:

Open `src/App.jsx` and find the `PROJECTS` array near the top. Add a new entry:

```javascript
{ id: 100, title: "Your New Project Title", videoId: "YOUTUBE_VIDEO_ID", category: "Documentary", client: "Client Name" },
```

The `videoId` is the part after `watch?v=` in a YouTube URL.
For example: `https://youtube.com/watch?v=abc123` → videoId is `abc123`

### Adding a new creator:

Find the `CREATORS` array and add:

```javascript
{ name: "Creator Name", role: "What you did for them" },
```

### Adding a new testimonial:

Find the `TESTIMONIALS` array and add:

```javascript
{
  name: "Client Name",
  handle: "Their subscriber count or title",
  quote: "What they said about you.",
},
```

### Changing your Calendly link:

Find `bookCall: "#"` in the `S` object and replace `#` with your Calendly URL.

### Changing your photo:

Replace `public/joseph.jpg` with your new photo (keep the same filename).

### Updating pricing:

Find the `PRICING` array and edit the tiers.

## After making changes:

- If using GitHub + Vercel: Just push your changes and Vercel auto-deploys
- If using Vercel CLI: Run `vercel` again

## Tech Stack

- React 18
- Vite 6
- Deployed on Vercel (free tier)
- Fonts: Fraunces + DM Sans (Google Fonts)
