import MainCard from "@/components/mui/cards/MainCard"
import Grid from "@mui/material/Grid/Grid"
import MenuItem from "@mui/material/MenuItem/MenuItem"
import TextField from "@mui/material/TextField/TextField"
import Typography from "@mui/material/Typography/Typography"
import { ApexOptions } from "apexcharts"
import { useState } from "react"
// import ApexCharts from 'apexcharts';
import Chart from "react-apexcharts"

const BarChart = () => {
  const series = [
    {
      name: "Hadir",
      data: [39, 38, 37, 39, 40, 40, 39],
    },
    {
      name: "Tidak Hadir",
      data: [1, 2, 3, 1, 0, 0, 1],
    },
  ]

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "bar",
    },
    title: {
      text: "Kehadiran Karyawan",
      align: "center",
      // style: { color: "white" },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        // endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
    },
    yaxis: {
      title: {
        text: "Orang",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} karyawan`,
      },
    },
  }

  return <Chart options={options} series={series} type="bar" height={350} />
}

const status = [
  {
    value: "mingguini",
    label: "Minggu Ini",
  },
  {
    value: "month",
    label: "This Month",
  },
  {
    value: "year",
    label: "This Year",
  },
]

const KehadiranChart = () => {
  const [value, setValue] = useState("mingguini")
  return (
    <MainCard>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography>Kehadiran Karyawan</Typography>
            </Grid>
            <Grid item>
              <TextField
                id="standard-select-currency"
                select
                value={value}
                onChange={(e) => setValue(e.target.value)}
              >
                {status.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {/* <Chart {...chartData} /> */}
        <BarChart />
      </Grid>
    </MainCard>
  )
}

export default KehadiranChart
