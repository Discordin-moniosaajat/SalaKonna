const { SlashCommandBuilder } = require('discord.js');

const postCommand = new SlashCommandBuilder()
    .setName("post")
    .setDescription("post anonymously on a public channel")
    .addStringOption((option) =>
        option
            .setName("message")
            .setDescription("content of the message you want to post")
            .setRequired(true)
    )

module.exports = postCommand.toJSON();