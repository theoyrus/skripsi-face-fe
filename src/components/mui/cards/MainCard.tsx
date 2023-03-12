import Card from "@mui/material/Card/Card"
import CardContent from "@mui/material/CardContent/CardContent"
import CardHeader from "@mui/material/CardHeader/CardHeader"
import Divider from "@mui/material/Divider/Divider"
import { useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography/Typography"
import { forwardRef, Ref } from "react"
interface Props {
  border?: boolean
  boxShadow?: boolean
  children?: React.ReactNode
  content?: boolean
  contentClass?: string
  contentSX?: Record<string, any>
  darkTitle?: boolean
  secondary?: React.ReactNode | string | Record<string, any> | any
  shadow?: string
  sx?: Record<string, any>
  title?: React.ReactNode | string | Record<string, any> | any
}

const headerSX = {
  "& .MuiCardHeader-action": { mr: 0 },
}

const MainCard = forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentClass = "",
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      ...others
    }: Props,
    ref: Ref<HTMLDivElement>
  ) => {
    const theme = useTheme()

    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          border: border ? "1px solid" : "none",
          // borderColor: theme.palette.primary[200] + 25,
          ":hover": {
            boxShadow: boxShadow
              ? shadow || "0 2px 14px 0 rgb(32 40 45 / 8%)"
              : "inherit",
          },
          ...sx,
        }}
      >
        {/* card header and action */}
        {title && (
          <CardHeader
            sx={headerSX}
            title={title}
            // title={
            //   darkTitle ? <Typography variant="h3">{title}</Typography> : title
            // }
            action={secondary}
          />
        )}

        {/* content & header divider */}
        {title && <Divider />}

        {/* card content */}
        {content && (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    )
  }
)
export default MainCard
