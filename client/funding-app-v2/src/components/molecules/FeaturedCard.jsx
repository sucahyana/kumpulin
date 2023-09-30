import React, { useState } from "react";
import { FaCouch, FaHome } from "react-icons/fa";
import { Button } from "primereact/button";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const FeaturedCard = ({ data }) => {
    const event = data;
    const maxDescriptionLength = 20;
    const [showFullDescription, setShowFullDescription] = useState(false);
    const navigate = useNavigate();

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const handleClick = () => {
        navigate(`/event/${event.code_event}`);
    };

    const description = showFullDescription
        ? event.description
        : `${event.description.split(" ").slice(0, maxDescriptionLength).join(" ")}${
            event.description.split(" ").length > maxDescriptionLength ? "..." : ""
        }`;

    return (
        <div
            className="relative max-w-xs p-4 bg-white md:p-5 shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
        >
            <div className="relative rounded-lg overflow-hidden h-52 mb-4">
                <img
                    src={event.event_media[0]?.media_url || "https://source.unsplash.com/random/900x700/?building"}
                    alt="Featured Image"
                    className="w-full h-full object-cover transition-transform duration-300 transform ease-in-out hover:scale-110"
                />
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <span
                    className="absolute top-0 left-0 mt-2 md:mt-3 ml-2 md:ml-3 px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm font-medium text-white bg-red-500 rounded-lg"
                >
                    Tutup {format(new Date(event.end_date), "dd MMMM yyyy")}
                </span>
            </div>

            <h2 className="font-medium text-base md:text-lg text-gray-800 mb-2" title={event.title}>
                {event.title}
            </h2>
            <p
                className="text-sm md:text-xs text-gray-600 mb-4"
                style={{ whiteSpace: "pre-line" }}
                title={event.description}
            >
                {description}
                {event.description.split(" ").length > maxDescriptionLength && (
                    <span
                        className="text-blue-500 cursor-pointer hover:underline"
                        onClick={toggleDescription}
                    >
                        {showFullDescription ? " Lebih Sedikit" : " Lengkapnya"}
                    </span>
                )}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                    <FaHome className="text-green-200" size={18} />
                    <span className="text-green-500 text-xs md:text-sm">{event.amount_person} Rp</span>
                </div>
                <div className="flex items-center space-x-2">
                    <FaCouch className="text-yellow-200" size={18} />
                    <span className="text-yellow-500 text-xs md:text-sm">{event.event_participant.length} / {event.max_participant}</span>
                </div>
            </div>
            <Button
                label="More"
                onClick={handleClick}
                className="font-poppins text-gray-100 bg-gradient-to-r from-blue-500 to-blue-400 border-none font-medium mt-4 w-full rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500"
            />
        </div>
    );
};

export default FeaturedCard;
