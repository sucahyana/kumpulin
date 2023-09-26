import React, {useState, useEffect} from "react";
import {ProgressSpinner} from "primereact/progressspinner";
import {toast} from "react-hot-toast";
import {ConfirmDialog} from "primereact/confirmdialog";
import {updateContactProfile} from "../../../services/apiService.jsx"; // Import your API function
import {RiAlarmWarningFill} from "react-icons/ri";
import {GiConfirmed} from "react-icons/gi";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../../store/actions/user.js";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";

const ContactForm = ({}) => {
    const dispatch = useDispatch();
    const userEvents = useSelector(state => state.user?.data?.UserEvents);
    const userData = useSelector(state => state.user?.data?.user);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        instagram: "",
        facebook: "",
        other: {
            email: "",
            telpon: "",


            kataKunci: "",
            isi: "",
        },
    });

    const [showCancelConfirmDialog, setShowCancelConfirmDialog] = useState(false);
    const [showSaveConfirmDialog, setShowSaveConfirmDialog] = useState(false);

    const customMessage = (
        <div className="flex flex-col items-center">
            <RiAlarmWarningFill className="text-red-500 text-4xl mb-8" />
            <span>Apakah Anda yakin ingin membatalkan perubahan?</span>
        </div>
    );

    const customSaveMessage = (
        <div className="flex flex-col items-center">
            <GiConfirmed className="text-green-500 text-4xl mb-8" />
            <span>Apakah Anda yakin ingin menyimpan perubahan?</span>
        </div>
    );

    useEffect(() => {
        if (userData) {
            setFormData({
                ...formData,
                instagram: userData.contacts.find((c) => c.type === "instagram")?.value || "",
                facebook: userData.contacts.find((c) => c.type === "facebook")?.value || "",
                other: {
                    ...formData.other,
                    email: userData.email || "",
                    telpon: userData.telphone || "",
                },
            });
        }
    }, [userData]);

    // const validateForm = () => {
    //     if (!formData.other.email.trim()) {
    //         toast.error("Email tidak boleh kosong");
    //         return false;
    //     }
    //     // Add more validation checks as needed
    //     return true;
    // };

    const handleFormSubmit = async () => {
        // if (!validateForm()) return;

        const toastId = toast.loading("Sedang memperbarui informasi kontak...");

        try {
            const requestData = {};

            // Construct the request data with non-empty values
            if (formData.instagram.trim() !== "") {
                requestData.instagram = formData.instagram;
            }
            if (formData.facebook.trim() !== "") {
                requestData.facebook = formData.facebook;
            }
            if (formData.other && formData.other.email.trim() !== "") { // Add a check for formData.other
                requestData.email = formData.other.email;
            }
            if (formData.other && formData.other.telpon.trim() !== "") { // Add a check for formData.other
                requestData.telpon = formData.other.telpon;
            }





            // Add logic to handle other values
            for (const key in formData.other) {
                const value = formData.other[key].trim();
                if (value !== "") {
                    requestData[key] = value;
                }
            }

            await updateContactProfile(requestData);
            toast.dismiss(toastId);
            toast.success("Informasi kontak berhasil diperbarui");

            // Update the user data in the Redux store
            // const updatedUserData = {
            //     ...userData,
            //     instagram: requestData.instagram || userData.instagram,
            //     facebook: requestData.facebook || userData.facebook,
            //     other: {
            //         ...userData.other,
            //         email: requestData.email || userData.other.email,
            //         telpon: requestData.telpon || userData.other.telpon,
            //
            //     },
            // };
            // dispatch(setUser(updatedUserData));
        } catch (error) {
            console.error("Error updating contact profile:", error);
            toast.dismiss(toastId);
            toast.error("Terjadi kesalahan saat memperbarui informasi kontak");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name.startsWith("other.")) {
            setFormData((prevData) => ({
                ...prevData,
                other: {
                    ...prevData.other,
                    [name.split(".")[1]]: value,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };
    const handleAddKeyword = () => {
        setFormData((prevData) => ({
            ...prevData,
            other: {
                ...prevData.other,
                [formData.other.kataKunci]: formData.other.isi,
            },
        }));
    };



    const showCancelConfirm = () => {
        setShowCancelConfirmDialog(true);
    };

    const hideCancelConfirm = () => {
        setShowCancelConfirmDialog(false);
    };

    const showSaveConfirm = () => {
        setShowSaveConfirmDialog(true);
    };

    const hideSaveConfirm = () => {
        setShowSaveConfirmDialog(false);
    };

    const customStyle = {
        headerTitle: {
            className: 'text-blue-800 font-poppins  text-lg font-medium'
        },
        message: {
            className: 'text-gray-800 text-base font-medium font-poppins text-center'
        },
        footer: {
            className: 'font-poppins text-center text-base font-medium'
        },
        icon: {
            className: 'justify-center'
        },
        content: {
            className: 'flex flex-col items-center'
        }
    };


    const onConfirmCancel = () => {
        if (userData) {
            setFormData({
                ...formData,
                instagram: userData.instagram || "",
                facebook: userData.facebook || "",
                other: {
                    ...formData.other,
                    email: userData.email || "",
                    telpon: userData.telpon || "",
                },
            });
        }
        hideCancelConfirm();
    };

    const onConfirmSave = async () => {
        hideSaveConfirm();
        await handleFormSubmit();
    };
    return (
        <>
            <form className="flex flex-col gap-6 text-gray-800 w-[665px]">
                {/* Email and Telpon fields */}
                <div className="flex flex-row flex-wrap justify-between">
                    <div className="flex flex-col gap-2 w-[300px]">
                        <label className="text-base font-medium text-blue-950">Email</label>
                        <InputText
                            name="other.email"
                            type="email"
                            value={formData.other.email}
                            onChange={handleInputChange}
                            className="border-2 border-gray-300 rounded p-2 bg-gray-50"
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-[300px]">
                        <label className="text-base font-medium text-blue-950">Telpon</label>
                        <InputText
                            name="other.telpon"
                            type="text"
                            value={formData.other.telpon}
                            onChange={handleInputChange}
                            className="border-2 border-gray-300 rounded p-2 bg-gray-50"
                        />
                    </div>
                </div>

                {/* Instagram and Facebook fields */}
                <hr className="h-0.5"/>
                <div className="flex flex-row flex-wrap gap-6 justify-between">
                    <div className="flex flex-col gap-2 w-[300px]">
                        <label className="text-base font-medium text-blue-950">Instagram</label>
                        <InputText
                            name="instagram"
                            type="text"
                            value={formData.instagram}
                            onChange={handleInputChange}
                            className="border-2 border-gray-300 rounded p-2 bg-gray-50"
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-[300px]">
                        <label className="text-base font-medium text-blue-950">Facebook</label>
                        <InputText
                            name="facebook"
                            type="text"
                            value={formData.facebook}
                            onChange={handleInputChange}
                            className="border-2 border-gray-300 rounded p-2 bg-gray-50"
                        />
                    </div>
                </div>




                {/* Kata Kunci and Isi fields */}
                <hr className="h-0.5"/>
                <div className="flex flex-row flex-wrap gap-6 justify-between">
                    <div className="flex flex-col gap-2 w-[300px]">
                        <label className="text-base font-medium text-blue-950">Kata Kunci</label>
                        <InputText
                            name="kataKunci"
                            type="text"
                            value={formData.kataKunci}
                            onChange={handleInputChange}
                            className="border-2 border-gray-300 rounded p-2 bg-gray-50"
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-[300px]">
                        <label className="text-base font-medium text-blue-950">Isi</label>
                        <InputText
                            name="isi"
                            type="text"
                            value={formData.isi}
                            onChange={handleInputChange}
                            className="border-2 border-gray-300 rounded p-2 bg-gray-50"
                        />
                    </div>
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
                            <ProgressSpinner style={{width: "24px", height: "24px"}} strokeWidth="4"/>
                        ) : (
                            "Simpan"
                        )}
                    </Button>
                </div>
            </form>

            {/* ConfirmDialog for cancel */}
            <ConfirmDialog
                visible={showCancelConfirmDialog}
                onHide={hideCancelConfirm}
                message={customMessage}
                header="Konfirmasi"
                accept={onConfirmCancel}
                reject={hideCancelConfirm}
                acceptLabel="Ya"
                acceptClassName="p-button-danger"
                rejectLabel="Tidak"
                pt={customStyle}
            />

            {/* ConfirmDialog for save */}
            <ConfirmDialog
                visible={showSaveConfirmDialog}
                onHide={hideSaveConfirm}
                message={customSaveMessage}
                header="Konfirmasi"
                accept={onConfirmSave}
                reject={hideSaveConfirm}
                acceptLabel="Ya"
                acceptClassName="p-button-danger"
                rejectLabel="Tidak"
                pt={customStyle}
            />
        </>
    );
};

export default ContactForm;

