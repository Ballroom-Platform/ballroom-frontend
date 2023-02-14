import { createTheme } from "@mui/material"
import { teal } from "@mui/material/colors"

export const themeColors = {
  brand: {
    primary: '#9A86A4',
    accent: '#B1BCE6',
    secondary: '#B7E5DD',
    neutral: '#F1F0C0'
  },
}

const fonts = {
    body : "\"Poppins\", \"Arial\"",
    heading: "\"Poppins\", \"Arial\"",
    mono: "\"Poppins\", \"Arial\""
}

export const defaultTheme = createTheme({
  palette:{
    primary: {
      main : '#9A86A4'
    },
    secondary : teal
  },
  typography: {
    fontFamily: "\"Poppins\", \"Courier\"",
    fontWeightLight: "400",
    fontWeightRegular: "500",
    fontWeightMedium: "600",
    fontWeightBold: "700"
  }
})