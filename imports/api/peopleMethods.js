import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { People } from '../collections/people';

Meteor.methods({
  'people.setCheckIn'(personId) {
    check(personId, String);

    const person = People.findOne({ _id: personId });
    if (!person)
      throw new Meteor.Error("Couldn't find person with matching _id");

    if (person.checkedIn === true) {
      People.update({ _id: personId }, { $set: { checkedIn: false } });
      return;
    }

    People.update({ _id: personId }, { $set: { checkedIn: true } });
  },
});
