import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { People } from '../../../../people/people';

export function CheckOutButton({ people, checkInDate }) {
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const onCheckOutClick = (_id) => {
    const currentDate = dayjs().format();
    People.update(_id, {
      $set: {
        checkOutDate: currentDate,
      },
    });
  };

  useEffect(() => {
    const isCheckedOutFiveSecondsAgo =
      checkInDate && dayjs(checkInDate).isAfter(dayjs().subtract(5, 'second'));

    if (isCheckedOutFiveSecondsAgo) {
      setIsButtonVisible(true);

      const timer = setTimeout(() => {
        setIsButtonVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [checkInDate]);

  if (!isButtonVisible) {
    return null;
  }

  return (
    <button
      onClick={() => onCheckOutClick(people._id)}
      className="me-2 rounded-full border-2 border-blue-200 bg-white px-2 py-2.5 text-center text-xs font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
    >
      Check-out: {people.firstName} {people.lastName}
    </button>
  );
}
