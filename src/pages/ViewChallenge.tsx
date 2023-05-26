import { Box, Button, CircularProgress, Paper, Typography, Snackbar, IconButton, Tab, Tabs } from "@mui/material";
import { Layout } from "../components/templates";
import DownloadIcon from '@mui/icons-material/Download';
import { BFF_URLS } from "../links";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getChallenge, giveAccessToChallenge, getChallengeAccessGrantedUsers, deleteChallenge } from "../api/admin";
import { OwnChallenge } from "../helpers/interfaces";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useApp } from "../hooks/useApp";
import ShareChallenge from "./ShareChallenge";
import CloseIcon from '@mui/icons-material/Close';

type ChallengeId = {
    challengeId: string;
};

const ViewChallenge = () => {
    const {challengeId} = useParams<ChallengeId>()
    const [challenge, setChallenge] = useState<OwnChallenge>({} as OwnChallenge);
    const [loading, setLoading] = useState<boolean>(true);
    const axiosPrivate = useAxiosPrivate();
    const {appState} = useApp();
    const userId = appState.auth.userID;
    const navigate = useNavigate();
    const axiosIns = useAxiosPrivate();
    const [showNotification, setshowNotification] = useState(false);
    const [selectedTab, setselectedTab] = useState(0);
    const [userIds, setuserids] = useState<string[]>([]);

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

    const editChallenge = () => {
        navigate(`/editChallenge/${challengeId}`);
    }

    const deleteThisChallenge = () => {
        deleteChallenge(axiosIns, challengeId!, (res: any) => {navigate(`/mychallenges`);}, (err: any) => console.log(err));
    }

    const giveAccessToThisChallenge = (thisUserId: string) => {
        giveAccessToChallenge(axiosIns, challengeId!, thisUserId, (res: any) => {console.log(res); setshowNotification(true);},
         (err: any) => {
            console.log("ERROR...");
        });
    }

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setselectedTab(newValue);
    };

    useEffect(() => {
        getChallengeAccessGrantedUsers(axiosIns, challengeId!, (res: any) => setuserids(res.data), (err: any) => console.log(err));
        getChallenge(axiosPrivate, challengeId!).then(res => {
            setChallenge(res.data);
            setLoading(false);
        }).catch(() => console.log("Challenge fetching failed"))
    }, [challengeId])

    return ( 
        <Layout>
            {
                loading && <Box width="100%" textAlign="center" padding="40px"><CircularProgress /></Box>
            }
            
            {
                !loading && (
                <>
                    {challenge.authorId === userId ? 
                    <Tabs value={selectedTab} onChange={handleChangeTab} centered>
                        <Tab label="VIEW" />
                        <Tab label="SHARE" />
                    </Tabs> 
                    : null }

                    {selectedTab === 0  &&
                        <>
                        {challenge.authorId === userId ? 
                            <Button variant="contained" sx={{marginY: "2rem", backgroundColor: "darkblue"}} onClick={() => editChallenge()}>Edit Challenge</Button> : null} 
                        {userIds.includes(userId!) ? 
                            <Button variant="contained" sx={{marginY: "2rem", backgroundColor: "darkblue"}} onClick={() => editChallenge()}>Edit Challenge</Button> : null}
                        {challenge.authorId === userId ? 
                            <Button variant="contained" sx={{marginY: "2rem", marginX: "2rem", backgroundColor: "darkred" }} onClick={() => deleteThisChallenge()}>Delete Challenge</Button> : null}

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
                        </>
                    }
                    {selectedTab === 1 && 
                        <>
                            <ShareChallenge ownerID ={challenge.authorId} giveAccessToChallenge={giveAccessToThisChallenge}/>
            
                            <Snackbar  open={showNotification} autoHideDuration={2000} onClose={() => setshowNotification(false)} message="Added Admin!" action={ <IconButton size="small" aria-label="close" color="inherit" onClick={() => setshowNotification(false)}> <CloseIcon fontSize="small" /> </IconButton>} />
                        </>
                    }
                </>

                )
            }
            
        </Layout>
    );
}
 
export default ViewChallenge;