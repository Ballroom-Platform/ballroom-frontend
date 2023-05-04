import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { getOngoingContests, getPastContests } from "../api/admin";
import { ContestCard } from "../components/molecules";
import { Layout } from "../components/templates";
import { IMinimalContest } from "../helpers/interfaces";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { getDateString } from "../helpers/dateConverter";

const OngoingContestsAdmin = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const clickHandler = (key: string) => {
        navigate(location.pathname + `/${key}`);
    }

    const [contests, setcontests] = useState<IMinimalContest[]>([]);
    const axiosIns = useAxiosPrivate();

    useEffect(() => {
        getOngoingContests(axiosIns, (res: any) => setcontests((prevstate) => prevstate ? [...prevstate, ...res.data] : [{}]),(err: any) => console.log(err))

    }, []);
    
    return ( 
        <Layout>
            <Typography variant="h3" gutterBottom>
                    Ongoing Contests
            </Typography>

            <Grid container sx={{marginY: '2rem'}}>

            {contests.map((contest) => <Link to={`/ongoingContests/${contest.contestId}`}><ContestCard contestImageURL={null} key={contest.contestId} contestId={contest.contestId} contestName={contest.title} startTime={getDateString(contest.startTime)} endTime={getDateString(contest.endTime)} forcedState="active" owner="" clickHandler={clickHandler}/></Link>)}
                
            </Grid>
        </Layout>
     );
}
 
export default OngoingContestsAdmin;