import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Paper from "@mui/material/Paper";
import { useLocation, useParams } from "react-router"
import { Key, useEffect, useState } from "react";
import { getChallenge, getContest, getOwnedChallenges, getSharedChallenges } from "../api/admin";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Layout } from "../components/templates";
import { Link } from "react-router-dom";
import { getChallengesInContest } from "../api/common";
import { IMinimalContest, regitrants } from "../helpers/interfaces";
import { Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs } from "@mui/material";
import { useApp } from "../hooks/useApp";
import MarkdownRenderer from "../helpers/MarkdownRenderer";
import { getContestantRegistrants, getReadmeContest } from "../api/contestant";
import { axiosPrivate } from "../api/axios";
import { AxiosResponse } from "axios";
import { formatUTCDate, getDateString } from "../helpers/dateConverter";

type ContestId = {
    contestId: string;
};

type Challenge = {
    challengeId: string;
    title: string;
    difficulty: string;
};

const ContestControlView: React.FC = () => {

    const { contestId } = useParams<ContestId>();
    const location = useLocation();
    const [contest, setcontest] = useState<IMinimalContest>();
    const [challenges, setchallenges] = useState<Challenge[]>([]);
    const axiosIns = useAxiosPrivate();
    const [selectedTab, setselectedTab] = useState(0);
    const { appState } = useApp();
    const userId = appState.auth.userID;
    const [ownedchallengeIds, setownedchallengeids] = useState<string[]>([]);
    const [sharedchallengeIds, setsharedchallengeids] = useState<string[]>([]);
    const [post, setPost] = useState('');
    const [registrants, setregistrants] = useState<regitrants[]>([]);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setselectedTab(newValue);
    };

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
            <Typography variant="h4" textAlign="center" fontWeight={"bold"} gutterBottom>
                {contest ? contest.title : "Loading..."}
            </Typography>

            <Tabs value={selectedTab} onChange={handleChangeTab} variant="scrollable"
                textColor="secondary"
                indicatorColor="secondary"
                scrollButtons={false}

                sx={{
                    height: '3rem',
                    alignItems: 'center',
                    borderColor: 'divider'
                }}
            >
                <Tab label="ABOUT" />
                <Tab label="CHALLENGES" />
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
                                    {(!ownedchallengeIds.includes(challenge.challengeId) && !sharedchallengeIds.includes(challenge.challengeId)) && <Typography variant="body2" color="darkorange" sx={{ marginX: 2 }}>You Don't Have Access</Typography>}
                                </CardActions>

                            </Card>
                        ))
                    }
                </>
            }

            {selectedTab === 2 &&
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

export default ContestControlView;