import React from "react";
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';

const ParticipantImages = ({ participants }) => {
    const totalParticipants = participants.length;
    const displayedParticipants = totalParticipants > 4 ? 4 : totalParticipants;
    const additionalParticipants = totalParticipants - displayedParticipants;

    return (
        <div className="flex flex-row items-center justify-start w-full md:w-auto mb-2 md:mb-0">
            {participants.slice(0, displayedParticipants).map((participant) => {
                const profileImage = participant?.user?.profile_image || "/path/to/your/local/fallback/image.jpg";
                return (
                    <img
                        key={participant.id || participant.user.id}
                        className={`rounded-full w-12 h-12 object-cover -ml-4 border-4 border-blue-200`}
                        alt="Participant"
                        src={profileImage}
                    />
                );
            })}
            {additionalParticipants > 0 && (
                <div className="rounded-full w-24 h-12 flex items-center justify-center bg-gray-500 text-white font-medium -ml-2 border-4 border-green-200">
                    +{additionalParticipants}
                </div>
            )}
        </div>
    );
};

const EventCardFooter = ({ handleCardClick, participants }) => {
    return (
        <div className="w-full md:w-[357px] h-auto md:h-[76px] flex flex-col md:flex-row py-[25px] box-border items-center justify-end text-left text-sm text-white font-body-body1">
            <ParticipantImages participants={participants} />
            <Button
                onClick={handleCardClick}
                outlined={false}
                className="w-full md:w-[250px] h-[46px] p-4 rounded-md bg-blue-200 shadow-lg overflow-hidden border-none font-poppins text-base text-info-500 font-medium flex items-center justify-center">
                Lihat Lengkap
            </Button>
        </div>
    );
};

EventCardFooter.propTypes = {
    handleCardClick: PropTypes.func.isRequired,
    participants: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default EventCardFooter;
