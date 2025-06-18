import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RelatedProperties = ({ type, excludeId }) => {
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!type) return;
    setLoading(true);
    axios
      .get(`http://localhost:4000/api/properties?type=${encodeURIComponent(type)}`)
      .then((res) => {
        if (res.data && res.data.success && Array.isArray(res.data.properties)) {
          const filtered = res.data.properties.filter(p => p._id !== excludeId);
          setRelated(filtered.slice(0, 4));
        } else {
          setRelated([]);
        }
      })
      .catch(() => setRelated([]))
      .finally(() => setLoading(false));
  }, [type, excludeId]);

  if (loading) return <div className="text-gray-500">Loading related properties...</div>;
  if (!related.length) return <div className="text-gray-500">No related properties found.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {related.map((prop) => (
        <Link
          to={`/product/${prop._id}`}
          key={prop._id}
          className="bg-white rounded-lg shadow hover:shadow-lg transition block p-4"
        >
          <img
            src={prop.images?.[0] || "/placeholder.jpg"}
            alt={prop.type}
            className="w-full h-32 object-cover rounded mb-2"
          />
          <div className="font-semibold text-lg">{prop.type}</div>
          <div className="text-green-600 font-bold">LKR {prop.price?.toLocaleString()}</div>
          <div className="text-gray-500 text-sm">{prop.location}</div>
        </Link>
      ))}
    </div>
  );
};

export default RelatedProperties;