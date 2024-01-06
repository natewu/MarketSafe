import { React, useState, useEffect } from "react";

import AddIcon from "@mui/icons-material/Add";
import styles from "./Products.module.scss";

// Mock data
const products = [
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
  // Add more products as needed
];

export default function Products(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    return () => {
      // wont work correctly with strict mode on
      //   console.log("called");
      props.changeProducts(products);
    };
  }, []);
  const handleSubmit = () => {
    console.log(url);
    setIsOpen(false);
  };

    const [isOpen, setIsOpen] = useState(false);
    const [url, setUrl] = useState('');


    const handleSubmit = async () => {
        const product = { url };
        const response = await fetch("/add_product", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(product)
        });
     
        if (response.ok){
            console.log("Product added successfully");
            setIsOpen(false);
        } else {
            console.error("Failed to add product");
        }
     };
     

  return (
    <div className={`${styles.Products} m-14`}>
      {isOpen && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-center min-h-screen">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="text-center">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className=" text-2xl font-medium text-gray-900 mb-6"
                      id="modal-title"
                    >
                      Add Product
                    </h3>
                    <div className="mt-2">
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter URL"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-500 text-base font-medium text-white hover:bg-gray-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Submit
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`p6 ${styles.products_wrapper}`}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Shopping Dashboard
            </h1>
          </div>
          <div>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              <span className="mr-4">
                <AddIcon></AddIcon>
              </span>
              Add Product
            </button>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex space-x-4 items-center">
            <select className="w-30 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">Category</option>
              <option value="">Category 2</option>
              {/* Add options here */}
            </select>
            <input
              type="search"
              className="w-30 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Price Range"
            />
            <input
              type="text"
              className="w-30 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Tags"
            />
          </div>
        </div>
        <div className={styles.product__box}>
          {props.products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Product({ product }) {
  return (
    <div className={styles.product}>
      <div className={styles.product__img}>
        <img src={product.img} alt={product.title} />
      </div>
      <div className={styles.product__info}>
        <p className={styles.product__title}>{product.title}</p>
        <p className={styles.product__desc}>{product.desc}</p>
      </div>
    </div>
  );
}
