import { useMUIDataGridServer } from "@/components/mui/datagrid"
import LoaderCenter from "@/components/mui/LoaderCenter"
import RQError from "@/infra/api/react-query/RQError"
import Button from "@mui/material/Button/Button"
import ButtonGroup from "@mui/material/ButtonGroup/ButtonGroup"
import Icon from "@mui/material/Icon/Icon"
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid"
import { useQuery } from "@tanstack/react-query"

import { Divisi, IDivisiListRes } from "../../data/divisi"
import { DivisiAPI } from "../../services/divisi.api"
import { useDivisiForm } from "./DivisiForm"

const DivisiList = () => {
  const { currentPage, filterText, dataGridProps } = useMUIDataGridServer()
  const { edit, hapus } = useDivisiForm()
  const columns: GridColDef[] = [
    {
      field: "num",
      headerName: "No",
      minWidth: 10,
      renderCell: (params: GridCellParams) => {
        return params.row.num
      },
    },
    { field: "kode", headerName: "Kode", minWidth: 100 },
    { field: "nama", headerName: "Nama", minWidth: 400 },
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
    useQuery<IDivisiListRes>({
      queryKey: ["divisi", filterText, dataGridProps.pageSize, currentPage],
      queryFn: () =>
        DivisiAPI.list({
          page: currentPage,
          limit: dataGridProps.pageSize,
          filter: filterText,
        }),
      keepPreviousData: true,
    })

  const handleEdit = (params: GridCellParams) => {
    const divisiData = params.row
    edit(divisiData)
  }

  const handleHapus = (params: GridCellParams) => {
    const divisiData = params.row
    hapus(divisiData.divisi_id)
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
          getRowId={(row) => row.divisi_id}
          rows={data?.data ?? []}
          rowCount={data?.meta?.total}
          rowsPerPageOptions={[5, 10, 25, 50]}
          disableColumnFilter
          disableColumnSelector
        />
      </div>
    </>
  )
}

export default DivisiList
