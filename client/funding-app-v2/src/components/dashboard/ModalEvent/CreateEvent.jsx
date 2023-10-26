import React, { useRef, useState } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { MdArrowForward, MdClose } from 'react-icons/md';
import StepOneContent from './StepOneContent.jsx';
import StepTwoContent from './StepTwoContent.jsx';
import StepThreeContent from './StepThreeContent.jsx';
import {
    setCurrentStep,
    updateStepOne,
    updateStepTwo,
    updateStepThree,
    incrementStep,
} from '../../../store/actions/eventAction.js';
import { createEvent } from '../../../services/apiService.jsx';
import { notifyError, notifySuccess } from '../../toast.jsx';
import { Button } from 'primereact/button';

const CreateEvent = ({ isOpen, onRequestClose }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const eventState = useSelector((state) => state.event);
    const currentStep = eventState.currentStep;
    const stepOneRef = useRef(null);
    const stepTwoRef = useRef(null);
    const stepThreeRef = useRef(null);

    const handleNextStep = async () => {
        let stepData;
        setLoading(true);
        switch (currentStep) {
            case 1:
                stepData = stepOneRef.current.getData();
                dispatch(updateStepOne(stepData));
                dispatch(incrementStep());
                setLoading(false);
                break;
            case 2:
                stepData = stepTwoRef.current.getData();
                dispatch(updateStepTwo(stepData));
                dispatch(incrementStep());
                setLoading(false);
                break;
            case 3:
                const mediaData = stepThreeRef.current.getMedia();
                const eventData = {
                    ...eventState.stepOne,
                    ...eventState.stepTwo,
                    ...eventState.stepThree,
                    media: mediaData,
                };

                try {
                    await createEvent(eventData);
                    setLoading(false);
                    notifySuccess('Event Berhasil dibuat');
                    notifySuccess('Commitment adalah Salah satu kunci SUKSES');
                } catch (error) {
                    setLoading (false);
                    notifyError('Event gagal dibuat:', error);
                }

                onRequestClose();
                setLoading(false);
                break;

            default:
                break;
        }
    };

    const handleTabClick = (step) => {
        let currentData;
        switch (currentStep) {
            case 1:
                currentData = stepOneRef.current.getData();
                dispatch(updateStepOne(currentData));
                break;
            case 2:
                currentData = stepTwoRef.current.getData();
                dispatch(updateStepTwo(currentData));
                break;
            case 3:
                currentData = stepThreeRef.current.getMedia();
                dispatch(updateStepThree(currentData));
                break;
            default:
                break;
        }
        dispatch(setCurrentStep(step));
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Create Event Modal"
            overlayClassName="fixed inset-0 bg-blue-200 bg-opacity-20 flex items-center justify-center z-50"
            className="bg-white p-2 md:p-4 rounded-lg shadow flex flex-col w-screen sm:w-auto"
        >
            <div className="flex-1 p-1 md:p-4">
                <Button
                    className="p-2 rounded-lg bg-gray-200 border-none shadow hover:bg-red-300 transition-colors ml-auto"
                    onClick={onRequestClose}
                >
                    <MdClose className="w-5 h-5" />
                </Button>
            </div>
            <div className="p-2 md:p-4 flex flex-col items-center gap-2 md:gap-4 text-gray-900">
                <div className="flex flex-col justify-center items-center text-center">
                    <h1 className="text-lg md:text-2xl font-bold">Create Event</h1>
                    <p className="text-base md:text-lg font-medium text-gray-500">Start with Commitment!</p>
                </div>
                <div className="w-full flex justify-between text-center text-base font-semibold">
                    {[1, 2, 3].map((stepNumber) => (
                        <button
                            key={stepNumber}
                            className={`flex-1 p-2.5 ${
                                eventState.currentStep === stepNumber ? 'text-gray-800 border-b-2 border-green-500' : ''
                            }`}
                            onClick={() => handleTabClick(stepNumber)}
                        >
                            Step {stepNumber}
                        </button>
                    ))}
                </div>
                <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
                    <StepOneContent ref={stepOneRef} currentData={eventState.stepOne} />
                </div>
                <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
                    <StepTwoContent ref={stepTwoRef} currentData={eventState.stepTwo} />
                </div>
                <div style={{ display: currentStep === 3 ? 'block' : 'none' }}>
                    <StepThreeContent ref={stepThreeRef} currentData={eventState.stepThree} />
                </div>
                <button
                    className="rounded-md bg-info-500 py-3 px-6 flex items-center gap-2 text-white"
                    onClick={handleNextStep}
                >
                    {currentStep !== 3 ? (
                        <>
                            <span>Next Step</span>
                            <MdArrowForward />
                        </>
                    ) : (
                        'Submit'
                    )}
                </button>
            </div>
        </Modal>
    );
};

export default CreateEvent;
