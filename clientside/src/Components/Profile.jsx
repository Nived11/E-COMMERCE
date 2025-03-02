import React, { useState, useEffect } from "react";
import profile from "../assets/profile.jpg";
import { HiUser, HiHeart, HiShoppingBag, HiLocationMarker, HiHome, HiCollection } from "react-icons/hi";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import ProfileSection from "./profileSection";
import AddressSection from "./AddressSection";
import ProductSection from "./ProductSection";
import Nav from "./Nav";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import ApiPath from "../ApiPath";

function Profile() {
  const [section, setSection] = useState('profile'); 
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    toast.error("logout successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    setCount(count + 1);
  }

  const getUser = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
        setTimeout(() => navigate("/"), 3000);
    }
    try {
        const res = await axios.get(`${ApiPath()}/home`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (res.status === 200) {
            // console.log("User Data:", res.data); 
            setUser(res.data);
        }
    } catch (error) {
        console.error(error);
        if (error.response && error.response.data.msg === "Login time expired please login again") {
            localStorage.removeItem("token");
            toast.error(error.response.data.msg, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            setTimeout(() => navigate("/"), 3000);
        }
    }
  };
  
  useEffect(() => {
    getUser();
  }, [count]);
  
  const handleHomeClick = () => {
    navigate("/home");
  };

  // When user is a buyer and "products" section is active, default to "profile"
  // useEffect(() => {
  //   if (user.accountType === "buyer" && section === "products") {
  //     setSection("profile");
  //   }
  // }, [user, section]);

  return (
    <div className="min-h-screen flex flex-col ">
      <Nav />
      
      <div className="flex-1 flex flex-col md:flex-row mt-30 md:mt-20">
        <div className="w-full md:w-64 bg-blue-500 text-white p-6 flex flex-col items-center">
          <img src={profile} alt="Profile" className="w-24 h-24 rounded-full border-2 border-indigo-500 mb-4" />
          <h2 className="text-xl font-semibold mb-6 text-indigo-200">{user.fname} {user.lname}</h2>
          
          <ul className="w-full h-full space-y-2">
            <li 
              onClick={handleHomeClick}
              className="nav-menu-item home-link flex items-center p-3 cursor-pointer rounded hover:bg-gray-800 transition-colors duration-200"
            >
              <HiHome className="mr-2 nav-menu-icon text-indigo-400 text-xl" /> 
              <span className="nav-menu-text">Home</span>
            </li>
            <li className={`nav-menu-item flex items-center p-3 cursor-pointer rounded transition-colors duration-200 ${section === 'orders' ? 'bg-gray-800 text-indigo-300' : 'hover:bg-gray-800'}`}
              onClick={() => setSection('orders')} >
              <HiShoppingBag className="mr-2 nav-menu-icon text-indigo-400 text-xl" /> 
              <span className="nav-menu-text">Orders</span>
            </li>
            <li className={`nav-menu-item flex items-center p-3 cursor-pointer rounded transition-colors duration-200 ${section === 'wishlist' ? 'bg-gray-800 text-indigo-300' : 'hover:bg-gray-800'}`}
              onClick={() => setSection('wishlist')}>
              <HiHeart className="mr-2 nav-menu-icon text-indigo-400 text-xl" /> 
              <span className="nav-menu-text">Wishlists</span>
            </li>
            <li className={`nav-menu-item flex items-center p-3 cursor-pointer rounded transition-colors duration-200 ${section === 'profile' ? 'bg-gray-800 text-indigo-300' : 'hover:bg-gray-800'}`}
              onClick={() => setSection('profile')} >
              <HiUser className="mr-2 nav-menu-icon text-indigo-400 text-xl" /> 
              <span className="nav-menu-text">Profile Info</span>
            </li>
            <li className={`nav-menu-item flex items-center p-3 cursor-pointer rounded transition-colors duration-200 ${section === 'address' ? 'bg-gray-800 text-indigo-300' : 'hover:bg-gray-800'}`}
              onClick={() => setSection('address')} >
              <HiLocationMarker className="mr-2 nav-menu-icon text-indigo-400 text-xl" /> 
              <span className="nav-menu-text">Address</span>
            </li>
            
            {/* Only show My Products section if accountType is NOT buyer */}
            {user.accountType !== "buyer" && (
              <li className={`nav-menu-item flex items-center p-3 cursor-pointer rounded transition-colors duration-200 ${section === 'products' ? 'bg-gray-800 text-indigo-300' : 'hover:bg-gray-800'}`}
                onClick={() => setSection('products')} >
                <HiCollection className="mr-2 nav-menu-icon text-indigo-400 text-xl" /> 
                <span className="nav-menu-text">My Products</span>
              </li>
            )}
            
            <li onClick={logOut} className="nav-menu-item logout-link flex items-center p-3 cursor-pointer rounded transition-colors duration-200 mt-auto">
              <HiArrowRightOnRectangle className="mr-2 nav-menu-icon text-xl" /> 
              <span className="nav-menu-text">Logout</span>
            </li>
          </ul>
        </div>

        <div className="flex-1 p-6 bg-gray-00 text-gray-100">
          {section === 'profile' && <ProfileSection />}
          {section === 'address' && <AddressSection />}
          {section === 'products' && <ProductSection />}
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default Profile;