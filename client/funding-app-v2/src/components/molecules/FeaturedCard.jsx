import React, {useState} from "react";
import {FaCouch, FaHome} from "react-icons/fa";
import {Button} from "primereact/button";
import {format} from "date-fns";
import {useNavigate} from "react-router-dom";

const FeaturedCard = ({data}) => {
    const event = data;
    const navigate = useNavigate();
    const maxDescriptionLength = 20;
    const [showFullDescription, setShowFullDescription] = useState(false);

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
            className="relative flex flex-col max-w-[47%] p-2 bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
            <FeaturedImage event={event}/>
            <section className="px-4">
                <h2 className="font-medium text-sm md:text-lg text-gray-800 mb-2" title={event.title}>
                    {event.title}
                </h2>

                <FeaturedDescription
                    description={description}
                    maxDescriptionLength={maxDescriptionLength}
                    event={event}
                    toggleDescription={toggleDescription}
                    showFullDescription={showFullDescription}

                />
                <FeaturedDetails event={event}/>
            </section>
            <FeaturedButton handleClick={handleClick}/>
        </div>
    );
};

const FeaturedImage = ({event}) => (
    <div className="relative rounded-lg overflow-hidden md:w-auto h-[45%] flex-grow lg:h-52 mb-4">
        <img
            src={event.event_media[0]?.media_url || "https://source.unsplash.com/random/900x700/?building"}
            alt="Featured Image"
            className="object-cover transition-transform duration-300 transform ease-in-out hover:scale-110"
        />
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <span
            className="absolute top-0 left-0 mt-2 md:mt-3 ml-2 md:ml-3 px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm font-medium text-white bg-red-500 rounded-lg"
        >
            Tutup {format(new Date(event.end_date), "dd MMMM yyyy")}
        </span>
    </div>
);

const FeaturedDescription = ({description, maxDescriptionLength, event, toggleDescription, showFullDescription}) => (
    <p
        className="text-sm md:text-xs text-gray-600 md:mb-4 hidden lg:block"
        style={{whiteSpace: "pre-line"}}
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
);

const FeaturedDetails = ({event}) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <FeaturedDetail icon={<FaHome className="text-green-200" size={18}/>} text={`${event.amount_person} Rp`}/>
        <FeaturedDetail icon={<FaCouch className="text-yellow-200" size={18}/>}
                        text={`${event.event_participant.length} / ${event.max_participant}`}/>
    </div>
);

const FeaturedDetail = ({icon, text}) => (
    <div className="flex items-center space-x-2">
        {icon}
        <span className="text-xs md:text-sm text-gray-500">{text}</span>
    </div>
);

const FeaturedButton = ({handleClick}) => (
    <Button
        label="More"
        onClick={handleClick}
        className="font-poppins text-gray-100 bg-gradient-to-r from-blue-500 to-blue-400 border-none font-medium mt-4 w-full rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500"
    />
);

export default FeaturedCard;
