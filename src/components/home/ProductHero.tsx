import * as React from 'react';
import ProductHeroLayout from './ProductHeroLayout';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const backgroundImage =
  '/ballerina-mesh-grey.svg';

export default function ProductHero(props:any) {

  function navigate(e: any) {
    props.nav();
  }

  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      <Typography color="inherit" align="center" variant="h2" style={{wordBreak:'break-word'}}>
      Evaluating integration solutions<br/><span style={{color:"#20b6b0"}}>with choreographed precision</span> 
      </Typography>

      <Box component="span" sx={{ mt: 5, display:"flex", justifyContent:"center", width:"100%", flexWrap:"wrap"}}>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        sx={{ minWidth: 200, mr:2, ml:2, mt:2 }}
        className='hero-button'
        onClick={navigate}
      >
        Sign in
      </Button>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        sx={{ minWidth: 200, mr:2, ml:2, mt:2 }}
        className='hero-button'
      >
        Get Started
      </Button>
    </Box>
    </ProductHeroLayout>
  );
}