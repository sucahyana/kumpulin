import React, { useState, useEffect } from 'react';
import DeskripsiEvent from "./DeskripsiEvent.jsx";
import ParticipantEvent from "./ParticipantEvent.jsx";
import ChatEvent from "./ChatEvent.jsx";
import {Button} from "primereact/button";

const EventTabComponent = ({ eventData }) => {
    const getInitialTab = () => localStorage.getItem('activeTab') || 'Deskripsi';
    const [activeTab, setActiveTab] = useState(getInitialTab);

    useEffect(() => {
        localStorage.setItem('activeTab', activeTab);
    }, [activeTab]);

    const tabs = [
        { name: 'Deskripsi', content: <DeskripsiEvent eventData={eventData} /> },
        { name: 'Participant', content: <ParticipantEvent eventData={eventData} /> },
        { name: 'Diskusi', content: <ChatEvent /> },
    ];

    const renderContent = () => tabs.find(tab => tab.name === activeTab)?.content;

    return (
        <div>
            <div className="grid grid-cols-3 gap-2 md:gap-5 mb-8">
                {tabs.map(({ name }) => (
                    <Button
                        key={name}
                        onClick={() => setActiveTab(name)}
                        className={`p-1 md:p-4 rounded text-sm md:text:base  shadow-md flex items-center justify-center font-poppins
                        ${activeTab === name ? 'bg-blue-500 text-blue-50 border-[4px] border-solid border-blue-200' : 'bg-blue-300 text-blue-50'}`}
                    >
                        {name}
                    </Button>
                ))}
            </div>
            <div className="flex justify-center mt-6">
                <div className="shadow-lg font-light rounded-xl text-gray-500 bg-white w-full max-w-full">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default EventTabComponent;
