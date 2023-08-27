import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router";
import { Layout } from "../components/templates";
import { useApp } from "../hooks/useApp"
import { URL_LIST } from "../links/frontend";
import { addNewUser } from "../api/admin";
import { getUser } from "../api/common";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { User } from "../helpers/interfaces";
import { Box, CircularProgress } from "@mui/material";

export const LoginHandler : React.FC = () => {
    const [user, setuser] = useState<User>();
    const axiosIns = useAxiosPrivate();
    const {appState} = useApp();
    const navigate = useNavigate();
    const [check, setCheck] = useState<boolean>(true);
    const [check2, setCheck2] = useState<boolean>(true);
    useEffect(() => {
        const URL = localStorage.getItem("redirectURL");
        if (check) {
            getUser(axiosIns,appState.auth.userID!,(res: any) => {setuser(res.data.data);setCheck(false);},(err: any) => {console.log("1");});
        } else  if (check2){
            const formData = new FormData();
            formData.append('userId', appState.auth.userID!);
            formData.append('fullname', user!.fullname);
            formData.append('username', user!.username);
            addNewUser(axiosIns, formData, (res: any) => {console.log("User added to database"); setCheck2(false);}, (err: any) => {if(err.response.status === 409){setCheck2(false);} console.log("User already in the database");});
        } else{
        if (URL && URL !== "" && URL !== URL_LIST["loginHandler"]){
            localStorage.removeItem("redirectURL")
            navigate(URL)
        }else{
            navigate(appState.page.redirectURL[appState.auth?.userRole!]);
        }
        }
        
    }, [check,check2])
    return(<>
        <Box width="100%" textAlign="center" padding="40px"><CircularProgress /></Box>
    </>)
}