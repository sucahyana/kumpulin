import React, { useEffect, useState, useImperativeHandle } from 'react';
import { Button } from 'primereact/button';
import {InputTextarea} from "primereact/inputtextarea";
import {InputText} from "primereact/inputtext";

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
        },
    }));

    return (
        <div className="flex flex-col gap-2 md:gap-4 text-gray-800">
            {/* Kategori */}
            <div className="flex flex-col ">
                <label className="font-semibold text-base md:text-lg">Kategori</label>
                <div className="text-sm text-blue-500 italic text-opacity-50">
                    Pilih kategori acara Anda.
                </div>
                <div className="flex gap-1 md:gap-2 flex-wrap ">
                    <div className="p-col">
                        <Button label="Si Kece Pre-Order" className={`font-poppins text-sm shadow ${category === 'pre-order' ? 'p-button-info font-medium' : ' bg-blue-600 opacity-60'}`} onClick={() => handleCategoryClick('pre-order')} />
                    </div>
                    <div className="p-col">
                        <Button label="Arisan Canggih" className={`font-poppins text-sm shadow ${category === 'arisan' ? 'p-button-info font-medium' : 'bg-blue-600 opacity-60'}`} onClick={() => handleCategoryClick('arisan')} />
                    </div>
                    <div className="p-col">
                        <Button label="Healing Lah" className={`font-poppins text-sm shadow ${category === 'travel' ? 'p-button-info font-medium' : 'bg-blue-600 opacity-60'}`} onClick={() => handleCategoryClick('travel')} />
                    </div>
                </div>
            </div>

            {/* Nama Topik */}
            <div className="flex flex-col">
                <label className="font-semibold text-base md:text-lg" htmlFor="topicName">
                    Nama Topik
                </label>
                <div className="text-sm text-blue-500 italic text-opacity-50">
                    Berikan nama untuk topik acara Anda.
                </div>
                <InputText id="namaTopik" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            {/* Deskripsi */}
            <div className="flex flex-col">
                <label className="font-semibold text-base md:text-lg" htmlFor="description">
                    Deskripsi
                </label>
                <div className="text-sm text-blue-500 italic text-opacity-50">
                    Jelaskan detail acara Anda.
                </div>
                <InputTextarea id="deskripsi" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} cols={30} />
            </div>
        </div>
    );
});

export default StepOneContent;
