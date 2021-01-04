import { People } from '../collections/people';

export const handleCheckIn = personId => {
  People.find({ _id: personId}).forEach(person => {                     //FETCHES A UNIQUE PERSON BASED ON "_ID" AND SETS CHECKEDIN TO TRUE OR FALSE;
    if(person.checkedIn === true) {
      People.update({ _id: personId}, { $set: { checkedIn: false }})
    } else {
      People.update({ _id: personId}, { $set: { checkedIn: true }})
    }
  })
}