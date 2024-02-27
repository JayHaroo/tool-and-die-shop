import React from 'react';
import { Link } from "react-router-dom";
import "./support.css";

const sendSupport = () =>{
    // Get the customer's support message and name
    const supportMessage = document.querySelector('.txt-area').value;
    const senderName = document.getElementById('name').value;

    // Get cart data from local storage
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];

    // Calculate total quantity for each item in the cart
    const totalQuantityPerItem = cartData.reduce((acc, item) => {
        if (acc[item.id]) {
            acc[item.id] += 1;
        } else {
            acc[item.id] = 1;
        }
        return acc;
    }, {});

    // Gather information about bought items and their total quantity
    const boughtItems = cartData.map(item => ({
        name: item.name,
        quantity: totalQuantityPerItem[item.id] || 0 // Use total quantity for each item
    }));

    // Combine all information into an object
    const supportData = {
        supportMessage: supportMessage,
        senderName: senderName,
        boughtItems: boughtItems
    };

    // Save the support data to local storage
    localStorage.setItem('supportData', JSON.stringify(supportData));

    // Alert and reset form
    alert("Support message sent!");
    document.getElementById("form").reset();
    document.getElementById("name").reset();
};

function Support(){
    return(
        <>
            <header className='sup-h'>Contact Customer Support</header>
            <div className="con-container">
                <form id='form'>
                    <textarea className='txt-area' placeholder='Enter Concern'></textarea>
                </form>
            </div>

            <div className="detail-con">
                <input className='inp' id='name' type="text" placeholder='Enter Sender Name'></input>
                <button className='send-btn' type='button' onClick={sendSupport}>Send</button>
                <Link to="/order"><button className='back-btn' type='button'>Exit</button></Link>
            </div>
        </>
    );
}

export default Support;
