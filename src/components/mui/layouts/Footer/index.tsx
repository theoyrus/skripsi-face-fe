import { FunctionComponent, PropsWithChildren } from "react"

import { HTMLAttributes } from "react"

type Props = HTMLAttributes<HTMLDivElement>

const Footer: FunctionComponent<Props> = ({ children, ...rest }) => {
  const now = new Date()
  return (
    <div style={{ marginTop: "auto", ...rest.style }}>
      <p style={{ textAlign: "center" }}>
        Copyright {now.getFullYear()} Suryo Prasetyo W
      </p>
      {children}
    </div>
  )
}
export default Footer
