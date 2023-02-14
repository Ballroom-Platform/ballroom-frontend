import { useAuthContext } from "@asgardeo/auth-react"
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import Image from "mui-image";
import { themeColors } from "../themes/default";


export const Home: React.FC = () => {
    const {signIn, } = useAuthContext();
    return (
        <Box maxWidth="100vw" maxHeight="100vh" width="100vw" height='100vh' display='flex' sx={{justifyContent:'center', alignItems:'center'}} padding="5%" bgcolor={themeColors.brand.secondary}>
            <Box display='flex' width="100%" height="100%" columnGap='1%'>
                <Card variant="outlined" sx={{width:'70%', display:'flex', alignItems:'center', justifyContent:'center', padding:'2% 0'}}>
                    <Box display='flex' width='100%' height='100%' sx={{justifyContent:'center', alignItems:'center', flexDirection:'column'}}>

                        <Typography variant="h1" fontWeight='bold' textAlign='center'>Ballroom</Typography>

                        <Image src="login_page_pic.jpg" fit="contain" width="70%"/>
                    </Box>
                </Card>
                <Card sx={{width:'30%', display:'flex', alignItems:'center', justifyContent:'center', bgcolor:themeColors.brand.neutral}} elevation={4}>
                    <Box display='flex' width='100%' height='100%' sx={{justifyContent:'center', alignItems:'center', flexDirection:'column'}} rowGap='5%'>
                        <Typography variant="h4" fontWeight='bold' textAlign='center'>Login to your account</Typography>
                        <Button variant='contained' size="large" onClick={() => signIn()}>Login</Button>  
                    </Box>
                </Card>
            </Box>
        </Box>
    )
}