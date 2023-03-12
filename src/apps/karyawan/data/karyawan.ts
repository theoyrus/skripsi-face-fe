import { User } from "@/apps/auth/data/user"
import { Divisi } from "./divisi"

export interface Karyawan {
  karyawan_id?: number
  user?: User
  user_id?: number
  divisi?: Divisi
  divisi_id?: number
  noinduk?: string
  nama?: string
}

export interface IKaryawanListRes {
  meta?: Meta
  data?: Karyawan[]
}

export interface IKaryawanListReq {
  page?: number
  limit?: number
  filter?: string
}

export interface IKaryawanCreateReq {
  user: number
  divisi?: number
  noinduk?: string
  nama?: string
}

export interface IKaryawanUpdateReq {
  user: number
  divisi?: number
  noinduk?: string
  nama?: string
}

export interface Meta {
  total?: number
  perPage?: number
  current?: number
  next?: string | null
  prev?: string | null
}
