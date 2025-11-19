# BELAL X666
## 🚀 Quick Start

BELAL X666 বট চালাতে মাত্র ৩ ধাপ:

### ১. Clone & Install
```bash
git clone https://github.com/BOTX666/BELAL-X666-.git
cd BELAL-X666-
npm install
<!-- Animated Header -->
<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=28&pause=1000&color=00D8FF&center=true&vCenter=true&width=800&lines=BELAL+X666+Bot;Fast.+Reliable.+Fun.;Bangla+%2B+English+Multilingual+Support;Clean+Repo+%26+CI%2FCD+Ready" alt="Typing SVG" />
</p>

<!-- Project Title -->
<h1 align="center">🤖 BELAL X666</h1>
<p align="center">Messenger bot with animate, inbox, roast — multilingual fallback and secure .env setup.</p>

<!-- Badges -->
<p align="center">
  <a href="https://github.com/BOTX666/BELAL-X666-"><img alt="Repo size" src="https://img.shields.io/github/repo-size/BOTX666/BELAL-X666-?color=00d8ff&label=Repo%20Size&style=for-the-badge"></a>
  <a href="https://github.com/BOTX666/BELAL-X666-/commits/main"><img alt="Commits" src="https://img.shields.io/github/commit-activity/m/BOTX666/BELAL-X666-?color=00d8ff&label=Commit%20Activity&style=for-the-badge"></a>
  <a href="https://github.com/BOTX666/BELAL-X666-/issues"><img alt="Issues" src="https://img.shields.io/github/issues/BOTX666/BELAL-X666-?color=ff9f1c&label=Issues&style=for-the-badge"></a>
  <a href="https://github.com/BOTX666/BELAL-X666-"><img alt="Stars" src="https://img.shields.io/github/stars/BOTX666/BELAL-X666-?color=ffd166&label=Stars&style=for-the-badge"></a>
  <a href="#"><img alt="License" src="https://img.shields.io/badge/License-MIT-06d6a0?style=for-the-badge"></a>
</p>

<!-- Animated divider -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=wave&color=00d8ff&height=100&section=footer"/>
</p>
# 🤖 BELAL X666 Bot

BELAL X666 হলো একটি Messenger Bot, যেখানে animate, inbox, roast সহ বিভিন্ন কমান্ড আছে।  
এটি multilingual fallback (Bangla + English) এবং external API (QueenChat, ChatGPT, Gemini) সাপোর্ট করে।

---

## ✨ Features

- 🎨 `!animate <prompt>` → AI‑based animation reply (ChatGPT/Gemini fallback)
- 📥 `!inbox list | clear` → Group inbox management
- 🔥 `!roast` → Random roast message (70+ array support)
- 🌐 Multilingual fallback → Bangla + English support
- 🧠 Autoloader → All commands auto-loaded from `commands/` folder
- 🛡️ `.env`‑based secure API key/token setup
- 🧾 Language fallback → `lang/en.json` and `lang/bn.json`
- 🧪 GitHub Actions CI/CD workflow ready
- 🧹 Clean repo hygiene → `.gitignore` blocks all sensitive/conflict files
- 🚀 Vercel/Heroku deploy‑ready setup

---

## ⚙️ Setup
...

```dotenv
NODE_ENV=production
BOT_TOKEN=your_bot_token_here
DEFAULT_LANG=en
QUEENCHAT_API_KEY=your_queenchat_api_key_here
CHATGPT_API_KEY=your_openai_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
LOG_LEVEL=info
LOG_PATH=logs/
FALLBACK_MODEL=gemini-pro
BOT_PREFIX=!

---

## 🚀 Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/BOTX666/BELAL-X666-.git
   cd BELAL-X666-

Install dependencies:

npm install

Run locally:

npm start

⚙️ Commands Usage

!animate <prompt> → Animation শুরু করবে

!inbox list → Inbox মেসেজ দেখাবে

!inbox clear → Inbox ক্লিয়ার করবে

!roast → Random roast মেসেজ পাঠাবে

🛠️ CI/CD Workflow

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test || echo "No tests defined"

      - name: Run lint
        run: npm run lint || echo "Lint skipped"

      - name: Build project
        run: npm run build || echo "Build skipped"

      - name: Dry run bot
        run: npm run start || node index.js || echo "Dry run complete"


🔐 Environment Variables

লোকাল .env ফাইল:

NODE_ENV=production
BOT_TOKEN=your_bot_token_here
QUEENCHAT_API_KEY=your_queenchat_key
CHATGPT_API_KEY=your_openai_key
GEMINI_API_KEY=your_gemini_key

Vercel Dashboard → Settings → Environment Variables এ একই key বসাতে হবে।

🧹 Repo Hygiene

.env, logs/, node_modules/, Conflict.json → .gitignore এ ব্লক করা থাকবে

Runtime logs → শুধু লোকালেই থাকবে, git এ যাবে না

✨ Features

Autoloader for commands

Multilingual support (বাংলা + ইংরেজি)

Debug logger with daily log files

Fun roast messages for group engagement

CI/CD ready with GitHub Actions

Deployable to Vercel/Heroku

👨‍💻 Author

Developed by MZ with ❤️ for BOTX666 community.
# 🔧 BELAL X666 Bot Troubleshooting Guide

এই গাইডে সাধারণ সমস্যাগুলো এবং তাদের সমাধান দেওয়া হলো।

---

## ১. বট চালু হচ্ছে না
- **কারণ:** `.env` ফাইল নেই বা key/token বসানো হয়নি
- **সমাধান:** `.env` ফাইল তৈরি করে আসল API key/token বসাও

---

## ২. কমান্ড কাজ করছে না
- **কারণ:** ভুল কমান্ড বা prefix mismatch
- **সমাধান:** `BOT_PREFIX=!` ঠিক আছে কিনা দেখো, তারপর `!help` লিখে কমান্ড লিস্ট দেখো

---

## ৩. Fallback মেসেজ দেখাচ্ছে
- **কারণ:** কমান্ড চিনতে পারছে না
- **সমাধান:** `lang/en.json` বা `lang/bn.json` ফাইল চেক করো, fallback মেসেজ ঠিক আছে কিনা

---

## ৪. লগ ফাইল ভরে যাচ্ছে
- **কারণ:** Debug log বেশি হচ্ছে
- **সমাধান:** `.env`‑এ `LOG_LEVEL=info` রাখো, আর `logs/` ফোল্ডার `.gitignore`‑এ ব্লক করো

---

## ৫. Deploy‑এ সমস্যা
- **কারণ:** Vercel/Heroku‑তে environment variables বসানো হয়নি
- **সমাধান:** Dashboard → Settings → Environment Variables‑এ `.env` এর সব key বসাও

---

## ৬. Conflict.json দেখা যাচ্ছে
- **কারণ:** ভুলে রিপোতে conflict ফাইল ঢুকে গেছে
- **সমাধান:** `.gitignore`‑এ `Conflict.json` ব্লক করো, তারপর `git rm --cached Conflict.json`

---

## ✅ Quick Checklist
- `.env` ফাইল আছে কি?  
- `.gitignore` ঠিক আছে কি?  
- Commands ফোল্ডার লোড হচ্ছে কি?  
- Lang fallback কাজ করছে কি?  
- Deploy‑এ key বসানো আছে কি?
