import FullAppLayout from "@/components/mui/layouts/FullAppLayout"

import { useUiKit } from "./hooks"
import { PropsChildren } from "./types"

const UiKitWrapper = ({ children }: PropsChildren) => {
  const [uiKit] = useUiKit()

  if (uiKit == "mui") {
    return <FullAppLayout>{children}</FullAppLayout>
  }
  return <div>{children}</div>
}

export default UiKitWrapper
