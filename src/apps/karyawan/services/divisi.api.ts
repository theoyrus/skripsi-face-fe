import EndPoints from "@/infra/api/endpoints"
import { apiClient } from "@/infra/api/axios/axios.client"
import {
  IDivisiListReq,
  IDivisiListRes,
  IDivisiUpdateReq,
} from "../data/divisi"

export const DivisiAPI = {
  list: async ({ page = 1, limit = 10, filter = "" }: IDivisiListReq) => {
    const res = await apiClient.get<IDivisiListRes>(EndPoints.DIVISI, {
      params: { page, limit, search: filter },
    })
    return res.data
  },
  create: async (data: IDivisiUpdateReq) => {
    const res = await apiClient.post(`${EndPoints.DIVISI}`, data)
    return res.data
  },
  update: async (id: number, data: IDivisiUpdateReq) => {
    const res = await apiClient.put(`${EndPoints.DIVISI}/${id}`, data)
    return res.data
  },
  delete: async (id: number) => {
    const res = await apiClient.delete(`${EndPoints.DIVISI}/${id}`)
    return res.data
  },
}
