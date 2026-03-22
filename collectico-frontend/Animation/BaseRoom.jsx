import React from 'react'
import Cat from './Cat';
import { Modal } from '@mui/material';

const baseURL = "https://dragon-tempura-sprint2.vercel.app";

function BaseRoom({picOpen, setPicopen, cat, pic }) {

  // console.log("check pic", pic);
  const image = pic.map((product)=> product.image);
  const link = pic.map((product)=> product._id);


  // console.log("Check image", link[0] );

    const baseRoomAsset = [<img src="./Asset/roombg.png" className='absolute z-1'/>,
    <img src="./Asset/fence.png" className='absolute z-1'/>,<Cat mate={cat}/>];
    const picShow =<img src= {image[6]}  className='absolute z-10 w-[250px] h-[200px] left-[400px] top-[150px] shadow-md shadow-amber-100'/>
    const goToProduct = () => {
    window.open(`${baseURL}/product/${link[6]}`, "_blank");
  };

  return (
    <>{picShow} {baseRoomAsset[0]} {baseRoomAsset[1]} {baseRoomAsset[2]}

    <Modal
    open={picOpen}
    onClose={()=>setPicopen(false)}
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
    onClick={goToProduct}
    style={{ cursor: 'pointer'}}
  >
    <img src={image[6]}
        className='absolute z-1  left-[50%] -translate-x-1/2 top-[100px] max-w-[400px] '
    />
  </Modal>
  </>
  )
}

export default BaseRoom