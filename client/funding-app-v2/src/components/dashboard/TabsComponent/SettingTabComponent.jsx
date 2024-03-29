import React, { useState, useEffect } from 'react';
import {
    BsFillPersonFill,
    BsFillEnvelopeFill,
    BsShieldLockFill,
    BsFillImageFill,
} from 'react-icons/bs';
import BasicForm from './BasicForm.jsx';
import ContactForm from './ContactForm.jsx';
import KeamananForm from './KeamananForm.jsx';
import PhotoForm from './PhotoForm.jsx';
import { Button } from 'primereact/button';

const TabButton = ({ tab, active, onClick }) => {
    const isMobile = window.innerWidth <= 768;

    const iconMap = {
        Basic: <BsFillPersonFill className="text-gray-600" />,
        Contact: <BsFillEnvelopeFill className="text-gray-600" />,
        Keamanan: <BsShieldLockFill className="text-gray-600" />,
        Photo: <BsFillImageFill className="text-gray-600" />,
    };

    return (
        <Button
            onClick={() => onClick(tab)}
            className={`p-2 md:p-4 rounded-lg shadow-md flex items-center justify-center font-poppins
          ${active === tab
                ? 'bg-blue-500 shadow-[0px 1px 2px rgba(105, 81, 255, 0.05)] font-medium text-lg text-blue-50 border-[4px] border-solid border-blue-200'
                : 'bg-blue-300 shadow-[0px 1px 2px rgba(105, 81, 255, 0.05)] font-medium text-lg text-blue-50'}`}
        >
            {isMobile ? iconMap[tab] : tab}
        </Button>
    );
};

const SettingTabComponent = () => {
    const [activeTab, setActiveTab] = useState(
        localStorage.getItem('activeTab') || 'Basic'
    );

    const tabContent = {
        Basic: <BasicForm />,
        Contact: <ContactForm />,
        Keamanan: <KeamananForm />,
        Photo: <PhotoForm />,
    };

    const renderContent = () => tabContent[activeTab] || tabContent.Basic;

    return (
        <div>
            <div className="grid grid-cols-4 gap-2 md:gap-5">
                {['Basic', 'Contact', 'Keamanan', 'Photo'].map((tab) => (
                    <TabButton
                        key={tab}
                        tab={tab}
                        active={activeTab}
                        onClick={setActiveTab}
                    />
                ))}
            </div>
            <div className="flex justify-center ">
                <div className="shadow-lg border-2 border-white font-light p-8 rounded-xl text-gray-500 bg-white mt-6 mb-8">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default SettingTabComponent;
