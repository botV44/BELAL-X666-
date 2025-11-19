const { spawn } = require("child_process");
const axios = require("axios");
const logger = require("./utils/log");

//========= Create website for dashboard/uptime =========//
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(port, () => {
  logger(`Server is running on port ${port}...`, "[ Belal Starting ]");
}).on("error", (err) => {
  if (err.code === "EACCES") {
    logger(`Permission denied. Cannot bind to port ${port}.`, "[ Belal Error ]");
  } else {
    logger(`Server error: ${err.message}`, "[ Belal Error ]");
  }
});

//========= Create start bot and make it loop =========//
global.countRestart = global.countRestart || 0;

function startBot(message) {
  if (message) logger(message, "[ Belal Starting ]");

  const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "Main.js"], {
    cwd: __dirname,
    stdio: "inherit",
    shell: true
  });

  child.on("close", (codeExit) => {
    if (codeExit !== 0 && global.countRestart < 5) {
      global.countRestart += 1;
      logger(`Bot exited with code ${codeExit}. Restarting... (${global.countRestart}/5)`, "[ Belal Restarting ]");
      startBot();
    } else {
      logger(`Bot stopped after ${global.countRestart} restarts.`, "[ Belal Stopped ]");
    }
  });

  child.on("error", (error) => {
    logger(`An error occurred: ${JSON.stringify(error)}`, "[ Belal Error ]");
  });
}

//========= Check update from GitHub =========//
axios.get("https://raw.githubusercontent.com/BOTX666/BELAL-X666-/main/package.json")
  .then((res) => {
    logger(res.data.name, "[ Belal NAME ]");
    logger(`Version: ${res.data.version}`, "[ Belal VERSION ]");
    logger(res.data.description, "[ Belal DESCRIPTION ]");
  })
  .catch((err) => {
    logger(`Failed to fetch update info: ${err.message}`, "[ Belal Update Error ]");
  });

// Start the bot
startBot();
