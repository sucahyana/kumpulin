import React from 'react';
import { MutatingDots } from 'react-loader-spinner';

const Loader = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="p-6 rounded-lg">
            <MutatingDots
                height={100}
                width={100}
                color="#3B82F6"
                secondaryColor="#BFDBFE"
                radius={12.5}
                ariaLabel="mutating-dots-loading"
            />
        </div>
    </div>
);

export default Loader;
