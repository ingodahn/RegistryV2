//import './ItemsCollection.js';
import { Meteor } from 'meteor/meteor';
import { Items } from '../collections/ItemsCollection.js'

Meteor.publish("Items", function() {
    var current_user_role='none';
    if (this.userId) {
      if (Meteor.users.findOne({_id:this.userId}).username == 'admin') {
        current_user_role = 'admin';
      } else {
        current_user_role = 'logged_in';
      }
    } else {
      current_user_role = 'guest';
    }
    switch(current_user_role) {
      case 'admin':
          return Items.find({},{fields: {}});
        break;
      case 'logged_in':
        return Items.find({$or: [{'owner':this.userId}, {'Status':'public'}]},{fields: {}});
        break;
      default:
        return Items.find({'Status':'public'},{fields: {}});
    }
  });

/*
Meteor.publish("Items", function(searchTerm, searchType) {
    let pattern = {
        $or: [
          { Title: { $regex: searchTerm, $options: "i" } },
          { Description: { $regex: searchTerm, $options: "i" } },
        ],
      };
      if (searchType != "allTypes") pattern.itemType = searchType;
    var current_user_role='none';
    if (this.userId) {
      if (Meteor.users.findOne({_id:this.userId}).username == 'admin') {
        current_user_role = 'admin';
      } else {
        current_user_role = 'logged_in';
      }
    } else {
      current_user_role = 'guest';
    }
    console.log(current_user_role);
    console.log(Items.find(pattern,{fields: {}}).fetch().length);
    switch(current_user_role) {
      case 'admin':
          return Items.find(pattern,{fields: {}});
        break;
      case 'logged_in':
        return Items.find({$and: [pattern, {$or: [{'owner':this.userId}, {'Status':'public'}]}]},{fields: {}});
        break;
      default:
        return Items.find({$and: [pattern, {'Status':'public'}]},{fields: {}});
    }
  });
*/
    Meteor.publish("AllItems", function() {
        var current_user_role='none';
        // var itemType='mathcoach';
        if (this.userId) {
            if (Meteor.users.findOne({_id:this.userId}).username == 'admin') {
                current_user_role = 'admin';
            } else {
                current_user_role = 'logged_in';
            }
        } else {
            current_user_role = 'guest';
        }

        switch(current_user_role) {
            case 'admin':
                return Items.find({},{fields: {}});
                break;
            case 'logged_in':
                return Items.find(
                    {$or: [
                        {owner: this.userId},
                        {Status: 'public'},
                        {Status: 'deprecated'},
                    ]},{fields: {}}
                );
                break;
            default:
                return Items.find(
                    {Status: 'public'},{fields: {}}
                );
        }
    });
/*
  Meteor.publish("Users", function() {
    var userDetails = Meteor.users.find(
      {},{fields: {_id: 1, username: 1}}
    );
    return userDetails;
  });
*/