import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
    MdRadioButtonChecked,
    MdRadioButtonUnchecked,
} from 'react-icons/md';
import {IoInfinite} from 'react-icons/io5';
import {Button} from 'primereact/button';
import {Calendar} from "primereact/calendar";
import {InputText} from "primereact/inputtext";
import {RadioButton} from "primereact/radiobutton";

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
        <div className="flex flex-col gap-4 text-gray-800">
            <div className="flex flex-col">
                <label className="font-semibold text-base md:text-lg">Max participants</label>
                <div className="text-sm text-blue-500 italic text-opacity-50">
                    Jumlah participants kalau penuh berapa?
                </div>
                <div className="flex items-center gap-2">
                    {isUnlimited ? (
                        <div className="flex items-center gap-2">
                            <IoInfinite className="w-6 h-6 text-blue-500"/>
                            <span className="text-lg italic">Tidak Terbatas</span>
                        </div>
                    ) : (
                        <InputText
                            type="number"
                            className="border bg-transparent outline-none border-gray-300 rounded p-2 text-gray-900"
                            value={maxParticipants}
                            onChange={(e) => setMaxParticipants(e.target.value)}
                            placeholder="Masukkan jumlah maksimal"
                        />
                    )}
                    <Button
                        label={isUnlimited ? 'Terbatas' : 'Tidak Terbatas'}
                        className={`p-button-secondary ${isUnlimited ? 'font-medium' : 'bg-blue-600 opacity-60'}`}
                        onClick={() => setIsUnlimited(!isUnlimited)}
                    />
                </div>
            </div>

            <div className="flex flex-row items-center justify-between gap-4">
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
            <div className="-mt-4 text-sm text-blue-500 italic text-opacity-50">
                Tanggal Mulai harus lebih 1 hari dari sekarang
            </div>
            <div className="flex flex-col">
                <label className="font-semibold text-base md:text-lg" htmlFor="price">
                    Harga
                </label>
                <div className="text-sm text-blue-500 italic text-opacity-50">
                    Harga Perorangnya saja
                </div>
                <div className="flex items-center gap-2">
                    <InputText id="price" type="number" value={amountPerson}
                               onChange={(e) => setAmountPerson(e.target.value)}/>
                    <span>Rupiah</span>
                </div>
            </div>
            <div className="flex flex-col">
                <label className="font-semibold text-base md:text-lg" htmlFor="radio">
                    Pembayaran Participan
                </label>
                <div className="flex flex-row items-center justify-start gap-4 text-gray-900">
                    <Button
                        disabled={true}
                        className={`rounded-lg text-gray-900  bg-white shadow-[0px 1px 2px rgba(0, 0, 0, 0.05)] box-border  overflow-hidden flex flex-row py-2.5 px-3.5 items-center justify-start border-[1px] border-solid border-gray-200 ${adminPayment ? 'bg-gray-100' : 'bg-white'}`}
                        onClick={() => setAdminPayment(true)}
                    >
                        {adminPayment ? (
                            <MdRadioButtonChecked className="md:w-6 md:h-6 text-green-500"/>
                        ) : (
                            <MdRadioButtonUnchecked className="md:w-6 md:h-6 text-gray-900"/>
                        )}
                        <span>Admin</span>
                    </Button>
                    <button
                        className={`rounded-lg bg-white shadow-[0px 1px 2px rgba(0, 0, 0, 0.05)] box-border overflow-hidden flex flex-row py-2.5 px-3.5 items-center justify-start border-[1px] border-solid border-gray-200 ${!adminPayment ? 'bg-gray-100' : 'bg-white'}`}
                        onClick={() => setAdminPayment(false)}
                    >
                        {!adminPayment ? (
                            <MdRadioButtonChecked className="md:w-6 md:h-6 text-green-500"/>
                        ) : (
                            <MdRadioButtonUnchecked className="md:w-6 md:h-6 text-gray-900"/>
                        )}
                        <span>Atur Sendiri</span>

                    </button>
                </div>
            </div>
        </div>
    );
});

export default StepTwoContent;
