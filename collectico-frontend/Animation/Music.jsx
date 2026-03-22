import React, {useEffect} from 'react'

function Music() {
    // let onOff=true;
    // function test(){
    // if (onOff === true){
    //     new Audio("./Asset/bgMusic.mp3").play()
    //    if (onOff === true){ onOff = false }
    // }}

        useEffect(() => {
          const audio = new Audio('./Asset/bgMusic.mp3');
          audio.loop = true;
          audio.volume = 0.2;
          audio.play();

          return () => {
            audio.pause();
            audio.currentTime = 0;
          };
        }, []);

  return null;
//   <button onClick={test}> test</button>

}


export default Music