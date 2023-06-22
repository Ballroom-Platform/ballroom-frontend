import { AxiosError, AxiosResponse, AxiosInstance } from "axios";
import { useEffect, useState } from "react";
import { BalDateTime, IUpdatedContest, NewContest } from "../helpers/interfaces";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { BFF_URLS } from "../links/backend";

interface AccessDetails {
    userId: string;
    accessType?: string;
}


export const getChallenge = (axiosPrivate: AxiosInstance, challengeId : string) => {
    const url = `${BFF_URLS.challengeService}/challenges/${challengeId}`
    const method = "GET";
    const headers = {};
    return axiosPrivate({url, method, headers}) 

}

export const createContest = (axiosPrivate : AxiosInstance, data: FormData, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.contestService}/contests`;
    const method = "POST";
    const headers = {
        "Content-Type": "multipart/form-data",
    };
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

export const getOwnedChallangesByDifficulty = (axiosPrivate: AxiosInstance, difficulty : string, userId : string, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.challengeService}/challenges/owned/${userId}?difficulty=${difficulty}`
    const method = "GET";
    const headers = {};
    axiosPrivate({url, method, headers}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());

}

export const getSharedChallangesByDifficulty = (axiosPrivate: AxiosInstance, difficulty : string, userId : string, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.challengeService}/challenges/shared/${userId}?difficulty=${difficulty}`
    const method = "GET";
    const headers = {};
    axiosPrivate({url, method, headers}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const getOwnedChallangesIds = (axiosPrivate: AxiosInstance, userId : string, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.challengeService}/challenges/owned/${userId}`
    const method = "GET";
    const headers = {};
    axiosPrivate({url, method, headers}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const getSharedChallangesIds = (axiosPrivate: AxiosInstance, userId : string, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.challengeService}/challenges/shared/${userId}`
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

export const changeRole = (axiosPrivate: AxiosInstance, userId: string, newRole: string, successHandler : Function, failHandler : Function) => {
    const url = `${BFF_URLS.userService}/users/${userId}/roles/${newRole}`
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

export const getOwnerContests = (axiosPrivate: AxiosInstance, userId: string, status: string, successHandler: Function, failHandler: Function) => {
    const url = `${BFF_URLS.contestService}/contests/owned/${userId}?status=${status}`
    const method = "GET";
    const headers = {}
    axiosPrivate({ url, method, headers }).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const getSharedContests = (axiosPrivate: AxiosInstance, userId: string, status: string, successHandler: Function, failHandler: Function) => {
    const url = `${BFF_URLS.contestService}/contests/shared/${userId}?status=${status}`
    const method = "GET";
    const headers = {}
    axiosPrivate({ url, method, headers }).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const getContestAdminAccess = (axiosPrivate: AxiosInstance, contestId : string, successHandler: Function, failHandler: Function) => {
    const url = `${BFF_URLS.contestService}/contests/${contestId}/users-with-access`
    const method = "GET";
    const headers = {};
    axiosPrivate({ url, method, headers }).then((res: AxiosResponse) => successHandler(res)).catch((err: AxiosError) => failHandler(err));   
}

export const getChallengeAdminAccess = (axiosPrivate: AxiosInstance, challengeId : string, successHandler: Function, failHandler: Function) => {
    const url = `${BFF_URLS.challengeService}/challenges/${challengeId}/users-with-access`
    const method = "GET";
    const headers = {};
    axiosPrivate({ url, method, headers }).then((res: AxiosResponse) => successHandler(res)).catch((err: AxiosError) => failHandler(err));   
}

export const giveAccessToContest = (axiosPrivate: AxiosInstance, contestId: string, accessDetails: AccessDetails, successHandler : Function, failHandler : Function)=> { 
    const url = `${BFF_URLS.contestService}/contests/${contestId}/users-with-access`
    const method = "POST";
    const headers = {};
    const data = accessDetails;
    axiosPrivate({url, method, headers,data}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const giveAccessToChallenge = (axiosPrivate: AxiosInstance, challengeId: string, accessDetails: AccessDetails, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.challengeService}/challenges/${challengeId}/users-with-access`
    const method = "POST";
    const headers = {};
    const data = accessDetails;
    axiosPrivate({url, method, headers,data}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const removeAccessFromContest = (axiosPrivate: AxiosInstance, contestId: string, accessDetails: AccessDetails, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.contestService}/contests/${contestId}/users-with-access`
    const method = "DELETE";
    const headers = {};
    const data = accessDetails;
    axiosPrivate({url, method, headers,data}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const removeAccessFromChallenge = (axiosPrivate: AxiosInstance, challengeId: string, accessDetails: AccessDetails, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.challengeService}/challenges/${challengeId}/users-with-access`
    const method = "DELETE";
    const headers = {};
    const data = accessDetails;
    axiosPrivate({url, method, headers,data}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const deleteContest = (axiosPrivate: AxiosInstance, contestId: string, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.contestService}/contests/${contestId}`
    const method = "DELETE";
    const headers = {};
    axiosPrivate({url, method, headers}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const deleteChallenge = (axiosPrivate: AxiosInstance, challengeId: string, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.challengeService}/challenges/${challengeId}`
    const method = "DELETE";
    const headers = {};
    axiosPrivate({url, method, headers}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const getReport = (axiosPrivate: AxiosInstance, contestId : string, successHandler: Function, failHandler: Function) => {
    const url = `${BFF_URLS.contestService}/contests/${contestId}/report`
    const method = "GET";
    const headers = {};
    axiosPrivate({ url, method, headers }).then((res: AxiosResponse) => successHandler(res)).catch((err: AxiosError) => failHandler(err));   
}