const { Client, GatewayIntentBits, SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const axios = require('axios');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// HWID RESET ACTION
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

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// SLASH BUILD
const commands = [
    new SlashCommandBuilder()
        .setName('hwreset')
        .setDescription('Resets the HWID for a specified user.')
        .addStringOption(option =>
            option.setName('app')
                .setDescription('Select the app')
                .setRequired(true)
                .addChoices(
                    { name: 'Fortnite Temp', value: 'seller_key_1' },
                    { name: 'Fortnite Priv', value: 'seller_key_2' },
                    { name: 'Fortnite Pub', value: 'seller_key_3' },
                    { name: 'Fortnite Internal', value: 'seller_key_4' },
                    { name: 'Perm', value: 'seller_key_5' }
                ))
        .addStringOption(option =>
            option.setName('key')
                .setDescription('Key of the user to reset HWID for')
                .setRequired(true))
].map(command => command.toJSON());

// COMMAND REGISTER
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

// RESET COMMAND
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName, options, member } = interaction;

    if (commandName === 'hwreset') {
        const allowedRoleIDs = ['role_id_1', 'role_id_2']; // FILL IN ROLE IDS
        const memberRoles = member.roles.cache.map(role => role.id);
        const hasPermission = allowedRoleIDs.some(roleID => memberRoles.includes(roleID));
        
        if (!hasPermission) {
            await interaction.reply('You do not have permission to use this command.');
            return;
        }

        const appChoice = options.getString('app');
        const userKey = options.getString('key');

        let sellerKey;
        switch (appChoice) {
            case 'seller_key_1':
                sellerKey = process.env.SELLER_KEY_1;
                break;
            case 'seller_key_2':
                sellerKey = process.env.SELLER_KEY_2;
                break;
            case 'seller_key_3':
                sellerKey = process.env.SELLER_KEY_3;
                break;
            case 'seller_key_4':
                sellerKey = process.env.SELLER_KEY_4;
                break;
            case 'seller_key_5':
                sellerKey = process.env.SELLER_KEY_5;
                break;
            default:
                await interaction.reply('Invalid app selected.');
                return;
        }

        const message = await resetHwid(sellerKey, userKey);
        await interaction.reply(`Reset HWID Response: ${message}`);
    }
});

client.login(process.env.DISCORD_TOKEN);
