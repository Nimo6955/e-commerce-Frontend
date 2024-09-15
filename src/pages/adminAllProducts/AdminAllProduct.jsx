import React, { useContext, useEffect, useState } from 'react'
import Productcontext from '../../components/contextProvider/contectState'
import Product from '../../components/product/Product';
import './AdminAllProducts.scss'
import AdminProductCard from '../../components/adminProductCard/AdminProductCard';
import { IoTrashBinOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import axios from 'axios';
import { Modal } from 'antd';
import confirm from '../../assets/confirm.gif'
import user from '../../assets/adminUsers.gif'
import { jwtDecode } from 'jwt-decode'
import {Popover} from 'antd';
import { FaPlus } from "react-icons/fa";
import Skull from '../../assets/skull.png'
import { Link, useNavigate } from 'react-router-dom';
import { MdLogout } from "react-icons/md";
import Kart from '../../assets/adminKart.gif'
import { FiUploadCloud } from 'react-icons/fi';
import Add from '../../assets/adminAdd.gif'
import list from '../../assets/adminList.gif';
import toast from 'react-hot-toast';


function AdminAllproduct() {

  // const context = useContext(Productcontext)
  // const { allProducts } = context;

  const [productName,setProductName] = useState()
  const [new_price,setNew_price] = useState()
  const [old_price,setOld_price] = useState()
  const [category,setCategory] = useState()
  const [description, setDescription] = useState('')

  const [productImage1,setProductImage1] = useState()
  const [productImage2,setProductImage2] = useState()
  const [productImage3,setProductImage3] = useState()
  const [productImage4,setProductImage4] = useState()


  const [productImage1pre, setProductImage1pre] = useState()
  const [productImage2pre, setProductImage2pre] = useState()
  const [productImage3pre, setProductImage3pre] = useState()
  const [productImage4pre, setProductImage4pre] = useState()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState()
  const showModal = (id) => {
    setIsModalOpen(true);
    console.log(id);
    setId(id)
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [displayImg1, setDisplayImg1] = useState('');
  const [displayImg2, setDisplayImg2] = useState('');
  const [displayImg3, setDisplayImg3] = useState('');
  const [displayImg4, setDisplayImg4] = useState('');

  const showEditModal = (id,img1,img2,img3,img4) => {
    setIsEditModalOpen(true);
    console.log(id);
    setId(id);
    setDisplayImg1(img1)
    setDisplayImg2(img2)
    setDisplayImg3(img3)
    setDisplayImg4(img4)
  };

  const handleEditOk = () => {
    setIsEditModalOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  const [allProducts, setAllProducts] = useState()
  const displaySingleProduct = allProducts?.filter((product) => product?._id === id)
  // console.log(displaySingleProduct ? displaySingleProduct[0] : '') ;
  const newProduct = displaySingleProduct ? displaySingleProduct[0] : ''

  const fetchInfo = async () => {
    try {
      const response = axios.get(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/product/`)
        .then(products => {
          setAllProducts(products.data.result.AllProducts);
          // console.log(products.data.result.AllProducts);
        })
    } catch (error) {
      console.error('Error fetching the products', error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  async function deleteProduct(id) {
    await axios.delete(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/product/deleteProduct`, { data: { id: id } })
      .then(res => {
        // setSeed(Math.random())
        console.log(res);
        fetchInfo()
      })
      .catch(err => console.log(err))
      setIsModalOpen(false);
  };


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
          <div className="adminPanal" style={{display: 'flex',gap: '20px',cursor:'pointer'}}>
            <img src={Skull} alt="" style={{height: '40px',width: '40px'}}/>
            <h5 style={{marginBlock: 'auto',color: 'black'}}>Admin Page</h5>
          </div>
          </Link>
          <hr />
      <Link to={`/adminaddproduct/${adminId}`} >
        <div className="adminPanal" style={{ display: 'flex', gap: '20px', cursor: 'pointer' }}>
          <img src={Add} alt="" style={{ height: '40px', width: '40px' }} />
          <h5 style={{ marginBlock: 'auto', color: 'black' }}>Add Product</h5>
        </div>
      </Link>
      <hr />
      {
        role == 'Super Admin' ? (
          <Link to={`/adminAllOrders/${adminId}`}>
            <div className="adminPanal" style={{ display: 'flex', gap: '20px', cursor: 'pointer' }}>
              <img src={Kart} alt="" style={{ height: '40px', width: '40px' }} />
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
              <img src={user} alt="" style={{ width: '40px', height: '30px',marginBlock: '5px' }} />
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
          <MdLogout style={{ fontSize: '40px', color: '#9bf900' }} />
          <h5 style={{ marginBlock: 'auto', color: 'black' }}>Log Out</h5>
        </div>
      </Link>
    </div>
  );

  async function UpdateProduct(id) {

    if(!productName || !category || !old_price || !new_price || !description){
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

    await axios.put(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/product/updateProduct/${id}`, 
       { id: id,
        productName: productName,
        old_price: old_price,
        new_price: new_price,
        category: category,
        description: description
       })
      .then(res => {
        // setSeed(Math.random())
        console.log(res);
        fetchInfo()

        toast.success('Product Updated Successfully', {
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
      .catch(err => console.log(err))
      setIsEditModalOpen(false);
    }

  };
  async function updateImage1(id) {
    const formData = new FormData()
    formData.append('productImage', productImage1)
    await axios.put(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/product/updateImage1/${id}`, 
      formData)
      .then(res => {
        // setSeed(Math.random())
        console.log(res);
        fetchInfo()
      })
      .catch(err => console.log(err))
      setIsEditModalOpen(false);
  };
  async function updateImage2(id) {
    const formData = new FormData()
    formData.append('productImage', productImage2)
    await axios.put(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/product/updateImage2/${id}`, 
      formData)
      .then(res => {
        // setSeed(Math.random())
        console.log(res);
        fetchInfo()
      })
      .catch(err => console.log(err))
      setIsEditModalOpen(false);
  };
  async function updateImage3(id) {
    const formData = new FormData()
    formData.append('productImage', productImage3)
    await axios.put(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/product/updateImage3/${id}`, 
      formData)
      .then(res => {
        // setSeed(Math.random())
        console.log(res);
        fetchInfo()
      })
      .catch(err => console.log(err))
      setIsEditModalOpen(false);
  };
  async function updateImage4(id) {
    const formData = new FormData()
    formData.append('productImage', productImage4)
    await axios.put(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/product/updateImage4/${id}`, 
      formData)
      .then(res => {
        // setSeed(Math.random())
        console.log(res);
        fetchInfo()
      })
      .catch(err => console.log(err))
      setIsEditModalOpen(false);
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

function updateCompleteProduct(){
  if(productName || new_price || old_price || category || description){
    UpdateProduct(id)
  }
  if(productImage1){
    updateImage1(id)
  }
  if(productImage2){
    updateImage2(id)
  }
  if(productImage3){
    updateImage3(id)
  }
  if(productImage4){
    updateImage4(id)
  }
}
  return (
    <>
      <div className='allProducts'>
        <h1 className='banner'>All Products</h1>


        <div className="allAdminProducts">
          <div className="kartNav">
            <ul className="kartnavUl">
              <li className="productLi">Product</li>
              <li className="titleLi">Title</li>
              <li className="priceLi">Old Price</li>
              <li className="priceLi">New Price</li>
              <li className="priceLi" id='editLi'>Edit</li>
              <li className="removeLi">Remove</li>
            </ul>


            {allProducts?.map((product) => (
              <div className='allProductBox' >
                <div className="productsCard">
                  <img className="productImg" src={product?.productImage[0]} alt="" />
                  <p className="name">{product?.productName}</p>
                  <p className="price">{product?.old_price}</p>
                  <p className="price">{product?.new_price}</p>
                  <div className='editBtnBox' onClick={() => {showEditModal(product._id,product?.productImage[0],product?.productImage[1],product?.productImage[2],product?.productImage[3]) ; setProductName(product?.productName); setCategory(product?.category) ; setOld_price(product?.old_price); setNew_price(product?.new_price); setDescription(product?.description)}}>
                    <button className='productEdit' data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" title="Edit Product"><CiEdit className='EditIcon' /></button>
                  </div>
                  <div className="deleteBtnBox" onClick={() => showModal(product._id)}>
                    <button className='productDelete' data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" title="Delete Product"><IoTrashBinOutline className='deleteIcon' /></button>
                  </div>
                </div>
                <div className="mobileViewBtns">
                <div className='editBtnBox' onClick={() => showEditModal(product._id,product?.productImage[0],product?.productImage[1],product?.productImage[2],product?.productImage[3])}>
                    <button className='productEdit' data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" title="Edit Product"><CiEdit className='EditIcon' /></button>
                  </div>
                  <div className="deleteBtnBox" onClick={() => showModal(product._id)}>
                    <button className='productDelete' data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" title="Delete Product"><IoTrashBinOutline className='deleteIcon' /></button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} onOk={handleOk} okButtonProps={{ style: { display: 'none' } }} cancelButtonProps={{ style: { display: 'none' } }} onCancel={handleCancel}>
        <div className="deleteConfirmbox">
          <div className="imgBox">
            <img className='confirmGif' src={confirm} alt="" />
          </div>
          <div className="btns">
            <button className='deleteBtn' onClick={() => deleteProduct(id)}>Delete</button>
            <button className='cancelBtn' onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      </Modal>
      <Modal open={isEditModalOpen} style={{ top: 10 }} onOk={handleEditOk} okButtonProps={{ style: { display: 'none' } }} cancelButtonProps={{ style: { display: 'none' } }} onCancel={handleEditCancel}>
        <div className='updateProduct'>
                <div className="container">
                    <label htmlFor="productName"  >Product Name</label>
                    <input type="text" name="productName" value={productName} onChange={(e) => setProductName(e.target.value)}  id="productName"  />
                    <div className="priceContainer">
                        <div className="section1">
                            <label htmlFor="oldProductPrice">Old Price</label>
                            <input type="text" name="oldProductPrice" value={old_price}  onChange={(e) => setOld_price(e.target.value)}  id="oldProductPrice"  />

                        </div>
                        <div className="section2">
                            <label htmlFor="newProductPrice">Offer Price</label>
                            <input type="text" name="newProductPrice" value={new_price}   onChange={(e) => setNew_price(e.target.value)}  id="newProductPrice" />

                        </div>
                    </div>
                    <label htmlFor="productDescription"  >Product Description</label>
                    <textarea type="text" name="productDescription"  value={description} onChange={(e) => setDescription(e.target.value)}  id="productDescription"  />
                    <label htmlFor="productCategory">Category</label>
                    <select  name="category" className='addProductSelector' value={category}  onChange={(e) => setCategory(e.target.value)}>
                        <option value="Accessories">Accessories</option>
                        <option value="Console">Console</option>
                        <option value="Game">Game</option>
                        <option value="Controller">Controller</option>
                    </select>
                    <div className="AllImageContainer" style={{ display: 'flex', gap: '2px', alignItems: 'flex-end' }}>

                        <label htmlFor='uploadInput' style={{ cursor: 'pointer'  }}>

                            {productImage1pre ? (
                                <img className='productImgae' src={productImage1pre} alt=""/>
                            ) : (
                                <>
                                {/* <div className="productImgae"> */}
                                    {/* <FiUploadCloud className='uploadIcon' /> */}
                                    {/* <h5 >Upload Image</h5>   */}
                                    <input id='uploadInput' accept="image/*" type="file" onChange={handleImageChange1} style={{ display: 'none' }} />
                                {/* </div> */}
                                    <img className='productImgae' src={displayImg1 && displayImg1} style={{border: '2px dashed white'}} alt="" />
                                </>
                             )} 
                        </label>
                        <label htmlFor='uploadInput1' style={{ cursor: 'pointer' }}>
                            {productImage2pre ? (
                                <img className='productImgae1' src={productImage2pre} alt="" />
                            ) : (
                              <>
                                {/* // <div className="productImgae1"> */}
                                    {/* <FiUploadCloud className='uploadIcon1' /> */}
                                    {/* <p >Upload Image</p> */}
                                    <input id='uploadInput1' type="file" onChange={handleImageChange2} style={{ display: 'none' }} />
                                    <img className='productImgae1' src={displayImg2 && displayImg2} alt="" style={{border: '2px dashed white'}}/>

                                {/* // </div> */}
                              </>
                            )} 

                        </label>
                        <label htmlFor='uploadInput2' style={{ cursor: 'pointer' }}>
                            {productImage3pre ? (
                                <img className='productImgae2' src={productImage3pre} alt="" />
                            ) : (
                              <>
                                {/* <div className="productImgae2"> */}
                                    {/* <FiUploadCloud className='uploadIcon2' /> */}
                                    {/* <p >Upload Image</p> */}
                                    <input id='uploadInput2' type="file" onChange={handleImageChange3} style={{ display: 'none' }} />
                                    <img className='productImgae2' src={displayImg3 && displayImg3} alt="" style={{border: '2px dashed white'}}/>
                                    
                                {/* </div> */}
                            </>
                            )}
                        </label>
                        <label htmlFor='uploadInput3' style={{ cursor: 'pointer' }}>
                            {productImage4pre ? (
                                <img className='productImgae3' src={productImage4pre} alt="" />
                            ) : (
                              <>
                                {/* <div className="productImgae3"> */}
                                    {/* <FiUploadCloud className='uploadIcon3' /> */}
                                    {/* <p >Upload Image</p> */}
                                    <input id='uploadInput3' type="file" onChange={handleImageChange4} style={{ display: 'none' }} />
                                    <img className='productImgae3' src={displayImg4 && displayImg4} alt="" style={{border: '2px dashed white'}}/>
                                    
                                {/* </div> */}
                              </>
                            )}
                        </label>
                    </div>
                    <button onClick={updateCompleteProduct} className='submit'>Update</button>
                </div>
            </div>
      </Modal>
      <Popover content={content}>  
      <div className="icon">
        <FaPlus className='plus'/>
      </div>
        </Popover>
    </>
  )
}

export default AdminAllproduct