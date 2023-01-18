const { SlashCommandBuilder } = require('discord.js');
const { data, execute } = require('./ping');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('whois')
		.setDescription('returns info about a user')
		.addUserOption(userOption =>
			userOption.setName('user')
				.setDescription('the user about whom we would like to receive information')),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		await interaction.reply({ content: `User Info: **${user.username}** (account created: **${user.createdAt.toUTCString()}**)`, ephemeral: true });
		console.log(user);
	},

};