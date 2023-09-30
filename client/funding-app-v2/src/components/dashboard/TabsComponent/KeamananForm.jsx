import React, { useState, useEffect } from "react";

import { notifySuccess, notifyError, notifyLoading } from '../../toast.jsx';
import withUserData from '../../../utils/hoc/withUserData.jsx';
import { toast } from "react-hot-toast";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { ProgressSpinner } from "primereact/progressspinner";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { RiAlarmWarningFill } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { Skeleton } from "primereact/skeleton";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import {setUser} from "../../../store/actions/user.js";
import {changePassword} from "../../../services/apiService.jsx";

const KeamananForm = ({ userData }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        contact: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [showCancelConfirmDialog, setShowCancelConfirmDialog] = useState(false);
    const [showSaveConfirmDialog, setShowSaveConfirmDialog] = useState(false);

    const customMessage = (
        <div className="flex flex-col items-center">
            <RiAlarmWarningFill className="text-red-500 text-4xl mb-8"/>
            <span>Apakah Anda yakin ingin membatalkan perubahan?</span>
        </div>
    );

    const customSaveMessage = (
        <div className="flex flex-col items-center">
            <GiConfirmed className="text-green-500 text-4xl mb-8"/>
            <span>Apakah Anda yakin ingin menyimpan perubahan?</span>
        </div>
    );

    useEffect(() => {
        if (userData) {
            setFormData({
                contact: userData.contact || "",
                oldPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
        }
    }, [userData]);

    const validateForm = () => {
        if (!formData.oldPassword.trim()) {
            notifyError('Password lama tidak boleh kosong');
            return false;
        }
        if (formData.newPassword !== formData.confirmPassword) {
            notifyError('Password baru dan konfirmasi password harus sama');
            return false;
        }
        return true;
    };

    const handleFormSubmit = async (event) => {
        if (event) {
            event.preventDefault();
        }

        if (!validateForm()) return;

        const toastId = notifyLoading('Sedang memperbarui keamanan...');

        try {
            await changePassword({
                old_password: formData.oldPassword,
                new_password: formData.newPassword,
                new_password_confirmation: formData.confirmPassword
            });
            toast.dismiss(toastId);
            notifySuccess('Keamanan berhasil diperbarui');
        } catch (error) {
            console.error("Error updating security profile:", error);
            toast.dismiss(toastId);
            notifyError('Terjadi kesalahan saat memperbarui keamanan.');
        } finally {
            setLoading(false);
        }
    };



    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const showCancelConfirm = () => {
        setShowCancelConfirmDialog(true);
    }

    const hideCancelConfirm = () => {
        setShowCancelConfirmDialog(false);
    }

    const showSaveConfirm = () => {
        setShowSaveConfirmDialog(true);
    }

    const hideSaveConfirm = () => {
        setShowSaveConfirmDialog(false);
    }

    const onConfirmCancel = () => {
        if (userData) {
            setFormData({
                contact: userData.contact || "",
                oldPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
        }
        hideCancelConfirm();
    }

    const onConfirmSave = async () => {
        hideSaveConfirm();
        await handleFormSubmit();
    }

    return (
        <>
            {loading ? (
                <div className="p-d-flex p-ai-center p-jc-center">
                    <Skeleton shape="circle" size="2rem" className="p-mr-2"/>
                    <Skeleton shape="rectangle" size="15rem"/>
                </div>
            ) : (
                <form className="flex flex-col gap-6 text-gray-800 w-[665px]" onSubmit={handleFormSubmit}>

                    <div className="flex flex-col gap-2 w-[300px]">
                        <label htmlFor="oldPassword">
                            <span className="text-base font-medium text-blue-950">Password Lama</span>
                        </label>
                        <Password
                            id="oldPassword"
                            name="oldPassword"
                            value={formData.oldPassword}
                            onChange={handleInputChange}
                            className="border-2 border-gray-300 rounded p-2 bg-gray-50"
                            toggleMask feedback={false}
                        />
                    </div>

                    <div className="flex flex-col gap-2 w-[300px]">
                        <label htmlFor="newPassword">
                            <span className="text-base font-medium text-blue-950">Password Baru</span>
                        </label>
                        <Password
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            className="border-2 border-gray-300 rounded p-2 bg-gray-50"
                            toggleMask feedback={false}
                        />
                    </div>

                    <div className="flex flex-col gap-2 w-[300px]">
                        <label htmlFor="confirmPassword">
                            <span className="text-base font-medium text-blue-950">Konfirmasi Password Baru</span>
                        </label>
                        <Password
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="border-2 border-gray-300 rounded p-2 bg-gray-50"
                            toggleMask feedback={false}
                        />
                    </div>

                    <div className="flex flex-row gap-6 justify-end text-gray-100 mt-8">
                        <Button
                            type="button"
                            className="w-[200px] rounded-xl bg-blue-300 shadow-md py-3 px-6 flex flex-row items-center justify-center gap-2"
                            onClick={showCancelConfirm}
                        >
                            Batal
                        </Button>
                        <Button
                            type="button"
                            className="w-[200px]  rounded-xl bg-blue-600 shadow-md py-3 px-6 flex flex-row items-center justify-center gap-2"
                            onClick={showSaveConfirm}
                        >
                            {loading ? (
                                <ProgressSpinner style={{ width: '24px', height: '24px' }} strokeWidth="4"/>
                            ) : "Simpan"}
                        </Button>
                    </div>
                </form>
            )}

            <ConfirmDialog
                visible={showCancelConfirmDialog}
                onHide={hideCancelConfirm}
                message={customMessage}
                header="Konfirmasi"
                accept={onConfirmCancel}
                reject={hideCancelConfirm}
                acceptLabel="Ya"
                acceptClassName='p-button-danger'
                rejectLabel="Tidak"
                pt={{
                    headerTitle: {
                        className: 'text-blue-800 font-poppins  text-lg font-medium'
                    },
                    message: {
                        className: 'text-gray-800 text-base font-medium font-poppins text-center'
                    },
                    footer: {className: 'font-poppins text-center text-base font-medium'},
                    icon: {
                        className: 'justify-center'
                    },
                    content: {
                        className: 'flex flex-col items-center'
                    }
                }}
            />

            <ConfirmDialog
                visible={showSaveConfirmDialog}
                onHide={hideSaveConfirm}
                message={customSaveMessage}
                header="Konfirmasi"
                accept={onConfirmSave}
                reject={hideSaveConfirm}
                acceptLabel="Ya"
                acceptClassName='p-button-danger'
                rejectLabel="Tidak"
                pt={{
                    headerTitle: {
                        className: 'text-blue-800 font-poppins  text-lg font-medium'
                    },
                    message: {
                        className: 'text-gray-800 text-base font-medium font-poppins text-center'
                    },
                    footer: {className: 'font-poppins text-center text-base font-medium'},
                    icon: {
                        className: 'justify-center'
                    },
                    content: {
                        className: 'flex flex-col items-center'
                    }
                }}
            />
        </>
    );

};

export default withUserData(KeamananForm);
