import { Meteor } from 'meteor/meteor';
import { loadInitialData } from '../imports/infra/initial-data';
import '/imports/collections/communities';
import '/imports/collections/people';
import '/imports/api/peopleMethods';
import '/imports/api/peoplePublications';
import '/imports/api/communitiesPublications';

Meteor.startup(() => {
  // DON'T CHANGE THE NEXT LINE
  loadInitialData();

  // YOU CAN DO WHATEVER YOU WANT HERE
});
