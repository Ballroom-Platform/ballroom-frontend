import { useAuthContext } from "@asgardeo/auth-react"
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import Image from "mui-image";
import { themeColors } from "../themes/default";


export const Home: React.FC = () => {
    const {signIn, } = useAuthContext();
    return (
        <Box maxWidth="100vw" maxHeight="100vh" width="100vw" height='100vh' display='flex' sx={{justifyContent:'center', alignItems:'center'}} padding="5%">
            <Card elevation={5} sx={{width:'30%', height:'80%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <Box display='flex' width='100%' height='95%' sx={{alignItems:'center', flexDirection:'column', border: `dashed 2px ${themeColors.brand.primary}`}} paddingTop="10%" margin="2.5%">
                    <Image src="logo.png" fit="contain" width="50%" height="auto"/>
                    <Box display='flex' width='100%' height='100%' sx={{ alignItems:'center', flexDirection:'column'}} rowGap='5%' paddingTop="20%">
                        <Typography variant="h5" fontWeight='regular' textAlign='center'>Login to your account</Typography>
                        <Button variant='contained' size="large" onClick={() => signIn()}>Login</Button>  
                    </Box>
                </Box>
                
            </Card>
        </Box>
    )
}

{/* <Box maxWidth="100vw" maxHeight="100vh" width="100vw" height='100vh' display='flex' sx={{justifyContent:'center', alignItems:'center'}} padding="5%" bgcolor={themeColors.brand.grey}>
            <Box display='flex' width="100%" height="100%" columnGap='1%'>
                <Card variant="outlined" sx={{width:'70%', display:'flex', alignItems:'center', justifyContent:'center', padding:'2% 0'}}>
                    <Box display='flex' width='100%' height='100%' sx={{justifyContent:'center', alignItems:'center', flexDirection:'column'}}>

                        <Typography variant="h1" fontWeight='bold' textAlign='center'>Ballroom</Typography>

                        <Image src="login_page_pic.jpg" fit="contain" width="70%"/>
                    </Box>
                </Card>
                <Card sx={{width:'30%', display:'flex', alignItems:'center', justifyContent:'center', bgcolor:themeColors.brand.primary}} elevation={4}>
                    <Box display='flex' width='100%' height='100%' sx={{justifyContent:'center', alignItems:'center', flexDirection:'column'}} rowGap='5%'>
                        <Typography variant="h4" fontWeight='bold' textAlign='center' color={themeColors.brand.neutral}>Login to your account</Typography>
                        <Button variant='contained' size="large" onClick={() => signIn()}>Login</Button>  
                    </Box>
                </Card>
            </Box>
        </Box> */}