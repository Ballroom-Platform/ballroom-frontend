import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

const addChallenge = (contestId: string, challengeId: string) => {
    console.log("Contest Id is : " + contestId + ", Challenge Id is : " + challengeId);
}

const AddChallengeToContest = ({}) => {

    const contestId = "23";

    const [challengeId, setchallengeId] = useState("");

    return ( 
        <>
            <Typography variant="h3" gutterBottom>
                    Add Challenge to Contest
            </Typography>

            <Paper elevation={0}>
                <TextField value={challengeId} onChange={(e) => setchallengeId(e.target.value)}id="outlined-basic" label="Challenge Id" variant="outlined" />
            </Paper>
            <Button sx={{marginY: '2rem'}}variant="contained" onClick={() => addChallenge(contestId, challengeId)}>Add Challenge</Button>

        </>
    );
}
 
export default AddChallengeToContest;