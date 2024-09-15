import React, { useContext, useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { Tooltip } from 'antd';
import './product.scss'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from '../../App';
import toast from "react-hot-toast";


function Product({ product }) {


    const navigate = useNavigate()
    const [seed, setSeed] = useState(null)
    function idk() {
        console.log(product._id);
        navigate(`/allproducts/${product._id}`)
    }
    const { user, setUser } = useContext(userContext)

    const [karts, setKarts] = useState([]);


    function fetchKartsData() {
        axios.post(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/product/getKarts/${user._id}`).then((res) => {
            setKarts(res.data.result.products);
        }).catch(err => {
            console.log(err); // Handle the error  
        });
    }
    function AddToKart() {
        axios.post(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/product/AddToKart/${user?._id}`, { productId: product?._id })
            .then(res => {
                setSeed(Math.random())
                console.log(res);
                setUser(res.data.result.user)
                toast.success('Item Added To Cart', {
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
                fetchKartsData()
            })
            .catch(err => console.log(err))
    };
    const AddedKarts = karts?.filter(item => item?._id == product?._id)

    useEffect(() => {
        fetchKartsData()
    }, [])
    return (
        <>
            <div className="Product">
                {/* <div className="heart"  data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" title="Add to wishlist">
                    <FaRegHeart className="heartIcon" style={{ fontSize: '20px' }} />
                </div> */}
                {AddedKarts && AddedKarts[0]?._id == product?._id ? (
                    <Tooltip title={`${AddedKarts[0]?.quantity} items in cart`}>
                        <div className="AddedKatrs" key={seed}>
                            <MdOutlineShoppingCart className="AddedKatrskartIcon" style={{ fontSize: '20px' }} onClick={AddToKart} />
                        </div>
                    </Tooltip>
                ) : (
                    <Tooltip title="Add To Cart">
                        <div className="kart" key={seed}>
                            <MdOutlineShoppingCart className="kartIcon" style={{ fontSize: '20px' }} onClick={AddToKart} />
                        </div>
                    </Tooltip>
                )}
                <div className="product-container" onClick={idk}>
                    <div className="product-img">
                        <div className="img-container">
                            <div className="cut"></div>
                            <div id="curved-corner-bottomleft" style={{ position: 'absolute', bottom: '100px', left: '0' }}></div>
                            <div id="curved-corner-bottomleft" style={{ position: 'absolute', bottom: '0', left: '100px' }}></div>

                            <img className="productImg" src={product?.productImage && product?.productImage[0]} alt="" id="img" />
                        </div>
                    </div>
                    <div className="product-info">
                        <p className="title">
                            {product?.productName}
                        </p>
                        <p className="price"> ₹ {product?.new_price}</p>
                    </div>
                </div>
            </div>

        </>

    );
}


export default Product;