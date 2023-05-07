import {  AxiosResponse, AxiosInstance } from "axios";
import { useEffect, useState } from "react";
import { IUpdatedContest, NewContest } from "../helpers/interfaces";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { BFF_URLS } from "../links/backend";

export const getChallenge = (axiosPrivate: AxiosInstance, challengeId : string) => {
    const url = `${BFF_URLS.challengeService}/challenges/${challengeId}`
    const method = "GET";
    const headers = {};
    return axiosPrivate({url, method, headers})
    
}

export const createContest = (axiosPrivate : AxiosInstance, contest: NewContest, successHandler : Function, failHandler : Function)=> {
    console.log(contest)
    const url = `${BFF_URLS.contestService}/contests`;
    const method = "POST";
    const headers = {};
    const data = contest;
    axiosPrivate({url, method, headers, data }).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const addChallenge = (axiosPrivate : AxiosInstance, contestId: string, challengeId: string, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.contestService}/contests/${contestId}/challenges/${challengeId}`;
    const method = "POST";
    const headers = {};
    axiosPrivate({url, method, headers }).then((res: AxiosResponse) => successHandler(res)).catch((err) => failHandler(err));
}

export const createChallenge = (axiosPrivate : AxiosInstance, data: FormData, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.challengeService}/challenges`;
    const method = "POST";
    const headers = {
        "Content-Type": "multipart/form-data",
    };
    axiosPrivate({url, method, headers, data }).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const editChallenge = (axiosPrivate : AxiosInstance, data: FormData, challengeId: string, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.challengeService}/challenges/${challengeId}`;
    const method = "PUT";
    const headers = {};
    axiosPrivate({url, method, headers, data }).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const getContest = (axiosPrivate: AxiosInstance, contestId: string, successHandler : Function, failHandler : Function) => {
    const url = `${BFF_URLS.contestService}/contests/${contestId}`
    const method = "GET";
    const headers = { "Accept":"application/json"};
    axiosPrivate({url, method, headers}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const getChallangesByDifficulty = (axiosPrivate: AxiosInstance, difficulty : string, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.challengeService}/challenges?difficulty=${difficulty}`
    const method = "GET";
    const headers = {};
    axiosPrivate({url, method, headers}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());

}

export const getUsersByRoles = (axiosPrivate: AxiosInstance, role : string, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.userService}/users?role=${role}`
    const method = "GET";
    const headers = {};
    axiosPrivate({url, method, headers}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());

}

export const upgradeContestantToAdmin = (axiosPrivate: AxiosInstance, userId: string, successHandler : Function, failHandler : Function) => {
    const url = `${BFF_URLS.userService}/users/${userId}/roles/admin`
    const method = "PUT";
    const headers = {};
    axiosPrivate({url, method, headers}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const removeChallengeFromContest = (axiosPrivate: AxiosInstance, contestId: string, challengeId: string, successHandler : Function, failHandler : Function) => {
    const url = `${BFF_URLS.contestService}/contests/${contestId}/challenges/${challengeId}`
    const method = "DELETE";
    const headers = {};
    axiosPrivate({url, method, headers}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const changeContestTime = (axiosPrivate: AxiosInstance, contestId: string, updatedContest: IUpdatedContest, successHandler : Function, failHandler : Function) => {
    const url = `${BFF_URLS.contestService}/contests/${contestId}`
    const method = "PUT";
    const data = updatedContest;
    const headers = {};
    axiosPrivate({url, method, headers, data}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const getPastContests = (axiosPrivate: AxiosInstance, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.contestService}/contests?status=past`
    const method = "GET";
    const headers = {};
    axiosPrivate({url, method, headers}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());

}

export const getOngoingContests = (axiosPrivate: AxiosInstance, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.contestService}/contests`
    const method = "GET";
    const headers = {};
    const params = {
        status : "present"
    }
    axiosPrivate({url, method, headers, params}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());

}