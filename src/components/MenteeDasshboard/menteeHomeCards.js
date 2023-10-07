import React from "react";
import { NavLink } from "react-router-dom";

const MenteeHomeCards = () => {
  return (
    <div className="w-full max-w-sm bg-[#F4F5F8] rounded-lg">
      <NavLink href="#">
        <img
          className="rounded-lg h-[194px] w-full object-cover"
          src="https://images.pexels.com/photos/3760856/pexels-photo-3760856.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="product"
        />
      </NavLink>
      <div className="pb-5">
        <div className="flex justify-between items-center px-2">
          <div >
            <NavLink href="#">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">
                Nada Teta Kirezi
              </h5>
            </NavLink>

            <NavLink href="#">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">
                Project Manager
              </h5>
            </NavLink>
          </div>

          <div className="flex items-center  mb-5">
            <svg
              className="w-4 h-4 text-yellow-300 mr-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <span className="text-xs font-semibold">
              4.5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenteeHomeCards;
