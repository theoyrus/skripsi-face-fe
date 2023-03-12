import { AuthService } from "@/apps/auth/services/auth.service"
import { TokenService } from "@/apps/auth/services/token.service"
import { logger } from "@/infra/log/logger"
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios"

export const refreshAccessTokenFn = async () => {
  try {
    await AuthService.refresh()
  } catch (e) {
    AuthService.logout()
    throw e
  }
}

export const onAuthRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const accessToken = TokenService.getAccessToken()
  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    } as any
  } else {
    config.headers = {
      Accept: "application/json",
    } as any
  }

  logger.log(`[Request] [${JSON.stringify(config)}]`)

  return config
}

export const onAuthResponseDone = (response: AxiosResponse) => {
  logger.log(`[Response Done] [${JSON.stringify(response)}]`)
  return response
}

export const onAuthResponseError = async (error: AxiosError) => {
  // handle error
  logger.log(`[Response Error] [${error}]`)
  // const errData = error.response?.data as IResponseApiError
  if (error.response?.status == 401) {
    logger.log("jalankan refresh Token ...")
    refreshAccessTokenFn().catch((e) => {
      logger.log("gagal refresh token, redirect ke login")
      location.href = "/"
    })
  }
  return Promise.reject(error)
}
