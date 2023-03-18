import dayjs, { Dayjs } from "dayjs"
import { atom, useAtom } from "jotai"
import { useConfirm } from "material-ui-confirm"
import { SyntheticEvent, useEffect, useState } from "react"
import {
  AutocompleteElement,
  Controller,
  DatePickerElement,
  DateTimePickerElement,
  FormContainer,
  SubmitHandler,
  TextFieldElement,
  TimePickerElement,
  useForm,
} from "react-hook-form-mui"
import { toast } from "react-toastify"

import { useKaryawanData } from "@/apps/karyawan/components/KaryawanData"
import { FormDialog, useFormDialog } from "@/components/mui/dialogs/FormDialog"
import { parseError } from "@/infra/api/axios/utils"
import Button from "@mui/material/Button/Button"
import FormControl from "@mui/material/FormControl/FormControl"
import Icon from "@mui/material/Icon/Icon"
import IconButton from "@mui/material/IconButton/IconButton"
import Input from "@mui/material/Input/Input"
import InputAdornment from "@mui/material/InputAdornment/InputAdornment"
import InputLabel from "@mui/material/InputLabel/InputLabel"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { useQueryClient } from "@tanstack/react-query"

import { IKehadiranCreateReq, Kehadiran } from "../../data/kehadiran"
import { KehadiranAPI } from "../../services/kehadiran.api"
import {
  convertToJakartaTZ,
  dateTimeUtcTrue,
  parseDate,
} from "@/infra/utils/datetime.util"

const RQ_KEY = "kehadiran"

interface IKehadiranForm extends Kehadiran {
  cmd?: "add" | "edit"
}

const kehadiranFormAtom = atom<IKehadiranForm>({
  cmd: "add",
})

export const useKehadiranForm = () => {
  const [formData, setFormData] = useAtom(kehadiranFormAtom)
  const { isDialogOpen, dialogOpen, dialogClose } = useFormDialog()
  const queryClient = useQueryClient()
  const confirm = useConfirm()

  const onSubmit: SubmitHandler<IKehadiranForm> = async (data) => {
    const fData = {
      ...data,
      karyawan: data.karyawan_id,
      jenis: data.cmd == "add" ? "IN" : data.jenis,
      waktu_hadir: data.waktu_hadir
        ? dateTimeUtcTrue(data.waktu_hadir as string)
        : null,
      waktu_pulang: data.waktu_pulang
        ? dateTimeUtcTrue(data.waktu_pulang as string)
        : null,
    }
    if (data.cmd == "add") {
      await KehadiranAPI.create(fData as IKehadiranCreateReq)
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
      await KehadiranAPI.update(
        data.presensi_id ?? 0,
        fData as IKehadiranCreateReq
      )
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
    }
  }

  let formContext = useForm<IKehadiranForm>({
    defaultValues: { tanggal: dayjs(Date.now()) },
  })

  const tambah = () => {
    setFormData({ cmd: "add", karyawan_id: 0 })
    dialogOpen()
  }
  const edit = (data: IKehadiranForm) => {
    data["karyawan_id"] = data.karyawan?.karyawan_id
    setFormData({ ...data, ...{ cmd: "edit" } })
    dialogOpen()
  }
  const fillForm = () => {
    Object.keys(formData).forEach((key) => {
      const col = key as keyof IKehadiranForm
      formContext.setValue(col, formData[col])
    })
    formContext.setValue("tanggal", dayjs(formData.tanggal))
    formContext.setValue("waktu_hadir", parseDate(formData.waktu_hadir))
    formContext.setValue("waktu_pulang", parseDate(formData.waktu_pulang))
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
        KehadiranAPI.delete(id)
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

export const KehadiranForm = () => {
  const { fillForm, simpan, formContext, isDialogOpen, dialogClose, formData } =
    useKehadiranForm()
  const {
    karyawanOptionsMUI,
    handleFilterServer: handleFilterKaryawan,
    karyawanQueryIsLoading,
  } = useKaryawanData()
  const [showKaryawanCombo, setshowKaryawanCombo] = useState(true)
  const [waktuHadirUtc, setwaktuHadirUtc] = useState<string>("")

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
          <br />
          <br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePickerElement
              label="Tanggal"
              name="tanggal"
              required
              validation={{
                required: "Wajib dipilih",
              }}
            />
            {formData.cmd == "edit" ? (
              <>
                <br />
                <br />
                <TimePickerElement
                  label="Waktu Hadir"
                  name="waktu_hadir"
                />{" "}
                <TimePickerElement label="Waktu Pulang" name="waktu_pulang" />
              </>
            ) : null}
          </LocalizationProvider>
        </FormContainer>
      </FormDialog>
    </div>
  )
}
