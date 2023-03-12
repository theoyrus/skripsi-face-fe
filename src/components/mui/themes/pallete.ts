import { PaletteMode } from "@mui/material"
import {
  ColorPartial,
  CommonColors,
  PaletteColorOptions,
  PaletteTonalOffset,
  TypeAction,
  TypeBackground,
  TypeText,
} from "@mui/material/styles/createPalette"

interface PaletteOptions {
  primary?: PaletteColorOptions
  secondary?: PaletteColorOptions
  error?: PaletteColorOptions
  warning?: PaletteColorOptions
  info?: PaletteColorOptions
  success?: PaletteColorOptions
  mode?: PaletteMode
  tonalOffset?: PaletteTonalOffset
  contrastThreshold?: number
  common?: Partial<CommonColors>
  grey?: ColorPartial
  text?: Partial<TypeText>
  divider?: string
  action?: Partial<TypeAction>
  background?: Partial<TypeBackground>
  getContrastText?: (background: string) => string
}

interface PaletteColor {
  light?: string
  main: string
  dark?: string
  contrastText?: string
}

export default {}
