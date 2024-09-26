import React, { useContext, useEffect, useRef, useState } from "react";
import './Cart.scss'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from '../../App';
import Navbar from "../../components/navbar/Navbar";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { IoTrashBinOutline } from "react-icons/io5";
import { Modal } from "antd";
import confirm from '../../assets/confirm.gif'
import toast from "react-hot-toast";
import ConfettiExplosion from 'react-confetti-explosion';
import AddToCartGif from '../../assets/AddToCart.gif'
import SuccessfulPurchase from '../../assets/SuccessfulPurchase.gif'
import ErrorPage from "../errorPage/ErrorPage";

function Cart() {
    const { user, setUser } = useContext(userContext);
    const [isExploding, setIsExploding] = useState(false);
    const [uniqueProducts, setUniqueProducts] = useState([]);
    const navigate = useNavigate()

    const token = localStorage?.getItem('token');  
    function idk(id) {
        console.log(id);
        navigate(`/allproducts/${id}`)
    }

    const validateToken = (token) => {   
      return typeof token === 'string' && token.split('.').length === 3;  
    };  
  
    if (!validateToken(token) && token) {  
      console.error('Invalid token format');
        
      return <ErrorPage/>
    }  
    async function fetchKarts() {
        if (!user) return;

        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/product/getKarts/${user?._id}`);
            setUniqueProducts(res.data.result.products);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchKarts();
    }, [user]);



    const [isModalOpen, setIsModalOpen] = useState(false);
    const [id, setId] = useState()
    const showModal = (id) => {
        setIsModalOpen(true);
        console.log(id);
        setId(id)
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const showOrderModal = () => {
        setIsOrderModalOpen(true);
    };

    const handleOrderOk = () => {
        setIsOrderModalOpen(false);
    };

    const handleOrderCancel = () => {
        setIsOrderModalOpen(false);
    };

    function AddToKart(id) {
        axios.post(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/product/AddToKart/${user?._id}`, { productId: id })
            .then(res => {
                // setSeed(Math.random())
                console.log(res);

            })
            .catch(err => console.log(err))

    }
    function removeOneFromKart(id) {
        axios.post(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/product/removeOneFromKart/${user?._id}`, { productId: id })
            .then(res => {
                // setSeed(Math.random())
                console.log(res);
            })
            .catch(err => console.log(err))

    }
    function removeFromKart(id) {
        axios.post(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/product/removeFromKart/${user?._id}`, { productId: id })
            .then(res => {
                // setSeed(Math.random())
                setUser(res.data.result.user)
                console.log(res);
            })
            .catch(err => console.log(err))

    }
    function removeProduct(id) {
        setUniqueProducts(prevProducts =>
            prevProducts.filter(product => product._id !== id)
        );
        removeFromKart(id); // Call the API to remove the product from the cart  
        setIsModalOpen(false);


        toast.success('Item Removed From Cart', {
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
    }
    const incrementQuantity = (productId) => {
        setUniqueProducts(prevProducts =>
            prevProducts.map(product =>
                product._id === productId ? { ...product, quantity: product.quantity + 1 } : product
            )
        );
        AddToKart(productId)
    };

    const decrementQuantity = (productId) => {
        setUniqueProducts(prevProducts => {
            const product = prevProducts.find(product => product._id === productId);

            if (product && product.quantity > 1) {
                // If quantity is greater than 1, decrement it  
                removeOneFromKart(productId)
                return prevProducts.map(product =>
                    product._id === productId ? { ...product, quantity: product.quantity - 1 } : product
                );
            } else if (product && product.quantity === 1) {
                // If quantity is 1, remove the product from the cart  
                // removeFromKart(productId); // Call the API to remove the product from the cart 
                showModal(productId)
                // return prevProducts.filter(product => product._id !== productId);
            }
            return prevProducts; // Return the previous state if no changes  
        });
    };

    const calculateSubtotal = () => {
        return uniqueProducts?.reduce((acc, product) => {
            return acc + (product.new_price * product.quantity);
        }, 0);
    };
    const subtotal = calculateSubtotal();


    const handleOrderCreation = async () => {
        const userId = user; // Replace with actual user ID  
        const items = uniqueProducts.map(product => ({
            productId: product._id, // Product ID from the cart  
            quantity: product.quantity // Quantity from the cart  
        }));

        const totalAmount = calculateSubtotal(); // Function to calculate the total amount  
        const paymentMethod = "credit_card"; // Replace with actual payment method  
        const address = "123 Main St"; // Replace with actual address  
        const pincode = "123456"; // Replace with actual pincode  

        const orderData = {
            userId,
            items,
            totalAmount,
            paymentMethod,
            address,
            pincode
        };
        axios.post(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/order/createOrder`, {
            userId: orderData.userId,
            items: orderData.items,
            totalAmount: orderData.totalAmount,
            paymentMethod: orderData.paymentMethod,
            address: orderData.address,
            pincode: orderData.pincode
        })
            .then(res => {
                // setSeed(Math.random())
                console.log(res);
                setIsExploding(true)
                setTimeout(() => {
                    setIsExploding(false)
                    showOrderModal()
                }, 3000);
                toast.success('Order Created Successfully', {
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
                    duration: 4000
                });

            })
            .catch(err => console.log(err))
    }


    return (
        <>
            <Navbar />

            {uniqueProducts?.length > 0 ? (
                <div className="Cart">
                    {isExploding && <ConfettiExplosion style={{ position: 'absolute', top: '0%', left: '505', transform: 'translate(-50%,-50%)' }} particleCount={200} width={window.innerWidth} />}
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
                            <div className="productscart" key={product?._id}>
                                <div className="xtraDiv">
                                    <img style={{cursor: 'pointer'}} onClick={() => idk(product._id)} loading='lazy' className="productImg" src={product?.productImage && product?.productImage[0]} alt="" />
                                    <p style={{cursor: 'pointer'}} onClick={() => idk(product._id)} className="name">{product?.productName}</p>
                                    <p className="price">{product?.new_price}</p>
                                    <p className="Quantity" id='try'>
                                        <CiCircleMinus className='quantityIcon' onClick={() => decrementQuantity(product._id)} />
                                        {product?.quantity}
                                        <CiCirclePlus className='quantityIcon' onClick={() => incrementQuantity(product._id)} />
                                    </p>
                                    <p className="Total">{product?.new_price * product?.quantity}</p>
                                    <div className="deleteBtnBox" onClick={() => showModal(product._id)}>
                                        <button className='productDelete' data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" title="Delete Product"><IoTrashBinOutline className='deleteIcon' /></button>
                                    </div>
                                </div>
                                <div className="deleteBtnBoxMobile" onClick={() => showModal(product._id)}>
                                    <button className='productDelete' data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" title="Delete Product"><IoTrashBinOutline className='deleteIcon' /></button>
                                </div>
                            </div>
                        ))}

                    </div>
                    <section className="orderSection">
                        <h1>Order summary</h1>
                        <div className="subTotal">
                            <p>Sub Total</p>
                            <p>{subtotal}</p>
                        </div>
                        <div className="delCharges">
                            <p>Delivery Charges</p>
                            <p>0</p>
                        </div>
                        <hr />
                        <div className="total">
                            <p>Total</p>
                            <p>{subtotal}</p>
                        </div>
                        <button
                            onClick={handleOrderCreation}
                            className="checkOut">Order</button>
                    </section>
                </div>


            ) : (
                <div className="emptyKart">
                    <h1 className="emptyKartTxt">{!token ? 'Log in to access Cart' : 'Your Cart is Empty'}</h1>
                    <img loading='lazy' src={AddToCartGif} alt="" />
                </div>
            )}

            <Modal open={isModalOpen} onOk={handleOk} okButtonProps={{ style: { display: 'none' } }} cancelButtonProps={{ style: { display: 'none' } }} onCancel={handleCancel}>
                <div className="deleteConfirmboxKart" style={{ padding: '20px' }}>
                    <h6>Remove this item from cart</h6>
                    <div className="imgBox">
                        <img loading='lazy' className='confirmGif' src={confirm} alt="" />
                    </div>
                    <div className="btns">
                        <button className='deleteBtn' onClick={() => removeProduct(id)}>Remove</button>
                        <button className='cancelBtn' onClick={() => setIsModalOpen(false)}>Cancel</button>
                    </div>
                </div>
            </Modal>
            <Modal open={isOrderModalOpen} onOk={handleOrderOk} okButtonProps={{ style: { display: 'none' } }} cancelButtonProps={{ style: { display: 'none' } }} onCancel={handleOrderCancel}>
                <div className="orderCreatedBox" style={{ padding: '20px' }}>
                    <h6>Order Created !!</h6>
                    <div className="imgBox">
                        <img loading='lazy' className='confirmGif' src={SuccessfulPurchase} alt="" />
                    </div>
                    <div className="btns">
                        <button className='deleteBtn' onClick={() => navigate('/profile', { state: "orders" })}>Go To My Orders</button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default Cart;