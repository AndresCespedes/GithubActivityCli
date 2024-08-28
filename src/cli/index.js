#!/usr/bin/env node

import { fetchGithubActivity } from "../controllers/gitHubController.js";

const [username] = process.argv.slice(2);

if (!username) {
    console.error("Please provide a GitHub username.");
    process.exit(1);
}

fetchGithubActivity(username);
