import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { People } from '../collections/people';

Meteor.methods({
  //THIS METHOD WILL BE CALLED WHEN THE USER CLICKS THE CHECK-IN BUTTON. 
  //IT RECEIVES AN ID, CHECKS IF THE ID IS OF TYPE STRING, 
  //QUERIES THE PEOPLE COLLECTION FOR A DOCUMENT MATCHING THE ID, 
  //AND FINALLY UPDATES THE DOCUMENT WITH A PROPERTY 'CHECKEDIN' TRUE OR FALSE
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
