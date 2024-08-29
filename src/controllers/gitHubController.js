import { fetchUserActivity, fetchUserInfo } from '../utils/apiUtils.js';
import { addAlias, resolveAlias } from '../utils/userUtils.js';
import { saveToFile, readHistory } from '../utils/fileUtils.js';
import { filterActivities } from '../utils/apiUtils.js';

export async function handleCommand(command, args) {
    const username = resolveAlias(args[0]);

    switch (command) {
        case 'add-alias':
            validateArgs(args, 2);
            addAlias(args[0], args[1]);
            break;
        case 'info':
            validateArgs(args, 1);
            const userInfo = await fetchUserInfo(username);
            displayUserInfo(userInfo);
            break;
        case 'save':
            //todo -> revisar
            validateArgs(args, 2);
            const [filename, filter] = args;
            const activityToSave = await fetchUserActivity(username, filter);
            const filteredActivity = filterActivities(activityToSave, filter);
            saveToFile(filename, filteredActivity);
            break;
            //todo -> revisar
        case 'filter':
            validateArgs(args, 2);
            const activities = await fetchUserActivity(username);
            const filteredActivities = filterActivities(activities, args[1], username);
            filteredActivities.forEach(activity => console.log(activity));
            break;
        case 'history':
            const history = readHistory();
            if (history.length === 0) {
                console.log('No activity history found.');
            } else {
                history.forEach((activity, index) => {
                    console.log(`Activity ${index + 1}: ${activity}`);
                });
            }
            break;
        default:
            const userActivity = await fetchUserActivity(username);
            userActivity.forEach(event => console.log(`- ${event.type} in ${event.repo.name}`));
            break;
    }
}

function validateArgs(args, expectedLength) {
    if (args.length < expectedLength) {
        throw new Error(`Invalid number of arguments. Expected ${expectedLength}, got ${args.length}.`);
    }
}

function displayUserInfo(userInfo) {
    console.log(`
        Name: ${userInfo.name}
        Bio: ${userInfo.bio}
        Public Repos: ${userInfo.publicRepos}
        Followers: ${userInfo.followers}
        Following: ${userInfo.following}
    `);
}
