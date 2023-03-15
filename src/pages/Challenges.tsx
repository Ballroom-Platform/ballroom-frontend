import { useHistory, useLocation, useParams } from "react-router"
import { ChallengeCard } from "../components/molecules"
import { Layout } from "../components/templates"
import { useApp } from "../hooks/useApp";

interface IProps {

}

export const Challenges : React.FC<IProps> = () => {
    const history = useHistory();
    const {appState} = useApp();
    const location = useLocation();
    const params = useParams<{contestId:string}>();
    const contestId = params["contestId"];
    const clickHandler = () => {
        history.push(location.pathname + "/001");
    }
    return (
        <Layout>
            {appState.contests[contestId].challenges.map(id => <ChallengeCard
            challengeId={id} 
            title={appState.challenges[id].title} 
            status={appState.challenges[id].status} 
            difficulty={appState.challenges[id].difficulty}
            tags={appState.challenges[id].tags}
            clickHandler={clickHandler}
            />)}
        </Layout>
    )
}