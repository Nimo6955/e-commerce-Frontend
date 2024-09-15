import React, { useEffect, useRef, useState } from 'react'
import './Login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";
import Viper from '../../assets/viper.jpg'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import { Modal } from 'antd';
import toast from 'react-hot-toast';



function Login() {
  function Model(props) {
    const { scene } = useGLTF("/pc_mouse_type-r.glb");
    return <primitive rotation={rotation} object={scene} {...props} />
  }
  const [rotation, setRotation] = useState([0.5, 0, 0]);

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
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [forgetEmail, setForgetEmail] = useState()
  const [otp, setOTP] = useState()
  const [newPassword, setNewPassword] = useState()
  const [repass, setRepass] = useState()
  const navigate = useNavigate()

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/auth/login`, { email, password })
      .then(res => {
        if (res.data) {
          const decoded = jwtDecode(res.data.result)
          console.log(decoded.user);
          localStorage.setItem('token', res.data.result)
          if (decoded.user.role === 'admin' || decoded.user.role === 'Super Admin') {
            navigate('/admin')
            // navigate(0)
          } else {
            navigate('/')
            navigate(0)
          }
        } else {
          alert("Invalid Credentials")
        }
      })
      .catch(err => console.log(err))
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const showOTPModal = () => {
    setIsOTPModalOpen(true);
  };

  const handleOTPOk = () => {
    setIsOTPModalOpen(false);
  };

  const handleOTPCancel = () => {
    setIsOTPModalOpen(false);
  };

  const [isNewPassModalOpen, setIsNewPassModalOpen] = useState(false);
  const showNewPassModal = () => {
    setIsNewPassModalOpen(true);
  };

  const handleNewPassOk = () => {
    setIsNewPassModalOpen(false);
  };

  const handleNewPassCancel = () => {
    setIsNewPassModalOpen(false);
  };


  function forgetPass(e) {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/auth/forgotPassword`, {
      email: forgetEmail
    }).then(res => {
      console.log(res);
      toast.success('OTP sent to your Email successfully')
      setIsModalOpen(false);
      showOTPModal()
    }).catch(err =>
      console.log(err)
    )
  }
  function varifyOTP(e) {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/auth/verifyOTP`, {
      email: forgetEmail,
      otp: otp
    }).then(res => {
      console.log(res);
      toast.success('OTP verified successfully')
      setIsOTPModalOpen(false);
      showNewPassModal()
    }).catch(err =>
      console.log(err)
    )
  }
  function UpdatePassword(e) {
    if (newPassword === repass) {

      e.preventDefault();
      axios.post(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/auth/updatePassword`, {
        email: forgetEmail,
        otp: otp,
        newPassword: newPassword
      }).then(res => {
        console.log(res);
        toast.success('Password Changed successfully')
        setIsNewPassModalOpen(false);
      }).catch(err =>
        console.log(err)
      )
    } else {
      toast.error('The passwords does not match ?')
    }
  }
  return (
    <div className='LogIn'>
      <div className="canvas">
        <Canvas dpr={[1, 2]} camera={{ fov: 45 }} >
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
                <input type="text" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />

              </div>
              <button onClick={handleSubmit}>Log In</button>

              <p className='forget' onClick={showModal}>
                Forget Password?
              </p>

              <p>
                Dont't have an acccount? <Link to='/signup' style={{ color: '#9bf900', textDecoration: 'underline' }}> Sign Up</Link>
              </p>
            </div>
          </div>

        </div>
      </div>

      <Modal maskClosable={false} open={isModalOpen} onOk={handleOk} okButtonProps={{ style: { display: 'none' } }} cancelButtonProps={{ style: { display: 'none' } }} onCancel={handleCancel}>
        <div className="deleteConfirmbox">
          <h5>Enter Your Email</h5>
          <div className="inputBox">
            <input className='ModalInput' type="text" value={forgetEmail} onChange={(e) => setForgetEmail(e.target.value)} />
          </div>
          <div className="btns">
            <button className='deleteBtn' onClick={forgetPass}>Submit</button>
            <button className='cancelBtn' onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      </Modal>
      <Modal maskClosable={false} open={isOTPModalOpen} onOk={handleOTPOk} okButtonProps={{ style: { display: 'none' } }} cancelButtonProps={{ style: { display: 'none' } }} onCancel={handleOTPCancel}>
        <div className="deleteConfirmbox">
          <h5>Enter The OTP Receved On Your E-mail</h5>
          <div className="inputBox">
            <input className='ModalInput' type="text" value={otp} onChange={(e) => setOTP(e.target.value)} />
          </div>
          <div className="btns">
            <button className='deleteBtn' onClick={varifyOTP}>Verify</button>
            {/* <button className='cancelBtn' onClick={() => setIsModalOpen(false)}>Cancel</button> */}
          </div>
        </div>
      </Modal>
      <Modal maskClosable={false} open={isNewPassModalOpen} onOk={handleNewPassOk} okButtonProps={{ style: { display: 'none' } }} cancelButtonProps={{ style: { display: 'none' } }} onCancel={handleNewPassCancel}>
        <div className="deleteConfirmbox">
          <h5>Enter New Password</h5>
          <div className="inputBox">
            <input className='ModalInput' type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <input className='ModalInput' type="text" value={repass} onChange={(e) => setRepass(e.target.value)} />
          </div>
          <div className="btns">
            <button className='deleteBtn' onClick={UpdatePassword}>Submit</button>
            {/* <button className='cancelBtn' onClick={() => setIsModalOpen(false)}>Cancel</button> */}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Login