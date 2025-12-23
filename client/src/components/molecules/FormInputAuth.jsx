import React from 'react';
import InputField from '../atoms/InputField.jsx';

const FormInput = ({ label, type, placeholder, name, value, onChange, error }) => {
    return (
        <div className="w-full mb-4">
            <label className="block text-base font-medium mb-1 text-gray-800">{label}</label>
            <InputField
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                error={error}
            />
            {error && <p className="mt-1 text-sm text-pink-500">{error}</p>}
        </div>
    );
};

export default FormInput;
