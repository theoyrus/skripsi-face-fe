import { CircularProgress } from "@mui/material"
import { ComponentType, Suspense } from "react"
import Center from "./Center"

const LoaderApp =
  <P extends object>(Component: ComponentType<P>) =>
  (props: P) =>
    (
      <>
        <Suspense
          fallback={
            <Center justifyContent="start">
              <CircularProgress />
            </Center>
          }
        >
          <Component {...props} />
        </Suspense>
      </>
    )

export default LoaderApp
