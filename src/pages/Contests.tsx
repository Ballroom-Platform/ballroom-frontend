import { Box, CircularProgress, Grid, TextField } from "@mui/material"
import { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router"
import { ContestCard } from "../components/molecules"
import { Layout } from "../components/templates"
import { AccessContest, IContest, IDateTimeObject, IMinimalContest } from "../helpers/interfaces"
import { useApp } from "../hooks/useApp"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { getContests } from "../api/common"
import { compareTime, getDateString } from "../helpers/dateConverter"
import { getContest, getOwnerContests, getSharedContests } from "../api/admin"


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
    const axiosIns = useAxiosPrivate();
    const userId = appState.auth.userID;
    const [ownedcontests, setownedcontests] = useState<IMinimalContest[]>([]);
    const [sharedcontests, setsharedcontests] = useState<AccessContest[]>([]);
    const [contestIds, setcontestids] = useState<string[]>([]);
    const [query, setquery] = useState<string>("");

    const clickHandler = (key: string) => {
        getContest(axiosPrivate, key, (res: any) => {
            compareTime(res.data.startTime, res.data.endTime) === "Ongoing" ? navigate(location.pathname + `/ongoing/${key}`) :
                compareTime(res.data.startTime, res.data.endTime) === "Upcoming" ? navigate(location.pathname + `/upcoming/${key}`) :
                    navigate(location.pathname + `/past/${key}`)
        }, (err: any) => console.log(err));
    }

    const [contests, setContests] = useState<Array<IContest>>([] as Array<IContest>);

    const getContestsSuccess = (res : AxiosResponse) => {
        setContests(res.data);
        setCheck1(false);
    }

    const getContestsFail = () => {
        console.log("Getting contests failed");
    }

    const setUserContest = () => {
        ownedcontests.map((item) => contestIds.push(item.contestId));
        sharedcontests.map((item) => contestIds.push(item.contestId));
        setLoading(false);
    }

    useEffect(() => {
        if(loading){
            if(check1) getContests(axiosPrivate,getContestsSuccess, getContestsFail);
            else if(check2)getOwnerContests(axiosIns, userId!, (res: any) => {setownedcontests((prevstate) => prevstate ? [...prevstate, ...res.data] : [{}]); setCheck2(false);},(err: any) => console.log(err));
            else if(check3)getSharedContests(axiosIns, userId!, (res: any) => {setsharedcontests((prevstate) => prevstate ? [...prevstate, ...res.data] : [{}]); setCheck3(false);},(err: any) => console.log(err));

            else setUserContest();
        }
    }, [loading, check1, check2, check3])


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