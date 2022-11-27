const { SlashCommandBuilder } = require('discord.js');
const Userfile = require('../models/user');
const generatePseudonym = require('../utils/generatePseudonym');

require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("toggletw")
        .setDescription("Switch the channel your messages are sent to"),
    async execute(interaction) {
        console.log("toggle tw command used");

        const regularChannelId = process.env.ADVICE_CHANNEL_ID;
        const twChannelId = process.env.TW_ADVICE_CHANNEL_ID;

        // Fetch the user from DB (if it exists)
        let user = await Userfile.findOne({uid: interaction.user.id});
        
        if (user) {
            // Updating the channel
            if (user.channel === twChannelId) {
                user.channel = regularChannelId;
            } else {
                user.channel = twChannelId;
            }
        } else {
            // Create a new user
            pseudonym = generatePseudonym();

            user = new Userfile({
                uid: interaction.user.id,
                channel: twChannelId,
                pseudo: pseudonym,
            })
        }

        await user.save();

        await interaction.reply({
            content: `Your anonymous messages will now be sent to <#${user.channel}>. Use the command again to switch back.`,
            ephemeral: true
        });
    }
}