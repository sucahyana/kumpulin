import React, { useState } from 'react';
import { Galleria } from "primereact/galleria";

const AdsGalleria = () => {
    const images = [
        { source: 'https://source.unsplash.com/random/1000x700/?computer' },
        { source: 'https://source.unsplash.com/random/900x700/?fruit' },
    ];

    return (
        <div className="w-full xl:w-2/3 xl:mx-auto">
            <Galleria
                value={images}
                responsiveOptions={[
                    {
                        breakpoint: '1024px',
                        numVisible: 3,
                    },
                    {
                        breakpoint: '768px',
                        numVisible: 2,
                    },
                    {
                        breakpoint: '480px',
                        numVisible: 1,
                    },
                ]}
                style={{ maxWidth: '100%', margin: '0 auto' }}
                showThumbnails={false}
                autoPlay
                circular
                className="mx-auto overflow-hidden mt-2 md:mt-4 lg:mt-6 transition-all duration-500 ease-in-out shadow-lg"
                transitionInterval={1500}
                showIndicators
                item={(item) => (
                    <img
                        src={item.source}
                        alt="Gambar"
                        className="rounded rounded-b-none h-40 md:h-60 lg:h-80 w-full bg-cover bg-center hover:shadow-xl transition-shadow duration-300"
                    />
                )}
                pt={{
                    indicators: { className: 'bg-gradient-to-r from-blue-100 to-green-100 ' },
                    indicator: { className: 'text-red-900' },
                    root: { className: 'rounded shadow-md hover:shadow-lg transition-shadow duration-300 ' },
                }}
            />
        </div>

    );
};

export default AdsGalleria;
