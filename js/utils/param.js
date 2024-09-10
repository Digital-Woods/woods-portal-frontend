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