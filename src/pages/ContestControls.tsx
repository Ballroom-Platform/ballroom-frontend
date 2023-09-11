import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Paper from "@mui/material/Paper";
import { useLocation, useNavigate, useParams } from "react-router"
import { Key, useEffect, useState } from "react";
import { addChallenge, getChallenge, getContest, removeChallengeFromContest, giveAccessToContest, deleteContest, getSharedChallenges, getOwnedChallenges, editContest } from "../api/admin";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Layout } from "../components/templates";
import { Link } from "react-router-dom";
import CreateContest from "./CreateContest";
import { getChallengesInContest } from "../api/common";
import { AxiosInstance, AxiosResponse } from "axios";
import { IMinimalContest, regitrants } from "../helpers/interfaces";
import { Snackbar, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs } from "@mui/material";
import ChallengesByDifficulty from "./ChallengesByDifficulty";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ShareContest from "./ShareContest";
import { useApp } from "../hooks/useApp";
import { getContestantRegistrants, getReadmeContest } from "../api/contestant";
import { axiosPrivate } from "../api/axios";
import MarkdownRenderer from "../helpers/MarkdownRenderer";
import { formatUTCDate, getDateString, getUTCDateString } from "../helpers/dateConverter";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

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

function arrayToBlob(array: number[]): Blob {
    const uint8Array = new Uint8Array(array);
    return new Blob([uint8Array]);
}

function arrayToFile(array: number[], fileName: string): File {
    const blob = arrayToBlob(array);
    return new File([blob], fileName);
}

