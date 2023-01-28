const { SlashCommandBuilder } = require('discord.js');
const { getRandomColor } = require('../helper.js');
const logger = require('../logger.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('chucknorris')
		.setDescription('provides a random Chuck Norris joke')
		.addBooleanOption(booleanOption =>
			booleanOption.setName('ephemeral')
				.setDescription('should it only visible for you?')),
	async execute(interaction) {

		const isEphemeral = interaction.options.getBoolean('ephemeral') ?? true;
		try {
			const response = await fetch('https://api.chucknorris.io/jokes/random');
			const data = await response.json();

			const exampleEmbed = {
				color: getRandomColor,
				title: 'Chuck Norris Joke',
				url: data.url,
				thumbnail: {
					url:' https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png',
				},
				fields: [{ name: '', value: `${data.value}` }],
				timestamp: new Date().toISOString(),
			};
			interaction.reply({ embeds: [exampleEmbed], ephemeral: isEphemeral });

		}
		catch (error) {
			logger.log('error', error.message);
			interaction.reply({ content: `Error: ${error}, Status: ${error.status}`, ephemeral: true });
		}


	},
};

