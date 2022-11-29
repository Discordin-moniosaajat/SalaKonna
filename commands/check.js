const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Userfile = require('../models/user');
const generatePseudonym = require('../utils/generatePseudonym');

require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("check")
        .setDescription("Check your current pseudonym"),
    
    async execute(interaction) {
        console.log("check command used");

        const client = interaction.client;

        // Fetch the user from DB (if it exists)
        let user = await Userfile.findOne({uid: interaction.user.id});    
        
        // Posting the message about current pseudonym
        if (user) {
            await interaction.reply({
                content: `Your current pseudonym is:\n> ${user.pseudo} \n Use /change to change your pseudonym!`,
                ephemeral: true //makes the reply only seen by the one using the command
            });
        } else {
             //no existing user, so lets create one and give a pseudonym
            pseudonym = generatePseudonym();
            user = new Userfile({
                uid: interaction.user.id,
                channel: process.env.ADVICE_CHANNEL_ID,
                pseudo: pseudonym,
            })
            await user.save();

            await interaction.reply({
                content: `You didn't have pseudonym, your new one is:\n> ${user.pseudo} \n use /change to change your pseudonym!`,
                ephemeral: true
            });
        }
    }
}