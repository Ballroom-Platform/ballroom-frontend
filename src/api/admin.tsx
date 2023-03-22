import {  AxiosResponse, AxiosInstance } from "axios";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { BFF_URLS } from "../links/backend";

type Challenge = {
    title: string;
    difficulty: string;
};

export const getChallengesInContest = async (contestId : string, successHandler : Function, failHandler : Function)=> {
    const axiosPrivate = await useAxiosPrivate();
    const url = `${BFF_URLS.contestService}/contest/${contestId}/challenges`
    const method = "GET";
    const headers = {};
    axiosPrivate({url, method, headers}).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());

}