const ContestControls: React.FC = () => {

    const { contestId } = useParams<ContestId>();
    const location = useLocation();
    const [contest, setcontest] = useState<IMinimalContest>();
    const [challenges, setchallenges] = useState<Challenge[]>([]);
    const axiosIns = useAxiosPrivate();
    const navigate = useNavigate();
    const [selectedTab, setselectedTab] = useState(0);
    const [showNotification, setshowNotification] = useState(false);
    const [showFailNotification, setshowFailNotification] = useState(false);
    const { appState } = useApp();
    const userId = appState.auth.userID;
    const [ownedchallengeIds, setownedchallengeids] = useState<string[]>([]);
    const [sharedchallengeIds, setsharedchallengeids] = useState<string[]>([]);
    const [post, setPost] = useState('');
    const [registrants, setregistrants] = useState<regitrants[]>([]);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setselectedTab(newValue);
    };

    const addChallengeToThisContest = (thisChallengeId: string) => {
        addChallenge(axiosIns, contestId!, thisChallengeId, (res: any) => { console.log(res); setshowNotification(true); },
            (err: any) => {
                console.log("ERROR...");
                if (err.response.data === "Challenge already added to contest") {
                    setshowFailNotification(true);
                }
            });

    }

    const handleRecievedChallengeArray = (res: any) => {
        Promise.all(
            res.data.map((challengeId: string) => {
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

    const getReadmeSucess = (res: AxiosResponse) => {
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(new Blob([res.data], { type: 'text/markdown' }));
        fetch(link.href).then((res) => res.text()).then((res) => setPost(res));
    }


    const onForceStartClick = () => {
        const date = new Date();
        const newStartTime = { second: date.getSeconds(), minute: date.getMinutes(), hour: date.getHours(), day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() }
        if (contest) {
            const formData = new FormData();;
            formData.append('startTime', getUTCDateString(newStartTime));
            editContest(axiosIns, formData, contestId!, (res: any) => console.log(res.data), (err: any) => console.log(err));
        }
        navigate("/ongoingContests");
        window.location.reload();
    }

    const giveAccessToThisContest = (thisUserId: string, accessType: string) => {
        const accessDetails: AccessDetails = { userId: thisUserId, accessType: accessType };
        giveAccessToContest(axiosIns, contestId!, accessDetails, (res: any) => { console.log(res); setshowNotification(true); },
            (err: any) => {
                console.log("ERROR...");
            });

    }
    const deleteClick = () => {
        if (contest) {
            deleteContest(axiosIns, contestId!, (res: any) => console.log(res.data), (err: any) => console.log(err));
        }
        navigate("/upcomingContests");
        window.location.reload();
    }

    const onEditClick = () => {
        navigate(`/editContest/${contestId}`);
    }

    useEffect(() => {
        if (selectedTab === 0) {
            getChallengesInContest(axiosIns, contestId!, handleRecievedChallengeArray, (err: any) => console.log(err))
            getContest(axiosIns, contestId!, (res: any) => { setcontest(res.data) }, () => console.log("ËRROR OCCURRED"));
            getSharedChallenges(axiosIns, userId!, (res: any) => { setsharedchallengeids(res.data.map((challenge: any) => challenge.challengeId)) }, () => { });
            getOwnedChallenges(axiosIns, userId!, (res: any) => { setownedchallengeids(res.data.map((challenge: any) => challenge.challengeId)) }, () => { })
            getReadmeContest(axiosPrivate, contestId!, getReadmeSucess, getReadmeFail);
            getContestantRegistrants(axiosIns, contestId!, (res: any) => { setregistrants((prevstate: any) => prevstate ? [...res.data] : [{}]); }, () => console.log("ERROR OCCURRED."));
        }
    }, [selectedTab]);


    return (
        <Layout>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'left',
                    marginLeft: 0,
                    paddingLeft: 0,
                }}
            >
                <Typography variant="h4" textAlign="center" gutterBottom>
                    {contest ? contest.title : "Loading..."}
                </Typography>

                <Grid
                    item
                    lg={4}
                    sx={{
                        display: 'flex',
                        columnGap: '1.25rem',
                        alignItems: 'right',
                        justifyContent: 'flex-end',
                    }}
                >
                    {contest && <Button variant="outlined" sx={{ color: "darkblue" }} onClick={onForceStartClick}>Force Start</Button>}
                    {contest && <Button variant="outlined" sx={{ color: "darkgreen" }} onClick={onEditClick}>Edit Contest</Button>}
                    {contest && contest.moderator === userId ?
                        <Button variant="outlined" sx={{ marginX: "2rem", color: "darkred" }} onClick={deleteClick}>Delete Contest</Button> : null
                    }
                </Grid>
            </Container>

            <Tabs value={selectedTab} onChange={handleChangeTab}
                variant="scrollable"
                textColor="secondary"
                indicatorColor="secondary"
                scrollButtons={false}

                sx={{
                    height: '5rem',
                    alignItems: 'center',
                    borderColor: 'divider'
                }}
            >
                <Tab label="ABOUT" />
                <Tab label="CHALLENGES" />
                <Tab label="ADD CHALLENGE" />
                <Tab label="SHARE" />
                <Tab label="REGISTRANTS" />
            </Tabs>

            {selectedTab === 0 &&
                <>
                    <div>
                        {contest && <img src={URL.createObjectURL(arrayToFile(contest.imageUrl, "image.png"))} alt="Contest Image" style={{ width: "100%", height: "auto", marginTop: 2, marginBottom: 2 }} />}
                        <MarkdownRenderer source={post} />
                    </div>
                </>
            }

            {selectedTab === 1 &&
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

                            <Card key={challenge.challengeId} sx={{ marginY: '1rem', width: '100%' }} >

                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {challenge.title}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {challenge.difficulty}
                                    </Typography>
                                </CardContent>

                                <CardActions>
                                    {(sharedchallengeIds.includes(challenge.challengeId) || ownedchallengeIds.includes(challenge.challengeId)) && <Link to={`${location.pathname}/${challenge.challengeId}`}><Button size="small">View</Button></Link>}
                                    {(sharedchallengeIds.includes(challenge.challengeId) || ownedchallengeIds.includes(challenge.challengeId)) && <Button sx={{ color: 'red' }} size="small" onClick={() => removeChallengeFromContest(axiosIns, contestId!, challenge.challengeId!, (res: any) => { console.log(res.data); handleRemoval(challenge.challengeId) }, () => console.log("ERROR!"))}>Remove</Button>}

                                    {(!ownedchallengeIds.includes(challenge.challengeId) && !sharedchallengeIds.includes(challenge.challengeId)) && <Typography variant="body2" color="darkorange" sx={{ marginX: 2 }}>You Don't Have Access</Typography>}
                                </CardActions>

                            </Card>
                        ))
                    }
                </>
            }


            {selectedTab === 2 &&
                <>
                    <ChallengesByDifficulty addChallengeToContest={addChallengeToThisContest} />

                    <Snackbar open={showNotification} autoHideDuration={2000} onClose={() => setshowNotification(false)} message="Added Challenge!" action={<IconButton size="small" aria-label="close" color="inherit" onClick={() => setshowNotification(false)}> <CloseIcon fontSize="small" /> </IconButton>} />

                    <Snackbar open={showFailNotification} autoHideDuration={2000} onClose={() => setshowFailNotification(false)} message="Challenge is already added!" action={<IconButton size="small" aria-label="close" color="inherit" onClick={() => setshowFailNotification(false)}> <CloseIcon fontSize="small" /> </IconButton>} />
                </>
            }

            {selectedTab === 3 &&
                <>
                    <ShareContest ownerID={contest!.moderator} giveAccessToContest={giveAccessToThisContest} />

                    <Snackbar open={showNotification} autoHideDuration={2000} onClose={() => setshowNotification(false)} message="Added Admin!" action={<IconButton size="small" aria-label="close" color="inherit" onClick={() => setshowNotification(false)}> <CloseIcon fontSize="small" /> </IconButton>} />
                </>
            }

            {selectedTab === 4 &&
                <div style={{ marginTop: 5, marginBottom: 100 }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Registered time</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {registrants.map(
                                    (row: {
                                        id: Key;
                                        fullname: string;
                                        registeredTime: any;
                                    }) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.fullname}
                                            </TableCell>
                                            <TableCell align="center">
                                                {formatUTCDate(getDateString(row.registeredTime))}
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            }

        </Layout>
    );
}

export default ContestControls