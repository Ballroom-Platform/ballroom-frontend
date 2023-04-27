import { useParams } from "react-router";
import LeaderboardTable from "../components/LeaderboardTable";
import { Layout } from "../components/templates";

type IParams = {
    contestId : string
};

export const Leaderboard : React.FC = () => {
    const {contestId} = useParams<IParams>();

    return ( 
        <Layout>
            <LeaderboardTable contestId={contestId!}/>
      </Layout>
    );
}