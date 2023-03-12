import axios from "axios"

import EndPoints from "../endpoints"
import {
  onAuthRequest,
  onAuthResponseDone,
  onAuthResponseError,
} from "./interceptor"

export const baseURL = EndPoints.BASEURL

export const httpClient = axios.create({
  baseURL,
})

export const apiClient = axios.create({
  baseURL,
})

// auth interceptors
apiClient.interceptors.request.use(onAuthRequest)
apiClient.interceptors.response.use(onAuthResponseDone, onAuthResponseError)

// non auth interceptor
httpClient.interceptors.request.use(onAuthRequest)
