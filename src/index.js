// import { dblClick } from '@testing-library/user-event/dist/click';
// import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

// import { Header } from './AppHeader/AppHeader';

import './index.css';
import App from './components/App/app';
import { ProductPage } from './pages/ProductPage/product-page';
import Spinner from './components/Spinner/Spinner';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ProductPage/>)

