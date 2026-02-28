import React from 'react'
import { Link } from 'react-router-dom';
import { SlCalender } from "react-icons/sl";
import { GoGraph } from "react-icons/go";
import { FaBookOpen } from "react-icons/fa";
import { IoBarChartOutline } from "react-icons/io5";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import './sidebar.css';

export default function Sidebar() {
  return (
    <div className='bar'>
        <h2>Blue-Bus</h2>
        <div className='links'>
            <ul>
                <li><Link to="/" className='link'><span><GoGraph /></span> Dashboard</Link></li>
                <li><Link to="/Book-Ticket" className='link'><span><SlCalender /></span>Book Ticket</Link></li>
                <li><Link to="/Manage-Ticket" className='link'><span><FaMoneyBillTransfer/></span>Manage Booking</Link></li>
                <li><Link to="/Report" className='link'><span><IoBarChartOutline /></span>Report</Link></li>
                <li><Link to="/Register" className='link'><span><FaBookOpen/></span>Register</Link></li>
            </ul>
        </div>
        
      
    </div>
  )
}
