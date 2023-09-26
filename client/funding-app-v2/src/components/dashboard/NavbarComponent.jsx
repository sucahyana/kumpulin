import React, { useState, useEffect, useRef } from 'react';
import DropdownProfileComponent from './NavbarMicroComponent/DropdownProfileComponent.jsx';
import NotificationComponent from './NavbarMicroComponent/NotificationComponent.jsx';
import Select from 'react-select';
import { Button } from 'primereact/button';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import { search } from '../../services/apiService.jsx';
import { Link, useNavigate } from 'react-router-dom';

const NavbarComponent = ({ isSticky, showNavbar }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchOptions, setSearchOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const searchTimeoutRef = useRef(null);

    const handleNavigateSearch = () => {
        navigate(`/search?q=${searchQuery}`);
    };

    const completeMethod = async () => {
        if (searchQuery.trim().length < 1) {
            setSearchOptions([]);
            return;
        }

        setIsLoading(true);

        try {
            const response = await search(searchQuery);
            const users = response.users.map(user => ({
                label: user.name,
                value: user.id,
                type: 'user',
                image: user.profile_image
            }));
            const events = response.events.map(event => ({
                label: event.title,
                value: event.id,
                type: 'event',
                image: event.event_media[0]?.media_url,
                code: event.code_event
            }));
            setSearchOptions([
                { label: "Users", options: users },
                { label: "Events", options: events }
            ]);
        } catch (error) {
            console.error('Error searching:', error);
        }

        setIsLoading(false);
    };

    useEffect(() => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(completeMethod, 500);

        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchQuery]);

    const formatGroupLabel = (data) => (
        <div className="flex justify-center items-center">
            <span className="text-blue-500 font-semibold text-base">{data.label}</span>
        </div>
    );

    const customStyles = {
        control: (provided) => ({
            ...provided,
            borderRadius: '0.5rem',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            borderColor: 'transparent',
            '&:hover': {
                borderColor: '#93C5FD',
            },
            '&:focus': {
                borderColor: '#3B82F6',
            },
        }),
        option: (provided, state) => ({
            ...provided,
            paddingLeft: state.data.image ? 40 : provided.paddingLeft,
            minHeight: 40,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: state.isSelected ? '#f5f5f5' : state.isFocused ? '#eaeaea' : 'white',
            color: '#333',
            cursor: 'pointer',
        }),
        singleValue: (provided, state) => ({
            ...provided,
            opacity: state.isDisabled ? 0.5 : 1,
            transition: 'opacity 300ms',
            color: '#333',
        }),
        group: (provided) => ({
            ...provided,
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            borderBottom: '1px solid #eaeaea',
        }),
        groupHeading: (provided) => ({
            ...provided,
            color: '#4B5563',
            fontWeight: 'bold',
            paddingLeft: '1rem',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
        }),
    };

    const handleOptionSelect = (selectedOption) => {
        if (selectedOption && selectedOption.value) {
            const { type, value } = selectedOption;
            if (type === 'user') {
                navigate(`/profile/${value}`);
            } else if (type === 'event') {
                navigate(`/event/${value}`);
            }
        }
    };

    return (
        <nav className={`border-b bg-white w-full flex relative justify-between items-center mx-auto px-8 h-20 z-10 ${isSticky ? 'sticky top-0 z-10 shadow-md' : ''} ${showNavbar ? 'transform translate-y-0 transition-transform duration-300 ease-in-out' : 'transform -translate-y-full transition-transform duration-300 ease-in-out'}`}>
            <div className={`sm:block flex-shrink flex-grow-0 justify-start px-2 ${showNavbar ? 'block' : 'hidden'}`}>
                <form className="flex w-full bg-none">
                    <div className="flex mx-4">
                        <Select
                            value={searchOptions.find(option => option.label === searchQuery)}
                            onInputChange={setSearchQuery}
                            options={searchOptions}
                            isLoading={isLoading}
                            maxMenuHeight={800}
                            placeholder="Search..."
                            className={`min-w-[800px] rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            formatGroupLabel={formatGroupLabel}
                            styles={customStyles}
                            components={{
                                Option: ({ data, ...props }) => (
                                    <Link to={data.type === 'user' ? `/profile/${data.value}` : `/event/${data.code}`}>
                                        <div
                                            {...props}
                                            className="flex flex-row flex-grow gap-8 p-2 items-center bg-none border-dashed  border-y-1 border-gray-800 hover:bg-gray-400 mx-2  shadow-sm cursor-pointer transition-all duration-300 hover:translate-x-1 "
                                        >
                                            {data.image && (
                                                <img
                                                    src={data.image}
                                                    alt={data.label}
                                                    className="w-16 h-16 rounded-full mr-2 transition-all duration-300 hover:scale-105  aspect-square shadow-[0px_8px_16px_-8px_rgba(25,20,20,0.80)]"
                                                />
                                            )}
                                            <span className="text-base font-medium text-gray-800">{data.label}</span>
                                        </div>
                                    </Link>
                                )
                            }}
                            onChange={handleOptionSelect}
                        />
                    </div>
                    <Button
                        type="button"
                        icon={isLoading ? <FaSpinner size={18} className="animate-spin" /> : <FaSearch size={18} />}
                        onClick={handleNavigateSearch}
                        className="text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200 ml-2 rounded p-2"
                    />
                </form>
            </div>
            <div className="flex-initial">
                <div className="flex justify-end items-center relative gap-8">
                    <NotificationComponent />
                    <DropdownProfileComponent />
                </div>
            </div>
        </nav>
    );
};

export default NavbarComponent;
