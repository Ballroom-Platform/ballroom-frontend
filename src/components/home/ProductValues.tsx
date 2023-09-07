import * as React from 'react';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkIcon from '@mui/icons-material/Work';

const item: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function ProductValues() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'secondary.light' }}
    >
      <Container sx={{ mt: 15, mb: 15, display: 'flex', position: 'relative', color: "#ffffff" }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <CastForEducationIcon sx={{ width: '2em', height: '2em' }} />
              <Typography variant="h5" sx={{ my: 5 }}>
                For tutorials
              </Typography>
              <Typography>
                {
                  'Tutors and educators can orchestrate graceful assignments, allowing students to take center stage in real-world projects.'
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <EmojiEventsIcon sx={{ width: '2em', height: '2em' }} />
              <Typography variant="h5" sx={{ my: 5 }}>
                For competitions
              </Typography>
              <Typography>
                {
                  'Organizers can host dazzling hackathons, encouraging brilliant minds to tango together and innovate on cutting-edge projects.'
                }
                {'your Sundays will not be alike.'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <WorkIcon sx={{ width: '2em', height: '2em' }} />
              <Typography variant="h5" sx={{ my: 5 }}>
                For interviews
              </Typography>
              <Typography>
                {'Interviewers can lead candidates through an enchanting tango of scenarios, evaluating their skills and potential in depth.'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;