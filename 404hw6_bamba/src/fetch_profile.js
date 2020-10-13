export function fetch_profile(endpoint) {
    let url = endpoint;
    return fetch(url, {
        headers: {
            Accept: "application/json",
        },
    })
    .then((response) => {
        return response.json();
    });
}