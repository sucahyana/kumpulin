import React from 'react';
import FormAuth from "../../components/organisms/FormAuth.jsx";

const Login = () => {
    const fields = [
        { name: 'contact', label: 'Contact', placeholder: 'Masukan Email Atau Telpon', type: 'text' },
        { name: 'password', label: 'Password', placeholder: 'Masukan Password', type: 'password' }
    ];
    const buttonName = 'Sign In';
    const headers = {
        caption: 'Masuk ke Akun Kamu',
        validateUserAccount: "Belum memiliki akun? ",
        validateUserRedirect: "Daftar Sekarang"
    };
    const links = { ValidateUserRedirect: '/register' };

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">
            <div className="w-full sm:w-[400px] md:w-[900px]">
                <FormAuth fields={fields} buttonName={buttonName} headers={headers} links={links} />
            </div>
        </div>
    );
};

export default Login;
