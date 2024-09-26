import React, { useContext, useEffect, useRef, useState } from 'react';
import './Allproducts.scss';
import Product from '../../components/product/Product';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Productcontext from '../../components/contextProvider/contectState';
import { Popover } from 'antd';
import { FaCaretDown } from "react-icons/fa";
import ProductMobile from '../../components/productMobile/ProductMobile';
import ErrorPage from '../errorPage/ErrorPage';
import Footer from '../../components/footer/Footer';

function Accessories({ user }) {
  const context = useContext(Productcontext);
  const { allProducts } = context;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const location = useLocation();
  const productRef = useRef();
  const sortRef = useRef();
  const productNum = useRef();
  const productSort = useRef();
  const getLocation = location.state;


  const [sum, setSum] = useState(55000)

  const token = localStorage?.getItem('token');

  const validateToken = (token) => {
    return typeof token === 'string' && token.split('.').length === 3;
  };

  if (!validateToken(token) && token) {
    console.error('Invalid token format');
    return <ErrorPage />;
  }

  useEffect(() => {
    if (getLocation) {
      filterProductsByCategory(getLocation);
    }
  }, [getLocation]);

  const filterProductsByCategory = (category) => {
    setSelectedCategory(category);
    productRef.current.innerHTML = category;
    if (window.innerWidth < 1050) {
      sortRef.current.innerHTML = `Sort By: ${category}`;
    }
    // Call randomizeArray in the same line as filtering to ensure it's randomized after getting filtered results  
    const filteredProducts = category === 'All' ? allProducts : allProducts?.filter(product => product.category === category);

    // productNum.current.innerHTML = `${filteredProducts?.length} Products`;  
    productSort.current.innerHTML = `sort by: ${category}`;
  };

  // Utility function to randomize array  
  const randomizeArray = (array) => {
    return array?.sort(() => Math.random() - 0.5);
  };

  const content = (
    <>
      <ul className='allProductlistUlContent'>
        <div className="liBox" onClick={() => filterProductsByCategory('All')}>
          <li className='allProductlistLi'>All Products</li>
        </div>
        <div className="liBox" onClick={() => filterProductsByCategory('Accessories')}>
          <li className='allProductlistLi'>Accessories</li>
        </div>
        {/* <div className="liBox" onClick={() => filterProductsByCategory('Best Seller')}>  
          <li className='allProductlistLi'>Best Seller</li>  
        </div>   */}
        <div className="liBox" onClick={() => filterProductsByCategory('Console')}>
          <li className='allProductlistLi'>Consoles</li>
        </div>
        <div className="liBox" onClick={() => filterProductsByCategory('Controller')}>
          <li className='allProductlistLi'>Controller</li>
        </div>
        <div className="liBox" onClick={() => filterProductsByCategory('Game')}>
          <li className='allProductlistLi'>Games</li>
        </div>
        {/* <div className="liBox" onClick={() => filterProductsByCategory('On Sale')}>  
          <li className='allProductlistLi'>On Sale</li>  
        </div>   */}
      </ul>
    </>
  );

  return (
    <>
      <Navbar />
      <div className='Accessories'>
        <div className="leftPart">
          <div className="sidebar">
            <h4 className='browseBy'>Browse By</h4>
            <hr style={{ color: '#a1cca5' }} />
            <ul className='allProductlistUl'>
              <div className="liBox" onClick={() => filterProductsByCategory('All')}>
                <li className='allProductlistLi'>All Products</li>
              </div>
              <div className="liBox" onClick={() => filterProductsByCategory('Accessories')}>
                <li className='allProductlistLi'>Accessories</li>
              </div>
              {/* <div className="liBox" onClick={() => filterProductsByCategory('Best Seller')}>  
                <li className='allProductlistLi'>Best Seller</li>  
              </div>   */}
              <div className="liBox" onClick={() => filterProductsByCategory('Console')}>
                <li className='allProductlistLi'>Consoles</li>
              </div>
              <div className="liBox" onClick={() => filterProductsByCategory('Controller')}>
                <li className='allProductlistLi'>Controller</li>
              </div>
              <div className="liBox" onClick={() => filterProductsByCategory('Game')}>
                <li className='allProductlistLi'>Games</li>
              </div>
              {/* <div className="liBox" onClick={() => filterProductsByCategory('On Sale')}>  
                <li className='allProductlistLi'>On Sale</li>  
              </div>   */}
            </ul>
            <h4 className='filter'>Filter By</h4>
            <hr style={{ color: '#a1cca5' }} />
            <div style={{width: '90%'}}>

              <input type="range" max={55000} value={sum} onChange={(e) => setSum(Number(e.target.value))} class="form-range" id="customRange1" />
              <div className='d-flex justify-content-between'>
                <p className='price'>&#8377;0</p>
                <p className='price'>&#8377;55000</p>
              </div>
            </div>
          </div>
        </div>
        <div className="rightPart">
          <div className="sticyMobileDiv">
            <h1 className='productTitle' ref={productRef}></h1>
            <div className="numberOfProducts">
              <div>
                {/* <h5 ref={productNum}></h5>   */}
                <h5>{randomizeArray(allProducts)?.filter(product => (selectedCategory === 'All' || product?.category === selectedCategory) && (product?.new_price < sum)).length} products</h5>
              </div>
              <div className='desktopSort'>
                <h5 ref={productSort}></h5>
              </div>
              {window.innerWidth < 1050 && (
                <Popover content={content}>
                  <div className="iconsa" style={{ height: '40px', width: 'fit-content', background: '#9bf900', color: 'black', borderRadius: '20px', display: 'flex', gap: '10px', paddingInline: '15px' }}>
                    <h5 style={{ marginBlock: 'auto' }} ref={sortRef}></h5><FaCaretDown style={{ marginBlock: 'auto' }} />
                  </div>
                </Popover>
              )}
            </div>
          </div>
          <div className="products">
            {randomizeArray(allProducts)?.filter(product => (selectedCategory === 'All' || product?.category === selectedCategory) && (product.new_price < sum)).map(product => (
              <Product key={product?._id} user={user} product={product} />
            ))}
          </div>
          <div className="productsMobile">
            {randomizeArray(allProducts)?.filter(product => selectedCategory === 'All' || product?.category === selectedCategory).map(product => (
              <ProductMobile key={product?._id} user={user} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Accessories;