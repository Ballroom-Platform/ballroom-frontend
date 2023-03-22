import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ContestCard } from "../components/molecules";

const UpcomingContests = () => {
    return ( 
        <>
            <Typography variant="h3" gutterBottom>
                    Upcoming Contests
            </Typography>

            <Grid container sx={{marginY: '2rem'}}>
                <ContestCard contestImageURL="contest_image.jpg" contestName="Game Jam" startTime="" endTime="" forcedState="active" owner=""/>
                <ContestCard contestImageURL="contest_image.jpg" contestName="Game Jam" startTime="" endTime="" forcedState="active" owner=""/>
                <ContestCard contestImageURL="contest_image.jpg" contestName="Game Jam" startTime="" endTime="" forcedState="active" owner=""/>
                <ContestCard contestImageURL="contest_image.jpg" contestName="Game Jam" startTime="" endTime="" forcedState="active" owner=""/>
                <ContestCard contestImageURL="contest_image.jpg" contestName="Game Jam" startTime="" endTime="" forcedState="active" owner=""/>
                <ContestCard contestImageURL="contest_image.jpg" contestName="Game Jam" startTime="" endTime="" forcedState="active" owner=""/>
                <ContestCard contestImageURL="contest_image.jpg" contestName="Game Jam" startTime="" endTime="" forcedState="active" owner=""/>
                
            </Grid>
        </>
     );
}
 
export default UpcomingContests;