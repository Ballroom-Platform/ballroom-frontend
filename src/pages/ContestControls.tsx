import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router"
import { useEffect, useState } from "react";
import { getChallenge, getChallengesInContest } from "../api/admin";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Layout } from "../components/templates";
import { Link } from "react-router-dom";
import CreateContest from "./CreateContest";



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
    const [challenges, setchallenges] = useState<Challenge[]>([]);
    const axiosIns = useAxiosPrivate();
    const [isLoadedChallenges, setisLoadedChallenges] = useState(false);

    const someFunc = (res: any) => {
        console.log("The size of response array is " + res.data.length)
        res.data.forEach((challengeId: any) => {
            console.log(challengeId)
            getChallenge(axiosIns, challengeId,
                (res: any) => setchallenges((prevstate) => prevstate ? [...prevstate, {challengeId: res.data.challengeId,title: res.data.title, difficulty: res.data.difficulty}] : [{challengeId: res.data.challengeId,title: res.data.title, difficulty: res.data.difficulty}]),
                (res: any)=> console.log(res.data))
            
        });
    }
    
    useEffect(() => {
        if (!isLoadedChallenges) {
            console.log("------------------------------------------------")
            setisLoadedChallenges(true)
            getChallengesInContest( axiosIns, contestId, someFunc, (err: any) => console.log(err))
            console.log(isLoadedChallenges)
            console.log("++++++++++++++++++++++++++++++++++++++++++++++++")
        }
    },[]);

    return ( 
        <Layout>
            <Typography variant="h3" gutterBottom>
                    ID: {contestId}<br></br> 
                    Name: Game Jam
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
                            <Link to={`/contests/${contestId}/${challenge.challengeId}`}><Button size="small">View</Button></Link>
                        </CardActions>

                    </Card>
            ))}
            
            <Paper sx={{marginY: '2rem'}}>

                {/* <Card sx={{marginY: '1rem', width: '75%'}} >

                    <CardContent>
                        <Typography variant="h5" component="div">
                        The Hardest Challenge in the World
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        HARD
                        </Typography>
                    </CardContent>

                    <CardActions>
                        <Button size="small">View</Button>
                    </CardActions>

                </Card> */}

                
                
            </Paper>
            
        </Layout>
    );
}
 
export default ContestControls;