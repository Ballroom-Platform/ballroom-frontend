import { Box, Button, ButtonBase, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material"
import { formatUTCDate } from "../../helpers/dateConverter";

interface IProps {
    contestId: string;
    contestName : string;
    contestImageURL : Array<number> | null;
    startTime:string;
    endTime:string;
    owner: string;
    accessType : string;
    forcedState?:TState;
    clickHandler : Function;
}

type TState = "active" | "stopped" | "inactive" |null

function arrayToBlob(array: number[]): Blob {
    const uint8Array = new Uint8Array(array);
    return new Blob([uint8Array]);
  }
  
  function arrayToFile(array: number[], fileName: string): File {
    const blob = arrayToBlob(array);
    return new File([blob], fileName);
  }

export const ContestCard : React.FC<IProps> = ({contestId, contestName, contestImageURL, startTime, endTime, owner, accessType, forcedState = null, clickHandler}) => {
    let state : TState;
    const utcTimestamp = Date.now();
    const startTimeInMilliseconds = Date.parse(startTime);
    const endTimeInMilliseconds = Date.parse(endTime)
    const currTimeInMilliseconds = utcTimestamp;
    const imageUrl = URL.createObjectURL(arrayToFile(contestImageURL!, "image.png"));
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
        <ButtonBase sx={{width:'350px', height:'400px', margin:'20px'}} onClick={() => clickHandler(contestId,accessType)}>
            <Card sx={{width:'100%', height:'100%'}}>
                <CardMedia image={imageUrl} sx={{height:'50%'}}/>
                <CardContent sx={{height: '100%', display:"flex", flexDirection: "column", rowGap:"5%"}}>
                    <Typography variant="h6" >{contestName}</Typography>
                    {
                        accessType === "VIEW" ? <Typography color="blue" variant="caption">{accessType+" ACCESS"}</Typography> 
                        : accessType === "EDIT" ? <Typography color="red" variant="caption">{accessType+" ACCESS"}</Typography>
                        : <Typography color="green" variant="caption">{accessType}</Typography>
                    }
                    <Typography variant="caption">{"From : "+formatUTCDate(startTime)}</Typography>
                    <Typography variant="caption">{"To : "+formatUTCDate(endTime)}</Typography>
                    <Box position="absolute" bottom="1%" right="5%">
                    {
                    state === "active" ? <Typography color="green" variant="caption">ONGOING</Typography> 
                    : state === "inactive" ? <Typography color="brown" variant="caption">UPCOMING</Typography>
                    : <Typography color="purple" variant="caption">ENDED</Typography>
                    }
                        
                    </Box>
                </CardContent>
            </Card>
        </ButtonBase>
    )
}