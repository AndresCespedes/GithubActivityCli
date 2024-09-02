#!/usr/bin/env node

import { handleCommand } from '../controllers/gitHubController.js';

const [command, ...args] = process.argv.slice(2);

function showHelp() {
    console.log(`
Usage: gac <command> [options]

Commands:
  add-alias <alias> <username>              Add a new alias for a GitHub username
  info <username>                           Display information about a GitHub user
  save <username> <filename> <filter>       Save filtered activity to a file
  filter <filter>                           Display filtered activity in the terminal
  history                                   Show command history
  activity <username>                       Fetch and display recent activity

Options:
  -h, --help  Show help
`);
}

if (command === '--help' || command === '-h') {
    showHelp();
    process.exit(0);
}

try {
    handleCommand(command, args);
} catch (error) {
    console.error(`Error: ${error.message}`);
    showHelp();
    process.exit(1);
}
