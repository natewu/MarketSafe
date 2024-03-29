import { useEffect, useRef, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { MdCollectionsBookmark } from "react-icons/md";
import Modal from "@mui/material/Modal";
import TransferList from "../components/TransferList";
import axios from "axios";
import styles from "./Products.module.scss";
import { useNavigate } from "react-router-dom";

export function Collections(props) {
  const navigate = useNavigate();
  const collectionName = useRef();
  const [show, setShow] = useState(false);
  // list of all products
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/products").then((res) => {
      console.log(res.data);
      setAllProducts(res.data);
    });
  }, []);

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
    if (collectionName.current.value === "") {
      collectionName.current.value = "Untitled Collection";
    }
    const collection = {
      title: collectionName.current.value,
      num: products.length,
      collection: products,
    };

    props.changeCollections([...props.collections, collection]);
  }

  const displayProducts = (products) => {
    props.changeProducts(products);
    navigate("/products");
  };
  return (
    <div className={`${styles.Products} p6`} style={{ overflow: "auto" }}>
      <Modal open={show} onClose={handleClose}>
        <Card
          sx={{
            width: "30vw",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CardContent>
            <Grid container justifyContent="center" alignItems="center">
              <input
                placeholder="Name of collection"
                ref={collectionName}
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  borderRadius: "5px",
                  textAlign: "center",
                  margin: "10px",
                }}
              ></input>
            </Grid>
            <TransferList
              all={allProducts}
              current={current}
              handleClose={handleClose}
              createCollection={createCollection}
            ></TransferList>
          </CardContent>
          <CardActions></CardActions>
        </Card>
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
          {props.collections.map((collection, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden"
              onClick={() => {
                displayProducts(collection.collection);
              }}
            >
              <div className={styles.product}>
                <MdCollectionsBookmark
                  style={{ width: "40%", height: "auto" }}
                />

                <div className={styles.product__info}>
                  <p className={styles.product__title}>{collection.title}</p>
                  <p className={styles.product__desc}>
                    {collection.num} item(s)
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
