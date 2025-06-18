import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateFilter, setDateFilter] = useState("");

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:4000/api/bookings/all");
      const allBookings = response.data.bookings || [];
      setBookings(allBookings);
      setFilteredBookings(allBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to fetch bookings.");
    } finally {
      setLoading(false);
    }
  };

  const filterByDate = (date) => {
    if (!date) {
      setFilteredBookings(bookings);
      return;
    }

    const filtered = bookings.filter((booking) => {
      const bookingDate = new Date(booking.date).toISOString().split("T")[0];
      return bookingDate === date;
    });

    setFilteredBookings(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/bookings/admin/${id}`);
      toast.success("Booking deleted successfully.");
      fetchBookings();
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Failed to delete booking.");
    }
  };

  const calculateTotalPrice = () => {
    return filteredBookings.reduce((total, booking) => total + booking.price, 0);
  };

  // Prepare data for Doughnut Chart
  const meetingTypeCounts = filteredBookings.reduce(
    (acc, booking) => {
      const type = booking.meetingType?.toLowerCase();
      if (type === "virtual") acc.virtual += 1;
      else if (type === "physical") acc.physical += 1;
      return acc;
    },
    { virtual: 0, physical: 0 }
  );

  const doughnutData = {
    labels: ["Virtual Meetings", "Physical Meetings"],
    datasets: [
      {
        label: "Meeting Type",
        data: [meetingTypeCounts.virtual, meetingTypeCounts.physical],
        backgroundColor: ["#3B82F6", "#10B981"],
        borderColor: ["#1D4ED8", "#047857"],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const downloadPDF = (booking) => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('Booking Details', 105, 20, { align: 'center' });
    
    // Add booking information
    doc.setFontSize(12);
    doc.text(`Booking ID: ${booking._id}`, 20, 40);
    doc.text(`Date: ${new Date(booking.date).toLocaleDateString()}`, 20, 50);
    doc.text(`Time Slot: ${booking.timeSlot}`, 20, 60);
    doc.text(`Meeting Type: ${booking.meetingType}`, 20, 70);
    doc.text(`Price: $${booking.price}`, 20, 80);
    
    // Add user information
    doc.text('User Information:', 20, 100);
    doc.text(`Name: ${booking.user?.name || 'N/A'}`, 20, 110);
    doc.text(`Email: ${booking.user?.email || 'N/A'}`, 20, 120);
    doc.text(`Contact: ${booking.contact}`, 20, 130);
    
    // Add property information if available
    if (booking.property) {
      doc.text('Property Information:', 20, 150);
      doc.text(`Type: ${booking.property.type}`, 20, 160);
      doc.text(`Location: ${booking.property.location}`, 20, 170);
      doc.text(`Price: $${booking.property.price}`, 20, 180);
    }
    
    // Save the PDF
    doc.save(`booking-${booking._id}.pdf`);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
        📋 All Booking Details
      </h2>

      {/* Filter by Date */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <label className="text-lg font-medium text-gray-700">📅 Filter by Date:</label>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => {
            setDateFilter(e.target.value);
            filterByDate(e.target.value);
          }}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
        />
        <button
          onClick={() => {
            setDateFilter("");
            filterByDate("");
          }}
          className="bg-gray-200 hover:bg-gray-300 text-sm font-medium py-2 px-4 rounded"
        >
          Clear Filter
        </button>
      </div>

      {/* Total Price */}
      <div className="mb-6 text-lg font-semibold text-gray-800">
        Total Price of Filtered Bookings:{" "}
        <span className="text-green-600">${calculateTotalPrice()}</span>
      </div>

      {/* Doughnut Chart */}
      <div className="mb-10 w-full max-w-md mx-auto">
        <h3 className="text-xl font-semibold text-center mb-4 text-gray-700">
          🧮 Meeting Type Analysis
        </h3>
        <Doughnut data={doughnutData} options={doughnutOptions} />
      </div>

      {/* Booking List */}
      {loading ? (
        <p className="text-center text-gray-600 text-lg">Loading bookings...</p>
      ) : filteredBookings.length === 0 ? (
        <p className="text-center text-red-500 text-lg">No bookings found.</p>
      ) : (
        <div className="space-y-6">
          {filteredBookings.map((b) => (
            <div
              key={b._id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all duration-200"
            >
              {/* User Info */}
              <div className="flex items-center mb-4">
                {b.user?.profilePic ? (
                  <img
                    src={b.user.profilePic}
                    alt="User"
                    className="w-16 h-16 rounded-full border shadow-md object-cover mr-4"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                    <span className="text-gray-600 font-bold">N/A</span>
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{b.user?.name || "N/A"}</h3>
                  <p className="text-sm text-gray-600">{b.user?.email || "N/A"}</p>
                </div>
              </div>

              {/* Booking Details */}
              <div className="text-gray-700 space-y-2">
                <p>
                  <strong>Meeting Type:</strong> {b.meetingType}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(b.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time Slot:</strong> {b.timeSlot}
                </p>
                <p>
                  <strong>Contact:</strong> {b.contact}
                </p>
                <p>
                  <strong>Price:</strong> ${b.price}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex justify-end gap-x-2">
                <button
                  onClick={() => downloadPDF(b)}
                  className="px-[10px] py-[6px] bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  Download PDF
                </button>
                <button
                  onClick={() => handleDelete(b._id)}
                  className="px-[10px] py-[6px] bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
