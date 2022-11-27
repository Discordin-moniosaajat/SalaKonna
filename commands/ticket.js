const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder 
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket")
        .setDescription("Create a ticket channel"),
    async execute(interaction) {
        console.log("ticket command used");
        interaction.reply("Ticket creation button created");

        const buttonChannel = interaction.client.channels.resolve('1039497448097321050'); // tärkeät napit -channel
        
        await buttonChannel.send({
            embeds: [
                new EmbedBuilder()
                    .setColor(0x34eb49)
                    .setTitle('This button creates a ticket')
            ],
            components: [
                new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('button1')
                            .setLabel('Create Ticket')
                            .setStyle(ButtonStyle.Primary)
                    ),
            ]
        })
    }
}