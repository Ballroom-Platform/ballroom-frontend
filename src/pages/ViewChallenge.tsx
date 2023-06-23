import { Box, Button, CircularProgress, Paper, Typography, Snackbar, IconButton, Tab, Tabs } from "@mui/material";
import { Layout } from "../components/templates";
import DownloadIcon from '@mui/icons-material/Download';
import { BFF_URLS } from "../links";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getChallenge, giveAccessToChallenge, deleteChallenge, getChallengeAdminAccess } from "../api/admin";
import { OwnChallenge } from "../helpers/interfaces";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useApp } from "../hooks/useApp";
import ShareChallenge from "./ShareChallenge";
import CloseIcon from '@mui/icons-material/Close';
import { getReadmeChallenge } from "../api/contestant";
import MarkdownRenderer from "../helpers/MarkdownRenderer";

type ChallengeId = {
    challengeId: string;
};

type User = {
    userId: string;
    username: string;
    fullname: string;
};

interface AccessDetails {
    userId: string;
}

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
    const [post, setPost] = useState('');	

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
        const accessDetails: AccessDetails = {userId: thisUserId};
        giveAccessToChallenge(axiosIns, challengeId!, accessDetails, (res: any) => {console.log(res); setshowNotification(true);},
         (err: any) => {
            console.log("ERROR...");
        });
    }

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setselectedTab(newValue);
    };

    const getReadmeFail = () => {
        console.log("Getting readme failed")
    }

    const getReadmeSucess = (res : AxiosResponse) => {
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(new Blob([res.data], { type: 'text/markdown' }));
        fetch(link.href).then((res) => res.text()).then((res) => setPost(res));
    }

    const getSuccess = (res : AxiosResponse) => {
        const tempArr = res.data.data.map((item:User) => (item.userId));
        setuserids([...tempArr]);
    }
  
    const getFail = (err: AxiosError) =>{
        console.log("Getting data failed", err)
    }

    useEffect(() => {
        getChallengeAdminAccess(axiosPrivate, challengeId!, getSuccess, getFail);
        getChallenge(axiosPrivate, challengeId!).then(res => {
            setChallenge(res.data);
            setLoading(false);
        }).catch(() => console.log("Challenge fetching failed"))
        getReadmeChallenge(axiosPrivate, challengeId!, getReadmeSucess, getReadmeFail);
    }, [challengeId])

    return ( 
        <Layout>
            {
                loading && <Box width="100%" textAlign="center" padding="40px"><CircularProgress /></Box>
            }
            
            {
                !loading && (
                <>
                    <div style={{display:"flex" ,width:"100%",justifyContent:"space-between"}}>
                        {challenge.authorId === userId ? 
                            <Button variant="outlined" sx={{ color: "darkblue"}} onClick={() => editChallenge()}>Edit Challenge</Button> : null} 
                        {userIds.includes(userId!) ? 
                            <Button variant="outlined" sx={{ color: "darkblue"}} onClick={() => editChallenge()}>Edit Challenge</Button> : null}
                        {challenge.authorId === userId ? 
                            <Button variant="outlined" sx={{ color: "darkred" }} onClick={() => deleteThisChallenge()}>Delete Challenge</Button> : null}
                    </div>
                        <Typography variant="h4" textAlign="center" fontWeight={"bold"} gutterBottom>
                            {challenge.title}
                        </Typography>

                        <Typography sx={{marginTop:1, marginBottom: 2, color:"gray"}} variant="h6" textAlign="center" gutterBottom>
                            Diffculty: {challenge.difficulty}
                        </Typography>

                    {challenge.authorId === userId ? 
                    <Tabs value={selectedTab} onChange={handleChangeTab} centered>
                        <Tab label="VIEW" />
                        <Tab label="SHARE" />
                    </Tabs> 
                    : null }

                    {selectedTab === 0  &&
                        <>

                        <Paper sx={{padding: '1rem', minHeight: "600px" , marginBottom:6}}>
                            <div>
                                <MarkdownRenderer source={post} />
                            </div>

                            <Box sx={{marginleft: 2, marginTop:6, marginBottom:2}}>
                                <Button variant="outlined" sx={{width:'100%', color:"darkblue"}} onClick={downloadFunction}startIcon={<DownloadIcon />}>Dowload Template</Button>
                            </Box>
                        </Paper>
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