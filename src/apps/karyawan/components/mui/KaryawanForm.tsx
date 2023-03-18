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

import { IKaryawanCreateReq, Karyawan } from "../../data/karyawan"
import { KaryawanAPI } from "../../services/karyawan.api"
import { useConfirm } from "material-ui-confirm"
import { useDivisiData } from "../DivisiData"
import { parseError } from "@/infra/api/axios/utils"
import { useUserData } from "@/apps/auth/components/UserData"
import TextField from "@mui/material/TextField/TextField"
import FormControl from "@mui/material/FormControl/FormControl"
import InputLabel from "@mui/material/InputLabel/InputLabel"
import Input from "@mui/material/Input/Input"
import InputAdornment from "@mui/material/InputAdornment/InputAdornment"
import IconButton from "@mui/material/IconButton/IconButton"

const RQ_KEY = "karyawan"

interface IKaryawanForm extends Karyawan {
  cmd?: "add" | "edit"
}

const karyawanFormAtom = atom<IKaryawanForm>({
  cmd: "add",
  noinduk: "",
  nama: "",
  divisi_id: 0,
  user_id: 0,
})

export const useKaryawanForm = () => {
  const [formData, setFormData] = useAtom(karyawanFormAtom)
  const { isDialogOpen, dialogOpen, dialogClose } = useFormDialog()
  const queryClient = useQueryClient()
  const confirm = useConfirm()

  const onSubmit: SubmitHandler<IKaryawanForm> = async (data) => {
    const fData = {
      ...data,
      divisi: data.divisi_id,
      user: data.user_id,
    }
    if (data.cmd == "add") {
      await KaryawanAPI.create(fData as IKaryawanCreateReq)
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
      await KaryawanAPI.update(
        data.karyawan_id ?? 0,
        fData as IKaryawanCreateReq
      ).then(() => {
        toast.success("Berhasil disimpan :)")
        dialogClose()
        refresh()
      })
    }
  }

  let formContext = useForm<IKaryawanForm>()

  const tambah = () => {
    setFormData({ cmd: "add", noinduk: "", nama: "", divisi_id: 0, user_id: 0 })
    dialogOpen()
  }
  const edit = (data: IKaryawanForm) => {
    data["divisi_id"] = data.divisi?.divisi_id
    data["user_id"] = data.user?.id
    setFormData({ ...data, ...{ cmd: "edit" } })
    dialogOpen()
  }
  const fillForm = () => {
    Object.keys(formData).forEach((key) => {
      const col = key as keyof IKaryawanForm
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
        KaryawanAPI.delete(id)
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

export const KaryawanForm = () => {
  const { fillForm, simpan, formContext, isDialogOpen, dialogClose, formData } =
    useKaryawanForm()
  const { divisiOptionsMUI } = useDivisiData()
  const {
    userOptionsMUI,
    handleFilterServer: handleFilterUser,
    userQueryIsLoading,
  } = useUserData()
  const [showUserCombo, setshowUserCombo] = useState(true)

  useEffect(() => {
    fillForm()
    setshowUserCombo(formData.cmd == "add")
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
            name="noinduk"
            label="No Induk"
            required
            variant="standard"
            control={formContext.control}
          />
          <br />
          <br />
          <TextFieldElement
            name="nama"
            label="Nama Lengkap"
            required
            variant="standard"
            fullWidth={true}
          />
          <br />
          <br />
          <AutocompleteElement
            matchId
            options={divisiOptionsMUI as any}
            name="divisi_id"
            label="Divisi"
            required
          />
          <br />
          {formData.cmd == "edit" && !showUserCombo ? (
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                User/Pengguna
              </InputLabel>
              <Input
                disabled
                defaultValue={formData.user?.email}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="cari user/pengguna"
                      onClick={() => {
                        setshowUserCombo(true)
                      }}
                    >
                      <Icon>search</Icon>
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          ) : null}
          {showUserCombo ? (
            <AutocompleteElement
              matchId
              options={userOptionsMUI as any}
              name="user_id"
              label="User/Pengguna"
              required
              loading={userQueryIsLoading}
              textFieldProps={{ onChange: handleFilterUser }}
            />
          ) : null}
        </FormContainer>
      </FormDialog>
    </div>
  )
}
