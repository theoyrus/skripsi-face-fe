export interface User {
  url?: string
  id?: number
  username?: string
  email?: string
  first_name?: string
  last_name?: string
  groups?: string[]
}

export interface IUserListRes {
  meta?: Meta
  data?: User[]
}

export interface IUserListReq {
  page?: number
  limit?: number
  filter?: string
}

export interface Meta {
  total?: number
  perPage?: number
  current?: number
  next?: string | null
  prev?: string | null
}
