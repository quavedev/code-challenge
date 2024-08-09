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
      className="rounded-lg bg-red-600 px-3 py-2 text-center text-xs font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-300"
    >
      Check-out: {people.firstName} {people.lastName}
    </button>
  );
}
