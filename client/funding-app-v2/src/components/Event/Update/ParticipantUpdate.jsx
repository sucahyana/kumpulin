import React, {useState} from 'react';
import {
    MdArrowForward,
    MdRadioButtonChecked,
    MdRadioButtonUnchecked
} from 'react-icons/md';
import {IoInfinite} from "react-icons/io5";
import imageCompression from 'browser-image-compression';
import {Button} from 'primereact/button';
import {format} from "date-fns";
import _ from 'lodash';
import {AiTwotoneDelete} from "react-icons/ai";
import {updateEvent} from "../../../services/apiService.jsx";
import {notifySuccess, notifyError, notifyLoading, stopLoading} from "../../toast.jsx";


const ParticipantUpdateEvent = (dataEvent) => {
    const [event, setEvent] = useState({
        title: dataEvent.title,
        description: dataEvent.description,
        category: dataEvent.category,
        maxParticipants: dataEvent.max_participant,
        startDate: format(new Date(dataEvent.end_date), 'yyyy-MM-dd'),
        endDate: format(new Date(dataEvent.end_date), 'yyyy-MM-dd'),
        price: dataEvent.amount_person,
        paymentBy: "Admin"
    });

    const [category, setCategory] = useState(event.category);
    const [isUnlimited, setIsUnlimited] = useState(false);
    const [adminPayment, setAdminPayment] = useState(event.paymentBy === "Admin");
    const [selectedFiles, setSelectedFiles] = useState(
        dataEvent.event_media.map((media, index) => {
            const urlParts = media.media_url.split('/');
            const fileName = urlParts[urlParts.length - 1];
            return {url: media.media_url, fileName: fileName, order: index + 1};
        })
    );
    const [deletedMedia, setDeletedMedia] = useState([]);
    const [reorderedFiles, setReorderedFiles] = useState([]);
    const [isMediaChanged, setIsMediaChanged] = useState(false);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEvent((prevEvent) => ({
            ...prevEvent,
            [name]: value,
        }));
    };

    const handleCategoryClick = (selectedCategory) => {
        setCategory(selectedCategory);
    };
    const addFile = (file) => {
        setSelectedFiles((prevFiles) => [...prevFiles, file]);
    };

    const removeFile = (index) => {
        const removedFileUrl = selectedFiles[index]?.url;
        if (removedFileUrl) {
            setDeletedMedia((prevDeletedMedia) => [...prevDeletedMedia, {deletedMedia: removedFileUrl}]);
        }
        setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleFileInputChange = async (e) => {
        const files = e.target.files;
        const newFiles = [];
        for (const file of files) {
            if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
                notifyError("Pastikan Anda mengunggah gambar dengan ukuran kurang dari 5MB.");
                continue;
            }
            try {
                const compressedFile = await imageCompression(file, {maxSizeMB: 2});
                newFiles.push(compressedFile);
            } catch (error) {
                console.error('Error compressing image:', error);
                notifyError("Terjadi kesalahan saat mengompresi gambar. Silakan coba lagi.");
                newFiles.push(file);
            }

        }

        setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
        e.target.value = null;
    };


    const handleDragStart = (e, index) => {
        e.dataTransfer.setData('text/plain', index);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();

        const dragIndex = e.dataTransfer.getData('text/plain');
        if (dragIndex === dropIndex) return;

        const updatedFiles = [...selectedFiles];
        const draggedFile = updatedFiles[dragIndex];

        updatedFiles.splice(dragIndex, 1);
        updatedFiles.splice(dropIndex, 0, draggedFile);

        updatedFiles.forEach((file, index) => {
            file.order = index + 1;
        });

        setSelectedFiles(updatedFiles);
        setReorderedFiles(updatedFiles);
    };

    const [initialFiles, setInitialFiles] = useState([...selectedFiles]);
    const hasMediaChanged = () => {
        if (initialFiles.length !== selectedFiles.length) return true;
        for (let i = 0; i < initialFiles.length; i++) {
            if (initialFiles[i].url !== selectedFiles[i].url) return true;
        }
        if (reorderedFiles.length !== selectedFiles.length) return true;
        for (let i = 0; i < reorderedFiles.length; i++) {
            if (reorderedFiles[i].url !== selectedFiles[i].url) return true;
        }
        return false;
    };


    const getMedia = () => {
        const newMedia = selectedFiles.filter(file => !initialFiles.includes(file)).map((file) => ({
            media_category: 'image',
            media: file,
            order: file.order
        }));
        return newMedia;
    };


    const handleUpdate = async () => {
        notifyLoading("Mengirim data...");
        if (new Date(event.startDate) > new Date(event.endDate)) {
            notifyError("Tanggal mulai tidak boleh lebih besar dari tanggal selesai!");
            return;
        }
        if (event.price < 0 || event.maxParticipants <= 2) {
            stopLoading();
            notifyError("tidak boleh harga nya kurang dari 0 atau participantnya kurang dari 2!");
            return;
        }

        setIsMediaChanged(hasMediaChanged());
        try {
            const formData = {
                title: event.title,
                description: event.description,
                category: category,
                max_participant: event.maxParticipants,
                start_date: event.startDate,
                end_date: event.endDate,
                amount_person: event.price,
                media: getMedia(),
            };

            if (deletedMedia.length) {
                formData.deletedMedia = _.compact(deletedMedia);
            }
            if (isMediaChanged) {
                formData.reorderedMedia = reorderedFiles.map(media => media.url);
            }

            const updatedEvent = await updateEvent(dataEvent.code_event, formData);
            stopLoading()
            notifySuccess("Event berhasil diperbarui!");
        } catch (error) {
            console.error('Error updating event:', error);
            stopLoading()
            notifyError("Terjadi kesalahan saat memperbarui event. Silakan coba lagi.");
        }

    };
    return (
        <div className="bg-white p-4 md:p-8 shadow-md rounded mx-auto flex-col border-dashed border-2 lg:max-w-6xl">
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-center font-bold mb-6 md:mb-8 p-2 text-blue-500 border-b-2 border-dashed">Update
                Event</h2>
            <div className="flex flex-col items-start justify-start my-4 gap-4">
                <label className="relative leading-[24px] font-semibold inline-block w-[calc(50%-10px)]"
                       htmlFor="topicName">
                    Nama Topik
                </label>
                <div className="relative text-xs sm:text-sm leading-[20px] text-blue-500 -mt-4 italic text-opacity-50">
                    Anda bisa mengganti Judul
                </div>
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="border rounded p-2 w-[calc(50%-10px)] shadow-md"
                    value={event.title}
                    placeholder="Silahkan Isi Judul/Nama Topik Event Anda"
                    onChange={handleInputChange}
                />
            </div>

            <div className="flex flex-col items-start justify-start my-4 gap-4">
                <label className="relative leading-[24px] font-semibold inline-block w-[calc(50%-10px)]">
                    Kategori
                </label>
                <div className="relative text-xs sm:text-sm leading-[20px] -mt-4 text-blue-500 italic text-opacity-50">
                    Anda bisa mengganti Kategori yang lain.
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8 w-full">
                    <button
                        className={`rounded-md ${category === 'pre-order' ? 'p-2 bg-blue-500 shadow-[0px 1px 2px rgba(105, 81, 255, 0.05)] font-medium text-xs sm:text-sm md:text-base lg:text-lg text-blue-50 border-4 border-solid border-blue-200' : 'p-2 bg-blue-300 shadow-[0px 1px 2px rgba(105, 81, 255, 0.05)] font-medium text-xs sm:text-sm md:text-base lg:text-lg text-blue-50'}`}
                        onClick={() => handleCategoryClick('pre-order')}
                    >
                        Si Kece Pre-Order
                    </button>
                    <button
                        className={`rounded-md ${category === 'arisan' ? 'p-2 bg-blue-500 shadow-[0px 1px 2px rgba(105, 81, 255, 0.05)] font-medium text-xs sm:text-sm md:text-base lg:text-lg text-blue-50 border-4 border-solid border-blue-200' : 'p-2 bg-blue-300 shadow-[0px 1px 2px rgba(105, 81, 255, 0.05)] font-medium text-xs sm:text-sm md:text-base lg:text-lg text-blue-50'}`}
                        onClick={() => handleCategoryClick('arisan')}
                    >
                        Arisan Canggih
                    </button>
                    <button
                        className={`rounded-md ${category === 'travel' ? 'p-2 bg-blue-500 shadow-[0px 1px 2px rgba(105, 81, 255, 0.05)] font-medium text-xs sm:text-sm md:text-base lg:text-lg text-blue-50 border-4 border-solid border-blue-200' : 'p-2 bg-blue-300 shadow-[0px 1px 2px rgba(105, 81, 255, 0.05)] font-medium text-xs sm:text-sm md:text-base lg:text-lg text-blue-50'}`}
                        onClick={() => handleCategoryClick('travel')}
                    >
                        Healing Lah
                    </button>
                </div>
            </div>

            {/* Bagian Deskripsi */}
            <div className="flex flex-col items-start justify-start my-4 gap-4">
                <label className="relative leading-[24px] font-semibold inline-block w-[calc(50%-10px)]">
                    Deskripsi
                </label>
                <div className="relative text-xs sm:text-sm leading-[20px] text-blue-500 -mt-4 italic text-opacity-50">
                    Anda bisa mengganti isi dari Deskripsi Acara anda.
                </div>
                <textarea
                    id="description"
                    name="description"
                    className="border shadow-md rounded p-2 w-full  min-h-[300px] "
                    value={event.description}
                    placeholder="Silahkan isi dari Deskripsi Acara anda dengan Sedetail detailnya"
                    onChange={handleInputChange}
                ></textarea>
            </div>

            <div className="grid grid-cols-2  items-center justify-between gap-8 w-full mb-6">

                <div className="w-full flex flex-col my-4">

                    <label className="relative leading-[24px] font-semibold inline-block " htmlFor="startDate">Tanggal
                        Mulai
                    </label>

                    <div className="text-xs sm:text-sm leading-[20px] text-blue-500 italic text-opacity-50 mb-4">
                        Tanggal harus lebih 1 hari dari sekarang
                    </div>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        className="relative leading-[24px] w-full shadow-md bg-transparent outline-none border border-gray-300 rounded p-2 text-gray-900"
                        value={event.startDate}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="w-full flex flex-col  my-4">
                    <label className="relative leading-[24px] font-semibold inline-block " htmlFor="startDate">Tanggal
                        Selesai
                    </label>
                    <div className="text-xs sm:text-sm leading-[20px] text-blue-500 italic text-opacity-50 mb-4">
                        Tidak boleh sama dengan tanggal mulai
                    </div>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        className="relative leading-[24px] w-full shadow-md bg-transparent outline-none border border-gray-300 rounded p-2 text-gray-900"
                        value={event.endDate}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="flex flex-col items-start justify-between gap-4 my-4">
                <div className="w-full flex flex-col  gap-4 my-4">
                    <label className="relative leading-[24px] font-semibold inline-block ">
                        Max participants
                    </label>
                    <div className="relative -mt-4 text-xs sm:text-sm leading-[20px] text-blue-500 italic text-opacity-50">
                        Jumlah particpants kalau penuh berapa?
                    </div>
                    <div className="flex flex-row items-center gap-8 text-gray-900">
                        {isUnlimited ? (
                            <div className="flex items-center gap-[10px] shadow-md p-2 rounded-lg border-2">
                                <IoInfinite className="w-6 h-6 text-blue-500"/>
                                <span className="w-48 text-lg italic">Tidak Terbatas</span>
                            </div>
                        ) : (
                            <input
                                type="number"
                                id="maxParticipants"
                                name="maxParticipants"
                                className="relative w-[calc(50%-10px)] shadow-md leading-[24px] bg-transparent outline-none border border-gray-300 rounded p-2 text-gray-900"
                                value={event.maxParticipants}
                                onChange={handleInputChange}
                                placeholder="Masukkan jumlah maksimal"
                            />
                        )}
                        <button
                            className="flex flex-row items-center  gap-[10px] shadow-md text-xs active:bg-gray-200 focus:bg-gray-200 p-2 rounded-lg"
                            onClick={() => setIsUnlimited(!isUnlimited)}
                        >
                            <div className="rounded-md bg-blue-300 shadow-[0px 1px 2px rgba(105, 81, 255, 0.05)] p-2 ">
                                <IoInfinite className="w-6 h-6 text-white"/>
                            </div>
                            <div className="font-medium text-xs  text-gray-800 active:text-white focus:text-white">
                                Klik ini jika tidak terbatas
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-start justify-between gap-4 my-4">
                <div className="w-full flex flex-col  gap-4 my-4">
                    <label className="relative leading-[24px] font-semibold inline-block " htmlFor="price">Harga</label>

                    <div className="relative -mt-4 text-xs sm:text-sm leading-[20px] text-blue-500 italic text-opacity-50">
                        Harga Perorangnya saja
                    </div>
                    <div className="flex flex-row items-center gap-8 text-gray-900">
                        <input
                            type="number"
                            id="price"
                            name="price"
                            className="relative shadow-md leading-[24px] w-[calc(50%-10px)] bg-transparent outline-none border border-gray-300 rounded p-2 text-gray-900"
                            value={event.price}
                            onChange={handleInputChange}
                            placeholder="Masukkan harga"
                        />
                        <span className="text-green-500 font-medium text-lg">Rupiah</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-start justify-beetween gap-4 my-4">
                <label className="relative leading-[24px] font-semibold inline-block ">
                    Ubah Pembayaran Partisipan
                </label>
                <div className="text-xs sm:text-sm -mt-4 leading-[20px] text-blue-500 italic text-opacity-50">
                    Atur Sendiri Mempengaruhi Kepercayaan Participant
                </div>
                <div className="grid grid-cols-2 w-full gap-8 text-gray-900">
                    <button
                        className={`rounded-lg bg-white shadow-md box-border  h-[46px] overflow-hidden flex flex-row py-2.5 px-3.5 items-center justify-center border-[1px] border-solid border-gray-200 ${adminPayment ? 'bg-gray-100' : 'bg-white'}`}
                        onClick={() => setAdminPayment(true)}
                    >
                        {adminPayment ? (
                            <MdRadioButtonChecked className="w-6 h-6 text-green-500"/>
                        ) : (
                            <MdRadioButtonUnchecked className="w-6 h-6 text-gray-900"/>
                        )}
                        <span>Admin</span>
                    </button>
                    <button
                        className={`rounded-lg bg-white shadow-md box-border  h-[46px] overflow-hidden flex flex-row py-2.5 px-3.5 items-center justify-center border-[1px] border-solid border-gray-200 ${!adminPayment ? 'bg-gray-100' : 'bg-white'}`}
                        onClick={() => setAdminPayment(false)}
                    >
                        {!adminPayment ? (
                            <MdRadioButtonChecked className="w-6 h-6 text-green-500"/>
                        ) : (
                            <MdRadioButtonUnchecked className="w-6 h-6 text-gray-900"/>
                        )}
                        <span>Atur Sendiri</span>

                    </button>

                </div>
            </div>

            <div className="flex flex-col justify-center p-4 my-4 gap-4">
                <h1 className="pt-8 pb-3 font-semibold text-center sm:text-lg text-gray-900">Uploaded Files</h1>
                <ul id="gallery" className="flex flex-col space-y-2">
                    {selectedFiles.map((file, index) => (
                        <li
                            key={index}
                            className="flex items-center space-x-0  sm:space-x-2 transition duration-300 ease-in-out transform hover:scale-105"
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                        >
                            <div className="text-gray-600 font-semibold">{index + 1}.</div>
                            <div className="flex-1">
                                <article
                                    className="flex items-center space-x-0 sm:space-x-2 py-2 px-4 justify-between rounded-md bg-blue-100">
                                    <div className="flex items-center gap-4 space-x-0 sm:space-x-2">
                                        <img
                                            src={file.url || URL.createObjectURL(file)}
                                            alt={`Preview-${index}`}
                                            className="w-16 h-16 object-cover rounded-md"
                                        />
                                        <h1 className="flex-1 text-blue-500 max-w-fit font-semibold text-sm text-ellipsis overflow-hidden">{file.fileName || `Gambar Anda`}</h1>
                                    </div>
                                    <button
                                        className="delete focus:outline-none hover:bg-blue-300 p-1 rounded-md text-blue-800"
                                        onClick={() => removeFile(index)}
                                    >
                                        <AiTwotoneDelete size={30} className="text-red-500 hover:scale-105"/>
                                    </button>
                                </article>
                            </div>
                        </li>
                    ))}
                </ul>
                <header
                    className="border-dashed w-full  h-[400px] rounded-lg border-2 border-gray-400 py-8 flex mx-auto flex-col justify-center items-center mt-4">
                    <p className="mb-3 font-semibold opacity-70 text-gray-900 flex flex-wrap justify-center">
                        <span className="text-center text-xs sm:text-base">Taruh dan Jatuhkan Gambar dimana saja atau</span>
                    </p>
                    <input
                        id="hidden-input"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileInputChange}
                    />

                    <Button
                        id="button"
                        className="mt-2 rounded-lg opacity-70 font-semibold text-xs sm:text-base p-4 bg-blue-400 hover:bg-blue-300 focus:shadow-outline"
                        onClick={() => document.getElementById('hidden-input').click()}
                    >
                        Upload a file
                    </Button>
                </header>
            </div>
            <div className="flex justify-center">
                <Button
                    onClick={handleUpdate}
                    label={"Update Event"}
                    className="bg-blue-500 w-1/2 justify-center text-xs sm:text-base text-white font-poppins px-4 py-2 rounded hover:bg-blue-600">
                     <MdArrowForward className="inline-block sm:ml-2"/>
                </Button>
            </div>
        </div>
    );
};

export default ParticipantUpdateEvent;