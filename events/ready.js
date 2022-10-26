const { ActivityType } = require('discord.js');

module.exports = {
    name: "ready",
    execute(client) {
        console.log(`Logged in as ${client.user.tag}`)

        client.user.setActivity({
            name: `how to develop a bot :)`,
            type: ActivityType.Watching
        });

        client.user.setStatus('online')
    }
}