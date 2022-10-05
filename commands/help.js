const { SlashCommandBuilder } = require('discord.js');

const helpCommand = new SlashCommandBuilder()
    .setName("help")
    .setDescription("How to get started with the bot")

module.exports = helpCommand.toJSON();