import Walk from "./Walk";
import Music from "./Music";
import React, {useState, useEffect} from 'react'
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import axios from "axios";
import baseURL from "../service/api.js";





export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

const [collectionData, setCollectionData] = useState([]);

  async function getData() {
    try {
      //fixed price product
      const productData = await axios.get(`${baseURL}/api/product-get`,{
          withCredentials: true,
        });
      setCollectionData(productData.data.allProduct|| []);

      //auction product
      // const auctionData = await axios.get(`${baseURL}/api/product-get-auction`,{
      //     withCredentials: true,
      //   });
      // setAuctionData(auctionData.data.allAuctionProduct || []);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);







  return (
    <div >
      <Link onClick={handleOpen} style={{background:"#62483A", color: "Gold"}}>Visual Museum</Link>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            style: {
              backgroundColor: "rgba(0, 0, 0, 0.69)", // Semi-transparent background color
              backdropFilter: "blur(6px)",     // Applies a 12px blur to the backdrop
            },
        }}}
      >
        <Fade in={open}>
          <div>
          <Music />
          <Walk pic={collectionData}/>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
