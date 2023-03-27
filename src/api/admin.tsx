import {  AxiosResponse, AxiosInstance } from "axios";
import { useEffect, useState } from "react";
import { NewContest } from "../helpers/interfaces";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { BFF_URLS } from "../links/backend";

export const getChallenge = (axiosPrivate: AxiosInstance, challengeId : string, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.challengeService}/challenge/${challengeId}`
    const method = "GET";
    const headers = {};
    axiosPrivate({url, method, headers}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());

}

export const createContest = (axiosPrivate : AxiosInstance, contest: NewContest, successHandler : Function, failHandler : Function)=> {
    console.log(contest)
    const url = `${BFF_URLS.contestService}/contest`;
    const method = "POST";
    const headers = {};
    const data = contest;
    axiosPrivate({url, method, headers, data }).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const addChallenge = (axiosPrivate : AxiosInstance, contestId: string, challengeId: string, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.contestService}/contest/${contestId}/challenge/${challengeId}`;
    const method = "POST";
    const headers = {};
    axiosPrivate({url, method, headers }).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const createChallenge = (axiosPrivate : AxiosInstance, data: FormData, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.challengeService}/challenge`;
    const method = "POST";
    const headers = {
        "Content-Type": "multipart/form-data",
    };
    axiosPrivate({url, method, headers, data }).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const getContest = (axiosPrivate: AxiosInstance, contestId: string, successHandler : Function, failHandler : Function) => {
    const url = `${BFF_URLS.contestService}/contest/${contestId}`
    const method = "GET";
    const headers = {};
    axiosPrivate({url, method, headers}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

export const getChallangesByDifficulty = (axiosPrivate: AxiosInstance, difficulty : string, successHandler : Function, failHandler : Function)=> {
    const url = `${BFF_URLS.challengeService}/challenges/difficulty/${difficulty}`
    const method = "GET";
    const headers = {};
    axiosPrivate({url, method, headers}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());

}