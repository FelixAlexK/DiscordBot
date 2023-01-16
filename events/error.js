const { Events } = require('discord.js');

module.exports = {
	name: Events.Error,
	async execute(interaction) {
		interaction.reply(`client's WebSocket encountered a connection error: ${interaction}`);
	},
};