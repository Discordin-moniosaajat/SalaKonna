const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

const helpEmbed = new EmbedBuilder()
    .setColor(14177041)
    .setTitle('Help')
    .addFields(
        { name: 'User manual: ', 
          value: '> Locate a text channel where you can find a button to create a ticket. Clicking it will create you a private text channel which only you and the moderators can see. From this private text channel you can use /post command to send messages to a public text channel under a pseudonym. ' 
        },
        { name: 'List of commands: ', 
          value: '/help - gives you a user manual on how to use the bot \n /post - sends your messages to a text channel under a pseudonym' 
        },
    );

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("How to get started with the bot"),
    async execute(interaction) {
        console.log("help command used");
        await interaction.reply({
            embeds: [helpEmbed],
            ephemeral: true
        });
    }
}