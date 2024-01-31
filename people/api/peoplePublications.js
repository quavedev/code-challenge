import { Meteor } from 'meteor/meteor';
import { People } from '../people';

Meteor.publish('people', function peoplePublish() {
  return People.find();
});
