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
import { toast } from "react-toastify"

import { FormDialog, useFormDialog } from "@/components/mui/dialogs/FormDialog"
import Button from "@mui/material/Button/Button"
import Icon from "@mui/material/Icon/Icon"
import { useQueryClient } from "@tanstack/react-query"

import { CitraWajahAPI } from "../../services/citrawajah.api"
import { useConfirm } from "material-ui-confirm"

import { parseError } from "@/infra/api/axios/utils"
import { useUserData } from "@/apps/auth/components/UserData"
import TextField from "@mui/material/TextField/TextField"
import FormControl from "@mui/material/FormControl/FormControl"
import InputLabel from "@mui/material/InputLabel/InputLabel"
import Input from "@mui/material/Input/Input"
import InputAdornment from "@mui/material/InputAdornment/InputAdornment"
import IconButton from "@mui/material/IconButton/IconButton"
import { CitraWajah, ICitraWajahCreateReq } from "../../data/citrawajah"
import { useKaryawanData } from "@/apps/karyawan/components/KaryawanData"

const RQ_KEY = "karyawan"

interface ICitraWajahForm extends CitraWajah {
  cmd?: "add" | "edit"
}

const karyawanFormAtom = atom<ICitraWajahForm>({
  cmd: "add",
})

export const useCitraWajahForm = () => {
  const [formData, setFormData] = useAtom(karyawanFormAtom)
  const { isDialogOpen, dialogOpen, dialogClose } = useFormDialog()
  const queryClient = useQueryClient()
  const confirm = useConfirm()

  const onSubmit: SubmitHandler<ICitraWajahForm> = (data) => {
    const fData = {
      ...data,
      karyawan: data.karyawan_id,
    }
    if (data.cmd == "add") {
      CitraWajahAPI.create(fData as ICitraWajahCreateReq)
        .then(() => {
          toast.success("Berhasil disimpan :)")
          dialogClose()
          refresh()
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
        data.karyawan_id ?? 0,
        fData as ICitraWajahCreateReq
      ).then(() => {
        toast.success("Berhasil disimpan :)")
        dialogClose()
        refresh()
      })
    }
  }

  let formContext = useForm<ICitraWajahForm>()

  const tambah = () => {
    setFormData({ cmd: "add", karyawan_id: 0 })
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
            <Button color="success" variant="outlined" onClick={simpan}>
              <Icon>save</Icon> Simpan
            </Button>
          </>
        }
      >
        <FormContainer
          formContext={formContext}
          // onSuccess={(data) => console.log(data)}
        >
          {/* <TextFieldElement
            name="noinduk"
            label="No Induk"
            required
            variant="standard"
            control={formContext.control}
          />
          <br />
          <br /> */}
          {/* <Fieldel
          <TextFieldElement
            name="nama"
            label="Berkas"
            required
            variant="standard"
            fullWidth={true}
          /> */}
          <br />
          {formData.cmd == "edit" && !showKaryawanCombo ? (
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Karyawan
              </InputLabel>
              <Input
                disabled
                // defaultValue={formData.user?.email}
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
            <AutocompleteElement
              matchId
              options={karyawanOptionsMUI as any}
              name="karyawan_id"
              label="Karyawan"
              required
              loading={karyawanQueryIsLoading}
              textFieldProps={{ onChange: handleFilterKaryawan }}
            />
          ) : null}
        </FormContainer>
      </FormDialog>
    </div>
  )
}
