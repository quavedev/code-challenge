import { Meteor } from 'meteor/meteor';
import { Communities } from '../communities';

Meteor.publish('communities', function publishCommunities() {
  return Communities.find();
});
