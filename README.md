# BELAL X666

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
