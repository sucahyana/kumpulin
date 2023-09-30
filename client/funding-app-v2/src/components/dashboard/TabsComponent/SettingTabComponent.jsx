import React, {useState} from 'react';
import BasicForm from "./BasicForm.jsx";
import ContactForm from "./ContactForm.jsx";
import KeamananForm from "./KeamananForm.jsx";
import PhotoForm from "./PhotoForm.jsx";

const SettingTabComponent = () => {
    const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'Basic');



    const tabContent = {
        Basic: <BasicForm />,
        Contact: <ContactForm />,
        Keamanan: <KeamananForm/>,
        Photo: <PhotoForm />
    };

    const renderContent = () => tabContent[activeTab] || tabContent.Basic;

    return (
        <div>
            <div className="grid grid-cols-4 gap-5">
                {['Basic', 'Contact', 'Keamanan', 'Photo'].flatMap(tab => ([
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`p-4 rounded-xl shadow-md flex items-center justify-center 
                        ${activeTab === tab ?
                            'bg-blue-500 shadow-[0px 1px 2px rgba(105, 81, 255, 0.05)]  font-medium text-lg text-blue-50 border-[4px] border-solid border-blue-200' :
                            'bg-blue-300 shadow-[0px 1px 2px rgba(105, 81, 255, 0.05)]  font-medium text-lg text-blue-50'}`}
                    >
                        {tab}
                    </button>
                ]))}
            </div>
            <div className="flex justify-center ">
                <div
                    className="shadow-xl border-2 border-white font-light p-8 rounded-xl text-gray-500 bg-white mt-6 mb-8">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default SettingTabComponent;
