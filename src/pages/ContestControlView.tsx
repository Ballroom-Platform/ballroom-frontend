import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Paper from "@mui/material/Paper";
import { useLocation, useParams } from "react-router"
import { useEffect, useState } from "react";
import { getChallenge, getContest, getOwnedChallangesIds, getSharedChallangesIds } from "../api/admin";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Layout } from "../components/templates";
import { Link } from "react-router-dom";
import { getChallengesInContest } from "../api/common";
import { IMinimalContest } from "../helpers/interfaces";
import { Tab, Tabs } from "@mui/material";
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

const ContestControlView: React.FC = () => {

    const {contestId} = useParams<ContestId>();
    const location = useLocation();
    const [contest, setcontest] = useState<IMinimalContest>();
    const [challenges, setchallenges] = useState<Challenge[]>([]);
    const axiosIns = useAxiosPrivate();
    const [selectedTab, setselectedTab] = useState(0);
    const {appState} = useApp();
    const userId = appState.auth.userID;
    const [ownedchallengeIds, setownedchallengeids] = useState<string[]>([]);
    const [sharedchallengeIds, setsharedchallengeids] = useState<string[]>([]);
    const [post, setPost] = useState('');

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setselectedTab(newValue);
    };

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

    useEffect(() => {
        if(selectedTab === 0){
            getChallengesInContest( axiosIns, contestId!, handleRecievedChallengeArray, (err: any) => console.log(err))
            getContest(axiosIns, contestId!,(res: any) => {setcontest(res.data)}, () => console.log("ËRROR OCCURRED"));
            getSharedChallangesIds(axiosIns, userId!,(res: any) => {setsharedchallengeids(res.data.map((challenge: any) => challenge.challengeId))},() => {});
            getOwnedChallangesIds(axiosIns, userId!,(res: any) => {setownedchallengeids(res.data.map((challenge: any) => challenge.challengeId))},() => {})
            getReadmeContest(axiosPrivate, contestId!, getReadmeSucess, getReadmeFail);     
        }
    },[selectedTab]);


    return ( 
        <Layout>
            <Typography variant="h4" textAlign="center" fontWeight={"bold"} gutterBottom>
                {contest ? contest.title : "Loading..."}
            </Typography>

            <Tabs value={selectedTab} onChange={handleChangeTab} centered>
                <Tab label="ABOUT" />
                <Tab label="CHALLENGES" />
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
                                {(sharedchallengeIds.includes(challenge.challengeId) || ownedchallengeIds.includes(challenge.challengeId) )&&<Link to={`${location.pathname}/${challenge.challengeId}`}><Button size="small">View</Button></Link>}
                                {(!ownedchallengeIds.includes(challenge.challengeId) && !sharedchallengeIds.includes(challenge.challengeId)) && <Typography variant="body2" color="darkorange" sx={{marginX: 2}}>You Don't Have Access</Typography>}
                            </CardActions>

                        </Card>
                    ))
                }
                </>
            }
            
            <Paper sx={{marginY: '2rem'}}>
 
            </Paper>
            
        </Layout>
    );
}
 
export default ContestControlView;