import { PropsChildren } from "@/infra/uikit/types"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { ConfirmProvider } from "material-ui-confirm"

import { SnackbarNotif } from "../dialogs/SnackbarNotif"
import { useMuiThemeMode } from "../themes"
import { darkTheme, lightTheme } from "../themes/theme"

const BaseLayout = ({ children }: PropsChildren) => {
  const [mode] = useMuiThemeMode()
  return (
    <ThemeProvider theme={mode == "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <ConfirmProvider>{children}</ConfirmProvider>
      <SnackbarNotif />
    </ThemeProvider>
  )
}

export default BaseLayout
