import { lazy } from "react"
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom"

import { routes as AppsRoutes } from "@/apps"
import { routes as AuthRoutes } from "@/apps/auth"
import AppLoader from "@/components/AppLoader"
import ErrorPage from "@/components/mui/pages/error.page"

import { GuardRoute } from "./guard"

const UiKitWrapper = AppLoader(lazy(() => import("../uikit/UiKitWrapper")))
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: (
      <>
        <Navigate to={"/app"} replace />
      </>
    ),
  },
  {
    path: "auth",
    children: AuthRoutes,
  },
  {
    path: "app",
    element: (
      <>
        <GuardRoute>
          <UiKitWrapper>
            <Outlet />
          </UiKitWrapper>
        </GuardRoute>
      </>
    ),
    children: AppsRoutes,
  },
])

export default router
