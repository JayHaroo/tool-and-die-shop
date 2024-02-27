import React from 'react';
import { Link } from "react-router-dom";
import "./support.css"

const sendSupport = () =>{
    alert("Sent!");

    document.getElementById("form").reset();
    document.getElementById("name").reset();
}

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