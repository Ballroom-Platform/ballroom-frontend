import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router"
import { getChallengesInContest, getUpcomingContests } from "../api/common";
import { ChallengeCard } from "../components/molecules"
import { Layout } from "../components/templates"
import { IChallenge, IContest } from "../helpers/interfaces";
import { useApp } from "../hooks/useApp";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

interface IProps {

}

export const Challenges : React.FC<IProps> = () => {
    const history = useHistory();
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    const params = useParams<{contestId:string}>();
    const [loading, setLoading] = useState<boolean>(true);
    const contestId = params["contestId"];
    const clickHandler = () => {
        history.push(location.pathname + "/001");
    }

    const [challenges, setChallenges] = useState<Array<IChallenge>>([] as Array<IChallenge>);

    const getChallengesSuccess = (res : AxiosResponse) => {
        setChallenges(res.data);
    }

    const getChallengesFail = () => {
        console.log("Getting contests failed");
    }

    useEffect(() => {
        getChallengesInContest(axiosPrivate, contestId, getChallengesSuccess, getChallengesFail);
        setLoading(false);
    }, [])
    

    return (
        <Layout>
            {!loading &&  challenges.map(item => <ChallengeCard
            challengeId={item.challengeId} 
            title={item.title} 
            status={item.status} 
            difficulty={item.difficulty}
            tags={item.tags}
            clickHandler={clickHandler}
            />)}
        </Layout>
    )
}