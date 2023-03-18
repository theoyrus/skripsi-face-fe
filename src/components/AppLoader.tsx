import { ComponentType, Suspense } from "react"
import CircularLoading from "./CircularLoading"
import FlexCenter from "./FlexCenter"

const AppLoader =
  <P extends object>(Component: ComponentType<P>) =>
  (props: P) =>
    (
      <>
        <Suspense
          fallback={
            <FlexCenter>
              <CircularLoading />
            </FlexCenter>
          }
        >
          <Component {...props} />
        </Suspense>
      </>
    )

export default AppLoader
