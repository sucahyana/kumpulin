import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function RedirectIfAuthenticated({ children }) {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(state => state.user);
    const tokenLocalStorage = localStorage.getItem('token');

    useEffect(() => {
        if (isAuthenticated || tokenLocalStorage) {
            navigate('/profile');
        }
    }, [navigate, isAuthenticated, tokenLocalStorage]);

    return children;
}
