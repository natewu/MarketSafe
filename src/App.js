import {Link, Route, Routes} from "react-router-dom";

import Home from "./routes/Home";
import NavBar from "./Nav";
import styles from './App.module.scss';

function App() {
  return (
    <div className={`${styles.App}`}>
    <NavBar />

      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>      
  
    </div>
  );
}

export default App;
