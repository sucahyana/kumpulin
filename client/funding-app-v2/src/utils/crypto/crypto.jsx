import CryptoJS from 'crypto-js';

const SECRET_KEY = 'r4Eg7Z9mARfZWsDRRsMXpoxFXksekegn';

export const encryptToken = (token) => {
    const ciphertext = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
    return ciphertext;
}

export const decryptToken = (encryptedToken) => {
    try {
        if (!encryptedToken) {
            // Token kosong atau null, kembalikan null atau tindakan yang sesuai
            return null;
        }

        const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);

        if (!decrypted) {
            // Token tidak dapat didekripsi, kembalikan null atau tindakan yang sesuai
            return null;
        }

        return decrypted;
    } catch (error) {
        console.error('Error decrypting token:', error);
        return null; // Atau tindakan lain yang sesuai untuk aplikasi Anda
    }
}
