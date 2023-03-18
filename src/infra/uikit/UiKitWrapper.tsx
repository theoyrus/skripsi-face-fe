import { lazy } from "react"

import { useUiKit } from "./hooks"
import { PropsChildren } from "./types"

const FullAppLayout = lazy(
  () => import("@/components/mui/layouts/FullAppLayout")
)

const UiKitWrapper = ({ children }: PropsChildren) => {
  const [uiKit] = useUiKit()

  if (uiKit == "mui") {
    return <FullAppLayout>{children}</FullAppLayout>
  }
  return <div>{children}</div>
}

export default UiKitWrapper
