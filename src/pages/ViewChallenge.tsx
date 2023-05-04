import { Box, Button, Paper, Typography } from "@mui/material";
import { Layout } from "../components/templates";
import DownloadIcon from '@mui/icons-material/Download';
import { BFF_URLS } from "../links";
import axios from "axios";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getChallenge } from "../api/admin";
import { IChallenge } from "../helpers/interfaces";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

type ChallengeId = {
    challengeId: string;
};

const ViewChallenge = () => {
    const {challengeId} = useParams<ChallengeId>()
    const [challenge, setChallenge] = useState<IChallenge>({} as IChallenge);
    const [loading, setLoading] = useState<boolean>(true);
    const axiosPrivate = useAxiosPrivate();
    const downloadFunction = async () => {
        let results = await axios({
            url: `${BFF_URLS.challengeService}/challenges/${challengeId}/template`,
            method: 'GET',
            responseType: 'blob'
         })
         let hidden_a = document.createElement('a');
         hidden_a.href = window.URL.createObjectURL(new Blob([results.data]));
         hidden_a.setAttribute('download', 'template.zip');
         document.body.appendChild(hidden_a);
         hidden_a.click();
    }

    useEffect(() => {
        getChallenge(axiosPrivate, challengeId!).then(res => {
            setChallenge(res.data);
            setLoading(false);
        }).catch(() => console.log("Challenge fetching failed"))
    }, [challengeId])

    return ( 
        <Layout>
            
            <Paper sx={{padding: '1rem', minHeight: "600px"}}>
                
                <Typography variant="h4" gutterBottom>
                    {challenge.title}
                </Typography>

                <Typography variant="body1" gutterBottom>
                    Challenge ID: {challengeId}
                </Typography>

                <Typography sx={{marginTop:'3rem'}} variant="h6" gutterBottom>
                    Diffculty: {challenge.difficulty}
                </Typography>

                <Typography sx={{marginTop:'3rem'}} variant="h6" gutterBottom>
                    {/* Problem Statement: */}
                </Typography>

                <Typography variant="body1" gutterBottom>
                    {challenge.description}
                </Typography>

                <Typography sx={{marginTop:'3rem', fontWeight:'bold'}} variant="body1" gutterBottom>
                    Constraints:
                </Typography>

                <Typography variant="body1" gutterBottom>
                    {challenge.constraints}
                </Typography>
            </Paper>
            <Box sx={{marginY: '1rem'}}>
                <Button variant="outlined" onClick={downloadFunction}startIcon={<DownloadIcon />}>Dowload Template</Button>
            </Box>
            
        </Layout>
    );
}
 
export default ViewChallenge;