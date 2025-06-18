import React from 'react';
import { assets } from '../assets/assets'; // Ensure assets.about_img is a real estate image

const About = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white py-12 px-6 min-h-screen">
      <div className="container mx-auto max-w-5xl">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-center mb-16 gap-10">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <img
              src={assets.about_img}
              alt="Modern Real Estate"
              className="w-full h-80 object-cover rounded-2xl shadow-xl border-4 border-blue-100"
            />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-bold text-purple-600 mb-4">
              Welcome to Gewal.lk Real Estate
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Your trusted partner for buying, selling, and renting properties across Sri Lanka. Whether you’re searching for your dream home, a lucrative investment, or the perfect commercial space, Gewal.lk is here to guide you every step of the way.
            </p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
>
              Browse Properties
            </button>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">Our Story</h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
            Founded in 2024, Gewal.lk was born from a passion for connecting people with the right spaces. Our journey began with a simple vision: to make real estate transparent, accessible, and stress-free for everyone. Today, we’re proud to have helped thousands of families and businesses find their perfect property, while building a reputation for integrity and excellence.
          </p>
        </div>

        {/* Our Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-purple-600 mb-8">Our Values</h2>
          <div className="flex flex-wrap justify-center gap-10">
            <div className="text-center w-full md:w-1/3 max-w-xs bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-600">
              <span className="inline-block mb-4 text-purple-600">
                <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 10l9-7 9 7v7a9 9 0 11-18 0v-7z" />
                  <path d="M9 21V9h6v12" />
                </svg>
              </span>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Trust</h3>
              <p className="text-gray-600">
                We build lasting relationships through honesty, transparency, and reliability in every transaction.
              </p>
            </div>
            <div className="text-center w-full md:w-1/3 max-w-xs bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-600">
              <span className="inline-block mb-4 text-purple-600">
                <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3z" />
                  <path d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
                </svg>
              </span>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Expertise</h3>
              <p className="text-gray-600">
                Our team combines local knowledge with industry experience to deliver the best results for our clients.
              </p>
            </div>
            <div className="text-center w-full md:w-1/3 max-w-xs bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-600">
              <span className="inline-block mb-4 text-purple-600">
                <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 8v4l3 3" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </span>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Service</h3>
              <p className="text-gray-600">
                We put our clients first, offering personalized support and guidance from start to finish.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="py-12 rounded-2xl bg-white bg-opacity-90 shadow-lg">
          <h2 className="text-3xl font-bold text-purple-600 text-center mb-4">
            Join the Gewal.lk Community!
          </h2>
          <p className="text-lg text-gray-700 text-center mb-6">
            Stay updated on the latest listings, market insights, and exclusive offers. Subscribe to our newsletter and be part of our growing family.
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

export default About;
