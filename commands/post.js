const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const Logfile = require('../models/log');

require('dotenv').config();

let pseudoNames = ['Blue', 'Red', 'Green', 'Yellow', 'Orange', 'Purple'];

function removeUsedPseudoName(pseudoNames, pseudoName) {
    return pseudoNames.filter(function(ele) {
        return ele != pseudoName;
    });
};

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
    async execute(interaction) {
        console.log("post command used");

        //apparently you can also get the client from the interaction and you don't have to pass it in as a separate parameter
        const client = interaction.client;

        const targetChannel = client.channels.resolve('1021710965777117184') //bottispämmi 2
    
        message = interaction.options.getString("message").trim();
        if (!message) return;

        let pseudoName = pseudoNames[Math.floor(Math.random() * pseudoNames.length)]; // randomly picks 1 from the pseudoNames array
        pseudoNames = removeUsedPseudoName(pseudoNames, pseudoName); // removes the picked pseudoName from the pseudoNames array (using the removeUsedPseudoName function)

        if(message.length < 1950) {
            interaction.reply({
                content: `You wrote:\n> ${message}`,
                //ephemeral: true //makes the reply only seen by the one using the command
            });
            targetChannel.send(`**${pseudoName}** says:\n> ${message}`);
        } else {
            interaction.reply({
                content: `You wrote:\n> ${message.substring(0, 1950)}...`,
                //ephemeral: true
            });
            targetChannel.send(`**${pseudoName}** says:\n> ${message.substring(0, 1950)}...`);
            targetChannel.send(`...${message.substring(1950, 3900)}`);
        }

        // send interaction to log channel
        const logChannel = client.channels.resolve(process.env.LOG_CHANNEL_ID);
        // Embedded log message
        const logEmbed = new EmbedBuilder()
            .setColor(0x34eb49)
            .setTitle('Log message')
            .setAuthor({ name: `${interaction.user.username} sent anonymous message`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`${message}`)
            .addFields(
                { name: 'User:', value: `${interaction.user}`, inline: true },
                { name: 'ID:', value: `${interaction.user.id}`, inline: true },
                { name: 'Pseudo name:', value: `${pseudoName}`, inline: true },
                { name: 'From channel:', value: `${interaction.channel.name}`, inline: true },
            )
            .setTimestamp();

        logChannel.send({ embeds: [logEmbed] });

        // send data to mongoDB

        const logData = new Logfile({
            id: interaction.user.id,
            channel: interaction.channel.name,
            pseudo: pseudoName ,
        })
        logData.save();

      

        console.log( logData);
    }
}
    