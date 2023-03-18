import { lazy } from "react"

import AppLoader from "@/components/AppLoader"
import Divider from "@mui/material/Divider/Divider"
import Grid from "@mui/material/Grid/Grid"
import Typography from "@mui/material/Typography/Typography"

const KehadiranChart = AppLoader(lazy(() => import("../charts/KehadiranChart")))

const gridSpacing = 3

export const DashboardMUI = () => {
  return (
    <>
      <Grid container spacing={gridSpacing}>
        {/* <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              Earning
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              Total Order
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item sm={6} xs={12} md={6} lg={12}>
                  Total Income
                </Grid>
                <Grid item sm={6} xs={12} md={6} lg={12}>
                  TotalIncom Dark
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid> */}

        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <KehadiranChart />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={8}>
              Total Growth
            </Grid>
            <Grid item xs={12} md={4}>
              Popular
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
