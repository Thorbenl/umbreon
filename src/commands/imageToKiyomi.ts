import { Command } from "../interfaces/Command";
import {SlashCommandBuilder} from "@discordjs/builders";
const axios = require('axios').default;
const NodeFormData = require('form-data');

async function sendToKiyomi(url: string, discordId: string) {
    const kiyomiURL = "https://kiyomi.io/api/image/upload"
    const formData = new NodeFormData();
    formData.append('file', url);
    formData.append('discordId', discordId);
    const formDataHeaders = formData.getHeaders();
    try {
        return await axios.post(kiyomiURL, formData, {
            headers: {
                "Authorization": "KIYOMI_7c9ff7152ad4dbdba00024b810ae08377d2d8f3dbd7aa442f74a16aca2b7a82b",
                ...formDataHeaders
            },
        });
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
        const response = await sendToKiyomi(
            interaction.options.getString("image_url", true),
            interaction.user.id
        )
        console.log(response)
        await interaction.followUp(`${interaction.user.username} has sent an image to Kiyomi`)
    },
};