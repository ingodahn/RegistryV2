import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import '../imports/api/collections';
import '../imports/api/publications';
import '/imports/api/methods/ItemsMethods';

const SEED_USERNAME = 'admin';
const SEED_PASSWORD = 'admin';

Meteor.startup((() => {
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
}));
    