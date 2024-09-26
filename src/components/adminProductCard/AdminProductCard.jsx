import React, { useContext, useEffect, useState } from 'react'
import './AdminProductCard.scss'
import { IoTrashBinOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { Tooltip } from 'bootstrap';
import { Modal } from 'antd';
import axios from 'axios';
import Productcontext from '../../components/contextProvider/contectState'


function AdminProductCard({product}) {
    const [seed,setSeed] = useState(null)
    // const [allProducts,setAllProducts] = useState()
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

    const context = useContext(Productcontext)
    const { allProducts } = context;
    // const fetchInfo = async () => {
    //     try {
    //       const response = await axios.get(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/product/allproducts`);
    //       setAllProducts(response.data);
    //     } catch (error) {
    //       console.error('Error fetching the products', error);
    //     }
    //   };
    
    //   useEffect(() => {
    //     fetchInfo();
    //   }, []);

    function deleteProduct(){
        axios.delete(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/product/deleteProduct/${product?._id}`)
        .then(res => {
            setSeed(Math.random())
            console.log(res);
           return allProducts
        })
        .catch(err => console.log(err))

};

    useEffect(() => {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        const tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));
    }, []);
  return (
    <>
    <div className='allProductBox' key={seed}>
        <div className="productsCard">  
        <img loading='lazy' className="productImg" src={product?.productImage[0]} alt="" />  
        <p className="name">{product?.productName}</p>  
        <p className="price">{product?.old_price}</p>  
        <p className="price">{product?.new_price}</p>
        <div className='editBtnBox' onClick={showModal}>
        <button className='productEdit'data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" title="Edit Product"><CiEdit className='EditIcon'  /></button>  
        </div>  
        <div className="deleteBtnBox" onClick={deleteProduct}>
        <button className='productDelete'data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" title="Delete Product"><IoTrashBinOutline className='deleteIcon' /></button>  
        </div>
      </div> 

    </div>
    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        
    </Modal>
    </>
  )
}

export default AdminProductCard