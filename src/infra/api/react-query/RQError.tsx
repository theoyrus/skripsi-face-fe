import { IRQError } from "./types"

interface Props {
  error: any
}

const RQError = ({ error }: Props) => {
  const rqErr = error as IRQError
  return (
    <>
      <p style={{ textAlign: "center" }}>
        Oops :( DataGrid Error
        <br />
        {rqErr.message}
        &nbsp;{rqErr.response?.statusText}
      </p>
    </>
  )
}

export default RQError
