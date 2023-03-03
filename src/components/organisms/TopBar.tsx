import {
    Breadcrumbs,
    Grid,
    Paper,
    Typography,
    Avatar,
    IconButton,
    useTheme,
  } from '@mui/material'
  import {
    FiberManualRecord,
    Group,
    BedtimeOutlined,
    Notifications,
    Logout,
  } from '@mui/icons-material'
import { useAuthContext } from '@asgardeo/auth-react'
  
  export const TopBar: React.FC = () => {
    const theme = useTheme()
    const breadcrumbs = ["Subsection 1", "Subsection 2"]
    const selectedSection = breadcrumbs[2]
    //const backButton = breadcrumbs.length > 3 ? true : false
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
              <Typography variant="h4" gutterBottom component="div">
                {/* {backButton && (
                  <IconButton onClick={() => router.back()}>
                    <KeyboardArrowLeft />
                  </IconButton>
                )} */}
                {selectedSection}
              </Typography>
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