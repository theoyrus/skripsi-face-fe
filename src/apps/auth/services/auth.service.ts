import { AuthAPI } from "./auth.api"
import { TokenService } from "./token.service"

export const AuthService = {
  isLoggedIn: () => {
    return Boolean(TokenService.getAccessToken())
  },
  login: async (username: string, password: string) => {
    try {
      const data = await AuthAPI.login({ email: username, password })
      TokenService.saveToken(data.access as string)
      TokenService.saveRefreshToken(data.refresh as string)
    } catch (e) {
      throw e
    }
  },
  logout: async () => {
    TokenService.saveToken("")
    TokenService.saveRefreshToken("")
  },
  refresh: async () => {
    try {
      const data = await AuthAPI.refresh()
      TokenService.saveToken(data.access as string)
    } catch (e) {
      throw e
    }
  },
}
