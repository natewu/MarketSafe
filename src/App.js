import "./global.scss";

import { Link, Route, Routes } from "react-router-dom";
import React from "react";
import { Dashboard } from "./routes/Dashboard";
import Home from "./routes/Home";
import NavBar from "./Nav";
import Products from "./routes/Products";
import ProductPage from "./routes/ProductPage";
import styles from "./App.module.scss";
import { useEffect, useState } from "react";
import { Collections } from "./routes/Collections";
import axios from "axios";
import Papa from 'papaparse';

function App() {
  const [products, changeProducts] = useState([
    {
      id: 1,
      img: "https://via.placeholder.com/300",
      title: "Product 1",
      desc: "This is product 1",
    },
    {
      id: 1,
      img: "https://via.placeholder.com/300",
      title: "Product 1",
      desc: "This is product 1",
    },
    {
      id: 1,
      img: "https://via.placeholder.com/300",
      title: "Product 1",
      desc: "This is product 1",
    },
    {
      id: 1,
      img: "https://via.placeholder.com/300",
      title: "Product 1",
      desc: "This is product 1",
    },
    {
      id: 1,
      img: "https://via.placeholder.com/300",
      title: "Product 1",
      desc: "This is product 1",
    },
    {
      id: 1,
      img: "https://via.placeholder.com/300",
      title: "Product 1",
      desc: "This is product 1",
    },
    {
      id: 1,
      img: "https://via.placeholder.com/300",
      title: "Product 1",
      desc: "This is product 1",
    },
    {
      id: 1,
      img: "https://via.placeholder.com/300",
      title: "Product 1",
      desc: "This is product 1",
    },
    {
      id: 1,
      img: "https://via.placeholder.com/300",
      title: "Product 1",
      desc: "This is product 1",
    },
    {
      id: 1,
      img: "https://via.placeholder.com/300",
      title: "Product 1",
      desc: "This is product 1",
    },
    {
      id: 1,
      img: "https://via.placeholder.com/300",
      title: "Product 1",
      desc: "This is product 1",
    },
    {
      id: 1,
      img: "https://via.placeholder.com/300",
      title: "Product 1",
      desc: "This is product 1",
    },
    {
      id: 1,
      img: "https://via.placeholder.com/300",
      title: "Product 1",
      desc: "This is product 1",
    },
    {
      id: 1,
      img: "https://via.placeholder.com/300",
      title: "Product 1",
      desc: "This is product 1",
    },
    {
      id: 1,
      img: "https://via.placeholder.com/300",
      title: "Product 1",
      desc: "This is product 1",
    },
    {
      id: 1,
      img: "https://via.placeholder.com/300",
      title: "Product 1",
      desc: "This is product 1",
    },
    {
      id: 1,
      img: "https://via.placeholder.com/300",
      title: "Product 1",
      desc: "This is product 1",
    },
    {
      id: 1,
      img: "https://via.placeholder.com/300",
      title: "Product 1",
      desc: "This is product 1",
    },
    {
      id: 1,
      img: "https://via.placeholder.com/300",
      title: "Product 1",
      desc: "This is product 1",
    },
    {
      id: 1,
      img: "https://via.placeholder.com/300",
      title: "Product 1",
      desc: "This is product 1",
    },
  ]);

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

  const handleRefreshClick = () => {
    // Assuming the CSV file is publicly accessible from the public directory
    const csvReviewPath = 'data/generated_reviews.csv';
  
    Papa.parse(csvReviewPath, {
      download: true,
      header: true,
      complete: function(results) {
        // Here we have the CSV file data as an array of objects
        console.log(results.data);
  
        // Send this data to the backend
        axios.post('/api/reviews/upload', results.data)
          .then(response => {
            // Handle the response from the server here
            console.log('Reviews added to the database', response);
          })
          .catch(error => {
            // Handle any errors here
            console.error('Error uploading reviews to the database', error);
          });
      }
    });
  };

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
            element={<Collections changeProducts={changeProducts} />}
          ></Route>
        </Routes>
      </div>
        <Button variant="contained" onClick={handleRefreshClick}>
          Refresh Reviews
        </Button>
    </div>
  );
}

export default App;
