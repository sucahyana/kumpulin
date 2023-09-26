import React from 'react';

const DeskripsiEvent = ({ eventData }) => {
    return (
        <div style={{ width: 'calc(100% - 20px)', maxWidth: '1456px' }} className="p-8" >
            <h2 className="text-xl font-semibold mb-4">Deskripsi Acara</h2>
            <p className="text-gray-600 mb-8" style={{ whiteSpace: 'pre-line' }}>
                {eventData.description}
            </p>
        </div>
    );
};

export default DeskripsiEvent;
