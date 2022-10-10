const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('./help');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("post")
        .setDescription("post anonymously on a public channel")
        .addStringOption((option) =>
            option
                .setName("message")
                .setDescription("content of the message you want to post")
                .setRequired(true)
        ),
    async execute(interaction, client) {
        console.log("post command used");

        message = interaction.options.getString("message")

        const pseudoNames = ['Blue', 'Red', 'Green', 'Yellow', 'Orange', 'Purple'];
        const pseudoName = pseudoNames[Math.floor(Math.random() * pseudoNames.length)]; // randomly picks 1 from the pseudoNames array
        
        //send the message to a public channel
        const targetChannel = client.channels.resolve('1021710965777117184') //bottispämmi 2
        targetChannel.send(`**${pseudoName}** says:\n> ${message}`) //might make this an embed later on

        interaction.reply({
            content: `You wrote:\n> ${message}`,
            //ephemeral: true //makes the reply only seen by the one using the command
        });    

        // send interaction to log channel
        const logChannel = client.channels.resolve('1024957345761083423') 
        logChannel.send(` User: ${interaction.user.tag}, ${interaction.user.username} \nUser ID:(${interaction.user.id})\nPseudo name: ${pseudoName} \nFrom channel #${interaction.channel.name} \n> ${message}`)
        console.log()
        
    }
}


