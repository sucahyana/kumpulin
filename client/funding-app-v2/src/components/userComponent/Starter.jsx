import React, { useEffect, useState } from 'react';
import SideBarComponent from '../../components/dashboard/SideBarComponent';
import ProfileCard from '../../components/ProfileCard';
import NavbarComponent from '../../components/dashboard/NavbarComponent.jsx';
import RightNav from '../dashboard/RightNav.jsx';
import { Toaster } from 'react-hot-toast';

const Starter = ({ Content }) => {
    const [isSticky, setIsSticky] = useState(false);
    const [isScrolledDown, setIsScrolledDown] = useState(false);
    const [lastScrollPosition, setLastScrollPosition] = useState(0);
    const [showNavbar, setShowNavbar] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPosition = window.scrollY;

            if (currentScrollPosition < lastScrollPosition) {
                setShowNavbar(true);
            } else {
                setShowNavbar(false);
            }

            setIsScrolledDown(currentScrollPosition > 0);
            setIsSticky(currentScrollPosition > 100);
            setLastScrollPosition(currentScrollPosition);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollPosition]);

    return (
        <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
<SideBarComponent/>
            <div className="flex-grow flex flex-col w-full lg:w-3/4">
                <NavbarComponent
                    isSticky={isSticky}
                    showNavbar={showNavbar}
                />
                <main className="m-4 mt-0 p-4 lg:m-8 lg:mt-0 lg:p-8 flex-grow">
                    {Content}
                </main>
                <RightNav />
            </div>
            <Toaster />
        </div>
    );
};

export default Starter;
