import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Paper from "@mui/material/Paper";
import { useLocation, useParams } from "react-router"
import { useEffect, useState } from "react";
import { addChallenge, changeContestTime, getChallenge, getContest, removeChallengeFromContest } from "../api/admin";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Layout } from "../components/templates";
import { Link } from "react-router-dom";
import CreateContest from "./CreateContest";
import { getChallengesInContest } from "../api/common";
import { AxiosInstance } from "axios";
import { IMinimalContest } from "../helpers/interfaces";
import { Snackbar, Tab, Tabs } from "@mui/material";
import ChallengesByDifficulty from "./ChallengesByDifficulty";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

type ContestId = {
    contestId: string;
};

type Challenge = {
    challengeId: string;
    title: string;
    difficulty: string;
};


const ContestControls: React.FC = () => {

    const {contestId} = useParams<ContestId>();
    const location = useLocation();
    const [contest, setcontest] = useState<IMinimalContest>();
    const [challenges, setchallenges] = useState<Challenge[]>([]);
    const axiosIns = useAxiosPrivate();

    const [selectedTab, setselectedTab] = useState(0);
    const [showNotification, setshowNotification] = useState(false);
    const [showFailNotification, setshowFailNotification] = useState(false);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setselectedTab(newValue);
    };

    const addChallengeToThisContest = (thisChallengeId: string) => {
        addChallenge(axiosIns, contestId!, thisChallengeId, (res: any) => {console.log(res); setshowNotification(true);},
         (err: any) => {
            console.log("ERROR...");
            if(err.response.data === "Challenge already added to contest"){
                setshowFailNotification(true);
            }
        });

    }

    const handleRecievedChallengeArray = (res: any) => {
        Promise.all(
            res.data.map((challengeId : string) => {
            return getChallenge(axiosIns, challengeId).then((res) => res.data);
            })
        ).then(
            (results) => {
            setchallenges([...results] as Array<Challenge>)
            },
            () => console.log("Failed to fetch challenge details")
        );
    }
    
    const handleRemoval = (challengeId: string) => {
        setchallenges((prevstate) => prevstate ? prevstate.filter((challenge) => challenge.challengeId !== challengeId) : []);
    }

    const onForceStartClick = () => {
        const date = new Date();
        const newStartTime = {second: date.getSeconds(), minute: date.getMinutes(), hour: date.getHours(), day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear()}
        if(contest) {
            changeContestTime(axiosIns, contestId!, {title: contest.title, startTime: newStartTime, endTime: contest.endTime, moderator: contest.moderator}, (res: any) => console.log(res.data), (err: any) => console.log(err));
        }
    }

    useEffect(() => {
        if(selectedTab === 0){
            getChallengesInContest( axiosIns, contestId!, handleRecievedChallengeArray, (err: any) => console.log(err))
            getContest(axiosIns, contestId!,(res: any) => {setcontest(res.data)}, () => console.log("ËRROR OCCURRED"));
        }
    },[selectedTab]);


    return ( 
        <Layout>
            <Typography variant="h3" gutterBottom>
                {contest ? "Name: " + contest.title : "Loading..."}
            </Typography>

            <Typography sx={{color: 'gray'}}variant="h6" gutterBottom>
                Contest ID: {contestId}<br></br> 
            </Typography>

            {/* <Link to={`/addChallengeToContest/${contestId}`}>
            <Button variant="contained">Add Challenge</Button>
            </Link> */}

            {contest && <Button variant="contained" sx={{marginX: "2rem"}}onClick={onForceStartClick}>Force Start</Button>}
            

            <Tabs value={selectedTab} onChange={handleChangeTab} centered>
                <Tab label="CHALLENGES" />
                <Tab label="ADD CHALLENGE" />
            </Tabs>
            

            {selectedTab === 0 && 
                <>
                <Typography sx={{marginY: '2rem'}} variant="h4" gutterBottom>
                    Challenges in Contest
                </Typography>
                {
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
                                <Button sx={{color: 'red'}} size="small" onClick={() => removeChallengeFromContest(axiosIns, contestId!, challenge.challengeId!, (res: any)=> {console.log(res.data); handleRemoval(challenge.challengeId)}, () => console.log("ERROR!"))}>Remove</Button>
                            </CardActions>

                        </Card>
                    ))
                }
                </>
            }

            
            {selectedTab === 1 && 
                <>
                    <ChallengesByDifficulty addChallengeToContest={addChallengeToThisContest}/>
                
                    <Snackbar  open={showNotification} autoHideDuration={2000} onClose={() => setshowNotification(false)} message="Added Challenge!" action={ <IconButton size="small" aria-label="close" color="inherit" onClick={() => setshowNotification(false)}> <CloseIcon fontSize="small" /> </IconButton>} />
        
                    <Snackbar  open={showFailNotification} autoHideDuration={2000} onClose={() => setshowFailNotification(false)} message="Challenge is already added!" action={ <IconButton size="small" aria-label="close" color="inherit" onClick={() => setshowFailNotification(false)}> <CloseIcon fontSize="small" /> </IconButton>} />
                        </>
            }
            
            <Paper sx={{marginY: '2rem'}}>
 
            </Paper>
            
        </Layout>
    );
}
 
export default ContestControls