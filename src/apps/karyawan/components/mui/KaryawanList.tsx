import { useMUIDataGridServer } from "@/components/mui/datagrid"
import LoaderCenter from "@/components/mui/LoaderCenter"
import RQError from "@/infra/api/react-query/RQError"
import Button from "@mui/material/Button/Button"
import ButtonGroup from "@mui/material/ButtonGroup/ButtonGroup"
import Icon from "@mui/material/Icon/Icon"
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid"
import { useQuery } from "@tanstack/react-query"

import { IKaryawanListRes, Karyawan } from "../../data/karyawan"
import { KaryawanAPI } from "../../services/karyawan.api"
import { useKaryawanForm } from "./KaryawanForm"

const KaryawanList = () => {
  const { currentPage, filterText, dataGridProps } = useMUIDataGridServer()
  const { edit, hapus } = useKaryawanForm()
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
      field: "noinduk",
      headerName: "No Induk",
      minWidth: 100,
      sortable: false,
    },
    { field: "nama", headerName: "Nama", minWidth: 200, sortable: false },
    {
      field: "divisi",
      headerName: "Divisi",
      minWidth: 200,
      sortable: false,
      renderCell: (params: GridCellParams) => {
        const kolom = params.row as Karyawan
        return kolom.divisi?.nama
      },
    },
    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      sortable: false,
      renderCell: (params: GridCellParams) => {
        const kolom = params.row as Karyawan
        return kolom.user?.email
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
    useQuery<IKaryawanListRes>({
      queryKey: ["karyawan", filterText, dataGridProps.pageSize, currentPage],
      queryFn: () =>
        KaryawanAPI.list({
          page: currentPage,
          limit: dataGridProps.pageSize,
          filter: filterText,
        }),
      keepPreviousData: true,
    })

  const handleEdit = (params: GridCellParams) => {
    const karyawanData = params.row
    edit(karyawanData)
  }

  const handleHapus = (params: GridCellParams) => {
    const karyawanData = params.row
    hapus(karyawanData.karyawan_id)
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
          getRowId={(row) => row.karyawan_id}
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

export default KaryawanList
