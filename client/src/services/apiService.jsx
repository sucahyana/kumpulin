import axios from 'axios';
import store from "../store/index.jsx";

export const apiService = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});



apiService.interceptors.request.use(
    (config) => {
        const token = store.getState().user.token;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);




export const registerUser = async (name, contact,gender, password, password_confirmation) => {
    try {
        const response = await apiService.post('/auth/register', {name, contact ,gender , password, password_confirmation});
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const changePassword = async ({ contact, old_password, new_password, new_password_confirmation }) => {
    try {
        const response = await apiService.post('/auth/changePassword', {
            contact,
            old_password,
            new_password,
            new_password_confirmation
        });
        return response.data;
    } catch (error) {

        throw error;
    }
}


export const updateUserBasicProfile = async (data) => {
    try {
        const response = await apiService.put('/user/basic', JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const updateContactProfile = async (data) => {
    try {
        const response = await apiService.put('/user/contact', JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const uploadProfilePhoto = async (profileImage) => {
    try {
        const formData = new FormData();
        formData.append('profile_image', profileImage.get('profile_image'));

        const response = await apiService.post('/user/photo', formData, );

        return response.data;
    } catch (error) {
        throw error;
    }
};




export const uploadProfileCover = async (cover) => {
    try {
        const formData = new FormData();
        formData.append('cover_image', cover.get('cover_image'));

        const response = await apiService.post('/user/cover', formData, );

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const searchUser = async (query) => {
    const response = await apiService.get('/user/search', { params: { q: query } });
    return response.data;
};


export const createEvent = async (eventData) => {
    try {
        const formData = new FormData();


        Object.keys(eventData).forEach((key) => {
            if (key === 'media') {

                const mediaFiles = eventData[key];
                mediaFiles.forEach((mediaItem, index) => {
                    formData.append(`media[${index}][media_category]`, mediaItem.media_category);
                    formData.append(`media[${index}][media]`, mediaItem.media);
                });
            } else {
                formData.append(key, eventData[key]);
            }
        });

        const response = await apiService.post('/event', formData);

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getAllEventsWithPagination = async (currentPage) => {
    if (typeof currentPage !== 'number' || currentPage <= 0) {
        throw new Error('Invalid page number');
    }

    const ENDPOINT_URL = '/event';

    try {
        const response = await apiService.get(ENDPOINT_URL, {
            params: { page: currentPage }
        });

        if (response.status !== 200) {
            throw new Error(`Failed to fetch events, status: ${response.status}`);
        }

        return response.data;
    } catch (error) {
        // Handle specific error codes as needed
        // e.g., if (error.response.status === 404) { ... }
        throw error;
    }
};

export const UserProfile = async (idUser)=> {
    const response = await apiService.get(`/user/${idUser}`);
    return response.data;

}
export const updateEvent = async (eventCode, eventData) => {
    try {
        const formData = new FormData();

        Object.keys(eventData).forEach((key) => {
            if (key === 'media') {
                const selectedFiles = eventData[key];
                selectedFiles.forEach((mediaItem, index) => {
                    formData.append(`media[${index}][media_category]`, mediaItem.media_category);
                    formData.append(`media[${index}][media]`, mediaItem.media, mediaItem.media.name);
                });
            }
            else if (key === 'deletedMedia') {
                eventData[key].forEach((mediaItem, index) => {
                    formData.append(`deletedMedia[]`, mediaItem.deletedMedia);
                });
            } else if (key === 'reorderedMedia') {
                eventData[key].forEach((mediaUrl) => {
                    if (mediaUrl) {
                        formData.append(`reorderedMedia[]`, mediaUrl);
                    }
                });
            }
            else {
                formData.append(key, eventData[key]);
            }
        });



        const response = await apiService.post(`/event/${eventCode}/code`, formData);

        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const shareEvent = async (eventId) => {
    const response = await apiService.get(`/event/${eventId}/share`);
    return response.data;
};

export const getCode = async (eventId) => {
    const response = await apiService.get(`/event/${eventId}/code`);
    return response.data;
};

export const registerWithCode = async ({ code, description }) => {
    try {
        const response = await apiService.post('/event/registerWithCode', {
            code_event: code,
            description: description
        });
        return response;
    } catch (error) {
        return error.response;
    }
};


export const getEventByCode = async (eventCode) => {
    try {
        const response = await apiService.get(`/event/${eventCode}/code`); // Make sure the endpoint path is correct
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const addParticipantToEvent = async (eventCode, participantData) => {
    try {
        const response = await apiService.post(`/event/${eventCode}/participants`, participantData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteParticipantFromEvent = async (eventCode, participantId) => {
    try {
        const response = await apiService.delete(`/event/${eventCode}/participants/${participantId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const approveEventParticipant = async (eventCode, participantId) => {
    try {
        const response = await apiService.put(`/event/${eventCode}/participants/approve/${participantId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const rejectEventParticipant = async (eventCode, participantId) => {
    try {
        const response = await apiService.put(`/event/${eventCode}/participants/reject/${participantId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const updatePaymentStatus = async (eventCode, participantId, amount,description) => {
    try {
        const response = await apiService.post(`/event/${eventCode}/participants/updatePaymentStatus/${participantId}`, {
            payment_amount: amount,
            description: description
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const requestJoinEvent = async (eventCode,description) => {
    try {
        const response = await apiService.put(`/event/${eventCode}/participants/join`,{
            description : description
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getEventHistory = async (eventId) => {
    const response = await apiService.get(`/event/${eventId}/history`);
    return response.data;
};

export const search = async (query) => {
    const response = await apiService.get('/search', { params: { q: query } });
    return response.data;
};

export default apiService;