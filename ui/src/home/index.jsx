import { useTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Communities } from '../../../communities/communities';

export function Home() {
  const communitiesCollection = useTracker(() => Communities.find({}).fetch());

  // console.log("Communities: ", communitiesCollection)

  return (
    <div className="flex w-3/4 flex-col rounded-md bg-stone-200 shadow-inner">
      <div className="flex-1 justify-center">
        <h1 className="text-center text-lg font-bold">Event Check-in</h1>
      </div>

      <div className="flex flex-1">
        {/* {communities.map((community) => <p key={community.name}>{community.name}</p> )} */}
      </div>
    </div>
  );
}
