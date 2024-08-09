import { useTracker } from 'meteor/react-meteor-data';
import React, { useState } from 'react';
import { Communities } from '../../../communities/communities';
import { EventSelector } from '../components/EventSelector/index.jsx';
import { People } from '../../../people/people';
import { PeopleList } from '../components/PeopleList/index.jsx';

export function Home() {
  const [selectedEvent, setSelectedEvent] = useState({ _id: null, name: '' });

  const communities = useTracker(() => Communities.find({}).fetch());

  const peoples = useTracker(() =>
    People.find({ communityId: selectedEvent._id }).fetch()
  );

  return (
    <div className="flex w-9/12 flex-col  rounded-md bg-stone-200 shadow-inner">
      <div className="flex-1 justify-center">
        <h1 className="text-center text-lg font-bold">Event Check-in</h1>
      </div>

      <div className="flex flex-1 flex-col items-center">
        <EventSelector
          communities={communities}
          setSelectedEvent={setSelectedEvent}
        />
        
        <PeopleList peoples={peoples} eventName={selectedEvent.name} />
      </div>
    </div>
  );
}
