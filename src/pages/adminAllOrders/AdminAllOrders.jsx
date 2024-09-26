import React, { useContext, useEffect, useState } from 'react';
import './AdminAllOrders.scss';
import axios from 'axios';
import { Popover } from 'antd';
import list from '../../assets/adminList.gif'
import Skull from '../../assets/skullLogo.png'
import Add from '../../assets/adminAdd.gif'
import { MdErrorOutline, MdLogout } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FaPlus } from "react-icons/fa";
import userimg from '../../assets/adminUsers.gif';
import Kart from '../../assets/adminKart.gif'



function AdminAllOrders() {
    const [allOrders, setAllOrders] = useState([]);
    const [user, setUser] = useState()
    const [orderState, setOrderState] = useState()
    const navigate = useNavigate()
    function handleStatus(id,{status}){
        setOrderState(status)
        axios.put(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/order/updateorder`,{
            id: id,
            status: status
        })
            .then(res => {
             console.log(res)
             fetchOrders()
            })
            .catch(err => console.log(err))
    }
    
    function fetchOrders(){
           // Fetch all orders  
           axios.get(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/order/allorders`)
           .then(response => {
               setAllOrders(response.data.result.orders);
           })
           .catch(err => console.log(err));
    }

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/auth/`)
            .then(user => {
                // console.log(user.data.result.user);
                const allUsers = user.data.result.user;
                setUser(allUsers)
            })
            .catch(err => console.log(err))
            fetchOrders()
    }, []);

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
      <div style={{padding: '20px'}}>
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
  
            <Link to={`/AdminAllUsers/${adminId}`}>
              <div className="adminPanal" style={{ display: 'flex', gap: '20px', cursor: 'pointer' }}>
                <img loading='lazy' src={userimg} alt="" style={{ width: '40px', height: '30px',marginBlock: '5px' }} />
                <h5 style={{ marginBlock: 'auto', color: 'black' }}>All Users</h5>
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

    return (
        <>
            <div className='adminAllOrders'>
                <h1 className='banner'>All Orders</h1>
                <div className="orderContainer">
                {allOrders?.map(order => {
                    // Find the user whose id matches the order's userId  
                    const usera = user?.find(u => u._id === order.userId);

                    return (
                        <div className='singleOrder'>
                                <h5>Name: {usera ? usera.name : 'Unknown User'}</h5> {/* Display user name, or default to "Unknown User" */}
                                <div className="order">
                                    <p>Order Id: {order._id}</p>
                                    <p>Status: {order.status}</p>
                                    {/* <p>Total Amount: ${order.totalAmount}</p>
                                    <p>Payment Method: {order.paymentMethod}</p> */}
                                    <div className="btns">
                                        <button onClick={()=>handleStatus(order._id,{status: "Pending"})} style={{backgroundColor: order?.status == "Pending" ? "yellow": '' }}>Pending</button>
                                        <button onClick={()=>handleStatus(order._id,{status: "Shipped"})} style={{backgroundColor: order?.status == "Shipped" ? "orange": '',color: order?.status == "Shipped" ? "white": '',}}>Shipped</button>
                                        <button onClick={()=>handleStatus(order._id,{status: "Delivered"})} style={{backgroundColor: order?.status == "Delivered" ? "green": '',color: order?.status == "Delivered" ? "white": '',}}>Delivered</button>
                                        <button onClick={()=>handleStatus(order._id,{status: "Cancelled"})} style={{backgroundColor: order?.status == "Cancelled" ? "red": '',color: order?.status == "Cancelled" ? "white": '',}}>Cancelled</button>
                                    </div>
                                </div>
                        </div>
                    );
                })}
                </div>
            </div>
            <Popover content={content}>
        <div className="icon">
          <FaPlus className='plus' />
        </div>
      </Popover>
        </>
    );
}

export default AdminAllOrders;