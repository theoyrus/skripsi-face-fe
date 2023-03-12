import { atom, useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { AuthService } from "./auth.service"

export const authAtom = atom(AuthService)
export const isLoggedInAtom = atomWithStorage("access_token", "")

export const useAuth = () => {
  const [isLoggedIn, setisLoggedIn] = useAtom(isLoggedInAtom)

  return [isLoggedIn, setisLoggedIn] as const
}
