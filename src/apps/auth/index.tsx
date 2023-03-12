import LoaderApp from "@/components/mui/LoaderApp"
import { lazy } from "react"
import { RouteObject } from "react-router-dom"
const LoginPage = LoaderApp(lazy(() => import("./views/login/login.page")))

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
