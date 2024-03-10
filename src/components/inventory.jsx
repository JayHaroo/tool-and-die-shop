import React, { useEffect, useState } from "react";
import "./inventory.css";
import { Link } from "react-router-dom";
import menuData from "./menu.json";

export default function Inventory() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [updatedItems, setUpdatedItems] = useState([]);
  const [totalSales, setTotalSales] = useState(0); // State to store total sales

  useEffect(() => {
    setMenuItems(menuData);
  }, []);

  useEffect(() => {
    const openRequest = indexedDB.open("inventory_db", 1);
  
    openRequest.onupgradeneeded = function(event) {
      const db = event.target.result;
      db.createObjectStore("items", { keyPath: "id", autoIncrement: true });
    };
  
    openRequest.onsuccess = function(event) {
      console.log("Database opened successfully");
    };
  
    openRequest.onerror = function(event) {
      console.error("IndexedDB error:", event.target.errorCode);
    };
  }, []);

  const addItemToDatabase = () => {
    const name = document.querySelector('.item-name').value;
    const quantity = parseInt(document.querySelector('.item-quantity').value);
    const price = parseFloat(document.querySelector('.item-price').value);

    const newItem = {
      name: name,
      quantity: quantity,
      price: price
    };

    const openRequest = indexedDB.open("inventory_db", 1);

    openRequest.onsuccess = function(event) {
      const db = event.target.result;
      const transaction = db.transaction(["items"], "readwrite");
      const objectStore = transaction.objectStore("items");
      const addItemRequest = objectStore.add(newItem);

      addItemRequest.onsuccess = function(event) {
        console.log("Item added successfully");
        setMenuItems([...menuItems, { ...newItem, id: event.target.result }]);
      };

      addItemRequest.onerror = function(event) {
        console.error("Failed to add item:", event.target.error);
      };
    };
  };
  
  
  const toField = (menuItem) => {
    setSelectedItem(menuItem);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedItem({ ...selectedItem, [name]: value });
  };

  const handleSave = () => {
    const updatedMenuItems = menuItems.map((item) =>
      item.id === selectedItem.id ? selectedItem : item
    );
    // Here you would typically make an API call to update the JSON file on the server
    // For demonstration, we'll just update the state
    setMenuItems(updatedMenuItems);
    setUpdatedItems([...updatedItems, selectedItem]); // For demonstration purposes, keeping track of updated items
    setSelectedItem(null); // Reset selected item after saving
  };

  const handleSaveNew = () => {
    const name = document.querySelector('.item-name').value;
    const quantity = parseInt(document.querySelector('.item-quantity').value);
    const price = parseFloat(document.querySelector('.item-price').value);
  
    const newItem = {
      name: name,
      quantity: quantity,
      price: price
    };
  
    const openRequest = indexedDB.open("transactions_db", 1);
  
    openRequest.onerror = function (event) {
      console.error("IndexedDB error:", event.target.errorCode);
    };
  
    openRequest.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction(["added_items"], "readwrite");
      const objectStore = transaction.objectStore("added_items");
      const addItemRequest = objectStore.add(newItem);
  
      addItemRequest.onerror = function (event) {
        console.error("Error adding item:", event.target.error);
      };
  
      addItemRequest.onsuccess = function (event) {
        console.log("Item added successfully");
        const newItemWithId = { ...newItem, id: event.target.result };
        // Update state to include the new item
        setMenuItems([...menuItems, newItemWithId]);
      };
    };
  };
  

  return (
    <>
      <header>
        <img className="icon-inv" src={"/Icon.png"} alt="icon" />
        <div className="l1"></div>
        <h1>Inventory</h1>
        <Link to="/">
          <button type="button" className="logout-inv">
            <svg
              width="50px"
              height="50px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M14 7.63636L14 4.5C14 4.22386 13.7761 4 13.5 4L4.5 4C4.22386 4 4 4.22386 4 4.5L4 19.5C4 19.7761 4.22386 20 4.5 20L13.5 20C13.7761 20 14 19.7761 14 19.5L14 16.3636"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M10 12L21 12M21 12L18.0004 8.5M21 12L18 15.5"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </button>
        </Link>

        <Link to="/management">
          <button type="button" className="man-inv">
            <svg
              width="50px"
              height="50px"
              viewBox="0 -1 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M15 2V12C15 13.1 14.1 14 13 14H2V7.62C2.73 8.49 3.85003 9.03 5.09003 9C6.10003 8.98 7.01 8.59 7.69 7.94C8 7.68 8.26002 7.34999 8.46002 6.98999C8.82002 6.37999 9.02 5.65997 9 4.90997C8.97 3.73997 8.45001 2.71 7.64001 2H15Z"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M22 14V17C22 18.66 20.66 20 19 20H18C18 18.9 17.1 18 16 18C14.9 18 14 18.9 14 20H10C10 18.9 9.1 18 8 18C6.9 18 6 18.9 6 20H5C3.34 20 2 18.66 2 17V14H13C14.1 14 15 13.1 15 12V5H16.84C17.56 5 18.22 5.39001 18.58 6.01001L20.29 9H19C18.45 9 18 9.45 18 10V13C18 13.55 18.45 14 19 14H22Z"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M8 22C9.10457 22 10 21.1046 10 20C10 18.8954 9.10457 18 8 18C6.89543 18 6 18.8954 6 20C6 21.1046 6.89543 22 8 22Z"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M16 22C17.1046 22 18 21.1046 18 20C18 18.8954 17.1046 18 16 18C14.8954 18 14 18.8954 14 20C14 21.1046 14.8954 22 16 22Z"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M22 12V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L22 12Z"
                  stroke="#0000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M9 5C9 6.2 8.47001 7.27 7.64001 8C6.93001 8.62 6.01 9 5 9C2.79 9 1 7.21 1 5C1 3.74 1.58 2.61 2.5 1.88C3.19 1.33 4.06 1 5 1C7.21 1 9 2.79 9 5Z"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M5.25 3.75V5.25L4 6"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </button>
        </Link>
      </header>

      <div className="add-field">
        <input
          className="item-name"
          placeholder="Name"
          type="text"
        />
        <input
          className="item-quantity"
          placeholder="Quantity"
          type="number"
        />
        <input
          className="item-price"
          placeholder="Price"
          type="number"
          step="0.01"
        />
        <button className="save-btn2" onClick={addItemToDatabase}>
            Save
        </button>
      </div>

      <div className="container">
        {menuItems.map((menuItem, index) => (
          <div className="menu" key={index}>
            <span>{menuItem.name}</span>
            <span>Quantity: {menuItem.quantity}</span>
            <span>{menuItem.price.toFixed(2)}</span>
            <button onClick={() => toField(menuItem)}>Edit item</button>
          </div>
        ))}
      </div>
      
      {selectedItem && (
        <div className="edit-field">
          <input
            className="item-name"
            placeholder="Name"
            type="text"
            name="name"
            value={selectedItem.name}
            onChange={handleInputChange}
          />
          <input
            className="item-quantity"
            placeholder="Quantity"
            type="number"
            name="quantity"
            value={selectedItem.quantity}
            onChange={handleInputChange}
          />
          <input
            className="item-price"
            placeholder="Price"
            type="number"
            step="0.01"
            name="price"
            value={selectedItem.price}
            onChange={handleInputChange}
          />
          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
          </div>
      )}
    </>
  );
}
