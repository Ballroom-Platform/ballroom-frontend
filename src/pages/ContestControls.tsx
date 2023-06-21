import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Paper from "@mui/material/Paper";
import { useLocation, useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react";
import { addChallenge, changeContestTime, getChallenge, getContest, removeChallengeFromContest, giveAccessToContest, deleteContest, getSharedChallengeIds, getOwnedChallengeIds } from "../api/admin";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Layout } from "../components/templates";
import { Link } from "react-router-dom";
import CreateContest from "./CreateContest";
import { getChallengesInContest } from "../api/common";
import { AxiosInstance, AxiosResponse } from "axios";
import { IMinimalContest } from "../helpers/interfaces";
import { Snackbar, Tab, Tabs } from "@mui/material";
import ChallengesByDifficulty from "./ChallengesByDifficulty";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ShareContest from "./ShareContest";
import { useApp } from "../hooks/useApp";
import { getReadmeContest } from "../api/contestant";
import { axiosPrivate } from "../api/axios";
import MarkdownRenderer from "../helpers/MarkdownRenderer";

type ContestId = {
    contestId: string;
};

type Challenge = {
    challengeId: string;
    title: string;
    difficulty: string;
};

interface AccessDetails {
    userId: string;
    accessType: string;
}

const ContestControls: React.FC = () => {

    const {contestId} = useParams<ContestId>();
    const location = useLocation();
    const [contest, setcontest] = useState<IMinimalContest>();
    const [challenges, setchallenges] = useState<Challenge[]>([]);
    const axiosIns = useAxiosPrivate();
    const navigate = useNavigate();
    const [selectedTab, setselectedTab] = useState(0);
    const [showNotification, setshowNotification] = useState(false);
    const [showFailNotification, setshowFailNotification] = useState(false);
    const {appState} = useApp();
    const userID = appState.auth.userID;
    const [ownedchallengeIds, setownedchallengeids] = useState<string[]>([]);
    const [sharedchallengeIds, setsharedchallengeids] = useState<string[]>([]);
    const [post, setPost] = useState('');

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setselectedTab(newValue);
    };

    const addChallengeToThisContest = (thisChallengeId: string) => {
        addChallenge(axiosIns, contestId!, thisChallengeId, (res: any) => {console.log(res); setshowNotification(true);},
         (err: any) => {
            console.log("ERROR...");
            if(err.response.data === "Challenge already added to contest"){
                setshowFailNotification(true);
            }
        });

    }

    const handleRecievedChallengeArray = (res: any) => {
        Promise.all(
            res.data.map((challengeId : string) => {
            return getChallenge(axiosIns, challengeId).then((res) => res.data);
            })
        ).then(
            (results) => {
            setchallenges([...results] as Array<Challenge>)
            },
            () => console.log("Failed to fetch challenge details")
        );
    }
    
    const handleRemoval = (challengeId: string) => {
        setchallenges((prevstate) => prevstate ? prevstate.filter((challenge) => challenge.challengeId !== challengeId) : []);
    }

    const getReadmeFail = () => {
        console.log("Getting readme failed")
    }

    const getReadmeSucess = (res : AxiosResponse) => {
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(new Blob([res.data], { type: 'text/markdown' }));
        fetch(link.href).then((res) => res.text()).then((res) => setPost(res));
    }


    const onForceStartClick = () => {
        const date = new Date();
        const newStartTime = {second: date.getSeconds(), minute: date.getMinutes(), hour: date.getHours(), day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear()}
        if(contest) {
            changeContestTime(axiosIns, contestId!, {title: contest.title, startTime: newStartTime, endTime: contest.endTime, moderator: contest.moderator}, (res: any) => console.log(res.data), (err: any) => console.log(err));
        }
        navigate("/ongoingContests");
        window.location.reload();
    }

    const giveAccessToThisContest = (thisUserId: string, accessType: string) => {
        const accessDetails: AccessDetails = {userId: thisUserId, accessType: accessType};
        giveAccessToContest(axiosIns, contestId!, accessDetails, (res: any) => {console.log(res); setshowNotification(true);},
         (err: any) => {
            console.log("ERROR...");
        });

    }
    const deleteClick = () => {
        if(contest) {
            deleteContest(axiosIns, contestId!, (res: any) => console.log(res.data), (err: any) => console.log(err));
        }
        navigate("/upcomingContests");
        window.location.reload();
    }

    useEffect(() => {
        if(selectedTab === 0){
            getChallengesInContest( axiosIns, contestId!, handleRecievedChallengeArray, (err: any) => console.log(err))
            getContest(axiosIns, contestId!,(res: any) => {setcontest(res.data)}, () => console.log("ËRROR OCCURRED"));
            getSharedChallengeIds(axiosIns, userID!,(res: any) => {setsharedchallengeids(res.data)}, () => console.log("ËRROR OCCURRED"));
            getOwnedChallengeIds(axiosIns, userID!,(res: any) => {setownedchallengeids(res.data)}, () => console.log("ËRROR OCCURRED"));  
            getReadmeContest(axiosPrivate, contestId!, getReadmeSucess, getReadmeFail);    
        }
    },[selectedTab]);


    return ( 
        <Layout>
            <Typography variant="h4" textAlign="center" fontWeight={"bold"} gutterBottom>
                {contest ? contest.title : "Loading..."}
            </Typography>

            <div style={{display:"flex" ,width:"100%",justifyContent:"space-between"}}>
                {contest && <Button variant="outlined" sx={{color: "darkblue"}}onClick={onForceStartClick}>Force Start</Button>}
                {contest && contest.moderator === userID ?
                    <Button variant="outlined" sx={{marginX: "2rem", color: "darkred"}}onClick={deleteClick}>Delete Contest</Button>: null
                }
            </div>
            
            <Tabs value={selectedTab} onChange={handleChangeTab} centered>
                <Tab label="ABOUT" />
                <Tab label="CHALLENGES" />
                <Tab label="ADD CHALLENGE" />
                <Tab label="SHARE" />
            </Tabs>

            {selectedTab === 0 && 
            <>
                <div>
                    <MarkdownRenderer source={post} />
                </div>
            </>
            }
            
            {selectedTab === 1 && 
                <>
                {
                    challenges && challenges.map((challenge) => (

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
                                {(sharedchallengeIds.includes(challenge.challengeId) || ownedchallengeIds.includes(challenge.challengeId) )&& <Link to={`${location.pathname}/${challenge.challengeId}`}><Button size="small">View</Button></Link>}
                                {(sharedchallengeIds.includes(challenge.challengeId) || ownedchallengeIds.includes(challenge.challengeId) )&&  <Button sx={{color: 'red'}} size="small" onClick={() => removeChallengeFromContest(axiosIns, contestId!, challenge.challengeId!, (res: any)=> {console.log(res.data); handleRemoval(challenge.challengeId)}, () => console.log("ERROR!"))}>Remove</Button>}

                                {(!ownedchallengeIds.includes(challenge.challengeId) && !sharedchallengeIds.includes(challenge.challengeId)) && <Typography variant="body2" color="darkorange" sx={{marginX: 2}}>You Don't Have Access</Typography>}
                            </CardActions>

                        </Card>
                    ))
                }
                </>
            }

            
            {selectedTab === 2 && 
                <>
                    <ChallengesByDifficulty addChallengeToContest={addChallengeToThisContest}/>
                
                    <Snackbar  open={showNotification} autoHideDuration={2000} onClose={() => setshowNotification(false)} message="Added Challenge!" action={ <IconButton size="small" aria-label="close" color="inherit" onClick={() => setshowNotification(false)}> <CloseIcon fontSize="small" /> </IconButton>} />
        
                    <Snackbar  open={showFailNotification} autoHideDuration={2000} onClose={() => setshowFailNotification(false)} message="Challenge is already added!" action={ <IconButton size="small" aria-label="close" color="inherit" onClick={() => setshowFailNotification(false)}> <CloseIcon fontSize="small" /> </IconButton>} />
                        </>
            }

            {selectedTab === 3 &&
            <>
                <ShareContest ownerID ={contest!.moderator} giveAccessToContest={giveAccessToThisContest}/>
            
                <Snackbar  open={showNotification} autoHideDuration={2000} onClose={() => setshowNotification(false)} message="Added Admin!" action={ <IconButton size="small" aria-label="close" color="inherit" onClick={() => setshowNotification(false)}> <CloseIcon fontSize="small" /> </IconButton>} />
            </>
            }
            
            <Paper sx={{marginY: '2rem'}}>
 
            </Paper>
            
        </Layout>
    );
}
 
export default ContestControls