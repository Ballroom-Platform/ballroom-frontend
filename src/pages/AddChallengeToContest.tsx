import { IconButton, Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { addChallenge } from "../api/admin";
import { Layout } from "../components/templates";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import ChallengesByDifficulty from "./ChallengesByDifficulty";
import CloseIcon from '@mui/icons-material/Close';

type ContestId = {
    contestId: string;
};

const AddChallengeToContest = () => {

    const {contestId} = useParams<ContestId>();
    const [challengeId, setchallengeId] = useState("");
    const [showNotification, setshowNotification] = useState(false);
    const axiosIns = useAxiosPrivate();


    return ( 
        <Layout>
            <Typography variant="h3" gutterBottom>
                    Add Challenge to Contest
            </Typography>

            <Paper elevation={0}>
                <TextField value={challengeId} onChange={(e) => setchallengeId(e.target.value)}id="outlined-basic" label="Challenge Id" variant="outlined" />
            </Paper>
            <Button sx={{marginY: '2rem'}}variant="contained" onClick={() => addChallenge(axiosIns, contestId, challengeId, (res: any) => {console.log(res); setshowNotification(true); setchallengeId("");}, (err: any) => console.log(err))}>Add Challenge</Button>

            <ChallengesByDifficulty/>
            
            <Snackbar  open={showNotification} autoHideDuration={6000} onClose={() => setshowNotification(false)} message="Added Challenge!" action={ <IconButton size="small" aria-label="close" color="inherit" onClick={() => setshowNotification(false)}> <CloseIcon fontSize="small" /> </IconButton>} />

        </Layout>
    );
}
 
export default AddChallengeToContest;