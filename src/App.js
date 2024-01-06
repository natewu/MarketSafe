import './global.scss';

import {Link, Route, Routes} from "react-router-dom";

import Home from "./routes/Home";
import NavBar from "./Nav";
import styles from "./App.module.scss";
import Products from "./routes/Products";

function App() {
  return (
    <div className={`${styles.App}`}>
      <NavBar />

      <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/products" element={<Products />}></Route>
      </Routes>      
  
    </div>
  );
}

export default App;
