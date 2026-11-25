import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Signup from './auth/Signup.jsx'
import Login from './auth/Login.jsx'
import CreateProduct from './products/CreateProduct.jsx'
import ProductList from './products/ProductList.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/addProduct" element={<CreateProduct />} />
      <Route path="/products" element = {<ProductList/> } />
    </Routes>
  </BrowserRouter>
)