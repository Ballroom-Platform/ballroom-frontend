import { Button, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { getChallenge, getContest } from "../api/admin";
import { getChallengesInContest } from "../api/common";
import { Layout } from "../components/templates";
import { IMinimalContest } from "../helpers/interfaces";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Link } from "react-router-dom";
import LeaderboardTable from "../components/LeaderboardTable";

type ContestId = {
    contestId: string;
};

type Challenge = {
    challengeId: string;
    title: string;
    difficulty: string;
};

const PastContestControls = () => {

    const {contestId} = useParams<ContestId>();
    const location = useLocation();
    const [contest, setcontest] = useState<IMinimalContest>();
    const [challenges, setchallenges] = useState<Challenge[]>([]);
    const [selectedTab, setselectedTab] = useState(0);
    const axiosIns = useAxiosPrivate();

    const handleRecievedChallengeArray = (res: any) => {
        console.log(res.data)
        res.data.forEach((challengeId: any) => {
            getChallenge(axiosIns, challengeId).then((res: any) => setchallenges((prevstate) => prevstate ? [...prevstate, {challengeId: res.data.challengeId,title: res.data.title, difficulty: res.data.difficulty}] : [{challengeId: res.data.challengeId,title: res.data.title, difficulty: res.data.difficulty}])).
            catch((res: any)=> console.log(res.data));
            
        });
    }

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setselectedTab(newValue);
    };

    useEffect(() => {
        getChallengesInContest( axiosIns, contestId!, handleRecievedChallengeArray, (err: any) => console.log(err))
        getContest(axiosIns, contestId!,(res: any) => {setcontest(res.data)}, () => console.log("ËRROR OCCURRED"));

    },[]);
    
    return ( 
        <Layout>
            <Typography variant="h3" gutterBottom>
                {contest ? contest.title : "Loading..."}
            </Typography>


            <Typography sx={{color: 'gray'}}variant="h6" gutterBottom>
                {contest ? contest.description: "Loading..."}<br></br>
            </Typography>

            <Tabs value={selectedTab} onChange={handleChangeTab} centered>
                <Tab label="CHALLENGES" />
                <Tab label="LEADERBOARD" />
            </Tabs>

            {selectedTab === 0 && 
                    challenges && challenges.map((challenge) => (

                        <Card key={challenge.challengeId} sx={{marginY: '1rem', width: '75%'}} >
    
                            <CardContent>
                                <Typography variant="h5" component="div">
                                {challenge.title}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {challenge.difficulty}
                                </Typography>
                            </CardContent>  
    
                            <CardActions>
                                <Link to={`${location.pathname}/${challenge.challengeId}`}><Button size="small">View</Button></Link>
                            </CardActions>
    
                        </Card>
            ))}

            {selectedTab === 1 && <LeaderboardTable contestId={contestId!}/>}


        </Layout>
    );
}
 
export default PastContestControls;