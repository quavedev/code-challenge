import React, { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dropdown } from './components/Dropdown/Dropdown';
import { PersonCard } from './components/PersonCard/PersonCard';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Communities } from '../communities/communities';
import { People } from '../people/people';
import { Summary } from './components/Summary/Summary';
import { SearchBar } from './components/SearchBar/SearchBar';

export const App = () => {
  const [selectedEvent, setSelectedEvent] = useState();
  const [search, setSearch] = useState('');

  /*  Subscribing to the community collection to fetch event data that will be available in the select component */
  const {
    communities: trackedCommunities,
    isLoadingCommunities: isLoadingCommun,
  } = useTracker(() => {
    try {
      const communitiesHandle = Meteor.subscribe('communities');
      const isLoadingCommunities = !communitiesHandle.ready();

      const communities = Communities.find().fetch();
      return { communities, isLoadingCommunities, error: null };
    } catch (error) {
      toast.error('An error occurred while loading community data');

      return { communities: [], isLoadingCommunities: false, error };
    }
  });

  // Subscribing and fetch people data for the selected event
  const {
    people: trackedPeople,
    isLoadingPeople: isLoadingPersons,
  } = useTracker(() => {
    try {
      const peopleHandle = selectedEvent
        ? Meteor.subscribe('people', selectedEvent._id)
        : null;

      const isLoadingPeople = peopleHandle && !peopleHandle.ready();
      const people = selectedEvent
        ? People.find({ communityId: selectedEvent._id }).fetch()
        : [];

      return { people, isLoadingPeople };
    } catch (error) {
      toast.error('An error occurred while loading people data');

      return { people: [], isLoadingPeople: false };
    }
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
    Meteor.call('checkInPerson', person._id, (error, result) => {
      if (error) {
        // Handle and display the error to the user
        toast.error('Error checking in'); // Show error toast
      } else {
        // Display a success message to the user
        toast.success(result);
      }
    });
  };

  // Dealing with check-out
  const checkOutPerson = person => {
    Meteor.call('checkOutPerson', person._id, (error, result) => {
      if (error) {
        // Handle and display the error to the user
        toast.error('Error checking in');
      } else {
        // Display a success message to the user
        toast.success(result);
      }
    });
  };

  const initialSummary = {
    peopleInEvent: 0,
    peopleByCompany: {},
    uncheckedPeople: 0,
  };

  const incrementPeopleInEvent = summary => ({
    ...summary,
    peopleInEvent: summary.peopleInEvent + 1,
  });

  const decrementPeopleInEvent = summary => ({
    ...summary,
    peopleInEvent: Math.max(0, summary.peopleInEvent - 1),
    uncheckedPeople: summary.uncheckedPeople + 1,
  });

  const incrementCompanyCount = (summary, companyName) => {
    if (companyName === undefined) {
      return summary;
    }

    return {
      ...summary,
      peopleByCompany: {
        ...summary.peopleByCompany,
        [companyName]: (summary.peopleByCompany[companyName] || 0) + 1,
      },
    };
  };

  const decrementCompanyCount = (summary, companyName) => {
    if (companyName === undefined) {
      return summary;
    }

    const updatedCompanyCounts = {
      ...summary.peopleByCompany,
    };

    if (updatedCompanyCounts[companyName] === 1) {
      delete updatedCompanyCounts[companyName];
    } else if (updatedCompanyCounts[companyName]) {
      updatedCompanyCounts[companyName]--;
    }

    return {
      ...summary,
      peopleByCompany: updatedCompanyCounts,
    };
  };

  // Preparing summary information
  const calculateSummary = people => {
    // handling checkout in a first iteration to avoid unwanted checkin overrides
    const processedPeople = people?.reduce((summary, person) => {
      if (person.checkedOut) {
        return decrementCompanyCount(
          decrementPeopleInEvent(summary),
          person.companyName
        );
      }

      if (!person.checkOutDate && !person.checkInDate) {
        return {
          ...summary,
          uncheckedPeople: summary.uncheckedPeople + 1,
        };
      }

      return summary;
    }, initialSummary);

    const finalSummary = people?.reduce((summary, person) => {
      if (person.checkedIn) {
        return incrementCompanyCount(
          incrementPeopleInEvent(summary),
          person.companyName
        );
      }

      return summary;
    }, processedPeople);

    return finalSummary;
  };

  const handleSelectEvent = event => {
    setSelectedEvent(event);
  };

  const summary = calculateSummary(trackedPeople);
  const peopleByCompanyArray = Object.entries(summary.peopleByCompany);

  const propsSummary = {
    summaryCalculation: summary,
    peopleCompanyArray: peopleByCompanyArray,
  };

  const propsPersonCard = {
    checkIn: checkInPerson,
    checkOut: checkOutPerson,
    people: filteredPerson || trackedPeople,
  };

  return (
    <div className=" flex justify-center items-center flex-col">
      <Dropdown communities={trackedCommunities} onSelect={handleSelectEvent} />
      {selectedEvent ? (
        <React.Fragment>
          <Summary {...propsSummary} />
          <SearchBar searchFunction={handleSearch} />
          <PersonCard {...propsPersonCard} />
        </React.Fragment>
      ) : null}
    </div>
  );
};
