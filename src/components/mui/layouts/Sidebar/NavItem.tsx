import { forwardRef, Ref, useEffect } from "react"
import { Link } from "react-router-dom"

import { INavItem, INavItemChild } from "@/infra/routes/menus"
import { Icon } from "@mui/material"
// import Avatar from "@mui/material/Avatar/Avatar"
// import Chip from "@mui/material/Chip/Chip"
import ListItemButton from "@mui/material/ListItemButton/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon"
import ListItemText from "@mui/material/ListItemText/ListItemText"
import { useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography/Typography"
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery"
import { useDrawer } from "."

interface NavItemProps {
  item: INavItemChild | INavItem
  level: number
}

const NavItem = ({ item, level }: NavItemProps) => {
  const theme = useTheme()
  //   const dispatch = useDispatch()
  //   const customization = useSelector((state) => state.customization)
  const matchesSM = useMediaQuery(theme.breakpoints.down("lg"))
  const { handleLeftDrawerToggle, leftDrawerOpened, setleftDrawerOpened } =
    useDrawer()

  // const Icon = item.icon
  const itemIcon = item?.icon ? (
    // <Icon stroke={1.5} size="1.3rem" />
    <Icon>{item.icon}</Icon>
  ) : (
    <Icon
      sx={
        {
          // width:
          //   customization.isOpen.findIndex((id: string) => id === item?.id) > -1
          //     ? 8
          //     : 6,
          // height:
          //   customization.isOpen.findIndex((id: string) => id === item?.id) > -1
          //     ? 8
          //     : 6,
        }
      }
      fontSize={level > 0 ? "inherit" : "medium"}
    >
      fiber_manual_record
    </Icon>
  )

  let itemTarget = "_self"
  if (item.target) {
    itemTarget = "_blank"
  }

  let listItemProps = {
    component: forwardRef((props, ref: Ref<HTMLAnchorElement>) =>
      item.url ? (
        <Link ref={ref} {...props} to={item.url} target={itemTarget} />
      ) : null
    ),
  }

  if (item?.external) {
    // listItemProps = { component: "a", href: item.url, target: itemTarget }
  }

  const itemHandler = (id: string) => {
    // dispatch({ type: MENU_OPEN, id })
    // if (matchesSM) dispatch({ type: SET_MENU, opened: false })
    // alert(`${id} state: ${leftDrawerOpened}`)
    // setleftDrawerOpened(false)
    setTimeout(() => {
      handleLeftDrawerToggle()
    }, 250)
  }

  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split("/")
      .findIndex((id) => id === item.id)
    if (currentIndex > -1) {
      //   dispatch({ type: MENU_OPEN, id: item.id })
    }
    // eslint-disable-next-line
  }, [])

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        borderRadius: `5px`,
        mb: 0.5,
        alignItems: "flex-start",
        backgroundColor: level > 1 ? "transparent !important" : "inherit",
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 24}px`,
      }}
      //   selected={
      //     customization.isOpen.findIndex((id: string) => id === item.id) > -1
      //   }
      onClick={() => itemHandler(item.id)}
    >
      <ListItemIcon sx={{ my: "auto", minWidth: !item?.icon ? 18 : 36 }}>
        {itemIcon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            // variant={
            //   customization.isOpen.findIndex((id: string) => id === item.id) >
            //   -1
            //     ? "h5"
            //     : "body1"
            // }
            color="inherit"
          >
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography
              variant="caption"
              //   sx={{ ...theme.typography.subMenuCaption }}
              display="block"
              gutterBottom
            >
              {item.caption}
            </Typography>
          )
        }
      />
      {/* {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )} */}
    </ListItemButton>
  )
}
export default NavItem
