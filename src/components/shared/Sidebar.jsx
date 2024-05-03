import React from "react";
import { NavLink } from "react-router-dom";
import { BiAperture } from "react-icons/bi";
import { MdOutlineEventNote, MdProductionQuantityLimits } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className="pl-10 pt-6 ">
      <img className="w-[90%]" src="/logo1.png" alt="Logo" />
      <div className="flex flex-col gap-5 text-2xl mt-3">
        <p className="font-bold text-info text-2xl">Menu</p>
        <div className="flex flex-col gap-2">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-info py-2 transition-all duration-300 flex items-center gap-3"
                : "transition-all py-2 duration-300 flex items-center gap-3"
            }
            to="/"
          >
            <IoHomeOutline className="text-2xl" />
            Home
          </NavLink>
          <NavLink
            to="/hero"
            className={({ isActive }) =>
              isActive
                ? "text-info py-2 transition-all duration-300 flex items-center gap-3"
                : "transition-all py-2 duration-300 flex items-center gap-3"
            }
          >
            <BiAperture className="text-2xl" />
            Hero Mangement
          </NavLink>
          <NavLink
            to="/event"
            className={({ isActive }) =>
              isActive
                ? "text-info py-2 transition-all duration-300 flex items-center gap-3"
                : "transition-all py-2 duration-300 flex items-center gap-3"
            }
          >
            <MdOutlineEventNote className="text-2xl" />
            Event Mangement
          </NavLink>
          <NavLink
            to="/product"
            className={({ isActive }) =>
              isActive
                ? "text-info py-2 transition-all duration-300 flex items-center gap-3"
                : "transition-all py-2 duration-300 flex items-center gap-3"
            }
          >
            <MdProductionQuantityLimits className="text-2xl" />
            Product Mangement
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
