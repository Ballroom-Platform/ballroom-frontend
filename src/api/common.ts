import { AxiosInstance, AxiosResponse } from "axios";
import { IAppState } from "../helpers/interfaces";
import { BFF_URLS, STS_URLS } from "../links/backend";
import axios, { axiosPrivate } from "./axios";


export const fetchAccessToken = (idpToken : string, setAppState : React.Dispatch<React.SetStateAction<IAppState>>, signIn : Function) => {
    axios.get(STS_URLS.accessToken, {
        headers:{
            "Content-Type" : "application/json",
            "Authorization": "Bearer " + idpToken
        },
    }).then(res => {
        if (res.status === 200){
            console.log("Setting App state");
            setAppState(prev => ({...prev, auth : {...(prev.auth), status: "active", accessToken: res?.data?.data?.accessToken}}));
        }else{
            signIn();
        }
    }).catch(()=> {
        signIn();
    });
}

export const getChallengesInContest = (axiosPrivate: AxiosInstance, contestId : string, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.contestService}/contests/${contestId}/challenges`
    const method = "GET";
    const headers = {}
    // const headers = { "Accept":"application/json", "Authorization" : AUTH_HEADER};
    axiosPrivate({url, method, headers}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());

}

export const getUpcomingContests = (axiosPrivate: AxiosInstance, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.contestService}/contests?status=future`
    const method = "GET";
    const headers = {}
    // const headers = { "Accept":"application/json", "Authorization" : AUTH_HEADER};
    axiosPrivate({url, method, headers}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const getUserRole = async (userId : string) => {
    const url = `${BFF_URLS.userService}/users/${userId}/roles`
    const method = "GET";
    const headers = {};
    try {
        const res = await axios({ url, method, headers });
        return res.data.data.role;
    } catch {
        return null;
    }
}
