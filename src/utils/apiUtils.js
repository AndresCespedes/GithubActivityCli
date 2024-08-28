export const getGithubActivity = async (username) => {
    const url = `https://api.github.com/users/${username}/events`;

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'github-activity-cli'
            }
        });

        if (!response.ok) console.error(`Failed to load data. Status Code: ${response.status}`)

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(`Error fetching GitHub activity: ${error.message}`)
    }
}