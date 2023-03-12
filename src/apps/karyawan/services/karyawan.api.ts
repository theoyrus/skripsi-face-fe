import EndPoints from "@/infra/api/endpoints"
import { apiClient } from "@/infra/api/axios/axios.client"
import {
  IKaryawanCreateReq,
  IKaryawanListReq,
  IKaryawanListRes,
  IKaryawanUpdateReq,
} from "../data/karyawan"

export const KaryawanAPI = {
  list: async ({ page = 1, limit = 10, filter = "" }: IKaryawanListReq) => {
    const res = await apiClient.get<IKaryawanListRes>(EndPoints.KARYAWAN, {
      params: { page, limit, search: filter },
    })
    return res.data
  },
  create: async (data: IKaryawanCreateReq) => {
    const res = await apiClient.post(`${EndPoints.KARYAWAN}`, data)
    return res.data
  },
  update: async (id: number, data: IKaryawanUpdateReq) => {
    const res = await apiClient.put(`${EndPoints.KARYAWAN}/${id}`, data)
    return res.data
  },
  delete: async (id: number) => {
    const res = await apiClient.delete(`${EndPoints.KARYAWAN}/${id}`)
    return res.data
  },
}
