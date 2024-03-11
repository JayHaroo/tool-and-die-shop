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
import employeesData from "./JSON/employees.json";
import "./CSS/management.css";

export default function Management() {
  const [transactions, setTransactions] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [confirmedDeliveries, setConfirmedDeliveries] = useState([]);

  useEffect(() => {
    // Fetch transactions from IndexedDB
    const openRequest = indexedDB.open("transactions_db", 1);

    openRequest.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction(["transactions"], "readonly");
      const objectStore = transaction.objectStore("transactions");
      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = function (event) {
        setTransactions(event.target.result);
      };
    };

    // Load employees data
    setEmployees(employeesData);
  }, []);

  const handleConfirmDelivery = (transactionId) => {
    // Find the transaction to confirm
    const transactionToConfirm = transactions.find(
      (transaction) => transaction.id === transactionId
    );

    // Store confirmed delivery in a new IndexedDB
    const openRequest = indexedDB.open("deliveries_db", 1);

    openRequest.onupgradeneeded = function (event) {
      const db = event.target.result;

      // Create object store for deliveries
      if (!db.objectStoreNames.contains("deliveries")) {
        db.createObjectStore("deliveries", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    openRequest.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction(["deliveries"], "readwrite");
      const objectStore = transaction.objectStore("deliveries");

      // Add confirmed delivery to the object store
      const addRequest = objectStore.add({
        ...transactionToConfirm,
        employee: selectedEmployee,
        deliveryDate: transactionToConfirm.deliveryDate, // Use the delivery date from the transaction object
        datePlaced: new Date().toLocaleString(), // Store the date placed for confirmed delivery
      });

      addRequest.onsuccess = function () {
        // Remove confirmed transaction from transactions
        const updatedTransactions = transactions.filter(
          (transaction) => transaction.id !== transactionToConfirm.id
        );
        setTransactions(updatedTransactions);

        // Update confirmed deliveries state
        setConfirmedDeliveries((prevDeliveries) => [
          ...prevDeliveries,
          {
            ...transactionToConfirm,
            items: transactionToConfirm.boughtItems.map((item) => item.name), // Map over each item in boughtItems array to extract name
            employee: selectedEmployee,
            deliveryDate: transactionToConfirm.deliveryDate, // Use the delivery date from the transaction object
            datePlaced: new Date().toLocaleString(), // Store the date placed for confirmed delivery
          },
        ]);
      };
    };
  };

  const handleCompleteDelivery = (deliveryId) => {
    // Find the delivery to complete
    const deliveryToComplete = confirmedDeliveries.find(
      (delivery) => delivery.id === deliveryId
    );

    // Store completed delivery in a new IndexedDB
    const openRequest = indexedDB.open("completed_deliveries_db", 1);

    openRequest.onupgradeneeded = function (event) {
      const db = event.target.result;

      // Create object store for completed deliveries
      if (!db.objectStoreNames.contains("completed_deliveries")) {
        db.createObjectStore("completed_deliveries", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    openRequest.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction(["completed_deliveries"], "readwrite");
      const objectStore = transaction.objectStore("completed_deliveries");

      // Add completed delivery to the object store
      const addRequest = objectStore.add(deliveryToComplete);

      addRequest.onsuccess = function () {
        // Remove completed delivery from confirmed deliveries
        const updatedDeliveries = confirmedDeliveries.filter(
          (delivery) => delivery.id !== deliveryToComplete.id
        );
        setConfirmedDeliveries(updatedDeliveries);

        // Remove completed delivery from deliveries_db
        const deleteRequest = indexedDB.open("deliveries_db", 1);

        deleteRequest.onsuccess = function (event) {
          const db = event.target.result;
          const transaction = db.transaction(["deliveries"], "readwrite");
          const objectStore = transaction.objectStore("deliveries");

          const deleteDBRequest = objectStore.delete(deliveryId);

          deleteDBRequest.onsuccess = function () {
            console.log("Delivery data removed from deliveries_db");
          };

          deleteDBRequest.onerror = function (event) {
            console.error(
              "Error removing delivery data from deliveries_db:",
              event.target.error
            );
          };
        };
      };
    };
  };

  return (
    <div className="dashboard-container">
      <div className="header-man">
        <div className="element-man">
          <img className="icon-inv" src={"/Icon.png"} alt="icon" />
          <div className="l1"></div>
        </div>
        <div className="head-man">
          <h1 className="h1-man">Order Management Dashboard</h1>
          <Link to="/Inventory">
            <button type="button" className="logout-man">
              <svg
                width="40px"
                height="40px"
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
        </div>
      </div>
      <div>
        <h2>Job Available</h2>
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Job Number</th>
              <th>Name</th>
              <th>Delivery Date</th>
              <th>Address</th>
              <th>Materials to Deliver</th>
              <th>Total Price</th>
              <th>Date Placed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.name}</td>
                <td>{transaction.deliveryDate}</td>
                <td>{transaction.address}</td>
                <td>
                  {transaction.boughtItems.map((item, index) => (
                    <span key={index}>{item.name}, </span>
                  ))}
                </td>
                <td>${transaction.totalPrice.toFixed(2)}</td>
                <td>{transaction.date}</td>
                <td>
                  <select onChange={(e) => setSelectedEmployee(e.target.value)}>
                    <option value="">Select Employee</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.name}>
                        {employee.name}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => handleConfirmDelivery(transaction.id)}>
                    Confirm Delivery
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Confirmed Deliveries</h2>
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Name</th>
              <th>Delivery Date</th>
              <th>Address</th>
              <th>Material</th>
              <th>Total Price</th>
              <th>Employee</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {confirmedDeliveries.map((delivery) => (
              <tr key={delivery.id}>
                <td>{delivery.id}</td>
                <td>{delivery.name}</td>
                <td>{delivery.deliveryDate}</td>
                <td>{delivery.address}</td>
                <td>{delivery.items.join(", ")}</td>
                <td>${delivery.totalPrice.toFixed(2)}</td>
                <td>{delivery.employee}</td>
                <td>
                  <button onClick={() => handleCompleteDelivery(delivery.id)}>
                    Click to complete Delivery
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
