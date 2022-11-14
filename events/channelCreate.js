const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle 
} = require('discord.js');

module.exports = {
    name: "channelCreate",
    async execute(channel) {
        console.log("channel created");
        channel.send({
            content: 'Button1',
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