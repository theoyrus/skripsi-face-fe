const accessTokenKey = "access_token"
const refreshTokenKey = "refresh_token"

export const TokenService = {
  saveToken: (token: string) => {
    localStorage.setItem(accessTokenKey, token)
  },

  getAccessToken: () => localStorage.getItem(accessTokenKey) ?? "",

  saveRefreshToken: (accessToken: string) => {
    localStorage.setItem(refreshTokenKey, accessToken)
  },

  getRefreshToken: () => localStorage.getItem(refreshTokenKey) ?? "",
}
