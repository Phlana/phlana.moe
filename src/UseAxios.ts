import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const sendRequest = async <T>(params: AxiosRequestConfig<T>, callback: (r: AxiosResponse<T, any>) => void) => {
    const token = localStorage.getItem('token');
    await axios<T>( {
            url: params.url,
            method: params.method,
            headers: { Authorization: token },
    }).then(response => {
        callback(response);
    });
};
