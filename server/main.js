import { Meteor } from 'meteor/meteor';
import { loadInitialData } from '../infra/initial-data';
import { Communities } from '../communities/communities';
import { People } from '../people/people';
import { CheckIns } from '../checkins/checkins';

Meteor.startup(() => {
  // DON'T CHANGE THE NEXT LINE
  loadInitialData();

  // YOU CAN DO WHATEVER YOU WANT HERE

  Meteor.publish('communities', function() {
    return Communities.find();
  });

  Meteor.publish('people', function() {
    return People.find();
  });

  Meteor.publish('checkIns', function() {
    return CheckIns.find();
  });

  CheckIns.remove({});

  CheckIns.allow({
    insert: () => true,

    update: () => true,
  });
});
