import { PaletteMode } from "@mui/material"
import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

export const muiThemeModeAtom = atomWithStorage<PaletteMode>(
  "colorMode",
  "light"
)

export const useMuiThemeMode = () => {
  const [muiThemeMode, setmuiThemeMode] = useAtom(muiThemeModeAtom)
  const toogleThemeMode = () =>
    setmuiThemeMode(muiThemeMode == "light" ? "dark" : "light")

  return [muiThemeMode, toogleThemeMode, setmuiThemeMode] as const
}
