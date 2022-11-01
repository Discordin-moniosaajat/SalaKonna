const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder 
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket")
        .setDescription("Create a ticket channel"),
    async execute(interaction) {
        console.log("ticket command used");
        interaction.reply({
            content: 'Button1',
            components: [
                new ActionRowBuilder().setComponents(
                    new ButtonBuilder()
                        .setCustomId('button1')
                        .setLabel('Create Ticket')
                        .setStyle(ButtonStyle.Primary)
                ),
            ]
        })
    }
}