import React, { useEffect, useState } from 'react'
import './AdminAllUsers.scss'
import axios from 'axios';
import { FaPlus } from "react-icons/fa";
import { Popover } from 'antd';
import Kart from '../../assets/adminKart.gif'
import user from '../../assets/adminUsers.gif'
import { Link, useNavigate } from 'react-router-dom';
import { MdErrorOutline, MdLogout } from "react-icons/md";
import { jwtDecode } from 'jwt-decode'
import list from '../../assets/adminList.gif'
import Skull from '../../assets/skullLogo.png'
import Add from '../../assets/adminAdd.gif'


function AdminAllUsers() {

  const [users, setUsers] = useState()

  const navigate = useNavigate();
  const [seed, setSeed] = useState(null)

  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token);
  let adminId = decodedToken.user._id;

  const role = decodedToken.user.role


  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/login')
    navigate(0)
  }

  const content = (
    <div style={{ padding: '20px' }}>
      <Link to={`/admin`} >
        <div className="adminPanal" style={{ display: 'flex', gap: '20px', cursor: 'pointer' }}>
          <div className="" style={{background: '#000', height: '40px', width: '40px', borderRadius: '50%',paddingTop: '2px'}}>
          <img loading='lazy' src={Skull} alt="" style={{ height: '40px', width: '40px' }} />
          </div>
          <h5 style={{ marginBlock: 'auto', color: 'black' }}>Admin Page</h5>
        </div>
      </Link>
      <hr />
      <Link to={`/adminaddproduct/${adminId}`} >
        <div className="adminPanal" style={{ display: 'flex', gap: '20px', cursor: 'pointer' }}>
          <img loading='lazy' src={Add} alt="" style={{ height: '40px', width: '40px' }} />
          <h5 style={{ marginBlock: 'auto', color: 'black' }}>Add Product</h5>
        </div>
      </Link>
      <hr />
      <Link to={`/adminallproducts/${adminId}`}>
        <div className="adminPanal" style={{ display: 'flex', gap: '20px', cursor: 'pointer' }}>
          <img loading='lazy' src={list} alt="" style={{ height: '40px', width: '40px' }} />
          <h5 style={{ marginBlock: 'auto', color: 'black' }}>All Products</h5>
        </div>
      </Link>
      <hr />
      {
        role == 'Super Admin' ? (
          <Link to={`/adminAllOrders/${adminId}`}>
            <div className="adminPanal" style={{ display: 'flex', gap: '20px', cursor: 'pointer' }}>
              <img loading='lazy' src={Kart} alt="" style={{ height: '40px', width: '40px' }} />
              <h5 style={{ marginBlock: 'auto', color: 'black' }}>All Orders</h5>
            </div>
          </Link>
        ) : ''}
      {
        role == 'Super Admin' ? (
          <hr />
        ) : ''}
      <Link>
        <div onClick={handleLogout} className="adminPanal" style={{ display: 'flex', gap: '20px', cursor: 'pointer' }}>
          <MdLogout style={{ fontSize: '30px', color: '#9bf900' }} />
          <h5 style={{ marginBlock: 'auto', color: 'black' }}>Log Out</h5>
        </div>
      </Link>
    </div>
  );


  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/auth/`)
      .then(user => {
        const allUsers = user.data.result.user;
        const Allusers = allUsers?.filter(user => user.role == 'user' || user.role == 'admin')
        setUsers(Allusers)
      })
      .catch(err => console.log(err))
  }, [])

  const changeRole = (id) => {
    axios.post(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/user/changeRole/${id}`)
      .then((res) => {
        const updatedUserRole = res?.data?.result?.user?.role; // Adjust based on the response structure  
        setUsers((prevUsers) =>
          prevUsers.map(user =>
            user._id === id ? { ...user, role: updatedUserRole } : user
          )
        );
        setSeed(Math.random());

      }).catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className='AdminAllusers'>
        <h1>SUPER ADMIN PAGE</h1>
        <div className="container" key={seed}>
          <h5 style={{ fontFamily: 'MODERN', color: '#9bf900' }}>All Users</h5>
          {users?.map((user) =>
            <div className="usersContainer">

              <h5>{user.name}</h5>
              <div className="bbtns">
                <button className='block' onClick={() => changeRole(user._id)}>Make {user?.role == 'admin' ? 'User' : 'Admin'}</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Popover content={content}>
        <div className="icon">
          <FaPlus className='plus' />
        </div>
      </Popover>
    </>
  )
}

export default AdminAllUsers