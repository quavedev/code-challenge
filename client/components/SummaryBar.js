//GENERAL IMPORTS
import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import { People } from '../../imports/collections/people';
import { useTracker } from 'meteor/react-meteor-data';

export const SummaryBar = ({ people, selectedEvent }) => {
  const [summary, setSummary] = useState([]);
  const peopleByCompany = []
  
  const { checkedInPeople, companyNames } = useTracker(() => {
    Meteor.subscribe('people');

    const checkedInPeople = People.find({ communityId: selectedEvent, checkedIn: true }).fetch();
    const companyNames = checkedInPeople.map(person => person.companyName);
    const uniqueCompanies = [...new Set(companyNames)];
    
    uniqueCompanies.map(company => {
      const occurrence = companyNames.filter(name => name === company).length;
      peopleByCompany.push({ [company]: occurrence });
    });

    return { checkedInPeople, companyNames };
  });

  useEffect(() => {
    setSummary(peopleByCompany)
    
  }, [people])

  return (
    <section>
      <span>People in the event right now: {checkedInPeople.length}</span>
      <span>People not checked-in: {people.length - checkedInPeople.length}</span>
      <span>People by company in the event right now: {summary.map(item => <span>{Object.keys(item)}</span> )} </span>
    </section>
  );
};
