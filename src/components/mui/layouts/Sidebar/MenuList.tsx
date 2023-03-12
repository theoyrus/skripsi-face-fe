import menuItems from "@/infra/routes/menus"
import Typography from "@mui/material/Typography/Typography"
import NavCollapse from "./NavCollapse"
import NavGroup from "./NavGroup"
import NavItem from "./NavItem"

const MenuList = () => {
  const navItems = menuItems.items.map((item) => {
    if (item.type == "group") {
      return <NavGroup key={item.id} item={item} />
    } else if ((item.children?.length ?? 0) > 0) {
      // punya child
      return <NavCollapse key={item.id} menu={item} level={1} />
    } else if ((item.children?.length ?? 0) == 0) {
      // item menu
      return <NavItem key={item.id} item={item} level={1} />
    } else {
      return (
        <Typography key={item.id} variant="h6" color="error" align="center">
          Menu Items Error..
        </Typography>
      )
    }
    // switch (item.type) {
    //   case "group":
    //     return <NavGroup key={item.id} item={item} />
    //   default:
    //     return (
    //       <Typography key={item.id} variant="h6" color="error" align="center">
    //         Menu Items Error.
    //       </Typography>
    //     )
    // }
  })

  return <>{navItems}</>
}

export default MenuList
