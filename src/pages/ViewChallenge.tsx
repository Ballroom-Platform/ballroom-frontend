import { Box, Button, Paper, Typography } from "@mui/material";
import { Layout } from "../components/templates";
import DownloadIcon from '@mui/icons-material/Download';
import { BFF_URLS } from "../links";
import axios from "axios";
import { useParams } from "react-router";

type ChallengeId = {
    challengeId: string;
};

const ViewChallenge = () => {
    const {challengeId} = useParams<ChallengeId>()
    const downloadFunction = async () => {
        let results = await axios({
            url: `${BFF_URLS}/challenges/template/${challengeId}`,
            method: 'GET',
            responseType: 'blob'
         })
         let hidden_a = document.createElement('a');
         hidden_a.href = window.URL.createObjectURL(new Blob([results.data]));
         hidden_a.setAttribute('download', 'template.zip');
         document.body.appendChild(hidden_a);
         hidden_a.click();
    }

    return ( 
        <Layout>
            
            <Paper sx={{padding: '1rem'}}>
                
                <Typography variant="h4" gutterBottom>
                    The Hardest Challenge in the world!
                </Typography>

                <Typography variant="h6" gutterBottom>
                    Challenge ID: {challengeId}
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
            <Box sx={{marginY: '1rem'}}>
                <Button variant="outlined" onClick={downloadFunction}startIcon={<DownloadIcon />}>Dowload Template</Button>
            </Box>
            
        </Layout>
    );
}
 
export default ViewChallenge;