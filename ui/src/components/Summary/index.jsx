import React from 'react';
import { PeoplesByCompany } from './PeoplesByCompany.jsx';

export function Summary({ peoples }) {
  const filteredPeopleByCompany = peoples.filter(
    (people) => people.companyName !== undefined
  );

  const peoplesGroupedByCompanies = Object.values(
    filteredPeopleByCompany
  ).reduce((acc, people, index) => {
    if (!acc[index]) {
      acc[index] = { index, company: people.companyName, peoples: [] };
    }
    acc[index].peoples.push(people);
    return acc;
  }, []);

  const peopleNotCheckedIn = peoples.filter(
    (people) => people.checkInDate === undefined
  );

  return (
    <div className="my-4 flex flex-1 flex-col p-4">
      <h2 className="mb-2 text-lg font-semibold text-gray-900">Summary:</h2>
      <ul className="max-w-md list-inside list-disc space-y-1 text-gray-800">
        <li>People in the event right now: {peoples.length}</li>

        <li>People by company in the event right now:</li>
        <PeoplesByCompany peoplesByCompany={peoplesGroupedByCompanies} />

        <li>People not checked in: {peopleNotCheckedIn.length}</li>
      </ul>
    </div>
  );
}
