export interface GenericResponse {
  data: {}
}

export interface IResponseApiError {
  type?: string
  error?: ApiError
}

export interface ApiError {
  status_code?: number
  status?: string
  message?: string
  data?: Data
}

export interface Data {
  detail?: string | string[]
}
