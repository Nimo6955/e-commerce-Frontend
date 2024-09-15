import React from 'react'
import './VideoSection.scss'
import mouse from '../../assets/mouse.mp4'


function VideoSection() {
  return (
    <div>
      <div className='videoSection'>
        <video autoPlay='true' muted loop id="myVideo" >
          <source src={mouse} type="video/mp4" />
        </video>
        <h1 className='videoTxt' data-aos="zoom-in">PLAY ON</h1>
      </div>
    </div>
  )
}

export default VideoSection