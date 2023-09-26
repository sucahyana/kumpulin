import React, {useEffect, useState} from 'react';
import {FiShare} from 'react-icons/fi';
import {useSelector} from 'react-redux';
import {Button} from 'primereact/button';
import {format} from 'date-fns';
import EventCarousel from './EventCarousel';
import {Link, useNavigate} from 'react-router-dom';
import {notifySuccess, notifyError, notifyLoading, stopLoading} from '../toast.jsx';
import {FaEdit} from 'react-icons/fa';
import {Skeleton} from 'primereact/skeleton';
import Loader from '../Loader.jsx';
import {TbSquareRoundedPlusFilled} from 'react-icons/tb';
import {requestJoinEvent} from '../../services/apiService.jsx';
import Modal from 'react-modal';
import {InputText} from 'primereact/inputtext';

const EventDetail = ({Content, eventData, children}) => {
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.data.user);
    const [showModal, setShowModal] = useState(false);
    const [eventCode, setEventCode] = useState('');
    const [loading, setLoading] = useState(true);
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
    const [alasan, setAlasan] = useState('');
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (eventData) {
            setLoading(false);
        }
    }, [eventData]);

    useEffect(() => {
        setIsValid(alasan.trim() !== '');
    }, [alasan]);

    if (loading) {
        return <Loader/>;
    }

    const {
        id,
        title,
        description,
        code_event,
        amount_person,
        user,
        id_user,
        category,
        start_date,
        end_date,
        event_media,
        event_participant,
    } = eventData || {};
    const isUserAlreadyJoined = eventData?.event_participant?.some(participant => participant?.id_user === currentUser?.id);

    const openJoinModal = () => {
        setIsJoinModalOpen(true);
    };

    const closeJoinModal = () => {
        setIsJoinModalOpen(false);
    };

    const handleShare = (type) => {
        const currentCode = type === 'code' ? code_event : window.location.href;
        setEventCode(currentCode);
        notifySuccess(type === 'code' ? 'Code berhasil didapatkan!' : 'Link berhasil didapatkan!');
        setShowModal(true);
    };

    const handleEdit = () => {
        navigate(`/event/${code_event}/update`);
    };

    const handleJoin = async () => {
        if (!isValid) {
            notifyError('Harap isi alasan dengan benar sebelum mengirim.');
            return;
        }

        notifyLoading('Sedang Mencoba mengirim...');
        try {
            const response = await requestJoinEvent(code_event, alasan);
            if (response.status === 200) {
                notifySuccess('Berhasil Request bergabung ke Event!');
                setAlasan('');
                closeJoinModal();
            } else {
                notifyError(response.data?.message || 'Terjadi kesalahan saat memproses Request.');
            }
        } catch (error) {
            notifyError(error.response?.data?.message || 'Terjadi kesalahan internal. Silakan coba lagi.');
        } finally {
            stopLoading();
        }
    };

    const ModalJoin = () => {
        openJoinModal();
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };
    const EventDetail = () => (
        <div className="flex-col gap-8 justify-center my-4 w-full">
            <div
                className="relative rounded-lg bg-white p-8 shadow-2xl hover:shadow-4xl transition-shadow duration-300">
                <div className="space-y-1">
                    {title ? (
                        <h2 className="text-2xl font-extrabold text-gray-800">{title}</h2>
                    ) : (
                        <Skeleton shape="text" width="80%"/>
                    )}
                    {category ? (
                        <p className="text-xl font-semibold text-blue-600">{category}</p>
                    ) : (
                        <Skeleton shape="text" width="60%"/>
                    )}
                </div>
                {amount_person ? (
                    <div className="text-2xl text-right text-green-600">
                        <span className="font-bold">{formatCurrency(amount_person)}</span>
                        <span className="font-medium text-blue-500"> Rupiah</span>
                    </div>
                ) : (
                    <Skeleton shape="text" width="40%"/>
                )}
            </div>
        </div>
    );

    const EventFooter = () => (
            <div className="mx-auto w-full max-w-[1150px]">
                <div
                    className="rounded-lg bg-white p-6 flex items-start justify-between space-x-8 text-black shadow-lg  transition-shadow duration-300">
                    <div className="flex items-center space-x-4">
                        <Link to={currentUser && id_user === currentUser.id ? '/profile' : `/profile/${id_user}`}>
                            <img
                                className="rounded-full w-16 h-16 object-cover flex text-center hover:scale-105 shadow-lg border-2 border-blue-200"
                                alt="Profile Picture"
                                src={user.profile_image || 'https://source.unsplash.com/random/60x60'}
                            />
                        </Link>
                        <div className="flex flex-col">
                            {user.name ? (
                                <span className="text-xl font-semibold">{user.name}</span>
                            ) : (
                                <Skeleton shape="text" width="80%" />
                            )}
                            <span className="text-sm text-blue-500 font-semibold">Publication</span>
                        </div>
                    </div>

                    <div className="flex flex-col bg-blue-100 rounded-lg p-4 space-y-2 text-lg text-blue-900 font-semibold">
                        {start_date && (
                            <span>Acara Ditutup Pada {format(new Date(start_date), 'dd MMMM yyyy')}</span>
                        )}
                        {end_date && (
                            <span
                                className="text-base text-red-600">Harus Lunas Sebelum {format(new Date(end_date), 'dd MMMM yyyy')}</span>
                        )}
                    </div>
                </div>
            </div>
        )
    ;


    const ShareButton = ({onClick}) => (
        <Button
            onClick={onClick}
            className="p-2 w-1/2 flex justify-center mt-4 mb-4 shadow-lg rounded-lg font-poppins bg-blue-400 hover:bg-blue-500 hover:scale-105 text-white transition duration-300 ease-in-out"
        >
            <FiShare size={24} className="mr-4"/> Bagikan atau Invite
        </Button>
    );

    const ShareModal = ({eventCode, onClose, onShare}) => {
        const handleCopy = async () => {
            try {
                await navigator.clipboard.writeText(eventCode);
                notifySuccess('Berhasil menyalin!');
            } catch (error) {
                notifyError('Gagal menyalin. Coba secara manual.');
            }
        };

        return (
            <div
                className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-md p-8">
                    <h3 className="mb-4 text-xl">Bagikan Event:</h3>
                    <div className="mb-4">
                        <Button
                            className="mr-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                            onClick={() => onShare('code')}
                        >
                            Dapatkan Kode
                        </Button>
                        <Button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            onClick={() => onShare('link')}
                        >
                            Salin Link Event
                        </Button>
                    </div>
                    {eventCode && (
                        <div className="border p-4 mb-4">
                            {eventCode}
                            <Button
                                className="ml-4 bg-blue-500 text-white px-2 py-1 rounded-md"
                                onClick={handleCopy}
                            >
                                Salin
                            </Button>
                        </div>
                    )}
                    <Button
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                        onClick={onClose}
                    >
                        Tutup
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <div className="flex-grow flex flex-col">
                <main className="flex-grow flex flex-col items-center mt-4 mb-6 p-8 w-full max-w-[1150px] mx-auto">
                    {loading ? (
                        <div className="p-fluid">
                            <div className="p-field">
                                <Skeleton shape="rectangle" size="100%" style={{height: '300px'}}/>
                            </div>
                        </div>
                    ) : (
                        <>
                            <EventCarousel images={event_media.map((media) => media.media_url)}/>
                            {currentUser && id_user === currentUser.id && (
                                <Button
                                    onClick={handleEdit}
                                    className="mt-4 font-poppins bg-white text-blue-500 font-bold text-lg shadow-2xl flex items-center justify-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out"
                                >
                                    <FaEdit size={20}/> Ubah Sesuatu Didalam Acara
                                </Button>
                            )}
                            <EventDetail/>
                            <div className="justify-center my-4 w-full">{Content}</div>
                            <EventFooter/>
                            {!isUserAlreadyJoined && (
                                <Button
                                    onClick={ModalJoin}
                                    className="mt-4 font-poppins bg-white text-blue-500 font-bold text-lg shadow-2xl flex items-center justify-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out"
                                >
                                    <TbSquareRoundedPlusFilled size={20}/> Gabung acara
                                </Button>
                            )}
                            <Modal
                                isOpen={isJoinModalOpen}
                                onRequestClose={closeJoinModal}
                                contentLabel="Gabung Acara"
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
                                        <label htmlFor="alasan" className="font-medium text-gray-600">Alasan</label>
                                        <InputText
                                            id="alasan"
                                            type="text"
                                            placeholder="Alasan Request Bergabung..."
                                            className="p-inputtext-sm p-d-block w-full rounded-md"
                                            value={alasan}
                                            onChange={(e) => setAlasan(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <Button
                                            label="Save Changes"
                                            icon="pi pi-check"
                                            onClick={handleJoin}
                                            className={`p-button-info rounded p-button-sm font-semibold ${!isValid && 'p-disabled'}`}
                                            disabled={!isValid}
                                        />
                                        <Button
                                            label="Cancel"
                                            icon="pi pi-times"
                                            onClick={closeJoinModal}
                                            className="p-button-danger rounded p-button-sm font-semibold"
                                        />
                                    </div>
                                </div>
                            </Modal>
                            <ShareButton onClick={() => setShowModal(true)}/>
                            {showModal && (
                                <ShareModal
                                    eventCode={eventCode}
                                    onClose={() => setShowModal(false)}
                                    onShare={handleShare}
                                />
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default EventDetail;
