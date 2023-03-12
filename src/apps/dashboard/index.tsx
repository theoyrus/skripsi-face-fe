import LoaderApp from "@/components/mui/LoaderApp"
import { Button } from "@mui/material"
import { lazy } from "react"
import { RouteObject } from "react-router-dom"
const DashboardPage = LoaderApp(lazy(() => import("./views")))

const routes: RouteObject[] = [
  {
    path: "",
    element: (
      <>
        <DashboardPage />
        <Button>AAA</Button>
      </>
    ),
  },
]
export { routes }
