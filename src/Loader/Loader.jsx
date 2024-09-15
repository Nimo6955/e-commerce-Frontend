import React, { useEffect, useState } from 'react'
import './Loader.scss'
import Headphones from '../assets/loadingHeadphone.png'
import Mouse from '../assets/loadingMouse.png'
import Chair from '../assets/loadingChair.png'
import Cd from '../assets/loadingCd.png'

function Loader() {

  return (
    <div className="parantLoader">

    <div className='Loader'>
        <div class="loaderTop"></div>
        <div className="BottomLoader">
        <h4>Loading Store </h4>
        <div class="loader"></div>
        </div>
        <div className="center">
          <img className='Headphones' src={Headphones} alt="" />
          <h1 className='txtTop'>MANIAC</h1>
          <h1 className='txt'>GAMING</h1>
        </div>
      <img className='Mouse' src={Mouse} alt="" />
      <img className='Chair' src={Chair} alt="" />
      <img className='Cd' src={Cd} alt="" />
    </div>
    </div>
  )
}

export default Loader