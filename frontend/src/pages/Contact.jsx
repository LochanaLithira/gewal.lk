import React from 'react';
import { assets } from '../assets/assets'; // Make sure assets.contact_img is a real estate image

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-center mb-14 bg-white shadow-xl rounded-2xl p-8">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <img
              src={assets.contact_img}
              alt="Contact Gewal.lk"
              className="w-full h-80 object-cover rounded-xl shadow-lg border-4 border-purple-100 mx-auto"
            />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-bold text-purple-600 mb-4">Contact Gewal.lk Real Estate</h2>
            <p className="text-lg text-gray-700 mb-6">
              Have a question about buying, selling, or renting property? Our team is here to help you with expert advice and personalized support. Reach out and let’s make your real estate journey seamless!
            </p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="mb-16 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">Send Us a Message</h2>
          <form className="max-w-3xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-6 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="w-full md:w-1/2">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-6 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                rows="5"
                className="w-full px-6 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button className="bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-800 transition duration-300 shadow">
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-extrabold text-center text-purple-600 mb-12 tracking-tight">
            Contact Details
          </h2>
          <div className="flex flex-wrap justify-center gap-12">
            {/* Phone */}
            <div className="flex flex-col items-center bg-white border border-gray-200 rounded-xl p-8 shadow-lg transition hover:shadow-2xl w-full md:w-1/4 max-w-xs">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-purple-600 to-purple-600 shadow">
                {/* Modern Phone Icon */}
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v2a2 2 0 01-2.18 2A19.72 19.72 0 013 5.18 2 2 0 015 3h2a2 2 0 012 1.72c.13 1.05.37 2.07.72 3.06a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.99.35 2.01.59 3.06.72A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-purple-600 mb-1">Phone</h3>
              <p className="text-base text-gray-700 font-medium">+94 77 123 4567</p>
            </div>
            {/* Email */}
            <div className="flex flex-col items-center bg-white border border-gray-200 rounded-xl p-8 shadow-lg transition hover:shadow-2xl w-full md:w-1/4 max-w-xs">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-purple-600 to-purple-600 shadow">
                {/* Email Icon */}
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="M22 6.5L12 13 2 6.5" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-purple-600 mb-1">Email</h3>
              <p className="text-base text-gray-700 font-medium">contact@gewal.lk</p>
            </div>
            {/* Address */}
            <div className="flex flex-col items-center bg-white border border-gray-200 rounded-xl p-8 shadow-lg transition hover:shadow-2xl w-full md:w-1/4 max-w-xs">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-purple-600 to-purple-600 shadow">
                {/* Modern Location/Map Pin Icon */}
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.418 0-8-5.373-8-10a8 8 0 1116 0c0 4.627-3.582 10-8 10z"/>
                  <circle cx="12" cy="11" r="3"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-purple-600 mb-1">Address</h3>
              <p className="text-base text-gray-700 font-medium">123 Main Street, Colombo, Sri Lanka</p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="py-12 rounded-2xl bg-white bg-opacity-90 shadow-lg">
          <h2 className="text-3xl font-bold text-purple-600 text-center mb-4">Stay Connected with Gewal.lk!</h2>
          <p className="text-lg text-gray-700 text-center mb-6">
            Want the latest property news, tips, and listings? Subscribe to our newsletter.
          </p>
          <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 rounded-lg border-2 border-purple-300 w-full sm:w-2/3 text-gray-800 focus:ring-2 focus:ring-purple-400"
              required
            />
            <button
              type="submit"
              className="bg-purple-600 text-white font-semibold px-8 py-3 rounded-lg shadow hover:bg-purple-800 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
