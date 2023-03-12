import { atom, useAtom } from "jotai"
import { forwardRef } from "react"

import MuiAlert, { AlertProps } from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"

type Severity = "success" | "info" | "warning" | "error"

interface ISnackbarData {
  isOpen?: boolean
  message?: string
  severity?: Severity
  duration?: number
}

const SnackbarNotifAtom = atom<ISnackbarData>({
  isOpen: false,
  message: "",
  severity: "info",
  duration: 4000,
})

export const useSnackbarNotif = () => {
  const [snackbarData, setSnackbarData] = useAtom(SnackbarNotifAtom)

  const snackbarOpen = (
    message: string,
    severity: Severity,
    duration?: number
  ) => {
    setSnackbarData({ isOpen: true, message, severity, duration })
  }

  const snackbarClose = () => {
    setSnackbarData({ isOpen: false })
  }
  return {
    snackbarData,
    snackbarOpen,
    snackbarClose,
  } as const
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const SnackbarNotif = () => {
  const { snackbarData, snackbarClose } = useSnackbarNotif()
  const { isOpen, message, severity, duration } = snackbarData
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isOpen}
        autoHideDuration={duration}
        onClose={snackbarClose}
        message={message}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </>
  )
}
