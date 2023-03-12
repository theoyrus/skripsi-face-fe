import AppBar from "@mui/material/AppBar/AppBar"
import Avatar from "@mui/material/Avatar/Avatar"
import Box from "@mui/material/Box/Box"
import ButtonBase from "@mui/material/ButtonBase/ButtonBase"
import Icon from "@mui/material/Icon/Icon"
import { useTheme } from "@mui/material/styles"
import Toolbar from "@mui/material/Toolbar/Toolbar"

import { ThemeSwitchButton } from "../../ThemeSwitch"
import LogoSection from "./LogoSection"
import NotifSection from "./NotifSection"
import ProfileSection from "./ProfileSection"

interface Props {
  handleLeftDrawerToggle: () => void
}

const Header = ({ handleLeftDrawerToggle }: Props) => {
  const theme = useTheme()
  return (
    <>
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        // sx={{
        //   bgcolor: theme.palette.background.default,
        //   transition: leftDrawerOpened
        //     ? theme.transitions.create("width")
        //     : "none",
        // }}
      >
        <Toolbar>
          <Box
            sx={{
              width: 228,
              display: "flex",
              [theme.breakpoints.down("md")]: {
                width: "auto",
              },
            }}
          >
            <Box
              component="span"
              sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
            >
              <LogoSection />
            </Box>
            <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
              <Avatar
                variant="rounded"
                sx={{
                  transition: "all .2s ease-in-out",
                  background: theme.palette.secondary.light,
                  color: theme.palette.secondary.dark,
                  "&:hover": {
                    background: theme.palette.secondary.dark,
                    color: theme.palette.secondary.light,
                  },
                }}
                onClick={handleLeftDrawerToggle}
                color="inherit"
              >
                <Icon>menu</Icon>
              </Avatar>
            </ButtonBase>
          </Box>
          {/* header search */}
          {/* <SearchSection /> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 1 }} />
          {/* notification & profile */}
          {/* <NotifSection /> */}
          <ProfileSection />
          <ThemeSwitchButton />
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
