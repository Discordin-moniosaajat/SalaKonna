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

        // Fetch the user from DB (if it exists)
        let user = await Userfile.findOne({uid: interaction.user.id});    
        
        let newPseudonym = generatePseudonym();

        const embed = new EmbedBuilder()
            .setColor(0x34eb49)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        // changing the pseudonym and posting it on message
        if (user) {
            //logic to change pseudo
            user.pseudo = newPseudonym;
            await user.save();
        
            embed.setDescription(`Your new pseudonym is:\n> ${user.pseudo}`);
        } else {
            //no existing user, so lets create one and give a pseudo
            user = new Userfile({
                uid: interaction.user.id,
                channel: process.env.ADVICE_CHANNEL_ID,
                pseudo: newPseudonym,
            })
            await user.save();

            embed.setDescription(`Your pseudonym is:\n> ${user.pseudo}`);
        }

        await interaction.reply({ embeds: [embed], ephemeral: true});
    }
}