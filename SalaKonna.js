const { REST } = require('@discordjs/rest');
const { Client, GatewayIntentBits, Partials, ActivityType, Routes } = require('discord.js')

const client = new Client({
    intents: [ /*https://discord-api-types.dev/api/discord-api-types-v10/enum/GatewayIntentBits */
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences
    ],
    partials: [ /*https://discord.js.org/#/docs/discord.js/14.0.3/typedef/Partials */
        Partials.Message,
        Partials.User,
        Partials.Channel,
        Partials.GuildMember
    ]
});

require('dotenv').config();
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const rest = new REST({ version: '10' }).setToken(TOKEN);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)

    client.user.setActivity({
        name: `how to develop a bot :)`,
        type: ActivityType.Watching
    });
    client.user.setStatus('online')
});

async function main() {
    const commands = [
        {
            name: "help",
            description: "How to get started with the bot"
        }
    ];
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commands,
        });
        client.login(TOKEN);
    } catch (err) {
        console.log(err);
    }
  }

main();