import "./index.scss"
import "react-toastify/dist/ReactToastify.min.css"

import React from "react"
import ReactDOM from "react-dom/client"
import { ToastContainer } from "react-toastify"

import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import App from "./App"
import { queryClient } from "./infra/api/react-query/query.client"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    <ToastContainer />
  </React.StrictMode>
)
