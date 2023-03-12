import { PaletteOptions } from "@mui/material/styles"

// source: https://stackoverflow.com/a/68854872/6842307

export type AppPaletteColorOptions = SimplePaletteColorOptions & ColorPartial

export interface SimplePaletteColorOptions {
  light?: string
  main: string
  dark?: string
  contrastText?: string
}

export type ColorPartial = Partial<Color>

export interface Color {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  A100: string
  A200: string
  A400: string
  A700: string
}

export interface DefaultPaletteOptions extends PaletteOptions {
  primary?: AppPaletteColorOptions
  secondary?: AppPaletteColorOptions
  orange?: AppPaletteColorOptions
}
