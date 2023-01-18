const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const helper = require('../helper.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('quote')
		.setDescription('returns the quote of the day'),
	async execute(interaction) {

		fetch('https://quotes.rest/qod')
			.then(response => response.json())
			.then(data => {

				if (data.success) {
					const exampleEmbed = {
						color: helper.getRandomColor(),
						title: data.contents.quotes[0].title,
						url: data.contents.quotes[0].permalink,
						author: { name: data.contents.quotes[0].author },
						fields: [{ name: '', value: data.contents.quotes[0].quote }],
						image: { url: data.contents.quotes[0].background },
						timestamp: new Date().toISOString(),
					};
					interaction.reply({ embeds: [exampleEmbed] });
				}
				else {
					interaction.reply({ content: `${data.error.message}`, ephemeral: true });
				}

			})
			.catch(error => console.error(error.message));


	},
};

