const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('rnd')
		.setDescription('returns a random item'),
	async execute(interaction) {

		const modal = new ModalBuilder()
			.setCustomId('rndGenerator')
			.setTitle('Random-Generator');

		// Create the text input components
		const favoriteColorInput = new TextInputBuilder()
			.setCustomId('rndModal')
		// The label is the prompt the user sees for this input
			.setLabel('Random Generator')

			.setPlaceholder('item1 , item2 , item3 , ... ')
		// Short means only a single line of text
			.setStyle(TextInputStyle.Short);

		// An action row only holds one text input,
		// so you need one action row per text input.
		const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);

		// Add inputs to the modal
		modal.addComponents(firstActionRow);

		// Show the modal to the user

		await interaction.showModal(modal);


	},
};