import { AxiosInstance, AxiosResponse } from "axios";
import { IAppState } from "../helpers/interfaces";
import { BFF_URLS } from "../links/backend";
import axios, { axiosPrivate } from "./axios";


// export const fetchAccessToken = (idpToken: string) => {
//     return axios.get(STS_URLS.accessToken, {
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": "Bearer " + idpToken,
//             "ngrok-skip-browser-warning": true
//         },
//     })
// }

export const getChallengesInContest = (axiosPrivate: AxiosInstance, contestId: string, successHandler: Function, failHandler: Function) => {
    const url = `${BFF_URLS.contestService}/contests/${contestId}/challenges`
    const method = "GET";
    const headers = {}
    // const headers = { "Accept":"application/json", "Authorization" : AUTH_HEADER};
    axiosPrivate({ url, method, headers }).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());

}

export const getContests = (axiosPrivate: AxiosInstance, successHandler: Function, failHandler: Function) => {
    const url = `${BFF_URLS.contestService}/contests`
    const method = "GET";
    const headers = {}
    axiosPrivate({ url, method, headers }).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const getUser = (axiosPrivate: AxiosInstance, userId: string, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.userService}/users/${userId}`
    const method = "GET";
    const headers = {};
    axiosPrivate({url, method, headers}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const getAllUsers = (axiosPrivate: AxiosInstance, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.userService}/users`
    const method = "GET";
    const headers = {};
    axiosPrivate({url, method, headers}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const getUserRole = async (userId: string) => {
    const url = `${BFF_URLS.userService}/users/${userId}/roles`
    const method = "GET";
    const headers = {
        "ngrok-skip-browser-warning": true
    };
    try {
        const res = await axios({ url, method, headers });
        return res.data.data.role;
    } catch {
        return null;
    }
}
