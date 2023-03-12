export interface Divisi {
  divisi_id?: number
  kode?: string
  nama?: string
}

export interface IDivisiListRes {
  meta?: Meta
  data?: Divisi[]
}

export interface IDivisiListReq {
  page?: number
  limit?: number
  filter?: string
}

export interface IDivisiCreateReq {
  kode?: string
  nama?: string
}

export interface IDivisiUpdateReq {
  kode?: string
  nama?: string
}

export interface Meta {
  total?: number
  perPage?: number
  current?: number
  next?: string | null
  prev?: string | null
}
