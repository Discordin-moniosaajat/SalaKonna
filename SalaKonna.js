const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { 
    Client, 
    GatewayIntentBits, 
    Partials,
    Routes,
    Collection
} = require('discord.js');

const database = require('./database.js')

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

//saving commands to client and the array
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
    commandsArray.push(command.data.toJSON());
}

// Event handling
// All of the events (code starting with "client.on") can be found in the events folder
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	
	client.on(event.name, (...args) => event.execute(...args));
}

//uploading commands and logging in        
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
