const {
    EmbedBuilder 
} = require('discord.js');

module.exports = {
    name: "channelCreate",
    async execute(channel) {
        console.log("channel created");
        if (channel.name.includes("ticket-")) {
            await channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(0x34eb49)
                        .setTitle('Welcome to the ticket!')
                ],
            })
        }
    }
}