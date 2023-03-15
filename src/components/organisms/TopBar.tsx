import {
    Breadcrumbs,
    Grid,
    Paper,
    Typography,
    Avatar,
    IconButton,
    useTheme,
    Box,
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
import { useHistory, useLocation } from 'react-router'
  
export const TopBar: React.FC = () => {
  const getBreadcrumbs = (path : string) => {
    return path.split("/").map(string => string.charAt(0).toUpperCase() + string.slice(1));
  }
  const theme = useTheme()
  const location = useLocation();
  const history = useHistory();
  const breadcrumbs = getBreadcrumbs(location.pathname);
  const selectedSection = breadcrumbs[1]
  const backButton = breadcrumbs.length > 3 ? true : false
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
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Grid item lg={8} sx={{ display: { md: 'block', xs: 'none' } }}>
            <Box display="flex" alignItems="center">
              <IconButton onClick={() => history.goBack()}>
                <KeyboardArrowLeft />
              </IconButton>
              <Breadcrumbs
                separator={<FiberManualRecord sx={{ fontSize: '0.5rem' }} />}
                aria-label="breadcrumb"
              >
                {breadcrumbs?.map((subSection, index) => {
                  return (
                    <Typography variant="h6" key={index}>
                      {subSection}
                    </Typography>
                  )
                })}
              </Breadcrumbs>
            </Box>
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
              <BedtimeOutlined
                sx={{
                  width: '2rem',
                  height: '2rem',
                  color: theme.palette.grey[600],
                }}
              />
            </IconButton>
            <IconButton>
              <Notifications
                sx={{
                  width: '2rem',
                  height: '2rem',
                  color: theme.palette.grey[600],
                }}
              />
            </IconButton>
            <IconButton>
              <Group
                sx={{
                  width: '2rem',
                  height: '2rem',
                  color: theme.palette.grey[600],
                }}
              />
            </IconButton>
            <IconButton>
              <Logout
                sx={{
                  width: '2rem',
                  height: '2rem',
                  color: theme.palette.grey[600],
                }}
                onClick={logoutHandler}
              />
            </IconButton>
            <IconButton>
              <Avatar src="https://localhost:300/avatar.png" />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}