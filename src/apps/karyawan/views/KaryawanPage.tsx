import Button from "@mui/material/Button/Button"
import Icon from "@mui/material/Icon/Icon"
import Stack from "@mui/material/Stack/Stack"

import KaryawanList from "../components/mui/KaryawanList"
import { KaryawanForm, useKaryawanForm } from "../components/mui/KaryawanForm"

const KaryawanPage = () => {
  const { tambah } = useKaryawanForm()
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
      <KaryawanList />
      <KaryawanForm />
    </div>
  )
}

export default KaryawanPage
