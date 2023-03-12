import Button from "@mui/material/Button/Button"
import Icon from "@mui/material/Icon/Icon"
import Stack from "@mui/material/Stack/Stack"

import DivisiList from "../components/mui/DivisiList"
import { DivisiForm, useDivisiForm } from "../components/mui/DivisiForm"

const DivisiPage = () => {
  const { tambah } = useDivisiForm()
  return (
    <div>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <Button
          size="small"
          variant="contained"
          color="success"
          onClick={tambah}
        >
          <Icon>add</Icon>
          Tambah
        </Button>
      </Stack>
      <DivisiList />
      <DivisiForm />
    </div>
  )
}

export default DivisiPage
