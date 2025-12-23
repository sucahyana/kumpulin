import React from 'react';
import Modal from 'react-modal';

const DeleteModal = ({ isOpen, onRequestClose, onDelete }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Delete Participant"
        >
            <h2>Hapus Peserta</h2>
            <p>Apakah Anda yakin ingin menghapus peserta ini?</p>
            <button onClick={onDelete}>Hapus</button>
            <button onClick={onRequestClose}>Batal</button>
        </Modal>
    );
};

export default DeleteModal;
