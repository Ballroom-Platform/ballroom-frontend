import {
    Grid,
    Paper,
  } from '@mui/material'
  
export const TopBar: React.FC = () => {

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          height: '8rem',
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
        </Grid>
      </Paper>
    </>
  )
}