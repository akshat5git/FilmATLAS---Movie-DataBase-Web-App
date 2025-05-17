import React, { useState } from 'react';
import 'remixicon/fonts/remixicon.css';

export const Dropdown = ({ title, options, onclick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(title);

  const handleOptionClick = (value) => {
    setSelected(value);
    onclick(value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-64">
      {/* Dropdown Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center bg-zinc-800 text-white p-3 rounded-lg cursor-pointer 
        hover:bg-zinc-700 transition duration-300 ease-in-out"
      >
        <span>{selected.toUpperCase()}</span>
        <i
          className={`ri-arrow-${isOpen ? "up" : "down"}-s-line text-xl transition duration-300`}
        ></i>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <ul
          className="absolute z-10 mt-1 w-full bg-zinc-800 border border-zinc-700 rounded-lg max-h-60 overflow-y-auto shadow-md"
        >
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className="px-4 py-2 hover:bg-[#6556CD] text-gray-300 hover:text-white transition duration-200 cursor-pointer"
            >
              {option.toUpperCase()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
