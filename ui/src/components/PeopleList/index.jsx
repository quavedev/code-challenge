/* eslint-disable no-unused-vars */
import React from 'react';

export function PeopleList({ peoples, eventName }) {
  const onCheckInClick = (_id) => {};

  if (peoples.length === 0 && eventName === '') {
    return (
      <div className="mt-2 flex w-full flex-1 flex-col p-4">
        <h2 className="mb-2 text-center text-lg font-semibold text-gray-900">
          Please, select an event.
        </h2>
      </div>
    );
  }

  return (
    <div className="mt-2 flex w-full flex-1 flex-col p-4">
      <h2 className="mb-2 text-lg font-semibold text-gray-900">
        List of peoples in "{eventName}" event:
      </h2>

      <div className="max-h-64 overflow-y-auto">
        <ul className="max-w-md list-inside list-disc space-y-1 text-gray-700">
          {peoples.map((people) => (
            <div key={people._id}>
              <p className="font-medium">
                Name: {people.firstName} {people.lastName}
              </p>
              <p>Company: {people.companyName ? people.companyName : '--'}</p>
              <p>Title: {people.title ? people.title : '--'}</p>

              <button
                onClick={() => onCheckInClick(people._id)}
                className="rounded-lg bg-blue-600 px-3 py-2 text-center text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Check-in {people.firstName} {people.lastName}
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
