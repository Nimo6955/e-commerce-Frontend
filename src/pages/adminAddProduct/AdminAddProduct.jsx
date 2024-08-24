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
import Skull from '../../assets/skull.png'


function AdminAddProduct() {

    const [productName, setProductName] = useState('')
    const [productImage1, setProductImage1] = useState()
    const [productImage2, setProductImage2] = useState()
    const [productImage3, setProductImage3] = useState()
    const [productImage4, setProductImage4] = useState()
    const [category, setCategory] = useState('')
    const [old_price, setOld_price] = useState('')
    const [new_price, setNew_price] = useState('')
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
        formData.append('productImage', productImage1)
        formData.append('productImage', productImage2)
        formData.append('productImage', productImage3)
        formData.append('productImage', productImage4)
        axios.post(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/product/createProduct`, formData)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err))
    };

    const handleImageChange1 = (e) => {
        const file = e.target.files[0]
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            if (fileReader.readyState === fileReader.DONE) {
                setProductImage1pre(fileReader.result)
                setProductImage1(file)
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
                setProductImage2(file)
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
                setProductImage3(file)
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
                setProductImage4(file)
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
        <div>
          <Link to={`/admin`} >
          <div className="adminPanal" style={{display: 'flex',gap: '20px',cursor:'pointer'}}>
            <img src={Skull} alt="" style={{height: '40px',width: '40px'}}/>
            <h5 style={{marginBlock: 'auto',color: 'black'}}>Admin Page</h5>
          </div>
          </Link>
          <hr />
          <Link to={`/adminallproducts/${adminId}`}>
          <div className="adminPanal" style={{display: 'flex',gap: '20px',cursor:'pointer'}}>
            <img src={list} alt="" style={{height: '40px',width: '40px'}}/>
            <h5 style={{marginBlock: 'auto',color: 'black'}}>All Products</h5>
          </div>
          </Link >
          <hr />
          {
        role == 'Super Admin' ? (

          <Link to={`/AdminAllUsers/${adminId}`}>
      <div className="adminPanal" style={{display: 'flex',gap: '20px',cursor:'pointer'}}>
        <img src={user} alt=""style={{width: '40px',height: '30px'}} />
        <h5 style={{marginBlock: 'auto',color: 'black'}}>All Users</h5>
      </div>
      </Link>
      ) : ''}
       {
        role == 'Super Admin' ? (
      <hr />
    ) : ''}
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
            <div className='addProduct'>
                <div className="container">
                    <label htmlFor="productName">Product Name</label>
                    <input type="text" name="productName" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} />
                    <div className="priceContainer">
                        <div className="section1">
                            <label htmlFor="oldProductPrice">Old Price</label>
                            <input type="text" name="oldProductPrice" id="oldProductPrice" value={old_price} onChange={(e) => setOld_price(e.target.value)} />

                        </div>
                        <div className="section2">
                            <label htmlFor="newProductPrice">Offer Price</label>
                            <input type="text" name="newProductPrice" id="newProductPrice" value={new_price} onChange={(e) => setNew_price(e.target.value)} />

                        </div>
                    </div>

                    <label htmlFor="productCategory">Category</label>
                    <select defaultValue={category} onChange={(e) => setCategory(e.target.value)} name="category" className='addProductSelector'>
                        <option defaultValue="Accessories">Accessories</option>
                        <option value="Console">Console</option>
                        <option value="Game">Game</option>
                        <option value="Controller">Controller</option>
                    </select>
                    <div className="AllImageContainer" style={{ display: 'flex', gap: '2px', alignItems: 'flex-end' }}>

                        <label htmlFor='uploadInput' style={{ cursor: 'pointer' }}>

                            {productImage1pre ? (
                                <img className='productImgae' src={productImage1pre} alt="" />
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
                                <img className='productImgae1' src={productImage2pre} alt="" />
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
                                <img className='productImgae2' src={productImage3pre} alt="" />
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
                                <img className='productImgae3' src={productImage4pre} alt="" />
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