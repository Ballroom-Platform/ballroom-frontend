import { useAuthContext } from "@asgardeo/auth-react"
import { Button, Grid } from "@mui/material"
import { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router"
import { Link } from "react-router-dom"
import { ContestCard } from "../components/molecules"
import { Layout } from "../components/templates"
import { IContest } from "../helpers/interfaces"
import { useApp } from "../hooks/useApp"
import { getOngoingContests } from "../api/admin"
import useAxiosPrivate from "../hooks/useAxiosPrivate"


export const Contests : React.FC = () => {
    const {appState} = useApp();
    console.log(appState);
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState<boolean>(true);
    const clickHandler = (key: string) => {
        navigate(location.pathname + `/${key}`);
    }

    const [contests, setContests] = useState<Array<IContest>>([] as Array<IContest>);

    const getContestsSuccess = (res : AxiosResponse) => {
        setContests(res.data);
    }

    const getContestsFail = () => {
        console.log("Getting contests failed");
    }

    useEffect(() => {
        if(loading){
            getOngoingContests(axiosPrivate,getContestsSuccess, getContestsFail);
            setLoading(false);
        }
    }, [loading])


    return(
        <Layout>
            {!loading && (
                <>
                    <Grid>
                        {contests.map((item) => <ContestCard contestImageURL={null} key={item.contestId} contestId={item.contestId} contestName={item.title} startTime="" endTime="" forcedState="active" owner="" clickHandler={clickHandler}/>)}
                    </Grid>
                </>
            )}
        </Layout>
    )
}