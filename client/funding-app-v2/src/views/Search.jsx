import React from 'react';
import Starter from "../components/userComponent/Starter.jsx";
import SearchEventCard from "../components/Search/SearchEventCard.jsx";
import {Link, useLocation} from 'react-router-dom';
import Loader from "../components/Loader.jsx";

const Search = () => {
    const location = useLocation();
    const results = location.state?.results || {users: [], events: []};
    const query = new URLSearchParams(location.search).get('q');

    function renderContent() {
        if (!results.users.length && !results.events.length) {
            return (
                <div className="flex flex-col p-8 space-y-8">
                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-500 hover:text-gray-900 transition-all duration-300">
                            Hasil dari Search "{query}"...
                        </h2>
                    </section>
                    <section className="text-2xl font-semibold text-pink-900">
                        Tidak Ada Hasil Pencarian
                    </section>
                </div>
            );
        }
        return (
            <div className="flex flex-col md:p-8 space-y-8">
                <section className="mb-0 md:mb-6">
                    <h2 className="p-2 text-lg md:text-2xl font-semibold text-gray-500 hover:text-gray-900 transition-all duration-300">
                        Hasil dari Search "{query}"...
                    </h2>
                </section>
                {results.users.length ? (
                    <section className='flex flex-col gap-6 mb-0 md:mb-6'>
                        <h2 className="p-2 text-lg md:text-2xl font-semibold text-blue-900 hover:text-gray-900 transition-all duration-300 mb-0 md:mb-4">
                            Orang
                        </h2>
                        <div className="flex flex-wrap gap-2 md:gap-2 xl:gap-4">
                            {results.users.map(user => (
                                <section key={user.id}
                                         className="flex flex-col justify-start md:justify-center  w-full sm:max-w-[calc(50%-20px)] xl:max-w-[calc(33%-20px)]
                                         2xl:max-w-[calc(25%-20px)] md:p-6 rounded-lg  shadow hover:-translate-y-1 transition-all duration-300 border">
                                    <Link to={`/profile/${user.id}`}
                                          className="flex flex-row md:flex-col justify-start xl:justify-between gap-2 my-2 sm:p-2 w-full">
                                        <img
                                            src={user.profile_image}
                                            alt={user.name}
                                            className="w-16 h-16 md:w-32 md:h-32 md:mx-auto md:mb-4 rounded-full transition-all duration-300 hover:scale-105 aspect-square shadow-md "/>
                                        <span
                                            className="border-[0.5px] border-dashed border-gray-600 opacity-20"></span>
                                        <div className="space-y-4 divide-y divide-gray-700 w-full ">
                                            <div className="flex flex-col">
                                                <h2 className="text-base md:text-lg font-semibold text-blue-900">{user.name}</h2>
                                                <p className="text-sm md:text-base text-gray-600">{user.bio || "Halo Kumpulin Lover"}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </section>
                            ))}
                        </div>
                    </section>
                ) : null}
                {results.events.length ? (
                    <section className='flex flex-col gap-6 mb-0 md:mb-6'>
                        <h2 className="text-2xl font-semibold text-blue-900 hover:text-gray-900 transition-all duration-300 mb-2 md:mb-4">
                            Acara
                        </h2>
                        <div className="flex flex-wrap gap-2 md:gap-2 xl:gap-4">
                            {results.events.map(event => (

                                <SearchEventCard key={event.id} event={event}/>
                            ))}
                        </div>
                    </section>
                ) : null}
            </div>
        );
    }

    return (
        <Starter Content={renderContent()}/>
    );
}

export default Search;
