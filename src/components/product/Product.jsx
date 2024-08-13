import React, { useContext, useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { Tooltip, Toast, Popover } from 'bootstrap';
import './product.scss'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from '../../App';


function Product({product}) {

    // const [seed,setSeed] = useState(null)
    const navigate = useNavigate()

    function idk(){
        console.log(product._id);
        navigate(`/allproducts/${product._id}`)
    }
  const { user } = useContext(userContext)
    
    // console.log(user?._id);

    useEffect(() => {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        const tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));
    }, []);

    function AddToKart(){
        axios.post(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/product/AddToKart/${user?._id}`, {productId: product?._id})
        .then(res => {
            // setSeed(Math.random())
            console.log(res);
           
        })
        .catch(err => console.log(err))

};
    
    return (
        <> 
            <div className="Product" data-aos="zoom-in">
                <div className="heart"  data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" title="Add to wishlist">
                    <FaRegHeart className="heartIcon" style={{ fontSize: '20px' }} />
                </div>
                <div className="kart"data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" title="Add to cart">
                    <MdOutlineShoppingCart className="kartIcon" style={{ fontSize: '20px' }} onClick={AddToKart} />
                </div>
                <div className="product-container"  onClick={idk}>
                    <div className="product-img">
                        <div className="img-container">
                            <div className="cut"></div>
                            <div id="curved-corner-bottomleft" style={{ position: 'absolute', bottom: '100px',left:'0' }}></div>
                            <div id="curved-corner-bottomleft" style={{ position: 'absolute', bottom: '0', left: '100px' }}></div>

                            <img src={product?.productImage[0]} alt="" id="img" />
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