import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router"
import { useEffect, useState } from "react";
import { getChallenge, getContest } from "../api/admin";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Layout } from "../components/templates";
import { Link } from "react-router-dom";
import CreateContest from "./CreateContest";
import { getChallengesInContest } from "../api/common";
import { AxiosInstance } from "axios";



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
    const [contestTitle, setcontestTitle] = useState();
    const [challenges, setchallenges] = useState<Challenge[]>([]);
    const axiosIns = useAxiosPrivate();

    const handleRecievedChallengeArray = (res: any) => {
        console.log("The size of response array is " + res.data.length)
        res.data.forEach((challengeId: any) => {
            console.log(challengeId)
            getChallenge(axiosIns, challengeId,
                (res: any) => setchallenges((prevstate) => prevstate ? [...prevstate, {challengeId: res.data.challengeId,title: res.data.title, difficulty: res.data.difficulty}] : [{challengeId: res.data.challengeId,title: res.data.title, difficulty: res.data.difficulty}]),
                (res: any)=> console.log(res.data))
            
        });
    }
    
    useEffect(() => {
        getChallengesInContest( axiosIns, contestId, handleRecievedChallengeArray, (err: any) => console.log(err))
        getContest(axiosIns, contestId,(res: any) => {setcontestTitle(res.data.title)}, () => console.log("ËRROR OCCURRED"));
    },[]);

    return ( 
        <Layout>
            <Typography variant="h3" gutterBottom>
                    Name: {contestTitle}
            </Typography>

            <Typography sx={{color: 'gray'}}variant="h6" gutterBottom>
                Contest ID: {contestId}<br></br> 
            </Typography>

            <Link to={`/addChallengeToContest/${contestId}`}>
            <Button variant="contained">Add Challenge</Button>
            </Link>
            

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
                        </CardActions>

                    </Card>
            ))}
            
            <Paper sx={{marginY: '2rem'}}>
 
            </Paper>
            
        </Layout>
    );
}
 
export default ContestControls