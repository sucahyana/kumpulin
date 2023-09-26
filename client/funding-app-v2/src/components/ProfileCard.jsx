import React from 'react';
import { useSelector } from 'react-redux';
import { Skeleton } from 'primereact/skeleton';
import { Image } from 'primereact/image';

const ProfileCard = ({ user }) => {
    if (!user) {
        return (
            <div className="leading-tight bg-gray-lighter justify-center items-center">
                <div className="w-full mb-8 mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
                    <div className="card">
                        <div className="border-round border-1 surface-border p-4 surface-card">
                            <Skeleton width="100%" height="280px" />
                            <div className="flex justify-content-between mt-3 mb-8" />
                            <div className="flex mb-3">
                                <Skeleton shape="circle" size="4rem" className="mr-2" />
                                <div>
                                    <Skeleton width="10rem" className="mb-2" />
                                    <Skeleton width="5rem" className="mb-2" />
                                    <Skeleton height=".5rem" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const maleDefaultImage = 'https://res.cloudinary.com/accuworks/image/upload/v1692896315/funding-app/User/default/default_pria_v2.jpg';
    const femaleDefaultImage = 'https://res.cloudinary.com/accuworks/image/upload/v1692896315/funding-app/User/default/default_wanita_v2.jpg';

    const profileImage = user.profile_image ||
        (user.gender === 'male' ? maleDefaultImage :
            (user.gender === 'female' ? femaleDefaultImage : maleDefaultImage));

    const coverImage = user.cover_image || 'https://res.cloudinary.com/accuworks/image/upload/c_crop,q_100,w_1520,x_0/v1692896740/funding-app/User/default/default_cover.jpg';

    return (
        <div className="leading-tight bg-gray-lighter justify-center items-center">
            <div className="w-full mb-8 mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="w-[100%] h-[280px] overflow-hidden shadow-inner relative">
                    <Image
                        src={coverImage}
                        alt={`Cover Profile ${user.name}`}
                        className="h-[280px] object-cover rounded-t-lg transition-transform duration-300 hover:scale-105 hid"
                        preview
                        crossOrigin={"anonymous"}
                        pt={{
                            zoomInButton: {className: 'hidden'},
                            zoomOutButton: {className: 'hidden'},
                            rotateLeftButton: {className: 'hidden'},
                            rotateRightButton: {className: 'hidden'},
                        }}
                    />
                </div>
                <div className="border-b px-8">
                    <div className="text-center sm:text-left sm:flex mb-4 ">
                        <Image
                            className="h-40 w-40 rounded-full border-4 border-blue-300 -mt-16 mr-4 transition-transform duration-300 hover:scale-105"
                            src={profileImage}
                            alt={`Photo Profile ${user.name}`}
                            preview
                            pt={{
                                root: { className: 'p-0 m-0 overflow-hidden' },
                                image: { className: 'rounded-full w-full h-full object-cover' }
                            }}
                        />
                        <div className="py-12 text-gray-700">
                            <h1 className="font-semibold text-3xl mb-2 text-center sm:text-left">{user.name || 'Nama Pengguna'}</h1>
                            <div className="text-lg font-light text-center sm:text-left text-gray-600">
                                {user.bio || 'Aku adalah Pengguna baru Aplikasi Kumpulin'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
