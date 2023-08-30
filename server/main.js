import { Meteor } from 'meteor/meteor';
import { loadInitialData } from '../infra/initial-data';
import { Communities } from '../communities/communities';
import { People } from '../people/people';

Meteor.startup(() => {
  // DON'T CHANGE THE NEXT LINE
  loadInitialData();

  // YOU CAN DO WHATEVER YOU WANT HERE

  // Returning communities to the front
  Meteor.publish('communities', () => {
    try {
      const communities = Communities.find();
      if (!communities) {
        throw new Meteor.Error('no-communities-found', 'No communities found.');
      }
      return communities;
    } catch (error) {
      throw new Meteor.Error(
        'publish-error',
        'Error while publishing communities.',
        error
      );
    }
  });

  // Returning people to the front
  Meteor.publish('people', eventId => {
    try {
      // Fetch the selected event based on eventId
      const selectedEvent = Communities.findOne(eventId);

      if (selectedEvent) {
        return People.find({ communityId: selectedEvent._id });
      }
      // Return an empty cursor if the event is not found
      return People.find({ _id: null });
    } catch (error) {
      // Handle and log errors when fetching people data
      console.error('Error in people publication:', error);

      throw new Meteor.Error(
        500,
        'An error occurred while fetching people data.'
      );
    }
  });

  Meteor.methods({
    // Method to check in a person using their personId
    checkInPerson(personId) {
      try {
        const checkInRecord = People.findOne({ _id: personId });

        if (!checkInRecord) {
          throw new Meteor.Error(
            'person-not-found',
            `${personId} does not exist`
          );
        }

        const updatedFields = {
          checkInDate: new Date(),
          checkedInDate: true,
          checkedIn: true,
          checkedOut: false,
        };

        // Update the person's record with the new fields
        People.update({ _id: checkInRecord._id }, { $set: updatedFields });

        return `${checkInRecord.firstName} ${checkInRecord.lastName} has been check-in in successfully.`;
      } catch (error) {
        // If an error occurs during the process, throw an error with a meaningful message
        throw new Meteor.Error(
          'check-in-error',
          `Error checking in: ${error.message}`
        );
      }
    },
  });

  Meteor.methods({
    // Method to check out a person using their personId
    checkOutPerson(personId) {
      try {
        const checkOutRecord = People.findOne({ _id: personId });

        if (!checkOutRecord) {
          throw new Meteor.Error(
            'person-not-found',
            `${personId} does not exist`
          );
        }

        const updatedFields = {
          checkOutDate: new Date(),
          checkedOut: true,
          checkedIn: false,
        };

        // Update the person's record with the new fields
        People.update({ _id: checkOutRecord._id }, { $set: updatedFields });

        return `${checkOutRecord.firstName} ${checkOutRecord.lastName} has been check-out in successfully.`;
      } catch (error) {
        // If an error occurs during the process, throw an error with a meaningful message
        throw new Meteor.Error(
          'check-in-error',
          `Error checking in: ${error.message}`
        );
      }
    },
  });

  // allowing to update and insert
  People.allow({
    insert: () => true,

    update: () => true,
  });
});
