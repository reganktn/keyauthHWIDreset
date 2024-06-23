const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const config = require('../config.json');

async function resetHwid(sellerKey, userKey) {
    const url = `https://keyauth.win/api/seller/?sellerkey=${sellerKey}&type=resetuser&user=${userKey}`;
    try {
        const response = await axios.get(url, { headers: { 'accept': 'application/json' } });
        return response.data.message;
    } catch (error) {
        console.error('Error resetting HWID:', error);
        return 'Error: Unable to reset HWID.';
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hwreset')
        .setDescription('Resets the HWID for a specified user.')
        .addStringOption(option =>
            option.setName('app')
                .setDescription('Select the app')
                .setRequired(true)
                .addChoices(...config.choices))
        .addStringOption(option =>
            option.setName('key')
                .setDescription('Key of the user to reset HWID for')
                .setRequired(true)),
    async execute(interaction, allowedRoleIDs) {
        const memberRoles = interaction.member.roles.cache.map(role => role.id);
        const hasPermission = allowedRoleIDs.some(roleID => memberRoles.includes(roleID));
        
        if (!hasPermission) {
            await interaction.reply('You do not have permission to use this command.');
            return;
        }

        const appChoice = interaction.options.getString('app');
        const userKey = interaction.options.getString('key');
        const sellerKey = config.sellerKeys[appChoice];

        if (!sellerKey) {
            await interaction.reply('Invalid app selected.');
            return;
        }

        const message = await resetHwid(sellerKey, userKey);
        await interaction.reply(`Reset HWID Response: ${message}`);
    }
};
