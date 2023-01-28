const { SlashCommandBuilder } = require('discord.js');
const helper = require('../helper.js');
const logger = require('../logger.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('joke')
		.setDescription('provides the joke of the day')
		.addBooleanOption(booleanOption =>
			booleanOption.setName('ephemeral')
				.setDescription('should it only visible for you?'))
		.addBooleanOption(booleanOption =>
			booleanOption.setName('dm')
				.setDescription('get response as dm')),
	async execute(interaction) {
		const isEphemeral = interaction.options.getBoolean('ephemeral') ?? true;
		const isDm = interaction.options.getBoolean('dm') ?? false;
		try {
			const response = await fetch('https://api.jokes.one/jod');
			const data = await response.json();

			const exampleEmbed = {
				color: helper.getRandomColor(),
				title: 'Joke Of The Day',
				fields: [
					{ name: '', value: `${data.contents.jokes[0].joke.text}` },

				],
				timestamp: new Date().toISOString(),
			};

			if (isDm) {
				interaction.user.send({ embeds: [exampleEmbed] });
				interaction.reply({ content: 'Reply was sent to your dm', ephemeral: true });
			}
			else {
				interaction.reply({ embeds: [exampleEmbed], ephemeral: isEphemeral });
			}


		}
		catch (error) {
			logger.log('error', error.message);
			interaction.reply({ content: `Error Message: ${error.message}`, ephemeral: true });
		}


	},
};