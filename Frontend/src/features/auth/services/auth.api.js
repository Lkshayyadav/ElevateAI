import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL;

export async function register(username, email, password) {
    console.log(URL)
    try {
        const response = await axios.post(`${URL}/api/auth/register`,
            {
                username, email, password
            }, {
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }

}

export async function login(email, password) {
    console.log(`${URL}/api/auth/login`)
    try {
        
        const response = await axios.post(`${URL}/api/auth/login`,

            {
                email, password
            }, {
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export async function logout() {
    try {
        const response = await axios.post(`${URL}/api/auth/logout`,
            {},
            {
                withCredentials: true
            });

        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export async function getMe() {
    try {
        const response = await axios.get(`${URL}/api/auth/get-me`,
            {
                withCredentials: true
            });

        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}


