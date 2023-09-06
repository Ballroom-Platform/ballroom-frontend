import { useAuthContext } from "@asgardeo/auth-react"
import AppBar from "@mui/material/AppBar"
import ProductHero from "../components/home/ProductHero";
import Container from "@mui/material/Container";
import ProductValues from "../components/home/ProductValues";
import AppFooter from "../components/home/AppFooter";
import { useNavigate } from "react-router-dom";
import { URL_LIST } from "../links/frontend";


export const Home: React.FC = () => {
  const { signIn, state } = useAuthContext();
  const navigate = useNavigate()

  const getStartedHandler = () => {
    if (state.isAuthenticated) {
      navigate(URL_LIST.loginHandler);
    } else {
      signIn();
    }
  }

  return (
    <>

      <AppBar position="fixed" color="inherit" style={{ minHeight: "60px", justifyContent: "center" }}>

        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src='ballroom-logo.png' width="10%" alt="Ballroom logo" />
        </Container>
      </AppBar>
      <ProductHero nav={getStartedHandler} />
      <ProductValues />
      <AppFooter />

    </>
  )
}