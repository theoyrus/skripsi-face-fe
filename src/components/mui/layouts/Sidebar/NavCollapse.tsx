import { useState } from "react"

import { INavItem, INavItemChild } from "@/infra/routes/menus"
import { Icon } from "@mui/material"
import Collapse from "@mui/material/Collapse/Collapse"
import List from "@mui/material/List/List"
import ListItemButton from "@mui/material/ListItemButton/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon"
import ListItemText from "@mui/material/ListItemText/ListItemText"
import { useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography/Typography"

import NavItem from "./NavItem"

interface NavCollapseProps {
  level: number
  menu: INavItemChild | INavItem
}

const NavCollapse = ({ menu, level }: NavCollapseProps) => {
  const theme = useTheme()
  const borderRadius = 10

  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState("")

  const handleClick = () => {
    setOpen(!open)
    setSelected(!selected ? menu.id : "")
  }

  //   const { pathname } = useLocation()
  //   const checkOpenForParent = (child: INavItem[], id: string) => {
  //     child.forEach((item: INavItem) => {
  //       if (item.url === pathname) {
  //         setOpen(true)
  //         setSelected(id)
  //       }
  //     })
  //   }

  //   // menu collapse for sub-levels
  //   useEffect(() => {
  //     setOpen(false)
  //     setSelected(null)
  //     if (menu.children) {
  //       menu.children.forEach((item) => {
  //         if (item.children?.length) {
  //           checkOpenForParent(item.children, menu.id)
  //         }
  //         if (item.url === pathname) {
  //           setSelected(menu.id)
  //           setOpen(true)
  //         }
  //       })
  //     }

  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [pathname, menu.children])

  // menu collapse & item
  const items = menu.children?.map((child) => {
    if (child.type == "collapse" || (child.children?.length ?? 0) > 0) {
      return <NavCollapse key={child.id} menu={child} level={level + 1} />
    } else if (child.type == "item" || (child.children?.length ?? 0) == 0) {
      return <NavItem key={child.id} item={child} level={level + 1} />
    } else {
      return (
        <Typography key={child.id} variant="h6" color="error" align="center">
          Menu Items Error
        </Typography>
      )
    }
    // switch (child.type) {
    //   case "collapse":
    //     return <NavCollapse key={child.id} menu={child} level={level + 1} />
    //   case "item":
    //     return <NavItem key={child.id} item={child} level={level + 1} />
    //   default:
    //     return (
    //       <Typography key={child.id} variant="h6" color="error" align="center">
    //         Menu Items Error
    //       </Typography>
    //     )
    // }
  })

  // const Icon = menu.icon
  const menuIcon = menu.icon ? (
    // <Icon
    //   strokeWidth={1.5}
    //   size="1.3rem"
    //   style={{ marginTop: "auto", marginBottom: "auto" }}
    // />
    <Icon>{menu.icon}</Icon>
  ) : (
    <Icon
      sx={{
        width: selected === menu.id ? 8 : 6,
        height: selected === menu.id ? 8 : 6,
      }}
    >
      fiber_manual_record
    </Icon>
  )

  return (
    <>
      <ListItemButton
        sx={{
          borderRadius: `${borderRadius}px`,
          mb: 0.5,
          alignItems: "flex-start",
          backgroundColor: level > 1 ? "transparent !important" : "inherit",
          py: level > 1 ? 1 : 1.25,
          pl: `${level * 24}px`,
        }}
        selected={selected === menu.id}
        onClick={handleClick}
      >
        <ListItemIcon sx={{ my: "auto", minWidth: !menu.icon ? 18 : 36 }}>
          {menuIcon}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              // variant={selected === menu.id ? "h5" : "body1"}
              color="inherit"
              sx={{ my: "auto", fontWeight: "bold" }}
            >
              {menu.title}
            </Typography>
          }
          secondary={
            menu.caption && (
              <Typography
                variant="caption"
                // sx={{ ...theme.typography.subMenuCaption }}
                display="block"
                gutterBottom
              >
                {menu.caption}
              </Typography>
            )
          }
        />
        {open ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{
            position: "relative",
            "&:after": {
              content: "''",
              position: "absolute",
              left: "32px",
              top: 0,
              height: "100%",
              width: "1px",
              opacity: 1,
              background: theme.palette.primary.light,
            },
          }}
        >
          {items}
        </List>
      </Collapse>
    </>
  )
}

export default NavCollapse
