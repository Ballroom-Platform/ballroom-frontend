import { Button, IconButton, Snackbar, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { deleteContest, getChallenge, getContest, getOwnedChallengeIds, getSharedChallengeIds, giveAccessToContest } from "../api/admin";
import { getChallengesInContest } from "../api/common";
import { Layout } from "../components/templates";
import { IMinimalContest } from "../helpers/interfaces";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Link } from "react-router-dom";
import LeaderboardTable from "../components/LeaderboardTable";
import ShareContest from "./ShareContest";
import CloseIcon from '@mui/icons-material/Close';
import { useApp } from "../hooks/useApp";
import { getReadmeContest } from "../api/contestant";
import { axiosPrivate } from "../api/axios";
import { AxiosResponse } from "axios";
import MarkdownRenderer from "../helpers/MarkdownRenderer";

type ContestId = {
    contestId: string;
};

type Challenge = {
    challengeId: string;
    title: string;
    difficulty: string;
};

const PastContestControls = () => {

    const {contestId} = useParams<ContestId>();
    const location = useLocation();
    const [contest, setcontest] = useState<IMinimalContest>();
    const [challenges, setchallenges] = useState<Challenge[]>([]);
    const [selectedTab, setselectedTab] = useState(0);
    const axiosIns = useAxiosPrivate();
    const [showNotification, setshowNotification] = useState(false);
    const [showFailNotification, setshowFailNotification] = useState(false);
    const {appState} = useApp();
    const userID = appState.auth.userID;
    const navigate = useNavigate();
    const [ownedchallengeIds, setownedchallengeids] = useState<string[]>([]);
    const [sharedchallengeIds, setsharedchallengeids] = useState<string[]>([]);
    const [post, setPost] = useState('');

    const handleRecievedChallengeArray = (res: any) => {
        console.log(res.data)
        res.data.forEach((challengeId: any) => {
            getChallenge(axiosIns, challengeId).then((res: any) => setchallenges((prevstate) => prevstate ? [...prevstate, {challengeId: res.data.challengeId,title: res.data.title, difficulty: res.data.difficulty}] : [{challengeId: res.data.challengeId,title: res.data.title, difficulty: res.data.difficulty}])).
            catch((res: any)=> console.log(res.data));
            
        });
    }

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setselectedTab(newValue);
    };

    const giveAccessToThisContest = (thisUserId: string, accessType: string) => {
        giveAccessToContest(axiosIns, contestId!, thisUserId, accessType,(res: any) => {console.log(res); setshowNotification(true);},
         (err: any) => {
            console.log("ERROR...");
            if(err.response.data === "Already added to admin"){
                setshowFailNotification(true);
            }
        });

    }

    const deleteClick = () => {
        if(contest) {
            deleteContest(axiosIns, contestId!, (res: any) => console.log(res.data), (err: any) => console.log(err));
        }
        navigate("/pastContests");
        window.location.reload();
    }

    const getReadmeFail = () => {
        console.log("Getting readme failed")
    }

    const getReadmeSucess = (res : AxiosResponse) => {
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(new Blob([res.data], { type: 'text/markdown' }));
        fetch(link.href).then((res) => res.text()).then((res) => setPost(res));
    }

    useEffect(() => {
        getChallengesInContest( axiosIns, contestId!, handleRecievedChallengeArray, (err: any) => console.log(err))
        getContest(axiosIns, contestId!,(res: any) => {setcontest(res.data)}, () => console.log("ËRROR OCCURRED"));
        getSharedChallengeIds(axiosIns, userID!,(res: any) => {setsharedchallengeids(res.data)}, () => console.log("ËRROR OCCURRED"));
        getOwnedChallengeIds(axiosIns, userID!,(res: any) => {setownedchallengeids(res.data)}, () => console.log("ËRROR OCCURRED")); 
        getReadmeContest(axiosPrivate, contestId!, getReadmeSucess, getReadmeFail);
    },[]);
    
    return ( 
        <Layout>
            <Typography variant="h4" textAlign="center" fontWeight={"bold"} gutterBottom>
                {contest ? contest.title : "Loading..."}
            </Typography>

            {contest && contest.moderator === userID ?
                <Button variant="outlined" sx={{alignItems: "center", color: "darkred" }} onClick={deleteClick}>Delete Contest</Button>: null
            }

            <Tabs value={selectedTab} onChange={handleChangeTab} centered>
                <Tab label="ABOUT" />
                <Tab label="CHALLENGES" />
                <Tab label="LEADERBOARD" />
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

                                {(!ownedchallengeIds.includes(challenge.challengeId) && !sharedchallengeIds.includes(challenge.challengeId)) && <Typography variant="body2" color="darkorange" sx={{marginX: 2}}>You Don't Have Access</Typography>}
                            </CardActions>
    
                        </Card>
            ))}

            {selectedTab === 2 && <LeaderboardTable contestId={contestId!}/>}

            {selectedTab === 3 &&
            <>
                <ShareContest ownerID ={contest!.moderator} giveAccessToContest={giveAccessToThisContest}/>
            
                <Snackbar  open={showNotification} autoHideDuration={2000} onClose={() => setshowNotification(false)} message="Added Admin!" action={ <IconButton size="small" aria-label="close" color="inherit" onClick={() => setshowNotification(false)}> <CloseIcon fontSize="small" /> </IconButton>} />
    
                <Snackbar  open={showFailNotification} autoHideDuration={2000} onClose={() => setshowFailNotification(false)} message="Already added Admin!" action={ <IconButton size="small" aria-label="close" color="inherit" onClick={() => setshowFailNotification(false)}> <CloseIcon fontSize="small" /> </IconButton>} />
            </>
            }

        </Layout>
    );
}
 
export default PastContestControls;