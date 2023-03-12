import Grid from "@mui/material/Grid/Grid"
import { FunctionComponent, PropsWithChildren, ReactNode } from "react"

interface CenterProps {
  children: ReactNode
  justifyContent?:
    | "baseline"
    | "center"
    | "start"
    | "end"
    | "flex-start"
    | "flex-end"
}

// const Center: FunctionComponent<PropsWithChildren> = ({ children }) => {
const Center: FunctionComponent<CenterProps> = ({
  children,
  justifyContent,
}) => {
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        justifyContent={justifyContent}
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          {children}
        </Grid>
      </Grid>
    </>
  )
}
export default Center
