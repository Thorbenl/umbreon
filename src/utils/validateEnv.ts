export const validateEnv = () => {
    if (!process.env.BOT_TOKEN) {
        console.warn("Missing Discord bot token.");
        return false;
    }
    if (!process.env.GUILD_ID) {
        console.warn("Missing Server ID.");
        return false;
    }
    return true;
};
