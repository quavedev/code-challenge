import { useTracker } from 'meteor/react-meteor-data';
import React, { useState } from 'react';
import { Communities } from '../../../communities/communities';
import { EventSelector } from '../components/EventSelector/index.jsx';
import { People } from '../../../people/people.js';

export function Home() {
  const [selectedEvent, setSelectedEvent] = useState("");
  
  const communities = useTracker(() => Communities.find({}).fetch());
  const people = useTracker(() => People.find({}).fetch());

  // console.log("people: ", people);

  return (
    <div className="flex w-3/4 flex-col rounded-md bg-stone-200 shadow-inner">
      <div className="flex-1 justify-center">
        <h1 className="text-center text-lg font-bold">Event Check-in</h1>
      </div>

      <div className="flex flex-1 flex-col">
        
        <EventSelector communities={communities} setSelectedEvent={setSelectedEvent} />
      
      </div>
    </div>
  );
}
