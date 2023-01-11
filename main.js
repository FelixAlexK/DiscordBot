const { token } = require('./config.json');
const { Client, Events, GatewayIntentBits } = require('discord.js');

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
});

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
	const date = new Date();

	if (date.getDate == message.createdAt.getDate) {
		console.log((await message.author.send(message.author.avatarURL())));

	}


});

client.login(token);