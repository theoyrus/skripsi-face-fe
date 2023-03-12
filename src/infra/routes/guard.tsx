import { useAuth } from "@/apps/auth/services/auth.hook"
import { AuthService } from "@/apps/auth/services/auth.service"
import { ReactNode } from "react"
import { Navigate, Outlet } from "react-router-dom"

interface Props {
  isAllowed?: boolean
  redirectTo?: string
  children?: ReactNode
}

const GuardRoute = ({ isAllowed = false, redirectTo, children }: Props) => {
  const isLoggedIn = AuthService.isLoggedIn()
  if (!isLoggedIn && !isAllowed) {
    return <Navigate to={redirectTo ?? "/auth/login"} replace />
  }
  return children ? <>{children}</> : null
}

const GuardService = (isAllowed: boolean = false, redirectTo: string) => {
  const isLoggedIn = AuthService.isLoggedIn()
  if (!isLoggedIn && !isAllowed) {
    return <Navigate to={redirectTo ?? "/auth/login"} replace />
  }
  return false
}

export { GuardService, GuardRoute }
