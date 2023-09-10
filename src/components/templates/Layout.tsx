import { Box } from '@mui/material'
import React from 'react'
import { Sidebar, TopBar } from '../organisms'
import AppBar from "@mui/material/AppBar"
import Container from "@mui/material/Container";

import {
  Breadcrumbs,
  Grid,
  Paper,
  Typography,
  Avatar,
  IconButton,
  useTheme,
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
import { useNavigate } from 'react-router'
import { useApp } from "../../hooks/useApp";

interface IProps {
  children?: React.ReactNode
}

export const Layout: React.FC<IProps> = ({ children }) => {

  const theme = useTheme()
  const {signOut} = useAuthContext()
  const navigate = useNavigate();
  const {appState} = useApp();
  const userId = appState.auth.userID;

  const logoutHandler = async () => {
    signOut();
  }

  const userProfile = () => {
    navigate("/userProfile" + `/${userId}`);
  }

  return (
    <main style={{ display: 'flex', flexDirection: 'row' }}>
      <AppBar position="fixed" color="inherit" style={{ minHeight: "60px", justifyContent: "center" }}>

        <Container
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <img src='../ballroom-logo.png' width="10%" alt="Ballroom logo" />
          <Grid
            item
            lg={4}
            sx={{
              display: 'flex',
              columnGap: '1.25rem',
              alignItems: 'right',
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
            <IconButton  onClick={userProfile}>
              <Avatar src="avatar.png"/>
            </IconButton>
          </Grid>
        </Container>
      </AppBar>
      <Box
        sx={{
          width: { lg: '15%', xs: 'auto' },
          maxWidth: '20%',
          height: '100vh',
          zIndex: '50'
        }}
      >
        <Sidebar />
      </Box>
      <section style={{ width: '80%', maxWidth: '80%'}}>
        <TopBar />
        <Box marginX="4rem">
          {children}
        </Box>
      </section>
    </main>
  )
}