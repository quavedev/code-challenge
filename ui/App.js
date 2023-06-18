import React, { useState, useMemo } from 'react';
import { Dropdown } from './components/Dropdown/Dropdown';
import { PersonCard } from './components/PersonCard/PersonCard';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Communities } from '../communities/communities';
import { People } from '../people/people';
import { Summary } from './components/Summary/Summary';
import { CheckIns } from '../checkins/checkins';
import moment from 'moment';
import { SearchBar } from './components/SearchBar/SearchBar';

export const App = () => {
  const [selectedEvent, setSelectedEvent] = useState();
  const [search, setSearch] = useState('');

  /*  Subscribing to the community collection to fetch event data that will be available in the select component */
  const {
    communities: trackedCommunities,
    isLoadingCommunities: isLoadingCommun,
  } = useTracker(() => {
    const communitiesHandle = Meteor.subscribe('communities');
    const isLoadingCommunities = !communitiesHandle.ready();
    const communities = Communities.find().fetch();
    return { communities, isLoadingCommunities };
  });

  // Subscribing and fetch people data for the selected event
  const {
    people: trackedPeople,
    isLoadingPeople: isLoadingPersons,
  } = useTracker(() => {
    const peopleHandle = selectedEvent ? Meteor.subscribe('people') : null;
    const isLoadingPeople = peopleHandle && !peopleHandle.ready();
    const people = selectedEvent
      ? People.find({ communityId: selectedEvent._id }).fetch()
      : [];
    return { people, isLoadingPeople };
  });

  // Subscribing and fetch check-ins data to handle records in the events
  const { checkIns: trackedChecked, isLoadingCheckins } = useTracker(() => {
    const checkinsHandle = Meteor.subscribe('checkIns');
    const isLoadingcheckins = checkinsHandle && !checkinsHandle.ready();
    const checkIns = CheckIns.find().fetch();

    return { checkIns, isLoadingcheckins };
  });

  const handleSearch = searchValue => {
    setSearch(searchValue);
  };

  const filteredPerson = useMemo(
    () =>
      trackedPeople?.filter(
        people =>
          people.firstName
            .toLowerCase()
            .includes(search.toString().toLocaleLowerCase()) ||
          people.lastName
            .toLowerCase()
            .includes(search.toString().toLocaleLowerCase())
      ),
    [search, trackedPeople]
  );

  // Dealing with check-in
  const checkInPerson = person => {
    const checkOutRecord = CheckIns.findOne({ personId: person._id });

    if (!checkOutRecord) {
      CheckIns.insert({ personId: person._id, checkInDate: new Date() });
    }

    if (checkOutRecord) {
      CheckIns.update(checkOutRecord._id, {
        $set: { checkInDate: new Date() },
      });
    }
  };

  // Dealing with check-out
  const checkOutPerson = person => {
    const checkInRecord = CheckIns.findOne({
      personId: person._id,
    });

    if (!checkInRecord) {
      CheckIns.insert(checkInRecord._id, {
        personId: person._id,
        checkOutDate: new Date(),
      });
    }

    if (checkInRecord) {
      CheckIns.update(checkInRecord._id, {
        $set: { checkOutDate: new Date() },
      });
    }
  };

  // Preparing summary information
  const calculateSummary = (people, checkins) => {
    const summary = {
      peopleInEvent: 0,
      peopleByCompany: {},
      uncheckedPeople: 0,
    };

    people.forEach(person => {
      const checkIn = checkins?.find(
        checkin => checkin.personId === person._id
      );

      if (checkIn) {
        // checking for an even more recent check in
        if (moment(checkIn.checkInDate).isAfter(checkIn.checkOutDate)) {
          summary.peopleInEvent++;
          // setting up people count per company
          if (person.companyName) {
            summary.peopleByCompany[person.companyName] =
              (summary.peopleByCompany[person.companyName] || 0) + 1;
          }
          return;
        }

        if (checkIn.checkOutDate) {
          if (!Object.prototype.hasOwnProperty.call(person, 'companyName')) {
            summary.uncheckedPeople++;
            return;
          }
          if (summary.peopleInEvent > 0) {
            summary.peopleInEvent--;

            // setting up people count per company
            if (person.companyName) {
              summary.peopleByCompany[person.companyName] =
                (summary.peopleByCompany[person.companyName] || 0) - 1;
              // Remove the company if its representatives in the event reach 0
              if (summary.peopleByCompany[person.companyName] === 0) {
                delete summary.peopleByCompany[person.companyName];
              }
            }
          }

          summary.uncheckedPeople++;
        } else {
          // The person recently checked in, increment the number of people at the event
          summary.peopleInEvent++;
          //  setting up people count per company
          if (person.companyName) {
            summary.peopleByCompany[person.companyName] =
              (summary.peopleByCompany[person.companyName] || 0) + 1;
          }
        }
      } else {
        // The person has not checked in
        summary.uncheckedPeople++;
      }
    });

    return summary;
  };

  const handleSelectEvent = event => {
    setSelectedEvent(event);
  };

  const summary = calculateSummary(trackedPeople, trackedChecked);
  const peopleByCompanyArray = Object.entries(summary.peopleByCompany);

  const propsSummary = {
    summaryCalculation: summary,
    peopleCompanyArray: peopleByCompanyArray,
  };

  const propsPersonCard = {
    checkIn: checkInPerson,
    checkOut: checkOutPerson,
    people: filteredPerson || trackedPeople,
    checkIns: trackedChecked,
  };

  return (
    <div className=" flex justify-center items-center flex-col">
      <Dropdown communities={trackedCommunities} onSelect={handleSelectEvent} />
      {selectedEvent ? <Summary {...propsSummary} /> : null}
      {selectedEvent ? <SearchBar searchFunction={handleSearch} /> : null}
      {selectedEvent ? <PersonCard {...propsPersonCard} /> : null}
    </div>
  );
};
