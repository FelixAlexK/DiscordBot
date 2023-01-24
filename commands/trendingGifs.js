const { SlashCommandBuilder } = require('discord.js');
const helper = require('../helper.js');
const logger = require('../logger.js');
const { execute } = require('./chuckNorrisJokes.js');
const dotenv = require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gif')
		.setDescription('provides the trending gif of the day'),
	async execute(interaction) {
		const response = await fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${process.env.GIPHY_API_KEY}&limit=1`);
		const data = await response.json();

		try {
			const exampleEmbed = {
				color: helper.getRandomColor(),
				title: data.data[0].title,
				author: { name: data.data[0].user.display_name,
					icon_url: data.data[0].user.avatar_url,
					url: data.data[0].user.profile_url,
				},
				fields: [
					{ name: 'rating:', value: data.data[0].rating, inline: true },
					{ name : 'type:', value: data.data[0].type, inline: true },
					{ name : 'trending since:', value:new Date(data.data[0].trending_datetime).toLocaleDateString(), inline: true },

				],
				image: {
					url: await data.data[0].images.original.url,
				},
				timestamp: new Date().toISOString(),

			};
			interaction.reply({ embeds: [exampleEmbed] });
		}
		catch (error) {
			logger.log('error', error.message);
			interaction.reply({ content: `Error Message: ${error.message}`, ephemeral: true });
		}
	},
};