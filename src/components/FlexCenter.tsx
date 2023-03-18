import React from "react"

interface FlexCenterProps {
  children: React.ReactNode
}

const FlexCenter: React.FC<FlexCenterProps> = ({ children }) => {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  }

  return <div style={containerStyle}>{children}</div>
}

export default FlexCenter
