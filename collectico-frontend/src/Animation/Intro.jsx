import  React from "react";
import Background from "./Background";
import Walk from "./Walk";
import Music from "./Music";

function Intro() {
  return (
    <div className='relative'>
    <Music />
    <Background/>
    <Walk/>
  </div>
  )
}

export default Intro