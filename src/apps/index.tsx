import { Outlet, RouteObject } from "react-router-dom"

import { routes as DashboardRoutes } from "@/apps/dashboard"
import { routes as KaryawanRoutes } from "@/apps/karyawan"
import { routes as FaceRecogRoutes } from "@/apps/facerecog"
import { routes as PresensiRoutes } from "@/apps/presensi"

const routes: RouteObject[] = [
  {
    path: "",
    element: (
      <>
        <Outlet />
      </>
    ),
    children: DashboardRoutes,
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
  {
    path: "presensi",
    element: (
      <>
        <Outlet />
      </>
    ),
    children: PresensiRoutes,
  },
]
export { routes }
