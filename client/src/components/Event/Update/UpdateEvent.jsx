import React from 'react';

import { Toaster } from 'react-hot-toast';
import SideBarComponent from "../../dashboard/SideBarComponent.jsx";
import NavbarComponent from "../../dashboard/NavbarComponent.jsx";
import ProfileCard from "../../ProfileCard.jsx";
import RightNav from "../../dashboard/RightNav.jsx";

const UpdateEvent = ({ Content }) => {
    return (
        <div className="flex bg-gray-100">

            <div className="flex-grow flex flex-col">
                <div className="m-8 p-8">
                    {Content}
                </div>
                <RightNav />
            </div>
            <Toaster />
        </div>
    );
};

export default UpdateEvent;
