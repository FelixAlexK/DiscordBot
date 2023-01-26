const { SlashCommandBuilder } = require('discord.js');
let totalOnline = 0;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('Returns info about members')
		.addStringOption(stringOption =>
			stringOption.setName('status')
				.setDescription('get number of member with specific status')
				.addChoices(
					{ name: 'online status', value: 'online' },
					{ name: 'offline status', value: 'offline' },
					{ name: 'idle status', value: 'idle' },
					{ name: 'dnd status', value: 'dnd' },

				))
		.addBooleanOption(booleanOption =>
			booleanOption.setName('ephemeral')
				.setDescription('should it only visible for you?')),
	async execute(interaction) {
		const isEphemeral = interaction.options.getBoolean('ephemeral') ?? true;
		const info = interaction.options.getString('status');

		if (info === 'offline') {
			totalOnline = await interaction.guild.members.cache.filter(member => !['online', 'idle', 'dnd'].includes(member.presence?.status)).size;
		}
		else {

			await interaction.guild.members.fetch({ withPresences: true }).then(fetchedMembers => {
				totalOnline = fetchedMembers.filter(member => member.presence?.status === info).size;
				// Now you have a collection with all online member objects in the totalOnline variable
				interaction.reply({ content: `There are currently **${totalOnline}** members ${info} in this guild!`, ephemeral: isEphemeral });
			});
		}
		// First use guild.members.fetch to make sure all members are cached
		// Now you have a collection with all online member objects in the totalOnline variable
		interaction.reply({ content: `There are currently **${totalOnline}** members ${info} in this guild!`, ephemeral: isEphemeral });


	},
};
