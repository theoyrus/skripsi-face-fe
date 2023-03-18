import { Karyawan } from "@/apps/karyawan/data/karyawan"

export interface CitraWajah {
  citrawajah_id?: number
  karyawan?: Karyawan
  karyawan_id?: number
  nama?: string
  created?: Date
  updated?: Date
}

export interface ICitraWajahListRes {
  meta?: Meta
  data?: CitraWajah[]
}

export interface ICitraWajahListReq {
  page?: number
  limit?: number
  filter?: string
}

export interface ICitraWajahCreateReq {
  karyawan: number
  nama: File
}

export interface ICitraWajahUpdateReq {
  karyawan: number
  nama: File
}

export interface Meta {
  total?: number
  perPage?: number
  current?: number
  next?: string | null
  prev?: string | null
}
