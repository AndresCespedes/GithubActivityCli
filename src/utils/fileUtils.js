import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const historyFilePath = path.join(__dirname, '../../', 'data', 'history.json');

export function saveToFile(filename, data) {
    try {
        if (data === undefined || data === null) {
            throw new Error('Data to save is undefined or null');
        }
        fs.writeFileSync(path.join(__dirname, '../../', 'data', filename), JSON.stringify(data, null, 2));
        console.log(`Data saved to ${filename}`);
    } catch (error) {
        console.error(`Failed to save data to file: ${error.message}`);
    }
}

export function readHistory() {
    if (!fs.existsSync(historyFilePath)) {
        console.log('No history file found.');
        return [];
    }

    try {
        const fileContent = fs.readFileSync(historyFilePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error(`Failed to read history file: ${error.message}`);
        return [];
    }
}

export function appendToHistory(activity) {
    let history = readHistory();
    history.push(activity);
    saveToFile('activityHistory.json', history);
}
