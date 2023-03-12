import {
  IAuthLoginReq,
  IAuthLoginRes,
  IAuthRefreshRes,
} from "@/apps/auth/data/auth"

import EndPoints from "@/infra/api/endpoints"
import { TokenService } from "./token.service"
import { httpClient } from "@/infra/api/axios/axios.client"

export const AuthAPI = {
  login: async ({ email, password }: IAuthLoginReq): Promise<IAuthLoginRes> => {
    try {
      const res = await httpClient.post<IAuthLoginRes>(EndPoints.LOGIN, {
        email,
        password,
      })
      return res.data
    } catch (e) {
      throw e
    }
  },

  refresh: async (): Promise<IAuthRefreshRes> => {
    try {
      const refreshToken = TokenService.getRefreshToken()
      const res = await httpClient.post(EndPoints.JWT_REFRESH, {
        refresh: refreshToken,
      })
      return res.data
    } catch (e) {
      throw e
    }
  },
}
