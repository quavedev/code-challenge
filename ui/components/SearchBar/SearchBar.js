import React, { useState } from 'react';

export const SearchBar = ({ searchFunction }) => {
  const [currentSearch, setCurrentSearch] = useState('');

  // configuring the search parameters
  const handleOnchange = e => {
    setCurrentSearch(e.target.value);
    searchFunction(currentSearch);
  };

  return (
    <div className="mt-8">
      <input
        className=" w-96 h-9 border-2 placeholder-gray-400 text-xl bg-black focus:outline-none focus:border-red-500 caret-white rounded-full py-6 px-3 text-white"
        type="text"
        value={currentSearch}
        onChange={e => handleOnchange(e)}
        placeholder="Search a person..."
      />
    </div>
  );
};
