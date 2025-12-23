import React, { useState } from 'react';
import { MdGroups, MdLibraryAdd } from 'react-icons/md';
import { ImSearch } from 'react-icons/im';
import { RxAvatar } from 'react-icons/rx';
import { TbSettingsFilled } from 'react-icons/tb';
import { Tooltip } from 'react-tooltip';
import CreateEvent from './ModalEvent/CreateEvent.jsx';
import FormCode from "./ModalEvent/FormCode.jsx";
import { useNavigate } from "react-router-dom";

const RightNav = () => {
    // State Declarations
    const [showModal, setShowModal] = useState(false);
    const [ShowForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    // Handlers
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleOpenForm = () => setShowForm(true);
    const handleCloseForm = () => setShowForm(false);
    const handleProfile = () => navigate("/profile");
    const handleSearch = () => navigate("/search");
    const handleSetting = () => navigate("/profile/setting");

    // Render
    return (
        <div className="bg-white bg-opacity-80 w-full justify-between h-fit fixed bottom-0 left-1/2 transform -translate-x-1/2 flex flex-row lg:justify-center p-4 rounded-xl bg-primary-200 shadow-lg lg:w-fit lg:right-0 lg:inset-y-1/2 lg:flex-col lg:my-auto lg:transform-none lg:left-auto">
            {/* Navigation Buttons */}
            <NavigationButton tooltipId="Lihat Profil" tooltipContent="Lihat Profil" onClick={handleProfile}>
                <RxAvatar size={32} />
            </NavigationButton>
            <NavigationButton tooltipId="Pengaturan" tooltipContent="Pengaturan" onClick={handleSetting}>
                <TbSettingsFilled size={32} />
            </NavigationButton>
            <NavigationButton tooltipId="Cari Info" tooltipContent="Cari Info" onClick={handleSearch}>
                <ImSearch size={32} />
            </NavigationButton>
            <NavigationButton tooltipId="Buat Event" tooltipContent="Buat Event" onClick={handleOpenModal}>
                <MdLibraryAdd size={32} />
            </NavigationButton>
            <NavigationButton tooltipId="Ikut Acara" tooltipContent="Ikut Acara" onClick={handleOpenForm}>
                <MdGroups size={32} />
            </NavigationButton>

            {/* Tooltips */}
            <TooltipCollection />

            {/* Modals */}
            <CreateEvent isOpen={showModal} onRequestClose={handleCloseModal} />
            <FormCode isOpen={ShowForm} onRequestClose={handleCloseForm} />
        </div>
    );
};

const NavigationButton = ({ tooltipId, tooltipContent, onClick, children }) => (
    <button
        className="flex flex-col items-center text-info-500 hover:text-info-400 focus:outline-none transition-transform transform hover:scale-105 relative hover:bg-gray-200 focus:bg-green-200 p-2 rounded-xl"
        data-tooltip-id={tooltipId}
        data-tooltip-content={tooltipContent}
        onClick={onClick}
    >
        {children}
    </button>
);

const TooltipCollection = () => (
    <>
        <Tooltip id="Buat Event" place="left" noArrow={true} delayShow={400} style={{ color: "#FFFFFF", backgroundColor: "#475569" }} />
        <Tooltip id="Ikut Acara" place="left" noArrow={true} delayShow={400} style={{ color: "#FFFFFF", backgroundColor: "#475569" }} />
        <Tooltip id="Cari Info" place="left" noArrow={true} delayShow={400} style={{ color: "#FFFFFF", backgroundColor: "#475569" }} />
        <Tooltip id="Lihat Profil" place="left" noArrow={true} delayShow={400} style={{ color: "#FFFFFF", backgroundColor: "#475569" }} />
        <Tooltip id="Pengaturan" place="left" noArrow={true} delayShow={400} style={{ color: "#FFFFFF", backgroundColor: "#475569" }} />
    </>
);

export default RightNav;
