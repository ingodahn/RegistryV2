import { check, Match } from 'meteor/check';
import { Items } from '../collections/ItemsCollection';

Meteor.methods({
    insertItem(item) {
        if (!this.userId) {
            throw new Meteor.Error('Insert not authorized');
        }
        const pattern = Match.ObjectIncluding({ itemType: Match.OneOf("scripts", "jupyter", "sagecell", "mathcoach") });
        var myTest = Match.test(item, pattern);
        if (myTest) {
            var newId = Items.insert(item);
            return newId;
        } else {
            console.log("Insert: Illegal Pattern");
        }
    },
    updateItem(item) {
        if (!this.userId) {
            throw new Meteor.Error('Update not authorized');
        }
        const pattern = Match.ObjectIncluding({
            _id: String,
            itemType: Match.OneOf("scripts", "jupyter", "sagecell", "mathcoach")
        });
        var myTest = Match.test(item, pattern);
        if (myTest) {
            Items.update(
                { _id: item._id },
                {
                    $set: item
                }
            );
        } else {
            throw new Meteor.Error("Update: Illegal Type or _id");
        }
    },
    deleteItem(pattern) {
        if (!pattern instanceof Object) {
            throw new Meteor.Error('Delete: Pattern is not an object');
        }
        if (!this.userId) {
            throw new Meteor.Error('Deleting not authorized');
        }
        Items.remove(pattern);
    }
})