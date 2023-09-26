import React, { useState, useEffect } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { Skeleton } from 'primereact/skeleton';

const EventCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [mainImage, setMainImage] = useState(images[0]);

    useEffect(() => {
        setMainImage(images[currentIndex]);
    }, [currentIndex, images]);

    const handleNext = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    const handlePrev = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    const handleImageClick = (index) => setCurrentIndex(index);

    const getThumbnails = () => {
        const totalImages = images.length;
        const prevIndex = (currentIndex - 1 + totalImages) % totalImages;
        const nextIndex = (currentIndex + 1) % totalImages;

        return [images[prevIndex], images[currentIndex], images[nextIndex]];
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center bg-white gap-8 w-full p-5 shadow-lg rounded-lg">
            {images.length > 1 && (
                <div className={`flex flex-col items-center justify-center gap-2 w-full md:w-[230px] ${images.length > 2 ? 'mb-2' : ''}`}>
                    {images.length > 2 && (
                        <button onClick={handlePrev} className="shadow-xl h-8 hover:scale-105 w-full hover:bg-blue-300 cursor-pointer rounded-full bg-blue-200 flex items-center justify-center">
                            <IoIosArrowUp className="text-2xl" />
                        </button>
                    )}
                    {getThumbnails().map((image, index) => (
                        <button
                            key={index}
                            onClick={() => handleImageClick((currentIndex + index - 1 + images.length) % images.length)}
                            className={`h-36 w-36 md:h-60 md:w-60 shadow-xl rounded-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 ${currentIndex === (currentIndex + index - 1 + images.length) % images.length ? 'ring-4 ring-blue-500' : 'opacity-60 hover:opacity-100'}`}
                        >
                            <img className="h-24 w-24 md:h-full md:w-full rounded-lg object-cover transition duration-300 ease-in-out" alt={`Thumbnail ${index + 1}`} src={image} />
                        </button>
                    ))}
                    {images.length > 2 && (
                        <button onClick={handleNext} className="shadow-xl h-8 hover:scale-105 w-full hover:bg-blue-300 cursor-pointer rounded-full bg-blue-200 flex items-center justify-center">
                            <IoIosArrowDown className="text-2xl" />
                        </button>
                    )}
                </div>
            )}
            <div className="shadow-xl relative rounded-lg bg-blue-100 w-full md:w-[695px] h-[70vh] md:h-[705px]">
                {mainImage ? (
                    <img className="h-full w-full rounded-lg object-cover transition duration-300 ease-in-out" alt="Main Carousel" src={mainImage} />
                ) : (
                    <Skeleton shape="rectangle" />
                )}
                {mainImage && (
                    <div className="absolute bottom-0 left-0 p-2 text-blue-500 font-semibold bg-white bg-opacity-60 rounded-lg drop-shadow-xl">
                        {`Gambar ${currentIndex + 1} dari ${images.length}`}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventCarousel;
