const { SlashCommandBuilder} = require('discord.js');
const helper = require('../helper.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chucknorris')
		.setDescription('returns a random Chuck Norris joke'),
	async execute(interaction) {

		fetch('https://api.chucknorris.io/jokes/random')
			.then(response => response.json())
			.then(data => {

				if (data.value) {
					const exampleEmbed = {
						color: helper.getRandomColor(),
						title: 'Chuck Norris Joke',
						url: data.url,
						thumbnail: {
							url: data.icon_url,
						},
						fields: [{ name: '', value: `${data.value}` }],
						timestamp: new Date().toISOString(),
					};
					interaction.reply({ embeds: [exampleEmbed] });
				}
				else {
					interaction.reply({ content: `Error: ${data.error}, Message: ${data.message}`, ephemaral: true });
				}


			})
			.catch(error => console.error(error.message));


	},
};

