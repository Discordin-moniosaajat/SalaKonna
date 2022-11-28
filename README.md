# SalaKonna

## What is salakonna & its purpose

SalaKonna is a discord bot, with a purpose of allowing its users to have conversations with each others while remaining anonymous under a pseudonym. 

## Getting started

Follow the [guide](https://discord.com/developers/docs/intro) on how to create a bot and install it on your own channel. 

Import the repository and install all the neccessary dependencies (which you can find in the package.json).\
`NOTE! MongoDB has been used as a database on this project to store and connect users with their given pseudonyms aswell as to clear the pseudonyms after 24 hours have passed. `

You will also need to create a .env file and fill it with the neccessary TOKENS and IDS. Which will end up looking somewhat similiar to this: 

![env](https://user-images.githubusercontent.com/98490914/204344259-a3e348c0-6aac-4220-ab7c-b51523aebb0b.png)

`NOTE! This is not meant to be a step by step guide on how to overall set up a discord bot on your own server nor is it about how discord bots work and are used, for that you will have to rely on other documentations like the link provided at the start. `

`Instead this is only meant to be a demonstration on how this exact bot works. `

## How it works

![BotOnlineOnServer](https://user-images.githubusercontent.com/98490914/204345249-bc3504c1-fe32-4939-8870-08c50a510201.png)

Once the bot is online and running on the discord server, you can write a slash command: /post on a text channel. 

![slashCommand-post](https://user-images.githubusercontent.com/98490914/204326777-5139611f-c04e-4c0a-8db3-41930ce5cb4b.png)

Then write your message and send. 

![Message](https://user-images.githubusercontent.com/98490914/204327731-447c4781-94fd-47c0-9eb9-afcf2c87cb5e.png)

You will receive a reply which only you can see, confirming your message was sent successfully. 

![reply](https://user-images.githubusercontent.com/98490914/204327528-f87bc683-89d3-41b2-ac6e-31397a064631.png)

The message will appear on another text channel under a pseudonym. 

![MsgUnderPseudonym](https://user-images.githubusercontent.com/98490914/204328045-620dee33-52fb-4866-862d-3a72649369b9.png)

(An [npm-package](https://www.npmjs.com/package/random-word-slugs/v/0.0.3) is utilized in the creation of the pseudonyms. )

Alternatively if you think you message might contain something that may cause other users to feel anxiety or other unpleasant feelings you can use: /toggletw command before you use the /post command to switch channels where your message will be sent. 

![slashCommand-Toggletw](https://user-images.githubusercontent.com/98490914/204336894-d866a208-670d-4986-bea3-a7dc0a71a42b.png)

And like previously you will receive a confirmation (which only you can see) that you have changed the channels successfully. 

![reply2](https://user-images.githubusercontent.com/98490914/204337217-2d0fcaf0-0d96-4fe3-90e5-6a379868277e.png)

You can freely switch back and forth between the channels where your messages will be sent by using the same /toggletw command again. 

Also for moderation purposes the message will also be sent to a log. Where you can find all the necessary information on: who sent what and when. 

![Log](https://user-images.githubusercontent.com/98490914/204331573-e645b146-0dde-489a-8219-6799ca4dc817.png)

If you ever forget how the bot exactly works you can always use the command: /help which will give you a brief user manual and a list of commands. 

![slashCommand-help](https://user-images.githubusercontent.com/98490914/204350972-27e37dd8-605d-42f3-bad6-0db5c8194841.png)

You will receive a reply which is only visiable to you. 

![replyToCommand-Help](https://user-images.githubusercontent.com/98490914/204351095-996d2589-8ae3-437c-8e4f-9b9019df32c4.png)

## Future developments

For now the bot works as intended, but we were testing and possibly planning on adding a ticket-system for the bot. 

Where you would be able to use a command and the bot would then create a button for you (which only the user who gave the command could see) and by clicking this button a new text channel would appear which is only visiable to him and the discord servers admins. 

And from this new text channel a user could safely use the /post command without having to worry about typos, and also we were planning that it would be nice if all the replies to your message were send into this new text channel so its creator wouldn't have to scroll though an a active text channel to find which messages were replies to his message. 
