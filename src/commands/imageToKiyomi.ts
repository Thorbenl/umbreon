import { Command } from "../interfaces/Command";
import {SlashCommandBuilder} from "@discordjs/builders";
const axios = require('axios').default;

async function sendToKiyomi(url: string) {
    try {
        const response = await axios.post('https://webhook.site/b3424aba-f228-4a52-a62d-b25e42914cba?',
        {
            url: url
        })
        return response
    } catch (error) {
        console.error(error);
    }
}

export const imageToKiyomi: Command = {
    data: new SlashCommandBuilder()
        .setName("kiyomiupload")
        .setDescription("Uploading an image to Kiyomi")
        .addStringOption((option) =>
            option
                .setName("image_url")
                .setDescription("The url to an image")
                .setRequired(true)
        ),
    run: async (interaction) => {
        await interaction.deferReply()
        const response = await sendToKiyomi(interaction.options.getString("image_url", true))
        console.log(response)
        await interaction.followUp(`${interaction.user.username} has sent an image to Kiyomi`)
    },
};