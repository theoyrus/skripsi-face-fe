import Divider from "@mui/material/Divider/Divider"
import Grid from "@mui/material/Grid/Grid"
import Typography from "@mui/material/Typography/Typography"

const gridSpacing = 3

export const DashboardMUI = () => {
  return (
    <>
      <Typography variant="h4">Grafik & Ringkasan</Typography>
      <Divider />
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              {/* <EarningCard isLoading={isLoading} /> */}
              Earning
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              {/* <TotalOrderLineChartCard isLoading={isLoading} /> */}
              Total Order
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item sm={6} xs={12} md={6} lg={12}>
                  {/* <TotalIncomeDarkCard isLoading={isLoading} /> */}
                  Total Income
                </Grid>
                <Grid item sm={6} xs={12} md={6} lg={12}>
                  {/* <TotalIncomeLightCard isLoading={isLoading} /> */}
                  TotalIncom Dark
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={8}>
              {/* <TotalGrowthBarChart isLoading={isLoading} /> */}
              Total Growth
            </Grid>
            <Grid item xs={12} md={4}>
              {/* <PopularCard isLoading={isLoading} /> */}
              Popular
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
