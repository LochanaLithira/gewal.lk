import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaStar, FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaCar } from 'react-icons/fa';
import { assets } from '../assets/assets';

const BestSeller = () => {
  const { products } = useContext(ShopContext) || {};
  const [newArrivals, setNewArrivals] = useState([
    {
      _id: '5',
      name: 'Luxury Condo in Mount Lavinia',
      type: 'Condo',
      location: 'Mount Lavinia, Sri Lanka',
      price: 38000000,
      bedrooms: 3,
      bathrooms: 3,
      area: 2200,
      parking: 2,
      image: assets.p_img1,
      rating: 5
    },
    {
      _id: '6',
      name: 'Modern Townhouse in Negombo',
      type: 'Townhouse',
      location: 'Negombo, Sri Lanka',
      price: 28000000,
      bedrooms: 4,
      bathrooms: 3,
      area: 2500,
      parking: 2,
      image: assets.p_img2_1,
      rating: 4
    },
    {
      _id: '7',
      name: 'Luxury Apartment in Colombo 5',
      type: 'Apartment',
      location: 'Colombo 5, Sri Lanka',
      price: 42000000,
      bedrooms: 3,
      bathrooms: 2,
      area: 2000,
      parking: 2,
      image: assets.p_img3,
      rating: 5
    },
    {
      _id: '8',
      name: 'Beach Villa in Bentota',
      type: 'Villa',
      location: 'Bentota, Sri Lanka',
      price: 48000000,
      bedrooms: 5,
      bathrooms: 4,
      area: 4000,
      parking: 3,
      image: assets.p_img4,
      rating: 5
    }
  ]);

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              New <span className="text-purple-600">Arrivals</span>
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Explore our latest additions to the property market. These premium listings are handpicked for their exceptional quality and value.
            </p>
          </div>
          <Link
            to="/properties"
            className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            View All Properties
            <FaArrowRight className="text-sm" />
          </Link>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {newArrivals.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="md:w-1/2 relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 md:h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      New
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item.type}
                    </span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="md:w-1/2 p-6">
                  <div className="flex items-center gap-1 text-yellow-400 mb-2">
                    {[...Array(item.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{item.location}</span>
                  </div>

                  {/* Property Features */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <FaBed className="text-purple-600" />
                      <span className="text-sm text-gray-600">{item.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaBath className="text-purple-600" />
                      <span className="text-sm text-gray-600">{item.bathrooms} Baths</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaRulerCombined className="text-purple-600" />
                      <span className="text-sm text-gray-600">{item.area} sqft</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCar className="text-purple-600" />
                      <span className="text-sm text-gray-600">{item.parking} Parking</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-purple-600">
                      LKR {item.price.toLocaleString()}
                    </span>
                    <Link
                      to={`/product/${item._id}`}
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button for Mobile */}
        <div className="mt-12 text-center md:hidden">
          <Link
            to="/properties"
            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-all duration-300 inline-block"
          >
            View More Properties
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
