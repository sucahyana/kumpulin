import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {
    MdRadioButtonChecked,
    MdRadioButtonUnchecked,
} from 'react-icons/md';
import { IoInfinite } from "react-icons/io5";

const StepTwoContent = forwardRef((props, ref) => {
    const [isUnlimited, setIsUnlimited] = useState(false);
    const [maxParticipants, setMaxParticipants] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [amountPerson, setAmountPerson] = useState('');
    const [adminPayment, setAdminPayment] = useState(true);

    useImperativeHandle(ref, () => ({
        getData: () => ({
            maxParticipants,
            amountPerson,
            startDate,
            endDate
        })
    }));

    return (
        <div className="relative flex flex-col items-baseline justify-between gap-[24px] text-left text-base text-gray-800">
            <div className="flex flex-col items-start justify-start gap-[6px]">
                <div className="w-full sm:w-[358px] flex flex-col items-start justify-start gap-[6px]">
                    <label className="relative leading-[24px] font-semibold inline-block ">
                        Max participants
                    </label>
                    <div className="relative text-sm leading-[20px] text-blue-500 italic text-opacity-50">
                        Jumlah participants kalau penuh berapa?
                    </div>
                    <div className="flex flex-row items-center justify-start gap-[70px] text-gray-900">
                        {isUnlimited ? (
                            <div className="flex items-center gap-[10px]">
                                <IoInfinite className="w-6 h-6 text-blue-500"/>
                                <span className="w-48 text-lg italic">Tidak Terbatas</span>
                            </div>
                        ) : (
                            <input
                                type="number"
                                className="relative leading-[24px] bg-transparent outline-none border border-gray-300 rounded p-2 text-gray-900"
                                value={maxParticipants}
                                onChange={(e) => setMaxParticipants(e.target.value)}
                                placeholder="Masukkan jumlah maksimal"
                            />
                        )}
                        <button
                            className="flex flex-row items-center justify-start gap-[10px] text-xs active:bg-gray-200 focus:bg-gray-200 p-1 rounded-lg"
                            onClick={() => setIsUnlimited(!isUnlimited)}
                        >
                            <div className="rounded-md bg-blue-300 shadow-[0px 1px 2px rgba(105, 81, 255, 0.05)] p-2 ">
                                <IoInfinite className="w-6 h-6 text-white"/>
                            </div>
                            <div className="w-36 text-gray-800 active:text-white focus:text-white">
                                Klik ini jika tidak terbatas
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-row items-center justify-center gap-[24px]">

                <div className="flex flex-col items-start justify-start gap-[6px]">

                    <label className="relative leading-[24px] font-semibold inline-block " htmlFor="startDate">Tanggal
                        Mulai
                    </label>

                    <input
                        type="date"
                        id="startDate"
                        className="relative leading-[24px] bg-transparent outline-none border border-gray-300 rounded p-2 text-gray-900"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="flex flex-col items-start justify-start gap-[6px]">
                    <label className="relative leading-[24px] font-medium inline-block w-40" htmlFor="endDate">Tanggal
                        Selesai</label>
                    <input
                        type="date"
                        id="endDate"
                        className="relative leading-[24px] bg-transparent outline-none border border-gray-300 rounded p-2 text-gray-900"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>
            <div className="-mt-6 -relative text-sm leading-[20px] text-blue-500 italic text-opacity-50">
                Tangggal Mulai harus lebih 1 hari dari sekarang
            </div>
            <div className="flex flex-col items-start justify-start gap-[6px]">

                <label className="relative leading-[24px] font-semibold inline-block " htmlFor="price">Harga</label>

                <div className="relative text-sm leading-[20px] text-blue-500 italic text-opacity-50">
                    Harga Perorangnya saja
                </div>
                <div className="flex items-center gap-[10px]">
                    <input
                        type="number"
                        id="price"
                        className="relative leading-[24px] bg-transparent outline-none border border-gray-300 rounded p-2 text-gray-900"
                        value={amountPerson}
                        onChange={(e) => setAmountPerson(e.target.value)}
                        placeholder="Masukkan harga"
                    />
                    <span>Rupiah</span>
                </div>
            </div>

            <div className="flex flex-col items-start justify-start gap-[6px]">
                <div className="relative leading-[24px] font-medium">Pembayaran Partisipan</div>
                <div className="flex flex-row items-center justify-start gap-[10px] text-gray-900">
                    <button
                        className={`rounded-lg bg-white shadow-[0px 1px 2px rgba(0, 0, 0, 0.05)] box-border w-44 h-[46px] overflow-hidden flex flex-row py-2.5 px-3.5 items-center justify-start border-[1px] border-solid border-gray-200 ${adminPayment ? 'bg-gray-100' : 'bg-white'}`}
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
                        className={`rounded-lg bg-white shadow-[0px 1px 2px rgba(0, 0, 0, 0.05)] box-border w-44 h-[46px] overflow-hidden flex flex-row py-2.5 px-3.5 items-center justify-start border-[1px] border-solid border-gray-200 ${!adminPayment ? 'bg-gray-100' : 'bg-white'}`}
                        onClick={() => setAdminPayment(false)}
                    >
                        {!adminPayment ? (
                            <MdRadioButtonChecked className="w-6 h-6 text-green-500"/>
                        ) : (
                            <MdRadioButtonUnchecked className="w-6 h-6 text-gray-900"/>
                        )}
                        <span>Atur Sendiri</span>

                    </button>
                    <i className={`relative text-[10px] leading-[18px] inline-block ${!adminPayment ? 'text-tomato' : 'text-gray-900'} max-w-[205px]`}>
                        Atur Sendiri Mempengaruhi Kepercayaan Participant
                    </i>

                </div>
            </div>
        </div>
    );
});

export default StepTwoContent;
