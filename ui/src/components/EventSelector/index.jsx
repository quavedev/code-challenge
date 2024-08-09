import React from 'react';

export function EventSelector({ communities, setSelectedEvent }) {
  const handleChangeSelect = (e) => {
    const selectedCommunity = communities.find(
      (community) => community._id === e.target.value
    );
    setSelectedEvent(selectedCommunity);
  };

  return (
    <select
      onChange={handleChangeSelect}
      id="communities"
      defaultValue=""
      className="block w-1/3 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
    >
      <option value="" disabled hidden>
        Select an event
      </option>
      {communities.map((community) => (
        <option key={community._id} value={community._id}>
          {community.name}
        </option>
      ))}
    </select>
  );
}
