const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

const helpEmbed = new EmbedBuilder()
    .setColor(14177041)
    .setTitle('Help')
    .addFields(
        { name: 'User manual: ', 
          value: '> Type /post command to send messages to a public text channel under a pseudonym. If your message contains sensitive content you can first use the /toggletw command to switch to a different text channel where your message will be sent.' 
        },
        { name: 'List of commands: ', 
          value: '/help - gives you a user manual on how to use the bot \n /post - sends your messages to a text channel under a pseudonym \n /toggletw - changes the channel where your anonymous message will be sent' 
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