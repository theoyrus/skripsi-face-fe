import { lazy } from "react"
import { RouteObject } from "react-router-dom"

import PageLayout from "@/components/mui/layouts/PageLayout"
import LoaderApp from "@/components/mui/LoaderApp"

const KaryawanPage = LoaderApp(lazy(() => import("./views/KaryawanPage")))
const DivisiPage = LoaderApp(lazy(() => import("./views/DivisiPage")))

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
