// fastapi backend url
const API_URL = "http://127.0.0.1:8000"

export async function apiRequest(endpoint, options){
    const token = localStorage.getItem("access_token"); // getting the token from the localStorage

    const headers = {};
    // making the content-type conditional
    if(!(options?.body instanceof FormData)) {
        headers["Content-Type"] = "application/json"
    }

    // if there exist a token, we will add a Authorization header with it
    if(token) {
        headers["Authorization"] = `Bearer ${token}`
    }

    // fetching the response from the backend
    const response = await fetch(API_URL + endpoint, {...options, headers});

    // if not a succesfull response, we will throw an error
    if(!response.ok) {
        const error = await response.json()
        throw new Error(error.detail);
    }

    const data = await response.json();
    return data;
}