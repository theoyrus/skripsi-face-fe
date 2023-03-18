import { lazy } from "react"
import { RouteObject } from "react-router-dom"

import AppLoader from "@/components/AppLoader"

const LoginPage = AppLoader(lazy(() => import("./views/login/login.page")))

const routes: RouteObject[] = [
  {
    path: "login",
    element: (
      <>
        <LoginPage />
      </>
    ),
  },
  {
    path: "reset",
    element: <>RESET</>,
  },
]
export { routes }
