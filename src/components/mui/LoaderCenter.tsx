import { CircularProgress } from "@mui/material"
import Center from "./Center"

const LoaderCenter = () => {
  return (
    <Center justifyContent="start">
      <CircularProgress />
    </Center>
  )
}

export default LoaderCenter
