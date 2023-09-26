import React from 'react';
import InputField from '../atoms/InputField';
import ButtonSubmit from '../atoms/ButtonSubmit';

const SignInForm = ({ fields, error, formData, handleInputChange, handleSubmit, isLoading, buttonName }) => (
    <form className="w-[358px] mx-auto py-3 flex flex-col items-center gap-4" onSubmit={handleSubmit}>
        {fields.map((field) => (
            <InputField
                key={field.name}
                type={field.type}
                placeholder={field.placeholder}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleInputChange}
                label={field.label}
                error={error[field.name]}
            />
        ))}
        <ButtonSubmit text={buttonName} isLoading={isLoading} />
    </form>
);

export default SignInForm;
