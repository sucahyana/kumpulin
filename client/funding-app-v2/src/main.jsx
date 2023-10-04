import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Modal from "react-modal";
import {Toaster} from "react-hot-toast";

Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
            <App/>
        <Toaster/>
    </React.StrictMode>,
)
