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
    const [showFailNotification, setshowFailNotification] = useState(false);
    const axiosIns = useAxiosPrivate();

    const addChallengeToThisContest = (thisChallengeId: string) => {
        addChallenge(axiosIns, contestId, thisChallengeId, (res: any) => {console.log(res); setshowNotification(true);},
         (err: any) => {
            console.log("ERROR...");
            if(err.response.data === "Challenge already added to contest"){
                setshowFailNotification(true);
            }
        });
    }


    return ( 
        <Layout>
            <Typography variant="h3" gutterBottom>
                    Add Challenge to Contest
            </Typography>

            <ChallengesByDifficulty addChallengeToContest={addChallengeToThisContest}/>
            
            <Snackbar  open={showNotification} autoHideDuration={6000} onClose={() => setshowNotification(false)} message="Added Challenge!" action={ <IconButton size="small" aria-label="close" color="inherit" onClick={() => setshowNotification(false)}> <CloseIcon fontSize="small" /> </IconButton>} />

            <Snackbar  open={showFailNotification} autoHideDuration={6000} onClose={() => setshowFailNotification(false)} message="Challenge is already added!" action={ <IconButton size="small" aria-label="close" color="inherit" onClick={() => setshowFailNotification(false)}> <CloseIcon fontSize="small" /> </IconButton>} />

        </Layout>
    );
}
 
export default AddChallengeToContest;