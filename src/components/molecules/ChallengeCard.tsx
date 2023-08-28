import { Box, ButtonBase, Card, CardHeader, Chip, IconButton, Typography } from "@mui/material"

interface IProps{
    clickHandler : (challengeId: string) => void;
    title : string;
    status : string;
    difficulty: string;
    tags : Array<string>;
    challengeId : string;
}

export const ChallengeCard : React.FC<IProps> = ({clickHandler, title, status, difficulty, tags, challengeId}) => {
    return (
        <>
            <ButtonBase sx={{width: "100%", height:"10rem", paddingBottom:"0.5rem"}} onClick={() => clickHandler(challengeId)} key={challengeId}>
                <Card sx={{width:"100%", height:"100%", padding : "2rem 3rem"}}>
                    <CardHeader title={title} sx={{textAlign: "left", padding : "0.5rem 0px"}} />
                    <Box display="flex" width="100%" justifyContent="space-between">
                        <Typography>Difficulty : {difficulty}</Typography>
                        <Box display="flex" columnGap="0.5rem" alignItems="center" justifyContent="space-evenly">
                            <Typography>Tags : </Typography>
                            {tags.map(tag => <Chip variant="outlined" label={tag}/>)}
                        </Box>
                        <Typography></Typography>
                    </Box>
                </Card>
            </ButtonBase>
        </>
    )
}