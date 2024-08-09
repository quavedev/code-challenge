import React, { useState } from 'react';
import { People } from '../../../../people/people';
import dayjs from 'dayjs';
import { CheckOutButton } from './CheckOutButton.jsx';

export function PeopleCard({ people }) {
  const [checkInDate, setCheckInDate] = useState(null)
  
  const onCheckInClick = (_id) => {
    const currentDate = dayjs().format();
    setCheckInDate(currentDate);
    People.update(_id, {
      $set: {
        checkInDate: currentDate,
      },
    });
  };

  const formatStoredDate = (dateToFormat) =>
    dayjs(dateToFormat).format('MM/DD/YYYY, HH:mm');

  return (
    <div className="block rounded-lg border border-gray-200 bg-white p-6 shadow">
      <div>
        <div className="flex space-x-2">
          <span className="font-medium">Name: </span>
          <span className="">
            {people.firstName} {people.lastName}
          </span>
        </div>

        <div className="flex space-x-2">
          <span className="font-medium">Company:</span>
          <span> {people.companyName ? people.companyName : '--'}</span>
        </div>

        <div className="flex space-x-2">
          <span className="font-medium">Title:</span>
          <span> {people.title ? people.title : '--'}</span>
        </div>

        <div className="flex space-x-2">
          <span className="font-medium">Check-In Date:</span>
          <span>
            {people.checkInDate ? formatStoredDate(people.checkInDate) : 'N/A'}
          </span>
        </div>

        <div className="flex space-x-2">
          <span className="font-medium">Check-Out Date: </span>
          <span>
            {people.checkOutDate
              ? formatStoredDate(people.checkOutDate)
              : 'N/A'}
          </span>
        </div>

        <button
          onClick={() => onCheckInClick(people._id)}
          className="rounded-lg bg-blue-600 px-3 py-2 text-center text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Check-in: {people.firstName} {people.lastName}
        </button>

        <CheckOutButton people={people} checkInDate={checkInDate} />
      </div>
    </div>
  );
}
