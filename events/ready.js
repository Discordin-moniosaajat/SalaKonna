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
            name: `and ready to anonymise you :)`,
            type: ActivityType.Listening
        });

        client.user.setStatus('online');     
    }
}