import { useAuthContext } from "@asgardeo/auth-react"
import { Box, Button, CircularProgress, Grid } from "@mui/material"
import { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router"
import { Link } from "react-router-dom"
import { ContestCard } from "../components/molecules"
import { Layout } from "../components/templates"
import { IContest } from "../helpers/interfaces"
import { useApp } from "../hooks/useApp"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { getUpcomingContests, getOngoingContests } from "../api/common"
import { getDateString } from "../helpers/dateConverter"


export const Contests : React.FC = () => {
    const {appState} = useApp();
    console.log(appState);
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate();
    const location = useLocation();
    const [loadingOngoingContests, setLoadingOngoingContests] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);
    const clickHandler = (key: string) => {
        navigate(location.pathname + `/${key}`);
    }

    const [contests, setContests] = useState<Array<IContest>>([] as Array<IContest>);

    const getContestsSuccess = (res : AxiosResponse) => {
        setContests(res.data);
        setLoadingOngoingContests(false);
    }
    const getUpcomingContestsSuccess = (res: AxiosResponse) => {
        setContests(prev => [...prev, ...res.data])
        setLoading(false);
    }

    const getContestsFail = () => {
        console.log("Getting contests failed");
    }

    useEffect(() => {
        if(loading){
            if(loadingOngoingContests){
                getOngoingContests(axiosPrivate,getContestsSuccess, getContestsFail);
            }else{
                getUpcomingContests(axiosPrivate, getUpcomingContestsSuccess, getContestsFail)
            }
            
        }
    }, [loading, loadingOngoingContests])


    return(
        <Layout>
            {
                loading && <Box width="100%" textAlign="center" padding="40px"><CircularProgress /></Box>
            }
            {!loading && (
                <>
                    <Grid>
                        {contests.map((item) => <ContestCard contestImageURL={null} key={item.contestId} contestId={item.contestId} contestName={item.title} startTime={getDateString(item.startTime)} endTime={getDateString(item.endTime)} owner="" accessType="" clickHandler={clickHandler}/>)}
                    </Grid>
                </>
            )}
        </Layout>
    )
}