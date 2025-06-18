import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import RelatedProperties from '../components/RelatedProperties';

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:4000/api/properties/${productId}`);
        if (response.data && response.data.success && response.data.property) {
          const propertyData = response.data.property;
          if (!propertyData.type || !propertyData.description || !propertyData.price || 
              !propertyData.location || !propertyData.contactNumber || !propertyData.email) {
            throw new Error('Required property data is missing');
          }
          if (!propertyData.images || !Array.isArray(propertyData.images) || propertyData.images.length === 0) {
            propertyData.images = ['/path/to/default-image.jpg'];
          }
          setProperty(propertyData);
          setSelectedImage(propertyData.images[0]);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch property details');
        toast.error(err.message || 'Failed to load property details');
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [productId]);

  const handleBookAppointment = () => {
    navigate(`/book/${property._id}`);
  };

  const openGoogleMaps = (location) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    window.open(url, "_blank");
  };

  const handleViewLocation = () => {
    openGoogleMaps(property.location);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
        <h2 className="text-2xl font-bold text-red-600 mb-4">{error || 'Property not found'}</h2>
        <button
          onClick={() => navigate('/properties')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold shadow"
        >
          Back to Properties
        </button>
      </div>
    );
  }

  console.log(property); // Add this line before <RelatedProduct ... />

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Property Card */}
      <div className="flex flex-col lg:flex-row gap-10 bg-white rounded-2xl shadow-xl p-8">
        {/* Images Section */}
        <div className="flex flex-col lg:w-1/2 gap-4">
          {/* Main Image */}
          <div className="w-full h-80 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden shadow">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Property"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-400">No image available</span>
            )}
          </div>
          {/* Thumbnails */}
          <div className="flex gap-3 mt-2 overflow-x-auto">
            {property.images && property.images.map((image, idx) => (
              <img
                key={idx}
                src={image}
                alt={`Thumbnail ${idx + 1}`}
                onClick={() => setSelectedImage(image)}
                className={`w-20 h-14 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 ${
                  selectedImage === image ? 'border-blue-500 scale-105' : 'border-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
        {/* Info Section */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{property.type}</h1>
            <p className="text-xl font-semibold text-green-600 mb-2">
              LKR {property.price.toLocaleString()}
            </p>
            <p className="text-gray-600 mb-4">{property.location}</p>
            <div className="mb-6">
              <h3 className="font-semibold text-gray-700 mb-1">Description</h3>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleBookAppointment}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow transition"
            >
              Book Appointment
            </button>
            <button
              onClick={handleViewLocation}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow transition"
            >
              View Location
            </button>
          </div>
        </div>
      </div>
      {/* Details Section */}
      <div className="mt-12 bg-white rounded-2xl shadow p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Property Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <h4 className="font-semibold mb-1">Type</h4>
            <p>{property.type}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Location</h4>
            <p>{property.location}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Price</h4>
            <p>LKR {property.price.toLocaleString()}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Contact</h4>
            <p>{property.contactNumber}</p>
            <p>{property.email}</p>
          </div>
        </div>
      </div>
      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Related Properties</h2>
        <RelatedProperties type={property.type} excludeId={property._id} />
      </div>
    </div>
  );
};

export default Product;
