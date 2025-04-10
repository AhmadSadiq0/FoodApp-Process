import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://192.168.1.140:8000',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
});

export const setAuthTokenInAxios = (token) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            console.log("Request configuration with token: ", config);
            return config;
        },
        (error) => {
            console.error("Request error: ", error);
            return Promise.reject(error);
        }
    );
};
export default axiosInstance;