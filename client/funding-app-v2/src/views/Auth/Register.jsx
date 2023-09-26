import React from 'react';
import FormAuth from "../../components/organisms/FormAuth.jsx"; // Pastikan path ini sesuai dengan lokasi FormAuth

const Register = () => {
    const fields = [
        { name: 'name', label: 'Nama', placeholder: 'Masukan Nama Kamu', type: 'text' },
        { name: 'contact', label: 'Contact', placeholder: 'Masukan Email Atau Telpon', type: 'text' },
        { name: 'gender', label: 'Gender', placeholder: 'Jenis kelamin anda', type: 'text' },
        { name: 'password', label: 'Password', placeholder: 'Masukan Password', type: 'password' },
        { name: 'password_confirmation', label: 'Konfirmasi Password', placeholder: 'Masukan Konfirmasi Password', type: 'password' }
    ];
    const buttonName = 'Daftar';
    const headers = {
        caption: 'Mulai Dengan Mudah',
        validateUserAccount: "Sudah Memiliki Akun? ",
        validateUserRedirect: "Masuk"
    };
    const links = { ValidateUserRedirect: '/login' };

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">
            <FormAuth fields={fields} buttonName={buttonName} headers={headers} links={links} />
        </div>
    );
};

export default Register;
