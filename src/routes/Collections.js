import AddIcon from "@mui/icons-material/Add";
import { useState, useRef } from "react";
import styles from "./Products.module.scss";
import TransferList from "../components/TransferList";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

export function Collections(props) {
  const navigate = useNavigate();
  const collectionName = useRef();
  const [show, setShow] = useState(false);
  // list of all products
  const [allProducts, setAllProducts] = useState([
    {
      img: "https://via.placeholder.com/300",
      title: "Product 2",
      desc: "This is product 2",
      num: 10,
    },
    {
      img: "https://via.placeholder.com/300",
      title: "Product 2",
      desc: "This is product 2",
      num: 10,
    },
  ]);
  // current collections
  const [collections, changeCollections] = useState([
    {
      img: "https://via.placeholder.com/300",
      title: "Collection 1",
      desc: "This is collection 1",
      num: 10,
      collection: [
        {
          id: 1,
          img: "https://via.placeholder.com/300",
          title: "Product 1",
          desc: "This is product 1",
        },
      ],
    },
    {
      img: "https://via.placeholder.com/300",
      title: "Product 2",
      desc: "This is product 2",
      num: 10,
      collection: [
        {
          id: 1,
          img: "https://via.placeholder.com/300",
          title: "Product 1",
          desc: "This is product 1",
        },
      ],
    },
  ]);

  const [current, setCurrent] = useState([]);

  // #region TransferList
  function handleClose() {
    setShow(false);
  }
  function handleOpen() {
    setShow(true);
  }
  // #endregion

  function createCollection(products) {
    handleClose();
    const collection = {
      img: "https://via.placeholder.com/300",
      title: collectionName.current.value,
      desc: "This is collection 23",
      num: products.length,
      collection: products,
    };

    changeCollections([...collections, collection]);
  }

  const displayProducts = (products) => {
    props.changeProducts(products);
    navigate("/products");
  };
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
            all={allProducts}
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
        <div className="grid grid-cols-3 gap-4">
          {collections.map((collection, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden"
              onClick={() => {
                displayProducts(collection.collection);
              }}
            >
              <div className={styles.product}>
                <div className={styles.product__img}>
                  <img src={collection.img} alt={collection.title} />
                </div>
                <div className={styles.product__info}>
                  <p className={styles.product__title}>{collection.title}</p>
                  <p className={styles.product__desc}>{collection.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
