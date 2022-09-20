const { REST } = require('@discordjs/rest');
const { 
    Client, 
    GatewayIntentBits, 
    Partials, 
    ActivityType, 
    Routes 
} = require('discord.js');

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

//responding to commands
client.on('interactionCreate', (interaction) => {
    if (interaction.isChatInputCommand()) {
        if (interaction.commandName === 'help') {
            console.log("help command used");
            interaction.reply({
                //if you want a custom emoji in the message, you'll have to get the name and the id,
                //you can get this by typing \:pensiveorange: in a discord chat and pressing enter
                content: "We don't have answers for you yet... <:pensiveorange:1019734832508579850>",
            });
        } else if (interaction.commandName === 'close') {
            console.log("close command used");
            process.exit();
        }
    }
});

client.on('messageCreate', (interaction) => {

    if (interaction.author == client.user) return;

    if (interaction.channelId === '1021447723825774613') {
        var target_channel = client.channels.resolve('1021447678070100119');
        target_channel.send(interaction);
    } else if (interaction.channelId === '1021447678070100119') {
        var target_channel = client.channels.resolve('1021447723825774613');
        target_channel.send(interaction);
    }
});

//making commands and logging in        
async function main() {
    const commands = [
        {
            name: "help",
            description: "How to get started with the bot"
        },
        {
            name: "close",
            description: "Shuts down the node.js server"
        }
    ];
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commands,
        });
        //yes, the login was moved here, this can be reconsidered since i don't know where it's supposed to go
        client.login(TOKEN);
    } catch (err) {
        console.log(err);
    }
  }

main();