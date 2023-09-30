import React, { useState } from 'react';
import { Galleria } from "primereact/galleria";

const AdsGalleria = () => {
    const images = [
        { source: 'https://source.unsplash.com/random/1000x700/?computer' },
        { source: 'https://source.unsplash.com/random/900x700/?fruit' },
    ];

    return (
        <Galleria
            value={images}
            responsiveOptions={[
                {
                    breakpoint: '1024px', // Sesuaikan dengan breakpoint yang Anda inginkan
                    numVisible: 3, // Jumlah item yang terlihat pada breakpoint ini
                },
                {
                    breakpoint: '768px', // Sesuaikan dengan breakpoint yang Anda inginkan
                    numVisible: 2, // Jumlah item yang terlihat pada breakpoint ini
                },
                {
                    breakpoint: '480px', // Sesuaikan dengan breakpoint yang Anda inginkan
                    numVisible: 1, // Jumlah item yang terlihat pada breakpoint ini
                },
            ]}
            style={{ maxWidth: '100%', margin: '0 auto', width: '100%' }}
            showThumbnails={false}
            autoPlay
            circular
            className="mx-auto max-w-4xl  overflow-hidden mt-2 md:mt-4 lg:mt-6 transition-all duration-500 ease-in-out shadow-lg"
            transitionInterval={1500}
            showIndicators
            item={(item) => (
                <img
                    src={item.source}
                    alt="Gambar"
                    className="shadow-md rounded-lg min-h-[20rem] max-h-80 w-full bg-cover bg-center hover:shadow-xl transition-shadow duration-300"
                />
            )}
            pt={{
                indicators: { className: 'bg-gray-500' },
                indicator: { className: 'text-blue-900' },
                root: { className: 'rounded shadow-md hover:shadow-lg transition-shadow duration-300' },
            }}
        />
    );
};

export default AdsGalleria;
