import { useRouteError } from "react-router-dom"

interface IRouterError {
  statusText?: string
  data?: string
}
export default function ErrorPage() {
  const error = useRouteError() as IRouterError

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText}</i>
      </p>
      <p>
        <i>{error?.data}</i>
      </p>
    </div>
  )
}
