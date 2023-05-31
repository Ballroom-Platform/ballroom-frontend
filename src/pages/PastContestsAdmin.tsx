import { Grid, Typography, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useApp } from "../hooks/useApp";
import { Link } from "react-router-dom";
import { getOwnerContests, getSharedContests } from "../api/admin";
import { ContestCard } from "../components/molecules";
import { Layout } from "../components/templates";
import { IMinimalContest, AccessContest } from "../helpers/interfaces";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { getDateString } from "../helpers/dateConverter";

const PastContestsAdmin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {appState} = useApp();
    const userId = appState.auth.userID;
    const [selectedTab, setselectedTab] = useState(0);
    const [contests, setcontests] = useState<IMinimalContest[]>([]);
    const [contestsshared, setcontestsshared] = useState<AccessContest[]>([]);
    const axiosIns = useAxiosPrivate();

    const clickHandler = (key: string, accessType: string) => {
        if(accessType === "VIEW")
        {
            navigate("/pastContests/view" + `/${key}`);
        } else {
            navigate("/pastContests" + `/${key}`);
        }  
    }

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setselectedTab(newValue);
    };

    useEffect(() => {
        getOwnerContests(axiosIns, userId!, "past", (res: any) => setcontests((prevstate) => prevstate ? [...prevstate, ...res.data] : [{}]),(err: any) => console.log(err));
        getSharedContests(axiosIns, userId!, "past",(res: any) => setcontestsshared((prevstate) => prevstate ? [...prevstate, ...res.data] : [{}]),(err: any) => console.log(err));
    }, []);
    
    return ( 
        <Layout>
            <Typography variant="h3" gutterBottom>
                    Past Contests
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
 
export default PastContestsAdmin;