module.exports = {
  name: "inbox",
  execute: ({ client, from, args, MESSAGES }) => {
    if (!args.length) {
      return client.sendText(from, MESSAGES?.inbox_usage || "Usage: !inbox list | clear");
    }
    const action = args[0].toLowerCase();

    if (action === "list") {
      const inboxMessages = [
        "Message 1: Welcome to BELAL X666!",
        "Message 2: Try !help for guidance",
        "Message 3: New features rolling out..."
      ];
      return client.sendText(from, inboxMessages.join("\n"));
    }

    if (action === "clear") {
      return client.sendText(from, "🗑 Inbox cleared (placeholder).");
    }

    return client.sendText(from, MESSAGES?.inbox_unknown || "Unknown inbox action.");
  }
};
