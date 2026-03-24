import React from 'react'

function Invisblock({key, top, left, width, height, background}) {
  return (
    <div style={{
        position: "absolute",
        key:key,
        top:top,
        left:left,
        width:width,
        height:height,
        background: background,
    }}></div>
)}
export default Invisblock