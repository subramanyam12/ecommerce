import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Store } from './components/Redux/Store.jsx'
import {Provider} from 'react-redux'
import {CookiesProvider} from 'react-cookie'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CookiesProvider>
    <Provider store={Store}>
    <App />
    </Provider>
    </CookiesProvider>
  </React.StrictMode>,
)
 