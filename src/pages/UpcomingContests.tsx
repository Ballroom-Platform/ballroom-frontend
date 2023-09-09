import { Grid, Typography, Tab, Tabs, TextField } from "@mui/material";
import { ContestCard } from "../components/molecules";
import { useApp } from "../hooks/useApp";
import { useNavigate } from "react-router"
import { Layout } from "../components/templates";
import { IMinimalContest, AccessContest } from "../helpers/interfaces";
import { useEffect, useState } from "react";
import { getOwnerContests, getSharedContests} from "../api/admin";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { compareTime, getDateString } from "../helpers/dateConverter";

const UpcomingContests = () => {

    const {appState, setAppState} = useApp();
    const navigate = useNavigate();
    const userId = appState.auth.userID;
    const [selectedTab, setselectedTab] = useState(0);
    const [contests, setcontests] = useState<IMinimalContest[]>([]);
    const [contestsshared, setcontestsshared] = useState<AccessContest[]>([]);

    const axiosIns = useAxiosPrivate();
    const [query, setquery] = useState<string>("");
	    

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
        getOwnerContests(axiosIns, userId! , (res: any) => { setcontests((prevstate) => prevstate ? [...prevstate, ...res.data] : [{}]); } ,(err: any) => console.log(err));
        getSharedContests(axiosIns, userId! , (res: any) => { setcontestsshared((prevstate) => prevstate ? [...prevstate, ...res.data] : [{}]); } ,(err: any) => console.log(err));
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
                <TextField sx={{ marginY: '1rem'}} id="outlined-basic" label="Search by title" value={query} variant="outlined" onChange={(e) => setquery(e.target.value)} />
                <Grid container sx={{marginY: '2rem'}}>

                {contests
                .filter((item) => compareTime(item.startTime,item.endTime) === "Upcoming")
                .filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
                .map((contest) => 
                        <ContestCard contestImageURL={contest.imageUrl} key={contest.contestId} contestId={contest.contestId} contestName={contest.title} startTime={getDateString(contest.startTime)} endTime={getDateString(contest.endTime)} owner="" accessType="" clickHandler={clickHandler}/>
                )}
                
                </Grid>
            </>
            } 

            {selectedTab === 1 &&
            <>
                <TextField sx={{ marginY: '1rem' }} id="outlined-basic" label="Search by title" value={query} variant="outlined" onChange={(e) => setquery(e.target.value)} />
                <Grid container sx={{marginY: '2rem'}}>
            
                {contestsshared
                .filter((item) => compareTime(item.startTime,item.endTime) === "Upcoming")
                .filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
                .filter((contest) => contest.accessType === "EDIT").map((contest) => 
                        <ContestCard contestImageURL={contest.imageUrl} key={contest.contestId} contestId={contest.contestId} contestName={contest.title} startTime={getDateString(contest.startTime)} endTime={getDateString(contest.endTime)} owner="" accessType={contest.accessType} clickHandler={clickHandler}/>      
                )} 
                
                {contestsshared
                .filter((item) => compareTime(item.startTime,item.endTime) === "Upcoming")
                .filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
                .filter((contest) => contest.accessType === "VIEW").map((contest) => 
                        <ContestCard contestImageURL={contest.imageUrl} key={contest.contestId} contestId={contest.contestId} contestName={contest.title} startTime={getDateString(contest.startTime)} endTime={getDateString(contest.endTime)} owner="" accessType={contest.accessType} clickHandler={clickHandler}/>        
                )}

                </Grid>
            </>
            }

        </Layout>
     );
}
 
export default UpcomingContests;