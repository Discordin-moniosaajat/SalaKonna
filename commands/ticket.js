const {
    SlashCommandBuilder, 
    ChannelType, 
    PermissionsBitField 
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket")
        .setDescription("Create a ticket channel"),
    async execute(interaction, client) {
        console.log("ticket command used");

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
                    allow: [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.ReadMessageHistory
                    ]   
                },

            ]
        });
    }
}