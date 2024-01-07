import "./global.scss";

import { Link, Route, Routes } from "react-router-dom";
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

function App() {
  const [products, changeProducts] = useState([]);
  // current collections
  const [collections, changeCollections] = useState([]);

  useEffect(() => {
    // disable text select
    const noSelectElements = document.querySelectorAll(".no-select");

    noSelectElements.forEach((element) => {
      element.style.webkitUserSelect = "none";
      element.style.mozUserSelect = "none";
      element.style.msUserSelect = "none";
      element.style.userSelect = "none";
    });
    axios.get("http://localhost:5000/api/products").then((res) => {
      console.log(res.data);
      changeProducts(res.data);
    });
  }, []);

  return (
    <div className={`${styles.App}`}>
      <NavBar />
      <div className={`${styles.content}`}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route
            path="/products"
            element={
              <Products products={products} changeProducts={changeProducts} />
            }
          ></Route>
          <Route path="/product/:id" element={<ProductPage />} />
          <Route
            path="/collections"
            element={
              <Collections
                changeProducts={changeProducts}
                changeCollections={changeCollections}
                collections={collections}
              />
            }
          ></Route>
          <Route path="/account" element={<Account />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
