import "./FullAppLayout.scss"

import { PropsChildren } from "@/infra/uikit/types"
import { Box } from "@mui/material"
import { styled, useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery"

import BaseLayout from "./BaseLayout"
import Footer from "./Footer"
import Header from "./Header"
import Sidebar, { drawerWidth, useDrawer } from "./Sidebar"

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean
}>(({ theme, open }) => ({
  // ...theme.typography.mainContent,
  ...(!open && {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up("md")]: {
      marginLeft: -(drawerWidth - 20),
      marginRight: "20px",
      padding: "16px",
      // width: `calc(100% - ${drawerWidth}px)`,
      width: "100%",
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: "20px",
      marginRight: "20px",
      width: `calc(100% - ${drawerWidth}px)`,
      padding: "16px",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "10px",
      marginRight: "10px",
      width: `calc(100% - ${drawerWidth}px)`,
      padding: "16px",
    },
  }),
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    // width: `calc(100% - ${drawerWidth}px)`,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      marginLeft: "20px",
      marginRight: "20px",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "10px",
      marginRight: "10px",
    },
  }),
  ...{
    marginTop: 75,
    // height: "10%",
    // backgroundColor: theme.palette.background.default,
    borderRadius: "20px",
    padding: "10px",
  },
}))

const FullAppLayout = ({ children }: PropsChildren) => {
  const theme = useTheme()
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"))
  const { leftDrawerOpened, handleLeftDrawerToggle, handleLeftDrawerToggler } =
    useDrawer()
  return (
    <>
      <BaseLayout>
        <div
          className="full-layout"
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Header handleLeftDrawerToggle={handleLeftDrawerToggler} />
            <Sidebar
              // drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened}
              drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened}
              drawerToggle={handleLeftDrawerToggle}
            />
            <Main theme={theme} open={leftDrawerOpened}>
              {/* breadcrumb */}
              {/* <Breadcrumbs separator={<ChevronRight />} navigation={navigation} icon title rightAlign /> */}
              <div className="layout-content">{children}</div>
            </Main>
          </Box>
          <Footer style={{ marginTop: "auto" }} />
        </div>
      </BaseLayout>
    </>
  )
}

export default FullAppLayout
