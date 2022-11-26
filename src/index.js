// import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/app';
import { BrowserRouter } from 'react-router-dom';
// import { ProductPage } from './pages/ProductPage/product-page';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <App/>
    </BrowserRouter>
);

