/**
 * The model 'Follower' that is used to realize relationships between users.
 */

// _____________________________________________________________________________

// Define some dependencies.

var keystone = require('keystone');
var Types = keystone.Field.Types;

// _____________________________________________________________________________

var Follower = new keystone.List('Follower', {
    // Hide this model in Admin UI because it shouldn't be configurable by hand.
    hidden: true,
    // Generate a unique autokey.
    autokey: { 
        path: 'slug', 
        from: 'follower_id followed_subject_id', 
        unique: true 
    }
});

Follower.add({
    // Define a field with the id of the follower (which is the id of a user).
    // TODO: Should we use a Types.Relationship here instead?
    follower_id: { 
        type: Types.Key, 
    },

    // Define a field with the id of the followed subject (which may be a
    // user or a list for example).
    // TODO: Should we use a Types.Mixed (User & List) here instead?
    followed_subject_id: { 
        type: Types.Key,  
    },
});

// _____________________________________________________________________________

// Initialize and register the model.
Follower.register();
