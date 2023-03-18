import Box from "@mui/material/Box/Box"
import Drawer from "@mui/material/Drawer/Drawer"
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery"
import { useTheme } from "@mui/system"
import { atom, useAtom } from "jotai"
import { BrowserView, MobileView } from "react-device-detect"
import PerfectScrollbar from "react-perfect-scrollbar"
import LogoSection from "../Header/LogoSection"
import MenuList from "./MenuList"

interface Props {
  drawerOpen: boolean
  drawerToggle: () => void
  window?: Window
}

export const drawerWidth = 320

const leftDrawerAtom = atom(true)

export const useDrawer = () => {
  const theme = useTheme()
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"))
  const [leftDrawerOpened, setleftDrawerOpened] = useAtom(leftDrawerAtom)
  const handleLeftDrawerToggler = () => setleftDrawerOpened(!leftDrawerOpened)
  const handleLeftDrawerToggle = () =>
    setleftDrawerOpened(!matchDownMd ? leftDrawerOpened : !leftDrawerOpened)

  return {
    leftDrawerOpened,
    setleftDrawerOpened,
    handleLeftDrawerToggle,
    handleLeftDrawerToggler,
  } as const
}

const Sidebar = ({ drawerOpen, drawerToggle, window }: Props) => {
  const theme = useTheme()
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"))
  const container =
    window !== undefined ? () => window.document.body : undefined
  const drawer = (
    <>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Box sx={{ display: "flex", p: 2, mx: "auto" }}>
          <LogoSection isFilter />
        </Box>
      </Box>
      <BrowserView>
        {
          <>
            <PerfectScrollbar
              component="div"
              style={{
                height: !matchUpMd
                  ? "calc(100vh - 56px)"
                  : "calc(100vh - 88px)",
                paddingLeft: "16px",
                paddingRight: "16px",
              }}
            >
              <MenuList />
              {/* <MenuCard /> */}
            </PerfectScrollbar>
          </>
        }
      </BrowserView>
      <MobileView>
        <Box sx={{ px: 2 }}>
          <MenuList />
          {/* <MenuCard /> */}
        </Box>
      </MobileView>
    </>
  )
  return (
    <>
      <Box
        component="nav"
        sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : "auto" }}
        aria-label="menus"
      >
        <Drawer
          container={container}
          variant={matchUpMd ? "persistent" : "temporary"}
          anchor="left"
          open={drawerOpen}
          onClose={drawerToggle}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              background: theme.palette.background.default,
              color: theme.palette.text.primary,
              borderRight: "none",
              [theme.breakpoints.up("md")]: {
                top: "88px",
              },
            },
          }}
          ModalProps={{ keepMounted: true }}
          color="inherit"
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  )
}

export default Sidebar
