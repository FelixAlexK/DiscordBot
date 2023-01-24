const { SlashCommandBuilder } = require('discord.js');
const helper = require('../helper.js');
const logger = require('../logger.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('chucknorris')
		.setDescription('provides a random Chuck Norris joke'),
	async execute(interaction) {


		try {
			const response = await fetch('https://api.chucknorris.io/jokes/random');
			const data = await response.json();

			const exampleEmbed = {
				color: helper.getRandomColor(),
				title: 'Chuck Norris Joke',
				url: data.url,
				thumbnail: {
					url:' https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png',
				},
				fields: [{ name: '', value: `${data.value}` }],
				timestamp: new Date().toISOString(),
			};
			interaction.reply({ embeds: [exampleEmbed] });

		}
		catch (error) {
			logger.log('error', error.message);
			interaction.reply({ content: `Error: ${error}, Status: ${error.status}`, ephemeral: true });
		}


	},
};
