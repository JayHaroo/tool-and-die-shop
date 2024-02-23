import { useState } from "react";
import "./App.css";

function App() {
  let cart = [];

  function addItem(itemName) {
    cart.push(itemName);
    displayCart();
  }

  function displayCart() {
    const cartList = document.getElementById("cart-items");
    cartList.innerHTML = "";
    cart.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      cartList.appendChild(li);
    });
  }

  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  function checkout() {
    window.alert("Checkout Complete! Thank you for shopping with us.");
    cart = [];
    displayCart();
  }

  return (
    <>
      <header>
        <h1>Tool and Die Shop</h1>
      </header>
      <div class="container">
        <div class="menu">
          <div className="item">
            <span>Hammer</span>
            <button onClick={() => addItem("Hammer")}>Add to Cart</button>
          </div>
          <div className="item">
            <span>Screwdriver Set</span>
            <button onClick={() => addItem("Screwdriver Set")}>
              Add to Cart
            </button>
          </div>
          <div className="item">
            <span>Drill Bits</span>
            <button onClick={() => addItem("Drill Bits")}>Add to Cart</button>
          </div>
          <div className="item">
            <span>Wrench</span>
            <button onClick={() => addItem("Wrench")}>Add to Cart</button>
          </div>
        </div>
      </div>
      <div class="cart">
        <h2>Shopping Cart</h2>
        <ul id="cart-items"></ul>
        <button class="checkout-btn" onclick="checkout()">
          Checkout
        </button>
      </div>
    </>
  );
}

export default App;
