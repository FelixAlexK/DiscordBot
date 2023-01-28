const _ = require('lodash');
const game = require('./steamGames.json');
module.exports = {
	getRandomColor() {
		const letters = '0123456789ABCDEF';
		let color = '0x';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}

		color = parseInt(color);

		return color;
	},
};

module.exports = {
	getRandomSteamGame() {
		const randomIndex = _.sample(game);
		return randomIndex.Game;
	},
};

