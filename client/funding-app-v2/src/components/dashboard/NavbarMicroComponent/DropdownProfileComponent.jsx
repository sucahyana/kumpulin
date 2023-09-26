import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, Link} from "react-router-dom";
import {resetUser} from "../../../store/actions/user.js";
import apiService from "../../../services/apiService.jsx";

function DropdownProfileComponent() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.user);
    const navigate = useNavigate();
    const user = useSelector(state => state.user.data?.user);
    const userName = user?.name || '';
    const userEmailOrPhone = user?.email || user?.telphone || "Error";

    const toggleDropdown = useCallback(() => {
        setIsOpen(prevIsOpen => !prevIsOpen);
    }, []);

    const handleLogout = useCallback(async () => {
        try {
            dispatch(resetUser());
            await apiService.delete('auth/logout', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/login');
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }, [dispatch, token, navigate]);

    return (
        <div className="relative inline-block">
            <button
                onClick={toggleDropdown}
                className={`relative z-10 flex items-center p-2 text-sm rounded-md hover:scale-105 hover:bg-gray-200 focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring ${isOpen ? 'bg-info-050 text-white' : 'text-gray-600 bg-none dark:text-white dark:bg-gray-800'} cursor-pointer`}
            >
                <img
                    className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
                    src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200"
                    alt="jane avatar"
                />
                {isOpen && <span className="mx-1 text-gray-800">{userName}</span>}
                <svg
                    className="w-5 h-5 mx-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
                        fill="currentColor"
                    ></path>
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 z-20 py-2 mt-2 overflow-hidden origin-top-right bg-info-050 rounded-md shadow-xl dark:bg-gray-800 min-w-max">
                    <Link to="/profile" className="flex items-center p-3 whitespace-nowrap">
                        <img
                            className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
                            src="https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200"
                            alt="jane avatar"
                        />
                        <div className="mx-1">
                            <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">{userName}</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{userEmailOrPhone}</p>
                        </div>
                    </Link>
                    <hr className="border-gray-200 dark:border-gray-700"/>
                    <Link to="/profile/setting" className="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer">
                        <svg
                            className="w-5 h-5 mx-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* SVG content */}
                        </svg>
                        Setting
                    </Link>
                    <div onClick={handleLogout} className="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer">
                        <svg
                            className="w-5 h-5 mx-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* SVG content */}
                        </svg>
                        Logout
                    </div>
                </div>
            )}
        </div>
    );
}

export default DropdownProfileComponent;
