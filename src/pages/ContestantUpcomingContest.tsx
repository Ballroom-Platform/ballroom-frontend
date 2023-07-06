import {
    CircularProgress,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {
    JSXElementConstructor,
    Key,
    ReactElement,
    ReactFragment,
    ReactPortal,
    useEffect,
    useState,
} from "react";
import { useParams } from "react-router";
import { getContest } from "../api/admin";
import {
    registerContestants,
    getContestantRegistrants,
    getReadmeContest,
} from "../api/contestant";
import { Layout } from "../components/templates";
import { IMinimalContest, User, regitrants } from "../helpers/interfaces";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useApp } from "../hooks/useApp";
import CloseIcon from "@mui/icons-material/Close";
import { formatUTCDate, getDateString } from "../helpers/dateConverter";
import { getUser } from "../api/common";
import { Box, Button, IconButton, Typography } from "@mui/material"
import { blue, brown } from "@mui/material/colors";
import Timer from "../components/timer";
import { AxiosResponse } from "axios";
import MarkdownRenderer from "../helpers/MarkdownRenderer";
import { Margin } from "@mui/icons-material";

type ContestId = {
    contestId: string;
};

const ContestantUpcomingContest = () => {
    const [contest, setcontest] = useState<IMinimalContest>();
    const [user, setuser] = useState<User>();
    const [registrants, setregistrants] = useState<regitrants[]>([]);
    const axiosIns = useAxiosPrivate();
    const { appState } = useApp();
    const userId = appState.auth.userID;
    const [showNotification, setshowNotification] = useState(false);
    const [failNotification, setfailNotification] = useState(false);
    const [alreadyNotification, setalreadyNotification] = useState(false);
    const [registrantIds] = useState<string[]>([]);
    const { contestId } = useParams<ContestId>();
    const [loading, setLoading] = useState<boolean>(true);
    const [post, setPost] = useState('');

    const handler = () => {
        registerContestants(
            axiosIns,
            contestId!,
            userId!,
            (res: any) => setshowNotification(true),
            (err: any) => {
                setalreadyNotification(true);
            }
        );
        window.location.reload();
    };

    const getReadmeFail = () => {
        console.log("Getting readme failed")
    }

    const getReadmeSucess = (res: AxiosResponse) => {
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(new Blob([res.data], { type: 'text/markdown' }));
        fetch(link.href).then((res) => res.text()).then((res) => setPost(res));
    }

    useEffect(() => {
        if (loading) {

            setregistrants([]);

            getContest(
                axiosIns,
                contestId!,
                (res: any) => {
                    setcontest(res.data); setLoading(false);
                },
                () => console.log("ËRROR OCCURRED")
            );

            getUser(
                axiosIns,
                userId!,
                (res: any) => {
                    setuser(res.data);
                },
                () => console.log("ERROR OCCURRED..")
            );

            getContestantRegistrants(
                axiosIns,
                contestId!,
                (res: any) => {
                    setregistrants((prevstate: any) =>
                        prevstate ? [...prevstate, ...res.data] : [{}]
                    );
                    res.data.forEach((element: any) => {
                        registrantIds.push(element.userId);
                    }
                    );
                },
                () => console.log("ERROR OCCURRED.")
            );
            getReadmeContest(axiosIns, contestId!, getReadmeSucess, getReadmeFail);
        }
    }, []);

    return (
        <>
            {
                loading && <Box width="100%" textAlign="center" padding="40px"><CircularProgress /></Box>
            }
            {
                !loading && (
                    <Layout>
                        <Typography align="center" variant="h3" sx={{ fontWeight: "bold" }} gutterBottom>
                            {contest?.title}
                        </Typography>

                        <div>
                            <Timer startTime={contest!.startTime} />
                        </div>

                        {registrantIds.includes(userId!) ? 
                        <Typography align="center" variant="h5" sx={{ color: "darkred", marginTop: 5, marginBottom: 5 }} gutterBottom>
                                You Already Registered ! Wait for the contest to start ...
                        </Typography> 
                        : (
                            <div style={{ textAlign: "center" }}>
                                <Button variant="contained" sx={{ marginY: "1rem", backgroundColor: "darkgreen" }} onClick={handler}>
                                    Register Now!
                                </Button>
                            </div>
                        )}

                        <div style={{ marginTop: 20, marginBottom: 20 }}>
                            <Typography
                                variant="h5"
                                gutterBottom
                                color="darkred"
                            >
                                Registered count : {registrants.length}
                            </Typography>
                        </div>

                        <div>
                            <MarkdownRenderer source={post} />
                        </div>

                        <Snackbar
                            open={showNotification}
                            autoHideDuration={3000}
                            onClose={() => setshowNotification(false)}
                            message="Registration is Successful!"
                            action={<IconButton
                                size="small"
                                aria-label="close"
                                color="inherit"
                                onClick={() => setshowNotification(false)}
                            >
                                <CloseIcon fontSize="small" />{" "}
                            </IconButton>} /><Snackbar
                            open={alreadyNotification}
                            autoHideDuration={3000}
                            onClose={() => setalreadyNotification(false)}
                            message="Already registered"
                            action={<IconButton
                                size="small"
                                aria-label="close"
                                color="inherit"
                                onClick={() => setalreadyNotification(false)}
                            >
                                <CloseIcon fontSize="small" />{" "}
                            </IconButton>} /><Snackbar
                            open={failNotification}
                            autoHideDuration={3000}
                            onClose={() => setfailNotification(false)}
                            message="Registration is Unsuccessful!"
                            action={<IconButton
                                size="small"
                                aria-label="close"
                                color="inherit"
                                onClick={() => setfailNotification(false)}
                            >
                                <CloseIcon fontSize="small" />{" "}
                            </IconButton>} />

                    </Layout >
                )
            }
        </>
    );
};


export default ContestantUpcomingContest;


