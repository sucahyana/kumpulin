import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {updatePaymentStatus} from "../../../../services/apiService.jsx";
import {notifySuccess, notifyError, stopLoading, notifyLoading} from "../../../toast.jsx";

const ManageModal = ({isOpen, onRequestClose, onManage, eventCode, participantId}) => {
    const [paymentAmount, setPaymentAmount] = useState('');
    const [description, setDescription] = useState('');
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const checkValidity = () => {
            setIsValid(
                !isNaN(parseFloat(paymentAmount)) && isFinite(paymentAmount) && description.trim() !== ''
            );
        };
        checkValidity();
    }, [paymentAmount, description]);

    const handleManage = async () => {
        notifyLoading("Mengupdate status pembayaran...");
        try {
            if (participantId) {
                const response = await updatePaymentStatus(eventCode, participantId, paymentAmount, description);

                if (response.status === 200) {
                    notifySuccess("Peserta berhasil disetujui!");
                    onRequestClose();
                } else if (response.data && response.data.message) {
                    notifyError(response.data.message);
                } else {
                    notifyError("Terjadi kesalahan saat memproses data peserta.");
                }
            } else {
                console.log('participantId is null or undefined');
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
            onManage();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Manage Participant"
            overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            className="rounded-lg shadow-lg bg-white w-96 mx-auto p-6"
        >
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 items-center text-center">
                    <h1 className="text-2xl font-semibold text-gray-800">Input Pembayaran</h1>
                    <p className="text-sm text-gray-500">
                        Anda bisa menambahkan dan mengurangkan pembayaran di sini
                    </p>
                </div>

                <div className="p-field flex flex-col gap-2">
                    <label htmlFor="payment_amount" className="font-medium text-gray-600">
                        Input Jumlah
                    </label>
                    <InputText
                        id="payment_amount"
                        type="number"

                        className="p-inputtext-sm p-d-block w-full rounded-md"
                        placeholder="Boleh bilangan positif dan negatif"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                    />
                </div>

                <div className="p-field flex flex-col gap-2">
                    <label htmlFor="description" className="font-medium text-gray-600">
                        Alasan
                    </label>
                    <InputText
                        id="description"
                        className="p-inputtext-sm p-d-block w-full rounded-md"
                        placeholder="Alasan mengubah uang masuk"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="flex justify-between gap-4">
                    <Button
                        label="Save Changes"
                        icon="pi pi-check"

                        onClick={handleManage}
                        className={`p-button-info rounded p-button-sm font-semibold ${!isValid && 'p-disabled'}`}
                        disabled={!isValid}
                    />
                    <Button
                        label="Cancel"
                        icon="pi pi-times"
                        onClick={onRequestClose}
                        className="p-button-danger rounded p-button-sm font-semibold"
                    />
                </div>
            </div>
        </Modal>
    );
};

export default ManageModal;
