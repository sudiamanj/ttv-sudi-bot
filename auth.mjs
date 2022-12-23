import { promises as fs } from "fs";
import { RefreshingAuthProvider } from "@twurple/auth";

const TOKENS_FILE_PATH = "./tokens.json";

/**
 * In order to authenticate with Twitch, you must have a .env file initialized
 * with CLIENT_ID and CLIENT_SECRET, and a valid tokens.json file.
 *
 * @see https://twurple.js.org/docs/examples/chat/basic-bot.html
 */
export async function getAuthProvider() {
  const tokenData = JSON.parse(await fs.readFile(TOKENS_FILE_PATH, "UTF-8"));
  return new RefreshingAuthProvider(
    {
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      onRefresh: async (newTokenData) =>
        await fs.writeFile(
          TOKENS_FILE_PATH,
          JSON.stringify(newTokenData, null, 4),
          "UTF-8"
        ),
    },
    tokenData
  );
}
