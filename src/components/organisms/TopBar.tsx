import {
    Breadcrumbs,
    Grid,
    Paper,
    Typography,
    Avatar,
    IconButton,
    useTheme,
    Box,
    Tabs,
    Tab,
  } from '@mui/material'
  import {
    FiberManualRecord,
    Group,
    BedtimeOutlined,
    Notifications,
    Logout,
    KeyboardArrowLeft,
  } from '@mui/icons-material'
import { useAuthContext } from '@asgardeo/auth-react'
  
export const TopBar: React.FC = () => {
  const theme = useTheme()
  const {signOut} = useAuthContext()
  const logoutHandler = async () => {
    signOut();
  }

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          height: '10rem',
          width: '100%',
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Grid
          container
          height="100%"
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Grid item height="100%" lg={8} sx={{ display: { md: 'block', xs: 'none' } }}>
            {
              //Can implement subsections here
            }
          </Grid>
          <Grid
            item
            lg={4}
            sx={{
              display: 'flex',
              columnGap: '1.25rem',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <IconButton>
              <Logout
                sx={{
                  width: '2rem',
                  height: '2rem',
                  color: theme.palette.grey[600],
                }}
                onClickCapture={logoutHandler}
              />
            </IconButton>
            <IconButton>
              <Avatar src="avatar.png" />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}