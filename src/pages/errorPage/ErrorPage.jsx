import React from 'react'
import './ErrorPage.scss'
import video from '../../assets/errorPage.mp4'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div className='errorPage'>
        <video autoPlay='true' muted loop id="myVideo" >
        <source src={video} type="video/mp4"/>
      </video>

      <div className="txt">
        <h1>Unauthorized Page</h1>
        <p>Return to <Link to={'/login'} style={{color: '#9bf900',textDecoration: 'underline'}}> Log In</Link></p>

        {/* <button>Log In</button> */}
      </div>
    </div>
  )
}

export default ErrorPage