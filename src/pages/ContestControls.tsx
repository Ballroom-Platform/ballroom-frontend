import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ImageIcon from '@mui/icons-material/Image';
import ListItemButton from "@mui/material/ListItemButton";
import AssignmentIcon from '@mui/icons-material/Assignment';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router"
import { useCallback, useEffect, useState } from "react";
import { getChallengesInContest } from "../api/admin";
import useAxiosPrivate from "../hooks/useAxiosPrivate";




type ContestId = {
    contestId: string;
};

type Challenge = {
    title: string;
    difficulty: string;
};

const print = (par: any) => console.log(par);

const ContestControls: React.FC = () => {

    const {contestId} = useParams<ContestId>();
    const [challenges, setchallenges] = useState<Challenge[]>();
    const axiosIns = useAxiosPrivate();
    useCallback((res: any) => console.log(res), [])

    useEffect(() => {
        // get challenges belonging to contest
        getChallengesInContest( "contest_001", (res: any) => console.log(res), (err: any) => console.log(err))
        setchallenges(()=>[
            {
                title: "Challenge Title",
                difficulty: "HARD"
            },
            {
                title: "Challenge Title",
                difficulty: "HARD"
            },
            {
                title: "Challenge Title",
                difficulty: "HARD"
            },
            {
                title: "Challenge Title",
                difficulty: "HARD"
            }
        ])
    }, [challenges]);

    return ( 
        <>
            <Typography variant="h3" gutterBottom>
                    ID: {contestId}<br></br> 
                    Name: Game Jam
            </Typography>

            <Button variant="contained">Add Challenge</Button>

            <Typography sx={{marginY: '2rem'}} variant="h4" gutterBottom>
                    Challenges in Contest
            </Typography>
            

            {challenges && challenges.map((challenge) => (

                    <Card sx={{marginY: '1rem', width: '75%'}} >

                        <CardContent>
                            <Typography variant="h5" component="div">
                            {challenge.title}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {challenge.difficulty}
                            </Typography>
                        </CardContent>  

                        <CardActions>
                            <Button size="small">View</Button>
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
            
        </>
    );
}
 
export default ContestControls;