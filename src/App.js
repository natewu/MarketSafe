import "./global.scss";

import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Account from "./routes/Account";
import { Collections } from "./routes/Collections";
import { Dashboard } from "./routes/Dashboard";
import Home from "./routes/Home";
import NavBar from "./Nav";
import ProductPage from "./routes/ProductPage";
import Products from "./routes/Products";
import React from "react";
import axios from "axios";
import styles from "./App.module.scss";
import Login from "./routes/Login"; 

function App() {
  const [products, changeProducts] = useState([]);
  const [collections, changeCollections] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // disable text select
    const noSelectElements = document.querySelectorAll(".no-select");

    noSelectElements.forEach((element) => {
      element.style.webkitUserSelect = "none";
      element.style.mozUserSelect = "none";
      element.style.msUserSelect = "none";
      element.style.userSelect = "none";
    });
    axios.get("http://127.0.0.1:5000/api/products").then((res) => {
      console.log(res.data);
      changeProducts(res.data);
    });
  }, []);

  const showNavBar = location.pathname !== '/login';

  return (
    <div className={`${styles.App}`}>
      {showNavBar && <NavBar />} {/* Conditionally render NavBar */}
      <div className={`${styles.content}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products products={products} changeProducts={changeProducts} />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/collections" element={<Collections changeProducts={changeProducts} changeCollections={changeCollections} collections={collections} />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} /> {/* Separate route for Login */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
