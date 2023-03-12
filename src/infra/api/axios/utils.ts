import { AxiosError } from "axios"
import { IResponseApiError } from "./types"

export const parseError = (e: AxiosError) => {
  const resData = e.response?.data as IResponseApiError
  const errData = resData.error?.data?.detail as string
  if (!errData) {
    return JSON.stringify(resData.error?.data)
  }
  return errData
}
