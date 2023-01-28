const { Events, ActivityType } = require('discord.js');
const { botName, botAvatar, botAtivityStatus, botStatus, botActivityType } = require('../config.json');
const helper = require('../helper');


module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		await client.user.setUsername(botName);
		await client.user.setAvatar(botAvatar);

		await client.user.setActivity(helper.getRandomSteamGame() || botAtivityStatus, { type: ActivityType.Playing });
		await client.user.setStatus(botStatus);

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};