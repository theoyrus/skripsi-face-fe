import EndPoints from "@/infra/api/endpoints"
import { apiClient } from "@/infra/api/axios/axios.client"
import {
  IKehadiranCreateReq,
  IKehadiranListReq,
  IKehadiranListRes,
  IKehadiranUpdateReq,
} from "../data/kehadiran"

export const KehadiranAPI = {
  list: async ({ page = 1, limit = 10, filter = "" }: IKehadiranListReq) => {
    const res = await apiClient.get<IKehadiranListRes>(EndPoints.KEHADIRAN, {
      params: { page, limit, search: filter },
    })
    return res.data
  },
  create: async (data: IKehadiranCreateReq) => {
    const res = await apiClient.post(`${EndPoints.KEHADIRAN}`, data)
    return res.data
  },
  update: async (id: number, data: IKehadiranUpdateReq) => {
    const res = await apiClient.put(`${EndPoints.KEHADIRAN}/${id}`, data)
    return res.data
  },
  delete: async (id: number) => {
    const res = await apiClient.delete(`${EndPoints.KEHADIRAN}/${id}`)
    return res.data
  },
}
