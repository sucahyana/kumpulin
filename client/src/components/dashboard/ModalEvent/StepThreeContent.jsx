import React, { useState, forwardRef, useImperativeHandle } from 'react';
import imageCompression from 'browser-image-compression';
import {Button} from "primereact/button";


const StepThreeContent = forwardRef((props, ref) => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const addFile = (file) => {
        setSelectedFiles((prevFiles) => [...prevFiles, file]);
    };

    const removeFile = (index) => {
        setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const getMedia = () => {
        const mediaData = selectedFiles.map((file) => ({
            media_category: 'image',
            media: file,
        }));
        return mediaData;
    };



    useImperativeHandle(ref, () => ({
        getMedia: getMedia,
    }));

    const handleFileInputChange = async (e) => {
        const files = e.target.files;

        for (const file of files) {
            try {

                const compressedFile = await imageCompression(file, { maxSizeMB: 2 }); // You can adjust the maxSizeMB as needed

                addFile(compressedFile);
            } catch (error) {
                console.error('Error compressing image:', error);
                addFile(file);

            }
        }
    };


    return (
        <div className="overflow-y-auto max-h-96 p-2 md:p-4">
            <header className="w-full h-[30vh] border-2 border-dashed border-gray-400 rounded p-8 flex flex-col justify-center items-center">
                <p className="mb-3 font-semibold text-gray-900 text-center">
                    <span>Seret dan letakkan </span>&nbsp;<span>file Anda di mana saja atau</span>
                </p>
                <label htmlFor="hidden-input" className="w-full">
                    <input
                        id="hidden-input"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileInputChange}
                    />
                    <Button
                        label={"From Storage"}
                        id="button"
                        className="mt-2 rounded w-full bg-blue-400 font-poppins"
                        onClick={() => document.getElementById('hidden-input').click()}
                    >
                    </Button>
                </label>
            </header>
            <ul id="gallery" className="flex flex-col mt-4 space-y-2">
                {selectedFiles.map((file, index) => (
                    <li key={index} className="flex items-center space-x-2">

                        <div className="text-gray-600">{index + 1}.</div>
                        <div className="flex-1">
                            <article className="flex items-center space-x-2 py-2 px-4 rounded-md bg-gray-100">
                                <div className="flex items-center space-x-2">
                                    <img
                                        src={URL.createObjectURL(file)} // Use createObjectURL to generate a preview URL
                                        alt={`Preview-${index}`}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                    <h1 className="flex-1">{file.name}</h1>
                                </div>
                                <button
                                    className="delete focus:outline-none hover:bg-gray-300 p-1 rounded-md text-gray-800"
                                    onClick={() => removeFile(index)}
                                >
                                    <svg
                                        className="fill-current w-4 h-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                                        />
                                    </svg>
                                </button>
                            </article>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default StepThreeContent;
