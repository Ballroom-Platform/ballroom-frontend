import { Grid, Typography, Tab, Tabs } from "@mui/material";
import { ContestCard } from "../components/molecules";
import { useApp } from "../hooks/useApp";
import { useNavigate, useLocation } from "react-router"
import { Layout } from "../components/templates";
import { IMinimalContest, AccessContest } from "../helpers/interfaces";
import { useEffect, useState } from "react";
import { getOwnerContests, getSharedContests} from "../api/admin";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";
import { getDateString } from "../helpers/dateConverter";

const UpcomingContests = () => {

    const {appState, setAppState} = useApp();
    const navigate = useNavigate();
    const location = useLocation()
    const userId = appState.auth.userID;
    const [selectedTab, setselectedTab] = useState(0);
    const [contests, setcontests] = useState<IMinimalContest[]>([]);
    const [contestsshared, setcontestsshared] = useState<AccessContest[]>([]);
    const axiosIns = useAxiosPrivate();

    const clickHandler = (key: string, accessType: string) => {
        if(accessType === "VIEW")
        {
            navigate("/upcomingContests/view" + `/${key}`);
        } else {
            navigate("/upcomingContests" + `/${key}`);
        }
    }
    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setselectedTab(newValue);
    };

    useEffect(() => {
        getOwnerContests(axiosIns, userId!, "future" ,(res: any) => setcontests((prevstate) => prevstate ? [...prevstate, ...res.data] : [{}]),(err: any) => console.log(err))
        getSharedContests(axiosIns, userId! , "future", (res: any) => setcontestsshared((prevstate) => prevstate ? [...prevstate, ...res.data] : [{}]),(err: any) => console.log(err))
    }, []);

    return ( 
        
        <Layout>
            <Typography variant="h3" gutterBottom>
                    Upcoming Contests
            </Typography>

            <Tabs value={selectedTab} onChange={handleChangeTab} centered>
                <Tab label="OWNED" />
                <Tab label="SHARED" />
            </Tabs>

            {selectedTab === 0 &&
            <>
                <Grid container sx={{marginY: '2rem'}}>

                {contests.map((contest) => 
                        <ContestCard contestImageURL={null} key={contest.contestId} contestId={contest.contestId} contestName={contest.title} startTime={getDateString(contest.startTime)} endTime={getDateString(contest.endTime)} owner="" accessType="" clickHandler={clickHandler}/>
                )}
                
                </Grid>
            </>
            } 

            {selectedTab === 1 &&
            <>
                <Grid container sx={{marginY: '2rem'}}>
            
                {contestsshared.filter((contest) => contest.accessType === "EDIT").map((contest) => 
                        <ContestCard contestImageURL={null} key={contest.contestId} contestId={contest.contestId} contestName={contest.title} startTime={getDateString(contest.startTime)} endTime={getDateString(contest.endTime)} owner="" accessType={contest.accessType} clickHandler={clickHandler}/>      
                )} 
                
                {contestsshared.filter((contest) => contest.accessType === "VIEW").map((contest) => 
                        <ContestCard contestImageURL={null} key={contest.contestId} contestId={contest.contestId} contestName={contest.title} startTime={getDateString(contest.startTime)} endTime={getDateString(contest.endTime)} owner="" accessType={contest.accessType} clickHandler={clickHandler}/>        
                )}

                </Grid>
            </>
            }

        </Layout>
     );
}
 
export default UpcomingContests;