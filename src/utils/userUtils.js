import fs from 'fs';
import path from 'path';

const aliasesPath = path.join(process.cwd(), 'data', 'aliases.json');
let aliasesCache = null;

export function addAlias(alias, username) {
    const aliases = loadAliases();
    aliases[alias] = username;
    saveAliases(aliases);
    console.log(`Alias "${alias}" added for user "${username}"`);
}

export function resolveAlias(aliasOrUsername) {
    const aliases = loadAliases();
    return aliases[aliasOrUsername] || aliasOrUsername;
}

export function loadAliases() {
    try {
      if (!fs.existsSync(aliasesPath)) {
        return {}; // Return an empty object if the file does not exist
      }
  
      const fileData = fs.readFileSync(aliasesPath, 'utf8');
      return fileData ? JSON.parse(fileData) : {}; // Return an empty object if fileData is empty
    } catch (error) {
      console.error('Error loading aliases:', error);
      return {}; // Return an empty object in case of an error
    }
  }

function saveAliases(aliases) {
    fs.writeFileSync(aliasesPath, JSON.stringify(aliases, null, 2), 'utf-8');
}
