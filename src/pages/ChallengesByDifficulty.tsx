import { Button, Card, CardActions, CardContent, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getChallangesByDifficulty } from "../api/admin";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";

type Challenge = {
    challengeId: string;
    title: string;
    difficulty: string;
};

// public type Challenge record{
//     @sql:Column {name: "challenge_id"}
//     string challengeId;
//     string title;
//     string description;
//     string constraints;
//     // Not sure about the type here, byte[]?
//     // ChallengeDifficulty difficulty; 
//     string difficulty;
//     byte[] testCase;
//     @sql:Column {name: "challenge_template"}
//     byte[]? template;
// };

const ChallengesByDifficulty = () => {

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setvalue(newValue);
    };
    
    const [challenges, setchallenges] = useState<Challenge[]>([]);
    const [value, setvalue] = useState(0);
    const axiosIns = useAxiosPrivate();

    useEffect(() => {
        let difficulty : string;
        switch (value) {
            case 0:
                difficulty = "EASY"
                break;
            case 1:
                difficulty =  "MEDIUM"
                break;
            case 2:
                difficulty =  "HARD"
                break; 
            default:
                difficulty =  "EASY"
                break;
        }
        getChallangesByDifficulty(axiosIns, 
            difficulty, 
            (res: any) => {
            const listOfChallenges: any[] = res.data
            setchallenges(listOfChallenges.map((challenge) : Challenge => ({challengeId: challenge.challengeId, title: challenge.title, difficulty: challenge.difficulty})))
        },
        () => {})
    }, [value]);

    return ( 
        <>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="EASY" />
                <Tab label="MEDIUM" />
                <Tab label="HARD" />
            </Tabs>

            
            {challenges && challenges.map((challenge) => (

                <Card key={challenge.challengeId} sx={{marginY: '1rem', width: '75%'}} >

                    <CardContent>
                        <Typography variant="h5" component="div">
                        {challenge.title}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {challenge.difficulty}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Challenge Id: {challenge.challengeId}
                        </Typography>
                    </CardContent>  

                    <CardActions>
                            <Link to={`/viewChallenge/${challenge.challengeId}`}><Button size="small">View</Button></Link>
                    </CardActions>

                </Card>
            ))}


        </>
    );
}
 
export default ChallengesByDifficulty;