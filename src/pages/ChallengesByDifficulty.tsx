import { Button, Card, CardActions, CardContent, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getChallangesByDifficulty } from "../api/admin";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link, useLocation } from "react-router-dom";
import { AxiosInstance } from "axios";

type Challenge = {
    challengeId: string;
    title: string;
    difficulty: string;
};

type IProps = {
    adminEdit?: boolean;
    addChallengeToContest?: (challengeId: string) => void;
}

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

const ChallengesByDifficulty = ({adminEdit, addChallengeToContest} : IProps) => {

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setvalue(newValue);
        setquery("");
    };
    
    const [challenges, setchallenges] = useState<Challenge[]>([]);
    const location = useLocation();
    const [query, setquery] = useState<string>("");
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


            <TextField sx={{marginY: '2rem'}} id="outlined-basic" label="Search by title.." value={query} variant="outlined" onChange={(e) => setquery(e.target.value)}/>
            
            {challenges && challenges
            .filter((challenge) => challenge.title.toLowerCase().includes(query.toLowerCase()))
            .map((challenge) => (

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
                            <Link to={`${location.pathname}/${challenge.challengeId}`}><Button size="small">View</Button></Link>
                            {adminEdit && <Link to={`/editChallenge/${challenge.challengeId}`}><Button size="small">Edit</Button></Link>}
                            {addChallengeToContest && <Button size="small" onClick={() => addChallengeToContest(challenge.challengeId)}>Add to Contest</Button>}
                    </CardActions>

                </Card>
            ))}


        </>
    );
}
 
export default ChallengesByDifficulty;