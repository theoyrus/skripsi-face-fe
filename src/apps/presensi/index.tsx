import { lazy } from "react"
import { RouteObject } from "react-router-dom"

import PageLayout from "@/components/mui/layouts/PageLayout"
import LoaderApp from "@/components/mui/LoaderApp"

const KehadiranPage = LoaderApp(
  lazy(() => import("./views/kehadiran/KehadiranPage"))
)

const routes: RouteObject[] = [
  {
    path: "kehadiran",
    element: (
      <>
        <PageLayout title="Data Presensi">
          <KehadiranPage />
        </PageLayout>
      </>
    ),
  },
]
export { routes }
