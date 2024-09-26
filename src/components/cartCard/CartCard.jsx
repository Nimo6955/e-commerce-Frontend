import React, { useContext } from 'react'  
import './cartCard.scss'  
import { CiCirclePlus } from "react-icons/ci";  
import { CiCircleMinus } from "react-icons/ci";
import Productcontext from '../../components/contextProvider/contectState'
import { userContext } from '../../App';


function CartCard({product}) {  

  const image = product?.productImage ? product?.productImage[0] : ''
 
  return (  
    <>    
      <div className="productscart">  
        <img loading='lazy' className="productImg" src={image} alt="" />  
        <p className="name">{product?.productName}</p>  
        <p className="price">{product?.new_price}</p>  
        <p className="Quantity" id='try'><CiCircleMinus  className='quantityIcon' />{product?.quantity}<CiCirclePlus className='quantityIcon'  /></p>
        <p className="Total">{product?.new_price * product?.quantity}</p>
        <button>Remove</button>  
      </div>  
    </>  
  )  
}  

export default CartCard