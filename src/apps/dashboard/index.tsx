import { lazy } from "react"
import { RouteObject } from "react-router-dom"

import AppLoader from "@/components/AppLoader"

const PageLayout = lazy(() => import("@/components/mui/layouts/PageLayout"))
const DashboardPage = AppLoader(lazy(() => import("./views")))

const routes: RouteObject[] = [
  {
    path: "",
    element: (
      <>
        <PageLayout title="Grafik & Ringkasan">
          <DashboardPage />
        </PageLayout>
      </>
    ),
  },
]
export { routes }
