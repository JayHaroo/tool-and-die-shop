import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CSS/ordering.css";
import menuData from "./JSON/menu.json";

export default function Ordering() {
  const [cart, setCart] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [inventoryItems, setInventoryItems] = useState([]);
  

  useEffect(() => {
    // Fetch menu items from menu.json
    setMenuItems(menuData);

    // Create or open IndexedDB database for inventory
    const openRequestInventory = indexedDB.open("inventory_db", 1);

    openRequestInventory.onerror = function (event) {
      console.error("IndexedDB error:", event.target.errorCode);
    };

    openRequestInventory.onupgradeneeded = function (event) {
      const db = event.target.result;

      // Create object store for inventory items
      if (!db.objectStoreNames.contains("items")) {
        db.createObjectStore("items", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    openRequestInventory.onsuccess = function (event) {
      const db = event.target.result;

      // Fetch inventory items from the object store
      const transaction = db.transaction(["items"], "readonly");
      const objectStore = transaction.objectStore("items");
      const getRequest = objectStore.getAll();

      getRequest.onsuccess = function (event) {
        setInventoryItems(event.target.result);
      };

      getRequest.onerror = function (event) {
        console.error("Error fetching inventory items:", event.target.error);
      };
    };
  }, []);

  const addItem = (item) => {
    const updatedMenuItems = menuItems.map((menuItem) => {
      if (menuItem.id === item.id && menuItem.quantity > 0) {
        return { ...menuItem, quantity: menuItem.quantity - 1 };
      }
      return menuItem;
    });

    if (item.quantity > 0) {
      setCart([...cart, item]);
      setMenuItems(updatedMenuItems);
    }
  };

  const removeItemFromCart = (index) => {
    const updatedCart = [...cart];
    const removedItem = updatedCart.splice(index, 1)[0];

    const updatedMenuItems = menuItems.map((menuItem) => {
      if (menuItem.id === removedItem.id) {
        return { ...menuItem, quantity: menuItem.quantity + 1 };
      }
      return menuItem;
    });

    setCart(updatedCart);
    setMenuItems(updatedMenuItems);
  };

  const removeItemFromMenu = (id) => {
    const updatedMenuItems = menuItems.filter((item) => item.id !== id);
    setMenuItems(updatedMenuItems);
  };

  const handleCheckout = () => {
    // Calculate total price for each item in the cart
    const totalPricePerItem = cart.map((item) => ({
      ...item,
      totalPrice: item.price * item.quantity,
    }));

    // Calculate the overall total price
    const totalPrice = totalPricePerItem.reduce(
      (total, item) => total + item.totalPrice,
      0
    );

    // Gather information about bought items, quantity, price, and mode of payment
    const boughtItems = totalPricePerItem.map((item) => {
      // Remove totalPrice property from each item
      const { totalPrice, ...rest } = item;
      return rest;
    });

    // Get values from input fields
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const deliveryDate = document.getElementById("delivery-date").value;

    // Open IndexedDB database
    const openRequest = indexedDB.open("transactions_db", 1);

    openRequest.onerror = function (event) {
      console.error("IndexedDB error:", event.target.errorCode);
    };

    openRequest.onsuccess = function (event) {
      const db = event.target.result;

      // Add transaction to the object store
      const transaction = db.transaction(["transactions"], "readwrite");
      const objectStore = transaction.objectStore("transactions");

      const newTransaction = {
        name: name,
        address: address,
        deliveryDate: deliveryDate,
        boughtItems: boughtItems,
        totalPrice: totalPrice,
        date: new Date().toLocaleString(),
      };

      const addRequest = objectStore.add(newTransaction);

      addRequest.onerror = function (event) {
        console.error(
          "Error adding transaction to IndexedDB:",
          event.target.error
        );
      };

      addRequest.onsuccess = function (event) {
        console.log("Transaction added to IndexedDB successfully!");
      };
    };

    // Alert and clear the cart
    alert(
      `Checkout Complete! Total Price: $${totalPrice}. Thank you for shopping with us.`
    );
    setCart([]);
  };

  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function chunkArray(array, size) {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
      array.slice(index * size, index * size + size)
    );
  }

  return (
    <div className="body">
      <header>
        <img className="icon-head" src={"/Icon.png"} alt="icon" />
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        ></input>
        <div className="btn-head">
          <Link to="/support">
            <button className="support-btn">
              <svg
                width="40px"
                height="40px"
                viewBox="1 1 22 20"
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
                  <circle cx="12" cy="6" r="4" fill="#000000"></circle>{" "}
                  <path
                    d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                    fill="#000000"
                  ></path>{" "}
                </g>
              </svg>
            </button>
          </Link>
          <Link to="/">
            <button className="logout-btn">
              <svg
                width="40px"
                height="40px"
                viewBox="1 1 25 20"
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
                    d="M12.9999 2C10.2385 2 7.99991 4.23858 7.99991 7C7.99991 7.55228 8.44762 8 8.99991 8C9.55219 8 9.99991 7.55228 9.99991 7C9.99991 5.34315 11.3431 4 12.9999 4H16.9999C18.6568 4 19.9999 5.34315 19.9999 7V17C19.9999 18.6569 18.6568 20 16.9999 20H12.9999C11.3431 20 9.99991 18.6569 9.99991 17C9.99991 16.4477 9.55219 16 8.99991 16C8.44762 16 7.99991 16.4477 7.99991 17C7.99991 19.7614 10.2385 22 12.9999 22H16.9999C19.7613 22 21.9999 19.7614 21.9999 17V7C21.9999 4.23858 19.7613 2 16.9999 2H12.9999Z"
                    fill="#000000"
                  ></path>{" "}
                  <path
                    d="M13.9999 11C14.5522 11 14.9999 11.4477 14.9999 12C14.9999 12.5523 14.5522 13 13.9999 13V11Z"
                    fill="#000000"
                  ></path>{" "}
                  <path
                    d="M5.71783 11C5.80685 10.8902 5.89214 10.7837 5.97282 10.682C6.21831 10.3723 6.42615 10.1004 6.57291 9.90549C6.64636 9.80795 6.70468 9.72946 6.74495 9.67492L6.79152 9.61162L6.804 9.59454L6.80842 9.58848C6.80846 9.58842 6.80892 9.58778 5.99991 9L6.80842 9.58848C7.13304 9.14167 7.0345 8.51561 6.58769 8.19098C6.14091 7.86637 5.51558 7.9654 5.19094 8.41215L5.18812 8.41602L5.17788 8.43002L5.13612 8.48679C5.09918 8.53682 5.04456 8.61033 4.97516 8.7025C4.83623 8.88702 4.63874 9.14542 4.40567 9.43937C3.93443 10.0337 3.33759 10.7481 2.7928 11.2929L2.08569 12L2.7928 12.7071C3.33759 13.2519 3.93443 13.9663 4.40567 14.5606C4.63874 14.8546 4.83623 15.113 4.97516 15.2975C5.04456 15.3897 5.09918 15.4632 5.13612 15.5132L5.17788 15.57L5.18812 15.584L5.19045 15.5872C5.51509 16.0339 6.14091 16.1336 6.58769 15.809C7.0345 15.4844 7.13355 14.859 6.80892 14.4122L5.99991 15C6.80892 14.4122 6.80897 14.4123 6.80892 14.4122L6.804 14.4055L6.79152 14.3884L6.74495 14.3251C6.70468 14.2705 6.64636 14.1921 6.57291 14.0945C6.42615 13.8996 6.21831 13.6277 5.97282 13.318C5.89214 13.2163 5.80685 13.1098 5.71783 13H13.9999V11H5.71783Z"
                    fill="#000000"
                  ></path>{" "}
                </g>
              </svg>
            </button>
          </Link>
        </div>
      </header>

      <div className="menu-container">
        {chunkArray([...filteredMenuItems, ...inventoryItems], 4).map(
          (row, rowIndex) => (
            <div className="row" key={rowIndex}>
              {row.map((item) => (
                <div className="menu-item-box" key={item.id}>
                  <div className="item">
                    <span>
                      <svg
                        fill="#000000"
                        width="64px"
                        height="64px"
                        viewBox="0 0 32 32"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <title>tools</title>
                          <path d="M27.783 7.936c0.959 2.313 0.502 5.074-1.379 6.955-2.071 2.071-5.201 2.395-7.634 1.022l-1.759 1.921 1.255 1.26 0.75-0.75c0.383-0.384 1.005-0.384 1.388 0l6.082 6.144c0.384 0.383 0.384 1.005 0 1.388l-2.776 2.776c-0.383 0.384-1.005 0.384-1.388 0l-6.082-6.144c-0.384-0.383-0.384-1.005 0-1.388l0.685-0.685-1.196-1.199-8.411 9.189c-0.767 0.767-2.010 0.767-2.776 0l-0.694-0.694c-0.767-0.767-0.767-2.010 0-2.776l9.582-8.025-6.364-6.381-2.010-0.001-2.326-3.74 1.872-1.875 3.825 2.341 0.025 1.968 6.438 6.463 1.873-1.568c-1.831-2.496-1.64-6.012 0.616-8.268 1.872-1.872 4.618-2.337 6.925-1.396l-4.124 4.067 3.471 3.471 4.132-4.075zM6.15 25.934c-0.383-0.383-1.004-0.383-1.388 0-0.384 0.384-0.384 1.005 0 1.389 0.384 0.383 1.005 0.383 1.388 0 0.384-0.385 0.384-1.006 0-1.389z"></path>
                        </g>
                      </svg>
                    </span>
                    <span>{item.name}</span>
                    <span>Quantity: {item.quantity}</span>
                    <span>Price: ${item.price}</span>
                    <button onClick={() => addItem(item)}>
                      <svg
                        width="70px"
                        height="20px"
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
                          <path
                            d="M21 5L19 12H7.37671M20 16H8L6 3H3M16 5.5H13.5M13.5 5.5H11M13.5 5.5V8M13.5 5.5V3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                            stroke="#ffffff"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      <div className="cart">
        <h2>Shopping Cart</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name}
              <button onClick={() => removeItemFromCart(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="payment">
        <h3>Payment Method</h3>
        <input
          type="radio"
          id="cod"
          name="payment-method"
          checked="checked"
        ></input>
        <label htmlFor="cod">Cash On Delivery</label>
        <br></br>
        <input type="radio" id="card" name="payment-method"></input>
        <label htmlFor="card">Credit Card on Delivery</label>

        <div className="delivery-details">
          <h3>Delivery Details</h3>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" />
          <label htmlFor="delivery-date">Delivery Date:</label>
          <input type="date" id="delivery-date" name="delivery-date" />
        </div>
      </div>
      <button className="checkout-btn" onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
}
