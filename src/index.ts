import { Client } from "discord.js";
import {IntentOptions} from "./config/IntentOptions";
import {validateEnv} from "./utils/validateEnv";
import {onInteraction} from "./events/onInteraction";
import {onReady} from "./events/onReady";

(async () => {
    if (!validateEnv()) return;
    const bot = new Client({intents: IntentOptions});
    bot.on("ready", async () => await onReady(bot));
    bot.on(
        "interactionCreate",
        async (interaction) => await onInteraction(interaction)
    );
    await bot.login(process.env.BOT_TOKEN);
})();