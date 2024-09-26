import React, { useContext, useEffect, useRef, useState } from 'react'
import './Home.scss'
import Hero from '../../components/hero/Hero'
import Category from '../../components/category/Category'
import Product from '../../components/product/Product'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import WallPart from '../../components/wallPart/WallPart'
import Main from '../../components/mainHero/Main'
import { Modal, Popover } from 'antd';
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { MdLogout } from "react-icons/md";
import Loader from '../../Loader/Loader'
import Skull from '../../assets/skull.png'
import SkullLogo from '../../assets/skullLogo.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import VideoSection from '../../components/videoSection/VideoSection'
import KeyboardAnimation from '../../components/keyboardAnimation/KeyboardAnimation'
import Productcontext from '../../components/contextProvider/contectState'
import ProductMobile from '../../components/productMobile/ProductMobile'
import { FaHeadphonesSimple } from "react-icons/fa6";
import headphoneIconSkull from '../../assets/headphoneIconSkull2.png'
import { Tooltip } from 'antd';
import emailjs from '@emailjs/browser';
import ErrorPage from '../errorPage/ErrorPage'
import Navlogo from '../../assets/navLogo.png'


function Home({ user }) {
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const token = localStorage?.getItem('token');  
  let role = '';  

  const validateToken = (token) => {   
    return typeof token === 'string' && token.split('.').length === 3;  
  };  
  
  if (token) {  

    if (!validateToken(token)) {  
      console.error('Invalid token format');  
      return <ErrorPage/>
    }  
    try {  
      const decodedToken = jwtDecode(token);  
      role = decodedToken?.user?.role || '';  
    } catch (error) {  
      console.error('Failed to decode token:', error);  
      // Handle the error or set role to a default value if needed  
    }  
  } else {  
    console.log('No token found.');  
  }  
  
  // Now you can safely use the role variable


  const context = useContext(Productcontext)
  const { allProducts } = context;

  const games = allProducts?.filter(product => product?.category == "Game")

  const [loading, setLoading] = useState(true);  // loading = true

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
  const formRef = useRef()

  const sendEmail = (e) => {
    e.preventDefault();
    if (name !== '' || email !== '' || message !== '') {

        emailjs.sendForm('service_57q40mj', 'template_mxozz67', formRef.current, 'g24HAkHC3umKRYlxJ')
          .then((result) => {
            console.log(result.text);
          }, (error) => {
            console.log(error.text);
          });

    }
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 6 seconds  

      AOS.init({
        duration: 700,
      })
    }, 6000);


    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));
    // Cleanup the timer when the component unmounts  
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (

        <div className='home' id='Home'>
          <Navbar user={user.user} />

          <Main />
          <KeyboardAnimation />
          <VideoSection />
          <Hero />

          <div className="collection container2">
            <div className="info">
              <h2 className="heading">Shop By Category</h2>
              <p className='subheading'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, amet!</p>
            </div>
            <div className="categoryContent">
              <Category />
            </div>
          </div>
          <WallPart />
          <div className="collection container2">
            <div className="info">
              <h2 className="heading">Our Top Games</h2>
              <p className='subheading'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, amet!</p>
            </div>
            <div className="content">
              {games?.map(product => (
                <Product product={product} key={user?._id} />
              ))}
            </div>
            <div className="mobileContent">
              {games?.map(product => (
                <ProductMobile product={product} key={user?._id} />
              ))}
            </div>
          </div>
          {role === 'user' ?
            <Tooltip title="customer support">
              <div className="webIcon" onClick={showModal} >
                <img loading='lazy' className='webIconImg' style={{ zIndex: '4' }} src={Skull} alt="" />
                <img loading='lazy' src={headphoneIconSkull} style={{
                  // color: 'white',
                  position: 'absolute',
                  left: '50%',
                  top: "20%",
                  transform: "translate(-50%,-50%)",
                  height: '90px',
                  width: '115px',
                  zIndex: '2',
                  // filter: "drop-shadow(0px 1px 2px white)"
                }} />
              </div>
            </Tooltip>
            : ''}
          <Footer />
        </div>
        // <div id='Loading'>
        //     <Loader />
        //   </div>
      )}

      <Modal open={isModalOpen} onOk={handleOk} okButtonProps={{ style: { display: 'none' } }} cancelButtonProps={{ style: { display: 'none' } }} onCancel={handleCancel}>
        <div className="contactForm">
          <form className="contectContainer"
            ref={formRef}
            onSubmit={sendEmail}
            data-aos="zoom-in">
              <div className='titleCard'>
              <h1>Need Help? We're Here for You!</h1>
              <div className="logoImgContainer">
              <img src={SkullLogo} alt="" />
              </div>
              </div>
            <div className='name'>
              <label data-aos="zoom-in">NAME</label>
              <input name='from_name' value={name} onChange={(e) => setName(e.target.value)} type="text" data-aos="zoom-in" />
            </div>
            <div className='name'>
              <label data-aos="zoom-in">MESSAGE</label>
              <textarea name='message' value={message} onChange={(e) => setMessage(e.target.value)} cols="30" rows="6" type="text" data-aos="zoom-in" />
            </div>
          </form>
          <div className="btns">
            <button className='deleteBtn' onClick={sendEmail} >Send</button>
            <button className='cancelBtn' onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Home