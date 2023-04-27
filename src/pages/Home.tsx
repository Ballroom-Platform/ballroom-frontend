import { useAuthContext } from "@asgardeo/auth-react"
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FRONTEND_PUBLIC } from "../links";
import { themeColors } from "../themes/default";
import { URL_LIST } from "../links/frontend";


export const Home: React.FC = () => {
    const {signIn, state } = useAuthContext();
    const navigate = useNavigate()

    const getStartedHandler = () => {
        if(state.isAuthenticated){
            navigate(URL_LIST.loginHandler);
        }else{
            signIn();
        }
    }

    return (
        <Box padding="2% 10%" height="100vh" maxHeight="100vh">
            {/* Top Bar */}
            <Box flexDirection="row" display="flex" height="15%" alignItems="center" justifyContent="space-between">
                <img src={FRONTEND_PUBLIC.logo.black} style={{objectFit:"cover"}} height="100%"/>
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" width="28%">
                    <Link to="" style={{textDecoration:"none", color: themeColors.brand.accent}}>About Us</Link>
                    <Link to="" style={{textDecoration:"none", color: themeColors.brand.accent}}>Features</Link>
                    <Link to="" style={{textDecoration:"none", color: themeColors.brand.accent}}>Team</Link>
                    <Link to="" style={{textDecoration:"none", color: themeColors.brand.accent}}>Company</Link>
                </Box>
                <Button color="secondary" variant="contained" sx={{height:"3.5rem", width:"10%", borderRadius:"4rem"}}>Contact Us</Button>
            </Box>
            <Box textAlign="center" paddingTop="2%">
                <Typography variant="h1" fontWeight="bold" color={themeColors.brand.secondary}>Hacker's</Typography>
                <Typography variant="h1" fontWeight="bold" color={themeColors.brand.primary}>Playground...</Typography>
                <Box width="100%" paddingTop="3%">
                    <Button variant="contained" sx={{height:"3.8rem", width:"10%", borderRadius:"4rem"}} onClick={getStartedHandler}>Get Started</Button>
                </Box>
            </Box>
            <Box textAlign="right" marginRight="15%">
                <img src="home_pic.jpg" style={{objectFit:"contain"}} width="30%"/>
            </Box>
        </Box>
    )
}