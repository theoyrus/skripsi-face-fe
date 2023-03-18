import { atom, useAtom } from "jotai"
import { useEffect } from "react"
import {
  FormContainer,
  SubmitHandler,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui"
import { toast } from "react-toastify"

import { FormDialog, useFormDialog } from "@/components/mui/dialogs/FormDialog"
import Button from "@mui/material/Button/Button"
import Icon from "@mui/material/Icon/Icon"
import { useQueryClient } from "@tanstack/react-query"

import { Divisi } from "../../data/divisi"
import { DivisiAPI } from "../../services/divisi.api"
import { useConfirm } from "material-ui-confirm"

const RQ_KEY = "divisi"

interface IDivisiForm extends Divisi {
  cmd?: "add" | "edit"
}

const divisiFormAtom = atom<IDivisiForm>({ cmd: "add", kode: "", nama: "" })

export const useDivisiForm = () => {
  const [formData, setFormData] = useAtom(divisiFormAtom)
  const { isDialogOpen, dialogOpen, dialogClose } = useFormDialog()
  const queryClient = useQueryClient()
  const confirm = useConfirm()

  const onSubmit: SubmitHandler<IDivisiForm> = async (data) => {
    if (data.cmd == "add") {
      await DivisiAPI.create(data).then(() => {
        toast.success("Berhasil disimpan :)")
        dialogClose()
        refresh()
      })
    } else {
      await DivisiAPI.update(data.divisi_id ?? 0, data).then(() => {
        toast.success("Berhasil disimpan :)")
        dialogClose()
        refresh()
      })
    }
  }

  let formContext = useForm<IDivisiForm>()

  const tambah = () => {
    setFormData({ cmd: "add", kode: "", nama: "" })
    dialogOpen()
  }
  const edit = (data: IDivisiForm) => {
    setFormData({ ...data, ...{ cmd: "edit" } })
    dialogOpen()
  }
  const fillForm = () => {
    Object.keys(formData).forEach((key) => {
      const col = key as keyof IDivisiForm
      formContext.setValue(col, formData[col])
    })
  }
  const simpan = () => {
    formContext.handleSubmit(onSubmit)()
  }
  const refresh = () => {
    queryClient.invalidateQueries([RQ_KEY])
  }
  const hapus = (id: number) => {
    confirm({
      title: "Konfirmasi",
      description: `Apakah yakin menghapus data ini?`,
    })
      .then(() => {
        DivisiAPI.delete(id)
          .then(() => {
            toast.success("Berhasil dihapus")
            refresh()
          })
          .catch((e) => {
            toast.error(`Maaf, ada kesalahan ${e}`)
          })
      })
      .catch((e) => {})
  }
  return {
    tambah,
    edit,
    fillForm,
    simpan,
    refresh,
    hapus,
    formContext,
    isDialogOpen,
    dialogOpen,
    dialogClose,
    formData,
  } as const
}

export const DivisiForm = () => {
  const { fillForm, simpan, formContext, isDialogOpen, dialogClose, formData } =
    useDivisiForm()

  useEffect(() => {
    fillForm()
    return () => {}
  }, [isDialogOpen, formData])

  return (
    <div>
      <FormDialog
        title="Formulir Isian"
        actions={
          <>
            <Button color="error" variant="outlined" onClick={dialogClose}>
              <Icon>cancel</Icon> Batal
            </Button>
            <Button
              color="success"
              variant="outlined"
              onClick={simpan}
              disabled={formContext.formState.isSubmitting}
            >
              <Icon>save</Icon>
              {formContext.formState.isSubmitting
                ? "Menyimpan ..."
                : "Simpan"}{" "}
            </Button>
          </>
        }
      >
        <FormContainer
          formContext={formContext}
          // onSuccess={(data) => console.log(data)}
        >
          <TextFieldElement
            name="kode"
            label="Kode"
            required
            variant="standard"
            control={formContext.control}
          />
          <br />
          <br />
          <TextFieldElement
            name="nama"
            label="Nama"
            required
            variant="standard"
            fullWidth={true}
          />
        </FormContainer>
      </FormDialog>
    </div>
  )
}
