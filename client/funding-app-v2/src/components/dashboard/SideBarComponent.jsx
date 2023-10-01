import React from 'react';
import logo from '../../assets/images/logo.png'
import { FaHome } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { RiCalendarEventLine } from "react-icons/ri";
import {Link} from "react-router-dom";

export const SideBarComponent = () => {
    return (
        <aside
            className="hidden lg:flex flex-col justify-between h-screen p-5 border-r sticky top-0 whitespace-nowrap px-12">
            <Link to={"/"} className="mx-auto">
                <img className="w-auto h-36 bg-none" src={logo} alt="Logo Kumpulin" />
            </Link>
            <div className="flex flex-col justify-between w-full mt-24">
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

                        <Link className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                           to={"#"} >
                            <RiCalendarEventLine size="24px" />

                            <p className="mx-2 text-xl font-medium whitespace-nowrap">Acara Kamu</p>
                        </Link>
                        <Link className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                           to={"#"}>
                            <FiSearch size="24px" />

                            <span className="mx-2 text-xl font-medium">Pencarian</span>
                        </Link>
                    </div>
                </nav>
            </div>
            <footer className="flex flex-col mt-auto text-sm text-center text-gray-600">
                <p>&copy; {new Date().getFullYear()} Kumpulin.</p> <p className="">All rights reserved.</p>
            </footer>
        </aside>
    );
};
export default SideBarComponent;
