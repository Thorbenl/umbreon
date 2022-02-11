import { Client } from "discord.js";
import {REST} from "@discordjs/rest";
import {CommandList, InteractionCommandList} from "../commands/_CommandList";
import {Routes} from "discord-api-types/v9";

export const onReady = async (bot: Client) => {
    const rest = new REST({ version: "9" }).setToken(
        process.env.BOT_TOKEN as string
    );

    const interactionCommandData = InteractionCommandList.map((command) => command.data.toJSON());

    await rest.put(
        Routes.applicationGuildCommands(
            bot.user?.id || "missing id",
            process.env.GUILD_ID as string
        ),
        { body: interactionCommandData }
    );

    console.log("Discord ready!");
};