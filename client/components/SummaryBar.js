//GENERAL IMPORTS
import React, { useEffect } from 'react';

export const SummaryBar = ({ people }) => {
  const checkedInPeople = people.filter(person => person.checkedIn === true);
  const companyNames = checkedInPeople.map(person => person.companyName);
  const uniqueCompanies = [...new Set(companyNames)];
  const peopleByCompany = [];

  const showPeople = () => {
    if (peopleByCompany.length !== 0) return <span> test </span>;
  };

  useEffect(() => {
    uniqueCompanies.map(company => {
      const occurrence = companyNames.filter(name => name === company).length;
      peopleByCompany.push({
        [company]: occurrence,
      });
    });
  }, [checkedInPeople]);

  return (
    <section>
      <span>{`People in the event right now: ${checkedInPeople.length}`}</span>
      <span>{`People not checked-in: ${people.length -
        checkedInPeople.length}`}</span>
      <span>People by company in the event right now: {showPeople()}</span>
    </section>
  );
};
