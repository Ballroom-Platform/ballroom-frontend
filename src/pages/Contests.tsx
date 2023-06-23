import { Box, Button, CircularProgress, Grid, TextField } from "@mui/material"
import { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router"
import { ContestCard } from "../components/molecules"
import { Layout } from "../components/templates"
import { AccessContest, IContest, IMinimalContest } from "../helpers/interfaces"
import { useApp } from "../hooks/useApp"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { getUpcomingContests, getOngoingContests, getPastContests } from "../api/common"
import { getDateString } from "../helpers/dateConverter"
import { getOwnerContests, getSharedContests } from "../api/admin"


export const Contests : React.FC = () => {
    const {appState} = useApp();
    console.log(appState);
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState<boolean>(true);
    const [check1, setCheck1] = useState<boolean>(true);
    const [check2, setCheck2] = useState<boolean>(true);
    const [check3, setCheck3] = useState<boolean>(true);
    const [check4, setCheck4] = useState<boolean>(true);
    const [check5, setCheck5] = useState<boolean>(true);
    const [check6, setCheck6] = useState<boolean>(true);
    const [check7, setCheck7] = useState<boolean>(true);
    const [check8, setCheck8] = useState<boolean>(true);
    const [check9, setCheck9] = useState<boolean>(true);
    const axiosIns = useAxiosPrivate();
    const userId = appState.auth.userID;
    const [upcomingcontests, setupcomingcontests] = useState<IMinimalContest[]>([]);
    const [upcomingcontestsshared, setupcomingcontestsshared] = useState<AccessContest[]>([]);
    const [ongoingcontests, setongoingcontests] = useState<IMinimalContest[]>([]);
    const [ongoingcontestsshared, setongoingcontestsshared] = useState<AccessContest[]>([]);
    const [pastcontests, setpastcontests] = useState<IMinimalContest[]>([]);
    const [pastcontestsshared, setpastcontestsshared] = useState<AccessContest[]>([]);
    const [contestIds, setcontestids] = useState<string[]>([]);
    const [query, setquery] = useState<string>("");

    const clickHandler = (key: string) => {
        navigate(location.pathname + `/${key}`);
    }

    const [contests, setContests] = useState<Array<IContest>>([] as Array<IContest>);

    const getContestsSuccess = (res : AxiosResponse) => {
        setContests(res.data);
        setCheck1(false);
    }
    const getUpcomingContestsSuccess = (res: AxiosResponse) => {
        setContests(prev => [...prev, ...res.data])
        setCheck2(false);
    }

    const getPastContestsSuccess = (res: AxiosResponse) => {
        setContests(prev => [...prev, ...res.data])
        setCheck3(false);
    }

    const getContestsFail = () => {
        console.log("Getting contests failed");
    }

    const setUserContest = () => {
        upcomingcontests.map((item) => contestIds.push(item.contestId));
        upcomingcontestsshared.map((item) => contestIds.push(item.contestId));
        ongoingcontests.map((item) => contestIds.push(item.contestId));
        ongoingcontestsshared.map((item) => contestIds.push(item.contestId));
        pastcontests.map((item) => contestIds.push(item.contestId));
        pastcontestsshared.map((item) => contestIds.push(item.contestId));
        console.log(contestIds);
        setLoading(false);
    }

    useEffect(() => {
        if(loading){
            if(check1) getOngoingContests(axiosPrivate,getContestsSuccess, getContestsFail);
            else if(check2) getUpcomingContests(axiosPrivate, getUpcomingContestsSuccess, getContestsFail);
            else if(check3) getPastContests(axiosPrivate, getPastContestsSuccess, getContestsFail);
            else if(check4)getOwnerContests(axiosIns, userId!, "future", (res: any) => {setupcomingcontests((prevstate) => prevstate ? [...prevstate, ...res.data] : [{}]); setCheck4(false);},(err: any) => console.log(err));
            else if(check5)getSharedContests(axiosIns, userId!, "future",(res: any) => {setupcomingcontestsshared((prevstate) => prevstate ? [...prevstate, ...res.data] : [{}]); setCheck5(false);},(err: any) => console.log(err));
            else if(check6)getOwnerContests(axiosIns, userId!, "present", (res: any) => {setongoingcontests((prevstate) => prevstate ? [...prevstate, ...res.data] : [{}]); setCheck6(false);},(err: any) => console.log(err));
            else if(check7)getSharedContests(axiosIns, userId!, "present",(res: any) => {setongoingcontestsshared((prevstate) => prevstate ? [...prevstate, ...res.data] : [{}]); setCheck7(false);},(err: any) => console.log(err));
            else if(check8)getOwnerContests(axiosIns, userId!, "past", (res: any) => {setpastcontests((prevstate) => prevstate ? [...prevstate, ...res.data] : [{}]); setCheck8(false);},(err: any) => console.log(err));
            else if(check9)getSharedContests(axiosIns, userId!, "past",(res: any) => {setpastcontestsshared((prevstate) => prevstate ? [...prevstate, ...res.data] : [{}]); setCheck9(false);},(err: any) => console.log(err));

            else setUserContest();
        }
    }, [loading, check1, check2, check3, check4, check5, check6 , check7, check8, check9])


    return(
        <Layout>
            {
                loading && <Box width="100%" textAlign="center" padding="40px"><CircularProgress /></Box>
            }
            {!loading && (
                <>
                <TextField sx={{  marginX: '1.4rem' }} id="outlined-basic" label="Search by title" value={query} variant="outlined" onChange={(e) => setquery(e.target.value)} />
                    <Grid>
                        {contests
                        .filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
                        .map((item) => 
                            contestIds.includes(item.contestId) ? null :
                            <ContestCard contestImageURL={null} key={item.contestId} contestId={item.contestId} contestName={item.title} startTime={getDateString(item.startTime)} endTime={getDateString(item.endTime)} owner="" accessType="" clickHandler={clickHandler}/>
                            
                        )}
                    </Grid>
                </>
            )}
        </Layout>
    )
}