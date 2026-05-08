# FieldRoom — Fantasy AI

AI-powered NFL fantasy assistant built on Sleeper + Claude.

## Features
- Sleeper league integration (read-only, no login needed)
- AI waiver wire recommendations
- Trade target analysis
- Trade analyzer with verdicts
- FilmRoom-inspired dark UI

## Deploy to Vercel

### Step 1 — Install Node.js
Go to nodejs.org, download LTS, install it.

### Step 2 — Get Anthropic API key
1. Go to console.anthropic.com
2. Sign up, click API Keys → Create Key
3. Copy the key (sk-ant-...)

### Step 3 — Create Vercel account
Go to vercel.com and sign up free.

### Step 4 — Install Vercel CLI
Open Terminal or Command Prompt and run:
  npm install -g vercel

### Step 5 — Deploy
Navigate to this folder and run:
  vercel

Answer the prompts:
  - Set up and deploy? → Y
  - Which scope? → your username (hit Enter)
  - Link to existing project? → N
  - Project name? → fieldroom (or anything)
  - Directory? → . (just press Enter)
  - Override settings? → N

Vercel gives you a URL like: https://fieldroom-abc123.vercel.app

### Step 6 — Add your API key
1. Go to vercel.com/dashboard
2. Click your project → Settings → Environment Variables
3. Add variable:
   - Key: ANTHROPIC_API_KEY
   - Value: sk-ant-... (your key from Step 2)
   - Check all boxes: Production, Preview, Development
4. Click Save

### Step 7 — Final deploy
  vercel --prod

Your site is live! Share the URL with anyone.

## Updating the site
Make changes to public/index.html, then run:
  vercel --prod

## Folder structure
  fieldroom/
    public/
      index.html     ← the full app
    api/
      claude.js      ← serverless function (keeps API key private)
    vercel.json      ← routing config
    README.md        ← this file
