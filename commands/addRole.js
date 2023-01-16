const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('add role to user')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('User who should get the role'))
		.addRoleOption(roleOption =>
			roleOption.setName('roles')
				.setDescription('Role to be added to the user')),
	async execute(interaction) {
		const user = interaction.options.getUser('user', true);
		const roles = interaction.options.getRole('roles', true);


		const member = interaction.options.getMember(user);
		await interaction.member.roles.add(roles.id);
		console.log(roles.name);
	},
};