import dayjs from "dayjs"

import { useMUIDataGridServer } from "@/components/mui/datagrid"
import LoaderCenter from "@/components/mui/LoaderCenter"
import RQError from "@/infra/api/react-query/RQError"
import Avatar from "@mui/material/Avatar/Avatar"
import Button from "@mui/material/Button/Button"
import ButtonGroup from "@mui/material/ButtonGroup/ButtonGroup"
import Icon from "@mui/material/Icon/Icon"
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridValueFormatterParams,
} from "@mui/x-data-grid"
import { useQuery } from "@tanstack/react-query"

import { IKehadiranListRes, Kehadiran } from "../../data/kehadiran"
import { KehadiranAPI } from "../../services/kehadiran.api"
import { useKehadiranForm } from "./KehadiranForm"

const KehadiranList = () => {
  const { currentPage, filterText, dataGridProps } = useMUIDataGridServer()
  const { edit, hapus } = useKehadiranForm()
  const columns: GridColDef[] = [
    {
      field: "num",
      headerName: "No",
      minWidth: 10,
      renderCell: (params: GridCellParams) => {
        return params.row.num
      },
    },
    {
      field: "tanggal",
      headerName: "Tanggal",
      renderCell: (params: GridCellParams) => {
        return params.row.tanggal
      },
    },
    {
      field: "karyawan",
      headerName: "Karyawan",
      minWidth: 200,
      sortable: false,
      renderCell: (params: GridCellParams) => {
        const kolom = params.row as Kehadiran
        return kolom.karyawan?.nama
      },
    },
    {
      field: "waktu_hadir",
      headerName: "Hadir",
      renderCell: (params: GridCellParams) => {
        const wh = params.row.waktu_hadir as Date
        let waktu_hadir = dayjs(wh).format("HH:mm")
        return wh ? waktu_hadir : "-"
      },
    },
    {
      field: "waktu_pulang",
      headerName: "Pulang",
      renderCell: (params: GridCellParams) => {
        const wp = params.row.waktu_pulang as Date
        let waktu_pulang = dayjs(wp).format("HH:mm")
        return wp ? waktu_pulang : "-"
      },
    },
    {
      field: "aksi",
      headerName: "Aksi",
      minWidth: 150,
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => {
        return (
          <>
            <ButtonGroup>
              <Button color="warning" onClick={() => handleEdit(params)}>
                <Icon>edit</Icon>&nbsp;
              </Button>
              <Button color="error" onClick={() => handleHapus(params)}>
                <Icon>delete</Icon>&nbsp;
              </Button>
            </ButtonGroup>
          </>
        )
      },
    },
  ]

  const { data, isLoading, isFetched, isError, error } =
    useQuery<IKehadiranListRes>({
      queryKey: ["kehadiran", filterText, dataGridProps.pageSize, currentPage],
      queryFn: () =>
        KehadiranAPI.list({
          page: currentPage,
          limit: dataGridProps.pageSize,
          filter: filterText,
        }),
      keepPreviousData: true,
    })

  const handleEdit = (params: GridCellParams) => {
    const kehadiranData = params.row
    edit(kehadiranData)
  }

  const handleHapus = (params: GridCellParams) => {
    const kehadiranData = params.row
    hapus(kehadiranData.presensi_id)
  }

  if (isLoading) return <LoaderCenter />
  if (isError) return <RQError error={error} />

  return (
    <>
      <div style={{ width: "100%" }}>
        <DataGrid
          sx={{ overflowX: "auto" }}
          {...dataGridProps}
          loading={isLoading}
          autoHeight
          columns={columns}
          getRowId={(row) => row.presensi_id}
          rows={data?.data ?? []}
          rowCount={data?.meta?.total}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          disableColumnFilter
          disableColumnSelector
        />
      </div>
    </>
  )
}

export default KehadiranList
