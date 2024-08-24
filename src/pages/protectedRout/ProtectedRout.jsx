import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'
import Login from '../login/Login';
import ErrorPage from '../errorPage/ErrorPage';


const ProtectedRoute = ({ element: Component, ...rest }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();



    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token')
                const decodedToken = jwtDecode(token);
                setUser(decodedToken.user.role);
            } 
            catch (err) {
                console.log(err);
                navigate('/errorpage');
            }
        };
        fetchUserData();

    }, [navigate]);

    if (!user || (user !== 'admin' && user !== 'Super Admin')) {
        return <ErrorPage />;
    }
    return <Component {...rest} user={user} />;

};

export default ProtectedRoute;