import Box from "@mui/material/Box/Box"
import Divider from "@mui/material/Divider/Divider"
import Grid from "@mui/material/Grid/Grid"
import Typography from "@mui/material/Typography/Typography"
import { ReactNode } from "react"

import PerfectScrollbar from "react-perfect-scrollbar"

interface PageLayoutProps {
  title?: string
  children?: ReactNode
}

const PageLayout = ({ title, children }: PageLayoutProps) => {
  return (
    <>
      <PerfectScrollbar
        style={{
          height: "100%",
          maxHeight: "100vh",
          overflowX: "hidden",
        }}
      >
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                bgcolor: "background.paper",
                minHeight: "100vh",
                borderRadius: "5px",
                padding: "10px",
              }}
            >
              {title ? (
                <>
                  <Typography variant="h4">{title}</Typography>
                  <Divider />
                  <br />
                </>
              ) : null}
              {children}
            </Box>
          </Grid>
        </Grid>
      </PerfectScrollbar>
    </>
  )
}
export default PageLayout
