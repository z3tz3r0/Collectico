import React from 'react'

function Model({direction, frame, frameback, x, y}) {

  const imgsrc = (direction === "a")
  ? `./Model/walkback_${frame}.png`
  : (direction === null && frameback === true)
  ? `./Model/idleback_${frame}.png`
  : (direction === null && frameback === false)
  ? `./Model/idle_${frame}.png`
  : `./Model/walk_${frame}.png`;

  // console.log(frameback);


  return (
     <img src= {imgsrc}
     style={{position: "absolute",
      left: `${x}px`,
      top: `${y}px`,
      zIndex: 10,
      overflow: "hidden",
      width:120,
      height:235,
      }}/>
  )
}
export default Model