import React, { useState, useEffect } from 'react';
import ReactCrop from 'react-easy-crop';
import { Slider } from 'primereact/slider';
import { Button } from "primereact/button";

const ModalPhoto = ({ imageSrc, crop, setCrop, onCropComplete, onClose, onSave }) => {
    const [cropSize, setCropSize] = useState({ width: 0, height: 0 });
    const [maxSliderValue, setMaxSliderValue] = useState(100);  // Atur nilai maksimum awal slider

    const handleCropSizeChange = (event) => {
        const { value } = event;
        setCropSize({ width: value, height: (value * cropSize.height) / cropSize.width });
    };

    useEffect(() => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            setCropSize({ width: img.width, height: img.height });
            setMaxSliderValue(img.width);  // Atur nilai maksimum slider sesuai dengan lebar gambar
        };
    }, [imageSrc]);

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-3xl overflow-y-auto">
                <ReactCrop
                    image={imageSrc}
                    crop={crop}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    aspect={1}
                    cropSize={cropSize}
                    zoomWithScroll={true}
                    zoomSpeed={1.5}
                />
            </div>
            <div className="mt-4 flex flex-col justify-center bg-gray-100 w-fit py-2 px-8 rounded-lg border-red-950 border-2"
                 style={{ position: 'absolute', bottom: 0, zIndex: 1 }}>
                <div className="mt-4">
                    <label htmlFor="cropSizeSlider" className="block font-medium mb-2">
                        Crop Size
                    </label>
                    <Slider
                        id="cropSizeSlider"
                        value={cropSize.width}
                        onChange={handleCropSizeChange}
                        min={0}
                        max={maxSliderValue}
                    />
                </div>
                <section className="flex flex-row mt-2">
                    <Button onClick={onClose} className="shadow bg-red-500 text-white px-4 py-2 rounded mr-2 border-none">
                        Close
                    </Button>
                    <Button onClick={onSave} className="shadow bg-blue-500 text-white px-4 py-2 rounded border-none">
                        Save
                    </Button>
                </section>
            </div>
        </div>
    );
};

export default ModalPhoto;
