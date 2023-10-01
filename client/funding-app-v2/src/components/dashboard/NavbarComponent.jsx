import React, {useState, useEffect, useRef} from 'react';
import DropdownProfileComponent from './NavbarMicroComponent/DropdownProfileComponent.jsx';
import NotificationComponent from './NavbarMicroComponent/NotificationComponent.jsx';
import {search} from '../../services/apiService.jsx';
import {Link, useNavigate} from 'react-router-dom';
import {InputText} from 'primereact/inputtext';
import {ProgressSpinner} from 'primereact/progressspinner';
import logo from "../../assets/images/logo.png";

const NavbarComponent = ({isSticky, showNavbar}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const searchTimeoutRef = useRef(null);
    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsLoading(true);

        try {
            const response = await search(searchQuery);
            navigate(`/search?q=${searchQuery}`, {state: {results: response}});
        } catch (error) {
            console.error('Error searching:', error);
        } finally {
            setIsLoading(false);
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    useEffect(() => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(handleSearch, 500);

        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchQuery]);
    const SearchBar = ({searchQuery, setSearchQuery, isLoading, handleKeyPress}) => (
        <div className={`sm:block flex-shrink flex-grow-0 justify-start px-2 `}>
            <div className="flex w-full bg-none">
                <div className="flex mx-2 sm:mx-4">
                    <div className="relative">
                        <InputText
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target?.value)}
                            placeholder="Search for users or events..."
                            className="sm:min-w-[300px] lg:min-w-[600px] rounded-lg shadow-sm"
                            onKeyPress={handleKeyPress}
                        />
                        {isLoading && (
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <ProgressSpinner style={{width: '20px', height: '20px'}} className=""/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <nav
            className={`border-b bg-gray-100 w-full flex relative justify-between items-center mx-auto px-4 sm:px-8 h-16 lg:h-20 z-10 ${isSticky ? 'sticky top-0 z-10 shadow-md' : ''} ${showNavbar ? 'transform translate-y-0 transition-transform duration-300 ease-in-out' : 'transform -translate-y-full transition-transform duration-300 ease-in-out'}`}>
            <Link to={"/"} className=" lg:hidden">
                <img className="w-auto h-14 bg-none " src={logo} alt="Logo Kumpulin" />
            </Link>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} isLoading={isLoading}
                       handleKeyPress={handleKeyPress}/>
            <div className="flex-initial">
                <div className="flex justify-end items-center relative gap-4 sm:gap-8 lg:gap-12">
                    {/*<NotificationComponent/>*/}
                    <DropdownProfileComponent/>
                </div>
            </div>
        </nav>
    );
};


export default NavbarComponent;
