const { SlashCommandBuilder } = require('discord.js');
const helper = require('../helper.js');
const logger = require('../logger.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quote')
		.setDescription('returns the quote of the day')
		.addBooleanOption(booleanOption =>
			booleanOption.setName('ephemeral')
				.setDescription('should it only visible for you?')),
	async execute(interaction) {
		const isEphemeral = interaction.options.getBoolean('ephemeral') ?? true;
		try {
			const response = await fetch('https://quotes.rest/qod');
			const data = await response.json();

			const exampleEmbed = {
				color: helper.getRandomColor(),
				title: data.contents.quotes[0].title,
				url: data.contents.quotes[0].permalink,
				author: { name: data.contents.quotes[0].author },
				fields: [{ name: '', value: data.contents.quotes[0].quote }],
				image: { url: data.contents.quotes[0].background },
				timestamp: new Date().toISOString(),
			};
			interaction.reply({ embeds: [exampleEmbed], ephemeral: isEphemeral });

		}
		catch (error) {
			logger.log('error', error.message);
			interaction.reply({ content: `Error Message: ${error.message}`, ephemeral: true });
		}


	},
};

