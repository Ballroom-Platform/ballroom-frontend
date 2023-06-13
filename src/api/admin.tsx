import { AxiosError, AxiosResponse, AxiosInstance } from "axios";
import { useEffect, useState } from "react";
import { BalDateTime, IUpdatedContest, NewContest } from "../helpers/interfaces";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { BFF_URLS } from "../links/backend";

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
    const url = `${BFF_URLS.challengeService}/challenges/${difficulty}/owned/${userId}`
    const method = "GET";
    const headers = {};
    axiosPrivate({url, method, headers}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());

}

export const getSharedChallangesByDifficulty = (axiosPrivate: AxiosInstance, difficulty : string, userId : string, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.challengeService}/challenges/${difficulty}/shared/${userId}`
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

export const getOwnerContests = (axiosPrivate: AxiosInstance, userId: string, contestType: string, successHandler: Function, failHandler: Function) => {
    const url = `${BFF_URLS.contestService}/contests/${contestType}/owned/${userId}`
    const method = "GET";
    const headers = {}
    axiosPrivate({ url, method, headers }).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const getSharedContests = (axiosPrivate: AxiosInstance, userId: string, contestType: string, successHandler: Function, failHandler: Function) => {
    const url = `${BFF_URLS.contestService}/contests/${contestType}/shared/${userId}`
    const method = "GET";
    const headers = {}
    axiosPrivate({ url, method, headers }).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const getAccessGrantedUsers = (axiosPrivate: AxiosInstance, contestId: string, successHandler : Function, failHandler : Function) => {
    const url = `${BFF_URLS.contestService}/contests/accessgranted/${contestId}`
    const method = "GET";
    const headers = {};
    axiosPrivate({url, method, headers}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const getChallengeAccessGrantedUsers = (axiosPrivate: AxiosInstance, challengeId: string, successHandler : Function, failHandler : Function) => {
    const url = `${BFF_URLS.challengeService}/challenges/accessgranted/${challengeId}`
    const method = "GET";
    const headers = {};
    axiosPrivate({url, method, headers}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const getContestAdminAccess = (axiosPrivate: AxiosInstance, contestId : string, successHandler: Function, failHandler: Function) => {
    const url = `${BFF_URLS.contestService}/contests/${contestId}/access`
    const method = "GET";
    const headers = {};
    axiosPrivate({ url, method, headers }).then((res: AxiosResponse) => successHandler(res)).catch((err: AxiosError) => failHandler(err));   
}

export const getChallengeAdminAccess = (axiosPrivate: AxiosInstance, challengeId : string, successHandler: Function, failHandler: Function) => {
    const url = `${BFF_URLS.challengeService}/challenges/${challengeId}/access`
    const method = "GET";
    const headers = {};
    axiosPrivate({ url, method, headers }).then((res: AxiosResponse) => successHandler(res)).catch((err: AxiosError) => failHandler(err));   
}

export const giveAccessToContest = (axiosPrivate: AxiosInstance, contestId: string, userId: string, accessType: string, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.contestService}/contests/${contestId}/access/${userId}/${accessType}`
    const method = "POST";
    const headers = {};
    axiosPrivate({url, method, headers}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const giveAccessToChallenge = (axiosPrivate: AxiosInstance, challengeId: string, userId: string, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.challengeService}/challenges/${challengeId}/access/${userId}`
    const method = "POST";
    const headers = {};
    axiosPrivate({url, method, headers}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const removeAccessFromContest = (axiosPrivate: AxiosInstance, contestId: string, userId: string, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.contestService}/contests/${contestId}/access/${userId}`
    const method = "DELETE";
    const headers = {};
    axiosPrivate({url, method, headers}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const removeAccessFromChallenge = (axiosPrivate: AxiosInstance, challengeId: string, userId: string, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.challengeService}/challenges/${challengeId}/access/${userId}`
    const method = "DELETE";
    const headers = {};
    axiosPrivate({url, method, headers}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
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

export const getOwnedChallengeIds = (axiosPrivate: AxiosInstance, userId : string, successHandler: Function, failHandler: Function) => {
    const url = `${BFF_URLS.challengeService}/challenges/owned/${userId}`
    const method = "GET";
    const headers = {};
    axiosPrivate({ url, method, headers }).then((res: AxiosResponse) => successHandler(res)).catch((err: AxiosError) => failHandler(err));   
}

export const getSharedChallengeIds = (axiosPrivate: AxiosInstance, userId : string, successHandler: Function, failHandler: Function) => {
    const url = `${BFF_URLS.challengeService}/challenges/shared/${userId}`
    const method = "GET";
    const headers = {};
    axiosPrivate({ url, method, headers }).then((res: AxiosResponse) => successHandler(res)).catch((err: AxiosError) => failHandler(err));   
}

export const getReport = (axiosPrivate: AxiosInstance, contestId : string, successHandler: Function, failHandler: Function) => {
    const url = `${BFF_URLS.contestService}/contests/${contestId}/report`
    const method = "GET";
    const headers = {};
    axiosPrivate({ url, method, headers }).then((res: AxiosResponse) => successHandler(res)).catch((err: AxiosError) => failHandler(err));   
}