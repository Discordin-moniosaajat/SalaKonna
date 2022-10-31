// This is for handling slash commands

const button1 = require("../buttons/button1.js");

module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        //gets the command from the collection saved in client without having to have a lot of if/else statements
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            //returns if there's no command found
            if (!command) return;

            //executing the function inside the command file
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        } else if (interaction.isButton()) {
            if (interaction.customId === 'button1') {
                try {
                    await button1.execute(interaction);
                } catch (error) {
                    console.error(error);
                    interaction.reply({ content: 'There was an error while executing this button!', ephemeral: true });
                }
            }
        }
    }
}