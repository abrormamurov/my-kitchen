import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import NavbarLinks from "./NavbarLinks";
import { logout } from "../app/userSlice";
import useWeather from "../hooks/useWeather"; // Import the custom hook

const localStorageTheme = () => {
  return localStorage.getItem("theme") || "light";
};

function Novabar() {
  const [theme, setTheme] = useState(localStorageTheme());
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { weather, loading, error } = useWeather("Fergana"); // Use the custom hook

  const darkMode = (e) => {
    if (e.target.checked) {
      setTheme("dark");
      document.body.classList.add("dark"); // Add 'dark' class to body
      document.body.style.background = "black"; // Change body background color
    } else {
      setTheme("light");
      document.body.classList.remove("dark"); // Remove 'dark' class from body
      document.body.style.background = "#d5d3d3"; // Change body background color
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const handleLogOut = () => {
    dispatch(logout());
    toast("Good Job!", {
      icon: "👏",
    });
  };

  return (
    <nav className="navbar bg-base-300 max-w-full mx-auto px-4 lg:px-8">
      <div className="navbar-start">
        <div className="dropdown ">
          <div tabIndex={0} role="button" className="btn m-1">
            <Link to="/">Mykitchen</Link>
          </div>
          <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <NavbarLinks />
          </ul>
        </div>
      </div>

      <ul className="navbar-center gap-6 lg:flex hidden mr-5">
        <NavbarLinks />
      </ul>

      <div className="navbar-end flex items-center gap-4">
        <div className="flex items-center gap-2">
          {loading ? (
            <p>Loading weather...</p>
          ) : error ? (
            <p>Error loading weather</p>
          ) : (
            <>
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Weather Icon"
                className="w-8 h-8"
              />
              <p>{weather.main.temp}°C in Fergana</p>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <h2 className="mr-5 hidden lg:flex">
            <span className="text-sm">{user?.email}</span>
          </h2>
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={user?.photoURL} alt="User Avatar" />
            </div>
          </div>
        </div>

        <label className="swap swap-rotate pr-6">
          <input
            type="checkbox"
            onChange={darkMode}
            checked={theme === "dark"}
          />
          <svg
            className="swap-on fill-current w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          <svg
            className="swap-off fill-current w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>

        <button onClick={handleLogOut} className="btn btn-ghost">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Novabar;
