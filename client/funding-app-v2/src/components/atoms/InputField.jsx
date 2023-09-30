import React from 'react';
import { InputText } from 'primereact/inputtext';

const InputField = ({ label, type, placeholder, name, value, onChange, error }) => {
    return (
        <div className="w-full mb-4">
            <label className="block text-sm md:text-base lg:text-lg font-medium mb-1 text-gray-800">
                {label}
            </label>
            <InputText
                type={type}
                className={`w-full ring-1 ring-gray-200 rounded-lg p-2.5 text-sm md:text-base lg:text-lg ${
                    error ? 'p-inputtext-invalid' : ''
                }`}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
            {error && <p className="mt-1 text-sm text-pink-500">{error}</p>}
        </div>
    );
};

export default InputField;
