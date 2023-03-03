import { useAuthContext } from "@asgardeo/auth-react"
import { Grid } from "@mui/material"
import { ContestCard } from "../components/molecules"


export const Dashboard : React.FC = () => {
    return(
        <Grid>
            <ContestCard contestImageURL="contest_image.jpg" contestName="Game Jam" startTime="" endTime="" forcedState="active" owner=""/>
        </Grid>
    )
}