import React from 'react'
import { useEffect, useState } from 'react';

function Cat({mate}) {

    const direction = null;
    const [frame, setFrame] = useState(0);

    useEffect(() => {
          let idleInterval = setInterval(() => {
            if (direction === null) {
              setFrame((preFrame) => (preFrame+1)%2);}
            },500)
            return () => clearInterval(idleInterval);
          }, [direction]);


  const imgsrc = `./Model/CatIdle_${frame}.png`

  useEffect(()=>{
  const audio = new Audio('./Asset/cat.mp3');
    if(mate === true){
      audio.volume = 0.5;
      audio.play();
    }
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  },[mate])

  return (
     <img src= {imgsrc}
     style={{position: "absolute",
      left: "630px",
      top: "460px",
      zIndex: 9,
      overflow: "hidden",
      }}/>
  )
}
export default Cat