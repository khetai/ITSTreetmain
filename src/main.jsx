import React from 'react'
import ReactDOM from 'react-dom/client'
import './i18n';
import App from './App'
import { Provider } from "react-redux";
import store from "./contexts/Store";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <Provider store={store}>
        <App />
    </Provider>
  </React.Fragment>,
)
