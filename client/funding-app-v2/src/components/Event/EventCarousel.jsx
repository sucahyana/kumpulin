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
        <div className="flex flex-col sm:flex-row items-center justify-center bg-white gap-0 p-0 sm:gap-2 sm:p-2 lg:p-5 lg:gap-8 w-full  shadow-lg rounded-lg">
            <MainImage />
            {images.length > 1 && <Thumbnails />}
        </div>
    );

    function Thumbnails() {
        return (
            <div className={`flex flex-row p-1 sm:flex-col items-center justify-center gap-2 w-full md:w-[230px] ${images.length > 2 ? 'mb-2' : ''} overflow-x-auto whitespace-nowrap md:whitespace-normal scrollbar-hide`}>
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
                className="-mx-2 hidden md:flex shadow-lg h-full w-6 md:h-8 sm:w-[calc(100%-2px)] lg:w-full hover:scale-105 hover:bg-blue-300 cursor-pointer rounded-lg bg-gray-200 items-center justify-center"
            >
                {direction === 'up' ? (
                    <IoIosArrowUp className="text-2xl" />
                ) : (
                    <IoIosArrowDown className="text-2xl" />
                )}
            </button>
        );
    }




    function Thumbnail({ image, index }) {
        const thumbnailIndex = (currentIndex + index - 1 + images.length) % images.length;

        return (
            <button
                onClick={() => handleImageClick(thumbnailIndex)}
                className={`h-20 w-[90px] sm:w-full sm:h-40  lg:w-[calc(100%-20px)] xl:w-full lg:h-40 xl:h-48 bg-cover  rounded-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 ${currentIndex === thumbnailIndex ? 'ring sm:ring-2 lg:ring-4 ring-blue-500' : 'opacity-80 hover:opacity-100'}`}
            >
                <img className="w-full  max-h-[calc(100%-2px)] border h-full md:h-full md:w-full rounded-lg bg-cover transition duration-300 ease-in-out" alt={`Thumbnail ${index + 1}`} src={image} />
            </button>
        );
    }

    function MainImage() {
        return (
            <div className="relative rounded-lg rounded-b-none md:rounded-b-lg justify-center flex bg-none md:shadow-lg w-[calc(100%-8px)] h-[40vh] sm:w-[calc(200%-8px)] sm:h-[60vh] md:w-[calc(100%-8px)] md:h-[60vh] lg:w-[calc(90%-8px)] lg:h-[calc(70vh-20px)] 2xl:w-[calc(70%-8px)] xl:h-[70vh]">
                {mainImage ? (
                    <Image className="relative rounded-lg b-cover flex w-full h-full"
                           alt="Main Carousel"
                           preview
                           src={mainImage}
                           pt={{
                               image: {className: 'h-full w-full rounded-lg transition duration-300 ease-in-out' }
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
