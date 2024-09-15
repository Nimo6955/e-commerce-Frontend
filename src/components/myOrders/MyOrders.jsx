import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.scss';
import axios from 'axios';
import { userContext } from '../../App';
import confirm from '../../assets/confirm.gif'
import { Modal, Popover } from 'antd';
import { IoReorderThree, IoTrashBinOutline } from 'react-icons/io5';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import toast from "react-hot-toast";


function MyOrders() {
    const { user } = useContext(userContext);
    const [allOrders, setAllOrders] = useState([]);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [id, setId] = useState()
    const [status, setstatus] = useState()
    const showModal = (id) => {
        setIsModalOpen(true);
        setId(id)
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    function fetchOrders() {
        // Fetch all orders  
        axios.get(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/order/allorders`)
            .then(response => {
                setAllOrders(response.data.result.orders);
            })
            .catch(err => console.log(err));
    }
    function deleteOrder(id) {
        // Fetch all orders  
        axios.delete(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/order/removeOrder`, {
            data: {
                userId: user._id,
                orderId: id
            }
        })
            .then(response => {
                console.log(response);
                setIsModalOpen(false)

                toast.success('Order Deleted Successfully', {
                    style: {
                      border: '1px solid #9bf900',
                    //   padding: '16px',
                      color: '#ffffff',
                      background: 'black',
                    //   borderRadius: '30px'
                    },
                    iconTheme: {
                      primary: '#9bf900',
                      secondary: '#000',
                    },
                    duration: 2000
                  });
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchOrders()
    }, [allOrders]);

    const usersOrders = allOrders.filter(order => order.userId === user?._id);

    const content = (
        <div style={{ padding: '20px' }}>
            <div className="adminPanal" style={{ display: 'flex', gap: '20px', cursor: 'pointer', alignItems: 'center' }}>
                <h5 style={{ marginBlock: 'auto', color: 'black' }}>{status}</h5>
            </div>
            <hr />
            <div onClick={() => showModal(id)} className="adminPanal" style={{ display: 'flex', gap: '20px', cursor: 'pointer', alignItems: 'center' }}>
                <h5 style={{ marginBlock: 'auto', color: 'black' }}>delete</h5>
            </div>
        </div>
    );

    return (
        <div className='myOrdersComp'>
            <div className="personalInfo">
                <h3>My Orders</h3>
            </div>

            <div className="rightContainer">
                <div className="orderContainer">
                    {usersOrders.length > 0 ? (
                        usersOrders.map(order => (
                            <div key={order._id} className="singleOrder">
                                {/* Loop through each item's product in the current order */}
                                <div style={{ display: 'flex', flexDirection: 'column' }} className="">
                                    {order.items.map(item => (
                                        <>
                                        <div key={item._id} className="singleOrdersLeftPart  position-relative">
                                            <div className='orderProductNameNImg'>

                                                <img style={{ height: '100px', width: '100px' }} src={item.product.productImage[0]} alt={item.product.productName} />
                                                <h5>{item.product.productName}</h5>
                                            </div>
                                            {/* <h6>quantity: {item.quantity}</h6> */}
                                      <span style={{top: '5px',right: '5px',background: '#e0b146',color: '#415d43'}} class="position-absolute  badge rounded-pill ">
                                      Quantity: ({item.quantity})
                                    </span>
                                        </div>
                                        </>
                                    ))}
                                </div>
                                {/* Side part for the order status */}
                                <div className="singleOrdersRightPart" >
                                    <div className="statusNdelete" style={{ backgroundColor: order.status == "Pending" ? "yellow" : order.status == "Shipped" ? "orange" : order.status == "Delivered" ? "green" : order.status == "Cancelled" ? "red" : '' }}>
                                        <h5> {order.status}</h5>
                                    </div>
                                    <div className="deleteBtnBox" onClick={() => showModal(order._id)}>
                                        <button className='productDelete' data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" title="Delete Order"><IoTrashBinOutline className='deleteIcon' /></button>
                                    </div>
                                    <div className="popover" style={{ background: '#415d43', border: 'none' }} >
                                        <Popover onClick={() => { setId(order._id); setstatus(order.status) }} content={content} trigger="click">
                                            <PiDotsThreeOutlineVerticalFill className='profileIcon' style={{ marginBlock: 'auto', color: 'white', fontSize: '20px' }} />
                                        </Popover>
                                    </div>
                                  
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: 'white' }}>No orders found.</p>
                    )}
                </div>
            </div>
            <Modal open={isModalOpen} onOk={handleOk} okButtonProps={{ style: { display: 'none' } }} cancelButtonProps={{ style: { display: 'none' } }} onCancel={handleCancel}>
                <div className="deleteConfirmbox" style={{padding: '20px'}}>
                    <h6>Delete this order ?</h6>
                    <div className="imgBox">
                        <img className='confirmGif' src={confirm} alt="" />
                    </div>
                    <div className="btns">
                        <button className='deleteBtn' onClick={() => deleteOrder(id)}>Delete</button>
                        <button className='cancelBtn' onClick={() => setIsModalOpen(false)}>Cancel</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default MyOrders;