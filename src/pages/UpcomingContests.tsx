import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ContestCard } from "../components/molecules";
import { useApp } from "../hooks/useApp";
import { useHistory, useLocation } from "react-router"
import { Layout } from "../components/templates";
import { IMinimalContest } from "../helpers/interfaces";
import { useEffect, useState } from "react";
import { getUpcomingContests } from "../api/admin";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";

const UpcomingContests = () => {

    const {appState, setAppState} = useApp();
    const history = useHistory();
    const location = useLocation()
    const clickHandler = (key: string) => {
        history.push(location.pathname + `/${key}`);
    }

    const [contests, setcontests] = useState<IMinimalContest[]>([]);
    const axiosIns = useAxiosPrivate();

    useEffect(() => {
        getUpcomingContests(axiosIns, (res: any) => setcontests((prevstate) => prevstate ? [...prevstate, ...res.data] : [{}]),(err: any) => console.log(err))
    }, []);

    return ( 
        
        <Layout>
            <Typography variant="h3" gutterBottom>
                    Upcoming Contests
            </Typography>

            <Grid container sx={{marginY: '2rem'}}>
            {/* {Object.keys(appState.contests).map((key) => <ContestCard contestImageURL={null} key={key} contestId={appState.contests[key].contestId} contestName={appState.contests[key].title} startTime="" endTime="" forcedState="active" owner="" clickHandler={clickHandler}/>)} */}

            {contests.map((contest) => <Link to={`../contestControls/${contest.contestId}`}><ContestCard contestImageURL={null} key={contest.contestId} contestId={contest.contestId} contestName={contest.name} startTime="" endTime="" forcedState="active" owner="" clickHandler={clickHandler}/></Link>)}
                
            </Grid>
        </Layout>
     );
}
 
export default UpcomingContests;