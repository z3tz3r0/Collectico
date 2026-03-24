import React, { useState, useEffect, useRef } from 'react'
import Model from './Model.jsx'
import dimensionSpec from './dimensionSpec.js';
import Background from "./Background";



const speed = 25;
const charecter = {x:100, y:235}; // from 0,0 to ref point (body)

function Walk({pic}) {
    const [position, setPosition] = useState({x: 100, y: 400});
    const [direction, setDirection] = useState(null);
    const [frame, setFrame] = useState(0);
    const [frameBack, setFrameBack] = useState(false);
    const [picOpen, setPicopen] = useState(false);
    const [cat, setCat] = useState(false);
    const [roomChange, setRoomChange] = useState(0);
    const roomControlRight = useRef(false);
    const roomControlLeft = useRef(false);
    const [whichPic,setWhichPic] = useState();

    // const roomDetail =  (picOpen === true) ? 'open' : 'close';
    // const catSound=  (cat === true) ? 'play' : 'stop';
    // console.log(roomDetail);
    // console.log(catSound);

    if(roomChange> 2) {setRoomChange(0)}
    if(roomChange< 0) {setRoomChange(2)}

    useEffect(() => {

      let moveinterval;

      if (["w", "a", "s", "d"].includes(direction)) {
        moveinterval = setInterval(() => {
          setFrame((preFrame) => (preFrame+1) % 2);
          setPosition((prePos) => {
            // console.log(direction)
            let newPos = {...prePos};
            switch (direction) {
                case "w": newPos.y = newPos.y - speed
                break;
                case "a": newPos.x = newPos.x - speed
                break;
                case "s": newPos.y = newPos.y + speed
                break;
                case "d": newPos.x = newPos.x + speed
                break;
                default: break;
            }
            for (let a of dimensionSpec[roomChange]){
              const characterLeft = newPos.x;
              const characterRight = newPos.x + charecter.x;
              const characterTop = newPos.y;
              const characterBottom = newPos.y + charecter.y;

              const objectLeft = a.left;
              const objectRight = a.left + a.width;
              const objectTop = a.top;
              const objectBottom = a.top + a.height;

              if (  characterRight > objectLeft &&
                    characterLeft < objectRight &&
                    characterBottom > objectTop &&
                    characterTop < objectBottom
                  ) { if(a.trigger === "openPic"){
                      setDirection(null);
                      // window.open("https://www.google.com", "_blank");
                      setPicopen(true);
                      setWhichPic(a.whichPic);
                  }
                      setTimeout(()=>{if(a.trigger === "cat" && cat === false) {
                        // console.log("cat found");
                        // setDirection(null);
                        setCat(true);
                      }else setCat(false)},500); // loop in 1 sec so cat will meow every 1 sec if player non-stop press direction
                      // if(a.trigger === "cat" && cat === false){
                      //   setCat(true);
                      // }
                      if(a.trigger === "changeRoomRight" && !roomControlRight.current){

                         setRoomChange((stepRoom)=>stepRoom+1);
                         setPosition(() => ({ x: 10, y: position.y }));
                         }
                         roomControlRight.current= true;
                         setTimeout (()=>{roomControlRight.current= false;},500);

                      if(a.trigger === "changeRoomLeft" && !roomControlLeft.current){

                          setRoomChange((stepRoom)=>stepRoom-1);
                          setPosition(() => ({ x: 880, y: position.y }));
                          }
                          roomControlLeft.current= true;
                          setTimeout (()=>{roomControlLeft.current= false;},500);

                  return prePos;}
            }
            return newPos;
        });
    },200);} else clearInterval(moveinterval);
    return () => clearInterval(moveinterval);
  },[direction, cat, position.y, roomChange])

    useEffect(() => {
        const moveDirection = (event) => {
            if (["w", "a", "s", "d"].includes(event.key)) {
                setDirection(event.key);
            }
        };
        const moveStop = (event) => {
            if (["w", "s", "d"].includes(event.key)) {
              setDirection(null);
              setFrameBack(false);
          } else if (event.key === "a") {
              setDirection(null);
              setFrameBack(true);
          }
        };
        window.addEventListener("keydown", moveDirection);
        window.addEventListener("keyup", moveStop);
        return () => {
            window.removeEventListener("keydown", moveDirection);
            window.removeEventListener("keyup", moveStop);
        }
    },[])

    useEffect(() => {
      let idleInterval = setInterval(() => {
        if (direction === null) {
          setFrame((preFrame) => (preFrame+1)%2);}
        },500)
        // console.log(idleInterval);
        return () => clearInterval(idleInterval);
      }, [direction]);

      useEffect(() => {
        const picClear = setTimeout(()=>{if (picOpen && direction)
          {setPicopen(false);}},300)
          return () => {clearTimeout(picClear);};
      }, [direction, picOpen]);

  return (
    // <div className={`absolute z-20  left-[${position.x}px] top-[${position.y}px]`}>{models}</div>
    <div className='relative min-w-[1024px] w-[1024px] h-[768px] top-[50%] left-[50%] -translate-x-1/2'>
    <Background step={roomChange} cat={cat} picOpen={picOpen} setPicopen={setPicopen} whichPic={whichPic} pic={pic}/>
    <Model direction={direction} frame={frame} frameback={frameBack} x={position.x} y={position.y} />
    {/* {console.log(cat)}; */}
    {/* <Cat mate={cat}/> */}
    {/* <Modal
        open={picOpen}
        onClose={() => setPicopen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <img src="./productPicture/Landscape-Painting-Contemporary-Art-2.jpg"
            className='absolute z-1  left-[485px] top-[150px]'
        />
      </Modal> */}
      </div>
  )
}

export default Walk
