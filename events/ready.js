const { Events } = require('discord.js');
const { botName, botAvatar, botAtivityStatus, botStatus } = require('../config.json');
module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		await client.user.setUsername(botName);
		await client.user.setAvatar(botAvatar);

		await client.user.setActivity(botAtivityStatus);
		await client.user.setStatus(botStatus);

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};