import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from './components/Intro'
import About from './components/About'
import Contact from './components/Contact'
import Cart from './components/Cart';
import Login from './components/Login'
import Category from './components/Category';
import Productshow from './components/Productshow';

function App() {


  return (
    <>
      <HashRouter >
        <Routes>
          <Route path="/" element={<Navbar />}>
            {/* <Route  element={<Login />} /> */}
            <Route index path='home' element={<Intro />} />
            <Route path="category/:name" element={<Category />} />
            <Route path="category/:name/:id" element={<Productshow />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </HashRouter>


    </>
  )
}

export default App
