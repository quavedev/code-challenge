import { Meteor } from 'meteor/meteor';
import { People } from '../collections/people';

Meteor.publish('people', () => {
  return People.find();
})