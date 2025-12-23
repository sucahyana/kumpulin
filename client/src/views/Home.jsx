import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Starter from '../components/userComponent/Starter.jsx';
import { Paginator } from 'primereact/paginator';
import CardFeed from '../components/molecules/CardFeed.jsx';
import FeaturedCard from '../components/molecules/FeaturedCard.jsx';
import AdsGalleria from '../components/molecules/AdsGalleria.jsx';
import { getAllEventsWithPagination } from '../services/apiService.jsx';
import Loader from "../components/Loader.jsx";

const Home = () => {
    const userEvents = useSelector(state => state.user?.data?.UserEvents);
    const userData = useSelector(state => state.user?.data?.user);

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [eventData, setEventData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchRecommendedEvents = async (page) => {
            try {
                const response = await getAllEventsWithPagination(page);
                setEventData(response.data.data);
                setTotalRecords(response.data.totalRecords);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching recommended events:', error);
            }
        };

        fetchRecommendedEvents(currentPage);
    }, [currentPage]);

    const onPageChange = (event) => {
        setCurrentPage(event.page + 1);
        setFirst(event.first);
        setRows(event.rows);
    };

    const carousel = <AdsGalleria />;

    function renderContent() {
        return (
            <div className="flex flex-col space-y-6 sm:space-y-16">
                {carousel}
                <section>
                    <h2 className="text-xl p-2 sm:text-2xl font-semibold text-gray-700 hover:text-gray-900 transition-all duration-300">
                        Ini Funding Kamu Loh!
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-y-4 justify-around">
                        {userEvents?.length > 0 ? (
                            userEvents?.map((event) => (
                                <CardFeed key={event.id} event={event} userData={userData} />
                            ))
                        ) : (
                            <div className="flex min-h-full p-6 sm:p-16 max-w-2/3 bg-white justify-center items-center rounded-lg shadow-lg">
                                <h1 className="animate-typing p-2   overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-base sm:text-2xl text-blue-500 font-bold">
                                    Kamu Belum ada Funding :(
                                </h1>
                            </div>
                        )}
                    </div>
                </section>

                <section>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 hover:text-gray-900 transition-all duration-300">
                        Rekomendasi Acara
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-y-4 justify-around ">
                        {eventData?.map((event) => (
                            <FeaturedCard key={event.id} data={event} />
                        ))}
                    </div>
                    <div className="mt-4 w-full flex justify-center">
                        <Paginator
                            first={first}
                            rows={rows}
                            totalRecords={totalRecords}
                            onPageChange={onPageChange}
                            className="transition-all hover:text-blue-500 shadow-sm p-2 rounded-lg"
                        />
                    </div>
                </section>
            </div>
        );
    }

    return (
        <Starter Content={loading ? <Loader /> : renderContent()} />
    );
};

export default Home;
