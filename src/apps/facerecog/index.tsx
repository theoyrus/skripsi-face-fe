import { lazy } from "react"
import { RouteObject } from "react-router-dom"

import AppLoader from "@/components/AppLoader"

const PageLayout = lazy(() => import("@/components/mui/layouts/PageLayout"))
const CitraWajahPage = AppLoader(
  lazy(() => import("./views/citrawajah/CitraWajahPage"))
)

const routes: RouteObject[] = [
  {
    path: "citrawajah",
    element: (
      <>
        <PageLayout title="Data Citra Wajah">
          <CitraWajahPage />
        </PageLayout>
      </>
    ),
  },
]
export { routes }
