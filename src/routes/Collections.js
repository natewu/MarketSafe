import AddIcon from "@mui/icons-material/Add";
import React from "react";
import styles from "./Products.module.scss";
import TransferList from "../components/TransferList";
import Modal from "@mui/material/Modal";
import { useRef } from "react";
import Grid from "@mui/material/Grid";

// Mock data
const products = [
  {
    id: 1,
    img: "https://via.placeholder.com/150",
    title: "Collection 1",
    desc: "This is product 1",
    num: 10,
    collection: [{ title: "Product 1", desc: "This is product 1" }],
  },
  {
    id: 2,
    img: "https://via.placeholder.com/150",
    title: "Product 2",
    desc: "This is product 2",
    num: 10,
    collection: [{ title: "Product 2", desc: "This is product 2" }],
  },
  {
    id: 2,
    img: "https://via.placeholder.com/150",
    title: "Product 2",
    desc: "This is product 2",
    num: 10,
  },
  {
    id: 2,
    img: "https://via.placeholder.com/150",
    title: "Product 2",
    desc: "This is product 2",
    num: 10,
  },
  {
    id: 2,
    img: "https://via.placeholder.com/150",
    title: "Product 2",
    desc: "This is product 2",
    num: 10,
  },
  // Add more products as needed
];

function AddCollection() {
  //get list of products
}

export function Collections() {
  const collectionName = useRef();
  const [show, setShow] = React.useState(false);
  const [all, setAll] = React.useState([
    { title: "Product 1", desc: "This is product 1" },
  ]);
  const [current, setCurrent] = React.useState([]);
  function handleClose() {
    setShow(false);
  }
  function handleOpen() {
    setShow(true);
  }

  function createCollection(collection) {
    handleClose();
    console.log(collection);
  }
  return (
    <div className={`${styles.Products} p6`}>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Grid container justifyContent="center" alignItems="center">
            <input
              placeholder="Name of collection"
              ref={collectionName}
            ></input>
          </Grid>

          <TransferList
            all={all}
            current={current}
            handleClose={handleClose}
            createCollection={createCollection}
          ></TransferList>
        </>
      </Modal>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Collections</h1>
        </div>
        <div>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleOpen}
          >
            <span className="mr-4">
              <AddIcon></AddIcon>
            </span>
            Create Collection
          </button>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex space-x-4">
          <select className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="">Category</option>
            {/* Add options here */}
          </select>
          <input
            type="search"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Price Range"
          />
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Tags"
          />
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Collection
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="rounded-lg overflow-hidden">
              <img
                src={product.img}
                alt={product.title}
                className="w-full h-64 object-cover block mx-auto"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.title}
                </h3>
                <p className="text-gray-600">{product.desc}</p>
                <p className="text-gray-600">{product.num} items</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
