import { ButtonBase, Card, CardContent, CardMedia, Typography } from "@mui/material"

interface IProps {
    contestId: string;
    contestName : string;
    contestImageURL : string | null;
    startTime:string;
    endTime:string;
    owner: string;
    forcedState:TState;
    clickHandler : Function;
}

type TState = "active" | "stopped" | "inactive" |null

export const ContestCard : React.FC<IProps> = ({contestId, contestName, contestImageURL, startTime, endTime, owner, forcedState, clickHandler}) => {
    contestImageURL = contestImageURL === null ? "image_placeholder.png" : contestImageURL;
    let state : TState;
    const startTimeInMilliseconds = Date.parse(startTime);
    const endTimeInMilliseconds = Date.parse(endTime)
    const currTimeInMilliseconds = Date.now()
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
    return (
        <ButtonBase disabled={state === 'active' ? false : true} sx={{width:'350px', height:'300px'}} onClick={() => clickHandler(contestId)}>
            <Card sx={{width:'100%', height:'100%'}}>
                <CardMedia image={contestImageURL} sx={{height:'50%'}}/>
                <CardContent>
                    <Typography variant="h6" >{contestName}</Typography>
                    {
                        (startTime)
                    }
                </CardContent>
            </Card>
        </ButtonBase>
    )
}