import React, { useContext, useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { Tooltip, Toast, Popover } from 'bootstrap';
import './Cart.scss'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from '../../App';
import Productcontext from '../../components/contextProvider/contectState'
import Product from "../../components/product/Product";
import Navbar from "../../components/navbar/Navbar";
import CartCard from "../../components/cartCard/CartCard";

function Cart() {

    const {user} = useContext(userContext)
    const context = useContext(Productcontext)
    const { allProducts } = context;
    const kartsProducts = user.karts?.map(kartId => allProducts?.find(product => product?._id === kartId));

    //   console.log(allProducts);


    const uniqueProducts = [];

    kartsProducts?.forEach((product) => {
        const existingProduct = uniqueProducts.find(
            (uniqueProduct) => uniqueProduct?._id === product?._id
        );

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            uniqueProducts.push({ ...product, quantity: 1 });
        }

        // console.log(uniqueProducts);
        // console.log(existingProduct);
    });
    return (
        <>
            <Navbar />

            {uniqueProducts.length > 0 ?


                <div className="Cart">
                    <div className="kartNav">
                        <ul className="kartnavUl">
                            <li className="productLi">Product</li>
                            <li className="titleLi">Title</li>
                            <li className="priceLi">Price</li>
                            <li className="quantityLi">Quantity</li>
                            <li className="totalLi">Total</li>
                            <li className="removeLi">Remove</li>
                        </ul>


                        {uniqueProducts?.map((product) => (
                            <CartCard key={product?._id} user={user} product={product} />
                        ))}

                    </div>
                </div>
                : (<div><h1 className="emptyKart">Your Cart is Empty</h1></div>)}
        </>

    );
}

export default Cart