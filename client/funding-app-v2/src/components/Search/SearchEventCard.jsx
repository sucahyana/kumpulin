import React from "react";
import { useNavigate } from "react-router-dom";
import { trim } from "lodash/string.js";
import Footer from "./Footer.jsx";

const SearchEventCard = ({ event }) => {
    if (!event) return null; // Return null if event is not provided

    const navigate = useNavigate();

    const truncatedDescription = event?.description?.length > 100 ? `${event.description.substring(0, 100)}...` : event?.description || "";

    const handleCardClick = () => {
        navigate(`/event/${event.code_event}`);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    return (
        <div className="relative rounded-xl bg-white w-full md:w-[540px] lg:w-[840px] flex flex-col md:flex-row items-center md:items-start justify-start text-left text-black shadow-md mb-10 p-4">
            <div className="w-full md:w-[440px] h-[220px] md:h-full cursor-pointer hover:scale-105 delay-100 transition-all overflow-hidden rounded-lg shadow-lg">
                <div
                    className="w-full h-full bg-cover bg-center rounded-lg shadow-inner"
                    style={{
                        backgroundImage: `url(${event?.event_media?.[0]?.media_url || "https://picsum.photos/900"})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                    }}
                    onClick={handleCardClick}
                >
                    {!event?.event_media?.[0]?.media_url && (
                        <div className="animate-pulse w-full h-full bg-gray-300 rounded-lg"></div>
                    )}
                </div>
            </div>

            <div className="flex-1 flex flex-col p-4 md:p-8 gap-4 md:gap-6 justify-between bg-gray-50 rounded-lg">
                <div>
                    <div className="flex items-center gap-4 md:gap-5 text-blue-500 mb-2 md:mb-4">
                        <div className="flex flex-row items-center justify-start gap-2 md:gap-4">
                            <img
                                className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-gray-300"
                                alt="Event creator"
                                src={event?.user?.profile_image || "https://picsum.photos/900"}
                                loading="lazy"
                            />
                            <div className="flex flex-col">
                                <span className="opacity-70 font-medium text-lg">Pembuat Acara</span>
                                <div className="font-semibold text-gray-800 text-base">{event?.user?.name || "Unknown"}</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start p-2 justify-start gap-2 mt-2 md:mt-4 border-dashed border-t-2 border-b-2 py-2 md:py-4 bg-white rounded-lg shadow-sm">
                        <b className="relative text-xl font-semibold text-gray-800">
                            {event?.title}
                        </b>
                        <div className="relative text-sm p-2 font-light text-gray-600">
                            {truncatedDescription}
                        </div>
                    </div>
                    <div className="flex justify-end mt-2 md:mt-4">
                        <b className="relative text-lg font-medium text-green-700">
                            {formatCurrency(Number(event?.amount_person) || 0)}
                        </b>
                    </div>
                </div>
                <div className="self-end mt-2 md:mt-4">
                    <Footer handleCardClick={handleCardClick} participants={event?.event_participant || []} />
                </div>
            </div>
        </div>
    );
};

export default SearchEventCard;
