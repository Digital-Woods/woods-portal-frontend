const setParam = (paramName, paramValue) => {
    // Get the current URL
    const currentUrl = new URL(window.location.href);

    // Check if there's a hash in the URL
    if (currentUrl.hash) {
        // Extract the hash portion (e.g., "#/sites")
        const hashPart = currentUrl.hash.substring(1); // remove the "#" at the start
        const [path, queryString] = hashPart.split("?"); // Split any existing query string in the hash

        // Create a new URLSearchParams object from the existing query or start fresh
        const params = new URLSearchParams(queryString || "");

        // Set or add the new parameter
        params.set(paramName, paramValue);

        // Reassemble the URL with the updated hash and parameters
        currentUrl.hash = `${path}?${params.toString()}`;
    } else {
        // If there's no hash, simply add the parameter as a query
        currentUrl.searchParams.set(paramName, paramValue);
    }

    // Update the browser’s address bar without reloading the page
    window.history.replaceState({}, "", currentUrl);
}

const getParam = (key) => {
    // Example URL
    const url = window.location.href;

    // Extract the hash part
    const hash = url.split('#')[1];

    // Extract query part from the hash
    const queryString = hash.split('?')[1];

    // Parse parameters from the query string
    const searchParams = new URLSearchParams(queryString);

    // Get the parameter value by name
    const value = searchParams.get(key);

    return value
}

const getParamHash = (string) => {
    const result = string.replace(/%23/g, '#');
    return result;
}

const setParamHash = (string) => {
    const result = string.replace(/#/g, '%23');
    return result;
}