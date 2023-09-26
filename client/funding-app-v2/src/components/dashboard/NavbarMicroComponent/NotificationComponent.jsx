import React, { useState, useRef, useEffect } from 'react';

function NotificationComponent() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="relative z-10 block rounded-md bg-none p-2 focus:outline-none hover:scale-105 hover:bg-gray-200">
                {/* Icon */}
                <svg className="h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
            </button>

            {dropdownOpen && (
                <div className="w-96 h-80 p-2.5 bg-slate-50 rounded-lg shadow flex flex-col justify-start items-start gap-5 absolute top-full mt-2 transform -translate-x-full">
                    <div className="text-black text-base font-bold leading-normal">Notification</div>
                    <div className="flex space-x-4">
                        <img className="w-28 h-24 rounded-lg" src="https://via.placeholder.com/105x94" alt="Random Baju" />
                        <div className="flex-1">
                            <div className="text-zinc-400 text-xs font-normal">Sud ulam cahyana</div>
                            <div className="text-green-400 text-xl font-bold">Baru saja bayar 10k</div>
                            <div className="text-zinc-400 text-xs font-normal">Jaket CodeState</div>
                        </div>
                    </div>
                    <div className="w-96 h-px border border-slate-500"></div>
                    <div className="flex space-x-4">
                        <img className="w-28 h-24 rounded-lg" src="https://via.placeholder.com/105x94" alt="Random Baju" />
                        <div className="flex-1">
                            <div className="text-zinc-400 text-xs font-normal">TI 21 Gateway</div>
                            <div className="text-red-500 text-xl font-bold">Pembayaran Tersisa 2 hari lagi</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NotificationComponent;
