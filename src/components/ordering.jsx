import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ordering.css"
import  menuData from "./menu.json"

export default function Ordering() {
  const [cart, setCart] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMenuItems(menuData);
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
    alert('Checkout Complete! Thank you for shopping with us.');
    setCart([]);
  };

  const handleAddItem = () => {
    const newItem = { name: newItemName, id: menuItems.length + 1, quantity: 0 };
    setMenuItems([...menuItems, newItem]);
    setNewItemName("");
  };

  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="body">
      <header>
        <h1>Tool and Die Shop</h1>
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        ></input>
        <Link to="/"><button className="logout-btn"><svg width="70px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 7.63636L14 4.5C14 4.22386 13.7761 4 13.5 4L4.5 4C4.22386 4 4 4.22386 4 4.5L4 19.5C4 19.7761 4.22386 20 4.5 20L13.5 20C13.7761 20 14 19.7761 14 19.5L14 16.3636" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10 12L21 12M21 12L18.0004 8.5M21 12L18 15.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button></Link>
      </header>

      <div className="container">
        <div className="menu">
          {filteredMenuItems.map((item) => (
            <div className="item" key={item.id}>
              <span>{item.name}</span>
              <span>Quantity: {item.quantity}</span>
              <span>Price: ${item.price}</span>
              <button onClick={() => addItem(item)}>Add to Cart</button>
            </div>
          ))}
        </div>
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
        <h3>Payment option</h3>
        <input type="radio" id="cod" name="payment-method" checked="checked"></input>
        <label htmlFor="cod">Cash On Delivery</label>
        <br></br>
        <input type="radio" id="card" name="payment-method"></input>
        <label htmlFor="card">Credit Card on Delivery</label>

        <button className="checkout-btn" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}
