import React from 'react';
import ReactCrop from 'react-easy-crop';

const ModalPhoto = ({ imageSrc, crop, setCrop, onCropComplete, onClose, onSave }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-3xl overflow-y-auto">
                <ReactCrop
                    image={imageSrc}
                    crop={crop}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    aspect={16/9}
                    cropSize={{ width: 300, height: 200 }}
                />
            </div>
            <div className="mt-4 flex justify-center" style={{ position: 'absolute', bottom: 50, width: '100%', zIndex: 1 }}>
                <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Close</button>
                <button onClick={onSave} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
            </div>
        </div>
    );
};

export default ModalPhoto;
