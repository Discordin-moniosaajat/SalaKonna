const {
    ChannelType, 
    PermissionsBitField 
} = require('discord.js');

module.exports = {
    async execute(interaction) {

        console.log("Create Ticket -button pressed");

        const channel = await interaction.member.guild.channels.create({
            name: `ticket: ${interaction.user.tag}`, 
            type: ChannelType.GuildText,
            position: 1,
            permissionOverwrites: [
                {
                    id: interaction.user.id,
                    allow: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.ReadMessageHistory
                    ]   
                },
                {
                    id: interaction.member.guild.roles.everyone.id,
                    deny: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.ReadMessageHistory
                    ]   
                },

            ]
        });

        interaction.reply({
            content: 'New ticket created!'
        })
    }
}