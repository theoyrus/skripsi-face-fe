import { lazy } from "react"
import { RouteObject } from "react-router-dom"

import PageLayout from "@/components/mui/layouts/PageLayout"
import LoaderApp from "@/components/mui/LoaderApp"

const CitraWajahPage = LoaderApp(
  lazy(() => import("./views/citrawajah/CitraWajahPage"))
)

const routes: RouteObject[] = [
  {
    path: "citrawajah",
    element: (
      <>
        <PageLayout title="Data CitraWajah">
          <CitraWajahPage />
        </PageLayout>
      </>
    ),
  },
]
export { routes }
