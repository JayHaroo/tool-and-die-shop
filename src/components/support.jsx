/*
  Case Study #1
  Submitted By:
  Duhaylungsod, Kyziah Mae S. 
  Garcia, John Charles T. 
  Guevarra, Shane Ashley M. 
  Saturno, M-Jey L.

  The Other Source Codes has File Extension in .jsx 

  Working deployment site:
  https://tool-and-die-shop.vercel.app/
  
*/

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CSS/support.css";

function Support() {
  const [activeButton, setActiveButton] = useState("Orders");
  const [notifications, setNotifications] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [username, setUsername] = useState("");
  const [onDelivery, setOnDelivery] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState('');

  const handleAsk = (question) => {
    let fetchedAnswer = '';

    switch (question.toLowerCase()) {
      case 'return policy':
        fetchedAnswer = 'Our return policy allows you to return items within 30 days of purchase.';
        break;
      case 'contact customer support':
        fetchedAnswer = 'You can contact our customer support team at toolndieshop@gmail.com or by calling 1-800-123-4567.';
        break;
      case 'custom orders':
        fetchedAnswer = 'Yes we can accept custom orders. Custom orders are sent thru Email: toolndieshop@gmail.com';
        break;
      case '':
        break;
      default:
        fetchedAnswer = 'Sorry, I don\'t have an answer for that question. Please try another question.';
        break;
    }

    setAnswer(fetchedAnswer);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const openRequest2 = indexedDB.open("transactions_db", 1);
    openRequest2.onsuccess = function (event) {
      const db = event.target.rersult;
      const transaction = db.transaction(["transactions"], "readonly");
      const objectStore = transaction.objectStore("transactions");
      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = function (event) {
        setTransactions(event.target.result);
      };
    };

    const openRequest = indexedDB.open("deliveries_db", 1);

    openRequest.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction(["deliveries"], "readonly");
      const objectStore = transaction.objectStore("deliveries");

      const getRequest = objectStore.getAll();

      getRequest.onsuccess = function (event) {
        const deliveries = event.target.result;
        // Count the number of items on delivery
        const onDeliveryCount = deliveries.filter(
          (delivery) => delivery.status === "On delivery"
        ).length;
        // Update the notifications state with the count
        setNotifications(onDeliveryCount);
        // Update the onDelivery state with all delivery items
        setOnDelivery(deliveries);
      };

      getRequest.onerror = function (event) {
        console.error(
          "Error fetching data from indexedDB:",
          event.target.error
        );
      };
    };

    openRequest.onupgradeneeded = function (event) {
      const db = event.target.result;
      db.createObjectStore("deliveries", {
        keyPath: "id",
        autoIncrement: true,
      });
    };
  }, []);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const renderMiddlePanel = () => {
    switch (activeButton) {
      case "Orders":
        return (
          <div>
            <div className="ord-text-det">Your Orders</div>
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>Delivery Date</th>
                  <th>Address</th>
                  <th>Materials to Deliver</th>
                  <th>Total Price</th>
                  <th>Date Placed</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.deliveryDate}</td>
                    <td>{transaction.address}</td>
                    <td>
                      {transaction.boughtItems.map((item, index) => (
                        <span key={index}>{item.name}, </span>
                      ))}
                    </td>
                    <td>${transaction.totalPrice.toFixed(2)}</td>
                    <td>{transaction.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "Help Center":
        return (
          <div>
            <div className="help-text-det">Customer Help</div>;
            <div className="buttons-container">
              <button className="btn-faq" onClick={() => handleAsk("return policy")}>
                What is your return policy?
              </button>
              <button className="btn-faq" onClick={() => handleAsk("contact customer support")}>
                How can I contact customer support?
              </button>
              <button className="btn-faq" onClick={() => handleAsk("custom orders")}>
                Do you accept custom orders?
              </button>
              {/* Add more buttons for other frequently asked questions */}
            </div>
            <div className="answer-container">{answer && <p>{answer}</p>}</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="btn-support">
        <Link to="/order">
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

        <Link to="/">
          <button className="home-btn">
            <svg
              fill="#000000"
              width="40px"
              height="40px"
              viewBox="3 5 25 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M27 18.039L16 9.501 5 18.039V14.56l11-8.54 11 8.538v3.481zm-2.75-.31v8.251h-5.5v-5.5h-5.5v5.5h-5.5v-8.25L16 11.543l8.25 6.186z"></path>
              </g>
            </svg>
          </button>
        </Link>
      </div>

      <div className="container-2">
        <div className="left-panel">
          <svg
            className="icon-prof"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#000000"
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
                opacity="0.5"
                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                fill="#000000"
              ></path>{" "}
              <path
                d="M16.807 19.0112C15.4398 19.9504 13.7841 20.5 12 20.5C10.2159 20.5 8.56023 19.9503 7.193 19.0111C6.58915 18.5963 6.33109 17.8062 6.68219 17.1632C7.41001 15.8302 8.90973 15 12 15C15.0903 15 16.59 15.8303 17.3178 17.1632C17.6689 17.8062 17.4108 18.5964 16.807 19.0112Z"
                fill="#000000"
              ></path>{" "}
              <path
                d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3432 6 9.00004 7.34315 9.00004 9C9.00004 10.6569 10.3432 12 12 12Z"
                fill="#000000"
              ></path>{" "}
            </g>
          </svg>
          <div className="sup-btn">
            <div className="name"> {username} </div>
            <button
              className="ord-btn"
              onClick={() => handleButtonClick("Orders")}
            >
              Orders
            </button>

            <button
              className="help-btn"
              onClick={() => handleButtonClick("Help Center")}
            >
              Help Center
            </button>
          </div>
        </div>
        <div className="middle-panel">{renderMiddlePanel()}</div>

        <div className="right-panel">
          <h1>Notifications</h1>
          <div className="l2"></div>
          <div className="on-delivery">
            {onDelivery.map((item) => (
              <div key={item.id}>
                <svg
                  width="40px"
                  height="40px"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g id="Layer_2" data-name="Layer 2">
                      {" "}
                      <g id="invisible_box" data-name="invisible box">
                        {" "}
                        <rect width="48" height="48" fill="none"></rect>{" "}
                      </g>{" "}
                      <g id="Layer_7" data-name="Layer 7">
                        {" "}
                        <g>
                          {" "}
                          <path d="M37.7,11.1A3,3,0,0,0,35.4,10H34.2l.3-1.7A3.1,3.1,0,0,0,33.9,6a3.2,3.2,0,0,0-2.2-1H7.9A2.1,2.1,0,0,0,5.8,6.7,2,2,0,0,0,7.8,9h7.3A3,3,0,0,1,18,12.5L15.6,26.3a3,3,0,0,1-2.9,2.5H4.8a2,2,0,0,0-2,1.6L2,34.7A2.8,2.8,0,0,0,2.7,37a2.8,2.8,0,0,0,2.1,1H7.3a7,7,0,0,0,13.4,0h4.6a7,7,0,0,0,13.4,0h2a3.2,3.2,0,0,0,3.1-2.7L46,22.5ZM14,39a3,3,0,0,1-3-3,3,3,0,0,1,6,0A3,3,0,0,1,14,39Zm18,0a3,3,0,0,1-3-3,3,3,0,0,1,6,0A3,3,0,0,1,32,39Zm.1-17,1.4-8h1.3l5.9,8Z"></path>{" "}
                          <path d="M4,15H14a2,2,0,0,0,0-4H4a2,2,0,0,0,0,4Z"></path>{" "}
                          <path d="M15,19a2,2,0,0,0-2-2H5a2,2,0,0,0,0,4h8A2,2,0,0,0,15,19Z"></path>{" "}
                          <path d="M6,23a2,2,0,0,0,0,4h6a2,2,0,0,0,0-4Z"></path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>
                <div className="on-d-text">Your order is on Delivery!</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Support;
