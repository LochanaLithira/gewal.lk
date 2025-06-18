import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaStar, FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaCar } from 'react-icons/fa';
import { assets } from '../assets/assets';

const LatestCollection = () => {
  const { products } = useContext(ShopContext) || {};
  const [latestProducts, setLatestProducts] = useState([
    {
      _id: '1',
      name: 'Luxury Villa in Colombo 7',
      type: 'Villa',
      location: 'Colombo 7, Sri Lanka',
      price: 45000000,
      bedrooms: 5,
      bathrooms: 4,
      area: 4500,
      parking: 3,
      image: assets.p_img1,
      rating: 5
    },
    {
      _id: '2',
      name: 'Modern Apartment in Kotte',
      type: 'Apartment',
      location: 'Kotte, Sri Lanka',
      price: 25000000,
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      parking: 2,
      image: assets.p_img2_1,
      rating: 4
    },
    {
      _id: '3',
      name: 'Beachfront House in Galle',
      type: 'House',
      location: 'Galle, Sri Lanka',
      price: 35000000,
      bedrooms: 4,
      bathrooms: 3,
      area: 3000,
      parking: 2,
      image: assets.p_img3,
      rating: 5
    },
    {
      _id: '4',
      name: 'Penthouse in Colombo 3',
      type: 'Penthouse',
      location: 'Colombo 3, Sri Lanka',
      price: 55000000,
      bedrooms: 4,
      bathrooms: 3,
      area: 2800,
      parking: 2,
      image: assets.p_img4,
      rating: 5
    }
  ]);

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Latest <span className="text-purple-600">Properties</span>
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Discover our newest and most exclusive properties. Each selection is carefully curated to offer you the best in modern living.
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {latestProducts.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image Section */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
              <div className="p-6">
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

export default LatestCollection;
