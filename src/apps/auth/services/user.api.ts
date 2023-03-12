import { apiClient } from "@/infra/api/axios/axios.client"
import EndPoints from "@/infra/api/endpoints"

import { IUserListReq, IUserListRes } from "../data/user"

export const UserAPI = {
  list: async ({ page = 1, limit = 10, filter = "" }: IUserListReq) => {
    const res = await apiClient.get<IUserListRes>(EndPoints.USER, {
      params: { page, limit, search: filter },
    })
    return res.data
  },
}
