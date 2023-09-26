import React, {useState} from 'react';
import {Galleria} from "primereact/galleria";

const AdsGalleria = () => {
    const images = [
        {source: 'https://source.unsplash.com/random/1000x700/?computer'},
        {source: 'https://source.unsplash.com/random/900x700/?fruit'},
    ];
    return(
        <Galleria
            value={images}
            responsiveOptions={{numVisible: 5}}
            style={{maxWidth: '640px'}}
            showThumbnails={false}
            autoPlay
            circular
            className="mx-auto max-w-4xl min-h-max overflow-hidden -mt-8 transition-all duration-500 ease-in-out shadow-lg"
            transitionInterval={1500}
            showIndicators
            item={(item) => (
                <img src={item.source} alt="Gambar"
                     className="shadow-md rounded-lg min-h-[20rem] max-h-80 min-w-[1280px] bg-cover bg-center hover:shadow-xl transition-shadow duration-300"/>
            )}
            pt={{
                indicators: {className: 'bg-gray-500'},
                indicator: {className: 'text-blue-900'},
                root: {className: 'rounded shadow-md hover:shadow-lg transition-shadow duration-300'}
            }}
        />
    )




}
export default AdsGalleria;