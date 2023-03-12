import { queryClient } from "@/infra/api/react-query/query.client"
import { useQuery } from "@tanstack/react-query"

import { IDivisiListRes } from "../data/divisi"
import { DivisiAPI } from "../services/divisi.api"

const RQ_KEY = "divisiOptions"

export const useDivisiData = () => {
  const {
    data: divisiOptions,
    isLoading,
    isFetched,
    isError,
    error,
  } = useQuery<IDivisiListRes>({
    queryKey: [RQ_KEY],
    queryFn: () => DivisiAPI.list({ limit: 25 }),
    keepPreviousData: true,
  })

  const refetch = () => {
    queryClient.invalidateQueries([RQ_KEY])
  }

  const divisiOptionsMUI = isFetched
    ? divisiOptions?.data?.map((r) => ({
        id: r.divisi_id,
        label: `[${r.kode}] ${r.nama}`,
      }))
    : []

  return { refetch, divisiOptions, divisiOptionsMUI } as const
}
