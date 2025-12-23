import React, {useEffect, useRef} from 'react';
import {FaCog, FaUserPlus, FaSmile, FaPaperclip} from 'react-icons/fa';

const ChatEvent = () => {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, []);

    return (
        <div
            className="flex-1 p-2 sm:p-6 justify-between mx-auto shadow-lg bg-gray-50 border flex flex-col min-h-[800px] max-h-[800px] font-poppins w-full rounded-lg">
            <div className="flex sm:items-center justify-center py-3 border-b-2 border-gray-200">
                <div className="relative flex items-center justify-center space-x-4">
                    <img src="https://loremflickr.com/50/50/people" alt="Group Image" className="rounded-full"/>
                    <div className="flex flex-col justify-center leading-tight">
                        <div className="text-2xl mt-1 flex items-center justify-center">
                            <span className="text-gray-700 mr-3">Jaket CodeState</span>
                        </div>
                        <span className="text-lg align-middle text-gray-600">Group Pesan Jaket CodeState</span>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <FaCog size={24}/>
                    <FaUserPlus size={24}/>
                </div>
            </div>
            <div id="messages"
                 className="flex flex-col space-y-4 p-24 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                 ref={messagesEndRef}>
                <div className="flex items-start space-x-2">
                    <img src="https://loremflickr.com/40/40/people" alt="User Avatar" className="rounded-full"/>
                    <div className="bg-gray-200 p-2 rounded-md flex flex-col font-normal max-w-[350px]">
                        <span className="font-bold text-gray-700">John</span> Woy Bayar Woy
                        <div className="text-xs text-gray-500 mt-1 text-right">09:15 AM</div>
                    </div>
                </div><div className="flex items-start space-x-2">
                    <img src="https://loremflickr.com/40/40/people" alt="User Avatar" className="rounded-full"/>
                    <div className="bg-gray-200 p-2 rounded-md flex flex-col font-normal max-w-[350px]">
                        <span className="font-bold text-gray-700">John</span> Woy Bayar Woy
                        <div className="text-xs text-gray-500 mt-1 text-right">09:15 AM</div>
                    </div>
                </div>
                <div className="flex items-start space-x-2">
                    <img src="https://loremflickr.com/40/40/people" alt="User Avatar" className="rounded-full"/>
                    <div className="bg-gray-200 p-2 rounded-md flex flex-col font-normal max-w-[350px]">
                        <span className="font-bold text-gray-700">John</span> Woy Bayar Woy
                        <div className="text-xs text-gray-500 mt-1 text-right">09:15 AM</div>
                    </div>
                </div>
                <div className="flex items-start space-x-2 ml-auto">
                    <div className="bg-blue-500 p-2 rounded-md flex flex-col max-w-[350px]">
                        <span className="font-normal text-white">Sabar Bang Minggu depan gua gajiannya</span>
                        <div className="text-xs text-white mt-1">09:16 AM</div>
                    </div>
                    <img src="https://loremflickr.com/40/40/people" alt="Your Avatar" className="rounded-full"/>
                </div>
            </div>
            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                <div className="relative flex">
                    <span className="absolute inset-y-0 flex items-center">
                        <FaSmile size={24}/>
                    </span>
                    <input type="text" placeholder="Write your message!"
                           className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"/>
                    <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                        <FaPaperclip size={24}/>
                        <button type="button"
                                className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                            <span className="font-bold">Send</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                 className="h-6 w-6 ml-2 transform rotate-90">
                                <path d="M10 3.5L3.5 10H10V3.5z"/>
                                <path d="M10 16.5L3.5 10H10V16.5z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatEvent;
