import React from 'react';
import PropTypes from 'prop-types';
import {ProgressBar} from 'primereact/progressbar';
import {Button} from 'primereact/button';
import {useNavigate} from 'react-router-dom';
import {format} from "date-fns";
import Loader from "../Loader.jsx";

const CardFeed = ({event, userData}) => {
    const navigate = useNavigate();

    if (!event || !userData) {
        return <Loader/>;
    }

    const {
        event_participant: participants,
        amount_person,
        max_participant,
        title,
        category,
        event_media,
        end_date
    } = event;

    const userParticipant = participants.find(participant => participant.id_user === userData.id);
    const paidParticipantsCount = participants.filter(participant => participant.payment_amount === amount_person).length;

    const paymentPercentage = () => (
        userParticipant ? Math.round((userParticipant.payment_amount / amount_person) * 100) : 0
    );

    const handleClick = () => {
        navigate(`/event/${event.code_event}`);
    };

    return (
        <div
            className="flex flex-col justify-around max-w-full lg:w-[calc(50%-8px)] xl:w-[calc(33%-8px)]  sm:mx-8 lg:mx-0 w-screen md:w-fit bg-white shadow-md rounded-lg p-6 transform transition-transform duration-500 ease-in-out hover:shadow-xl hover:-translate-y-1">
            <section className="flex flex-col justify-between">
                <div className="flex flex-row justify-between items-center space-x-4">
                    <EventImage eventMedia={event_media[0]} title={title}/>
                    <EventDetails title={title} category={category}/>
                </div>
                <FollowersProgressBar participants={participants} maxParticipants={max_participant}/>
            </section>
            <section className="flex flex-col justify-between">
                <div className="grid grid-cols-2  gap-4 mt-4">
                    <PaymentStatus userParticipant={userParticipant} paymentPercentage={paymentPercentage}
                                   amount={amount_person}/>
                    <PaidParticipantsCount paidParticipantsCount={paidParticipantsCount}/>
                    <EventDueDate end_date={end_date}/>
                </div>

                <MoreButton handleClick={handleClick}/>
            </section>
        </div>
    );
};

CardFeed.propTypes = {
    event: PropTypes.shape({
        event_participant: PropTypes.array.isRequired,
        amount_person: PropTypes.number.isRequired,
        max_participant: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        event_media: PropTypes.arrayOf(PropTypes.shape({
            media_url: PropTypes.string.isRequired
        })).isRequired,
        end_date: PropTypes.string.isRequired
    }).isRequired,
    userData: PropTypes.shape({
        id: PropTypes.number.isRequired
    }).isRequired
};

const EventImage = ({eventMedia, title}) => (
    <img
        src={eventMedia.media_url}
        alt={title}
        className="w-16 h-16 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
    />
);

const EventDetails = ({title, category}) => (
    <div className="flex flex-col text-center sm:text-right space-y-1">
        <h5 className="text-lg font-semibold text-gray-800 hover:text-gray-900 transition-colors duration-300">
            {title}
        </h5>
        <h6 className="text-base font-normal text-gray-600 hover:text-gray-700 transition-colors duration-300">
            {category}
        </h6>
    </div>
);

const FollowersProgressBar = ({participants, maxParticipants}) => (
    <div className="flex flex-col space-y-2">
        <h5 className="text-lg font-semibold text-gray-700">
            Pengikut Acara:
            <span className="ml-2 text-gray-900">
                {participants.length} / <span className="text-blue-500">{maxParticipants}</span>
            </span>
        </h5>
        <ProgressBar
            value={Math.round((participants.length / maxParticipants) * 100)}
            className="shadow-md rounded hover:shadow-lg transition-shadow duration-300 font-poppins"
        />
    </div>
);

const PaymentStatus = ({userParticipant, paymentPercentage, amount}) => (
    <div
        className="flex flex-col space-y-2 bg-gradient-to-r from-green-200 to-green-100 justify-center shadow-lg hover:shadow-xl transition-all duration-300 p-4 rounded-lg ">
        {userParticipant ? (
            <>
                <h5 className="text-sm font-medium text-green-700 text-center">
                    Kamu sudah bayar
                </h5>
                <h5 className="text-sm font-semibold text-green-800 -mt-2 mx-auto">
                    {userParticipant.payment_amount / 1000}K
                    <span className="ml-1 text-green-700 font-medium">Dari </span>
                    {amount / 1000}K
                </h5>
                <ProgressBar
                    value={paymentPercentage()}
                    className="shadow-md rounded hover:shadow-lg transition-shadow duration-300 font-poppins"
                />

            </>
        ) : (
            <h5 className="text-sm font-medium text-blue-800">Anda belum membayar</h5>
        )}
    </div>
);

const PaidParticipantsCount = ({paidParticipantsCount}) => (
    <div
        className="flex items-center justify-center bg-gradient-to-r from-blue-200 to-blue-100 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-4 ">
        <span className="text-sm font-medium text-blue-800 text-center">
            <span className="text-gray-900">
                {paidParticipantsCount}
            </span> Orang Sudah Lunas
        </span>
    </div>
);

const EventDueDate = ({end_date}) => (
    <div
        className="flex items-center justify-center col-span-2 bg-gradient-to-r from-yellow-200 to-yellow-100 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-4">
        <span className="text-sm font-semibold text-yellow-700 text-center">
            Batas Acara harus lunas {format(new Date(end_date), 'dd MMMM yyyy')}
        </span>
    </div>
);

const MoreButton = ({handleClick}) => (
    <Button
        onClick={handleClick}
        label="Lihat"
        className="font-poppins text-white bg-gradient-to-r from-blue-500 to-blue-400 border-none font-medium mt-4 w-full rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500 transition duration-300 transform "
    />
);

export default CardFeed;
