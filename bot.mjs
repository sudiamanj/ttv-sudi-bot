import * as dotenv from "dotenv";
import { getAuthProvider } from "./auth.mjs";
import { ChatClient } from "@twurple/chat";

// Import commands here and add them to commandRegistry
// Commands should be functions in the form of (user: str, arg?: str) => str
// They will be invoked when user sends a message in the form of <!command arg>
import ygocard from "./commands/ygocard.mjs";
const commandRegistry = { ygocard };

const MESSAGE_MAX_LENGTH = 500;

(async function () {
  dotenv.config();
  const authProvider = await getAuthProvider();
  const chatClient = new ChatClient({
    authProvider,
    channels: [process.env.CHANNEL_NAME],
  });
  await chatClient.connect();

  console.log("👍 Connected!");

  chatClient.onMessage(async (channel, user, text) => {
    try {
      const message = text.trim();
      if (!message.startsWith("!")) {
        return;
      }
      const [cmd, arg] = message.split(/ (.*)/, 2);
      console.log(`✔️ Received command: ${cmd} | Argument: ${arg}`);
      const commandFn = commandRegistry[cmd.slice(1).toLowerCase()];
      if (typeof commandFn !== "function") {
        console.log(`🔥 ERROR: ${cmd} - Not in the command registry.`);
        return;
      }
      const response = await commandFn(user, arg?.trim());
      if (typeof response !== "string") {
        console.log(`🔥 ERROR: ${cmd} - Did not return a string.`);
        return;
      }
      for (let i = 0; i < response.length; i += MESSAGE_MAX_LENGTH) {
        chatClient.say(channel, response.slice(i, i + MESSAGE_MAX_LENGTH));
      }
    } catch (e) {
      console.log("🔥 ERROR: Message handler failed.");
      console.error(e);
    }
  });
})();
