import { useEffect, useRef, useState } from "react"
import PerfectScrollbar from "react-perfect-scrollbar"
import { useNavigate } from "react-router-dom"

import { AuthService } from "@/apps/auth/services/auth.service"
import MainCard from "@/components/mui/cards/MainCard"
import Transitions from "@/components/mui/Transitions"
import Avatar from "@mui/material/Avatar/Avatar"
import Box from "@mui/material/Box/Box"
import Chip from "@mui/material/Chip/Chip"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Divider from "@mui/material/Divider/Divider"
import Grid from "@mui/material/Grid/Grid"
import Icon from "@mui/material/Icon/Icon"
import List from "@mui/material/List/List"
import ListItemButton from "@mui/material/ListItemButton/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon"
import ListItemText from "@mui/material/ListItemText/ListItemText"
import Paper from "@mui/material/Paper/Paper"
import Popper from "@mui/material/Popper/Popper"
import Stack from "@mui/material/Stack/Stack"
import { useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography/Typography"

import SearchText from "./SearchText"
import ShorcutSwitch from "./ShortcutSwitch"

export const borderRadius = 5
interface Props {}

const ProfileSection = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [open, setOpen] = useState(false)

  const anchorRef = useRef<HTMLDivElement>(null)
  const handleLogout = async () => {
    AuthService.logout().then(() => {
      navigate("/", { replace: true })
    })
  }

  const handleClose = (
    event: React.MouseEvent<HTMLElement> | MouseEvent | TouchEvent
  ) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }
    setOpen(false)
  }

  const handleListItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
    route = ""
  ) => {
    setSelectedIndex(index)
    handleClose(event)

    if (route && route !== "") {
      navigate(route)
    }
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <>
      <Chip
        sx={{
          height: "48px",
          alignItems: "center",
          borderRadius: "27px",
          transition: "all .2s ease-in-out",
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            "& svg": {
              stroke: theme.palette.primary.light,
            },
          },
          "& .MuiChip-label": {
            lineHeight: 0,
          },
        }}
        icon={
          <Avatar
            // src={User1}
            sx={{
              margin: "8px 0 8px 8px !important",
              cursor: "pointer",
            }}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={<Icon>settings</Icon>}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  border={false}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}
                >
                  <Box sx={{ p: 2 }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="h4">Hai,</Typography>
                        <Typography
                          component="span"
                          variant="h4"
                          sx={{ fontWeight: 400 }}
                        >
                          Suryo Prasetyo
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle2">
                        Backend Developer
                      </Typography>
                    </Stack>
                    {/* <SearchText /> */}
                  </Box>
                  <PerfectScrollbar
                    style={{
                      height: "100%",
                      maxHeight: "calc(100vh - 300px)",
                      overflowX: "hidden",
                    }}
                  >
                    <Box sx={{ p: 2 }}>
                      {/* <Divider />
                      <ShorcutSwitch /> */}
                      <Divider />
                      <List
                        component="nav"
                        sx={{
                          width: "100%",
                          // maxWidth: 350,
                          // minWidth: 300,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: "10px",
                          [theme.breakpoints.down("md")]: {
                            minWidth: "100%",
                          },
                          "& .MuiListItemButton-root": {
                            mt: 0.5,
                          },
                        }}
                      >
                        <ListItemButton
                          sx={{
                            borderRadius: `${borderRadius}px`,
                          }}
                          selected={selectedIndex === 1}
                          // onClick={(event) =>
                          //   handleListItemClick(
                          //     event,
                          //     1,
                          //     "/settings/profile"
                          //   )
                          // }
                        >
                          <ListItemIcon>
                            <Icon>account_circle</Icon>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Grid
                                container
                                spacing={1}
                                justifyContent="space-between"
                              >
                                <Grid item>
                                  <Typography variant="body2">
                                    Profile
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  {/* <Chip
                                    label="0"
                                    size="small"
                                    sx={{
                                      bgcolor: theme.palette.warning.dark,
                                      color: theme.palette.background.default,
                                    }}
                                  /> */}
                                </Grid>
                              </Grid>
                            }
                          />
                        </ListItemButton>
                        <ListItemButton
                          sx={{
                            borderRadius: `${borderRadius}px`,
                          }}
                          selected={selectedIndex === 4}
                          onClick={handleLogout}
                        >
                          <ListItemIcon>
                            <Icon>logout</Icon>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2">Logout</Typography>
                            }
                          />
                        </ListItemButton>
                      </List>
                    </Box>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  )
}
export default ProfileSection
