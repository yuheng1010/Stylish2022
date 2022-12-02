import React,{ useEffect, useState,Switch  } from 'react';
import ReactDOM from 'react-dom/client';
import './All.css';
import Header from './Component/Header';
// import Scroll from './Scroll.js';
import Footer from './Component/Footer';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

import reportWebVitals from './reportWebVitals.js';
var cartNumber;
function addCart(cartN){
  console.log('child2parent&parent2child')
  console.log(cartN) 
}

console.log(cartNumber)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>

  <div>
    <Router>
    <Header cart={addCart}/>
    <Footer />
    </Router>
    </div>
  // </React.StrictMode> 
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
