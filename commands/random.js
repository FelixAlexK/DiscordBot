const { SlashCommandBuilder } = require('discord.js');
const _ = require('lodash');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('random')
		.setDescription('Returns random item from list')
		.addStringOption(option =>
			option.setName('add')
				.setDescription('add items, seperated by comma, to list. Example: item1,item2,item3,...'))
		.addBooleanOption(booleanOption =>
			booleanOption.setName('ephemeral')
				.setDescription('should it only visible for you?')),


	async execute(interaction) {
		try {

			const input = interaction.options.getString('add', true).split(',');
			const isEphemeral = interaction.options.getBoolean('ephemeral') ?? false;

			await interaction.reply({ content : _.sample(input), ephemeral: isEphemeral });

		}
		catch (error) {
			console.log('The following error occurred: %s', error);
		}


	},
};