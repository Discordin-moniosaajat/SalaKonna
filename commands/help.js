const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("How to get started with the bot"),
    async execute(interaction) {
        console.log("help command used");

        return interaction.reply({
            //if you want a custom emoji in the message, you'll have to get the name and the id,
            //you can get this by typing \:pensiveorange: in a discord chat and pressing enter
            content: "We don't have answers for you yet... <:pensiveorange:1019734832508579850>",
        });
    }
}