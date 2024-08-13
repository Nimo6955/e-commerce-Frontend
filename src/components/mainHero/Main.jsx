import React, { useEffect } from 'react'
import './Main.scss'
import frontImage from '../../assets/frontImage.png'

function Main() {

  return (
    <>
    <div className='main1'  >  
      <div className="background" data-aos="zoom-in" data-aos-duration="2500">
      </div>
    <img className='frontImage'  data-aos="zoom-in"   src={frontImage} alt="" />
    </div>
    </>
  )
}

export default Main