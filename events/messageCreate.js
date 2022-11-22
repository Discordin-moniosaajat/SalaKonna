require('dotenv').config();
const { 
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder  
} = require('discord.js');

const Userfile = require('../models/user');

const botUID = process.env.CLIENT_ID;

module.exports = {
    name: "messageCreate",
    async execute(message) {

        await replyingToAnonMessage(message);

        // Here is a function to maintain
        // just one active message
        // and components in the buttons-channel
        if (message.author.id === botUID) return;
        if (message.channel.id === '1039497448097321050') { // tärkeät napit -channel

            //console.log(message);
            const prevMessages = await message.channel.messages.fetch();
            message.channel.bulkDelete(prevMessages);

            message.channel.send({
                // content: prevMessages.first().content,
                embeds: [
                    new EmbedBuilder()
                        .setColor(0x34eb49)
                        .setTitle(`${prevMessages.first().content}`)
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

const replyingToAnonMessage = async (message) => {
    try {
        // The message needs to be a reply and not be sent by the bot and it has to have a mention of the bot
        if (message.reference && message.mentions.repliedUser?.id === botUID && message.author.id !== botUID) {
            reply = await message.channel.messages.fetch(message.reference.messageId)

            if (reply.content.substring(0,2) !== "**") return
            
            pseudo = reply.content.split("**")[1]

            let user = await Userfile.findOne({pseudo: pseudo});

            console.log(user)
            //...
        }
    } catch (error) {
        console.log(error)
    }
}