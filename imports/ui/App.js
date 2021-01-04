//GENERAL IMPORTS
import React, { useState } from 'react';
import { TEXTS } from '../infra/constants';
import { Communities } from '../collections/communities';
import { People } from '../collections/people';
import { useTracker } from 'meteor/react-meteor-data';

//CUSTOM COMPONENTS
import { SelectComponent } from '../../client/components/SelectComponent';
import { Attendees } from '../../client/components/Attendees';
import { AppBar } from '../../client/components/AppBar';


export const App = () => {
  const events = useTracker(() => Communities.find().fetch());
  const [selectedEvent, setSelectedEvent] = useState("");
  const handleSelectedEvent = e => setSelectedEvent(e.target.value);
  
  const people = useTracker(() => People.find({ communityId: selectedEvent }).fetch());
  
  return (
    <div>
      <header>
        <h1>{TEXTS.HOME_TITLE}</h1>
        <SelectComponent 
          events={events}
          selectedEvent={selectedEvent}
          handleSelectedEvent={handleSelectedEvent}
        />
      </header>
      <main>
        <AppBar people={people} />
        <Attendees people={people} />
      </main>
    </div>
  );
};
