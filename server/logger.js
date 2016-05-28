/* eslint-disable no-console,prefer-template */

const chalk = require('chalk');
const ip = require('ip');

const divider = chalk.gray('\n-----------------------------------');

/**
 * Logger middleware, you can customize it to make messages more personal
 */
const logger = {

  // Called whenever there's an error on the server we want to print
  error: err => {
    console.log(chalk.red(err));
  },

  // Called when express.js app starts on given port w/o errors
  appStarted: (port) => {
    console.log('Server started ' + chalk.green('✓'));

    console.log(
      chalk.bold('\nAccess URLs:') +
      divider +
      '\nLocalhost: ' + chalk.magenta('http://localhost:' + port) +
      '\n      LAN: ' + chalk.magenta('http://' + ip.address() + ':' + port) +
      divider,
      chalk.blue('\nPress ' + chalk.italic('CTRL-C') + ' to stop\n')
    );
  },
};

module.exports = logger;
