import * as React from 'react';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Copyright() {
  return (
    <React.Fragment>
      Powered by{' '}
      <Link color="#20b6b0" href="https://ballerina.io/">
        Ballerina
      </Link>{' '}
      {'© '}{new Date().getFullYear()}
    </React.Fragment>
  );
}

export default function AppFooter() {
  return (
    <Typography
      component="footer"
      sx={{ display: 'flex', bgcolor: 'secondary.dark' }}
    >
      <Container sx={{ mt: 5, mb: 5, display: 'flex', color: "#ffffff" }}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              spacing={2}
            >
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Container>
    </Typography>
  );
}