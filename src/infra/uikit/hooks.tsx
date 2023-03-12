import { atom, useAtom } from "jotai"

export const uiKitAtom = atom("mui")

export const useUiKit = () => {
  const [uiKit, setuiKit] = useAtom(uiKitAtom)

  return [uiKit, setuiKit] as const
}
