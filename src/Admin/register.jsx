import React, { useState, useEffect } from "react";
import "./register.css";
import { BackButton2 } from "../component/blueback";

const Register = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      const today = new Date().toISOString().split("T")[0];
      setSelectedDate(today);
  
      try {
        const res = await fetch(`${process.env.API}/api/booking/bookings?date=${today}`);
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        setBookings(data);
        
        setFilteredBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]);
        setFilteredBookings([]);
      }
    };
  
    fetchBookings();
  }, []); 
  const handleStatusUpdate = async (id) => {
   
    try {
      const res = await fetch(
        `${process.env.API}/api/booking/bookings/${id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Paid" }),
        }
      );

      const data = await res.json();
      if (!data.success){alert(data.message)}else new Error("Failed to update status");

      // ✅ update local state without refetch
      setFilteredBookings((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, status: "Paid" } : b
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };
  const handlePrintTicket = async (id) => {
    try {
      const res = await fetch(`${process.env.API}/api/booking/ticket/${id}`);
      if (!res.ok) throw new Error("Failed to fetch ticket");
  
      
      const blob = await res.blob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ticket.pdf`;
      a.click();
      
    } catch (err) {
      console.error("Error printing ticket:", err);
      alert("Error while fetching ticket");
    }
  };
  
  

  const handleDateChange = async (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    alert(date);
  
    try {
      const res = await fetch(`${process.env.API}/api/booking/bookings?date=${date}`);
      if (!res.ok)  throw new Error("Failed to fetch bookings");
      const data = await res.json();
      
      setFilteredBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setFilteredBookings([]);
    }
  };
  

  return (
    <div className="register-container">
      <h2>Bus Booking Register</h2>
      
      <div className="filter-section">
        <label>Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <div id="backbutton" style={{color:"skyblue"}}><BackButton2 /></div>
      </div>

      {/* <table className="register-table">
        <thead>
          <tr>
          <th colSpan="4">Bus Name</th>
          </tr>
          <tr>
            <th>Date</th>
            
            <th>Seat No</th>
            <th>Passenger</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.date}</td>
                <td>{booking.busName}</td>
                <td>{booking.busNo}</td>
                <td>{booking.seatNo}</td>
                <td>{booking.passenger}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-data">
                No bookings found for this date
              </td>
            </tr>
          )}
        </tbody>
      </table> */}
      <table className="register-table">
  {filteredBookings.length > 0 ? (
    // Group bookings by busName
    filteredBookings.reduce((acc, booking) => {
      const busGroup = acc.find(group => group.busNo === booking.busNo && group.busName === booking.busName);
      if (busGroup) {
        busGroup.bookings.push(booking);
      } else {
        acc.push({ busNo: booking.busNo,busName: booking.busName, bookings: [booking] });
      }
      return acc;
    }, []).map((group, index) => (
      <React.Fragment key={index}>
        <thead>
          <tr>
            <th colSpan="1" style={{textAlign:"left",height:"30px",width:"200px",backgroundColor:"#3b82f6"}}>{group.busName} {group.busNo}</th>
          </tr>
          <tr>
            <th>Date</th>
            <th>Seat No</th>
            <th>Passenger</th>
            <th>From</th>
            <th>Phone_no</th>
            <th>Payment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {group.bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.journey_date}</td>
              <td>{booking.seatNo}</td>
              <td>{booking.passenger}</td>
              <td>{booking.fromCity}</td>
              <td>{booking.mobile}</td>
              <td 
  style={{
    color: ["Cancel", "Unpaid"].includes(booking.status) ? "red" : "green",
    fontSize: "18px",
    fontWeight: "bold"
  }}
>
  {booking.status}
</td>
<td>
        {booking.status === "Unpaid" ? (
          <button
            style={{
              width: "100px",
              height: "30px",
              backgroundColor: "green",
              color: "white",
              borderRadius: "5px",
              border: "none",
              fontSize: "16px",
              fontWeight: "bold",
              letterSpacing: "1px"
            }}
            onClick={() => handleStatusUpdate(booking.id)}
          >
            Paid
          </button>
        ) : booking.status === "Paid" ? (
          <button
            style={{
              width: "100px",
              height: "30px",
              backgroundColor: "#3b82f6",
              color: "white",
              borderRadius: "5px",
              border: "none",
              fontSize: "16px",
              fontWeight: "bold",
              letterSpacing: "1px"
            }}
            onClick={() => handlePrintTicket(booking.id)}
          >
            Print
          </button>
        ) : null}
      </td>            </tr>
          ))}
        </tbody>
      </React.Fragment>
    ))
  ) : (
    <tbody>
      <tr>
        <td colSpan="3"  className="no-data">
          No bookings found for this date
        </td>
      </tr>
    </tbody>
  )}
</table>

      
    </div>
  );
};

export default Register;
