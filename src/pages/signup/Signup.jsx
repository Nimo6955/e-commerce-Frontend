import React, { useEffect, useState } from 'react'
import './Signup.scss'
import { Link, useNavigate } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { useGLTF, Stage, PresentationControls, SpotLight } from "@react-three/drei";
import ghost from '../../assets/ghost.jpg'
import axios from 'axios';

function Signup() {

  function Model(props) {
    const { scene } = useGLTF("/headphones_1.glb");
    return <primitive rotation={rotation} object={scene} {...props} />
 
  }
  const [rotation, setRotation] = useState([0, 0, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prevRotation => [
        prevRotation[0],  // Increment x rotation by 0.01 radians
        prevRotation[1] + 0.01,         // Keep y rotation same
        prevRotation[2]          // Keep z rotation same
      ]);
    }, 20);

    return () => clearInterval(interval);
  }, []);


  const [name, setName] =useState()
  const [email, setEmail] =useState()
  const [password, setPassword] =useState()
  const navigate = useNavigate()  


  const handleSubmit = (e) => { 
    e.preventDefault()
    axios.post(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/auth/signup`, {name, email, password}) 
  .then(result => {
    console.log(result)
    navigate('/login')
    
  })  
  .catch(err => console.log(err));
  }

  return (
    <div className='SignUp'>
      <div className="canvas">

        <Canvas dpr={[1, 2]} camera={{ fov: 45 }}  >
          <PresentationControls speed={1.5}  zoom={.5} polar={[0, 0]}>
            <Stage  >
              <Model scale={0.01} />
            </Stage>
          </PresentationControls>
        </Canvas>
      </div>
      <div className="SignupContainer">
        <div className="main">
          <div className="formImage">
            <div className="objImg">
              <img src={ghost} alt="" />

            </div>

          </div>
          <div className="form">
            <h2>Sign Up</h2>

            <div className="mainForm">
              <div className="inputs">
                <input type="text" placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}/>
                <input type="text" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="text" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}/>

              </div>
              <button onClick={handleSubmit}>Sign Up</button>

              <p>
                Already have an account? <Link to='/login' style={{color: '#9bf900',textDecoration: 'underline'}}>Log In</Link>
              </p>
            </div>
          </div>

        </div>
      </div>


    </div>
  )
}

export default Signup