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
import { Layout } from "../components/templates";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useApp } from "../hooks/useApp";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { IMinimalContest, User, regitrants } from "../helpers/interfaces";
import { getContest } from "../api/admin";
import { getUser } from "../api/common";
import { useLocation, useNavigate } from "react-router";
import { getContestantRegistrants, getReadmeContest, registerContestants } from "../api/contestant";
import { AxiosResponse } from "axios";
import { Timer } from "@mui/icons-material";
import MarkdownRenderer from "../helpers/MarkdownRenderer";
import { formatUTCDate, getDateString } from "../helpers/dateConverter";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

type ContestId = {
    contestId: string;
};

const ContestantOngoingContest = () => {
    const axiosIns = useAxiosPrivate();
    const { appState } = useApp();
    const [showNotification, setshowNotification] = useState(false);
    const [failNotification, setfailNotification] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const { contestId } = useParams<ContestId>();
    const userId = appState.auth.userID;
    const [contest, setcontest] = useState<IMinimalContest>();
    const [user, setuser] = useState<User>();
    const [registrants, setregistrants] = useState<regitrants[]>([]);
    const [registrantIds] = useState<string[]>([]);
    const [post, setPost] = useState('');
    const [alreadyNotification, setalreadyNotification] = useState(false);
    const navigate = useNavigate();

    const getReadmeFail = () => {
        console.log("Getting readme failed")
    }

    const getReadmeSucess = (res: AxiosResponse) => {
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(new Blob([res.data], { type: 'text/markdown' }));
        fetch(link.href).then((res) => res.text()).then((res) => setPost(res));
    }

    const handler = () => {
        registerContestants(
            axiosIns,
            contestId!,
            userId!,
            (res: any) => { setshowNotification(true); window.location.reload(); },
            (err: any) => {
                setalreadyNotification(true);
            }
        );
    };

    const handlerPlay = () => {
        navigate("/contests" + `/${contestId}`);
    };

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
                        prevstate ? [...res.data] : [{}]
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
    }, [contestId]);

    return (
        <>
            {
                loading && <Box width="100%" textAlign="center" padding="40px"><CircularProgress /></Box>
            }
            {
                !loading && (
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
                            <Grid
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Typography variant="h4" gutterBottom>
                                    {contest?.title}
                                </Typography>
                                <Typography sx={{ marginTop: 1, marginBottom: 2, color: "yellow" }} variant="h6" textAlign="left" color="red" gutterBottom>
                                    {contest ? "STARTED" : "Loading..."}
                                </Typography>
                            </Grid>

                            <Grid>
                                {registrantIds.includes(userId!) ?
                                    (

                                        <Button variant="contained" sx={{ marginY: "1rem", backgroundColor: "darkgreen" }} onClick={handlerPlay}>
                                            Play
                                        </Button>


                                    )
                                    :
                                    (
                                        <Button variant="contained" sx={{ marginY: "1rem", backgroundColor: "darkgreen" }} onClick={handler}>
                                            Register and Play
                                        </Button>
                                    )}
                            </Grid>
                        </Container>

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

export default ContestantOngoingContest;