const { Client, GatewayIntentBits, Partials, ActivityType } = require('discord.js')
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

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)

    client.user.setActivity({
        name: `how to develop a bot :)`,
        type: ActivityType.Watching
    });

    client.user.setStatus('online')
});


client.login(process.env.TOKEN)