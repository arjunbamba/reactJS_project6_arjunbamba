export function fetch_members() {
    let url = "https://api.github.com/orgs/emberjs/members";
    return fetch(url, {
        headers: {
            Accept: "application/json",
        },
    })
    .then((response) => {
        return response.json();
    });
}