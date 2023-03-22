import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { addChallenge } from "../api/admin";
import { Layout } from "../components/templates";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

type ContestId = {
    contestId: string;
};

const AddChallengeToContest = () => {

    const {contestId} = useParams<ContestId>();
    const [challengeId, setchallengeId] = useState("");
    const axiosIns = useAxiosPrivate();


    return ( 
        <Layout>
            <Typography variant="h3" gutterBottom>
                    Add Challenge to Contest
            </Typography>

            <Paper elevation={0}>
                <TextField value={challengeId} onChange={(e) => setchallengeId(e.target.value)}id="outlined-basic" label="Challenge Id" variant="outlined" />
            </Paper>
            <Button sx={{marginY: '2rem'}}variant="contained" onClick={() => addChallenge(axiosIns, contestId, challengeId, (res: any) => {console.log(res);}, (err: any) => console.log(err))}>Add Challenge</Button>

        </Layout>
    );
}
 
export default AddChallengeToContest;