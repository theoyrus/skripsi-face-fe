import { atom, useAtom } from "jotai"
import { ReactNode } from "react"

import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import Grid from "@mui/material/Grid/Grid"

const formDialogIsOpenAtom = atom(false)

export const useFormDialog = () => {
  const [isDialogOpen, setOpen] = useAtom(formDialogIsOpenAtom)

  const dialogOpen = () => {
    setOpen(true)
  }

  const dialogClose = () => {
    setOpen(false)
  }
  return { isDialogOpen, dialogOpen, dialogClose } as const
}

interface FormDialogProps {
  title?: string
  children?: ReactNode
  actions?: ReactNode
}

export const FormDialog = ({ title, children, actions }: FormDialogProps) => {
  const { isDialogOpen, dialogClose } = useFormDialog()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <>
      <Dialog
        disableEnforceFocus={true}
        fullScreen={fullScreen}
        fullWidth={true}
        open={isDialogOpen}
        onClose={dialogClose}
        aria-labelledby="form-dialog-title"
      >
        {title ? (
          <DialogTitle id="form-dialog-title">
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={9}>
                {title}
              </Grid>
              <Grid item xs={2}>
                <Button
                  color="error"
                  variant="contained"
                  size="small"
                  onClick={dialogClose}
                >
                  X
                </Button>
              </Grid>
            </Grid>
          </DialogTitle>
        ) : null}
        <DialogContent>{children}</DialogContent>
        {actions ? <DialogActions>{actions}</DialogActions> : null}
      </Dialog>
    </>
  )
}
