import { Karyawan } from "@/apps/karyawan/data/karyawan"

export interface Kehadiran {
  presensi_id?: number
  karyawan?: Karyawan
  karyawan_id?: number
  jenis?: string
  tanggal?: Date | any
  waktu_hadir?: Date | any
  waktu_pulang?: Date | any
  created?: Date
  updated?: Date
}

export interface IKehadiranListRes {
  meta?: Meta
  data?: Kehadiran[]
}

export interface IKehadiranListReq {
  page?: number
  limit?: number
  filter?: string
}

export interface IKehadiranCreateReq {
  presensi_id: number
  jenis: string
}

export interface IKehadiranUpdateReq {
  presensi_id: number
  jenis: string
}

export interface Meta {
  total?: number
  perPage?: number
  current?: number
  next?: string | null
  prev?: string | null
}
