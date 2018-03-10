import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import App from './App';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App storage={store}/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
