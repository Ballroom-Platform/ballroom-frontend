import {  AxiosInstance, AxiosResponse } from "axios";
import { BFF_URLS } from "../links/backend";


export const uploadSubmission = async (axiosPrivate : AxiosInstance, data : FormData, successHandler : Function, failHandler : Function)=> {
    const url = BFF_URLS.uploadService;
    const method = "POST";
    const headers = {};
    axiosPrivate({url, method, headers, data }).then((res: AxiosResponse) => successHandler(res)).catch(() => failHandler());
}

