const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { execute } = require('./help');

let pseudoNames = ['Blue', 'Red', 'Green', 'Yellow', 'Orange', 'Purple'];

function removeUsedPseudoName(pseudoNames, pseudoName) {
    return pseudoNames.filter(function(ele) {
        return ele != pseudoName;
    });
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName("post")
        .setDescription("post anonymously on a public channel")
        .addStringOption((option) =>
            option
                .setName("message")
                .setDescription("content of the message you want to post")
                .setRequired(true)
        ),
    async execute(interaction, client) {
        console.log("post command used");

        console.log(interaction);

        message = interaction.options.getString("message")

        let pseudoName = pseudoNames[Math.floor(Math.random() * pseudoNames.length)]; // randomly picks 1 from the pseudoNames array
        pseudoNames = removeUsedPseudoName(pseudoNames, pseudoName); // removes the picked pseudoName from the pseudoNames array (using the removeUsedPseudoName function)

        //send the message to a public channel
        const targetChannel = client.channels.resolve('1021710965777117184') //bottispämmi 2
        targetChannel.send(`**${pseudoName}** says:\n> ${message}`) //might make this an embed later on

        interaction.reply({
            content: `You wrote:\n> ${message}`,
            //ephemeral: true //makes the reply only seen by the one using the command
        });    

        // send interaction to log channel
        const logChannel = client.channels.resolve('1024957345761083423') 
        //old version
        /*logChannel.send(` User: ${interaction.member.nickname} (${interaction.user.tag}) \nUser ID:(${interaction.user.id})\nPseudo name: ${pseudoName} \nFrom channel #${interaction.channel.name} \n> ${message}`)*/
        
        // Embedded log message
         const logEmbed = new EmbedBuilder()
         .setColor(0x34eb49)
         .setTitle('Log message')
         .setAuthor({ name: `${interaction.user.username} sent anonymous message`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
         .setDescription(`message information`  )
         .addFields(
             { name: 'User:', value: `${interaction.user.tag}`, inline: true },
             { name: 'ID:', value: `${interaction.user.id}`, inline: true },
             { name: 'Pseudo name:', value: `${pseudoName}`, inline: true },
             { name: 'From channel:', value: `${interaction.channel.name}`, inline: true },
             { name: 'Message:', value: `${message}`, inline: true },
         )
         .setTimestamp();

     logChannel.send({ embeds: [logEmbed] });
 }
}
    