import React, { useContext, useEffect, useRef, useState } from 'react'
import './Allproducts.scss'
import Product from '../../components/product/Product'
import { Link, useLocation } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Productcontext from '../../components/contextProvider/contectState'

function Accessories({ user }) {
  const context = useContext(Productcontext)
  const { allProducts } = context;  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const location = useLocation()
  const productRef = useRef()
  const productNum = useRef()
  const productSort = useRef()

  const getLocation = location.state
  useEffect(() => {  
    if (getLocation) {  
      filterProductsByCategory(getLocation);  
    }
    // else {
    //   filterProductsByCategory("All")
    // }
  }, [getLocation]);  

  const filterProductsByCategory = (category) => {
    setSelectedCategory(category);
    productRef.current.innerHTML = category;
    const filteredProducts = category === 'All' ? allProducts : allProducts?.filter(product => product.category === category);
    productNum.current.innerHTML = `${filteredProducts?.length} Products`;
    productSort.current.innerHTML = `sort by: ${category}`;
  }

  return (
    <>
      <Navbar />
      <div className='Accessories'>
        <div className="leftPart">
          <div className="sidebar">
            <h4 className='browseBy'>Browse By</h4>
            <hr />
            <ul className='allProductlistUl'>
              <div className="liBox" onClick={() => filterProductsByCategory('All')}>
                <li className='allProductlistLi'>All Products</li>
              </div>
              <div className="liBox" onClick={() => filterProductsByCategory('Accessories')}>
                <li className='allProductlistLi'>Accessories</li>
              </div>
              <div className="liBox" onClick={() => filterProductsByCategory('Best Seller')}>
                <li className='allProductlistLi'>Best Seller</li>
              </div>
              <div className="liBox" onClick={() => filterProductsByCategory('Console')}>
                <li className='allProductlistLi'>Consoles</li>
              </div>
              <div className="liBox" onClick={() => filterProductsByCategory('Controller')}>
                <li className='allProductlistLi'>Controller</li>
              </div>
              <div className="liBox" onClick={() => filterProductsByCategory('Game')}>
                <li className='allProductlistLi'>Games</li>
              </div>
              <div className="liBox" onClick={() => filterProductsByCategory('On Sale')}>
                <li className='allProductlistLi'>On Sale</li>
              </div>
            </ul>
            
            <h4 className='filter'>Filter By</h4>
            <hr />
            <p className='price'>Price</p>
          </div>
        </div>
        <div className="rightPart">
          <h1 className='productTitle' ref={productRef}></h1>
          <div className="numberOfProducts">
            <div>
              <h5 ref={productNum}></h5>
            </div>
            <div>
              <h5 ref={productSort}></h5>
            </div>
          </div>
          <div className="products">
            {allProducts?.filter(product => selectedCategory === 'All' || product?.category === selectedCategory).map(product => (
              <Product key={product?._id} user={user} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Accessories