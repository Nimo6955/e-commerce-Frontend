import React, { useContext, useEffect, useState } from 'react'
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
import KeyboardAnimation from '../../components/keyboardAnimation/KeyboardAnimation'
import Productcontext from '../../components/contextProvider/contectState'
import ProductMobile from '../../components/productMobile/ProductMobile'
import { FaHeadphonesSimple } from "react-icons/fa6";
import headphoneIconSkull from '../../assets/headphoneIconSkull2.png'
import { Tooltip } from 'antd';



function Home({user}) {
  const navigate = useNavigate();
  const token = localStorage?.getItem('token')
      const decodedToken = token ? jwtDecode(token) : '';
    // console.log(decodedToken.user.role);
    const role = decodedToken ? decodedToken?.user.role : ''
  
    
    
    function handleLogout(){
      localStorage?.removeItem('token')
      navigate('/login')
      navigate(0)
    }

    const context = useContext(Productcontext)
    const { allProducts } = context;

    const games = allProducts?.filter(product => product?.category == "Game")

    
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

  const [loading, setLoading] = useState(true);  // loading = true

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
                <Loader/>  
            ) : (

    <div className='home' id='Home'>
     <Navbar user={user.user} />

      <Main/>
      <KeyboardAnimation/>
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
          <h2 className="heading">Our Top Games</h2>
          <p className='subheading'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, amet!</p>
        </div>
        <div className="content">
          {games?.map( product => (
          <Product product={product} key={user?._id} />
          ))}
        </div>
        <div className="mobileContent">
        {games?.map( product => (
          <ProductMobile product={product} key={user?._id} />
          ))}
        </div>
      </div>
      {role === 'user' ? 
       <Tooltip title="customer support">
            <div className="webIcon">
              <img className='webIconImg' style={{zIndex: '4'}}  src={Skull} alt="" />
              <img src={headphoneIconSkull}  style={{
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
    <Footer/>
    </div>
    // <div id='Loading'>
    //     <Loader />
    //   </div>
      )} 
    </>
  )
}

export default Home