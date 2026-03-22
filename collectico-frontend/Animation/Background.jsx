import React from 'react'
// import Invisblock from './Invisblock.jsx'
// import dimensionSpec from './dimensionSpec.js'
// import Cat from './Cat.jsx';
// import { Modal } from '@mui/material';
import BaseRoom from './BaseRoom.jsx';
import Room1 from './Room1.jsx';
import Room2 from './Room2.jsx';


function Background({step = 0, cat, picOpen, setPicopen, whichPic, pic}) {

  

const dynamicROOM = [<BaseRoom cat={cat} picOpen={picOpen} setPicopen={setPicopen} pic={pic}/>,
   <Room1 picOpen={picOpen} setPicopen={setPicopen} whichPic={whichPic} pic={pic}/>,
   <Room2 picOpen={picOpen} setPicopen={setPicopen} whichPic={whichPic} pic={pic}/>];

// const picShow =[<img src="./productPicture/Landscape-Painting-Contemporary-Art-2.jpg" className='absolute z-10 w-[250px] h-[200px] left-[400px] top-[150px]'/>]
// const picShow1 =[<img src="./productPicture/Landscape-Painting-Contemporary-Art-2.jpg" className='absolute z-10 w-[250px] h-[200px] left-[60px] top-[150px]'/>]
// const picShow2 =[<img src="./productPicture/Landscape-Painting-Contemporary-Art-2.jpg" className='absolute z-10 w-[250px] h-[200px] left-[390px] top-[150px]'/>]
// const picShow3 =[<img src="./productPicture/Landscape-Painting-Contemporary-Art-2.jpg" className='absolute z-10 w-[250px] h-[200px] left-[720px] top-[150px]'/>]
// const Room1Asset = [<img src="./Asset/roombg.png" className='absolute z-1'/>, <img src="./Asset/fence.png" className='absolute z-1'/>,<Cat mate={cat}/>];
// const Room2Asset = [<img src="./Asset/Room1.png" className='absolute '/>, <img src="./Asset/Room1_table.png" className='absolute z-11'/>,
//                     <img src="./Asset/Room1_tree.png" className='absolute z-12'/>,<img src="./Asset/Room1_cat.png" className='absolute z-13'/>]

// const room1 = <>{picShow} {Room1Asset[0]} {Room1Asset[1]} {Room1Asset[2]} <Modal
//         open={picOpen}
//         onClose={()=>setPicopen(false)}
//         aria-labelledby="modal-title"
//         aria-describedby="modal-description"
//       >
//         <img src="public\productPicture\Landscape-Painting-Contemporary-Art-2.jpg"
//             className='absolute z-1  left-[485px] top-[150px]'
//         />
//       </Modal>
//       </>;
// const room2 = <>{Room2Asset[0]} {Room2Asset[1]} {Room2Asset[2]} {Room2Asset[3]} {picShow1} {picShow2} {picShow3} <Modal
// open={picOpen}
// onClose={()=>setPicopen(false)}
// aria-labelledby="modal-title"
// aria-describedby="modal-description"
// >
// <img src="public\productPicture\Landscape-Painting-Contemporary-Art-2.jpg"
//     className='absolute z-1  left-[485px] top-[150px]'
// />
// </Modal></>;

// const roomBackground = [room1, room2];


// console.log(`stepb4 ${step}`);
// if (step < 0) { step = step+2 };
// if (step > 1) { step = step-2 };
// console.log(`step ${step}`);


  return (
    <>

      {dynamicROOM[step]};

      {/* <img src="Animation\Asset\Room_1.png" className='absolute'/> */}
      {/* {roomBackground[step]} */}
        {/* <Invisblock width="25px" height="768px"/>
        <Invisblock left="999px" width="25px" height="768px"/>
        <Invisblock top="743px" left="25px" width="974px" height="25px"/>
        <Invisblock top="380px" left="25px" width="300px" height="25px"/>
        <Invisblock top="380px" left="340px" width="350px" height="25px" background='#ccdd0b61'/>
        <Invisblock top="380px" left="700px" width="320px" height="25px"/> */}

         {/* {dimensionSpec[step].map((block, index) => (
        <Invisblock
          key={index}
          top={block.top}
          left={block.left}
          width={block.width}
          height={block.height}
          background={block.background}
        />
      ))} */}

    </>
  )
}

export default Background