import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import employeesData from "./employees.json";
import "./management.css"

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
        deliveryDate: new Date().toLocaleString(),
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
            employee: selectedEmployee,
            deliveryDate: new Date().toLocaleString(),
          },
        ]);
      };
    };
  };

  return (
    <div className="dashboard-container">
      <h1>Order Management Dashboard</h1>
      <Link to="/Inventory">
          <button type="button" className="logout-inv">
            <svg
              width="70px"
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
                  stroke="#ffffff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M10 12L21 12M21 12L18.0004 8.5M21 12L18 15.5"
                  stroke="#ffffff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </button>
        </Link>
      <div>
        <h2>Transactions</h2>
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total Price</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>${transaction.totalPrice}</td>
                <td>{transaction.date}</td>
                <td>
                  <select
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                  >
                    <option value="">Select Employee</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.name}>
                        {employee.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleConfirmDelivery(transaction.id)}
                  >
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
              <th>Total Price</th>
              <th>Date</th>
              <th>Employee</th>
              <th>Delivery Date</th>
            </tr>
          </thead>
          <tbody>
            {confirmedDeliveries.map((delivery) => (
              <tr key={delivery.id}>
                <td>{delivery.id}</td>
                <td>${delivery.totalPrice}</td>
                <td>{delivery.date}</td>
                <td>{delivery.employee}</td>
                <td>{delivery.deliveryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
