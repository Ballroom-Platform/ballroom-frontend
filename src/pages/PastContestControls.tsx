import { Button, IconButton, Paper, Snackbar, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from "@mui/material";
import { Key, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { deleteContest, getChallenge, getContest, getOwnedChallenges, getReport, getSharedChallenges, giveAccessToContest } from "../api/admin";
import { getChallengesInContest } from "../api/common";
import { Layout } from "../components/templates";
import { IMinimalContest, regitrants } from "../helpers/interfaces";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Link } from "react-router-dom";
import LeaderboardTable from "../components/LeaderboardTable";
import ShareContest from "./ShareContest";
import CloseIcon from '@mui/icons-material/Close';
import { useApp } from "../hooks/useApp";
import { getContestantRegistrants, getReadmeContest } from "../api/contestant";
import { axiosPrivate } from "../api/axios";
import { AxiosResponse } from "axios";
import MarkdownRenderer from "../helpers/MarkdownRenderer";
import { formatUTCDate, getDateString } from "../helpers/dateConverter";
import Container from "@mui/material/Container";

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

const PastContestControls = () => {

    const { contestId } = useParams<ContestId>();
    const location = useLocation();
    const [contest, setcontest] = useState<IMinimalContest>();
    const [challenges, setchallenges] = useState<Challenge[]>([]);
    const [selectedTab, setselectedTab] = useState(0);
    const axiosIns = useAxiosPrivate();
    const [showNotification, setshowNotification] = useState(false);
    const [showFailNotification, setshowFailNotification] = useState(false);
    const { appState } = useApp();
    const userId = appState.auth.userID;
    const navigate = useNavigate();
    const [ownedchallengeIds, setownedchallengeids] = useState<string[]>([]);
    const [sharedchallengeIds, setsharedchallengeids] = useState<string[]>([]);
    const [post, setPost] = useState('');
    const [report, setReport] = useState<string[][]>([]);
    let csv = '';
    const [registrants, setregistrants] = useState<regitrants[]>([]);

    const handleRecievedChallengeArray = (res: any) => {
        console.log(res.data)
        res.data.forEach((challengeId: any) => {
            getChallenge(axiosIns, challengeId).then((res: any) => setchallenges((prevstate) => prevstate ? [...prevstate, { challengeId: res.data.challengeId, title: res.data.title, difficulty: res.data.difficulty }] : [{ challengeId: res.data.challengeId, title: res.data.title, difficulty: res.data.difficulty }])).
                catch((res: any) => console.log(res.data));

        });
    }

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setselectedTab(newValue);
    };

    const giveAccessToThisContest = (thisUserId: string, accessType: string) => {
        const accessDetails: AccessDetails = { userId: thisUserId, accessType: accessType };
        giveAccessToContest(axiosIns, contestId!, accessDetails, (res: any) => { console.log(res); setshowNotification(true); },
            (err: any) => {
                console.log("ERROR...");
                if (err.response.data === "Already added to admin") {
                    setshowFailNotification(true);
                }
            });

    }

    const deleteClick = () => {
        if (contest) {
            deleteContest(axiosIns, contestId!, (res: any) => console.log(res.data), (err: any) => console.log(err));
        }
        navigate("/pastContests");
        window.location.reload();
    }

    const getReadmeFail = () => {
        console.log("Getting readme failed")
    }

    const getReadmeSucess = (res: AxiosResponse) => {
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(new Blob([res.data], { type: 'text/markdown' }));
        fetch(link.href).then((res) => res.text()).then((res) => setPost(res));
    }

    const convertToCSV = (report: string[][]) => {
        var csv = '';
        report.forEach((row) => {
            csv += row.join(',');
            csv += '\n';
        });
        return csv;
    }

    const download = (filename: any) => {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(convertToCSV(report)));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    useEffect(() => {
        getChallengesInContest(axiosIns, contestId!, handleRecievedChallengeArray, (err: any) => console.log(err))
        getContest(axiosIns, contestId!, (res: any) => { setcontest(res.data) }, () => console.log("ËRROR OCCURRED"));
        getSharedChallenges(axiosIns, userId!, (res: any) => { setsharedchallengeids(res.data.map((challenge: any) => challenge.challengeId)) }, () => { });
        getOwnedChallenges(axiosIns, userId!, (res: any) => { setownedchallengeids(res.data.map((challenge: any) => challenge.challengeId)) }, () => { });
        getReadmeContest(axiosPrivate, contestId!, getReadmeSucess, getReadmeFail);
        getReport(axiosPrivate, contestId!, (res: any) => setReport(res.data), () => console.log("Error occured"));
        csv = convertToCSV(report);
        getContestantRegistrants(axiosIns, contestId!, (res: any) => { setregistrants((prevstate: any) => prevstate ? [...res.data] : [{}]); }, () => console.log("ERROR OCCURRED."));
    }, []);

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

                {contest && contest.moderator === userId ?
                    <Button variant="outlined" sx={{ alignItems: "center", color: "darkred" }} onClick={deleteClick}>Delete Contest</Button> : null
                }
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
                <Tab label="LEADERBOARD" />
                <Tab label="SHARE" />
                <Tab label="REPORT" />
                <Tab label="REGISTRANTS" />
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

                            {(!ownedchallengeIds.includes(challenge.challengeId) && !sharedchallengeIds.includes(challenge.challengeId)) && <Typography variant="body2" color="darkorange" sx={{ marginX: 2 }}>You Don't Have Access</Typography>}
                        </CardActions>

                    </Card>
                ))}

            {selectedTab === 2 && <LeaderboardTable contestId={contestId!} />}

            {selectedTab === 3 &&
                <>
                    <ShareContest ownerID={contest!.moderator} giveAccessToContest={giveAccessToThisContest} />

                    <Snackbar open={showNotification} autoHideDuration={2000} onClose={() => setshowNotification(false)} message="Added Admin!" action={<IconButton size="small" aria-label="close" color="inherit" onClick={() => setshowNotification(false)}> <CloseIcon fontSize="small" /> </IconButton>} />

                    <Snackbar open={showFailNotification} autoHideDuration={2000} onClose={() => setshowFailNotification(false)} message="Already added Admin!" action={<IconButton size="small" aria-label="close" color="inherit" onClick={() => setshowFailNotification(false)}> <CloseIcon fontSize="small" /> </IconButton>} />
                </>
            }

            {selectedTab === 4 &&
                <>
                    <Typography sx={{ marginTop: 2, marginBottom: 2, color: "darkblue" }} fontSize={16} gutterBottom>
                        Download full report as CSV file
                    </Typography>

                    <Button variant="contained" color="primary" style={{ marginBottom: 6 }} onClick={() => download(csv)}>Download</Button>

                    <Typography variant="h5" fontWeight={"bold"} marginTop={6} marginBottom={3} gutterBottom>
                        COMPETITION FINAL REPORT
                    </Typography>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Submission Id</TableCell>
                                    <TableCell>Challenge Id</TableCell>
                                    <TableCell>Challenge Title</TableCell>
                                    <TableCell>User Id</TableCell>
                                    <TableCell>User Name</TableCell>
                                    <TableCell>Full Name</TableCell>
                                    <TableCell>Submitted Time (UTC)</TableCell>
                                    <TableCell>Score</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {report
                                    .filter((row) => row[0] !== "submissionId")
                                    .map((row) => (
                                        <TableRow
                                            key={row[0]}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row[0]}
                                            </TableCell>
                                            <TableCell>{row[1]}</TableCell>
                                            <TableCell>{row[2]}</TableCell>
                                            <TableCell>{row[3]}</TableCell>
                                            <TableCell>{row[4]}</TableCell>
                                            <TableCell>{row[5]}</TableCell>
                                            <TableCell>{row[6]}</TableCell>
                                            <TableCell>{row[7]}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            }
            {selectedTab === 5 &&
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

export default PastContestControls;