require('dotenv').config();

const botUID = process.env.CLIENT_ID;

module.exports = {
    name: "messageCreate",
    execute(interaction) {

        //this needs some reformatting

        // The message needs to be a reply and not be sent by the bot and it has to have a mention of the bot
        if (!interaction.reference) return;
        if (interaction.mentions.repliedUser?.id !== botUID) return;
        if (interaction.author.id === botUID) return;

        console.log(`channel: ${interaction.channel}`)
        console.log(interaction.reference)
        interaction.channel.messages.fetch(interaction.reference.messageId)
            .then(message => console.log(message.content))
            .catch(console.error);


        /* interaction.channel.messages.fetch("701574160211771462")
            .then(message => console.log(message))
            .catch(console.error); */

        /* // Ignore messages sent by the bot
        if (interaction.author == client.user) return;

        // Setting up the source channel
        // and the target channel
        if (interaction.channelId === '1019734223843774554') {
            const targetChannel = client.channels.resolve('1021710965777117184');
            targetChannel.send(interaction);

        // This is the same thing
        // but the other way around
        } else if (interaction.channelId === '1021710965777117184') {
            const targetChannel = client.channels.resolve('1019734223843774554');
            targetChannel.send(interaction);
        } */
    }
}