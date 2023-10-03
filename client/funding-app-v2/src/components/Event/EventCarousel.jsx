import React, { useState, useEffect } from 'react';
import {IoIosArrowUp, IoIosArrowDown, IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';
import { Skeleton } from 'primereact/skeleton';
import {Image} from "primereact/image";

const EventCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [mainImage, setMainImage] = useState(images[0]);

    useEffect(() => {
        setMainImage(images[currentIndex]);
    }, [currentIndex, images]);

    /**
     * Increment the current image index
     */
    const handleNext = () => {
        updateIndex(currentIndex + 1);
    };

    /**
     * Decrement the current image index
     */
    const handlePrev = () => {
        updateIndex(currentIndex - 1);
    };

    /**
     * Handle thumbnail image click and set it as the current image
     * @param {number} index - clicked image index
     */
    const handleImageClick = (index) => {
        updateIndex(index);
    };

    /**
     * Updates the current image index while ensuring it wraps around
     * @param {number} index - new image index
     */
    const updateIndex = (index) => {
        setCurrentIndex((prevIndex) => (index + images.length) % images.length);
    };

    /**
     * Get array of thumbnail images
     */
    const getThumbnails = () => {
        const totalImages = images.length;
        const prevIndex = (currentIndex - 1 + totalImages) % totalImages;
        const nextIndex = (currentIndex + 1) % totalImages;

        return [images[prevIndex], images[currentIndex], images[nextIndex]];
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center bg-white gap-0 p-0 md:gap-8 w-full md:p-5 shadow-lg rounded-lg">
            <MainImage />
            {images.length > 1 && <Thumbnails />}
        </div>
    );

    function Thumbnails() {
        return (
            <div className={`flex flex-row p-5 md:flex-col items-center justify-center gap-1 md:gap-4 w-full md:w-[230px] ${images.length > 2 ? 'mb-2' : ''}`}>
                {images.length > 2 && <ArrowButton direction="up" onClick={handlePrev} />}
                {getThumbnails().map((image, index) => (
                    <Thumbnail image={image} index={index} key={index} />
                ))}
                {images.length > 2 && <ArrowButton direction="down" onClick={handleNext} />}
            </div>
        );
    }

    function ArrowButton({ direction, onClick }) {
        return (
            <button
                onClick={onClick}
                className="-mx-2 shadow-lg h-full w-6 md:h-8 md:w-full hover:scale-105 hover:bg-blue-300 cursor-pointer rounded bg-gray-200 flex items-center justify-center"
            >
                {direction === 'up' ? (
                    <>
                        <IoIosArrowBack className="text-xl md:hidden" />
                        <IoIosArrowUp className="text-2xl hidden md:inline-block" />
                    </>
                ) : (
                    <>
                        <IoIosArrowForward className="text-xl md:hidden" />
                        <IoIosArrowDown className="text-2xl hidden md:inline-block" />
                    </>
                )}
            </button>
        );
    }


    function Thumbnail({ image, index }) {
        const thumbnailIndex = (currentIndex + index - 1 + images.length) % images.length;

        return (
            <button
                onClick={() => handleImageClick(thumbnailIndex)}
                className={`h-20 w-[90px] md:h-60 md:w-60 bg-contain shadow-xl rounded-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 ${currentIndex === thumbnailIndex ? 'ring md:ring-4 ring-blue-500' : 'opacity-80 hover:opacity-100'}`}
            >
                <img className="w-full  max-h-[calc(100%-2px)] border h-full md:h-full md:w-full rounded-lg bg-cover transition duration-300 ease-in-out" alt={`Thumbnail ${index + 1}`} src={image} />
            </button>
        );
    }

    function MainImage() {
        return (
            <div className="relative rounded-lg rounded-b-none bg-none w-full md:w-[695px] md:h-[705px] p-2">
                {mainImage ? (
                    <Image className="relative rounded-lg w-full h-[40vh]  md:w-[695px] md:h-[705px]"
                           alt="Main Carousel"
                           preview
                           src={mainImage}
                           pt={{
                               image: {className: 'h-full w-full rounded-lg bg-cover transition duration-300 ease-in-out' }
                           }}
                    />
                ) : (
                    <Skeleton shape="rectangle" />
                )}
                {mainImage && (
                    <div className="absolute bottom-0 left-0 p-2 text-blue-500 text-xs font-semibold bg-white bg-opacity-60 rounded-lg drop-shadow-xl">
                        {`Gambar ${currentIndex + 1} dari ${images.length}`}
                    </div>
                )}
            </div>
        );
    }
};

export default EventCarousel;
