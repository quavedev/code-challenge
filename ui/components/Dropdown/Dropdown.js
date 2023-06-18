import React, { useState, useEffect, useRef } from 'react';

export const Dropdown = ({ communities, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Select an event');
  const selectRef = useRef(null);

  useEffect(() => {
    // Closing the dropdown if there is a click outside of it
    const handleClickOutside = e => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <div
        className={`flex mt-5 items-center  justify-between text-xl w-60  bg-black text-white border-2 rounded-xl p-4 px-4 py-2 cursor-pointer ${
          isOpen ? 'border-red-500' : ''
        }`}
        ref={selectRef}
      >
        <span
          className=" flex justify-between items-center w-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected}
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </span>
      </div>
      {isOpen ? (
        <ul className="absolute top-20 w-full p-2 bg-black z-10 rounded-xl border-2 border-red-500">
          {communities?.map(event => (
            <li
              key={event._id}
              className={`text-white hover:bg-secondary-dark-bg px-2 py-2 rounded-lg cursor-pointer text-xl ${
                selected === event.name ? 'bg-secondary-dark-bg' : ''
              }`}
              onClick={() => {
                onSelect(event);
                setSelected(event.name);
                setIsOpen(!isOpen);
              }}
            >
              {event.name}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
