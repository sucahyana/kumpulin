import React, { useState, useCallback } from 'react';
import { RiDragDropLine } from 'react-icons/ri';
import ModalPhoto from './ModalPhoto.jsx';
import getCroppedImg from './getCroppedImg.jsx';
import { uploadProfileCover, uploadProfilePhoto } from '../../../services/apiService.jsx';
import { ProgressSpinner } from 'primereact/progressspinner';
import { toast } from 'react-hot-toast';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { GiConfirmed } from 'react-icons/gi';
import {notifyError, notifySuccess} from "../../toast.jsx";
import {Button} from "primereact/button";

const PhotoForm = () => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showSaveConfirmDialog, setShowSaveConfirmDialog] = useState(false);
    const [croppedImage, setCroppedImage] = useState(null);
    const tabOptions = ['photo', 'cover'];
    const [activeTab, setActiveTab] = useState('photo');
    const showSaveConfirm = useCallback(() => {
        setShowSaveConfirmDialog(true);
    }, []);

    const hideSaveConfirm = useCallback(() => {
        setShowSaveConfirmDialog(false);
    }, []);

    const customSaveMessage = (
        <div className="flex flex-col items-center">
            <GiConfirmed className="text-green-500 text-4xl mb-8" />
            <span>Apakah Anda yakin ingin menyimpan perubahan?</span>
        </div>
    );

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
    }, []);

    const handleFileChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            const blobUrl = URL.createObjectURL(file);
            setUploadedImage(blobUrl);
            setShowModal(true);
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length) {
            const blobUrl = URL.createObjectURL(files[0]);
            setUploadedImage(blobUrl);
            setShowModal(true);
        }
    }, []);

    const handleCropComplete = useCallback(async (croppedArea, croppedAreaPixels) => {
        try {
            if (!uploadedImage) {
                notifyError('Anda harus memilih gambar terlebih dahulu.');
                return;
            }

            const croppedImageBase64 = await getCroppedImg(uploadedImage, croppedAreaPixels);
            setCroppedImage(croppedImageBase64);
            setCroppedAreaPixels(croppedAreaPixels);
        } catch (error) {
            console.error('Error cropping image:', error);
            notifyError('Terjadi kesalahan saat memotong gambar');
        }
    }, [uploadedImage]);

    const handleConfirmSave = useCallback(async () => {
        setShowSaveConfirmDialog(false);
        setLoading(true);

        const toastId = toast.loading('Sedang mengunggah foto profil...');

        try {
            if (!uploadedImage || !croppedAreaPixels) {
                toast.dismiss(toastId);
                notifyError(!uploadedImage ? 'Anda harus memilih gambar terlebih dahulu.' : 'Anda harus melakukan pemotongan gambar terlebih dahulu.');
                setLoading(false);
                return;
            }

            const blobToUpload = await (await fetch(croppedImage)).blob();
            const fileToUpload = new File([blobToUpload], 'profile_image.jpg');

            const formData = new FormData();
            formData.append(activeTab === 'photo' ? 'profile_image' : 'cover_image', fileToUpload);

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };

            if (activeTab === 'photo') {
                await uploadProfilePhoto(formData, config);
                notifySuccess('Foto profil berhasil diunggah');
            } else if (activeTab === 'cover') {
                await uploadProfileCover(formData, config);
                notifySuccess('Cover profil berhasil diunggah');
            }

            setUploadedImage(null);
            setCroppedImage(null);
            setCroppedAreaPixels(null);
        } catch (error) {
            console.error('Error uploading profile photo:', error);
            notifyError('Terjadi kesalahan saat mengunggah foto profil');
        } finally {
            toast.dismiss(toastId);  // Ensure the toast is dismissed here
            setLoading(false);
        }
    }, [uploadedImage, croppedImage, croppedAreaPixels, activeTab]);


    const customStyle = {
        headerTitle: {
            className: 'text-blue-800 font-poppins text-lg font-medium',
        },
        message: {
            className: 'text-gray-800 text-base font-medium font-poppins text-center',
        },
        footer: {
            className: 'font-poppins text-center text-base font-medium',
        },
        icon: {
            className: 'justify-center',
        },
        content: {
            className: 'flex flex-col items-center',
        },
    };


    return (
        <div className="flex flex-col gap-12 ">
            <div className="flex gap-8 justify-center">
                {tabOptions.flatMap(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`w-[200px] p-4 rounded-xl shadow-md flex items-center justify-center 
                            ${activeTab === tab ?
                            'bg-blue-500 shadow-[0px 1px 2px rgba(105, 81, 255, 0.05)]  font-medium text-lg text-blue-50 border-[4px] border-solid border-blue-200' :
                            'bg-blue-300 shadow-[0px 1px 2px rgba(105, 81, 255, 0.05)]  font-medium text-lg text-blue-50'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <input
                id="file-input"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <div
                className="rounded-xl bg-white box-border flex flex-col py-[25px] px-[111px] items-center justify-center text-center text-xs text-gray-800 font-medium border-[1px] border-dashed border-gray-300 cursor-pointer hover:shadow-lg active:scale-95 transition-all duration-300"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-input').click()}
            >
                {!uploadedImage && (
                    <div className="flex flex-col items-center justify-center gap-12">
                        <div className="text-base font-medium text-blue-950">
                            {activeTab === 'photo' ? 'Silahkan Upload untuk Foto profile anda' : 'Silahkan Upload untuk Foto Cover anda'}
                        </div>
                        <div className="bg-blue-50 rounded-full p-5 hover:bg-blue-100">
                            <RiDragDropLine className="w-[100px] h-[100px] text-blue-800" />
                        </div>
                        <div className="leading-[16px]">
                            <p>Drop your file here to upload</p>
                            <p>or click to select from storage</p>
                        </div>
                    </div>
                )}
                {uploadedImage && <img src={croppedImage || uploadedImage} alt="Uploaded" className="rounded-xl" />}

            </div>
            {showModal && (
                <ModalPhoto
                    imageSrc={uploadedImage}
                    crop={crop}
                    setCrop={setCrop}
                    onCropComplete={handleCropComplete}
                    onClose={() => setShowModal(false)}
                    onSave={() => setShowModal(false)}
                />
            )}

            <div className="flex flex-row gap-6 justify-end text-gray-100 ">
                <Button
                    type="button"
                    className="w-[200px]  rounded-xl bg-blue-600 shadow-md py-3 px-6 flex flex-row items-center justify-center gap-2"
                    onClick={showSaveConfirm}
                >
                    {loading ? <ProgressSpinner style={{ width: '24px', height: '24px' }} strokeWidth="4" /> : 'Simpan'}
                </Button>
            </div>
            <ConfirmDialog
                visible={showSaveConfirmDialog}
                onHide={hideSaveConfirm}
                message={customSaveMessage}
                header="Konfirmasi"
                accept={handleConfirmSave}
                reject={hideSaveConfirm}
                acceptLabel="Ya"
                acceptClassName="p-button-danger"
                rejectLabel="Tidak"
                pt={customStyle}
            />
        </div>
    );
};

export default PhotoForm;
