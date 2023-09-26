import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/index.jsx';
import { Provider } from "react-redux";
import store from "./store/index.jsx";

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes />
            </Router>
        </Provider>
    );
};

export default App;
