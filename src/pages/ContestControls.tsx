import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ImageIcon from '@mui/icons-material/Image';
import ListItemButton from "@mui/material/ListItemButton";
import AssignmentIcon from '@mui/icons-material/Assignment';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Paper from "@mui/material/Paper";

const ContestControls = () => {
    return ( 
        <>
            <Typography variant="h3" gutterBottom>
                    Game Jam
            </Typography>

            <Button variant="contained">Add Challenge</Button>

            <Typography sx={{marginY: '2rem'}} variant="h4" gutterBottom>
                    Challenges in Contest
            </Typography>
            <Paper sx={{marginY: '2rem'}}>
                <Card sx={{marginY: '1rem', width: '75%'}} >

                    <CardContent>
                        <Typography variant="h5" component="div">
                        The Hardest Challenge in the World
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        HARD
                        </Typography>
                    </CardContent>

                    <CardActions>
                        <Button size="small">View</Button>
                    </CardActions>

                </Card>
                <Card sx={{marginY: '1rem', width: '75%'}}>

                    <CardContent>
                        <Typography variant="h5" component="div">
                        The Hardest Challenge in the World
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        HARD
                        </Typography>
                    </CardContent>

                    <CardActions>
                        <Button size="small">View</Button>
                    </CardActions>

                </Card>
                <Card sx={{marginY: '1rem', width: '75%'}}>

                    <CardContent>
                        <Typography variant="h5" component="div">
                        The Hardest Challenge in the World
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        HARD
                        </Typography>
                    </CardContent>

                    <CardActions>
                        <Button size="small">View</Button>
                    </CardActions>

                </Card>
            </Paper>
            
        </>
    );
}
 
export default ContestControls;