const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Userfile = require('../models/user');
const generatePseudonym = require('../utils/generatePseudonym');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("change")
        .setDescription("Change your current pseudonym"),
    
    async execute(interaction) {
        console.log("change command used");

        const client = interaction.client;

        // Fetch the user from DB (if it exists)
        let user = await Userfile.findOne({uid: interaction.user.id});    
        
        // changing the pseudonym and posting it on message
        if (user) {
            //logic to change pseudo
            newpseudonym = generatePseudonym();
            user.pseudo = newpseudonym;
            await user.save();
        
            await interaction.reply({
                content: `Your new pseudonym is:\n> ${user.pseudo}`,
                ephemeral: true //makes the reply only seen by the one using the command
            });
        } else {
            //no existing user, so lets create one and give a pseudo
            pseudonym = generatePseudonym();
            user = new Userfile({
                uid: interaction.user.id,
                channel: process.env.ADVICE_CHANNEL_ID,
                pseudo: pseudonym,
            })
            await user.save();

            await interaction.reply({
                content: `Your pseudonym is:\n> ${user.pseudo}`,
                ephemeral: true
            });
        }
    }
}