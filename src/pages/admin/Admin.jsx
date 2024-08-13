import React, { useState } from 'react'
import Cod from '../../assets/cod.mp4'
import './Admin.scss'
import { FaPlus } from "react-icons/fa";
import {Popover} from 'antd';
import Kart from '../../assets/adminKart.gif'
import list from '../../assets/adminList.gif'
import user from '../../assets/adminUsers.gif'
import { Link, useNavigate } from 'react-router-dom';
import { MdLogout } from "react-icons/md";
import { jwtDecode } from 'jwt-decode'




function Admin() {

  const navigate = useNavigate();
  

  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token);
  let adminId = decodedToken.user._id;


  function handleLogout(){
    localStorage.removeItem('token')
    navigate('/login')
    navigate(0)
  }

  const content = (
    <div>
      <Link to={`/adminaddproduct/${adminId}`} >
      <div className="adminPanal" style={{display: 'flex',gap: '20px',cursor:'pointer'}}>
        <img src={Kart} alt="" style={{height: '40px',width: '40px'}}/>
        <h5 style={{marginBlock: 'auto',color: 'black'}}>Add Product</h5>
      </div>
      </Link>
      <hr />
      <Link to={`/adminallproducts/${adminId}`}>
      <div className="adminPanal" style={{display: 'flex',gap: '20px',cursor:'pointer'}}>
        <img src={list} alt="" style={{height: '40px',width: '40px'}}/>
        <h5 style={{marginBlock: 'auto',color: 'black'}}>All Products</h5>
      </div>
      </Link>
      <hr />
      <Link>
      <div className="adminPanal" style={{display: 'flex',gap: '20px',cursor:'pointer'}}>
        <img src={user} alt=""style={{width: '40px',height: '30px'}} />
        <h5 style={{marginBlock: 'auto',color: 'black'}}>All Users</h5>
      </div>
      </Link>
      <hr />
      <Link>
      <div onClick={handleLogout} className="adminPanal" style={{display: 'flex',gap: '20px',cursor:'pointer'}}>
      <MdLogout style={{fontSize: '40px', color: '#9bf900'}} />
        <h5 style={{marginBlock: 'auto',color: 'black'}}>Log Out</h5>
      </div>
      </Link>
    </div>
  );
  return (
    <>
    <div className='Admin'>
      <video autoPlay='true' muted loop id="myVideo" >
        <source src={Cod} type="video/mp4" />
      </video>
      <Popover content={content}>  
      <div className="icon">
        <FaPlus className='plus'/>
      </div>
        </Popover>
    <h1 className='adminTxt'>ADMIN</h1>
    </div>
    </>
  )
}

export default Admin