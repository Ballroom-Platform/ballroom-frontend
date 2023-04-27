import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router"
import { useEffect, useState } from "react";
import { changeContestTime, getChallenge, getContest, removeChallengeFromContest } from "../api/admin";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Layout } from "../components/templates";
import { Link } from "react-router-dom";
import CreateContest from "./CreateContest";
import { getChallengesInContest } from "../api/common";
import { AxiosInstance } from "axios";
import { IMinimalContest } from "../helpers/interfaces";



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
    const [contest, setcontest] = useState<IMinimalContest>();
    const [challenges, setchallenges] = useState<Challenge[]>([]);
    const axiosIns = useAxiosPrivate();

    const handleRecievedChallengeArray = (res: any) => {
        res.data.forEach((challengeId: any) => {
            getChallenge(axiosIns, challengeId).then((res: any) => setchallenges((prevstate) => prevstate ? [...prevstate, {challengeId: res.data.challengeId,title: res.data.title, difficulty: res.data.difficulty}] : [{challengeId: res.data.challengeId,title: res.data.title, difficulty: res.data.difficulty}])).
            catch((res: any)=> console.log(res.data));
            
        });
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
        getChallengesInContest( axiosIns, contestId!, handleRecievedChallengeArray, (err: any) => console.log(err))
        getContest(axiosIns, contestId!,(res: any) => {setcontest(res.data)}, () => console.log("ËRROR OCCURRED"));
    },[]);


    return ( 
        <Layout>
            <Typography variant="h3" gutterBottom>
                {contest ? "Name: " + contest.title : "Loading..."}
            </Typography>

            <Typography sx={{color: 'gray'}}variant="h6" gutterBottom>
                Contest ID: {contestId}<br></br> 
            </Typography>

            <Link to={`/addChallengeToContest/${contestId}`}>
            <Button variant="contained">Add Challenge</Button>
            </Link>

            {contest && <Button variant="contained" sx={{marginX: "2rem"}}onClick={onForceStartClick}>Force Start</Button>}
            

            <Typography sx={{marginY: '2rem'}} variant="h4" gutterBottom>
                    Challenges in Contest
            </Typography>
            

            {challenges && challenges.map((challenge) => (

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
                            <Link to={`/viewChallenge/${challenge.challengeId}`}><Button size="small">View</Button></Link>
                            <Button sx={{color: 'red'}} size="small" onClick={() => removeChallengeFromContest(axiosIns, contestId!, challenge.challengeId!, (res: any)=> {console.log(res.data); handleRemoval(challenge.challengeId)}, () => console.log("ERROR!"))}>Remove</Button>
                        </CardActions>

                    </Card>
            ))}
            
            <Paper sx={{marginY: '2rem'}}>
 
            </Paper>
            
        </Layout>
    );
}
 
export default ContestControls