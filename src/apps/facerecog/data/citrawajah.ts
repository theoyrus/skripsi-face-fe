export interface CitraWajah {
  citrawajah_id?: number
  karyawan?: string
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
  nama: string
}

export interface ICitraWajahUpdateReq {
  nama: string
}

export interface Meta {
  total?: number
  perPage?: number
  current?: number
  next?: string | null
  prev?: string | null
}
