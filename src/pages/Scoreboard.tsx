import { useParams } from "react-router";
import { Layout } from "../components/templates";
import ScoreBoardTable from "../components/ScoreboardTable";

type IParams = {
    contestId : string
};

export const Scoreboard : React.FC = () => {
    const {contestId} = useParams<IParams>();

    return ( 
        <Layout>
            <ScoreBoardTable contestId={contestId!}/>
      </Layout>
    );
}
