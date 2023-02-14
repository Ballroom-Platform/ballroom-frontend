import { Avatar, Grid, Paper, Typography } from '@mui/material'

interface IProps {
  url: string
  name: string
  userType: string
  minimized: boolean
}

export const ProfileCard: React.FC<IProps> = ({
  name,
  url,
  userType,
  minimized,
}) => {
  return (
    <>
      <Avatar
        alt={name}
        src={url}
        sx={{
          width: '3rem',
          height: '3rem',
          display: { xs: 'block', lg: 'none' },
        }}
      />
      <Paper
        elevation={0}
        sx={{
          padding: '1rem',
          background: '#F2F2F2',
          display: { xs: 'none', lg: 'block' },
        }}
      >
        <Grid container alignItems="flex-start">
          <Grid item lg={3}>
            <Avatar
              alt={name}
              src={url}
              sx={{ width: '3rem', height: '3rem' }}
            />
          </Grid>
          {!minimized ? (
            <Grid item lg={9}>
              <Grid container>
                <Grid item lg={12}>
                  <Typography variant="h6" gutterBottom component="div">
                    {name}
                  </Typography>
                </Grid>
                <Grid item lg={12}>
                  <Typography variant="body1" gutterBottom component="div">
                    {userType}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </Paper>
    </>
  )
}