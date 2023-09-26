import React from 'react';
import Starter from "../components/userComponent/Starter.jsx";
import Loader from "../components/Loader.jsx";
import {Button} from "primereact/button";
import SearchEventCard from "../components/molecules/SearchEventCard.jsx";


const Search = () => {

    function renderContent() {
        return (
            <div className="flex flex-col p-8 space-y-8">
                <section>
                    <h2 className="text-2xl font-semibold text-gray-500 hover:text-gray-900 transition-all duration-300">
                        Hasil dari Search "Leroy"...
                    </h2>

                </section>
                <section className='flex flex-col gap-6'>
                    <h2 className="text-2xl font-semibold text-blue-900 hover:text-gray-900 transition-all duration-300">
                        Orang
                    </h2>
                    <div className="flex flex-row gap-6">
                        <section
                            className="flex flex-col justify-center max-w-xs p-6 rounded-lg sm:px-12 hover:-translate-y-1 transition-all duration-300">
                            <img src="https://source.unsplash.com/150x150/?portrait?3" alt=""
                                 className="w-32 h-32 mx-auto rounded-full transition-all duration-300 hover:scale-105  aspect-square shadow-[0px_8px_16px_-8px_rgba(25,20,20,0.80)]"/>
                            <div className="space-y-4 text-center divide-y divide-gray-700">
                                <div className="my-2 space-y-1">
                                    <h2 className="text-lg font-semibold  text-blue-900">Leroy Jenkins</h2>
                                    <p className="text-base text-gray-400">Full-stack developer</p>
                                </div>
                            </div>
                        </section>
                        <section
                            className="flex flex-col justify-center max-w-xs p-6 rounded-lg sm:px-12 hover:-translate-y-1 transition-all duration-300">
                            <img src="https://source.unsplash.com/150x150/?portrait?3" alt=""
                                 className="w-32 h-32 mx-auto rounded-full transition-all duration-300 hover:scale-105  aspect-square shadow-[0px_8px_16px_-8px_rgba(25,20,20,0.80)]"/>
                            <div className="space-y-4 text-center divide-y divide-gray-700">
                                <div className="my-2 space-y-1">
                                    <h2 className="text-lg font-semibold  text-blue-900">Leroy Jenkins</h2>
                                    <p className="text-base text-gray-400">Full-stack developer</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </section>
                <section className='flex flex-col gap-6'>
                    <h2 className="text-2xl font-semibold text-blue-900 hover:text-gray-900 transition-all duration-300">
                        Acara
                    </h2>
                    <SearchEventCard/>
                    <SearchEventCard/>
                </section>

            </div>
        )
    }

    return (
        <Starter Content={renderContent()}/>
    );
}
export default Search;