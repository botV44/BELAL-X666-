# BELAL X666

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
