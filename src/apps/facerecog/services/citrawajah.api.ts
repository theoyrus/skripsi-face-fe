import EndPoints from "@/infra/api/endpoints"
import { apiClient } from "@/infra/api/axios/axios.client"
import {
  ICitraWajahCreateReq,
  ICitraWajahListReq,
  ICitraWajahListRes,
  ICitraWajahUpdateReq,
} from "../data/citrawajah"

export const CitraWajahAPI = {
  list: async ({ page = 1, limit = 10, filter = "" }: ICitraWajahListReq) => {
    const res = await apiClient.get<ICitraWajahListRes>(EndPoints.CITRAWAJAH, {
      params: { page, limit, search: filter },
    })
    return res.data
  },
  create: async (data: ICitraWajahCreateReq) => {
    const res = await apiClient.post(`${EndPoints.CITRAWAJAH}`, data)
    return res.data
  },
  update: async (id: number, data: ICitraWajahUpdateReq) => {
    const res = await apiClient.put(`${EndPoints.CITRAWAJAH}/${id}`, data)
    return res.data
  },
  delete: async (id: number) => {
    const res = await apiClient.delete(`${EndPoints.CITRAWAJAH}/${id}`)
    return res.data
  },
}
