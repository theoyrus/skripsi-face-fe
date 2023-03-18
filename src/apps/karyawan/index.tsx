import { lazy } from "react"
import { RouteObject } from "react-router-dom"

import AppLoader from "@/components/AppLoader"

const PageLayout = lazy(() => import("@/components/mui/layouts/PageLayout"))
const KaryawanPage = AppLoader(lazy(() => import("./views/KaryawanPage")))
const DivisiPage = AppLoader(lazy(() => import("./views/DivisiPage")))

const routes: RouteObject[] = [
  {
    path: "",
    element: (
      <>
        <PageLayout title="Data Karyawan">
          <KaryawanPage />
        </PageLayout>
      </>
    ),
  },
  {
    path: "divisi",
    element: (
      <>
        <PageLayout title="Data Divisi">
          <DivisiPage />
        </PageLayout>
      </>
    ),
  },
]
export { routes }
