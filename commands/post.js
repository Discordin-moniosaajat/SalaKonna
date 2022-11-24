const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const Userfile = require('../models/user');
const generatePseudonym = require('../utils/generatePseudonym');

require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("post")
        .setDescription("Post anonymously on a public channel")
        .addStringOption((option) =>
            option
                .setName("message")
                .setDescription("Content of the message you want to post")
                .setRequired(true)
        ),
    async execute(interaction) {
        console.log("post command used");

        //apparently you can also get the client from the interaction and you don't have to pass it in as a separate parameter
        const client = interaction.client;

        const targetChannel = client.channels.resolve(process.env.ADVICE_CHANNEL_ID);
    
        message = interaction.options.getString("message").trim();
        if (!message) return;

        // Fetch the user from DB (if it exists)
        let user = await Userfile.findOne({uid: interaction.user.id});
        
        if (user) {
            // Updating the date
            user.updatedAt = new Date(0);
            user.save();
        } else {
            // Create a pseudonym and save user to DB
            pseudonym = generatePseudonym();

            user = new Userfile({
                uid: interaction.user.id,
                channel: process.env.ADVICE_CHANNEL_ID,
                pseudo: pseudonym,
            })
            user.save();
        }

        //Posting the message and replying to the command

        if (message.length < 1950) {
            interaction.reply({
                content: `You wrote:\n> ${message}`,
                //ephemeral: true //makes the reply only seen by the one using the command
            });
            targetChannel.send(`**${user.pseudo}** says:\n> ${message}`);
        } else {
            interaction.reply({
                content: `You wrote:\n> ${message.substring(0, 1950)}...`,
                //ephemeral: true
            });
            targetChannel.send(`**${user.pseudo}** says:\n> ${message.substring(0, 1950)}...`);
            targetChannel.send(`...${message.substring(1950, 3900)}`);
        }

        // Logging the message

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
                { name: 'Pseudonym:', value: `${user.pseudo}`, inline: true },
                { name: 'From channel:', value: `${interaction.channel.name}`, inline: true },
            )
            .setTimestamp();

        logChannel.send({ embeds: [logEmbed] }); 
    }
}