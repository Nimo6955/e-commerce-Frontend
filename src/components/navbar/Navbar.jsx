import React, { useContext, useEffect, useState } from 'react'
import './Navbar.scss'
import { Link, useNavigate } from 'react-router-dom'
import Icon from '../../assets/kart.gif'
import axios from 'axios';
import { userContext } from '../../App';
import { CgProfile } from "react-icons/cg";
import Logo from '../../assets/navLogo3.png'
import { IoReorderThree } from "react-icons/io5";
import { Popover } from 'antd';
import { BsHouseDoor } from "react-icons/bs";
import { PiPackage } from "react-icons/pi";
import { MdLogout } from "react-icons/md";


function Navbar() {
  const { user } = useContext(userContext);
  const navigate = useNavigate()
  const routToKart = () => {
    navigate('/cart')
  };


  const routToAccessories = () => {
    navigate('/allproducts', { state: 'All' })
  }
  const routToControllers = () => {
    navigate('/allproducts', { state: 'Controller' })
  }
  const routToGames = () => {
    navigate('/allproducts', { state: 'Game' })
  }


  function routToProfile() {
    navigate('/profile', { state: "profile" })
  }

  function routToAddress() {
    navigate('/profile', { state: "address" })
  }

  function routToOrders() {
    navigate('/profile', { state: "orders" })
  }
  function handleLogout() {
    localStorage?.removeItem('token')
    navigate('/login')
    navigate(0)
  }
  function getUniqueIds(ids) {  
    return [...new Set(ids)];  
}  
  

const Karts = getUniqueIds(user?.karts);  
  const content = (
    <div style={{ padding: '10px', background: '#263427', borderRadius: '5px' }}>
      <div onClick={routToProfile} className="mobileNavRoutes" style={{ height: '50px', width: '130px', display: 'flex' }}>
        <div style={{ display: 'flex', cursor: 'pointer', alignItems: 'center', marginBlock: 'auto' }}>
          <CgProfile className='mobileNavRoutesIcon' style={{ fontSize: '20px', marginInline: '10px', marginBlock: 'auto' }} /><h5 style={{ color: 'white', marginBlock: 'auto' }}>Profile</h5>
        </div>
      </div>
      <hr style={{ marginBlock: '2px' }} />
      <div onClick={routToAddress} className="mobileNavRoutes" style={{ height: '50px', width: '130px', display: 'flex' }}>
        <div style={{ display: 'flex', cursor: 'pointer', alignItems: 'center', marginBlock: 'auto' }}>
          <BsHouseDoor className='mobileNavRoutesIcon' style={{ fontSize: '20px', marginInline: '10px', marginBlock: 'auto' }} /><h5 style={{ marginBlock: 'auto', color: 'white' }}>Address</h5>
        </div>
      </div>
      <hr style={{ marginBlock: '2px' }} />
      <div onClick={routToOrders} className="mobileNavRoutes" style={{ height: '50px', width: '130px', display: 'flex' }}>
        <div style={{ display: 'flex', cursor: 'pointer', alignItems: 'center', marginBlock: 'auto' }}>
          <PiPackage className='mobileNavRoutesIcon' style={{ fontSize: '20px', marginInline: '10px', marginBlock: 'auto' }} /><h5 style={{ marginBlock: 'auto', color: 'white' }}>Orders</h5>
        </div>
      </div>
      <hr style={{ marginBlock: '2px' }} />
      <div onClick={handleLogout} className="mobileNavRoutes" style={{ height: '50px', width: '130px', display: 'flex' }}>
        <div style={{ display: 'flex', cursor: 'pointer', alignItems: 'center', marginBlock: 'auto' }}>
          <MdLogout  className='mobileNavRoutesIcon' style={{ fontSize: '20px', marginInline: '10px', marginBlock: 'auto' }} /><h5 style={{ marginBlock: 'auto', color: 'white' }}>Log Out</h5>
        </div>
      </div>
    </div>
  );

  const token = localStorage?.getItem('token')

  const content2 = (
    <div style={{ padding: '10px', background: '#263427', borderRadius: '5px' }}>
    <div onClick={routToProfile} className="mobileNavRoutes" style={{ height: '50px', width: '130px', display: 'flex' }}>
        <div style={{ display: 'flex', cursor: 'pointer', alignItems: 'center', marginBlock: 'auto' }}>
          <CgProfile className='mobileNavRoutesIcon' style={{ fontSize: '20px', marginInline: '10px', marginBlock: 'auto' }} /><h5 style={{ marginBlock: 'auto', color: 'white' }}>Profile</h5>
        </div>
      </div>
      <hr style={{ marginBlock: '2px' }} />
      <div onClick={handleLogout} className="mobileNavRoutes" style={{ height: '50px', width: '130px', display: 'flex' }}>
        <div  style={{ display: 'flex', cursor: 'pointer', alignItems: 'center', marginBlock: 'auto' }}>
          <MdLogout onClick={handleLogout} className='mobileNavRoutesIcon' style={{ fontSize: '20px', marginInline: '10px', marginBlock: 'auto' }} /><h5 style={{ marginBlock: 'auto', color: 'white' }}>Log Out</h5>
        </div>
      </div>
    </div>
  );

  const content3 = (
    <div style={{ padding: '10px', background: '#263427', borderRadius: '5px' }}>
    <div onClick={() => navigate('/signup')} className="mobileNavRoutes" style={{ height: '50px', width: '130px', display: 'flex' }}>
        <div style={{ display: 'flex', cursor: 'pointer', alignItems: 'center', marginBlock: 'auto' }}>
          <CgProfile className='mobileNavRoutesIcon' style={{ fontSize: '20px', marginInline: '10px', marginBlock: 'auto' }} /><h5 style={{ marginBlock: 'auto', color: 'white' }}>Sign Up</h5>
        </div>
      </div>
      <hr style={{ marginBlock: '2px' }} />
      <div onClick={()=> navigate('/login')} className="mobileNavRoutes" style={{ height: '50px', width: '130px', display: 'flex' }}>
        <div  style={{ display: 'flex', cursor: 'pointer', alignItems: 'center', marginBlock: 'auto' }}>
          <MdLogout onClick={handleLogout} className='mobileNavRoutesIcon' style={{ fontSize: '20px', marginInline: '10px', marginBlock: 'auto' }} /><h5 style={{ marginBlock: 'auto', color: 'white' }}>Log In</h5>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <div className="Navbar">
        <div className="container nav-container">
          <div className="nav-left">
            <ul className="link-group">
              <li className="hover-link">
                <p onClick={routToAccessories} className="link" >All products</p>
              </li>
              <li className="hover-link">
                <p onClick={routToControllers} className="link">Controllers</p>
              </li>
              <li className="hover-link">
                <p onClick={routToGames} className="link" >Games</p>
              </li>
            </ul>
          </div>
          <div className="nav-center">
            <Link to="/" className="nav-center">
              <h3>MANIAC</h3>
              <img className='banner' src={Logo} alt="" />
              <h3>GAMING</h3>
            </Link>
          </div>
          <div className="nav-right">
            <div className="nav-cartNav hover-link" >
              <img src={Icon} className="iconNav" onClick={routToKart} />
              <span className="cart-count center">{Karts?.length}</span>
            </div>
            <div className="popoverDesktop"style={{ marginBlock: 'auto' }}>
            <Popover content={token ?  content2 : content3}>
              <CgProfile className='profileIcon'  />
            </Popover>
            </div>
            <div className="popoverMobile"  style={{ marginBlock: 'auto' }}>
            <Popover content={token ?  content : content3}>
              <IoReorderThree className='profileIcon' />
            </Popover>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar