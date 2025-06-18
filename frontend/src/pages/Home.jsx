// src/pages/Home.js
import React from 'react';
import Hero from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import NewsletterBox from '../components/NewsletterBox';
import ChatBot from '../components/ChatBot';
import { FaHome, FaShieldAlt, FaHandshake, FaHeadset } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-purple-50 transition-all duration-300">
              <FaHome className="w-12 h-12 mx-auto text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Premium Properties</h3>
              <p className="text-gray-600">Discover our exclusive collection of luxury properties</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-purple-50 transition-all duration-300">
              <FaShieldAlt className="w-12 h-12 mx-auto text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
              <p className="text-gray-600">Safe and reliable property transactions</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-purple-50 transition-all duration-300">
              <FaHandshake className="w-12 h-12 mx-auto text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
              <p className="text-gray-600">Professional support throughout your journey</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-50 hover:bg-purple-50 transition-all duration-300">
              <FaHeadset className="w-12 h-12 mx-auto text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Always here to help you</p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Properties Section */}
      <LatestCollection />

      {/* Best Sellers Section */}
      <BestSeller />

      {/* Our Policy Section */}
      <OurPolicy />

      {/* Newsletter Section */}
      <NewsletterBox />

      {/* Chatbot */}
      <ChatBot />
    </div>
  );
};

export default Home;
