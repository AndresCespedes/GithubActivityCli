export async function fetchUserActivity(username, filter = null) {

    try {
        const response = await fetch(`https://api.github.com/users/${username}/events`);
        const data = await response.json();

        if (data.message) {
            console.log(`Error: ${data.message}`);
            return;
        }

        if (data.length === 0) {
            console.log(`No recent activity found for user: ${username}`);
            return;
        }

        return data
    } catch (error) {
        console.error(`Failed to fetch activity: ${error.message}`);
    }
}

export async function fetchUserInfo(username) {
    const url = `https://api.github.com/users/${username}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error fetching user info for ${username}: ${response.statusText}`);
    }

    return await response.json();
}

export function filterActivities(activities, filter, username) {
    if (!filter) return activities.map(formatActivity);

    const filteredActivities = activities.filter(event => {
        switch (filter) {
            case 'commits': return event.type === 'PushEvent';
            case 'issues': return event.type === 'IssuesEvent';
            case 'stars': return event.type === 'WatchEvent';
            case 'pull-requests': return event.type === 'PullRequestEvent';
            default: return true;
        }
    }).map(formatActivity);

    if (filteredActivities.length === 0) return [`No se encontraron ${filter} para el usuario ${username}`];

    return filteredActivities;
}

export function formatActivity(activity) {
    switch (activity.type) {
        case 'PushEvent': return `Pushed ${activity.payload.commits.length} commits to ${activity.repo.name}`;
        case 'IssuesEvent': return `Opened a new issue in ${activity.repo.name}`;
        case 'WatchEvent': return `Starred ${activity.repo.name}`;
        case 'PullRequestEvent': return `Opened a pull request in ${activity.repo.name}`;
        default: return `Performed ${activity.type} on ${activity.repo.name}`;
    }
}
