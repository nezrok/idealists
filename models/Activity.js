/**
 * The model 'Activity' that is used to keep track of user's activities.
 */

// _____________________________________________________________________________

// Define some dependencies.

var keystone = require('keystone');
var mongoose = require('mongoose');
var Types = keystone.Field.Types;


// _____________________________________________________________________________

var Activity = new keystone.List('Activity', {
    // Hide this model in Admin UI because it shouldn't be configurable by hand.
    hidden: true,
    // Generate a unique autokey.
    autokey: { 
        path: 'slug', 
        from: 'subject_id', 
        unique: true 
    }
});

Activity.add({
    // Define a field with the id of the subject that triggered the activity
    subject_id: { 
        type: Types.Key, 
    },

    // Define a field with the predicate of the activity. That is a phrase 
    // describing the actual action like "created", "updated", "followed", etc.
    predicate: { 
        type: Types.Text, 
    }
});

Activity.schema.add({
    // Define a (optional) field with data describing the object that is 
    // affected by the activity.
    // TODO: Check if this is the correct way to do this.
    object: { 
        type: mongoose.Schema.Types.Mixed,  
    }
})

// _____________________________________________________________________________

// Initialize and register the model.
Activity.register();
