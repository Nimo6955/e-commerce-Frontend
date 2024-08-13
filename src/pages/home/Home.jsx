import React, { useEffect } from 'react'
import './Home.scss'
import Hero from '../../components/hero/Hero'
import Category from '../../components/category/Category'
import Product from '../../components/product/Product'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import WallPart from '../../components/wallPart/WallPart'
import Main from '../../components/mainHero/Main'
import {Popover} from 'antd';
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { MdLogout } from "react-icons/md";
import Loader from '../../Loader/Loader'
import Skull from '../../assets/skull.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import VideoSection from '../../components/videoSection/VideoSection'





function Home(user) {

  const navigate = useNavigate();
  const token = localStorage?.getItem('token')
      const decodedToken = jwtDecode(token);
    // console.log(decodedToken.user.role);
    const role = decodedToken?.user.role
  
    
    
    function handleLogout(){
      localStorage?.removeItem('token')
      navigate('/login')
      navigate(0)
    }
  const content = (
    <div>
      <div className="adminPanal" style={{display: 'flex',gap: '20px',cursor:'pointer'}}>
        {/* <img src={user} alt=""style={{width: '40px',height: '30px'}} /> */}
        <h5 style={{marginBlock: 'auto',color: 'black'}}>Dark Mode</h5>
      </div>
      <hr />
      <div onClick={handleLogout} className="adminPanal" style={{display: 'flex',gap: '20px',cursor:'pointer'}}>
      <MdLogout style={{fontSize: '20px', color: '#9bf900'}} />
        <h5 style={{marginBlock: 'auto',color: 'black'}}>Log Out</h5>
      </div>
    </div>
  );

  setTimeout(() => {
    document.getElementById('Home').style.display = 'block'
    document.getElementById('Loading').style.display = 'none'
    AOS.init({
      duration: 700,
    });
  }, 6000);
  return (
    <>

    <div className='home' id='Home'>
     <Navbar user={user.user} />

      <Main/>
      <VideoSection/>
      <Hero/>

      <div className="collection container2">
        <div className="info">
          <h2 className="heading">Shop By Category</h2>
          <p className='subheading'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, amet!</p>
        </div>
        <div className="categoryContent">
          <Category/>
        </div>
      </div>
      <WallPart/>
      <div className="collection container2">
        <div className="info">
          <h2 className="heading">Our Top Pics</h2>
          <p className='subheading'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, amet!</p>
        </div>
        <div className="content">
          <Product/>
        </div>
      </div>
      {role === 'user' ? 
      <Popover content={content}>  
            <div className="webIcon">
              <img className='webIconImg' src={Skull} alt="" />
            </div>
      </Popover>
    : ''}
    <Footer/>
    </div>
    <div id='Loading'>
        <Loader />
      </div>
    </>
  )
}

export default Home