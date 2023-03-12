import Icon from "@mui/material/Icon/Icon"
import IconButton from "@mui/material/IconButton/IconButton"
import { useTheme } from "@mui/system"

import { useMuiThemeMode } from "./themes"

export const ThemeSwitchButton = () => {
  const [mode, toogleMode] = useMuiThemeMode()
  const theme = useTheme()
  return (
    <IconButton sx={{ ml: 1 }} color="inherit" onClick={toogleMode}>
      {theme.palette.mode == "light" ? (
        <Icon>light_mode</Icon>
      ) : (
        <Icon>dark_mode</Icon>
      )}
    </IconButton>
  )
}
