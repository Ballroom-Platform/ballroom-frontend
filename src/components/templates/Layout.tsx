import { Box } from '@mui/material'
import React from 'react'
import { Sidebar, TopBar } from '../organisms'

interface IProps {
  children?: React.ReactNode
}

export const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <main style={{ display: 'flex', flexDirection: 'row' }}>
      <Box
        sx={{
          width: { lg: '20%', xs: 'auto' },
          maxWidth: '20%',
          height: '100vh',
          zIndex: '50',
        }}
      >
        <Sidebar />
      </Box>
      <section style={{ width: '80%', maxWidth: '80%' }}>
        <TopBar />
        <Box marginX="4rem">
          {children}
        </Box>
      </section>
    </main>
  )
}