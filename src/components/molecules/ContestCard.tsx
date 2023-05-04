import { Box, Button, ButtonBase, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material"
import { formatUTCDate } from "../../helpers/dateConverter";

interface IProps {
    contestId: string;
    contestName : string;
    contestImageURL : string | null;
    startTime:string;
    endTime:string;
    owner: string;
    forcedState?:TState;
    clickHandler : Function;
}

type TState = "active" | "stopped" | "inactive" |null

export const ContestCard : React.FC<IProps> = ({contestId, contestName, contestImageURL, startTime, endTime, owner, forcedState = null, clickHandler}) => {
    contestImageURL = contestImageURL === null ? "image_placeholder.png" : contestImageURL;
    let state : TState;
    const utcTimestamp = Date.now();
    const istTimestamp = new Date(utcTimestamp + (5.5 * 60 * 60 * 1000));
    const startTimeInMilliseconds = Date.parse(startTime);
    const endTimeInMilliseconds = Date.parse(endTime)
    const currTimeInMilliseconds = istTimestamp.getTime();
    if(forcedState){
        state = forcedState;
    }else{
        if (startTimeInMilliseconds <= currTimeInMilliseconds && endTimeInMilliseconds >= currTimeInMilliseconds){
            state = 'active'
        }else if (startTimeInMilliseconds >= currTimeInMilliseconds){
            state = "inactive"
        }else{
            state = "stopped"
        }
    }
    console.log(contestName, state, startTimeInMilliseconds, endTimeInMilliseconds, currTimeInMilliseconds);
    return (
        <ButtonBase disabled={state === 'active' ? false : true} sx={{width:'350px', height:'300px', margin:'20px'}} onClick={() => clickHandler(contestId)}>
            <Card sx={{width:'100%', height:'100%'}}>
                <CardMedia image={contestImageURL} sx={{height:'50%'}}/>
                <CardContent sx={{height: '100%', display:"flex", flexDirection: "column", rowGap:"5%"}}>
                    <Typography variant="h6" >{contestName}</Typography>
                    <Typography variant="caption">{formatUTCDate(startTime)}</Typography>
                    <Box position="absolute" bottom="5%" right="5%">
                    {state === "active" ? 
                        <Typography color="green" variant="caption">ONGOING</Typography> : 
                        <Typography color="blue" variant="caption">UPCOMING</Typography>
                    }
                        
                    </Box>
                </CardContent>
            </Card>
        </ButtonBase>
    )
}