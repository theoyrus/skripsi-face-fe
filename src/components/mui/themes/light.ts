import { PaletteOptions, ThemeOptions } from "@mui/material/styles"
import { DefaultPaletteOptions } from "./colors"
import { themeTypography } from "./typography"

const lightPalete: DefaultPaletteOptions = {
  mode: "light",
  background: {
    default: "#eef2f6",
    paper: "#ffffff",
  },
  primary: {
    light: "#eef2f6",
    main: "#2196f3",
    dark: "#1e88e5",
    contrastText: "#fff",
  },
  secondary: {
    light: "#ede7f6",
    main: "#673ab7",
    dark: "#5e35b1",
    contrastText: "#fff",
  },
  success: {
    light: "#b9f6ca",
    main: "#00e676",
    dark: "#00c853",
    contrastText: "#fff",
  },
  error: {
    light: "#ef9a9a",
    main: "#f44336",
    dark: "#c62828",
    contrastText: "#fff",
  },
  warning: {
    light: "#fff8e1",
    main: "#ffe57f",
    dark: "#ffc107",
    contrastText: "#fff",
  },
  info: {
    light: "#eef2f6",
    main: "#2196f3",
    dark: "#1e88e5",
    contrastText: "#fff",
  },
  grey: {
    50: "#f8fafc",
    100: "#eef2f6",
    200: "#e3e8ef",
    300: "#cdd5df",
    500: "#697586",
    600: "#4b5565",
    700: "#364152",
    900: "#121926",
  },
}

export const lightMode: ThemeOptions = {
  palette: lightPalete,
  // typography: themeTypography,
  mixins: {
    toolbar: {
      // background: colors.purple[100],
      color: lightPalete.primary?.contrastText,
      background: lightPalete.secondary?.dark,
      padding: "8px",
      //     "@media (min-width: 600px)": {
      //       minHeight: "48px",
      //     },
    },
  },
}
