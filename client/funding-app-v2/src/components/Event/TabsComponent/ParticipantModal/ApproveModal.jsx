import React from 'react';
import Modal from 'react-modal';
import { notifySuccess, notifyError, stopLoading, notifyLoading } from "../../../toast.jsx";
import { approveEventParticipant } from "../../../../services/apiService.jsx";

const ApproveModal = ({ isOpen, onRequestClose, participantId, eventCode ,onApprove}) => {
    const modalStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            border: 'none',
            borderRadius: '0.5rem',
            padding: '0'
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }
    };

    const handleApprove = async () => {
        notifyLoading("Memproses...");

        try {
            if (participantId) {
                const response = await approveEventParticipant(eventCode, participantId);

                if (response.status === 200) {
                    notifySuccess("Peserta berhasil disetujui!");
                    onRequestClose();
                } else if (response.data && response.data.message) {
                    notifyError(response.data.message);
                } else {
                    notifyError("Terjadi kesalahan saat memproses data peserta.");
                }
            } else {
                notifyError("ID Peserta tidak valid.");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                notifyError(error.response.data.message);
            } else {
                notifyError("Terjadi kesalahan internal. Silakan coba lagi.");
            }
        } finally {
            stopLoading();
            onApprove();
        }
    };






    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Approve Participant"
            style={modalStyles}
        >
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Setujui Peserta</h2>
                <p className="mb-6 text-center">Apakah Anda yakin ingin menyetujui peserta ini?</p>
                <div className="flex justify-between w-full">
                    <button onClick={handleApprove} className="bg-blue-500 text-white px-4 py-2 rounded">Setujui</button>
                    <button onClick={onRequestClose} className="bg-gray-300 text-black px-4 py-2 rounded">Batal</button>
                </div>
            </div>
        </Modal>
    );
};

export default ApproveModal;
