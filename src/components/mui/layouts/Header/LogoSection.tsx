import HeadLogo from "@/assets/head-logo.svg"
import { useTheme } from "@mui/material/styles"

interface Props {
  isFilter?: boolean
}

const LogoSection = ({ isFilter = false }: Props) => {
  const isLight = useTheme().palette.mode === "light"
  const filter = isLight && isFilter ? { filter: "invert(100%)" } : {}
  return <img src={HeadLogo} style={{ width: "120px", ...filter }} />
}

export default LogoSection
