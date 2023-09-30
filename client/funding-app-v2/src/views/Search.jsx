import React from 'react';
import Starter from "../components/userComponent/Starter.jsx";
import SearchEventCard from "../components/Search/SearchEventCard.jsx";
import { Link, useLocation } from 'react-router-dom';
import Loader from "../components/Loader.jsx";

const Search = () => {
    const location = useLocation();
    const results = location.state?.results || { users: [], events: [] };
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
            <div className="flex flex-col p-8 space-y-8">
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-500 hover:text-gray-900 transition-all duration-300">
                        Hasil dari Search "{query}"...
                    </h2>
                </section>
                {results.users.length ? (
                    <section className='flex flex-col gap-6 mb-6'>
                        <h2 className="text-2xl font-semibold text-blue-900 hover:text-gray-900 transition-all duration-300 mb-4">
                            Orang
                        </h2>
                        <div className="flex flex-wrap gap-6">
                            {results.users.map(user => (
                                <section key={user.id}
                                         className="flex flex-col justify-center max-w-xs p-6 rounded-lg sm:px-12 shadow-md hover:-translate-y-1 transition-all duration-300 border">
                                    <Link to={`/profile/${user.id}`}><img src={user.profile_image} alt={user.name}
                                                                          className="w-32 h-32 mx-auto mb-4 rounded-full transition-all duration-300 hover:scale-105 aspect-square shadow-md"/>
                                        <div className="space-y-4 text-center divide-y divide-gray-700">
                                            <div className="py-2 space-y-1">
                                                <h2 className="text-lg font-semibold text-blue-900">{user.name}</h2>
                                                <p className="text-base text-gray-400">{user.bio || "Halo Kumpulin Lover"}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </section>
                            ))}
                        </div>
                    </section>
                ) : null}
                {results.events.length ? (
                    <section className='flex flex-col gap-6'>
                        <h2 className="text-2xl font-semibold text-blue-900 hover:text-gray-900 transition-all duration-300 mb-4">
                            Acara
                        </h2>
                        {results.events.map(event => (
                            <SearchEventCard key={event.id} event={event}/>
                        ))}
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
