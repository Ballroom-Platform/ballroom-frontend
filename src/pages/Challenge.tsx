import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useHistory } from "react-router";
import { Layout } from "../components/templates";

const Challenge : React.FC = () => {
    const history = useHistory();

    const handler = () => {
        history.push("/previousSubmissions");
    }

    return (
        <Layout>
            <Paper sx={{display: 'flex', justifyContent: "flex-end", marginY: '2rem', paddingX: '3rem'}} elevation={0}>
                <Button variant="outlined" onClick={handler}>Previous Submissions</Button>
            </Paper>
            
            <Paper sx={{padding: '1rem'}}>
                
                <Typography variant="h4" gutterBottom>
                    The Hardest Challenge in the world!
                </Typography>

                <Typography sx={{marginTop:'3rem'}} variant="h6" gutterBottom>
                    Diffculty: Hard
                </Typography>

                <Typography sx={{marginTop:'3rem'}} variant="h6" gutterBottom>
                    Problem Statement:
                </Typography>

                <Typography variant="body1" gutterBottom>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ducimus odit magni neque quibusdam dignissimos quis nulla, sequi culpa, magnam, quod minus ratione beatae qui nam officiis tempora. Suscipit, possimus?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos id neque voluptatem blanditiis aliquam, nam at, magni quidem adipisci pariatur quis commodi quod nemo rem eaque? Iure eum molestiae saepe.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ut deserunt, quidem provident sequi porro omnis aut quo officiis. Facilis quibusdam odit, omnis deserunt atque repellat tenetur doloribus et reiciendis?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam ex soluta possimus ab officia obcaecati atque voluptate recusandae. Blanditiis vel possimus ad accusamus quibusdam consequatur nihil? Eveniet facere fuga atque?
                </Typography>

                <Typography sx={{marginTop:'3rem'}} variant="h6" gutterBottom>
                    Constraints:
                </Typography>

                <Typography variant="body1" gutterBottom>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ducimus odit magni neque quibusdam dignissimos quis nulla, sequi culpa, magnam, quod minus ratione beatae qui nam officiis tempora. Suscipit, possimus?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos id neque voluptatem blanditiis aliquam, nam at, magni quidem adipisci pariatur quis commodi quod nemo rem eaque? Iure eum molestiae saepe.
                </Typography>
            </Paper>
            <Box sx={{marginTop: '1rem'}}>
                <Button variant="outlined" startIcon={<DownloadIcon />}>Dowload Template</Button>
            </Box>
            <Box>
                <Button variant="outlined" component="label" startIcon={<UploadIcon/>}>
                    Upload Solution
                <input hidden accept="image/*" multiple type="file" />
                </Button>

                <Button sx={{margin: '1rem'}}variant="contained">Submit</Button>
            </Box>
            
        </Layout>
    );
}
 
export default Challenge;