import React from 'react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import store from './app/store';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);


root.render(
        <Router>
            <Provider store={store}>
                <App />
            </Provider>
        </Router>
);
