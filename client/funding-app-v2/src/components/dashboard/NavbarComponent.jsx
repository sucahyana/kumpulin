import React, { useState, useRef, useEffect } from 'react';
import DropdownProfileComponent from './NavbarMicroComponent/DropdownProfileComponent.jsx';
import { search } from '../../services/apiService.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import logo from '../../assets/images/logo.png';
import debounce from 'lodash/debounce';

const NavbarComponent = ({ isSticky, showNavbar }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const searchTimeoutRef = useRef(null);

    const debouncedHandleSearch = debounce(async (query) => {
        if (!query.trim()) return;

        setIsLoading(true);

        try {
            const response = await search(query);
            navigate(`/search?q=${query}`, { state: { results: response } });
        } catch (error) {
            console.error('Error searching:', error);
        } finally {
            setIsLoading(false);
        }
    }, 500);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            debouncedHandleSearch(searchQuery);
        }
    };

    const handleInputChange = (e) => {
        const newSearchQuery = e.target?.value;
        setSearchQuery(newSearchQuery);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            debouncedHandleSearch(newSearchQuery);
        }, 500);
    };

    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

    return (
        <nav
            className={`border-b bg-gray-100 w-full flex relative justify-between items-center mx-auto px-4 sm:px-8 h-16 lg:h-20 z-10 ${
                isSticky ? 'sticky top-0 z-10 shadow-md' : ''
            } ${showNavbar ? 'transform translate-y-0 transition-transform duration-300 ease-in-out' : 'transform -translate-y-full transition-transform duration-300 ease-in-out'}`}
        >
            <Link to={'/'} className="lg:hidden">
                <img className="w-auto h-14 bg-none " src={logo} alt="Logo Kumpulin" />
            </Link>
            <div className={`sm:block flex-shrink flex-grow-0 justify-start px-2 `}>
                <div className="flex w-full bg-none">
                    <div className="flex mx-2 sm:mx-4">
                        <div className="relative">
                            <InputText
                                value={searchQuery}
                                onChange={handleInputChange}
                                placeholder="Search for users or events..."
                                className="w-[150px] sm:min-w-[400px] lg:min-w-[600px] rounded-lg shadow-sm"
                                onKeyPress={handleKeyPress}
                            />
                            {isLoading && (
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <ProgressSpinner style={{ width: '20px', height: '20px' }} className="" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-initial">
                <div className="flex justify-end items-center relative gap-4 sm:gap-8 lg:gap-12">
                    <DropdownProfileComponent />
                </div>
            </div>
        </nav>
    );
};

export default NavbarComponent;
