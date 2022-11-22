const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder 
} = require('discord.js');

module.exports = {
    name: "channelCreate",
    async execute(channel) {
        console.log("channel created");
        channel.send({
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