import { queryClient } from "@/infra/api/react-query/query.client"
import { debounce } from "@/infra/utils/timer.util"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import { IUserListRes } from "../data/user"
import { UserAPI } from "../services/user.api"

const RQ_KEY = "userOptions"

export const useUserData = () => {
  const [filter, setFilter] = useState("")
  const [userOptionsIsLoading, setuserOptionsIsLoading] = useState(false)
  const {
    data: userOptions,
    isLoading,
    isFetched,
    isError,
    error,
  } = useQuery<IUserListRes>({
    queryKey: [RQ_KEY, filter],
    queryFn: () => UserAPI.list({ limit: 15, filter }),
    keepPreviousData: true,
  })

  const refetch = () => {
    queryClient.invalidateQueries([RQ_KEY])
  }

  const handleFilterServer = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const val = event.target.value
      setuserOptionsIsLoading(true)
      setTimeout(() => {
        setFilter(val)
      }, 250)
    },
    1000
  )

  const userOptionsMUI = isFetched
    ? userOptions?.data?.map((r) => ({
        id: r.id,
        label: `[${r.email}] ${r.first_name} ${r.last_name}`,
      }))
    : []

  const userQueryIsLoading = isLoading || (userOptionsIsLoading && !isFetched)

  return {
    refetch,
    handleFilterServer,
    userQueryIsLoading,
    userOptions,
    userOptionsMUI,
  } as const
}
