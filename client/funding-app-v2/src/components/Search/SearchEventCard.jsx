import React from "react";
import { useNavigate } from "react-router-dom";
import { trim } from "lodash/string.js";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { Button } from "primereact/button";

const SearchEventCard = ({ event }) => {
    if (!event) return null;

    const navigate = useNavigate();

    const truncatedDescription =
        event?.description?.length > 100
            ? `${event.description.substring(0, 100)}...`
            : event?.description || "";

    const handleCardClick = () => {
        navigate(`/event/${event.code_event}`);
    };

    return (
        <div className="flex flex-col justify-start bg-white bg-opacity-40 md:justify-center relative w-full sm:max-w-[calc(50%-20px)] xl:max-w-[calc(33%-20px)] 2xl:max-w-[calc(25%-20px)] md:p-4 rounded-lg shadow hover:-translate-y-1 transition-all duration-300 border">

            <div className="w-full h-full relative">
                <div className="pb-24 rounded-lg h-full mb-6">
                    <img
                        src={event?.event_media?.[0]?.media_url || "https://www.pngall.com/wp-content/uploads/2016/05/Pizza-Download-PNG.png"}
                        className="w-full h-64"
                        alt="Event"
                    />

                    <div className="flex flex-col sm:flex-row justify-between p-4">
                        <div className="flex gap-2">
                            <p className="text-base font-medium">{event.title}</p>
                        </div>
                        <div className="">
                            <FaRegMoneyBill1 className="text-green-500 text-2xl" />
                            <p className="text-lg font-medium">
                                {event.amount_person ? `RM ${event.amount_person}` : "RM 0.00"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full">
                    <div className="flex flex-col sm:flex-row justify-between">
                        <div className="bg-blue-200 rounded-lg w-full p-4">
                            <p className="text-white text-lg font-semibold">Yang sudah ikut</p>
                            <div className="flex space-x-2">
                                {event.event_participant.map((participant) => (
                                    <img
                                        src={participant.user.profile_image || "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
                                        className="w-8 h-8 rounded-full border-2 border-white"
                                        alt={participant.user.name}
                                        key={participant.id}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="w-full h-fit flex justify-end">
                            <Button
                                className="bg-gradient-to-b from-blue-100 to-blue-200 text-white font-bold py-4 px-4 rounded-lg uppercase text-sm shadow-xl">
                                Lihat
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SearchEventCard;
