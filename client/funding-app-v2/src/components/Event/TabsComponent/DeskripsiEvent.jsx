import React from 'react';

const DeskripsiEvent = ({ eventData }) => {
    return (
        <div style={{ width: 'calc(100% - 20px)', maxWidth: '1456px' }} className="p-4 md:p-8" >
            <h2 className="text-base md:text-xl font-semibold mb-4">Deskripsi Acara</h2>
            <p className="text-xs font-medium md:text-sm break-all  leading-7 text-left text-gray-900 mb-8" style={{ whiteSpace: 'pre-line' }}>
                {eventData.description}
            </p>
        </div>
    );
};

export default DeskripsiEvent;
