import {  AxiosResponse } from "axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { BFF_URLS } from "../links/backend";


export const uploadSubmission = async (data : FormData, successHandler : Function, failHandler : Function)=> {
    const axiosPrivate = await useAxiosPrivate();
    const url = BFF_URLS.uploadService;
    const method = "POST";
    const headers = {};
    axiosPrivate({url, method, headers, data }).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

