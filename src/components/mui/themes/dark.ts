import { PaletteOptions, ThemeOptions } from "@mui/material/styles"
import { DefaultPaletteOptions } from "./colors"
import { themeTypography } from "./typography"

const darkPalete: DefaultPaletteOptions = {
  mode: "dark",
  background: {
    paper: "#111936",
    default: "#1a223f",
  },
  primary: {
    light: "#eef2f6",
    main: "#2196f3",
    dark: "#1e88e5",
    contrastText: "#fff",
    200: "#90caf9",
    800: "#1565c0",
  },
  secondary: {
    light: "#d1c4e9",
    main: "#7c4dff",
    dark: "#651fff",
    contrastText: "#fff",
    200: "#b39ddb",
    800: "#6200ea",
  },
  text: {
    primary: "#bdc8f0",
    secondary: "#8492c4",
  },
  orange: {
    light: "#fbe9e7",
    main: "#ffab91",
    dark: "d84315",
  },
}

export const darkMode: ThemeOptions = {
  palette: darkPalete,
  // typography: themeTypography,
  mixins: {
    toolbar: {
      padding: "8px",
      // "@media (min-width: 600px)": {
      //   minHeight: "48px",
      // },
    },
  },
}
