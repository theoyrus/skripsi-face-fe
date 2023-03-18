import Button from "@mui/material/Button/Button"
import Icon from "@mui/material/Icon/Icon"
import Stack from "@mui/material/Stack/Stack"

import {
  KehadiranForm,
  useKehadiranForm,
} from "../../components/mui/KehadiranForm"
import KehadiranList from "../../components/mui/KehadiranList"

const KehadiranPage = () => {
  const { tambah } = useKehadiranForm()
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
      <KehadiranList />
      <KehadiranForm />
    </div>
  )
}

export default KehadiranPage
