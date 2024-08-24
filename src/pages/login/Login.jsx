import React, { useEffect, useRef, useState } from 'react'
import './Login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";
import Viper from '../../assets/viper.jpg'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'




function Login() {
  function Model(props) {
    const { scene } = useGLTF("/pc_mouse_type-r.glb");
    return <primitive  rotation={rotation} object={scene} {...props} />
  }
  const [rotation, setRotation] = useState([0.5, 0, 0]);

  useEffect(() => {
  const interval = setInterval(() => {
  setRotation(prevRotation => [
  prevRotation[0],  // Increment x rotation by 0.01 radians
  prevRotation[1] +0.01,         // Keep y rotation same
  prevRotation[2]          // Keep z rotation same
  ]);  
  }, 20);

  return () => clearInterval(interval);
  }, []);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate()

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
   axios.post(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/auth/login`, {email, password})
   .then(res => {
    if(res.data){
        const decoded = jwtDecode(res.data.result)
        console.log(decoded.user);
        localStorage.setItem('token', res.data.result)
        if(decoded.user.role === 'admin' || decoded.user.role === 'Super Admin'){
          navigate('/admin')
          // navigate(0)
        }else{
          navigate('/')
          // navigate(0)
        }
      }else{
        alert("Invalid Credentials")
     }
   })
   .catch(err => console.log(err))  
  };

  return (
    <div className='LogIn'>
      <div className="canvas">

          <Canvas dpr={[1,2]} camera={{ fov: 45 }} >
      <PresentationControls speed={1.5} zoom={.5} polar={[0, 0]}>
        <Stage  >
          <Model scale={0.01} />
        </Stage>
      </PresentationControls>
    </Canvas>
      </div>
      <div className="loginContainer">
        <div className="main">
        <div className="formImage">
            <div className="objImg">
              <img src={Viper} alt="" />

            </div>

          </div>
          <div className="form">
            <h2>Log In</h2>

            <div className="mainForm">
              <div className="inputs">
              <input type="text" placeholder='Enter Email' value={email}  onChange={(e) => setEmail(e.target.value)}/>
              <input type="password" placeholder='Enter Password' value={password}  onChange={(e) => setPassword(e.target.value)}/>

              </div>
              <button onClick={handleSubmit}>Log In</button>

               <p className='forget'>
                Forget Password?
              </p>
              
              <p>
                Dont't have an acccount? <Link to='/signup' style={{color: '#9bf900',textDecoration: 'underline'}}> Sign Up</Link>
              </p>
            </div>
          </div>

        </div>
      </div>
      

    </div>
  )
}

export default Login