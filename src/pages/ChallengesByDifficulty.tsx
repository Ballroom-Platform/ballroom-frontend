import { Button, Card, CardActions, CardContent, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getChallangesByDifficulty,  getOwnedChallenges,  getSharedChallenges } from "../api/admin";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link, useLocation } from "react-router-dom";
import { AxiosInstance, AxiosResponse } from "axios";
import { useApp } from "../hooks/useApp";
import { getChallengesInContest } from "../api/common";
import { useParams } from "react-router";

type Challenge = {
    challengeId: string;
    title: string;
    difficulty: string;
};

type ContestId = {
    contestId: string;
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
    const [ownedchallengeIds, setownedchallengeids] = useState<string[]>([]);
    const [sharedchallengeIds, setsharedchallengeids] = useState<string[]>([]);
    const location = useLocation();
    const [query, setquery] = useState<string>("");
    const [value, setvalue] = useState(0);
    const axiosIns = useAxiosPrivate();
    const {appState} = useApp();
    const userId = appState.auth.userID;
    const {contestId} = useParams<ContestId>();
    const [challengeIds, setchallengeids] = useState<string[]>([]);

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
        () => {});
        getSharedChallenges(axiosIns, userId!,(res: any) => {setsharedchallengeids(res.data.map((challenge: any) => challenge.challengeId))},() => {});
        getOwnedChallenges(axiosIns, userId!,(res: any) => {setownedchallengeids(res.data.map((challenge: any) => challenge.challengeId))},() => {});
        if (contestId) {
            getChallengesInContest(axiosIns, contestId, (res: any) => {
                setchallengeids([...res.data]);
            }
            , () => {})
        }

    }, [value,addChallengeToContest]);

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

                <Card key={challenge.challengeId} sx={{marginY: '1rem', width: '100%'}} >

                    <CardContent>
                        <Typography variant="h5" component="div">
                        {challenge.title}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {challenge.difficulty}
                        </Typography>
                    </CardContent>  

                    <CardActions>
                        {(!ownedchallengeIds.includes(challenge.challengeId) && !sharedchallengeIds.includes(challenge.challengeId)) && <Typography variant="body2" color="darkorange" sx={{marginX: 2}}>You Don't Have Access</Typography>}
                        {(sharedchallengeIds.includes(challenge.challengeId) || ownedchallengeIds.includes(challenge.challengeId)) && <Link to={`${location.pathname}/${challenge.challengeId}`}><Button size="small">View</Button></Link>}
                        {(sharedchallengeIds.includes(challenge.challengeId) || ownedchallengeIds.includes(challenge.challengeId)) && addChallengeToContest && !challengeIds.includes(challenge.challengeId) && <Button size="small" onClick={() => addChallengeToContest(challenge.challengeId)}>Add to Contest</Button>}
                        {(sharedchallengeIds.includes(challenge.challengeId) || ownedchallengeIds.includes(challenge.challengeId)) && challengeIds.includes(challenge.challengeId) && addChallengeToContest && <Typography variant="body2" color="darkblue" sx={{marginX: 2}} >Already Added to the contest</Typography>}
                    </CardActions>

                </Card>
            ))}


        </>
    );
}
 
export default ChallengesByDifficulty;