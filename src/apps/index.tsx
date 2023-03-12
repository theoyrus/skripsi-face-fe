import { Button } from "@mui/material"
import { Outlet, RouteObject } from "react-router-dom"

import DashboardPage from "@/apps/dashboard/views"
import { routes as KaryawanRoutes } from "@/apps/karyawan"
import { routes as FaceRecogRoutes } from "@/apps/facerecog"

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
  {
    path: "karyawan",
    element: (
      <>
        <Outlet />
      </>
    ),
    children: KaryawanRoutes,
  },
  {
    path: "facerecog",
    element: (
      <>
        <Outlet />
      </>
    ),
    children: FaceRecogRoutes,
  },
]
export { routes }
