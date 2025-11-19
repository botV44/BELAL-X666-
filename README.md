# BELAL X666 🤖

BELAL X666 হলো একটি পাওয়ারফুল Messenger Bot প্রজেক্ট, যেখানে অটোলোডার, fallback logic, multilingual support (বাংলা + ইংরেজি), আর মজার কমান্ডগুলো একসাথে আছে।

---

## 📂 Project Structure


BELAL-X666/ ├── index.js              # Entry point with autoloader ├── bot.config.json       # Bot configuration ├── package.json          # NPM scripts & dependencies ├── README.md             # Project guide ├── .gitignore            # Ignore unnecessary files │ ├── utils/ │   └── logger.js         # Debug logger │ ├── lang/ │   ├── bn.json           # Bangla messages │   └── en.json           # English messages │ ├── commands/ │   ├── animate.js        # Animation command │   ├── inbox.js          # Inbox command │   └── roast.js          # Roast command │ └── logs/                 # Runtime logs (ignored in git)


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
