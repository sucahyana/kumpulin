import React from "react";
import {useNavigate} from "react-router-dom";
import {FaRegMoneyBill1} from "react-icons/fa6";
import {Button} from "primereact/button";
import {formatCurrency} from "../../utils/currencyFormatter.js";

const SearchEventCard = ({event}) => {
    if (!event) return null;

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/event/${event.code_event}`);
    };

    return (
        <div className="flex flex-col justify-between md:justify-center  w-full sm:max-w-[calc(50%-4px)] xl:max-w-[calc(33%-20px)]
        2xl:max-w-[calc(25%-20px)]">
            <div
                className="bg-white bg-opacity-40 rounded-lg shadow hover:-translate-y-1 transition-all duration-300 border">
                <div className="relative">
                    <img
                        src={event?.event_media?.[0]?.media_url || "https://www.pngall.com/wp-content/uploads/2016/05/Pizza-Download-PNG.png"}
                        className="w-full h-[320px] bg-cover rounded-t-lg"
                        alt="Event"
                    />
                    <div className="p-4 flex justify-between items-center">
                        <div>
                            <p className="text-base font-medium">{event.title}</p>
                        </div>
                        <div className="flex items-center">
                            <FaRegMoneyBill1 className="text-green-500 text-2xl"/>
                            <p className="text-lg font-medium">
                                {event.amount_person ? `${formatCurrency(event.amount_person)}` : "null"}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-blue-400 to-green-100  p-4">
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
            </div>
        </div>
    );
};

export default SearchEventCard;
