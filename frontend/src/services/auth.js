import { apiRequest } from "./api";

export async function loginUser(email, password) {
    // storing the response received from the server
    const data = await apiRequest("/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
        }
    )

    // storing the access token in LocalStorage
    localStorage.setItem("access_token",data.access_token)

    return data;
}

export async function signupUser(email, password) {
    const data = await apiRequest("/signup", {
        method: "POST",
        body: JSON.stringify({email, password})
    });

    return data;
}