import React, { useState } from 'react'
import './AdminAddProduct.scss'
import { FiUploadCloud } from "react-icons/fi";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { MdLogout } from "react-icons/md";
import Kart from '../../assets/adminKart.gif'
import list from '../../assets/adminList.gif'
import user from '../../assets/adminUsers.gif'
import { jwtDecode } from 'jwt-decode'
import {Popover} from 'antd';
import { FaPlus } from "react-icons/fa";
import Skull from '../../assets/skullLogo.png'
import Add from '../../assets/adminAdd.gif'
import toast from 'react-hot-toast';



function AdminAddProduct() {

    const [productName, setProductName] = useState('')
    const [productImage1, setProductImage1] = useState()
    const [productImage2, setProductImage2] = useState()
    const [productImage3, setProductImage3] = useState()
    const [productImage4, setProductImage4] = useState()
    const [category, setCategory] = useState('')
    const [old_price, setOld_price] = useState('')
    const [new_price, setNew_price] = useState('')
    const [description, setDescription] = useState('')
    const [productImage1pre, setProductImage1pre] = useState()
    const [productImage3pre, setProductImage3pre] = useState()
    const [productImage2pre, setProductImage2pre] = useState()
    const [productImage4pre, setProductImage4pre] = useState()



    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {

        const formData = new FormData()
        formData.append('productName', productName)
        formData.append('category', category)
        formData.append('old_price', old_price)
        formData.append('new_price', new_price)
        formData.append('description',description)
        formData.append('productImage', productImage1)
        formData.append('productImage', productImage2)
        formData.append('productImage', productImage3)
        formData.append('productImage', productImage4)

        if(!productName || !category || !old_price || !new_price || !description || !productImage1 || !productImage2 || !productImage3 || !productImage4){
          toast.error('All Fields And Images Are Required', {
            style: {
              border: '1px solid red',
            //   padding: '16px',
              color: '#ffffff',
              background: 'black',
            //   borderRadius: '30px'
            },
            iconTheme: {
              primary: 'red',
              secondary: '#000',
            },
            duration: 2000
          });
        }else{
          axios.post(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/product/createProduct`, formData)
          .then(res => {
                console.log(res);

                toast.success('Product Added Successfully', {
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



                setProductName('')
                setCategory('')
                setNew_price('')
                setOld_price('')
                setDescription('')
                setProductImage1pre(null)
                setProductImage2pre(null)
                setProductImage3pre(null)
                setProductImage4pre(null)
              })
              .catch(err => console.log(err))
            }
    };

    const handleImageChange1 = (e) => {
        const file = e.target.files[0]
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            if (fileReader.readyState === fileReader.DONE) {
                setProductImage1pre(fileReader.result)
                setProductImage1(fileReader.result)
            }
        }
    }
    const handleImageChange2 = (e) => {
        const file = e.target.files[0]
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            if (fileReader.readyState === fileReader.DONE) {
                setProductImage2pre(fileReader.result)
                setProductImage2(fileReader.result)
            }
        }
    }
    const handleImageChange3 = (e) => {
        const file = e.target.files[0]
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            if (fileReader.readyState === fileReader.DONE) {
                setProductImage3pre(fileReader.result)
                setProductImage3(fileReader.result)
            }
        }
    }
    const handleImageChange4 = (e) => {
        const file = e.target.files[0]
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            if (fileReader.readyState === fileReader.DONE) {
                setProductImage4pre(fileReader.result)
                setProductImage4(fileReader.result)
            }
        }
    }

    const navigate = useNavigate();
  

    const token = localStorage.getItem('token')
    const decodedToken = jwtDecode(token);
    let adminId = decodedToken.user._id;
  
    const role = decodedToken.user.role
  
    function handleLogout(){
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
          {
            role == 'Super Admin' ? (
    
              <Link to={`/AdminAllUsers/${adminId}`}>
                <div className="adminPanal" style={{ display: 'flex', gap: '20px', cursor: 'pointer' }}>
                  <img loading='lazy' src={user} alt="" style={{ width: '40px', height: '30px',marginBlock: '5px' }} />
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
            <div className='addProduct'>
              <h1 className='banner'>Add Product</h1>
                <div className="container">
                    <label htmlFor="productName">Product Name</label>
                    <input type="text" name="productName" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} />
                    <div className="priceContainer">
                        <div className="section1">
                            <label htmlFor="oldProductPrice">Old Price</label>
                            <input type="number" name="oldProductPrice" id="oldProductPrice" value={old_price} onChange={(e) => setOld_price(e.target.value)} />

                        </div>
                        <div className="section2">
                            <label htmlFor="newProductPrice">Offer Price</label>
                            <input type="number" name="newProductPrice" id="newProductPrice" value={new_price} onChange={(e) => setNew_price(e.target.value)} />

                        </div>
                    </div>
                    <label htmlFor="productDescription">Product Description</label>
                    <textarea type="text" name="productDescription" id="productDescription" value={description} onChange={(e) => setDescription(e.target.value)} />

                    <label htmlFor="productCategory">Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} name="category" className='addProductSelector'>
                        <option value=""></option>
                        <option value="Accessories">Accessories</option>
                        <option value="Console">Console</option>
                        <option value="Game">Game</option>
                        <option value="Controller">Controller</option>
                    </select>
                    <div className="AllImageContainer" style={{ display: 'flex', gap: '2px', alignItems: 'flex-end' }}>

                        <label htmlFor='uploadInput' style={{ cursor: 'pointer' }}>

                            {productImage1pre ? (
                                <img loading='lazy' className='productImgae' src={productImage1pre} alt="" />
                            ) : (

                                <div className="productImgae">
                                    <FiUploadCloud className='uploadIcon' />
                                    <h5 >Upload Image</h5>
                                    <input id='uploadInput' accept="image/*" type="file" onChange={handleImageChange1} style={{ display: 'none' }} />
                                </div>
                            )}
                        </label>
                        <label htmlFor='uploadInput1' style={{ cursor: 'pointer' }}>
                            {productImage2pre ? (
                                <img loading='lazy' className='productImgae1' src={productImage2pre} alt="" />
                            ) : (
                                <div className="productImgae1">
                                    <FiUploadCloud className='uploadIcon1' />
                                    {/* <p >Upload Image</p> */}
                                    <input id='uploadInput1' type="file" onChange={handleImageChange2} style={{ display: 'none' }} />
                                </div>
                            )}

                        </label>
                        <label htmlFor='uploadInput2' style={{ cursor: 'pointer' }}>
                            {productImage3pre ? (
                                <img loading='lazy' className='productImgae2' src={productImage3pre} alt="" />
                            ) : (
                                <div className="productImgae2">
                                    <FiUploadCloud className='uploadIcon2' />
                                    {/* <p >Upload Image</p> */}
                                    <input id='uploadInput2' type="file" onChange={handleImageChange3} style={{ display: 'none' }} />
                                </div>
                            )}
                        </label>
                        <label htmlFor='uploadInput3' style={{ cursor: 'pointer' }}>
                            {productImage4pre ? (
                                <img loading='lazy' className='productImgae3' src={productImage4pre} alt="" />
                            ) : (
                                <div className="productImgae3">
                                    <FiUploadCloud className='uploadIcon3' />
                                    {/* <p >Upload Image</p> */}
                                    <input id='uploadInput3' type="file" onChange={handleImageChange4} style={{ display: 'none' }} />
                                </div>
                            )}
                        </label>
                    </div>
                    <button onClick={handleSubmit} className='submit'>ADD</button>
                </div>
            </div>
            <Popover content={content}>  
      <div className="icon">
        <FaPlus className='plus'/>
      </div>
        </Popover>
        </>
    )
}

export default AdminAddProduct