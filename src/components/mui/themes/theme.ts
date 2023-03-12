import { createTheme } from "@mui/material/styles"
import { blue, pink, purple } from "@mui/material/colors"
import { darkMode } from "./dark"
import { lightMode } from "./light"

export const appTheme = createTheme({
  palette: {
    primary: {
      light: blue[300],
      main: purple[500],
      dark: blue[700],
    },
    secondary: {
      light: pink[300],
      main: "#11cb5f",
      dark: pink[700],
    },
  },
})

export const darkTheme = createTheme(darkMode)
export const lightTheme = createTheme(lightMode)
