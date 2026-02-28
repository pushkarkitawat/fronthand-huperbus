import React, { useState } from "react";
import './bookticket.css';
import { BackButton2 } from "../component/blueback";

export default function BlueBusBooking() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
    jdate: "",
    from: "",
    to: "",
    boarding: "",
    dropping: "",
    fare: "",
    extra: "",
    paymode: "Cash",
    status: "Paid",
    seatno: "",
    BusName:"",
    BusNo:"",
    noofpassenger:"",
    GpayNo:"",
  });
 
  const [pnr, setPnr] = useState("—");
 
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const genPNR = () => {
    const d = new Date();
    const r = Math.random().toString(36).substring(2, 6).toUpperCase();
    return (
      "BB" +
      d.getFullYear().toString().slice(-2) +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      r
    );
  };
 
  const handleGenerate = async () => {
    if (!form.name.trim()) return alert("Enter passenger name");
    if (!form.mobile.trim()) return alert("Enter mobile number");
   
    const newPNR = genPNR();
    setPnr(newPNR);
    
    try {
      const res = await fetch(`${process.env.API}/api/booking/book`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ ...form, pnr: newPNR }),
});

if (!res.ok) throw new Error("Failed to generate ticket");

// Read PDF as blob
const blob = await res.blob();

const url = URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = `ticket-${newPNR}.pdf`;
a.click();
handleClear();

    } catch (err) {
      console.error(err);
      alert("Error while booking ticket");
    }
  };
  

  const handleClear = () => {
    setForm({
      name: "",
      age: "",
      gender: "",
      mobile: "",
      email: "",
      jdate: "",
      from: "",
      to: "",
      boarding: "",
      dropping: "",
      fare: "",
      extra: "",
      paymode: "Cash",
      status: "Paid",
      seatno: "",
    BusName:"",
    BusNo:"",
    noofpassenger:"",
    GapyNo:"",
    });
    setPnr("—");
  };
  

  return (
    <div className="bluebus-container" >
      {/* Header */}
      <div className="header">
        <div className="header-logo">BB</div>
        
        <div className="header-text">
          <h1>Blue Bus - Book Ticket</h1>
          <p>Quick ticket issuing for Shrinath Travels</p>
        </div>
       <div id="backbutton" style={{left:"70%"}}><BackButton2/></div> 
      </div>

      <div className="layout">
  <div className="card">
    {/* Left side */}
    <div className="form-section">
      <h3>Passenger & Travel Details</h3>

      <div className="form-row">
        <div>
          <label>Name</label>
          <input id="name" value={form.name} onChange={handleChange} placeholder="Enter passenger name" />
        </div>
        <div>
          <label>Age</label>
          <input id="age" type="number" value={form.age} onChange={(e) => {
    if (e.target.value.length <= 2) {
      handleChange(e);
    }
  }} placeholder="e.g. 28" />
        </div>
        <div>
          <label>Mobile</label>
          <input id="mobile" value={form.mobile} onChange={(e) => {
    if (e.target.value.length <= 10) {
      handleChange(e);
    }
  }} placeholder="Mobile number" />
        </div>
        <div>
          <label>Gender</label>
          <select id="gender" value={form.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Both">Both</option>
          </select>
        </div>
      </div>

      <div className="form-row">
      <div>
          <label>Seat No</label>
          <input id="seatno" value={form.seatno} onChange={handleChange} placeholder="Seat No" />
        </div>
        <div>
          <label>Passengers</label>
          <input id="noofpassenger" value={form.noofpassenger} onChange={(e) => {
    if (e.target.value.length <= 2) {
      handleChange(e);
    }
  }} placeholder="1" />
        </div>
       
      </div>

      <div className="form-row">
        
        <div>
          <label>From</label>
          <input id="from" type="text" value={form.from} onChange={handleChange} placeholder="eg-Mumbai"/>
          
        </div>
        <div>
          <label>To</label>
          <input id="to" type="text" value={form.to} onChange={handleChange} placeholder="eg-Nashik"/>
         
        </div>
        <div>
          <label>Boarding</label>
          <input id="boarding" type="text" value={form.boarding} onChange={handleChange} />
            
        </div>
        <div>
          <label>Dropping</label>
          <input id="dropping" type="text" value={form.dropping} onChange={handleChange}/>
        </div>
      </div>
      
    </div>

    {/* Right side */}
    <div className="form-section">
      <h3>Boarding & Payment</h3>

      <div className="form-row">
      <div>
          <label>Bus Name</label>
          <input id="BusName" value={form.BusName} onChange={handleChange} placeholder="eg- Laxmi Travels" />
        </div>
        <div>
          <label>BusNo</label>
          <input id="BusNo" value={form.BusNo} onChange={(e) => {
    if (e.target.value.length <= 4) {
      handleChange(e);
    }
  }} placeholder="eg- 9004" />
        </div>
       
      </div>

      <div className="form-row">
        <div>
          <label>Fare</label>
          <input id="fare" type="number" value={form.fare} onChange={(e) => {
    if (e.target.value.length <= 5) {
      handleChange(e);
    }
  }} />
        </div>
        <div>
          <label>Agent fees</label>
          <input id="extra" type="number" value={form.extra} onChange={(e) => {
    if (e.target.value.length <= 5) {
      handleChange(e);
    }
  }} />
        </div>
      </div>

      <div className="form-row">
      <div>
          <label>Date</label>
          <input id="jdate" type="date" value={form.jdate} onChange={handleChange} />
        </div>
        <div>
          <label>Payment</label>
          <select id="paymode" value={form.paymode} onChange={handleChange}>
            <option>Cash</option>
            <option>UPI</option>
          </select>
        </div>
        <div>
          <label>Status</label>
          <select id="status" value={form.status} onChange={handleChange}>
          <option value="">select</option>
            <option value="Paid"> Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>
        {form.paymode === "UPI" ? (
  <div>
    <label htmlFor="Gpay">Gpay No</label>
    <input
      id="GpayNo"
      type="text"
      inputMode="numeric"
      maxLength={10}           // restrict to 10 digits
      value={form.GpayNo}      // fixed typo
      onChange={handleChange}
    />
  </div>
) : null}

      </div>

      <div className="form-row" >
      
        
        <button onClick={handleGenerate}>Generate Ticket</button>
        <button onClick={handleClear}>Clear</button>
        
        
      </div>
    </div>
  </div>
</div>

    </div>
  );
}
