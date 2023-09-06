import { createTheme } from "@mui/material"

export const themeColors = {
  brand: {
    primary: '#0E8388',
    accent: '#2E4F4F',
    secondary: '#2C3333',
    neutral: '#CBE4DE'
  },
}

export const defaultTheme = createTheme({
  palette:{
    primary: {
      main : '#2E4F4F'
    },
    secondary : {
      main: "#2C3333"
    }
  },
  typography: {
    fontFamily: "\"Poppins\", \"Courier\"",
    fontWeightLight: "400",
    fontWeightRegular: "500",
    fontWeightMedium: "600",
    fontWeightBold: "700"
  }
})