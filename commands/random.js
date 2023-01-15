const { SlashCommandBuilder } = require('discord.js');
const _ = require('lodash');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('random')
		.setDescription('Returns random item from list')
		.addStringOption(option =>
			option.setName('add')
				.setDescription('add items to list')),

	async execute(interaction) {
		const input = interaction.options.getString('add').split(',');
		// const randomIndex = Math.floor(Math.random() * input.length);

		const randomItem = _.sample(input);
		await interaction.reply(randomItem);
	},
};