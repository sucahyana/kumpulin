import React, {useState} from 'react';
import {MdGroups, MdLibraryAdd} from 'react-icons/md';
import {ImSearch} from 'react-icons/im';
import {RxAvatar} from 'react-icons/rx';
import {TbSettingsFilled} from 'react-icons/tb';
import {Tooltip} from 'react-tooltip';
import CreateEvent from './ModalEvent/CreateEvent.jsx';
import FormCode from "./ModalEvent/FormCode.jsx";
import {useNavigate} from "react-router-dom";

const RightNav = () => {
    const [showModal, setShowModal] = useState(false);
    const [ShowForm , setShowForm ] = useState(false);
    const navigate = useNavigate();

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    function handleOpenForm() {
        setShowForm(true);
    }
    function handleCloseForm(){
        setShowForm(false);
    }

    function handleProfile(){
        navigate("/profile")
    }
    function handleSearch(){
        navigate("/search")
    }

    function handleSetting() {
        navigate("/profile/setting")
    }

    return (
        <div
            className="fixed right-0 top-1/2 transform -translate-y-1/2 w-[72px] h-[300px] rounded-xl bg-primary-200 shadow-lg flex flex-col items-center justify-between p-4">

            <button
                className="flex flex-col items-center text-info-500 hover:text-info-400 focus:outline-none transition-transform transform hover:scale-105 relative hover:bg-gray-200 focus:bg-green-200 p-2 rounded-xl"
                data-tooltip-id="Lihat Profil"
                data-tooltip-content="Lihat Profil"
                onClick={handleProfile}
            >
                <RxAvatar size={32}/>
            </button>
            <button
                className="flex flex-col items-center text-info-500 hover:text-info-400 focus:outline-none transition-transform transform hover:scale-105 relative hover:bg-gray-200 focus:bg-green-200 p-2 rounded-xl"
                data-tooltip-id="Pengaturan"
                data-tooltip-content="Pengaturan"
                onClick={handleSetting}
            >
                <TbSettingsFilled size={32}/>
            </button>
            <button
                className="flex flex-col items-center text-info-500 hover:text-info-400 focus:outline-none transition-transform transform hover:scale-105 relative hover:bg-gray-200 focus:bg-green-200 p-2 rounded-xl"
                data-tooltip-id="Cari Info"
                data-tooltip-content="Cari Info"
                onClick={handleSearch}
            >
                <ImSearch size={32}/>
            </button>




            <button
                className="flex flex-col items-center text-info-500 hover:text-info-400 focus:outline-none transition-transform transform hover:scale-105 relative hover:bg-gray-200 focus:bg-green-200 p-2 rounded-xl"
                data-tooltip-id="Buat Event"
                data-tooltip-content="Buat Event"
                onClick={handleOpenModal}
            >
                <MdLibraryAdd size={32}/>
            </button><button
            className="flex flex-col items-center text-info-500 hover:text-info-400 focus:outline-none transition-transform transform hover:scale-105 relative hover:bg-gray-200 focus:bg-green-200 p-2 rounded-xl"
            data-tooltip-id="Ikut Acara"
            data-tooltip-content="Ikut Acara"
            onClick={handleOpenForm}
        >
            <MdGroups size={32}/>
        </button>

            <Tooltip id="Buat Event" place="left"
                     noArrow={true}
                     delayShow={400}
                     style={{
                         color: "#FFFFFF",
                         backgroundColor: "#475569"
                     }}/>
            <Tooltip id="Ikut Acara"
                     place="left"
                     noArrow={true}
                     delayShow={400}
                     style={{
                         color: "#FFFFFF",
                         backgroundColor: "#475569"
                     }}/>
            <Tooltip id="Cari Info" place="left"
                     noArrow={true}
                     delayShow={400}
                     style={{
                         color: "#FFFFFF",
                         backgroundColor: "#475569"
                     }}/>
            <Tooltip id="Lihat Profil" place="left"
                     noArrow={true}
                     delayShow={400}
                     style={{
                         color: "#FFFFFF",
                         backgroundColor: "#475569"
                     }}/>
            <Tooltip id="Pengaturan"
                     place="left"
                     noArrow={true}
                     delayShow={400}
                     style={{
                         color: "#FFFFFF",
                         backgroundColor: "#475569"
                     }}/>

            <CreateEvent isOpen={showModal} onRequestClose={handleCloseModal}/>
            <FormCode isOpen={ShowForm} onRequestClose={handleCloseForm}/>
        </div>
    );
};

export default RightNav;
