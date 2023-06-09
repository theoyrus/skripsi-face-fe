import { atom, useAtom } from "jotai"
import { SyntheticEvent, useEffect, useState } from "react"
import {
  AutocompleteElement,
  FormContainer,
  Controller,
  SubmitHandler,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"

import { FormDialog, useFormDialog } from "@/components/mui/dialogs/FormDialog"
import Button from "@mui/material/Button/Button"
import Icon from "@mui/material/Icon/Icon"
import { useQueryClient } from "@tanstack/react-query"

import { CitraWajahAPI } from "../../services/citrawajah.api"
import { useConfirm } from "material-ui-confirm"

import { parseError } from "@/infra/api/axios/utils"
import FormControl from "@mui/material/FormControl/FormControl"
import InputLabel from "@mui/material/InputLabel/InputLabel"
import Input from "@mui/material/Input/Input"
import InputAdornment from "@mui/material/InputAdornment/InputAdornment"
import IconButton from "@mui/material/IconButton/IconButton"
import {
  CitraWajah,
  ICitraWajahCreateReq,
  ICitraWajahUpdateReq,
} from "../../data/citrawajah"
import { useKaryawanData } from "@/apps/karyawan/components/KaryawanData"
import { MuiFileInput } from "mui-file-input"
import Typography from "@mui/material/Typography/Typography"
import * as zod from "zod"

const RQ_KEY = "citrawajah"

interface ICitraWajahForm extends CitraWajah {
  cmd?: "add" | "edit"
  citra?: File
}

const citrawajahFormAtom = atom<ICitraWajahForm>({
  cmd: "add",
})

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"]
const schema = zod
  .object({
    cmd: zod.string(),
    karyawan_id: zod.number().positive({ message: "Mohon pilih karyawan" }),
    citra: zod
      .custom<File>((v) => v instanceof File)
      .refine((file) => file != undefined, "Image is required.")
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only .jpg, .jpeg, and .png formats are supported."
      ),
  })
  .required()

export const useCitraWajahForm = () => {
  const [formData, setFormData] = useAtom(citrawajahFormAtom)
  const { isDialogOpen, dialogOpen, dialogClose } = useFormDialog()
  const queryClient = useQueryClient()
  const confirm = useConfirm()

  const onSubmit: SubmitHandler<ICitraWajahForm> = async (data) => {
    const fData = {
      karyawan: data.karyawan_id,
      nama: data.citra,
    }
    console.log(fData)
    if (data.cmd == "add") {
      await CitraWajahAPI.create(fData as ICitraWajahCreateReq)
        .then(() => {
          toast.success("Berhasil disimpan :)")
          dialogClose()
          refresh()
          CitraWajahAPI.training()
        })
        .catch((e) => {
          let err = parseError(e)
          toast.warning(() => (
            <>
              Maaf, mohon cek isian form.
              <br />
              <code>{err}</code>
            </>
          ))
        })
    } else {
      CitraWajahAPI.update(
        data.citrawajah_id ?? 0,
        fData as ICitraWajahUpdateReq
      ).then(() => {
        toast.success("Berhasil disimpan :)")
        dialogClose()
        refresh()
      })
    }
  }

  // let formContext = useForm<ICitraWajahForm>()
  let formContext = useForm<ICitraWajahForm>({ resolver: zodResolver(schema) })

  const tambah = () => {
    setFormData({ cmd: "add", karyawan_id: 0, citra: undefined })
    dialogOpen()
  }
  const edit = (data: ICitraWajahForm) => {
    // data["user_id"] = data.user?.id
    setFormData({ ...data, ...{ cmd: "edit" } })
    dialogOpen()
  }
  const fillForm = () => {
    Object.keys(formData).forEach((key) => {
      const col = key as keyof ICitraWajahForm
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
        CitraWajahAPI.delete(id)
          .then(() => {
            toast.success("Berhasil dihapus")
            refresh()
            CitraWajahAPI.training()
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

export const CitraWajahForm = () => {
  const { fillForm, simpan, formContext, isDialogOpen, dialogClose, formData } =
    useCitraWajahForm()
  const {
    karyawanOptionsMUI,
    handleFilterServer: handleFilterKaryawan,
    karyawanQueryIsLoading,
  } = useKaryawanData()
  const [showKaryawanCombo, setshowKaryawanCombo] = useState(true)

  useEffect(() => {
    fillForm()
    setshowKaryawanCombo(formData.cmd == "add")
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
          <br />
          {formData.cmd == "edit" && !showKaryawanCombo ? (
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Karyawan
              </InputLabel>
              <Input
                disabled
                defaultValue={formData.karyawan?.nama}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="cari karyawan"
                      onClick={() => {
                        setshowKaryawanCombo(true)
                      }}
                    >
                      <Icon>search</Icon>
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          ) : null}
          {showKaryawanCombo ? (
            <>
              <AutocompleteElement
                matchId
                options={karyawanOptionsMUI as any}
                name="karyawan_id"
                label="Karyawan"
                required
                rules={{
                  required: "Please fill out.",
                }}
                loading={karyawanQueryIsLoading}
                textFieldProps={{ onChange: handleFilterKaryawan }}
              />
            </>
          ) : null}
          <br />
          <br />
          <Typography component="label">Citra Wajah</Typography>
          <br />
          <Controller
            name="citra"
            control={formContext.control}
            render={({ field, fieldState }) => (
              <MuiFileInput
                {...field}
                variant="standard"
                helperText={fieldState.invalid ? "Berkas tidak sesuai" : ""}
                error={fieldState.invalid}
              />
            )}
          />
          {/* {formContext.formState.errors.citra?.message && (
            <p>{formContext.formState.errors.citra?.message}</p>
          )} */}
        </FormContainer>
      </FormDialog>
    </div>
  )
}
