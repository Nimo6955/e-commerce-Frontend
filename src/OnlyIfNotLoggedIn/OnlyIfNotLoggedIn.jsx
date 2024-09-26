import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function OnlyIfNotLoggedIn() {
    const user = localStorage.getItem('token');
    return (
      user && (typeof token === 'string' && token.split('.').length === 3) ? <Navigate to='/'/> : <Outlet/>
    )
}

export default OnlyIfNotLoggedIn