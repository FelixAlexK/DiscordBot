const { SlashCommandBuilder } = require('discord.js');
const helper = require('../helper.js');
const logger = require('../logger.js');
const dotenv = require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('weather')
		.setDescription('provides the weather of a specific location')
		.addStringOption(stringOption =>
			stringOption.setName('location')
				.setDescription('Enter the location from which you want to retrieve the weather')),
	async execute(interaction) {
		const location = interaction.options.getString('location', true);
		try {
			const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${location}&aqi=no`);
			const data = await response.json();

			const exampleEmbed = {
				color: helper.getRandomColor(),
				title: 'Weather',
				description: `${data.location.name}, ${data.location.region}, ${data.location.country}`,
				thumbnail: { url:  `https:${data.current.condition.icon}` },
				fields: [
					{ name: 'Temperature', value: `${data.current.temp_c}°C`, inline: true },
					{ name : 'Condition', value: data.current.condition.text, inline: true },
					{ name : 'Last Updated', value: data.current.last_updated },

				],
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