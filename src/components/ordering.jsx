import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ordering.css"

export default function Ordering(){
    const [cart, setCart] = useState([]);
    /* Sample dummy items for menu*/
  const [menuItems, setMenuItems] = useState([
    { name: "Hammer", id: 1, quantity: 10, price: 15.99 },
    { name: "Screwdriver Set", id: 2, quantity: 20, price: 25.99 },
    { name: "Drill Bits", id: 3, quantity: 15, price: 10.99 },
    { name: "Wrench", id: 4, quantity: 12, price: 20.99 },
    { name: "Pliers", id: 5, quantity: 18, price: 12.49 },
    { name: "Tape Measure", id: 6, quantity: 25, price: 8.99 },
    { name: "Utility Knife", id: 7, quantity: 14, price: 6.99 },
    { name: "Adjustable Wrench", id: 8, quantity: 10, price: 16.99 },
    { name: "Level", id: 9, quantity: 20, price: 14.99 },
  ]);
  const [newItemName, setNewItemName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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
              <button onClick={() => addItem(item)}><svg width="70px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 5L19 12H7.37671M20 16H8L6 3H3M16 5.5H13.5M13.5 5.5H11M13.5 5.5V8M13.5 5.5V3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button> {/* Pass item object */}
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
            <label for="cod">Cash On Delivery</label>
            <br></br>
        <input type="radio" id="card" name="payment-method"></input>
            <label for="card">Credit Card on Delivery</label>
    
        <button className="checkout-btn" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </ div>
  );
}