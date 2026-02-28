import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import "./bluebusdasboard.css";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaBus, FaChartBar, FaTicketAlt, FaUsers } from "react-icons/fa";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Bluebusdasboard() {
  const [stats, setStats] = useState({});
  const [activities, setActivities] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    // ✅ Fetch stats
    fetch(`${process.env.API}/api/dashboard/stats`)
      .then(res => res.json())
      .then(data => setStats(data));

    // ✅ Fetch weekly commission
    fetch(`${process.env.API}/api/dashboard/weekly-commission`)
      .then(res => res.json())
      .then(data => {
        setChartData({
          labels: data.map(d => d.day),
          datasets: [
            {
              label: "Commision (₹)",
              data: data.map(d => d.total*0.1),
              borderColor: "skyblue",
              pointBackgroundColor: "white",
              pointBorderColor: "rgba(42, 115, 211, 1)",
              backgroundColor: "rgba(42, 115, 211, 1)",
              tension: 0.4,
              fill: true,
            },
          ],
        });
      });

    // ✅ Fetch activities
    fetch(`${process.env.API}/api/dashboard/activities`)
      .then(res => res.json())
      .then(data => setActivities(data));
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "#111" } },
      title: { display: true, text: "Weekly Commision Overview", color: "#111" },
    },
    scales: {
      x: { ticks: { color: "skyblue", font: { size: 14, weight: "bold" } } },
      y: { ticks: { color: "skyblue", font: { size: 14, weight: "bold" } } },
    },
  };

  return (
    <>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="dashboard-navbar">
        <h1 className="dashboard-title">Bus Booking Dashboard</h1>
      </div>
      <div className="dash">
        <div className="dashboard">
          <div className="stats">
            <div className="stat-card"><div className="stat-icon"><FaBus /></div><p>{stats.totalBuses}</p><p>Total Buses</p></div>
            <div className="stat-card"><div className="stat-icon"><FaTicketAlt /></div><p>{stats.bookingsToday}</p><p>Bookings Today</p></div>
            <div className="stat-card"><div className="stat-icon"><FaUsers /></div><p>{stats.totalPassengers}</p><p>Total Passengers</p></div>
            <div className="stat-card" ><div className="stat-icon"><FaChartBar /></div><p>₹{stats.commission}</p><p>Commission</p></div>
            <div className="stat-card" style={{width:"465px",marginBottom:"80px",gap:"20px"}} ><div className="stat-icon" ><FaMoneyBillTrendUp /></div><h4>₹{stats.extra || 0}</h4><p>Extra</p></div>
          </div>
        </div>

        <div className="activities">
          <h2 className="activities-title">Recent Activity</h2>
          <ul>
            {activities.map((activity, idx) => (
              <li key={idx}>{activity}</li>
            ))}
          </ul>
        </div>

        <div className="graph">
          <Line data={chartData} options={options} />
        </div>
      </div>
    </>
  );
}
