import { Button, Card, CardActions, CardContent, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/templates";
import ChallengesByDifficulty from "./ChallengesByDifficulty";

type Challenge = {
    challengeId: string;
    title: string;
    difficulty: string;
};

const ListOfChallengesAdmin = () => {

    const [query, setquery] = useState<string>("");
    const [challenges, setchallenges] = useState<Challenge[]>([]);

    return ( 

        <Layout>
            <ChallengesByDifficulty admin />
        </Layout>
        // <Layout>
        //     <Typography variant="h3" gutterBottom>
        //             Search Challenges
        //     </Typography>

        //     <Paper elevation={0}>
        //         <TextField value={query} onChange={(e) => setquery(e.target.value)}id="outlined-basic" label="Enter search" variant="outlined" />
        //     </Paper>

        //     <Button sx={{marginY: '2rem'}}variant="contained" onClick={() => console.log("Search")}>Search</Button>

        //     {challenges && challenges.map((challenge) => (

        //         <Card key={challenge.challengeId} sx={{marginY: '1rem', width: '75%'}} >

        //             <CardContent>
        //                 <Typography variant="h5" component="div">
        //                 {challenge.title}
        //                 </Typography>
        //                 <Typography sx={{ mb: 1.5 }} color="text.secondary">
        //                 {challenge.difficulty}
        //                 </Typography>
        //             </CardContent>  

        //             <CardActions>
        //                 <Link to={`/viewChallenge/${challenge.challengeId}`}><Button size="small">View</Button></Link>
        //                 {/* <Button sx={{color: 'red'}} size="small" onClick={() => removeChallengeFromContest(axiosIns, contestId, challenge.challengeId, (res: any)=> {console.log(res.data); handleRemoval(challenge.challengeId)}, () => console.log("ERROR!"))}>Remove</Button> */}
        //             </CardActions>

        //         </Card>
        //     ))}

        // </Layout>
    );
}
 
export default ListOfChallengesAdmin;