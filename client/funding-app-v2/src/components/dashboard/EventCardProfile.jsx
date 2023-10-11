import React from "react";
import PropTypes from 'prop-types';
import { FaUser } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import CardFooterComponent from "../molecules/EventCardFooter.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { trim } from "lodash/string.js";

const EventCardProfile = ({ event, userData }) => {
    const {
        title,
        description,
        event_media,
        code_event,
        event_participant,
        user,
        category,
        amount_person,
    } = event;
    const navigate = useNavigate();
    const truncatedDescription = description.length > 100 ? `${description.substring(0, 100)}...` : description;
    const currentUser = useSelector(state => state.user?.data?.user);
    const isCurrentUserParticipant = currentUser && userData.id === currentUser.id;

    const handleCardClick = () => {
        navigate(`/event/${code_event}`);
    };

    const renderThumbnailInfo = () => {
        const userName = user.name || "Unknown";
        const userRole = isCurrentUserParticipant ? "Yang Kamu Ikutin Acaranya Loh!" : `Yang Acaranya di Ikuti Sama si ${userName}`;

        return (
            <div className="flex flex-col mb-8 gap-2">
                <div className="font-medium text-lg text-gray-800">{userRole}</div>
                <div className="font-normal text-lg text-blue-500">{trim(category)}</div>
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
        <div className="relative rounded-xl bg-white w-full  xl:w-[840px] flex flex-col xl:flex-row items-center xl:items-start justify-start text-left text-lg text-black shadow-xl mb-10 p-4">
            <div className="w-full xl:w-[440px] h-[220px] xl:h-full cursor-pointer hover:scale-105 delay-100 transition-all overflow-hidden rounded-lg shadow-lg">
                <div
                    className="w-full h-full bg-cover bg-center rounded-lg shadow-inner"
                    style={{
                        backgroundImage: `url(${event_media[0]?.media_url || "https://picsum.photos/900"})`,
                    }}
                    onClick={handleCardClick}
                >
                    {!event_media[0]?.media_url && (
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
                                src={user?.profile_image || "https://picsum.photos/900"}
                                loading="lazy"
                            />
                            <div className="flex flex-col">
                                <span className="opacity-70 font-medium text-lg">Pembuat Acara</span>
                                <div className="font-semibold text-gray-800 text-base">{user?.name || "Unknown"}</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start p-2 justify-start gap-2 mt-6 border-dashed border-t-2 border-b-2 py-4 bg-white rounded-lg shadow-sm">
                        <b className="relative text-xl font-semibold text-gray-800">
                            {title}
                        </b>
                        <div className="relative p-2 text-sm font-light text-gray-600">
                            {truncatedDescription}
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <b className="relative text-lg font-medium text-green-700">
                            {formatCurrency(amount_person)}
                        </b>
                    </div>
                </div>
                <div className="self-end mt-4">
                    <CardFooterComponent handleCardClick={handleCardClick} participants={event_participant} />
                </div>
            </div>
        </div>
    );
};

EventCardProfile.propTypes = {
    event: PropTypes.object.isRequired,
    userData: PropTypes.object.isRequired,
};

export default EventCardProfile;
