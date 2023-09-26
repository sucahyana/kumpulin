import React, {useState, useEffect} from "react";
import {updateUserBasicProfile} from "../../../services/apiService.jsx";
import {notifySuccess, notifyError, notifyLoading} from '../../toast.jsx';
import withUserData from '../../../utils/hoc/withUserData.jsx';
import {toast} from "react-hot-toast";
import {ConfirmDialog} from 'primereact/confirmdialog';
import {ProgressSpinner} from "primereact/progressspinner";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {RiAlarmWarningFill} from "react-icons/ri";
import {GiConfirmed} from "react-icons/gi";
import {format} from 'date-fns';
import {setUser} from "../../../store/actions/user.js";
import {useDispatch} from "react-redux";
import {Skeleton} from "primereact/skeleton";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";


const BasicForm = ({userData}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        birth_date: "",
        birth_place: "",
        gender: "",
        address: "",
        bio: "",
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
                name: userData.name || "",
                birth_date: format(new Date(userData.birth_date), 'yyyy-MM-dd') || "",
                birth_place: userData.birth_place || "",
                gender: userData.gender || "",
                address: userData.address || "",
                bio: userData.bio || "",
            });
        }
    }, [userData]);
    const validateForm = () => {
        if (!formData.name.trim()) {
            notifyError('Nama tidak boleh kosong');
            return false;
        }
        if (!formData.gender) {
            notifyError('Jenis kelamin harus dipilih');
            return false;
        }
        return true;
    };
    const handleFormSubmit = async (event) => {
        if (event) {
            event.preventDefault();
        }

        if (!validateForm()) return;

        const toastId = notifyLoading('Sedang memperbarui profil...');

        try {
            await updateUserBasicProfile(formData);
            toast.dismiss(toastId);
            notifySuccess('Profil berhasil diperbarui');

            dispatch(setUser({formData}));


        } catch (error) {
            console.error("Error updating basic profile:", error);
            toast.dismiss(toastId);
            notifyError('Tidak ada data yang berubah Atau Terjadi Kesalahan');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;
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
                name: userData.name || "",
                birth_date: format(new Date(userData.birth_date), 'yyyy-MM-dd') || "",
                birth_place: userData.birth_place || "",
                gender: userData.gender || "",
                address: userData.address || "",
                bio: userData.bio || "",
            });
        }
        hideCancelConfirm();
    }

    const onConfirmSave = async () => {
        hideSaveConfirm();
        await handleFormSubmit();
    }


    return (
        <>{loading ? (
            <div className="p-d-flex p-ai-center p-jc-center">
                <Skeleton shape="circle" size="2rem" className="p-mr-2"/>
                <Skeleton shape="rectangle" size="15rem"/>
            </div>
        ) : (
            <form className="flex flex-col gap-6 text-gray-800 w-[665px]" onSubmit={handleFormSubmit}>
                <div className="flex flex-row flex-wrap justify-between">
                    <div className="flex flex-col gap-2 w-[300px]">
                        <label htmlFor="name">
                    <span className="text-base font-medium text-blue-950">
                        Nama Lengkap
                    </span>
                        </label>
                        <InputText
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="border-2 border-gray-300 rounded p-2 bg-gray-50"
                            placeholder={userData?.name || ""}
                        />
                    </div>
                </div>

                <div className="flex flex-row flex-wrap justify-between">
                    <div className="flex flex-col gap-2 w-[192px]">
                        <label htmlFor="birth_date">
                        <span className="text-base font-medium text-blue-950">
                        Tanggal Lahir
                        </span>
                        </label>
                        <input
                            id="birth_date"
                            name="birth_date"
                            type="date"
                            value={formData.birth_date}
                            onChange={handleInputChange}
                            className="border-2 border-gray-300 rounded p-2 bg-gray-50"
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-[192px]">
                        <label htmlFor="birth_place">
                    <span className="text-base font-medium text-blue-950">
                        Tempat Lahir
                    </span>
                        </label>
                        <InputText
                            id="birth_place"
                            name="birth_place"
                            type="text"
                            value={formData.birth_place}
                            onChange={handleInputChange}
                            className="border-2 border-gray-300 rounded p-2 bg-gray-50"
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-[192px]">
                        <label htmlFor="gender">
                    <span className="text-base font-medium text-blue-950">
                        Jenis Kelamin
                    </span>
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="border-2 border-gray-300 rounded p-2 bg-gray-50"
                        >
                            <option value="">Pilih Jenis Kelamin</option>
                            <option value="male">Laki-Laki</option>
                            <option value="female">Perempuan</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="address">
                <span className="text-base font-medium text-blue-950">
                    Alamat
                </span>
                    </label>
                    <InputTextarea
                        id="address"
                        name="address"
                        rows="4"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="border-2 border-gray-300 rounded p-2 bg-gray-50"
                    ></InputTextarea>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="bio">
                <span className="text-base font-medium text-blue-950">
                    Bio
                </span>
                    </label>
                    <InputTextarea
                        id="bio"
                        name="bio"
                        rows="4"
                        value={formData.bio}
                        onChange={handleInputChange}
                        className="border-2 border-gray-300 rounded p-2 bg-gray-50"
                    ></InputTextarea>
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
                            <ProgressSpinner style={{width: '24px', height: '24px'}} strokeWidth="4"/>
                        ) : "Simpan"}
                    </Button>
                </div>
            </form>)}
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
export default withUserData(BasicForm);

