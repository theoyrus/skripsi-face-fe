import { queryClient } from "@/infra/api/react-query/query.client"
import { debounce } from "@/infra/utils/timer.util"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import { IKaryawanListRes } from "../data/karyawan"
import { KaryawanAPI } from "../services/karyawan.api"

const RQ_KEY = "karyawanOptions"

export const useKaryawanData = () => {
  const [filter, setFilter] = useState("")
  const [karyawanOptionsIsLoading, setkaryawanOptionsIsLoading] =
    useState(false)
  const {
    data: karyawanOptions,
    isLoading,
    isFetched,
    isError,
    error,
  } = useQuery<IKaryawanListRes>({
    queryKey: [RQ_KEY, filter],
    queryFn: () => KaryawanAPI.list({ limit: 15, filter }),
    keepPreviousData: true,
  })

  const refetch = () => {
    queryClient.invalidateQueries([RQ_KEY])
  }

  const handleFilterServer = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const val = event.target.value
      setkaryawanOptionsIsLoading(true)
      setTimeout(() => {
        setFilter(val)
      }, 250)
    },
    1000
  )

  const karyawanOptionsMUI = isFetched
    ? karyawanOptions?.data?.map((r) => ({
        id: r.karyawan_id,
        label: `[${r.noinduk}] ${r.nama}`,
      }))
    : []

  const karyawanQueryIsLoading =
    isLoading || (karyawanOptionsIsLoading && !isFetched)

  return {
    refetch,
    handleFilterServer,
    karyawanQueryIsLoading,
    karyawanOptions,
    karyawanOptionsMUI,
  } as const
}
