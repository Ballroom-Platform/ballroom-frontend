import { Button, IconButton, Snackbar, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { addChallenge, changeContestTime, getChallenge, getContest, removeChallengeFromContest, giveAccessToContest, deleteContest, getOwnedChallangesByDifficulty, getSharedChallangesByDifficulty, getSharedChallengeIds, getOwnedChallengeIds } from "../api/admin";
import { getChallengesInContest } from "../api/common";
import { Layout } from "../components/templates";
import { BalDateTime, IMinimalContest } from "../helpers/interfaces";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Link } from "react-router-dom";
import LeaderboardTable from "../components/LeaderboardTable";
import ChallengesByDifficulty from "./ChallengesByDifficulty";
import ShareContest from "./ShareContest";
import CloseIcon from '@mui/icons-material/Close';
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useApp } from "../hooks/useApp";
import MarkdownRenderer from "../helpers/MarkdownRenderer";
import { getReadmeContest } from "../api/contestant";
import { axiosPrivate } from "../api/axios";
import { AxiosResponse } from "axios";

type ContestId = {
    contestId: string;
};

type Challenge = {
    challengeId: string;
    title: string;
    difficulty: string;
};

const OngoingContestControls = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {contestId} = useParams<ContestId>();
    const [contest, setcontest] = useState<IMinimalContest>();
    const [challenges, setchallenges] = useState<Challenge[]>([]);
    const [selectedTab, setselectedTab] = useState(0);
    const axiosIns = useAxiosPrivate();
    const [showNotification, setshowNotification] = useState(false);
    const [showFailNotification, setshowFailNotification] = useState(false);
    const [showInvalidTimeNotification, setshowInvalidTimeNotification] = useState(false);
    const [changedEndTimeSuccessNotification, setchangedEndTimeSuccessNotification] = useState(false);
    const [changedEndTimeFailNotification, setchangedEndTimeFailNotification] = useState(false);
    const [endTime, setendTime] = useState<BalDateTime>();
    const [endTimeIsValid, setendTimeIsValid] = useState(false);
    const {appState} = useApp();
    const userId = appState.auth.userID;
    const [ownedchallengeIds, setownedchallengeids] = useState<string[]>([]);
    const [sharedchallengeIds, setsharedchallengeids] = useState<string[]>([]);
    const [post, setPost] = useState('');	

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

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setselectedTab(newValue);
    };

    const onForceStopClick = () => {
        const date = new Date();
        const newEndTime = {second: date.getSeconds(), minute: date.getMinutes(), hour: date.getHours(), day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear()}
        if(contest) {
            changeContestTime(axiosIns, contestId!, {title: contest.title, startTime: contest.startTime, endTime: newEndTime, moderator: contest.moderator}, (res: any) => console.log(res.data), (err: any) => console.log(err));
        }
        navigate("/pastContests");
        window.location.reload();
    }

    const addChallengeToThisContest = (thisChallengeId: string) => {
        addChallenge(axiosIns, contestId!, thisChallengeId, 
            (res: any) => {
                console.log(res); 
                setshowNotification(true);},
            (err: any) => {
                console.log("ERROR...");
                if(err.response.data === "Challenge already added to contest"){
                    setshowFailNotification(true);
                }
        });

    }

    const giveAccessToThisContest = (thisUserId: string, accessType: string) => {
        giveAccessToContest(axiosIns, contestId!, thisUserId, accessType,(res: any) => {console.log(res); setshowNotification(true);},
         (err: any) => {
            console.log("ERROR...");
            if(err.response.data === "Already added to admin"){
                setshowFailNotification(true);
            }
        });

    }

    const handleRemoval = (challengeId: string) => {
        setchallenges((prevstate) => prevstate ? prevstate.filter((challenge) => challenge.challengeId !== challengeId) : []);
    }

    const handleChangeEndTime = (value: any) => {
        const date = new Date();
        if(value < date){
            setendTimeIsValid(false)
            setshowInvalidTimeNotification(true);
            return;
            
        }
        setendTime({
            year: value.$y,
            month: value.$M + 1,
            day: value.$D,
            hour: value.$H,
            minute: value.$m,
            second: value.$s
        })
        setendTimeIsValid(true)
    }

    const confirmChangeEndTime = () => {
        if(endTimeIsValid && endTime && contest){
            changeContestTime(axiosIns, contestId!, {title: contest.title, startTime: contest.startTime, endTime: endTime, moderator: contest.moderator}, (res: any) => {setchangedEndTimeSuccessNotification(true); console.log(res.data);}, (err: any) => {setchangedEndTimeFailNotification(true); console.log(err);});
        }
    }

    const deleteClick = () => {
        if(contest) {
            deleteContest(axiosIns, contestId!, (res: any) => console.log(res.data), (err: any) => console.log(err));
        }
        navigate("/ongoingContests");
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
            getChallengesInContest( axiosIns, contestId!, handleRecievedChallengeArray, (err: any) => console.log(err));         
            getContest(axiosIns, contestId!,(res: any) => {setcontest(res.data)}, () => console.log("ËRROR OCCURRED"));
            getSharedChallengeIds(axiosIns, userId!,(res: any) => {setsharedchallengeids(res.data)}, () => console.log("ËRROR OCCURRED"));
            getOwnedChallengeIds(axiosIns, userId!,(res: any) => {setownedchallengeids(res.data)}, () => console.log("ËRROR OCCURRED"));
            getReadmeContest(axiosPrivate, contestId!, getReadmeSucess, getReadmeFail);        
    },[selectedTab]);

    return ( 
        <Layout>
            <Typography variant="h4" textAlign="center" fontWeight={"bold"} gutterBottom>
                {contest ? contest.title : "Loading..."}
            </Typography>

            <div style={{display:"flex" ,width:"100%",justifyContent:"space-between"}}>
                {contest && <Button variant="outlined" sx={{ color: "darkblue"}}onClick={onForceStopClick}>Force Stop</Button>}
                {contest && contest.moderator === userId ?
                    <Button variant="outlined" sx={{marginX: "2rem", color: "darkred"}}onClick={deleteClick}>Delete Contest</Button>: null
                }
            </div>

            <Tabs value={selectedTab} onChange={handleChangeTab} centered>
                <Tab label="ABOUT" />
                <Tab label="CHALLENGES" />
                <Tab label="LEADERBOARD" />
                <Tab label="ADD CHALLENGE" />
                <Tab label="CHANGE END TIME" />
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
                                {(sharedchallengeIds.includes(challenge.challengeId) || ownedchallengeIds.includes(challenge.challengeId) )&&  <Button sx={{color: 'red'}} size="small" onClick={() => removeChallengeFromContest(axiosIns, contestId!, challenge.challengeId!, (res: any)=> {console.log(res.data); handleRemoval(challenge.challengeId)}, () => console.log("ERROR!"))}>Remove</Button>}

                                {(!ownedchallengeIds.includes(challenge.challengeId) && !sharedchallengeIds.includes(challenge.challengeId)) && <Typography variant="body2" color="darkorange" sx={{marginX: 2}}>You Don't Have Access</Typography>}
                                
                            </CardActions>
    
                        </Card>
            ))}

            {selectedTab === 2 && <LeaderboardTable contestId={contestId!}/>}

            {selectedTab === 3 && 
            <>
                <ChallengesByDifficulty addChallengeToContest={addChallengeToThisContest}/>
            
                <Snackbar  open={showNotification} autoHideDuration={2000} onClose={() => setshowNotification(false)} message="Added Challenge!" action={ <IconButton size="small" aria-label="close" color="inherit" onClick={() => setshowNotification(false)}> <CloseIcon fontSize="small" /> </IconButton>} />
    
                <Snackbar  open={showFailNotification} autoHideDuration={2000} onClose={() => setshowFailNotification(false)} message="Challenge is already added!" action={ <IconButton size="small" aria-label="close" color="inherit" onClick={() => setshowFailNotification(false)}> <CloseIcon fontSize="small" /> </IconButton>} />
            </>
            }

            {selectedTab === 4 &&
            <>
                <LocalizationProvider sx={{border: '1px solid red'}} dateAdapter={AdapterDayjs}>
                    <DemoContainer sx={{marginY: '1rem', width: '30%'}} components={['DateTimePicker']}>

                        <DateTimePicker label="End Time" onChange={(value: any, context) => handleChangeEndTime(value)}/>

                    </DemoContainer>
                </LocalizationProvider>
                
                <Button disabled={!endTimeIsValid} variant="outlined" onClick={() => confirmChangeEndTime()}>Change Time</Button>

                <Snackbar  open={showInvalidTimeNotification} autoHideDuration={6000} onClose={() => setshowInvalidTimeNotification(false)} message="The Time you entered is invalid!" action={ <IconButton size="small" aria-label="close" color="inherit" onClick={() => setshowInvalidTimeNotification(false)}> <CloseIcon fontSize="small" /> </IconButton>} />

                <Snackbar  open={changedEndTimeSuccessNotification} autoHideDuration={6000} onClose={() => setchangedEndTimeSuccessNotification(false)} message="End time successfully changed!" action={ <IconButton size="small" aria-label="close" color="inherit" onClick={() => setchangedEndTimeSuccessNotification(false)}> <CloseIcon fontSize="small" /> </IconButton>} />

                <Snackbar  open={changedEndTimeFailNotification} autoHideDuration={6000} onClose={() => setchangedEndTimeFailNotification(false)} message="End time change fail!" action={ <IconButton size="small" aria-label="close" color="inherit" onClick={() => setchangedEndTimeFailNotification(false)}> <CloseIcon fontSize="small" /> </IconButton>} />
                
            </>
            }

            {selectedTab === 5 &&
            <>
                <ShareContest ownerID ={contest!.moderator} giveAccessToContest={giveAccessToThisContest}/>
            
                <Snackbar  open={showNotification} autoHideDuration={2000} onClose={() => setshowNotification(false)} message="Added Admin!" action={ <IconButton size="small" aria-label="close" color="inherit" onClick={() => setshowNotification(false)}> <CloseIcon fontSize="small" /> </IconButton>} />
    
                <Snackbar  open={showFailNotification} autoHideDuration={2000} onClose={() => setshowFailNotification(false)} message="Already added Admin!" action={ <IconButton size="small" aria-label="close" color="inherit" onClick={() => setshowFailNotification(false)}> <CloseIcon fontSize="small" /> </IconButton>} />
            </>
            }
        </Layout>
    );
}
 
export default OngoingContestControls;