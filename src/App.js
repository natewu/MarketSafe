import "./global.scss";

import { Link, Route, Routes } from "react-router-dom";

import { Dashboard } from "./routes/Dashboard";
import Home from "./routes/Home";
import NavBar from "./Nav";
import Products from "./routes/Products";
import styles from "./App.module.scss";
import { useEffect } from "react";
import { Collections } from "./routes/Collections";

function App() {
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
          <Route path="/collections" element={<Collections />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
