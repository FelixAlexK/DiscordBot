const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('about-member')
		.setDescription('Returns info about members')
		.addStringOption(stringOption =>
			stringOption.setName('guild-member-info')
				.setDescription('get number of member with specific status')
				.addChoices(
					{ name: 'online status', value: 'online' },
					{ name: 'offline status', value: 'offline' },
					{ name: 'idle status', value: 'idle' },
					{ name: 'dnd status', value: 'dnd' },
					{ name: 'invisible status', value: 'invisible' },
				))
		.addBooleanOption(booleanOption =>
			booleanOption.setName('ephemeral')
				.setDescription('should it only visible for you?')),
	async execute(interaction) {
		const isEphemeral = interaction.options.getBoolean('ephemeral');
		const info = interaction.options.getString('guild-member-info');

		// First use guild.members.fetch to make sure all members are cached
		await interaction.guild.members.fetch({ withPresences: true }).then(fetchedMembers => {
			const totalOnline = fetchedMembers.filter(member => member.presence?.status === info);
			// Now you have a collection with all online member objects in the totalOnline variable
			interaction.reply({ content: `There are currently **${totalOnline.size}** members ${info} in this guild!`, ephemeral: isEphemeral });
		});

	},
};
