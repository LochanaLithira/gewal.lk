import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = 'LKR';
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Fetch user data
  const getUserData = async (token) => {
    try {
      const response = await axios.get(backendUrl + '/api/user/profile', { headers: { Authorization: `Bearer ${token}` } });
      if (response.data.success) {
        setUser(response.data.user);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
      getUserData(localStorage.getItem('token'));
    }
  }, [token]);

  const value = {
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    navigate,
    backendUrl,
    setToken,
    token,
    user,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
