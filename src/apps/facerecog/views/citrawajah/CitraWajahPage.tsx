import Button from "@mui/material/Button/Button"
import Icon from "@mui/material/Icon/Icon"
import Stack from "@mui/material/Stack/Stack"

import {
  CitraWajahForm,
  useCitraWajahForm,
} from "../../components/mui/CitraWajahForm"
import CitraWajahList from "../../components/mui/CitraWajahList"

const CitraWajahPage = () => {
  const { tambah } = useCitraWajahForm()
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
      <CitraWajahList />
      <CitraWajahForm />
    </div>
  )
}

export default CitraWajahPage
