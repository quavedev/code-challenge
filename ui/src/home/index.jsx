import { useTracker } from 'meteor/react-meteor-data';
import React, { useState } from 'react';
import { Communities } from '../../../communities/communities';
import { EventSelector } from '../components/EventSelector/index.jsx';
import { People } from '../../../people/people';
import { PeopleList } from '../components/PeopleList/index.jsx';
import { Summary } from '../components/Summary/index.jsx';

export function Home() {
  const [selectedEvent, setSelectedEvent] = useState({ _id: null, name: '' });

  const communities = useTracker(() => Communities.find({}).fetch());

  const peoples = useTracker(() =>
    People.find({ communityId: selectedEvent._id }).fetch()
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-900 p-4">
      <div className="flex max-h-full w-full max-w-4xl flex-col rounded-md bg-stone-200 p-4 shadow-inner md:w-9/12">
        <div className="flex-1 justify-center">
          <h1 className="text-center text-lg font-bold">Event Check-in</h1>
        </div>

        <div className="flex flex-1 flex-col items-center">
          <EventSelector
            communities={communities}
            setSelectedEvent={setSelectedEvent}
          />

          {selectedEvent._id ? (
            <Summary peoples={peoples} communities={communities} />
          ) : null}

          <PeopleList peoples={peoples} eventName={selectedEvent.name} />
        </div>
      </div>
    </div>
  );
}
