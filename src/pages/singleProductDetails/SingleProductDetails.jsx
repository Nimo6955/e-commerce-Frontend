import React, { useEffect, useState } from 'react'
import './SingleProductDetails.scss'
import headPhone from '../../assets/headphones.png'
import Mainhead from '../../assets/mainhead.png'
import head1 from '../../assets/head1.jpg'
import head2 from '../../assets/head2.jpg'
import head3 from '../../assets/head3.jpg'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from '../../components/product/Product'
import { Collapse } from 'antd';
import Navbar from '../../components/navbar/Navbar'
import { useLocation, useSearchParams } from 'react-router-dom'
import axios from 'axios'



const items = [
  {
    key: '1',
    label: <p style={{color: 'white'}}>Product Info</p>,
    children: <p style={{color: 'white',background: '#212321'}}>I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item. Buyers like to know what they’re getting before they purchase, so give them as much information as possible so they can buy with confidence and certainty.</p>,
  },
  {
    key: '2',
    label: <p style={{color: 'white'}}>Return and Refund policy</p>,
    children: <p style={{color: 'white',background: '#212321'}}>I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.</p>,
  },
  {
    key: '3',
    label: <p style={{color: 'white'}}>shipping policy</p>,
    children: <p style={{color: 'white',background: '#212321'}}>I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence.</p>,
  },
];

function SingleProductDetails() {

  const location = useLocation()
  const productId = location.pathname.slice(-24);
  // console.log(productId);


  const [allProducts, setAllProducts] = useState()

  useEffect(() => {
  
      axios.get(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/product/`)  
        .then(products => {
          setAllProducts(products.data.result.AllProducts);
          // console.log(products.data.result.AllProducts);
            })
        .catch(err => console.log(err));
  
    }, []); 

    const singleProduct = allProducts?.filter(product => product._id == productId)
    // console.log(singleProduct);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <>
     <Navbar />
{singleProduct?.map(product=> (
    <div className='SingleProductDetails' >

  <div className="leftPart">
        <div className='product'>

          <div className='uppersection'>
            <div className="cut"></div>
            <div id="curved-corner-bottomleft" style={{ position: 'absolute', bottom: '100px' }}></div>
            <div id="curved-corner-bottomleft" style={{ position: 'absolute', bottom: '0', left: '150px' }}></div>
            <div className="imgContainer">
              <img src={product.productImage[0]} alt="" />

            </div>
          </div>
          <div className="lowersection">
            <div className='moreImg'><img loading='lazy' src={product.productImage[1]} alt="" /> </div>
            <div className='moreImg'><img  src={product.productImage[2]} alt="" /></div>
            <div className='moreImg'><img src={product.productImage[3]} alt="" /></div>
            {/* <div className='moreImg'><img src={headPhone} alt="" /></div> */}
          </div>
        </div>

        <div className="productdescription">
          <p>I'm a product description. This is a great place to "sell" your product and grab buyers' attention. Describe your product clearly and concisely. Use unique keywords. Write your own description instead of using manufacturers' copy.</p>
        </div>
      </div>
      <div className="rightPart">
        <div className="productInfo">

          <h1 className='productName'>{product.productName}</h1>
          <h3 className='price'>&#8377;{product.new_price}</h3>
          <h3 className='quantity'>quantity</h3>
          <select name="" id=""></select>
        </div>
        <div className="productbtns">
          <button>Add To Cart</button>
          <button>Buy Now</button>
        </div>
        <div className="productText">
        <Collapse accordion style={{background: '#212321', border: 'none',color: '#ffffff !important'}} items={items} defaultActiveKey={['1']} />;
        </div>
      </div>
      
    </div>
    ))}
    
    <Carousel className='suggestion' responsive={responsive}  infinite={true} showDots={true} autoPlay={ true }>
  <div className='carouselChild'><Product/></div>
  <div className='carouselChild'><Product/></div>
  <div className='carouselChild'><Product/></div>
  <div className='carouselChild'><Product/></div>
  <div className='carouselChild'><Product/></div>

</Carousel>;
    </>

  )
}

export default SingleProductDetails