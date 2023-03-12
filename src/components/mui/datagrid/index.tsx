import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery"
import { GridToolbar } from "@mui/x-data-grid/components/toolbar/GridToolbar"
import { GridColumnVisibilityModel } from "@mui/x-data-grid/hooks/features/columns"
import { GridFilterModel } from "@mui/x-data-grid/models/gridFilterModel"
import { useCallback, useEffect, useState } from "react"

interface useMUIDataGridServerProps {
  initialLimit?: number
  initialCurrent?: number
  initialFilter?: string
}

export const useMUIDataGridServer = ({
  initialLimit = 10,
  initialCurrent = 1,
  initialFilter = "",
}: useMUIDataGridServerProps = {}) => {
  const [perPage, setperPage] = useState(initialLimit)
  const [currentPage, setcurrentPage] = useState(initialCurrent)
  const [filterText, setfilterText] = useState(initialFilter)

  const handlePageChange = (page: number) => {
    setcurrentPage(page + 1)
  }

  const handlePageSizeChange = (pageSize: number) => {
    setperPage(pageSize)
  }

  const onFilterChange = useCallback((filterModel: GridFilterModel) => {
    setcurrentPage(1)
    const filterVal = filterModel.quickFilterValues?.join(" ") as string
    setfilterText(filterVal)
  }, [])

  return {
    currentPage,
    filterText,
    dataGridProps: {
      pagination: true,
      paginationMode: "server",
      page: (currentPage ?? 1) - 1,
      onPageChange: handlePageChange,
      pageSize: perPage,
      onPageSizeChange: handlePageSizeChange,
      components: { Toolbar: GridToolbar },
      componentsProps: {
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
        },
      },
      filterMode: "server",
      onFilterModelChange: onFilterChange,
    },
  } as const
}

interface useMUIDataGridResponsiveProps {
  onDesktop: GridColumnVisibilityModel
  onMobile: GridColumnVisibilityModel
}

export const useMUIDataGridResponsive = ({
  onDesktop,
  onMobile,
}: useMUIDataGridResponsiveProps) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("sm"))
  const [columnVisible, setColumnVisible] = useState(onDesktop)

  useEffect(() => {
    const newColumns = matches ? onDesktop : onMobile
    setColumnVisible(newColumns)
  }, [matches])

  return {
    responsiveDataGridProps: {
      columnVisibilityModel: columnVisible,
    },
  } as const
}
