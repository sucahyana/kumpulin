import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {
    notifyError,
    notifyLoading,
    notifySuccess,
    stopLoading,
} from '../../toast.jsx';
import { registerWithCode } from '../../../services/apiService.jsx';

const FormCode = ({ isOpen, onRequestClose }) => {
    const [description, setDescription] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [eventCode, setEventCode] = useState('');

    useEffect(() => {
        const checkValidity = () => {
            setIsValid(description.trim() !== '' && eventCode.trim() !== '');
        };
        checkValidity();
    }, [eventCode, description]);

    const handleManage = async () => {
        if (!isValid) {
            notifyError('Harap isi kedua input dengan benar.');
            return;
        }

        notifyLoading('Sedang Mengirim Permintaan...');
        try {
            const response = await registerWithCode({ code: eventCode, description });

            if (response.status === 200) {
                notifySuccess('Peserta berhasil disetujui!');
                onRequestClose();
            } else if (response.data && response.data.message) {
                notifyError(response.data.message);
            } else {
                notifyError('Terjadi kesalahan saat memproses data peserta.');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                notifyError(error.response.data.message);
            } else {
                notifyError('Terjadi kesalahan internal. Silakan coba lagi.');
            }
        } finally {
            stopLoading();
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
                    <h1 className="text-2xl font-semibold text-gray-800">Request Bergabung</h1>
                    <p className="text-sm text-gray-500">
                        Silahkan kirim untuk request Bergabung ke event
                    </p>
                </div>

                <div className="p-field flex flex-col gap-2">
                    <label htmlFor="eventCode" className="font-medium text-gray-600">
                        Code Acara
                    </label>
                    <InputText
                        id="eventCode"
                        type="text"
                        className="p-inputtext-sm p-d-block w-full rounded-md"
                        placeholder="Masukan code yang didapatkan"
                        value={eventCode}
                        onChange={(e) => setEventCode(e.target.value)}
                    />
                </div>

                <div className="p-field flex flex-col gap-2">
                    <label htmlFor="description" className="font-medium text-gray-600">
                        Alasan
                    </label>
                    <InputText
                        id="description"
                        className="p-inputtext-sm p-d-block w-full rounded-md"
                        placeholder="Alasan ingin Bergabung"
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

export default FormCode;
