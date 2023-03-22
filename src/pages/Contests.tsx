import { useAuthContext } from "@asgardeo/auth-react"
import { Grid } from "@mui/material"
import { useHistory, useLocation } from "react-router"
import { ContestCard } from "../components/molecules"
import { Layout } from "../components/templates"
import { useApp } from "../hooks/useApp"


export const Contests : React.FC = () => {
    const {appState, setAppState} = useApp();
    const history = useHistory();
    const location = useLocation()
    const clickHandler = (key: string) => {
        history.push(location.pathname + `/${key}`);
    }


    return(
        <Layout>
            <Grid>
                {Object.keys(appState.contests).map((key) => <ContestCard contestImageURL={appState.contests[key].contestImageURL} key={key} contestId={appState.contests[key].contestId} contestName={appState.contests[key].title} startTime="" endTime="" forcedState="active" owner="" clickHandler={clickHandler}/>)}
            </Grid>
        </Layout>
    )
}