import React, { useEffect, useState } from 'react'
import Productcontext from './contectState';
import axios from 'axios';

function ProductContext(props) {

  const [allProducts, setAllProducts] = useState()
//   function getAllProductsContext(){
  useEffect(() => {

      axios.get(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/product/`)  
        .then(products => {
            setAllProducts(products.data.result.AllProducts);
            // console.log(products.data.result.AllProducts);
        })
        .catch(err => console.log(err));
        //   console.log(allProducts);
        }, []); 
    // }
  return (
    <Productcontext.Provider value={{ allProducts }}>
    {props.children}
  </Productcontext.Provider>
  )
}

export default ProductContext