const pm2 = require('pm2');
const logger = require('./logger');
pm2.connect(function(err) {
	if (err) {
		logger.log('error', err.message);
		process.exit(2);
	}

	pm2.start({
		script    : './main.js',
		name      : 'bot',
	}, function(err) {
		if (err) {
			logger.log('error', err.message);
			return pm2.disconnect();
		}

		pm2.list((err, list) => {
			if (err) {
				logger.log('error', err.message, list);
			}


			pm2.restart('./main.js', (err, proc) => {
				// Disconnects from PM2
				pm2.disconnect();
				if (err) {
					logger.log('error', err.message);
				}
			});
		});
	});
});