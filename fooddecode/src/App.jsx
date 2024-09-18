import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './comps/ContextReducer'; 
import ReactDom from 'react-dom/client';
import './App.css'
// import './index.css'
import { Navbar } from './comps/Navbar'
import { Home } from "./screen/Home";
import { Login } from './screen/Login';
import { SingIn } from './screen/SingIn';
import  Cart  from './screen/Cart';
import { MyOrders } from './screen/MyOrders';
import "bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Footer } from './comps/Footer';
// require('dotenv').config();

function App() {
//   main().then(()=>{
//     console.log("connected to dataBase");
// }).catch((err) =>{
//     console.log(err);
// });
  return (
    <>
     <CartProvider>

  <Router>
  <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/SingIn" element={<SingIn/>}/>
      <Route path="/MyCart" element={<Cart/>}/>
      <Route path="/MyOrders" element={<MyOrders/>}/>

    </Routes>
    <Footer/>
  </Router>
     </CartProvider>
  </>
  )
}

export default App
