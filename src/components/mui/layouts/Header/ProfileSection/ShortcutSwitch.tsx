import React, { useState } from "react"

import Card from "@mui/material/Card/Card"
import CardContent from "@mui/material/CardContent/CardContent"
import Grid from "@mui/material/Grid/Grid"
import { useTheme } from "@mui/material/styles"
import Switch from "@mui/material/Switch/Switch"
import Typography from "@mui/material/Typography/Typography"

const ShorcutSwitch = () => {
  const theme = useTheme()
  const [sdm, setSdm] = useState(true)
  const [notification, setNotification] = useState(false)
  return (
    <>
      <Card
        sx={{
          bgcolor: theme.palette.primary.contrastText,
          my: 2,
        }}
      >
        <CardContent>
          <Grid container spacing={3} direction="column">
            <Grid item>
              <Grid
                item
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography variant="subtitle1">Start DND Mode</Typography>
                </Grid>
                <Grid item>
                  <Switch
                    color="primary"
                    checked={sdm}
                    onChange={(e) => setSdm(e.target.checked)}
                    name="sdm"
                    size="small"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid
                item
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography variant="subtitle1">
                    Allow Notifications
                  </Typography>
                </Grid>
                <Grid item>
                  <Switch
                    checked={notification}
                    onChange={(e) => setNotification(e.target.checked)}
                    name="sdm"
                    size="small"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default ShorcutSwitch
