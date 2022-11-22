const { 
    ActivityType,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder  
} = require('discord.js');

module.exports = {
    name: "ready",
    execute(client) {
        console.log(`Logged in as ${client.user.tag}`)

        client.user.setActivity({
            name: `how to develop a bot :)`,
            type: ActivityType.Watching
        });

        client.user.setStatus('online');

        const buttonChannel = client.channels.resolve('1039497448097321050'); // tärkeät napit -channel
        buttonChannel.send({
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