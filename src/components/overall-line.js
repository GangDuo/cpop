import React from "react"

const DOTTED_LINE = '0.5px dashed #ccc'

const OverallLine = (props) => {
  const {isVerticality, border, top, left} = props

  return (<span style={{
    position: 'absolute',
    border: border || DOTTED_LINE,
    width: isVerticality ? 0 : "100%",
    height: isVerticality ? "100%" : 0,
    top: top || 0,
    left: left || 0
  }} />)
}

export default OverallLine