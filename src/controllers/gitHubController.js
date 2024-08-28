import { getGithubActivity } from "../utils/apiUtils.js"

export const fetchGithubActivity = async (username) => {

    try {
        const getActivity = await getGithubActivity(username);

        if (!getActivity.length) console.warn(`No recent activity found for user ${username}.`);

        getActivity.forEach(({ type, payload, repo }) => {
            switch (type) {
                case 'PushEvent':
                    console.log(`Pushed ${payload.commits.length} commits to ${repo.name}`);
                    break;
                case 'IssuesEvent':
                    console.log(`Opened a new issue in ${repo.name}`);
                    break;
                case 'WatchEvent':
                    console.log(`Starred ${repo.name}`);
                    break;
                default:
                    console.log(`Performed ${type} in ${repo.name}`);
            }
        });
    } catch (error) {
        console.error(`Failed to fetch activity for user ${username}: ${error.message}`);
    }

}