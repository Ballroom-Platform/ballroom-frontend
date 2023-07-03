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
            <Typography variant="h4" textAlign="center" fontWeight={"bold"} gutterBottom>
                {contest ? contest.title + " has ended." : "Loading..."}
            </Typography>

            <Tabs value={selectedTab} onChange={handleChangeTab} centered>
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


