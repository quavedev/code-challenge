import { Meteor } from 'meteor/meteor';
import { loadInitialData } from '../infra/initial-data';
import { Communities } from '../communities/communities';
import { People } from '../people/people';
import { CheckIns } from '../checkins/checkins';

Meteor.startup(() => {
  // DON'T CHANGE THE NEXT LINE
  loadInitialData();

  // YOU CAN DO WHATEVER YOU WANT HERE

  // Returning communities to the front
  Meteor.publish('communities', function() {
    return Communities.find();
  });

  // Returning people to the front
  Meteor.publish('people', function() {
    return People.find();
  });

  // Returning checks to the front
  Meteor.publish('checkIns', function() {
    return CheckIns.find();
  });

  // allowing to update and insert
  CheckIns.allow({
    insert: () => true,

    update: () => true,
  });
});
