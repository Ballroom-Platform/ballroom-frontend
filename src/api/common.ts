import { AxiosInstance, AxiosResponse } from "axios";
import { IAppState } from "../helpers/interfaces";
import { BFF_URLS, STS_URLS } from "../links/backend";
import axios from "./axios";


export const fetchAccessToken = (idpToken : string, setAppState : React.Dispatch<React.SetStateAction<IAppState>>, signOut : Function) => {
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
            signOut();
        }
    }).catch(()=> {
        signOut();
    });
}

export const getChallengesInContest = (axiosPrivate: AxiosInstance, contestId : string, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.contestService}/contest/${contestId}/challenges`
    const method = "GET";
    const headers = {};
    axiosPrivate({url, method, headers}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());

}

export const getUpcomingContests = (axiosPrivate: AxiosInstance, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.contestService}/contests/future`
    const method = "GET";
    const headers = {};
    axiosPrivate({url, method, headers}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());

}
