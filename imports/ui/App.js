//GENERAL IMPORTS
import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { TEXTS } from '../infra/constants';
import { Communities } from '../collections/communities';
import { People } from '../collections/people';
import { useTracker } from 'meteor/react-meteor-data';

//CUSTOM COMPONENTS
import { SelectComponent } from '../../client/components/SelectComponent';
import { Attendees } from '../../client/components/Attendees';
import { SummaryBar } from '../../client/components/SummaryBar';


export const App = () => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const events = useTracker(() => {
    Meteor.subscribe('communities');

    const events = Communities.find().fetch();

    return events;
  });
  
  const people = useTracker(() => {
    Meteor.subscribe('people');

    const people = People.find({ communityId: selectedEvent }).fetch();

    return people;
  });
  
  return (
    <div>
      <header>
        <h1>{TEXTS.HOME_TITLE}</h1>
        <SelectComponent 
          events={events}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        />
      </header>
      <main>
        <SummaryBar people={people} />
        <Attendees people={people} />
      </main>
    </div>
  );
};
