import React, { useEffect, useState } from 'react';
import { registerUser, apiService } from '../../services/apiService.jsx';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { fetchUserData, setAuth } from "../../store/actions/user.js";
import ButtonSubmit from '../atoms/ButtonSubmit.jsx';
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { notifyError, notifySuccess, notifyLoading, stopLoading } from "../toast.jsx";

const FormAuth = ({ fields, buttonName, headers, links }) => {
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSuccess = (message) => {
        notifySuccess(message);
        navigate('/');
    };

    const handleError = (error) => {
        console.error('Login/Registration error:', error);
        if (error.response && error.response.status === 422) {
            const errorData = error.response.data.errors;
            const newError = {};

            for (const field in errorData) {
                if (formData[field]) {
                    newError[field] = errorData[field][0];
                }
            }

            setError(newError);
            const errorMessage = error.response.data.message;

            if (buttonName === 'Daftar') {
                notifyError(`Registrasi gagal: ${errorMessage}`);
            } else {
                notifyError(`Login gagal: ${errorMessage}`);
            }
        } else {
            if (buttonName === 'Daftar') {
                notifyError('Registrasi gagal. Terjadi masalah pada server.');
            } else {
                notifyError('Login gagal. Terjadi masalah pada server.');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError({});

        // Menambahkan notifikasi loading
        notifyLoading('Memproses...');

        if (!validateForm()) {
            setIsLoading(false);
            stopLoading();
            return;
        }

        try {
            if (buttonName === 'Daftar') {
                const response = await registerUser(formData.name, formData.contact, formData.gender, formData.password, formData.password_confirmation);
                if (response.success) {
                    handleSuccess('Registrasi berhasil!');
                }
            } else {
                const response = await apiService.post('/auth/login', {
                    contact: formData.contact,
                    password: formData.password
                });
                const token = response.data.data.token;
                dispatch(setAuth({ token }));
                dispatch(fetchUserData());

                handleSuccess('Login berhasil!');
            }
        } catch (error) {
            handleError(error);
        }

        setIsLoading(false);
        stopLoading();
    };


    const validateForm = () => {
        const newError = {};

        for (const field of fields) {
            if (!formData[field.name] || formData[field.name].trim() === '') {
                newError[field.name] = `${field.label} tidak boleh kosong`;
            }
        }

        setError(newError);
        return Object.keys(newError).length === 0;
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full p-4 sm:w-[400px] lg:w-[500px] xl:w-[600px] bg-white rounded-lg drop-shadow-xl py-9">
                <form className="w-full px-4 sm:px-0 sm:w-[80%] mx-auto py-3 flex flex-col items-center gap-4" onSubmit={handleSubmit}>
                    <img
                        className="w-16 h-16 rounded-lg mb-0 bg-blue-500"
                        alt="Logo"
                        src={logo}
                    />
                    <h1 className="text-3xl font-bold text-gray-900 text-center -mb-3">
                        Kumpulin Apapun
                    </h1>
                    <h1 className="text-lg font-medium text-gray-500 text-center">
                        {headers.caption}
                    </h1>
                    {fields.map((field) => (
                        <div className="w-full mb-4" key={field.name}>
                            <label className="block text-base font-medium mb-1 text-gray-800">{field.label}</label>
                            <input
                                type={field.type}
                                className="w-full ring-1 ring-gray-200 rounded-lg p-2.5"
                                placeholder={field.placeholder}
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={handleInputChange}
                            />
                            {error[field.name] && <p className="mt-1 text-sm text-pink-500">{error[field.name]}</p>}
                        </div>
                    ))}
                    <ButtonSubmit text={buttonName} isLoading={isLoading} />
                    <div className="flex items-center justify-between text-base text-gray-500 gap-2 sm:gap-7 mt-4">
                        <div className="flex items-center">
                            <input type="checkbox" id="remember" className="mr-2" />
                            <label htmlFor="remember">Ingat Saya</label>
                        </div>
                        <Link to="#" className="text-right text-info-500">&emsp;&emsp;&emsp;Lupa Password?</Link>
                    </div>
                    <p className="mt-1 text-base text-center text-gray-500">
                        {headers.validateUserAccount}
                        <Link to={links.ValidateUserRedirect} className="text-info-500">{headers.validateUserRedirect}</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default FormAuth;
