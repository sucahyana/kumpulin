import React, { useState, useEffect } from 'react';
import DeskripsiEvent from "./DeskripsiEvent.jsx";
import ParticipantEvent from "./ParticipantEvent.jsx";
import ChatEvent from "./ChatEvent.jsx";

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                {tabs.map(({ name }) => (
                    <button
                        key={name}
                        onClick={() => setActiveTab(name)}
                        className={`p-4 rounded-xl shadow-md flex items-center justify-center 
                        ${activeTab === name ? 'bg-blue-500 text-blue-50 border-[4px] border-solid border-blue-200' : 'bg-blue-300 text-blue-50'}`}
                    >
                        {name}
                    </button>
                ))}
            </div>
            <div className="flex justify-center mt-6">
                <div className="shadow-xl font-light rounded-xl text-gray-500 bg-white w-full max-w-screen-xl">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default EventTabComponent;
