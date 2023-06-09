import { useMUIDataGridServer } from "@/components/mui/datagrid"
import LoaderCenter from "@/components/mui/LoaderCenter"
import RQError from "@/infra/api/react-query/RQError"
import Avatar from "@mui/material/Avatar/Avatar"
import Button from "@mui/material/Button/Button"
import ButtonGroup from "@mui/material/ButtonGroup/ButtonGroup"
import Icon from "@mui/material/Icon/Icon"
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid"
import { useQuery } from "@tanstack/react-query"

import { ICitraWajahListRes, CitraWajah } from "../../data/citrawajah"
import { CitraWajahAPI } from "../../services/citrawajah.api"
import { useCitraWajahForm } from "./CitraWajahForm"

const CitraWajahList = () => {
  const { currentPage, filterText, dataGridProps } = useMUIDataGridServer()
  const { edit, hapus } = useCitraWajahForm()
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
      field: "karyawan",
      headerName: "Karyawan",
      minWidth: 200,
      sortable: false,
      renderCell: (params: GridCellParams) => {
        const kolom = params.row as CitraWajah
        return kolom.karyawan?.nama
      },
    },
    {
      field: "nama",
      headerName: "Citra",
      minWidth: 200,
      sortable: false,
      renderCell: (params: GridCellParams) => {
        const kolom = params.row as CitraWajah
        return (
          <Avatar
            alt={kolom.karyawan?.nama}
            src={kolom.nama}
            sx={{ width: 48, height: 48 }}
          />
        )
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
              {/* <Button color="warning" onClick={() => handleEdit(params)}>
                <Icon>edit</Icon>&nbsp;
              </Button> */}
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
    useQuery<ICitraWajahListRes>({
      queryKey: ["citrawajah", filterText, dataGridProps.pageSize, currentPage],
      queryFn: () =>
        CitraWajahAPI.list({
          page: currentPage,
          limit: dataGridProps.pageSize,
          filter: filterText,
        }),
      keepPreviousData: true,
    })

  const handleEdit = (params: GridCellParams) => {
    const citrawajahData = params.row
    edit(citrawajahData)
  }

  const handleHapus = (params: GridCellParams) => {
    const citrawajahData = params.row
    hapus(citrawajahData.citrawajah_id)
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
          getRowId={(row) => row.citrawajah_id}
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

export default CitraWajahList
