import React, { useState, forwardRef, useImperativeHandle } from 'react';
import imageCompression from 'browser-image-compression';


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
        <div className="overflow-y-auto max-h-96 p-4">
            <header className="border-dashed w-[500px] h-[200px] border-2 border-gray-400 py-8 flex flex-col justify-center items-center">
                <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                    <span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
                </p>
                <input
                    id="hidden-input"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileInputChange}
                />

                <button
                    id="button"
                    className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                    onClick={() => document.getElementById('hidden-input').click()}
                >
                    Upload a file
                </button>
            </header>
            <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">Uploaded Files</h1>
            <ul id="gallery" className="flex flex-col space-y-2">
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
