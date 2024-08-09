import React from 'react';
import { PeopleCard } from './PeopleCard.jsx';

export function PeopleList({ peoples, eventName }) {
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
            <PeopleCard people={people} key={people._id} />
          ))}
        </ul>
      </div>
    </div>
  );
}
