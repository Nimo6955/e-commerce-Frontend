import React from 'react'
import './ProductMobile.scss'
import { useNavigate } from 'react-router-dom';

function ProductMobile({product}) {

    const navigate = useNavigate()

    function idk(){
        navigate(`/allproducts/${product._id}`)
    }
  return (
    <div className='mobielCard' >
        <div className="cardContainer">
            <div className="cardImg">
            <img className='productImgMobile'  src={product?.productImage && product?.productImage[0]} alt="" />
            </div>
            <div className="productInfoMobile">
                <h5 className='productNameMobile'>{product.productName.length > 20 ?  `${product.productName.substring(0,10)}...` : product.productName}</h5>
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