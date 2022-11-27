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

        // Fetch the user from DB (if it exists)
        let user = await Userfile.findOne({uid: interaction.user.id});
        
        if (user) {
            // Updating the channel
            if (user.channel === process.env.TW_ADVICE_CHANNEL_ID) {
                user.channel = process.env.ADVICE_CHANNEL_ID;
            } else {
                user.channel = process.env.TW_ADVICE_CHANNEL_ID;
            }
        } else {
            // Create a new user
            pseudonym = generatePseudonym();

            user = new Userfile({
                uid: interaction.user.id,
                channel: process.env.TW_ADVICE_CHANNEL_ID,
                pseudo: pseudonym,
            })
        }

        await user.save();

        if (user.channel === process.env.TW_ADVICE_CHANNEL_ID) {
            await interaction.reply({
                content: `Your anonymous messages will now be sent to the tw advice channel`,
                ephemeral: true
            });
        } else {
            await interaction.reply({
                content: `Your anonymous messages will now be sent to the regular advice channel`,
                ephemeral: true
            });
        }
    }
}