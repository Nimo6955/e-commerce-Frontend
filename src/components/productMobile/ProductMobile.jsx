import React from 'react'
import './ProductMobile.scss'
import { useNavigate } from 'react-router-dom';

function ProductMobile({product}) {

    const navigate = useNavigate()

    function idk(){
        navigate(`/allproducts/${product._id}`)
    }
  return (
    <div className='mobielCard' onClick={idk}>
        <div className="cardContainer">
            <div className="cardImg">
            <img loading='lazy' className='productImgMobile'  src={product?.productImage && product?.productImage[0]} alt="" />
            </div>
            <div className="productInfoMobile">
                <p className='productNameMobile'>{product.productName.length > 15 ?  `${product.productName.substring(0,10)}...` : product.productName}</p>
                <div className="price">
                <p className='productPriceMobileOld'> ₹ {product?.new_price}</p>
                <p className='productPriceMobile'> ₹ {product?.new_price}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductMobile