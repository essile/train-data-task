import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import NavigationBar from './NavigationBar';
// import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <div>
        <NavigationBar />
        <br />
        <br />
        <App />
    </div>
    , document.getElementById('root'));

serviceWorker.unregister();
