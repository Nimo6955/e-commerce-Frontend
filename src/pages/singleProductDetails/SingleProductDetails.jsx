import React, { useContext, useEffect, useState } from 'react'
import './SingleProductDetails.scss'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from '../../components/product/Product'
import { Collapse, Image } from 'antd';
import Navbar from '../../components/navbar/Navbar'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Footer from '../../components/footer/Footer'
import toast from 'react-hot-toast'
import { userContext } from '../../App'





function SingleProductDetails({karts}) {

  const location = useLocation()
  const productId = location.pathname.slice(-24);
  const { user, setUser } = useContext(userContext);


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
  const singleproductId = singleProduct && singleProduct[0]?._id;
  const recCategory = singleProduct && singleProduct[0]?.category;

  const recommendations = allProducts?.filter(product => product?.category == recCategory)
  const index = recommendations?.findIndex(product => product?._id == singleproductId)
  recommendations?.splice(index, 1)

  console.log(recommendations)

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1150 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1150, min: 760 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 760, min: 0 },
      items: 1
    }
  };

  const items = [
    {
      key: '1',
      label: <p style={{ color: 'white' }}>Product Info</p>,
      children: <p style={{ color: 'white', background: '#212321' ,paddingTop: '10px'}}>{singleProduct && singleProduct[0]?.description}</p>,
    },
    {
      key: '2',
      label: <p style={{ color: 'white' }}>Return and Refund policy</p>,
      children: <p style={{ color: 'white', background: '#212321' ,paddingTop: '10px' }}>I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.</p>,
    }
  ];

  const shareProduct = () => {
    if(navigator.share){
      navigator.share({
        title: singleProduct && singleProduct[0]?.productName,
        url: ''
      }).then(() => {
        console.log('share link fecthed');
      }).catch((e) => {
        console.log(e);
        
      })
    }
  }


  function AddToKart() {
    axios.post(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/product/AddToKart/${user?._id}`, { productId: singleproductId })
        .then(res => {
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
        })
        .catch(err => console.log(err))
};
  return (
    <>
     <Navbar karts={karts} />
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
            <div className='moreImg'><Image className='antdImage' style={{objectFit: 'cover'}} loading='lazy' src={product.productImage[1]} alt=""  preview={{src: product.productImage[1]}}/></div>
            <div className='moreImg'><Image className='antdImage' style={{objectFit: 'cover'}} loading='lazy' src={product.productImage[2]} alt=""  preview={{src: product.productImage[2]}}/></div>
            <div className='moreImg'><Image className='antdImage' style={{objectFit: 'cover'}} loading='lazy' src={product.productImage[3]} alt=""  preview={{src: product.productImage[3]}}/></div>
            {/* <div className='moreImg'><img src={headPhone} alt="" /></div> */}
          </div>
        </div>

      </div>
      <div className="rightPart">
        <div className="upperRightPart">

        <div className="productInfo">

          <h1 className='productName'>{product.productName}</h1>
          <h3 className='price'>&#8377;{product.new_price}</h3>
          <h3 className='oldPrice'>M.R.P: &#8377;{product.old_price}</h3>

          <button className='shareProduct' onClick={shareProduct}>Share</button>
        </div>
        <div className="productbtns">
          <button onClick={AddToKart}>Add To Cart</button>
        </div>
        </div>
        <div className="productText">
        {/* 500 characters */}
        <Collapse accordion style={{background: '#212321', border: 'none',color: '#ffffff !important'}} items={items} defaultActiveKey={['1']} />;
        </div>
      </div>
      
    </div>
    ))}
          <h1 className='moreSuggestion'>More suggestion</h1>
        {recommendations && recommendations.length > 0 && (
            <Carousel className='suggestion' responsive={responsive} infinite={true} showDots={true} autoPlay={true}>
              
              {recommendations.map(product => (
                <div style={{display: 'flex',justifyContent: 'center'}}>
                <Product product={product} key={product._id} />
                </div>
              ))}
            </Carousel>
          )};
          <Footer/>
    </>

  )
}

export default SingleProductDetails