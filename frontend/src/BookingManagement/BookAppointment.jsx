import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FiPhone, FiMessageSquare } from "react-icons/fi";
import { jwtDecode } from "jwt-decode";

const BookAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [meetingType, setMeetingType] = useState("physical");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [price, setPrice] = useState(10);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [zoomDetails, setZoomDetails] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/properties/${id}`);
        setProperty(response.data.property);
      } catch (error) {
        toast.error("Error fetching property details");
      }
    };

    const fetchBookedSlots = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/bookings/property/${id}`);
        setBookedSlots(response.data.bookings);
      } catch (error) {
        toast.error("Error fetching booked slots");
      }
    };

    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("You must be logged in.");
          return;
        }
        const response = await axios.get("http://localhost:4000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          const userData = response.data.user;
          setEmail(userData.email);
          setName(userData.name);
        }
      } catch (error) {
        toast.error("Error loading user profile. Please try again.");
      }
    };

    fetchProperty();
    fetchBookedSlots();
    fetchUserProfile();
  }, [id]);

  const handleMeetingChange = (e) => {
    const type = e.target.value;
    setMeetingType(type);
    setPrice(type === "virtual" ? 30 : 10);
  };

  const handleSlotSelection = (slot) => {
    setTimeSlot(timeSlot === slot ? "" : slot);
  };

  const isFutureDate = (inputDate) => {
    const today = new Date();
    const selectedDate = new Date(inputDate);
    return selectedDate > today;
  };

  const isSlotAlreadyBooked = (selectedDate, selectedSlot) => {
    return bookedSlots.some(
      (booking) => booking.date === selectedDate && booking.timeSlot === selectedSlot
    );
  };

  const handleBookingConfirmation = async () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const contactRegex = /^\d{10}$/;

    if (!nameRegex.test(name)) {
      toast.error("Name should contain only letters.");
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Email must be a valid @gmail.com address.");
      return;
    }
    if (!contactRegex.test(contact)) {
      toast.error("Contact number must be exactly 10 digits.");
      return;
    }
    if (!date || !isFutureDate(date)) {
      toast.error("Please select a valid future date.");
      return;
    }
    if (!timeSlot) {
      toast.error("Please select a time slot.");
      return;
    }
    if (isSlotAlreadyBooked(date, timeSlot)) {
      toast.error("This slot is already booked. Please select another slot or date.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in.");
        return;
      }
      const decoded = jwtDecode(token);
      const userId = decoded.userId || decoded.id || decoded._id;

      const bookingData = {
        userId,
        propertyId: id,
        name,
        email,
        contact,
        meetingType,
        date,
        timeSlot,
        price,
      };

      const res = await axios.post("http://localhost:4000/api/bookings", bookingData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 201 || res.data.success) {
        toast.success("Booking Confirmed!");
        if (meetingType === "virtual" && res.data.zoomDetails) {
          setZoomDetails(res.data.zoomDetails);
          toast.info(`Zoom meeting details have been sent to ${email}!`);
        }
        navigate('/Place-order', {
          state: {
            bookingDetails: { name, email, contact, meetingType, date, timeSlot },
            propertyId: id,
            amount: price
          }
        });
      }
    } catch (err) {
      toast.error("Failed to confirm booking. Try again.");
    }
  };

  const openWhatsApp = () => {
    const message = `Hello, I'm interested in this property: ${property?.type}\n\nLocation: ${property?.location}\nPrice: $${property?.price}\n\n[Image: ${property?.images[0]}]`;
    const whatsappLink = `https://wa.me/${property?.contactNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  const messageAgent = () => {
    window.location.href = `mailto:${property?.user?.email}?subject=Property Booking Inquiry`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        {property ? (
          <>
            {/* Property Info */}
            <div className="flex flex-col md:flex-row gap-8 mb-10">
              <div className="md:w-1/2">
                <img
                  src={property.images[0]}
                  alt="Property"
                  className="w-full h-72 object-cover rounded-xl shadow"
                />
              </div>
              <div className="md:w-1/2 flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-blue-900 mb-2">{property.type}</h2>
                  <p className="text-gray-600 mb-2">{property.description}</p>
                  <p className="text-gray-700 font-medium mb-2">Location: {property.location}</p>
                  <p className="text-2xl font-semibold text-green-700 mb-4">LKR {property.price}</p>
                </div>

                {/* Agent Info & Contact Buttons */}
                {property.user && (
                  <div className="flex items-center gap-4 p-4 border rounded-lg bg-gray-50 mt-4">
                    {property.user.profilePic && (
                      <img
                        src={property.user.profilePic}
                        alt="User"
                        className="w-14 h-14 rounded-full border shadow object-cover"
                      />
                    )}
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Listed by: {property.user.name}</p>
                      <p className="text-sm text-gray-600">{property.user.email}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={openWhatsApp}
                          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 hover:bg-green-200 transition shadow"
                          title="WhatsApp Agent"
                        >
                          <FiPhone size={20} className="text-green-700" />
                        </button>
                        <button
                          onClick={messageAgent}
                          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 transition shadow"
                          title="Email Agent"
                        >
                          <FiMessageSquare size={20} className="text-blue-700" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Booking Form */}
            <div className="border-t pt-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Book an Appointment</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value.replace(/[^A-Za-z\s]/g, ""))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Contact Number</label>
                  <input
                    type="text"
                    placeholder="Enter 10-digit phone number"
                    value={contact}
                    maxLength={10}
                    onChange={(e) => setContact(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Meeting Type</label>
                  <select
                    value={meetingType}
                    onChange={handleMeetingChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="physical">Physical Meeting (LKR 10)</option>
                    <option value="virtual">Virtual Meeting (LKR 30)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Select Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                    min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0]}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Available Time Slots</label>

                  {/* Time Slot Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {property.slots?.map((slot, idx) => {
                      const isBooked = isSlotAlreadyBooked(date, slot);
                      const isSelected = timeSlot === slot;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSlotSelection(slot)}
                          disabled={isBooked}
                          className={`px-4 py-2 rounded-lg font-medium shadow transition-all duration-150
                            ${isBooked
                              ? "bg-red-200 text-red-500 cursor-not-allowed"
                              : isSelected
                              ? "bg-blue-600 text-white shadow-lg"
                              : "bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-blue-700"}
                          `}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
                <div>
                  <p className="text-lg text-gray-800 font-medium">
                    Selected Time Slot:{" "}
                    <span className="text-blue-600 font-semibold">{timeSlot || "None"}</span>
                  </p>
                  <p className="text-lg font-medium mt-2">Total Price: LKR {price}</p>
                </div>

                {/* Book & Pay Button */}
                <div className="flex justify-end mt-8">
                  <button
                    onClick={handleBookingConfirmation}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                  >
                    Book & Pay
                  </button>
                </div>
              </div>

              {zoomDetails && (
                <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Virtual Meeting Details</h3>
                  <p className="text-blue-600 mb-2">
                    <strong>Zoom Link:</strong>{" "}
                    <a
                      href={zoomDetails.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-800 hover:underline"
                    >
                      {zoomDetails.link}
                    </a>
                  </p>
                  <p className="text-blue-600">
                    <strong>Meeting Password:</strong> {zoomDetails.password}
                  </p>
                  <p className="text-sm text-blue-600 mt-2">
                    These details have also been sent to your email.
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600">Loading property details...</p>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
