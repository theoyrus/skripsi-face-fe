export interface IAuthLoginReq {
  email: string
  password: string
}

export interface IAuthLoginRes {
  refresh?: string
  access?: string
}

export interface IAuthRefreshReq {
  refresh: string
}

export interface IAuthRefreshRes {
  access?: string
}
