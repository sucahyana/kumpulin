import React from 'react';
import logo from '../../assets/images/logo.png'
import { FaHome } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { RiCalendarEventLine } from "react-icons/ri";
import {Link} from "react-router-dom";

export const SideBarComponent = () => {
    return (
        <aside
            className="sticky top-0 flex flex-col w-64 h-screen p-8 overflow-y-auto bg-gray-100 border-r drop-shadow-sm rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
            <a href="/" className="mx-auto">
                <img className="w-auto h-24 " src={logo} alt="" /> <span className="text-xl font-bold text-center -mx-7 inline-block text-blue-200 italic hover:text-blue-500">Kumpulin <span className="text-green-200 hover:text-green-500">App</span></span>
            </a>
            <div className="flex flex-col justify-between flex-1 mt-24">
                <nav className="-mx-3 space-y-6 ">
                    <div className="space-y-3 ">
                        <label className="px-3 text-base text-gray-500 font-semibold uppercase dark:text-gray-400">Menu</label>
                        <Link className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                            to={'/'}>
                            <div>
                                <FaHome size="24px" />
                            </div>

                            <span className="mx-2 text-xl font-medium">Rumah</span>
                        </Link>

                        <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                           href="#">
                            <RiCalendarEventLine size="24px" />

                            <span className="mx-2 text-xl font-medium">Acara Kamu</span>
                        </a>
                        <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                           href="#">
                            <FiSearch size="24px" />

                            <span className="mx-2 text-xl font-medium">Pencarian</span>
                        </a>
                    </div>
                </nav>
            </div>
        </aside>
    );
};
export default SideBarComponent;
