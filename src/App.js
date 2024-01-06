import "./global.scss";

import { Link, Route, Routes } from "react-router-dom";
import React from "react";
import { Dashboard } from "./routes/Dashboard";
import Home from "./routes/Home";
import NavBar from "./Nav";
import Products from "./routes/Products";
import styles from "./App.module.scss";
import { useEffect, useState } from "react";
import { Collections } from "./routes/Collections";
import CollectionProducts from "./components/CollectionProducts";
function App() {
  const [products, changeProducts] = useState([]);

  const setNewProducts = (productData) => {
    changeProducts(productData);
  };
  useEffect(() => {
    // disable text select
    const noSelectElements = document.querySelectorAll(".no-select");

    noSelectElements.forEach((element) => {
      element.style.webkitUserSelect = "none";
      element.style.mozUserSelect = "none";
      element.style.msUserSelect = "none";
      element.style.userSelect = "none";
    });
  }, []);

  return (
    <div className={`${styles.App}`}>
      <NavBar />

      <div className={`${styles.content}`}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route
            path="/collections"
            element={<Collections changeProducts={setNewProducts} />}
          ></Route>
          <Route
            path="/collectionss"
            element={<CollectionProducts products={products} />}
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
