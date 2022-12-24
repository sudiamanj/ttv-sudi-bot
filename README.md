# Sudi_Bot

## Setup

-   Install Node.js
    -   If you have `nvm`, use `nvm install` to ensure that the correct version is installed
-   Copy `.env.template` into `.env` and fill it in
    -   `CHANNEL_NAME` is the channel that you want the bot to follow
    -   Get `CLIENT_ID` and `CLIENT_SECRET` from [Twitch developer console](https://dev.twitch.tv/console/apps)
-   Copy `tokens.json.template` into `tokens.json` and fill it in
    -   Get `accessToken` and `refreshToken` by [completing the OAuth flow](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth)
    -   Leave `expiresIn` and `obtainmentTimestamp` as is
-   Run `npm install && npm start` and wait for the connected message
-   Grant moderator to the bot in your channel
-   The bot should now respond to commands!
