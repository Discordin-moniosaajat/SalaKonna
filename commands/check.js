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

        // Fetch the user from DB (if it exists)
        let user = await Userfile.findOne({uid: interaction.user.id});    
        
        const embed = new EmbedBuilder()
            .setColor(0x34eb49)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        // Posting the message about current pseudonym
        if (user) {
            embed.setDescription(`Your current pseudonym is:\n\n***${user.pseudo}*** \n\n Use \`/change\` to change your pseudonym!`);
        } else {
             //no existing user, so lets create one and give a pseudonym
            pseudonym = generatePseudonym();
            user = new Userfile({
                uid: interaction.user.id,
                channel: process.env.ADVICE_CHANNEL_ID,
                pseudo: pseudonym,
            })
            await user.save();
            embed.setDescription(`You didn't have a pseudonym, your new one is:\n> ${user.pseudo} \n use \`/change\` to change your pseudonym!`);
        }

        await interaction.reply({ embeds: [embed], ephemeral: true}); 
    }
}