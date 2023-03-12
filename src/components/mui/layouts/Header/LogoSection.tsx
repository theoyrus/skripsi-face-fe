import HeadLogo from "@/assets/head-logo.svg"
import { useTheme } from "@mui/material/styles"

const LogoSection = () => {
  const isLight = useTheme().palette.mode === "light"
  const filter = isLight ? { filter: "invert(100%)" } : {}
  return <img src={HeadLogo} style={{ width: "120px", ...filter }} />
}

export default LogoSection
