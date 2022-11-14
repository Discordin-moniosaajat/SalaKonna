require('dotenv').config();

const botUID = process.env.CLIENT_ID;

module.exports = {
    name: "messageCreate",
    execute(message) {
        //this needs some reformatting

        // The message needs to be a reply and not be sent by the bot and it has to have a mention of the bot
        if (!message.reference) return;
        if (message.mentions.repliedUser?.id !== botUID) return;
        if (message.author.id === botUID) return;

        console.log(`channel: ${message.channel}`)
        console.log(message.reference)
        message.channel.messages.fetch(message.reference.messageId)
            .then(message => console.log(message.content))
            .catch(console.error);


        /* message.channel.messages.fetch("701574160211771462")
            .then(message => console.log(message))
            .catch(console.error); */

        /* // Ignore messages sent by the bot
        if (message.author == client.user) return;

        // Setting up the source channel
        // and the target channel
        if (message.channelId === '1019734223843774554') {
            const targetChannel = client.channels.resolve('1021710965777117184');
            targetChannel.send(message);

        // This is the same thing
        // but the other way around
        } else if (message.channelId === '1021710965777117184') {
            const targetChannel = client.channels.resolve('1019734223843774554');
            targetChannel.send(message);
        } */
    }
}