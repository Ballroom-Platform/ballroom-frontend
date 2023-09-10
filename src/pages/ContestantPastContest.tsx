import { Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { getContest } from "../api/admin";
import { Layout } from "../components/templates";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useApp } from "../hooks/useApp";
import { Typography } from "@mui/material"
import { IMinimalContest } from "../helpers/interfaces";
import LeaderboardTable from "../components/LeaderboardTable";
import MarkdownRenderer from "../helpers/MarkdownRenderer";
import { getReadmeContest } from "../api/contestant";
import { AxiosResponse } from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";


type ContestId = {
    contestId: string;
};

interface IProps {
    contestImageURL: string | null;
}

const ContestantPastContest = () => {
    const axiosIns = useAxiosPrivate();
    const { contestId } = useParams<ContestId>();
    const { appState } = useApp();
    const [contest, setcontest] = useState<IMinimalContest>();
    const [post, setPost] = useState('');
    const [selectedTab, setselectedTab] = useState(0);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setselectedTab(newValue);
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
        getContest(axiosIns, contestId!, (res: any) => { setcontest(res.data) }, () => console.log("ËRROR OCCURRED"));
        getReadmeContest(axiosIns, contestId!, getReadmeSucess, getReadmeFail);
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
                <Grid
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                <Typography variant="h4" textAlign="left" gutterBottom>
                    {contest ? contest.title : "Loading..."}
                </Typography>
                <Typography sx={{ marginTop: 1, marginBottom: 2, color: "red" }} variant="h6" textAlign="left" color="red" gutterBottom>
                    {contest ? "ENDED" : "Loading..."}
                </Typography>
                </Grid>
                </Container>

                <Tabs value={selectedTab} onChange={handleChangeTab} variant="scrollable"
                    textColor="secondary"
                    indicatorColor="secondary"
                    scrollButtons={false}

                    sx={{
                        height: '3rem',
                        alignItems: 'center',
                        borderColor: 'divider',
                        marginBottom: '2rem'
                    }}
                >
                    <Tab label="ABOUT" />
                    <Tab label="LEADERBOARD" />
                </Tabs>

                {selectedTab === 0 &&
                    <>
                        <div>
                            <MarkdownRenderer source={post} />
                        </div>
                    </>
                }

                {selectedTab === 1 && <LeaderboardTable contestId={contestId!} />}

        </Layout>
    )
}

export default ContestantPastContest;


