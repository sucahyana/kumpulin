import React from "react";
import { FaUser } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import CardFooterComponent from "../molecules/EventCardFooter.jsx";
import { useNavigate } from "react-router-dom";
import { trim } from "lodash/string.js";

const SearchEventCard = () => {
    // Data statis
    const event = {
        title: "Judul Acara",
        description: "Deskripsi acara ini adalah deskripsi acara yang sangat menarik.",
        event_media: [{ media_url: "https://picsum.photos/900" }],
        code_event: "ABCDE12345",
        event_participant: [], // Data peserta acara
        user: {
            name: "Pembuat Acara",
            profile_image: "https://picsum.photos/900",
        },
        category: "Kategori Acara",
        amount_person: 1000000, // Jumlah biaya acara dalam IDR
    };

    const navigate = useNavigate();

    const truncatedDescription = event.description.length > 100 ? `${event.description.substring(0, 100)}...` : event.description;

    const handleCardClick = () => {
        navigate(`/event/${event.code_event}`);
    };

    const renderThumbnailInfo = () => {
        const userName = event.user.name || "Unknown";

        return (
            <div className="flex flex-col mb-8 gap-2">
                <div className="font-medium text-lg text-gray-800">{`Pembuat Acara: ${userName}`}</div>
                <div className="font-normal text-lg text-blue-500">{trim(event.category)}</div>
            </div>
        );
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    return (
        <div className="relative rounded-xl bg-white w-full md:w-[540px] lg:w-[840px] flex flex-col md:flex-row items-center md:items-start justify-start text-left text-lg text-black shadow-xl mb-10 p-4">
            <div className="w-full md:w-[440px] h-[220px] md:h-full cursor-pointer hover:scale-105 delay-100 transition-all overflow-hidden rounded-lg shadow-lg">
                <div
                    className="w-full h-full bg-cover bg-center rounded-lg shadow-inner"
                    style={{
                        backgroundImage: `url(${event.event_media[0]?.media_url || "https://picsum.photos/900"})`,
                    }}
                    onClick={handleCardClick}
                >
                    {!event.event_media[0]?.media_url && (
                        <div className="animate-pulse w-full h-full bg-gray-300 rounded-lg"></div>
                    )}
                </div>
            </div>
            <div className="flex-1 flex flex-col p-8 gap-6 justify-between bg-gray-50 rounded-lg">
                <div>
                    <div className="flex flex-col items-start justify-start gap-2 mb-4">
                        {renderThumbnailInfo()}
                    </div>
                    <div className="flex items-center gap-5 text-info-500 mb-4">
                        <div className="flex flex-row items-center justify-start gap-4">
                            <img
                                className="w-16 h-16 rounded-full border-2 border-gray-300"
                                alt="Event creator"
                                src={event.user?.profile_image || "https://picsum.photos/900"}
                                loading="lazy"
                            />
                            <div className="flex flex-col">
                                <span className="opacity-70 font-medium text-lg">Pembuat Acara</span>
                                <div className="font-semibold text-gray-800 text-base">{event.user?.name || "Unknown"}</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-start gap-2 mt-6 border-dashed border-t-2 border-b-2 py-4 bg-white rounded-lg shadow-sm">
                        <b className="relative text-xl font-semibold text-gray-800">
                            {event.title}
                        </b>
                        <div className="relative text-base font-light text-gray-600">
                            {truncatedDescription}
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <b className="relative text-lg font-medium text-green-700">
                            {formatCurrency(event.amount_person)}
                        </b>
                    </div>
                </div>
                <div className="self-end mt-4">
                    <CardFooterComponent handleCardClick={handleCardClick} participants={event.event_participant} />
                </div>
            </div>
        </div>
    );
};

export default SearchEventCard;
