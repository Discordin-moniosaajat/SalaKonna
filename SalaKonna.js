const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { 
    Client, 
    GatewayIntentBits, 
    Partials, 
    ActivityType, 
    Routes,
    Collection
} = require('discord.js');
const helpCommand = require("./commands/help.js");
const postCommand = require('./commands/post.js');

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

//gathering all of the commands
client.commands = new Collection();
commandsArray = []

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
    commandsArray.push(command.data.toJSON());
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)

    client.user.setActivity({
        name: `how to develop a bot :)`,
        type: ActivityType.Watching
    });
    client.user.setStatus('online')
});

//responding to commands
client.on('interactionCreate', async interaction => {
    //gets the command from the collection saved in client without having to have a lot of if/else statements
    if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
    //returns if there's no command found
	if (!command) return;

    //executing the function inside the command file
    try {
		await command.execute(interaction, client);
	} catch (error) {
		console.error(error);
	    interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
    }
});

/* client.on('messageCreate', (interaction) => {

    // Ignore messages sent by the bot
    if (interaction.author == client.user) return;

    // Setting up the source channel
    // and the target channel
    if (interaction.channelId === '1019734223843774554') {
        const targetChannel = client.channels.resolve('1021710965777117184');
        targetChannel.send(interaction);

    // This is the same thing
    // but the other way around
    } else if (interaction.channelId === '1021710965777117184') {
        const targetChannel = client.channels.resolve('1019734223843774554');
        targetChannel.send(interaction);
    }
}); */

//making commands and logging in        
async function main() {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commandsArray,
        });
        //yes, the login was moved here, this can be reconsidered since i don't know where it's supposed to go
        client.login(TOKEN);
    } catch (err) {
        console.log(err);
    }
}

main();
