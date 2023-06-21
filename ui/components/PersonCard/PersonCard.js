import React, { useState, useEffect } from 'react';
import moment from 'moment/moment';

export const PersonCard = ({ checkIn, checkOut, people, checkIns }) => {
  const [buttonClicked, setButtonClicked] = useState({});
  const [isCheckdOut, setIsCheckOut] = useState({});

  useEffect(() => {
    // Retrieve the checkout status from local storage when the component mounts
    const storedCheckOutStatus = localStorage.getItem('checkoutStatus');
    if (storedCheckOutStatus) {
      setIsCheckOut(JSON.parse(storedCheckOutStatus));
    }
  }, []);

  const handleCheckSuccess = id => {
    setButtonClicked(prevButton => ({
      prevButton,
      [id]: true,
    }));

    // Save the updated checkout status to local storage
    localStorage.setItem('checkoutStatus', JSON.stringify(isCheckdOut));
  };

  return (
    <div className="grid mx-auto max-w-86rem grid-cols-desk-card auto-rows-r-36 gap-4 mt-8">
      {people?.map(person => {
        // variables to properly split and display large strings
        const splitPeople = person.companyName?.split(' ');

        const splitTitle = person.title?.split(' ');

        return (
          <div
            key={person._id}
            className=" bg-black text-white border-2 border-red-500 border-solid rounded-2xl"
          >
            <div className=" mx-auto flex justify-center items-center w-w-45 bg-secondary-dark-bg h-h-12 rounded-full">
              <p className="text-8xl font-bold">{person.firstName[0]}</p>
            </div>
            <div className=" mt-8 flex items-center flex-col gap-4 overflow-hidden">
              <p className=" text-4xl font-medium flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>

                {`${person.firstName} ${person.lastName}`}
              </p>
              <p className="text-2xl truncate font-bold text-yellow-400 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                  />
                </svg>

                {person.companyName
                  ? person.companyName.length > 26
                    ? `${splitPeople[0]} ${splitPeople[1]}`
                    : person.companyName
                  : 'N/A'}
              </p>
              <p className="title text-2xl text-blue-500 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                  />
                </svg>

                {person.title
                  ? person.title.length > 30
                    ? `${splitTitle[0]} ${splitTitle[1]}`
                    : person.title
                  : 'N/A'}
              </p>
            </div>
            <div className="data mt-8 flex justify-center flex-wrap gap-2">
              <div className="text-sm  border-2 border-gray-800 rounded-full px-2">
                Check-in data:{' '}
                {checkIns?.find(
                  checkin =>
                    checkin.personId === person._id && checkin.checkInDate
                )
                  ? moment(
                      checkIns.find(checkin => checkin.personId === person._id)
                        .checkInDate
                    ).format('MM/DD/YYYY, HH:mm')
                  : 'N/A'}
              </div>
              <div className="text-sm border-2 border-gray-800 rounded-full px-2">
                Check-out data:{' '}
                {checkIns?.find(
                  checkin =>
                    checkin.personId === person._id && checkin.checkOutDate
                )
                  ? moment(
                      checkIns.find(
                        checkin =>
                          checkin.personId === person._id &&
                          checkin.checkOutDate
                      ).checkOutDate
                    ).format('MM/DD/YYYY, HH:mm')
                  : 'N/A'}
              </div>
              {!isCheckdOut[person._id] ? (
                <button
                  className={`py-2 px-4 rounded-full text-bt font-normal bg-white text-black mt-6 tracking-wide border-4 ${
                    buttonClicked[person.firstName] ? 'border-green-400' : ''
                  }`}
                  onClick={() => {
                    checkIn(person);
                    setTimeout(() => {
                      setIsCheckOut(prevCheckedOut => ({
                        ...prevCheckedOut,
                        [person._id]: true,
                      }));
                      setButtonClicked(false);
                    }, 5000);
                    handleCheckSuccess(person._id);
                  }}
                >
                  Check-in {`${person.firstName} ${person.lastName}`}
                </button>
              ) : (
                <button
                  className="py-2 px-4 rounded-full text-bt font-normal bg-white border-4 border-orange-500 text-black mt-6 tracking-wide"
                  onClick={() => {
                    checkOut(person);
                    setIsCheckOut(prevCheckedOut => ({
                      ...prevCheckedOut,
                      [person._id]: false,
                    }));
                  }}
                >
                  Check-out {person.firstName} {person.lastName}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
