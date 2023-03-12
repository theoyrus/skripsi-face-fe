import { INavItem } from "@/infra/routes/menus"
import Divider from "@mui/material/Divider/Divider"
import List from "@mui/material/List/List"
import { useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography/Typography"
import NavCollapse from "./NavCollapse"
import NavItem from "./NavItem"

interface NavGroupProps {
  item: INavItem
}

const NavGroup = ({ item }: NavGroupProps) => {
  const theme = useTheme()

  // menu list collapse & items
  const items = item.children?.map((menu) => {
    if (menu.type == "collapse" || (menu.children?.length ?? 0) > 0) {
      return <NavCollapse key={menu.id} menu={menu} level={1} />
    } else if (menu.type == "item" || (menu.children?.length ?? 0) == 0) {
      return <NavItem key={menu.id} item={menu} level={1} />
    } else {
      return (
        <Typography key={menu.id} variant="h6" color="error" align="center">
          Menu Items Errorx
        </Typography>
      )
    }
    // switch (menu.type) {
    //   case "collapse":
    //     return <NavCollapse key={menu.id} menu={menu} level={1} />
    //   case "item":
    //     return <NavItem key={menu.id} item={menu} level={1} />
    //   default:
    //     return (
    //       <Typography key={menu.id} variant="h6" color="error" align="center">
    //         Menu Items Errorx
    //       </Typography>
    //     )
    // }
  })

  return (
    <>
      <List
        subheader={
          item.title && (
            <Typography
              variant="caption"
              sx={{ ...theme.typography.button, fontWeight: "bold" }}
              display="block"
              gutterBottom
            >
              {item.title}
              {item.caption && (
                <Typography
                  variant="caption"
                  //   sx={{ ...theme.typography.subMenuCaption }}
                  display="block"
                  gutterBottom
                >
                  {item.caption}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        {items}
      </List>

      {/* group divider */}
      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
    </>
  )
}

export default NavGroup
