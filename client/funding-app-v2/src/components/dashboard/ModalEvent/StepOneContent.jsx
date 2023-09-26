import React, { useEffect, useState, useImperativeHandle } from 'react';

const StepOneContent = React.forwardRef(({ onNextStep, currentData }, ref) => {
    const [title, setTitle] = useState(currentData.title || '');
    const [description, setDescription] = useState(currentData.description || '');
    const [category, setCategory] = useState(currentData.category || '');

    useEffect(() => {
        setTitle(currentData.title || '');
        setDescription(currentData.description || '');
        setCategory(currentData.category || '');
    }, [currentData]);

    const handleCategoryClick = (selectedCategory) => {
        setCategory(selectedCategory);
    };

    useImperativeHandle(ref, () => ({
        getData: () => {
            return { title, description, category };
        }
    }));

    return (
        <div className="flex flex-col items-start justify-start gap-6 text-gray-800">
            <div className="flex flex-col items-start justify-start">
                <label className="relative leading-[24px] font-semibold inline-block w-[120px]">
                    Kategori
                </label>
                <div className="relative text-sm leading-[20px] text-blue-500 italic text-opacity-50">
                    Pilih kategori acara Anda.
                </div>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:gap-8">
                    <button
                        className={`rounded-md ${
                            category === 'pre-order'
                                ? 'p-2 bg-blue-500 shadow-md font-medium text-lg text-blue-50 border-4 border-blue-200'
                                : 'p-2 bg-blue-300 shadow-md font-medium text-lg text-blue-50'
                        }`}
                        onClick={() => handleCategoryClick('pre-order')}
                    >
                        Si Kece Pre-Order
                    </button>
                    <button
                        className={`rounded-md ${
                            category === 'arisan'
                                ? 'p-2 bg-blue-500 shadow-md font-medium text-lg text-blue-50 border-4 border-blue-200'
                                : 'p-2 bg-blue-300 shadow-md font-medium text-lg text-blue-50'
                        }`}
                        onClick={() => handleCategoryClick('arisan')}
                    >
                        Arisan Canggih
                    </button>
                    <button
                        className={`rounded-md ${
                            category === 'travel'
                                ? 'p-2 bg-blue-500 shadow-md font-medium text-lg text-blue-50 border-4 border-blue-200'
                                : 'p-2 bg-blue-300 shadow-md font-medium text-lg text-blue-50'
                        }`}
                        onClick={() => handleCategoryClick('travel')}
                    >
                        Healing Lah
                    </button>
                </div>
            </div>

            {/* Bagian Nama Topik */}
            <div className="flex flex-col items-start justify-start mt-4">
                <label className="relative leading-[24px] font-semibold inline-block w-[120px]" htmlFor="topicName">
                    Nama Topik
                </label>
                <div className="relative text-sm leading-[20px] text-blue-500 italic text-opacity-50">
                    Berikan nama untuk topik acara Anda.
                </div>
                <input
                    type="text"
                    id="title"
                    className="mt-2 border rounded p-2 w-full sm:w-[600px]"
                    value={title}
                    placeholder="Silahkan Isi Judul/Nama Topik Event Anda"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            {/* Bagian Deskripsi */}
            <div className="flex flex-col items-start justify-start mt-4">
                <label className="relative leading-[24px] font-medium inline-block w-[120px]" htmlFor="description">
                    Deskripsi
                </label>
                <div className="relative text-sm leading-[20px] text-blue-500 italic text-opacity-50">
                    Jelaskan detail acara Anda.
                </div>
                <textarea
                    id="description"
                    className="mt-2 border rounded p-2 w-full sm:w-[600px] h-[120px]"
                    value={description}
                    placeholder="Silahkan isi dari Deskripsi Acara anda dengan Sedetail detailnya"
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
        </div>
    );
});

export default StepOneContent;
