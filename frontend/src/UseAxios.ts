import axios, { AxiosRequestConfig } from "axios";

export const sendRequest = async <T>(params: AxiosRequestConfig<T>, callback: (r: T) => void) => {
    const token = localStorage.getItem('token');
    await axios<T>(
        params.url as string,
        { headers: { Authorization: token } }
    ).then(response => {
        callback(response.data);
    });
};
