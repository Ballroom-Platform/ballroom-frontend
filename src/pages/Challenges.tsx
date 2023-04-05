import { Box, Button } from "@mui/material";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router"
import { getChallenge } from "../api/admin";
import { getChallengesInContest } from "../api/common";
import { ChallengeCard } from "../components/molecules";
import { Layout } from "../components/templates"
import { IChallenge } from "../helpers/interfaces";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const Challenges : React.FC = () => {
    const history = useHistory();
    const location = useLocation()
    const {contestId} = useParams<{contestId : string}>();
    const [loadingIds, setLoadingIds] = useState<boolean>(true)
    const [loadingDetails, setLoadingDetails] = useState<boolean>(false);
    const axiosPrivate = useAxiosPrivate();
    const [challengeIds, setChallengeIds] = useState<Array<string>>([]);
    const [challengeDetails, setChallengeDetails] = useState<Array<IChallenge>>([] as Array<IChallenge>);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if(loadingIds){
            getChallengesInContest(axiosPrivate, contestId, (res:AxiosResponse) => {
                setChallengeIds([...res.data]);
                setLoadingIds(false);
                setLoadingDetails(true);
            }, () => console.log("Failed fetching challenge IDs"));
        }

        if(loadingDetails){
            Promise.all(
                challengeIds.map((challengeId) => {
                return getChallenge(axiosPrivate, challengeId).then((res) => res.data);
                })
            ).then(
                (results) => {
                setChallengeDetails([...results] as Array<IChallenge>);
                setLoadingDetails(false);
                setLoading(false);
                },
                () => console.log("Failed to fetch challenge details")
            );
            
        }
    }, [loadingDetails, loadingIds, challengeIds, challengeDetails])

    const clickHandler = (challengeId : string) => {
        history.push(location.pathname + "/challenge/" + challengeId);
    }

    const leaderboardHandler = () => {
        history.push(location.pathname + "/leaderboard");
    }


    return (
        <Layout>
            {loading === false && (
                <>
                    <Box sx={{display: 'flex', justifyContent: "flex-end", marginBottom: '2rem'}}>
                        <Button variant="outlined" onClick={leaderboardHandler}>Leaderboard</Button>
                    </Box>
                {
                    challengeDetails.map(item => <ChallengeCard
                        challengeId={item.challengeId} 
                        title={item.title} 
                        status={"Incomplete"} 
                        difficulty={item.difficulty}
                        tags={["Ballerina"]}
                        clickHandler={clickHandler}
                        />)
                }
                </> 
            )}
        </Layout>
    )
}