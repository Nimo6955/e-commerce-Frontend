import React, { useContext, useEffect, useState } from 'react'
import './Address.scss'
import { userContext } from '../../App';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import { Modal } from 'antd';
import { FaPhoneAlt } from "react-icons/fa";
import { IoTrashBinOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";

function Address() {
    const { user, setUser } = useContext(userContext)

    const [id, setId] = useState()
    const addressIndex = user?.address?.findIndex(addr => addr._id?.toString() === id);

    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const showAddressModal = () => {
        setIsAddressModalOpen(true);
    };

    const handleAddressOk = () => {
        setIsAddressModalOpen(false);
    };

    const handleAddressCancel = () => {
        setIsAddressModalOpen(false);
    };
    const [isUpdateAddressModalOpen, setIsUpdateAddressModalOpen] = useState(false);
    const showUpdateAddressModal = (id) => {
        setIsUpdateAddressModalOpen(true);
        setId(id)

    };

    const handleUpdateAddressOk = () => {
        setIsUpdateAddressModalOpen(false);

    };

    const handleUpdateAddressCancel = () => {
        setIsUpdateAddressModalOpen(false);
    };


    const [pincode, setPincode] = useState()
    const [houseNo, setHouseNo] = useState()
    const [name, setName] = useState()
    const [mobile, setMobile] = useState()
    const [area, setArea] = useState()
    const [landmark, setLandmark] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()
    //
    const [pincodeUpdate, setPincodeUpdate] = useState()
    const [houseNoUpdate, setHouseNoUpdate] = useState()
    const [nameUpdate, setNameUpdate] = useState()
    const [mobileUpdate, setMobileUpdate] = useState()
    const [areaUpdate, setAreaUpdate] = useState()
    const [landmarkUpdate, setLandmarkUpdate] = useState()
    const [cityUpdate, setCityUpdate] = useState()
    const [stateUpdate, setStateUpdate] = useState()


    useEffect(() => {
        if (user) {
            if (addressIndex >= 0) {

                setNameUpdate(user?.address[addressIndex]?.name);
                setPincodeUpdate(user?.address[addressIndex]?.pincode);
                setHouseNoUpdate(user?.address[addressIndex]?.houseNo);
                setMobileUpdate(user?.address[addressIndex]?.mobileNumber);
                setStateUpdate(user?.address[addressIndex]?.state);
                setLandmarkUpdate(user?.address[addressIndex]?.landmark);
                setAreaUpdate(user?.address[addressIndex]?.area);
                setCityUpdate(user?.address[addressIndex]?.city);
                // Set other fields as necessary...  
            }
        }
    }, [user, addressIndex]); // Run this effect when `user` changes  

    async function AddAddress() {
        await axios.post(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/user/addAddress/${user?._id}`,
            {
                name: name,
                state: state,
                houseNo: houseNo,
                city: city,
                mobileNumber: mobile,
                pincode: pincode,
                landmark: landmark,
                area: area,

            })
            .then(res => {
                console.log(res);
                const updatedUser = res.data.result.user;
                setUser(updatedUser);
            })
            .catch(err => console.log(err))
        setIsAddressModalOpen(false);
    };
    async function updateAddress(req, res) {
        await axios.put(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/user/updateAddress/${user?._id}`,
            {
                addressId: id,
                name: nameUpdate,
                state: stateUpdate,
                houseNo: houseNoUpdate,
                city: cityUpdate,
                mobileNumber: mobileUpdate,
                pincode: pincodeUpdate,
                landmark: landmarkUpdate,
                area: areaUpdate,

            })
            .then(res => {
                console.log(res);
                const updatedUser = res.data.user;
                setUser(updatedUser);
            })
            .catch(err => console.log(err))
        setIsUpdateAddressModalOpen(false);
    }
    const [removeId, setRemoveId] = useState()

    async function delAddressFunc() {
        await axios.delete(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/user/deleteAddress/${user?._id}`,
            {
                data: {
                    addressId: removeId

                }
            })
            .then(res => {
                console.log(res);
                const updatedUser = res.data.user;
                setUser(updatedUser);
            })
            .catch(err => console.log(err))
        setIsModalOpen(false);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [removeName, setRemoveName] = useState('')
    const [removeMobile, setRemoveMobile] = useState('')
    const [removeHouse, setRemoveHouse] = useState('')
    const [removeArea, setRemoveArea] = useState('')
    const [removeLandmark, setRemoveLandmark] = useState('')
    const [removeCity, setRemoveCity] = useState('')
    const [removeState, setRemovestate] = useState('')
    const [removePincode, setRemovePincode] = useState('')
    const showModal = (id, userName, mobile, house, area, landmark, city, state, pincode) => {
        setIsModalOpen(true);
        setRemoveId(id)
        setRemoveName(userName)
        setRemoveMobile(mobile)
        setRemoveHouse(house)
        setRemoveArea(area)
        setRemoveLandmark(landmark)
        setRemoveCity(city)
        setRemovestate(state)
        setRemovePincode(pincode)

    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>

            <div className='address'>

                <div className="personalInfo">
                    <h3>My Addresses</h3>
                </div>

                <div className="rightContainer">
                    <div className='addressContainer'>
                        <label htmlFor="address">Address ({user?.address?.length})</label>
                        {user?.address?.map(address => (
                            <div className='allAddressContent'>
                                <div className='addressDiv' rows={4} name="address" id="address">
                                    <h5>{address.name}</h5>
                                    <h6> <FaPhoneAlt style={{ color: '#9bf900', marginRight: '10px', }} />{address.mobileNumber}</h6>
                                    <p><b> House No:</b> {address.houseNo},<b> Area:</b> {address.area},<b> Landmark: </b>{address.landmark},<b>City: </b> {address.city},<b> State:</b> {address.state},<b> Pincode: </b>{address.pincode}</p>
                                </div>
                                <div className='editBtnBox' onClick={() => showUpdateAddressModal(address?._id)}>
                                    <button className='productEdit' data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" title="Edit Product"><CiEdit className='EditIcon' /></button>

                                </div>
                                <div className='deleteBtnBox' onClick={() => showModal(address._id, address.name, address.mobileNumber, address.houseNo, address.area, address.landmark, address.city, address.state, address.pincode)}>
                                    <button className='productDelete' data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" title="Delete Product"><IoTrashBinOutline className='deleteIcon' /></button>

                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            <div className="AddAddressicon" onClick={showAddressModal}>
                <FaPlus className='plus' />
            </div>
            <Modal maskStyle={{backdropFilter: 'blur(8px)'}} open={isAddressModalOpen} onOk={handleAddressOk} okButtonProps={{ style: { display: 'none' } }} cancelButtonProps={{ style: { display: 'none' } }} onCancel={handleAddressCancel}>
                <div className="addressModal">
                    <h4>Add New Address</h4>
                    <h6>CONTACT DETAILS</h6>
                    <div className="topPart">
                        <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="text" placeholder='Mobile Number' value={mobile} onChange={(e) => setMobile(e.target.value)} />
                    </div>
                    <h6>ADDRESS DETAILS</h6>
                    <div className="bottumPart">
                        <input type="text" placeholder='Pincode' value={pincode} onChange={(e) => setPincode(e.target.value)} />
                        <input type="text" placeholder='House No.' value={houseNo} onChange={(e) => setHouseNo(e.target.value)} />
                        <input type="text" placeholder='Area' value={area} onChange={(e) => setArea(e.target.value)} />
                        <input type="text" placeholder='Landmark' value={landmark} onChange={(e) => setLandmark(e.target.value)} />
                        <div className="cityState">
                            <input type="text" placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} />
                            <input type="text" placeholder='State' value={state} onChange={(e) => setState(e.target.value)} />
                        </div>
                    </div>
                    <div className="btns">
                        <button className='deleteBtn' onClick={AddAddress}>Add</button>
                        <button className='cancelBtn' onClick={() => setIsAddressModalOpen(false)}>Cancel</button>
                    </div>
                </div>
            </Modal>
            <Modal maskStyle={{backdropFilter: 'blur(8px)'}} open={isUpdateAddressModalOpen} onOk={handleUpdateAddressOk} okButtonProps={{ style: { display: 'none' } }} cancelButtonProps={{ style: { display: 'none' } }} onCancel={handleUpdateAddressCancel}>
                <div className="addressModal">
                    <h4>UPDATE YOUR ADDRESS</h4>
                    <h6>CONTACT DETAILS</h6>
                    <div className="topPart">
                        <input type="text" placeholder='Name' value={nameUpdate} onChange={(e) => setNameUpdate(e.target.value)} />
                        <input type="text" placeholder='Mobile Number' value={mobileUpdate} onChange={(e) => setMobileUpdate(e.target.value)} />
                    </div>
                    <h6>ADDRESS DETAILS</h6>
                    <div className="bottumPart">
                        <input type="text" placeholder='Pincode' value={pincodeUpdate} onChange={(e) => setPincodeUpdate(e.target.value)} />
                        <input type="text" placeholder='House No.' value={houseNoUpdate} onChange={(e) => setHouseNoUpdate(e.target.value)} />
                        <input type="text" placeholder='Area' value={areaUpdate} onChange={(e) => setAreaUpdate(e.target.value)} />
                        <input type="text" placeholder='Landmark' value={landmarkUpdate} onChange={(e) => setLandmarkUpdate(e.target.value)} />
                        <div className="cityState">
                            <input type="text" placeholder='City' value={cityUpdate} onChange={(e) => setCityUpdate(e.target.value)} />
                            <input type="text" placeholder='State' value={stateUpdate} onChange={(e) => setStateUpdate(e.target.value)} />
                        </div>
                    </div>
                    <div className="btns">
                        <button className='deleteBtn' onClick={updateAddress}>Update</button>
                        <button className='cancelBtn' onClick={() => setIsUpdateAddressModalOpen(false)}>Cancel</button>
                    </div>
                </div>
            </Modal>
            <Modal maskStyle={{backdropFilter: 'blur(8px)'}} open={isModalOpen} onOk={handleOk} okButtonProps={{ style: { display: 'none' } }} onCancel={handleCancel} cancelButtonProps={{ style: { display: 'none' } }}>
                <div className='deleteAddModal' style={{borderRadius: '5px'}}>
                    <h6>Remove This Address ?</h6>
                    <div variant="body1" align="left">{removeName}</div>
                    <div variant="body2" align="left">📞 {removeMobile}</div>
                    <div variant="body2" align="left" className='wrap-text'>
                        House No: {removeHouse}, Area: {removeArea}, {removeLandmark ? ('Landmark: ' + removeLandmark + ',') : ''} City: {removeCity}, State: {removeState}, Pincode: {removePincode}
                    </div>
                    <div className="btns">
                        <button className='deleteBtn' onClick={delAddressFunc}>Delete</button>
                        <button className='cancelBtn' onClick={() => setIsModalOpen(false)}>Cancel</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Address