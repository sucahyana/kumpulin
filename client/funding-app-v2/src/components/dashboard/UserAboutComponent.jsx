import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoMdBowtie, IoMdCall, IoMdMail, IoMdPin } from 'react-icons/io';
import { FaBirthdayCake } from 'react-icons/fa';
import { format } from 'date-fns';
import { Skeleton } from 'primereact/skeleton';
import { Button } from "primereact/button";
import { useNavigate, useLocation } from 'react-router-dom';

const InfoItem = ({ Icon, label, value, bgColor }) => (
    <div className={`w-[calc(50%-8px)] sm:w-[calc(33%-2px)] md:w-full flex border-2 md:border border-dashed items-center mb-2 p-3 rounded-md hover:bg-gray-200 text-opacity-70 transition-all duration-300 ease-in-out ${bgColor}`}>
        <Icon className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0" aria-label={label} />
        <span className="text-sm font-medium break-all ">{value}</span>
    </div>
);

const UserAboutComponent = ({ userData, showEditButton }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleEditClick = () => {
        navigate('/profile/setting');
    };

    if (!userData) {
        return (
            <div className="w-[300px] shadow-md bg-white rounded-lg p-5 border border-gray-200 text-darkslategray mb-8">
                <div className="flex flex-col gap-4 mb-6">
                    <h2 className="text-2xl font-semibold border-b pb-2 mb-4">About</h2>
                    {[...Array(4)].map((_, idx) => (
                        <Skeleton key={idx} shape="rectangle" style={{ width: '100%', height: '2.5rem' }} className="mb-4" />
                    ))}
                </div>
            </div>
        );
    }
    return (
        <div className="flex flex-wrap justify-around md:flex-col w-full xl:w-[calc(100%-10vh)] shadow-none md:shadow-md bg-gray-100 md:bg-white overflow-hidden rounded-lg p-0 md:p-5">
            <div className="hidden md:block mb-6">
                <h2 className="text-lg sm:text-2xl font-semibold border-b pb-2 mb-4">About</h2>
            </div>

            <div className="flex flex-wrap justify-around w-full">
                {userData.gender && <InfoItem bgColor={"bg-blue-50 text-blue-900"} Icon={IoMdBowtie} label="Gender" value={userData.gender} />}
                {userData.birth_date && <InfoItem bgColor={"bg-yellow-50 text-yellow-900"} Icon={FaBirthdayCake} label="Birthday" value={`Born ${format(new Date(userData.birth_date), 'dd MMMM yyyy')}`} />}
                {userData.address && <InfoItem bgColor={"bg-orange-50 text-orange-900"} Icon={IoMdPin} label="Address" value={userData.address} />}
                {userData.telphone && <InfoItem bgColor={"bg-green-50 text-green-900"} Icon={IoMdCall} label="Phone" value={userData.telphone} />}
                {userData.email && <InfoItem bgColor={"bg-red-50 text-red-900"} Icon={IoMdMail} label="Email" value={userData.email} />}
            </div>

            {showEditButton && (
                <Button
                    outlined raised
                    className="w-full sm:w-1/2 font-poppins  bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition-colors duration-300"
                    label="Edit Informasi"
                    onClick={handleEditClick}
                ></Button>
            )}
        </div>
    );
};

export default UserAboutComponent;
